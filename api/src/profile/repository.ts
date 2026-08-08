import { GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import type { AuthUser } from '@balance/schemas/auth';
import { DEFAULT_SUBSCRIPTION, type UserDocument } from '../data/user.js';
import { getDocClient } from '../dynamo/client.js';
import { buildProfileItem, toUserDocument } from '../dynamo/entities.js';
import { profileSk, userPk } from '../dynamo/keys.js';
import { serializeRecord } from '../dynamo/helpers.js';
import { getTableName } from '../dynamo/tables.js';

export type ProfileWriteFields = {
  email?: string;
  displayName?: string;
};

const table = (): string => getTableName();

export const findUserByCognitoSub = async (
  cognitoSub: string,
): Promise<UserDocument | undefined> => {
  const result = await getDocClient().send(
    new GetCommand({
      TableName: table(),
      Key: { PK: userPk(cognitoSub), SK: profileSk() },
      ConsistentRead: true,
    }),
  );

  return result.Item ? toUserDocument(result.Item) : undefined;
};

export const insertUserProfile = async (document: UserDocument): Promise<UserDocument> => {
  await getDocClient().send(
    new PutCommand({
      TableName: table(),
      Item: buildProfileItem(document),
      ConditionExpression: 'attribute_not_exists(PK)',
    }),
  );
  return document;
};

export const updateUserProfileFields = async (
  userId: string,
  fields: ProfileWriteFields,
  now = new Date(),
): Promise<UserDocument> => {
  const names: Record<string, string> = { '#updatedAt': 'updatedAt' };
  const values: Record<string, unknown> = { ':updatedAt': now };
  const sets = ['#updatedAt = :updatedAt'];

  if (fields.email !== undefined) {
    names['#email'] = 'email';
    values[':email'] = fields.email;
    sets.push('#email = :email');
  }

  if (fields.displayName !== undefined) {
    names['#displayName'] = 'displayName';
    values[':displayName'] = fields.displayName;
    sets.push('#displayName = :displayName');
  }

  await getDocClient().send(
    new UpdateCommand({
      TableName: table(),
      Key: { PK: userPk(userId), SK: profileSk() },
      UpdateExpression: `SET ${sets.join(', ')}`,
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: serializeRecord(values),
      ConditionExpression: 'attribute_exists(PK)',
    }),
  );

  const updated = await findUserByCognitoSub(userId);
  if (!updated) {
    throw new Error(`Profile missing after update for ${userId}`);
  }
  return updated;
};

/** Creates a profile from auth identity when none exists; no-op update otherwise. */
export const ensureUserExists = async (
  authUser: AuthUser,
  now = new Date(),
): Promise<UserDocument> => {
  const existing = await findUserByCognitoSub(authUser.userId);
  if (existing) return existing;

  return insertUserProfile({
    cognitoSub: authUser.userId,
    email: authUser.email,
    subscription: DEFAULT_SUBSCRIPTION,
    createdAt: now,
    updatedAt: now,
  });
};

/**
 * Login-time upsert: create if missing; sync email from the ID token only when it changed.
 */
export const upsertUserFromAuth = async (
  authUser: AuthUser,
  now = new Date(),
): Promise<UserDocument> => {
  const existing = await findUserByCognitoSub(authUser.userId);

  if (!existing) {
    return insertUserProfile({
      cognitoSub: authUser.userId,
      email: authUser.email,
      subscription: DEFAULT_SUBSCRIPTION,
      createdAt: now,
      updatedAt: now,
    });
  }

  if (authUser.email !== undefined && authUser.email !== existing.email) {
    return updateUserProfileFields(authUser.userId, { email: authUser.email }, now);
  }

  return existing;
};
