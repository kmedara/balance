import { generateId } from '../data/id.js';
import type { EventWithId, StoredEventDocument } from '../data/types.js';
import { PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient } from '../dynamo/client.js';
import { buildEventItem, eventFromItem } from '../dynamo/entities.js';
import { datedEventSkRange, RECURRING_EVENT_SK_PREFIX, userPk } from '../dynamo/keys.js';
import { matchesEventFilter, toEventWithId } from '../dynamo/helpers.js';
import { queryAll } from '../dynamo/query.js';
import { getTableName } from '../dynamo/tables.js';
import { PLAID_TRANSACTION_EVENT_TYPE } from '../plaid/constants.js';
import { NotFoundError } from '../errors/http-error.js';

export {
  findEventByPlaidTransactionIds,
  upsertEventByPlaidTransactionId,
  markEventsRemovedByPlaidTransactionIds,
} from './plaid-event.repository.js';

export type EventQueryFilter = {
  eventType?: string;
  eventTypes?: string[];
  userId?: string;
  includeRemoved?: boolean;
};

const table = (): string => getTableName();

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

export type EventDocumentUpdate = {
  set: Record<string, unknown>;
  unset?: string[];
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
  const values: Record<string, unknown> = { ':userId': filter.userId };

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

  const result = await getDocClient().send(
    new UpdateCommand({
      TableName: table(),
      Key: { PK: raw.PK, SK: raw.SK },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
      ConditionExpression: 'userId = :userId',
      ReturnValues: 'ALL_NEW',
    }),
  );

  if (!result.Attributes) throw new NotFoundError('Event not found');
  
  return toEventWithId(result.Attributes);
};
