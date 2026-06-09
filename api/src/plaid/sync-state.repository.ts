import type { Db } from 'mongodb';
import { PLAID_SYNC_STATE_COLLECTION } from './constants.js';
import type { PlaidSyncStateDocument } from './types.js';

type SyncStateCollectionDocument = PlaidSyncStateDocument & { _id?: unknown };

const toSyncStateDocument = (doc: SyncStateCollectionDocument): PlaidSyncStateDocument => {
  const { _id, ...state } = doc;
  return state;
};

export const findSyncStateByItemResourceId = async (
  db: Db,
  itemResourceId: string,
): Promise<PlaidSyncStateDocument | null> => {
  const doc = await db
    .collection<SyncStateCollectionDocument>(PLAID_SYNC_STATE_COLLECTION)
    .findOne({ itemId: itemResourceId });

  return doc ? toSyncStateDocument(doc) : null;
};

export const ensureSyncState = async (
  db: Db,
  input: {
    itemId: string;
    userId: string;
    plaidItemId: string;
  },
  now = new Date(),
): Promise<PlaidSyncStateDocument> => {
  const existing = await findSyncStateByItemResourceId(db, input.itemId);

  const document: PlaidSyncStateDocument = {
    itemId: input.itemId,
    userId: input.userId,
    plaidItemId: input.plaidItemId,
    transactionCursor: existing?.transactionCursor,
    lastSuccessfulSync: existing?.lastSuccessfulSync ?? now,
    lastAttemptedSync: now,
    status: existing?.status ?? 'idle',
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  const { createdAt: _createdAt, ...documentFields } = document;

  await db.collection<SyncStateCollectionDocument>(PLAID_SYNC_STATE_COLLECTION).updateOne(
    { itemId: input.itemId },
    {
      $set: documentFields,
      $setOnInsert: { createdAt: existing?.createdAt ?? now },
    },
    { upsert: true },
  );

  return document;
};

export const markSyncStateSyncing = async (
  db: Db,
  itemResourceId: string,
  now = new Date(),
): Promise<void> => {
  await db.collection(PLAID_SYNC_STATE_COLLECTION).updateOne(
    { itemId: itemResourceId },
    {
      $set: {
        status: 'syncing',
        lastAttemptedSync: now,
        updatedAt: now,
      },
    },
  );
};

export const completeSyncState = async (
  db: Db,
  itemResourceId: string,
  cursor: string,
  now = new Date(),
): Promise<void> => {
  await db.collection(PLAID_SYNC_STATE_COLLECTION).updateOne(
    { itemId: itemResourceId },
    {
      $set: {
        transactionCursor: cursor,
        lastSuccessfulSync: now,
        lastAttemptedSync: now,
        status: 'idle',
        updatedAt: now,
      },
    },
  );
};

export const failSyncState = async (
  db: Db,
  itemResourceId: string,
  now = new Date(),
): Promise<void> => {
  await db.collection(PLAID_SYNC_STATE_COLLECTION).updateOne(
    { itemId: itemResourceId },
    {
      $set: {
        status: 'error',
        lastAttemptedSync: now,
        updatedAt: now,
      },
    },
  );
};
