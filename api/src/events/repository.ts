import { generateId } from '../data/id.js';
import type { EventWithId, StoredEventDocument } from '../data/types.js';
import { DeleteCommand, PutCommand, TransactWriteCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient } from '../dynamo/client.js';
import {
  buildEventItem,
  buildTxnRefItem,
  eventFromItem,
  resolveEventSk,
} from '../dynamo/entities.js';
import {
  datedEventSkRange,
  RECURRING_EVENT_SK_PREFIX,
  txnRefPk,
  txnRefSk,
  userPk,
} from '../dynamo/keys.js';
import { matchesEventFilter, toEventWithId } from '../dynamo/helpers.js';
import { batchGetItems, queryAll } from '../dynamo/query.js';
import { getTableName } from '../dynamo/tables.js';
import { PLAID_TRANSACTION_EVENT_TYPE } from '@balance/schemas/constants';
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';
import { ConflictError, NotFoundError } from '../errors/http-error.js';

const table = (): string => getTableName();

export type EventQueryFilter = {
  eventType?: string;
  eventTypes?: string[];
  userId?: string;
  includeRemoved?: boolean;
};

export type EventDocumentUpdate = {
  set: Record<string, unknown>;
  unset?: string[];
  /** ISO `updatedAt` from GET; must match the stored value. */
  expectedUpdatedAt: string;
};

/**
 * Recurring events (`EVT#…`) are few per user, so load them all and expand
 * rrules in memory. A server-side filter drops removed rows to shrink payload.
 */
const queryRecurringEvents = (userId: string): Promise<Record<string, unknown>[]> =>
  queryAll({
    TableName: table(),
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :prefix)',
    FilterExpression: '#status = :active',
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: {
      ':pk': userPk(userId),
      ':prefix': RECURRING_EVENT_SK_PREFIX,
      ':active': 'active',
    },
  });

/**
 * Date-anchored events (`EVD#<date>#…`, i.e. Plaid transactions) bounded to the
 * calendar grid window with a `SK BETWEEN` range so we never scan a user's full
 * transaction history just to render one month.
 */
const queryDatedEvents = (
  userId: string,
  rangeStart: Date,
  rangeEnd: Date,
): Promise<Record<string, unknown>[]> => {
  const { lo, hi } = datedEventSkRange(rangeStart, rangeEnd);
  return queryAll({
    TableName: table(),
    KeyConditionExpression: 'PK = :pk AND SK BETWEEN :lo AND :hi',
    FilterExpression: '#status = :active',
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: {
      ':pk': userPk(userId),
      ':lo': lo,
      ':hi': hi,
      ':active': 'active',
    },
  });
};

/**
 * Active events that can appear on the month grid: every recurring event plus
 * date-anchored events overlapping `[rangeStart, rangeEnd]`. When `eventTypes`
 * is supplied we skip the index that can't contribute (e.g. plaid-only filters
 * skip the recurring query entirely).
 */
export const findActiveEventsForCalendar = async <T extends object = object>(
  userId: string,
  rangeStart: Date,
  rangeEnd: Date,
  eventTypes?: string[],
): Promise<EventWithId<T>[]> => {
  const wantsPlaid = !eventTypes || eventTypes.includes(PLAID_TRANSACTION_EVENT_TYPE);
  const recurringTypes = eventTypes?.filter((type) => type !== PLAID_TRANSACTION_EVENT_TYPE);
  const wantsRecurring = !eventTypes || (recurringTypes?.length ?? 0) > 0;

  const empty: Record<string, unknown>[] = [];
  const [recurring, dated] = await Promise.all([
    wantsRecurring ? queryRecurringEvents(userId) : Promise.resolve(empty),
    wantsPlaid ? queryDatedEvents(userId, rangeStart, rangeEnd) : Promise.resolve(empty),
  ]);

  return [...recurring, ...dated]
    .map((item) => eventFromItem<T>(item))
    .filter((event) =>
      matchesEventFilter(event, { userId, eventTypes, includeRemoved: false }, 'active'),
    );
};

export const insertEvent = async (event: StoredEventDocument): Promise<string> => {
  const id = generateId();
  const now = event.createdAt ?? new Date();

  await getDocClient().send(
    new PutCommand({
      TableName: table(),
      Item: buildEventItem(
        {
          ...event,
          id,
          createdAt: now,
          updatedAt: event.updatedAt ?? now,
        },
        'active',
      ),
      ConditionExpression: 'attribute_not_exists(SK)',
    }),
  );

  return id;
};

/**
 * Resolves an event by its public id via `EventIdIndex`. The index projects all
 * attributes, so this is a single read. Reads are eventually consistent (GSIs cannot be read consistently); 
 * write paths return authoritative base-table data so read-after-write within a request is exact.
 */
export const findEventById = async <T extends object = object>(
  id: string,
  filter?: EventQueryFilter,
): Promise<EventWithId<T>> => {
  const items = await queryAll<Record<string, unknown>>({
    TableName: table(),
    IndexName: 'EventIdIndex',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: { ':id': id },
    Limit: 1,
  });

  if (!items[0]) throw new NotFoundError('Event not found');
  const event = eventFromItem<T>(items[0]);
  if (!matchesEventFilter(event, filter, items[0].status as string | undefined)) throw new NotFoundError('Event not found');
  return event;
};

/** Hard-deletes a user-owned event row by public id (HP1). */
export const hardDeleteEventById = async (id: string, userId: string): Promise<void> => {
  const items = await queryAll<Record<string, unknown>>({
    TableName: table(),
    IndexName: 'EventIdIndex',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: { ':id': id },
    Limit: 1,
  });

  const raw = items[0];
  if (!raw?.PK || !raw?.SK) throw new NotFoundError('Event not found');

  const existing = eventFromItem(raw);
  if (!matchesEventFilter(existing, { userId }, raw.status as string | undefined)) {
    throw new NotFoundError('Event not found');
  }

  await getDocClient().send(
    new DeleteCommand({
      TableName: table(),
      Key: { PK: raw.PK, SK: raw.SK },
      ConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: { ':userId': userId },
    }),
  );
};

export const updateEventById = async (
  id: string,
  filter: { userId: string },
  update: EventDocumentUpdate,
): Promise<EventWithId> => {
  // Single GSI read returns the full item (PK/SK + payload) — no second lookup.
  const items = await queryAll<Record<string, unknown>>({
    TableName: table(),
    IndexName: 'EventIdIndex',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: { ':id': id },
    Limit: 1,
  });

  const raw = items[0];
  if (!raw?.PK || !raw?.SK) throw new NotFoundError('Event not found');

  const existing = eventFromItem(raw);
  if (
    !matchesEventFilter(
      existing,
      { userId: filter.userId, includeRemoved: true },
      raw.status as string | undefined,
    )
  ) {
    throw new NotFoundError('Event not found');
  }

  const setEntries = Object.entries(update.set);
  const unsetFields = update.unset ?? [];
  const setParts: string[] = [];
  const removeParts: string[] = [];
  const names: Record<string, string> = {};
  const values: Record<string, unknown> = {
    ':userId': filter.userId,
    ':expectedUpdatedAt': update.expectedUpdatedAt,
  };

  setEntries.forEach(([field, value], index) => {
    const nameKey = `#f${index}`;
    const valueKey = `:v${index}`;
    names[nameKey] = field;
    values[valueKey] = value instanceof Date ? value.toISOString() : value;
    setParts.push(`${nameKey} = ${valueKey}`);
  });

  unsetFields.forEach((field, index) => {
    const nameKey = `#u${index}`;
    names[nameKey] = field;
    removeParts.push(nameKey);
  });

  if (setParts.length === 0 && removeParts.length === 0) {
    return existing;
  }

  const updateExpression = [
    setParts.length > 0 ? `SET ${setParts.join(', ')}` : '',
    removeParts.length > 0 ? `REMOVE ${removeParts.join(', ')}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  let result;
  try {
    result = await getDocClient().send(
      new UpdateCommand({
        TableName: table(),
        Key: { PK: raw.PK, SK: raw.SK },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: Object.keys(names).length > 0 ? names : undefined,
        ExpressionAttributeValues: values,
        ConditionExpression: 'userId = :userId AND updatedAt = :expectedUpdatedAt',
        ReturnValues: 'ALL_NEW',
      }),
    );
  } catch (err) {
    if (err instanceof ConditionalCheckFailedException) {
      throw new ConflictError('Event was modified; refresh and retry');
    }
    throw err;
  }

  if (!result.Attributes) throw new NotFoundError('Event not found');

  return toEventWithId(result.Attributes);
};

export const findEventByPlaidTransactionIds = async (
  plaidTransactionIds: string[],
): Promise<Map<string, EventWithId>> => {
  if (plaidTransactionIds.length === 0) return new Map();

  const refs = await batchGetItems<Record<string, unknown>>(
    table(),
    plaidTransactionIds.map((plaidTransactionId) => ({
      PK: txnRefPk(plaidTransactionId),
      SK: txnRefSk(),
    })),
  );

  if (refs.length === 0) return new Map();

  const events = await batchGetItems<Record<string, unknown>>(
    table(),
    refs.map((ref) => ({
      PK: userPk(ref.userId as string),
      SK: ref.eventSk as string,
    })),
  );

  return new Map(
    events.map((item) => {
      const event = toEventWithId(item);
      const plaidTransactionId = (event as { plaidTransactionId?: string }).plaidTransactionId;
      if (!plaidTransactionId) {
        throw new Error('Plaid transaction event missing plaidTransactionId');
      }
      return [plaidTransactionId, event] as const;
    }),
  );
};

/**
 * Writes a Plaid transaction event and its `TXN#…/REF` inverted-index row in a
 * single transaction so the two never diverge. If a prior sync stored the event
 * under a different posted date (pending → posted), the stale `EVD#` row is
 * deleted in the same transaction. Returns the event built from what was
 * written — no eventually-consistent re-read.
 */
export const upsertEventByPlaidTransactionId = async (
  document: StoredEventDocument & { plaidTransactionId: string },
  existing: EventWithId | undefined,
  now: Date,
): Promise<EventWithId> => {
  const id = existing?.id ?? document.plaidTransactionId;
  const createdAt = existing?.createdAt ?? now;

  const eventItem = buildEventItem(
    {
      ...document,
      id,
      createdAt,
      updatedAt: now,
    },
    'active',
  );

  const newSk = eventItem.SK as string;
  const refItem = buildTxnRefItem({
    plaidTransactionId: document.plaidTransactionId,
    userId: document.userId,
    eventSk: newSk,
  });

  const transactItems: NonNullable<
    ConstructorParameters<typeof TransactWriteCommand>[0]['TransactItems']
  > = [
    { Put: { TableName: table(), Item: eventItem } },
    { Put: { TableName: table(), Item: refItem } },
  ];

  if (existing) {
    const oldSk = resolveEventSk({
      eventType: existing.eventType,
      id,
      dtstart: existing.dtstart,
    });
    if (oldSk !== newSk) {
      transactItems.push({
        Delete: { TableName: table(), Key: { PK: userPk(document.userId), SK: oldSk } },
      });
    }
  }

  await getDocClient().send(new TransactWriteCommand({ TransactItems: transactItems }));

  return eventFromItem(eventItem);
};

/**
 * Hard-deletes Plaid transaction events and their TXN# REF rows (HP1).
 * Used when Plaid reports transactions as removed during sync.
 */
export const hardDeleteEventsByPlaidTransactionIds = async (
  plaidTransactionIds: string[],
): Promise<number> => {
  if (plaidTransactionIds.length === 0) return 0;

  const refs = await batchGetItems<Record<string, unknown>>(
    table(),
    plaidTransactionIds.map((plaidTransactionId) => ({
      PK: txnRefPk(plaidTransactionId),
      SK: txnRefSk(),
    })),
  );

  if (refs.length === 0) return 0;

  let modified = 0;

  await Promise.all(
    refs.map(async (ref) => {
      if (typeof ref.userId !== 'string' || typeof ref.eventSk !== 'string') return;
      if (typeof ref.plaidTransactionId !== 'string') return;

      const client = getDocClient();
      const tableName = table();

      // Separate deletes so a missing event row still clears the TXN# REF (and
      // vice versa) without failing the whole batch.
      await Promise.all([
        client.send(
          new DeleteCommand({
            TableName: tableName,
            Key: { PK: userPk(ref.userId), SK: ref.eventSk },
          }),
        ),
        client.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              PK: txnRefPk(ref.plaidTransactionId),
              SK: txnRefSk(),
            },
          }),
        ),
      ]);

      modified += 1;
    }),
  );

  return modified;
};
