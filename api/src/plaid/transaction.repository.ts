import type { Db } from 'mongodb';
import type { RemovedTransaction, Transaction as PlaidSdkTransaction } from 'plaid';
import { materializeOccurrenceDocuments } from '../events/expand-occurrences.js';
import { EVENTS_COLLECTION } from '../events/repository.js';
import {
  deleteOccurrencesForEventResourceIds,
  upsertOccurrences,
} from '../events/occurrence.repository.js';
import { PLAID_TRANSACTION_EVENT_TYPE } from './constants.js';
import type { PlaidTransactionEventDocument } from './event-document.js';
import { mapPlaidTransactionToEventDocument, toClientTransaction } from './mapper.js';
import type { ClientPlaidTransaction } from './types.js';

type EventCollectionDocument = PlaidTransactionEventDocument & { _id?: unknown };

const sameCalendarDay = (left: Date, right: Date): boolean =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

const findExistingEvents = async (
  db: Db,
  plaidTransactionIds: string[],
): Promise<Map<string, PlaidTransactionEventDocument>> => {
  if (plaidTransactionIds.length === 0) return new Map();

  const docs = await db
    .collection<EventCollectionDocument>(EVENTS_COLLECTION)
    .find({
      eventType: PLAID_TRANSACTION_EVENT_TYPE,
      plaidTransactionId: { $in: plaidTransactionIds },
    })
    .toArray();

  return new Map(
    docs.map((doc) => {
      const { _id, ...event } = doc;
      return [event.plaidTransactionId, event];
    }),
  );
};

const syncOccurrencesForEvent = async (
  db: Db,
  event: PlaidTransactionEventDocument,
  previousDtstart: Date | undefined,
  now: Date,
): Promise<void> => {
  const dtstartChanged =
    previousDtstart !== undefined &&
    event.dtstart !== undefined &&
    !sameCalendarDay(previousDtstart, event.dtstart);

  if (previousDtstart === undefined || dtstartChanged) {
    await deleteOccurrencesForEventResourceIds(db, [event.resourceId]);
  }

  if (event.removed) return;

  const occurrences = materializeOccurrenceDocuments({
    eventResourceId: event.resourceId,
    userId: event.userId,
    eventType: PLAID_TRANSACTION_EVENT_TYPE,
    rrule: event.rrule,
    dtstart: event.dtstart,
  });

  await upsertOccurrences(db, occurrences, now);
};

export const upsertPlaidTransactions = async (
  db: Db,
  transactions: PlaidSdkTransaction[],
  userId: string,
  plaidItemId: string,
  now = new Date(),
): Promise<PlaidTransactionEventDocument[]> => {
  if (transactions.length === 0) return [];

  const existingEvents = await findExistingEvents(
    db,
    transactions.map((tx) => tx.transaction_id),
  );

  const documents = transactions.map((tx) =>
    mapPlaidTransactionToEventDocument(
      tx,
      userId,
      plaidItemId,
      existingEvents.get(tx.transaction_id)?.resourceId,
    ),
  );

  const ops = documents.map((document) => ({
    updateOne: {
      filter: { plaidTransactionId: document.plaidTransactionId },
      update: {
        $set: { ...document, removed: false, updatedAt: now },
        $setOnInsert: { createdAt: now },
      },
      upsert: true,
    },
  }));

  await db.collection<EventCollectionDocument>(EVENTS_COLLECTION).bulkWrite(ops, { ordered: false });

  await Promise.all(
    documents.map((document) =>
      syncOccurrencesForEvent(
        db,
        document,
        existingEvents.get(document.plaidTransactionId)?.dtstart,
        now,
      ),
    ),
  );

  return documents;
};

export const markPlaidTransactionsRemoved = async (
  db: Db,
  removed: RemovedTransaction[],
  now = new Date(),
): Promise<number> => {
  if (removed.length === 0) return 0;

  const plaidTransactionIds = removed.map(({ transaction_id }) => transaction_id);
  const existingEvents = await findExistingEvents(db, plaidTransactionIds);
  const eventResourceIds = [...existingEvents.values()].map((event) => event.resourceId);

  const ops = removed.map(({ transaction_id }) => ({
    updateOne: {
      filter: { plaidTransactionId: transaction_id },
      update: {
        $set: { removed: true, updatedAt: now },
      },
    },
  }));

  const result = await db
    .collection<EventCollectionDocument>(EVENTS_COLLECTION)
    .bulkWrite(ops, { ordered: false });

  if (eventResourceIds.length > 0) {
    await deleteOccurrencesForEventResourceIds(db, eventResourceIds);
  }

  return result.modifiedCount;
};

export const toClientTransactions = (
  documents: PlaidTransactionEventDocument[],
): ClientPlaidTransaction[] => documents.map(toClientTransaction);

export const toRemovedClientTransactions = (
  removed: RemovedTransaction[],
): { transaction_id: string }[] =>
  removed.map(({ transaction_id }) => ({ transaction_id }));
