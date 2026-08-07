import { GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import type { RemovedTransaction, Transaction as PlaidSdkTransaction } from 'plaid';
import { decryptAccessToken, encryptAccessToken } from './crypto.js';
import { mapPlaidTransactionToEventDocument, toClientTransaction } from './mapper.js';
import type {
  ClientPlaidTransaction,
  PlaidAccountDocument,
  PlaidItemDocument,
  PlaidSyncStateDocument,
  PlaidTransactionEventWithId,
} from './types.js';
import type { EventWithId, PlaidItemWithId, StoredPlaidItemDocument } from '../data/types.js';
import { getDocClient } from '../dynamo/client.js';
import { batchWriteAll, type DocumentWriteRequest } from '../dynamo/batch.js';
import {
  buildAccountItem,
  buildPlaidItemRecord,
  toPlaidItemFromItem,
  toPlaidSyncState,
  type PlaidSyncFields,
} from '../dynamo/entities.js';
import { plaidSk, userPk } from '../dynamo/keys.js';
import { serializeRecord } from '../dynamo/helpers.js';
import { queryAll } from '../dynamo/query.js';
import { getTableName } from '../dynamo/tables.js';
import {
  findEventByPlaidTransactionIds,
  hardDeleteEventsByPlaidTransactionIds,
  upsertEventByPlaidTransactionId,
} from '../events/repository.js';

const table = (): string => getTableName();

// Items

export const findPlaidItemByPlaidItemId = async (
  plaidItemId: string,
): Promise<PlaidItemWithId | undefined> => {
  // PlaidItemIndex is KEYS_ONLY: it yields the base-table key only, which we
  // use for a strongly consistent fetch of the full item.
  const items = await queryAll<Record<string, unknown>>({
    TableName: table(),
    IndexName: 'PlaidItemIndex',
    KeyConditionExpression: 'plaidItemId = :plaidItemId',
    ExpressionAttributeValues: { ':plaidItemId': plaidItemId },
    Limit: 1,
  });

  const match = items[0];
  if (typeof match?.PK !== 'string' || typeof match?.SK !== 'string') return undefined;

  const result = await getDocClient().send(
    new GetCommand({
      TableName: table(),
      Key: { PK: match.PK, SK: match.SK },
      ConsistentRead: true,
    }),
  );

  return result.Item ? toPlaidItemFromItem(result.Item) : undefined;
};

export const findActivePlaidItemsByUserId = async (
  userId: string,
): Promise<PlaidItemWithId[]> => {
  const items = await queryAll<Record<string, unknown>>({
    TableName: table(),
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :prefix)',
    ExpressionAttributeValues: {
      ':pk': userPk(userId),
      ':prefix': 'PLAID#',
    },
  });

  return items
    .filter((item) => item.status === 'active')
    .map(toPlaidItemFromItem);
};

export const upsertPlaidItem = async (
  input: {
    userId: string;
    plaidItemId: string;
    accessToken: string;
    institutionId?: string;
    institutionName?: string;
  },
  now = new Date(),
): Promise<PlaidItemWithId> => {
  const existing = await findPlaidItemByPlaidItemId(input.plaidItemId);

  const document: StoredPlaidItemDocument & { id: string; sync?: PlaidItemWithId['sync'] } = {
    id: input.plaidItemId,
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
    sync: existing?.sync,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  await getDocClient().send(
    new PutCommand({
      TableName: table(),
      Item: buildPlaidItemRecord(document),
    }),
  );

  const saved = await findPlaidItemByPlaidItemId(input.plaidItemId);
  if (!saved) {
    throw new Error('Failed to load Plaid item after upsert');
  }

  return saved;
};

export const updatePlaidItemLastSync = async (
  plaidItemId: string,
  now = new Date(),
): Promise<void> => {
  const item = await findPlaidItemByPlaidItemId(plaidItemId);
  if (!item) return;

  await getDocClient().send(
    new UpdateCommand({
      TableName: table(),
      Key: { PK: userPk(item.userId), SK: plaidSk(plaidItemId) },
      UpdateExpression:
        'SET lastSyncAt = :lastSyncAt, lastSynced = :lastSynced, updatedAt = :updatedAt',
      ExpressionAttributeValues: serializeRecord({
        ':lastSyncAt': now,
        ':lastSynced': now,
        ':updatedAt': now,
      }),
    }),
  );
};

export const getAccessToken = (item: PlaidItemDocument | PlaidItemWithId): string =>
  decryptAccessToken(item.accessTokenEncrypted);

// Accounts

export const upsertPlaidAccounts = async (
  accounts: PlaidAccountDocument[],
  now = new Date(),
): Promise<number> => {
  if (accounts.length === 0) return 0;

  const requests: DocumentWriteRequest[] = accounts.map((account) => ({
    PutRequest: {
      Item: buildAccountItem(account, now),
    },
  }));

  await batchWriteAll(table(), requests);
  return accounts.length;
};

// Sync state

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

// Transactions

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
): Promise<number> => {
  if (removed.length === 0) return 0;

  const plaidTransactionIds = removed.map(({ transaction_id }) => transaction_id);
  return hardDeleteEventsByPlaidTransactionIds(plaidTransactionIds);
};

export const toClientTransactions = (
  documents: (PlaidTransactionEventWithId | EventWithId)[],
): ClientPlaidTransaction[] =>
  documents.map((doc) => toClientTransaction(doc as PlaidTransactionEventWithId));

export const toRemovedClientTransactions = (
  removed: RemovedTransaction[],
): { transaction_id: string }[] =>
  removed.map(({ transaction_id }) => ({ transaction_id }));
