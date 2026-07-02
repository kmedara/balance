import type { PlaidAccountDocument } from './types.js';
import { batchWriteAll, type DocumentWriteRequest } from '../dynamo/batch.js';
import { buildAccountItem } from '../dynamo/entities.js';
import { getTableName } from '../dynamo/tables.js';

const table = (): string => getTableName();

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
