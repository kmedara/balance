import type { Db } from 'mongodb';
import { PLAID_ACCOUNTS_COLLECTION } from './constants.js';
import type { PlaidAccountDocument } from './types.js';

type AccountCollectionDocument = PlaidAccountDocument & { _id?: unknown };

export const upsertPlaidAccounts = async (
  db: Db,
  accounts: PlaidAccountDocument[],
  now = new Date(),
): Promise<number> => {
  if (accounts.length === 0) return 0;

  const ops = accounts.map((account) => ({
    updateOne: {
      filter: { plaidAccountId: account.plaidAccountId },
      update: {
        $set: { ...account, updatedAt: now },
        $setOnInsert: { createdAt: now },
      },
      upsert: true,
    },
  }));

  const result = await db
    .collection<AccountCollectionDocument>(PLAID_ACCOUNTS_COLLECTION)
    .bulkWrite(ops, { ordered: false });

  return result.upsertedCount + result.modifiedCount;
};

export const findPlaidAccountResourceId = async (
  db: Db,
  plaidAccountId: string,
): Promise<string | null> => {
  const doc = await db
    .collection<AccountCollectionDocument>(PLAID_ACCOUNTS_COLLECTION)
    .findOne({ plaidAccountId }, { projection: { resourceId: 1 } });

  return doc?.resourceId ?? null;
};
