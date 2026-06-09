import type { Db } from 'mongodb';
import {
  PLAID_ACCOUNTS_COLLECTION,
  PLAID_ITEMS_COLLECTION,
  PLAID_SYNC_STATE_COLLECTION,
  PLAID_TRANSACTIONS_COLLECTION,
} from './constants.js';

export const ensurePlaidIndexes = async (db: Db): Promise<void> => {
  await Promise.all([
    db.collection(PLAID_ITEMS_COLLECTION).createIndex({ resourceId: 1 }, { unique: true }),
    db.collection(PLAID_ITEMS_COLLECTION).createIndex({ plaidItemId: 1 }, { unique: true }),
    db.collection(PLAID_ITEMS_COLLECTION).createIndex({ userId: 1, status: 1 }),
    db.collection(PLAID_SYNC_STATE_COLLECTION).createIndex({ itemId: 1 }, { unique: true }),
    db.collection(PLAID_SYNC_STATE_COLLECTION).createIndex({ userId: 1 }),
    db.collection(PLAID_ACCOUNTS_COLLECTION).createIndex({ resourceId: 1 }, { unique: true }),
    db.collection(PLAID_ACCOUNTS_COLLECTION).createIndex({ plaidAccountId: 1 }, { unique: true }),
    db.collection(PLAID_ACCOUNTS_COLLECTION).createIndex({ userId: 1, plaidItemId: 1 }),
    db.collection(PLAID_TRANSACTIONS_COLLECTION).createIndex({ resourceId: 1 }, { unique: true }),
    db
      .collection(PLAID_TRANSACTIONS_COLLECTION)
      .createIndex({ plaidTransactionId: 1 }, { unique: true }),
    db.collection(PLAID_TRANSACTIONS_COLLECTION).createIndex({ userId: 1, postedDate: -1 }),
    db.collection(PLAID_TRANSACTIONS_COLLECTION).createIndex({ plaidAccountId: 1, postedDate: -1 }),
  ]);
};
