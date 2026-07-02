import { decryptAccessToken, encryptAccessToken } from './crypto.js';
import type { PlaidItemDocument } from './types.js';
import type { PlaidItemWithId, StoredPlaidItemDocument } from '../data/types.js';
import { GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient } from '../dynamo/client.js';
import { buildPlaidItemRecord, toPlaidItemFromItem } from '../dynamo/entities.js';
import { plaidSk, userPk } from '../dynamo/keys.js';
import { serializeRecord } from '../dynamo/helpers.js';
import { queryAll } from '../dynamo/query.js';
import { getTableName } from '../dynamo/tables.js';

const table = (): string => getTableName();

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
