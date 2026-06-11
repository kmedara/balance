import type { Db } from 'mongodb';
import {
  USERS_COLLECTION,
  type UserDocument,
  type UserSubscription,
} from '../auth/user.repository.js';

type UserCollectionDocument = UserDocument & { _id?: unknown };

const toUserDocument = (doc: UserCollectionDocument): UserDocument => {
  const { _id, ...user } = doc;
  return user;
};

export const findUserByStripeCustomerId = async (
  db: Db,
  stripeCustomerId: string,
): Promise<UserDocument | null> => {
  const doc = await db
    .collection<UserCollectionDocument>(USERS_COLLECTION)
    .findOne({ stripeCustomerId });

  return doc ? toUserDocument(doc) : null;
};

export const setStripeCustomerId = async (
  db: Db,
  cognitoSub: string,
  stripeCustomerId: string,
  now = new Date(),
): Promise<void> => {
  await db.collection(USERS_COLLECTION).updateOne(
    { cognitoSub },
    { $set: { stripeCustomerId, updatedAt: now } },
  );
};

export const updateUserSubscription = async (
  db: Db,
  cognitoSub: string,
  subscription: UserSubscription,
  now = new Date(),
): Promise<void> => {
  await db.collection(USERS_COLLECTION).updateOne(
    { cognitoSub },
    { $set: { subscription, updatedAt: now } },
  );
};

/** Called from Stripe webhook handlers once implemented. */
export const updateSubscriptionByStripeCustomerId = async (
  db: Db,
  stripeCustomerId: string,
  subscription: UserSubscription,
  now = new Date(),
): Promise<UserDocument | null> => {
  const result = await db.collection<UserCollectionDocument>(USERS_COLLECTION).findOneAndUpdate(
    { stripeCustomerId },
    { $set: { subscription, updatedAt: now } },
    { returnDocument: 'after' },
  );

  if (!result) return null;

  const { _id, ...user } = result;
  return user;
};
