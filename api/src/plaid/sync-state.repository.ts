import type { PlaidSyncStateDocument } from './types.js';
import { findPlaidItemByPlaidItemId } from './item.repository.js';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient } from '../dynamo/client.js';
import type { PlaidSyncFields } from '../dynamo/entities.js';
import { toPlaidSyncState } from '../dynamo/entities.js';
import { plaidSk, userPk } from '../dynamo/keys.js';
import { serializeRecord } from '../dynamo/helpers.js';
import { getTableName } from '../dynamo/tables.js';

const table = (): string => getTableName();

const getItemKey = async (
  itemId: string,
): Promise<{ PK: string; SK: string; userId: string } | undefined> => {
  const item = await findPlaidItemByPlaidItemId(itemId);
  if (!item) return undefined;

  return {
    PK: userPk(item.userId),
    SK: plaidSk(item.plaidItemId),
    userId: item.userId,
  };
};

export const findSyncStateByItemId = async (
  itemId: string,
): Promise<PlaidSyncStateDocument | undefined> => {
  const item = await findPlaidItemByPlaidItemId(itemId);
  if (!item) return undefined;

  return toPlaidSyncState(item);
};

export const ensureSyncState = async (
  input: {
    itemId: string;
    userId: string;
    plaidItemId: string;
  },
  now = new Date(),
): Promise<PlaidSyncStateDocument> => {
  const existing = await findSyncStateByItemId(input.plaidItemId);
  const key = await getItemKey(input.plaidItemId);

  const sync: PlaidSyncFields = {
    transactionCursor: existing?.transactionCursor,
    lastSuccessfulSync: existing?.lastSuccessfulSync ?? now,
    lastAttemptedSync: now,
    status: existing?.status ?? 'idle',
  };

  if (key) {
    await getDocClient().send(
      new UpdateCommand({
        TableName: table(),
        Key: { PK: key.PK, SK: key.SK },
        UpdateExpression: 'SET sync = :sync, updatedAt = :updatedAt',
        ExpressionAttributeValues: serializeRecord({
          ':sync': sync,
          ':updatedAt': now,
        }),
      }),
    );
  }

  return {
    itemId: input.plaidItemId,
    userId: input.userId,
    plaidItemId: input.plaidItemId,
    transactionCursor: sync.transactionCursor,
    lastSuccessfulSync: sync.lastSuccessfulSync ?? now,
    lastAttemptedSync: sync.lastAttemptedSync ?? now,
    status: sync.status ?? 'idle',
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
};

const updateSync = async (
  plaidItemId: string,
  sync: Partial<PlaidSyncFields>,
  now: Date,
): Promise<void> => {
  const key = await getItemKey(plaidItemId);
  if (!key) return;

  const existing = await findSyncStateByItemId(plaidItemId);
  const merged: PlaidSyncFields = {
    transactionCursor: existing?.transactionCursor,
    lastSuccessfulSync: existing?.lastSuccessfulSync ?? now,
    lastAttemptedSync: existing?.lastAttemptedSync ?? now,
    status: existing?.status ?? 'idle',
    ...sync,
  };

  await getDocClient().send(
    new UpdateCommand({
      TableName: table(),
      Key: { PK: key.PK, SK: key.SK },
      UpdateExpression: 'SET sync = :sync, updatedAt = :updatedAt',
      ExpressionAttributeValues: serializeRecord({
        ':sync': merged,
        ':updatedAt': now,
      }),
    }),
  );
};

export const markSyncStateSyncing = async (
  plaidItemId: string,
  now = new Date(),
): Promise<void> => {
  await updateSync(plaidItemId, { status: 'syncing', lastAttemptedSync: now }, now);
};

export const completeSyncState = async (
  plaidItemId: string,
  cursor: string,
  now = new Date(),
): Promise<void> => {
  await updateSync(
    plaidItemId,
    {
      transactionCursor: cursor,
      lastSuccessfulSync: now,
      lastAttemptedSync: now,
      status: 'idle',
    },
    now,
  );
};

export const failSyncState = async (
  plaidItemId: string,
  now = new Date(),
): Promise<void> => {
  await updateSync(plaidItemId, { status: 'error', lastAttemptedSync: now }, now);
};

/** @deprecated Use findSyncStateByItemId with plaidItemId */
export const findSyncStateByItemResourceId = findSyncStateByItemId;
