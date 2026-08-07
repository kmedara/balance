import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import type { UserDocument, UserSubscription } from '../profile/repository.js';
import { getDocClient } from '../dynamo/client.js';
import { toUserDocument } from '../dynamo/entities.js';
import { profileSk, userPk, userRef } from '../dynamo/keys.js';
import { serializeRecord } from '../dynamo/helpers.js';
import { queryAll } from '../dynamo/query.js';
import { getTableName } from '../dynamo/tables.js';
import { NotFoundError } from '../errors/http-error.js';

const table = (): string => getTableName();

export const findUserByStripeCustomerId = async (
  stripeCustomerId: string,
): Promise<UserDocument | undefined> => {
  // StripeCustomerIndex is KEYS_ONLY: it returns only the base-table key
  // (PK/SK) and index keys, which is all we need to fetch the authoritative
  // profile with a strongly consistent read.
  const items = await queryAll<Record<string, unknown>>({
    TableName: table(),
    IndexName: 'StripeCustomerIndex',
    KeyConditionExpression: 'stripeCustomerId = :stripeCustomerId',
    ExpressionAttributeValues: { ':stripeCustomerId': stripeCustomerId },
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

  return result.Item ? toUserDocument(result.Item) : undefined;
};

export const setStripeCustomerId = async (
  cognitoSub: string,
  stripeCustomerId: string,
  now = new Date(),
): Promise<void> => {
  await getDocClient().send(
    new UpdateCommand({
      TableName: table(),
      Key: { PK: userPk(cognitoSub), SK: profileSk() },
      UpdateExpression:
        'SET stripeCustomerId = :stripeCustomerId, userRef = :userRef, updatedAt = :updatedAt',
      ExpressionAttributeValues: serializeRecord({
        ':stripeCustomerId': stripeCustomerId,
        ':userRef': userRef(cognitoSub),
        ':updatedAt': now,
      }),
    }),
  );
};

export const updateUserSubscription = async (
  cognitoSub: string,
  subscription: UserSubscription,
  now = new Date(),
): Promise<void> => {
  await getDocClient().send(
    new UpdateCommand({
      TableName: table(),
      Key: { PK: userPk(cognitoSub), SK: profileSk() },
      UpdateExpression: 'SET subscription = :subscription, updatedAt = :updatedAt',
      ExpressionAttributeValues: serializeRecord({
        ':subscription': subscription,
        ':updatedAt': now,
      }),
    }),
  );
};

export const updateSubscriptionByStripeCustomerId = async (
  stripeCustomerId: string,
  subscription: UserSubscription,
  now = new Date(),
): Promise<UserDocument> => {
  const user = await findUserByStripeCustomerId(stripeCustomerId);
  if (!user) throw new NotFoundError('User not found');

  await updateUserSubscription(user.cognitoSub, subscription, now);

  return {
    ...user,
    subscription,
    updatedAt: now,
  };
};
