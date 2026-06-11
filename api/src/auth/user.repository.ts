import type { Db } from 'mongodb';
import { randomUUID } from 'node:crypto';
import type { AuthUser } from './types.js';

export const USERS_COLLECTION = 'users';

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
  resourceId: `${string}-${string}-${string}-${string}-${string}`;
  cognitoSub: string;
  email?: string;
  stripeCustomerId?: string;
  subscription: UserSubscription;
  createdAt: Date;
  updatedAt: Date;
};

type UserCollectionDocument = UserDocument & { _id?: unknown };

const normalizeSubscription = (subscription?: UserSubscription): UserSubscription => ({
  ...DEFAULT_SUBSCRIPTION,
  ...subscription,
});

export const ensureUserIndexes = async (db: Db): Promise<void> => {
  await db.collection(USERS_COLLECTION).createIndex({ cognitoSub: 1 }, { unique: true });
  await db.collection(USERS_COLLECTION).createIndex({ resourceId: 1 }, { unique: true });
  await db.collection(USERS_COLLECTION).createIndex({ stripeCustomerId: 1 }, { sparse: true });
  await db.collection(
    USERS_COLLECTION,
  ).createIndex({ 'subscription.stripeSubscriptionId': 1 }, { sparse: true });
  if (process.env.AUTH_DISABLED !== 'true') {
    await db.collection(USERS_COLLECTION).createIndex({ email: 1 }, { sparse: true });
  }
};

export const findUserByCognitoSub = async (
  db: Db,
  cognitoSub: string,
): Promise<UserDocument | null> => {
  const doc = await db
    .collection<UserCollectionDocument>(USERS_COLLECTION)
    .findOne({ cognitoSub });

  if (!doc) return null;

  const { _id, subscription, ...user } = doc;
  return { ...user, subscription: normalizeSubscription(subscription) };
};

export const upsertUserFromAuth = async (
  db: Db,
  authUser: AuthUser,
  now = new Date(),
): Promise<UserDocument> => {
  const existing = await db
    .collection<UserCollectionDocument>(USERS_COLLECTION)
    .findOne({ cognitoSub: authUser.userId });

  const resourceId =
    existing?.resourceId ?? (randomUUID() as UserDocument['resourceId']);

  const document: UserDocument = {
    resourceId,
    cognitoSub: authUser.userId,
    email: authUser.email,
    stripeCustomerId: existing?.stripeCustomerId,
    subscription: normalizeSubscription(existing?.subscription),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  await db.collection<UserCollectionDocument>(USERS_COLLECTION).updateOne(
    { cognitoSub: authUser.userId },
    {
      $set: {
        email: document.email,
        updatedAt: now,
      },
      $setOnInsert: {
        resourceId: document.resourceId,
        cognitoSub: document.cognitoSub,
        subscription: DEFAULT_SUBSCRIPTION,
        createdAt: now,
      },
    },
    { upsert: true },
  );

  return document;
};
