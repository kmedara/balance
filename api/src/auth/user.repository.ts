import type { Db } from 'mongodb';
import { randomUUID } from 'node:crypto';
import type { AuthUser } from './types.js';

export const USERS_COLLECTION = 'users';

export type UserDocument = {
  resourceId: `${string}-${string}-${string}-${string}-${string}`;
  cognitoSub: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
};

type UserCollectionDocument = UserDocument & { _id?: unknown };

export const ensureUserIndexes = async (db: Db): Promise<void> => {
  await db.collection(USERS_COLLECTION).createIndex({ cognitoSub: 1 }, { unique: true });
  await db.collection(USERS_COLLECTION).createIndex({ resourceId: 1 }, { unique: true });
  if (process.env.AUTH_DISABLED !== 'true') {
    await db.collection(USERS_COLLECTION).createIndex({ email: 1 }, { sparse: true });
  }
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
        createdAt: now,
      },
    },
    { upsert: true },
  );

  return document;
};
