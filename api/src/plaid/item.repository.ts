import type { Db } from 'mongodb';
import { randomUUID } from 'node:crypto';
import type { PlaidItem } from '@kmedara/balance-domain';
import { decryptAccessToken, encryptAccessToken } from './crypto.js';
import { PLAID_ITEMS_COLLECTION } from './constants.js';
import type { PlaidItemDocument } from './types.js';

type PlaidItemCollectionDocument = PlaidItemDocument & { _id?: unknown };

const toPlaidItemDocument = (doc: PlaidItemCollectionDocument): PlaidItemDocument => {
  const { _id, ...item } = doc;
  return item;
};

export const findPlaidItemByPlaidItemId = async (
  db: Db,
  plaidItemId: string,
): Promise<PlaidItemDocument | null> => {
  const doc = await db
    .collection<PlaidItemCollectionDocument>(PLAID_ITEMS_COLLECTION)
    .findOne({ plaidItemId });

  return doc ? toPlaidItemDocument(doc) : null;
};

export const findActivePlaidItemsByUserId = async (
  db: Db,
  userId: string,
): Promise<PlaidItemDocument[]> => {
  const docs = await db
    .collection<PlaidItemCollectionDocument>(PLAID_ITEMS_COLLECTION)
    .find({ userId, status: 'active' })
    .toArray();

  return docs.map(toPlaidItemDocument);
};

export const upsertPlaidItem = async (
  db: Db,
  input: {
    userId: string;
    plaidItemId: string;
    accessToken: string;
    institutionId?: string;
    institutionName?: string;
  },
  now = new Date(),
): Promise<PlaidItemDocument> => {
  const existing = await findPlaidItemByPlaidItemId(db, input.plaidItemId);
  const resourceId = existing?.resourceId ?? (randomUUID() as PlaidItem['resourceId']);

  const document: PlaidItemDocument = {
    resourceId,
    userId: input.userId,
    plaidItemId: input.plaidItemId,
    accessTokenEncrypted: encryptAccessToken(input.accessToken),
    institutionId: input.institutionId,
    institutionName: input.institutionName,
    status: 'active',
    lastSyncAt: existing?.lastSyncAt,
    lastSynced: existing?.lastSynced,
    lastWebhook: existing?.lastWebhook,
    revokedAt: undefined,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  const { createdAt: _createdAt, ...documentFields } = document;

  await db.collection<PlaidItemCollectionDocument>(PLAID_ITEMS_COLLECTION).updateOne(
    { plaidItemId: input.plaidItemId },
    {
      $set: documentFields,
      $setOnInsert: { createdAt: existing?.createdAt ?? now },
    },
    { upsert: true },
  );

  return document;
};

export const updatePlaidItemLastSync = async (
  db: Db,
  resourceId: string,
  now = new Date(),
): Promise<void> => {
  await db.collection(PLAID_ITEMS_COLLECTION).updateOne(
    { resourceId },
    {
      $set: {
        lastSyncAt: now,
        lastSynced: now,
        updatedAt: now,
      },
    },
  );
};

export const getAccessToken = (item: PlaidItemDocument): string =>
  decryptAccessToken(item.accessTokenEncrypted);
