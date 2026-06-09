import type { Db } from 'mongodb';
import type { RemovedTransaction, Transaction as PlaidSdkTransaction } from 'plaid';
import { PLAID_TRANSACTIONS_COLLECTION } from './constants.js';
import { mapPlaidTransactionToDocument, toClientTransaction } from './mapper.js';
import type {
  ClientPlaidTransaction,
  PlaidTransactionDocument,
} from './types.js';

type TransactionCollectionDocument = PlaidTransactionDocument & { _id?: unknown };

const findExistingResourceIds = async (
  db: Db,
  plaidTransactionIds: string[],
): Promise<Map<string, string>> => {
  if (plaidTransactionIds.length === 0) return new Map();

  const docs = await db
    .collection<TransactionCollectionDocument>(PLAID_TRANSACTIONS_COLLECTION)
    .find(
      { plaidTransactionId: { $in: plaidTransactionIds } },
      { projection: { plaidTransactionId: 1, resourceId: 1 } },
    )
    .toArray();

  return new Map(docs.map((doc) => [doc.plaidTransactionId, doc.resourceId]));
};

export const upsertPlaidTransactions = async (
  db: Db,
  transactions: PlaidSdkTransaction[],
  userId: string,
  plaidItemId: string,
  now = new Date(),
): Promise<PlaidTransactionDocument[]> => {
  if (transactions.length === 0) return [];

  const existingIds = await findExistingResourceIds(
    db,
    transactions.map((tx) => tx.transaction_id),
  );

  const documents = transactions.map((tx) =>
    mapPlaidTransactionToDocument(
      tx,
      userId,
      plaidItemId,
      existingIds.get(tx.transaction_id),
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

  await db
    .collection<TransactionCollectionDocument>(PLAID_TRANSACTIONS_COLLECTION)
    .bulkWrite(ops, { ordered: false });

  return documents;
};

export const markPlaidTransactionsRemoved = async (
  db: Db,
  removed: RemovedTransaction[],
  now = new Date(),
): Promise<number> => {
  if (removed.length === 0) return 0;

  const ops = removed.map(({ transaction_id }) => ({
    updateOne: {
      filter: { plaidTransactionId: transaction_id },
      update: {
        $set: { removed: true, updatedAt: now },
      },
    },
  }));

  const result = await db
    .collection<TransactionCollectionDocument>(PLAID_TRANSACTIONS_COLLECTION)
    .bulkWrite(ops, { ordered: false });

  return result.modifiedCount;
};

export const toClientTransactions = (
  documents: PlaidTransactionDocument[],
): ClientPlaidTransaction[] => documents.map(toClientTransaction);

export const toRemovedClientTransactions = (
  removed: RemovedTransaction[],
): { transaction_id: string }[] =>
  removed.map(({ transaction_id }) => ({ transaction_id }));
