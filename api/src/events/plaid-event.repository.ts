import { ttlEpochSeconds } from '../data/dates.js';
import type { EventWithId, StoredEventDocument } from '../data/types.js';
import { TransactWriteCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient } from '../dynamo/client.js';
import { buildEventItem, buildTxnRefItem, eventFromItem, resolveEventSk } from '../dynamo/entities.js';
import { txnRefPk, txnRefSk, userPk } from '../dynamo/keys.js';
import { serializeRecord, toEventWithId } from '../dynamo/helpers.js';
import { batchGetItems } from '../dynamo/query.js';
import { getTableName } from '../dynamo/tables.js';
import { REMOVED_EVENT_TTL_DAYS } from './constants.js';

const table = (): string => getTableName();

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

export const markEventsRemovedByPlaidTransactionIds = async (
  plaidTransactionIds: string[],
  now: Date,
): Promise<number> => {
  if (plaidTransactionIds.length === 0) return 0;

  // Refs carry the owning user + event SK, so we reach each event with one
  // BatchGet — no per-event index lookup.
  const refs = await batchGetItems<Record<string, unknown>>(
    table(),
    plaidTransactionIds.map((plaidTransactionId) => ({
      PK: txnRefPk(plaidTransactionId),
      SK: txnRefSk(),
    })),
  );

  if (refs.length === 0) return 0;

  const ttl = ttlEpochSeconds(REMOVED_EVENT_TTL_DAYS, now);
  let modified = 0;

  await Promise.all(
    refs.map(async (ref) => {
      if (typeof ref.userId !== 'string' || typeof ref.eventSk !== 'string') return;

      await getDocClient().send(
        new UpdateCommand({
          TableName: table(),
          Key: { PK: userPk(ref.userId), SK: ref.eventSk },
          UpdateExpression:
            'SET #status = :status, removed = :removed, updatedAt = :updatedAt, #ttl = :ttl',
          ExpressionAttributeNames: { '#status': 'status', '#ttl': 'ttl' },
          ExpressionAttributeValues: serializeRecord({
            ':status': 'removed',
            ':removed': true,
            ':updatedAt': now,
            ':ttl': ttl,
          }),
        }),
      );

      modified += 1;
    }),
  );

  return modified;
};
