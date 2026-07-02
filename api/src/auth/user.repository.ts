import { GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import type { AuthUser } from './types.js';
import { getDocClient } from '../dynamo/client.js';
import { buildProfileItem, toUserDocument } from '../dynamo/entities.js';
import { profileSk, userPk } from '../dynamo/keys.js';
import { serializeRecord } from '../dynamo/helpers.js';
import { getTableName } from '../dynamo/tables.js';

export type SubscriptionTier = 'free' | 'plus' | 'pro';

export type SubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'canceled'
  | 'none';

export type UserSubscription = {
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  stripeSubscriptionId?: string;
  currentPeriodEnd?: Date;
  trialEnd?: Date;
};

export const DEFAULT_SUBSCRIPTION: UserSubscription = {
  tier: 'free',
  status: 'none',
};

export type UserDocument = {
  cognitoSub: string;
  email?: string;
  stripeCustomerId?: string;
  subscription: UserSubscription;
  createdAt: Date;
  updatedAt: Date;
};

const normalizeSubscription = (subscription?: UserSubscription): UserSubscription => ({
  ...DEFAULT_SUBSCRIPTION,
  ...subscription,
});

const table = (): string => getTableName();

export const findUserByCognitoSub = async (
  cognitoSub: string,
): Promise<UserDocument | undefined> => {
  const result = await getDocClient().send(
    new GetCommand({
      TableName: table(),
      Key: { PK: userPk(cognitoSub), SK: profileSk() },
      // Auth runs on every request and may read right after upsert; a consistent
      // read avoids a stale profile / missing subscription on first calls.
      ConsistentRead: true,
    }),
  );

  return result.Item ? toUserDocument(result.Item) : undefined;
};

export const upsertUserFromAuth = async (
  authUser: AuthUser,
  now = new Date(),
): Promise<UserDocument> => {
  const existing = await findUserByCognitoSub(authUser.userId);

  const document: UserDocument = {
    cognitoSub: authUser.userId,
    email: authUser.email,
    stripeCustomerId: existing?.stripeCustomerId,
    subscription: normalizeSubscription(existing?.subscription),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  if (existing) {
    await getDocClient().send(
      new UpdateCommand({
        TableName: table(),
        Key: { PK: userPk(authUser.userId), SK: profileSk() },
        UpdateExpression: 'SET email = :email, updatedAt = :updatedAt',
        ExpressionAttributeValues: serializeRecord({
          ':email': document.email,
          ':updatedAt': now,
        }),
      }),
    );
  } else {
    await getDocClient().send(
      new PutCommand({
        TableName: table(),
        Item: buildProfileItem(document),
        ConditionExpression: 'attribute_not_exists(PK)',
      }),
    );
  }

  return document;
};
