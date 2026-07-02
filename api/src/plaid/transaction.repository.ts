import type { RemovedTransaction, Transaction as PlaidSdkTransaction } from 'plaid';
import {
  findEventByPlaidTransactionIds,
  markEventsRemovedByPlaidTransactionIds,
  upsertEventByPlaidTransactionId,
} from '../events/repository.js';
import type { EventWithId } from '../data/types.js';
import { mapPlaidTransactionToEventDocument, toClientTransaction } from './mapper.js';
import type { ClientPlaidTransaction, PlaidTransactionEventWithId } from './types.js';

export const upsertPlaidTransactions = async (
  transactions: PlaidSdkTransaction[],
  userId: string,
  plaidItemId: string,
  now = new Date(),
): Promise<PlaidTransactionEventWithId[]> => {
  if (transactions.length === 0) return [];

  const existingEvents = await findEventByPlaidTransactionIds(
    transactions.map((tx) => tx.transaction_id),
  );

  const savedEvents = await Promise.all(
    transactions.map(async (tx) => {
      const existing = existingEvents.get(tx.transaction_id);
      const document = mapPlaidTransactionToEventDocument(tx, userId, plaidItemId);
      return upsertEventByPlaidTransactionId(
        document,
        existing,
        now,
      ) as Promise<PlaidTransactionEventWithId>;
    }),
  );

  return savedEvents;
};

export const markPlaidTransactionsRemoved = async (
  removed: RemovedTransaction[],
  now = new Date(),
): Promise<number> => {
  if (removed.length === 0) return 0;

  const plaidTransactionIds = removed.map(({ transaction_id }) => transaction_id);
  return markEventsRemovedByPlaidTransactionIds(plaidTransactionIds, now);
};

export const toClientTransactions = (
  documents: (PlaidTransactionEventWithId | EventWithId)[],
): ClientPlaidTransaction[] =>
  documents.map((doc) => toClientTransaction(doc as PlaidTransactionEventWithId));

export const toRemovedClientTransactions = (
  removed: RemovedTransaction[],
): { transaction_id: string }[] =>
  removed.map(({ transaction_id }) => ({ transaction_id }));
