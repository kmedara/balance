import type { Db } from 'mongodb';
import { CountryCode } from 'plaid';
import { plaidClient } from './client.js';
import { getAccessToken, updatePlaidItemLastSync } from './item.repository.js';
import { mapPlaidAccountToDocument } from './mapper.js';
import { upsertPlaidAccounts, findPlaidAccountResourceId } from './account.repository.js';
import {
  markPlaidTransactionsRemoved,
  toClientTransactions,
  toRemovedClientTransactions,
  upsertPlaidTransactions,
} from './transaction.repository.js';
import {
  completeSyncState,
  ensureSyncState,
  failSyncState,
  findSyncStateByItemResourceId,
  markSyncStateSyncing,
} from './sync-state.repository.js';
import {
  findActivePlaidItemsByUserId,
  findPlaidItemByPlaidItemId,
  upsertPlaidItem,
} from './item.repository.js';
import type { ItemTransactionsSyncResult, PlaidItemDocument } from './types.js';

export const linkPlaidItem = async (
  db: Db,
  input: {
    userId: string;
    plaidItemId: string;
    accessToken: string;
  },
): Promise<PlaidItemDocument> => {
  const { data: itemData } = await plaidClient.itemGet({
    access_token: input.accessToken,
  });

  let institutionName: string | undefined;
  const institutionId = itemData.item.institution_id ?? undefined;

  if (institutionId) {
    try {
      const { data: institutionData } = await plaidClient.institutionsGetById({
        institution_id: institutionId,
        country_codes: [CountryCode.Us],
      });
      institutionName = institutionData.institution.name;
    } catch {
      institutionName = undefined;
    }
  }

  const item = await upsertPlaidItem(db, {
    userId: input.userId,
    plaidItemId: input.plaidItemId,
    accessToken: input.accessToken,
    institutionId,
    institutionName,
  });

  await ensureSyncState(db, {
    itemId: item.resourceId,
    userId: input.userId,
    plaidItemId: input.plaidItemId,
  });

  const { data: accountsData } = await plaidClient.accountsGet({
    access_token: input.accessToken,
  });

  const accounts = await Promise.all(
    accountsData.accounts.map(async (account) => {
      const existingResourceId = await findPlaidAccountResourceId(db, account.account_id);
      return mapPlaidAccountToDocument(
        account,
        input.userId,
        input.plaidItemId,
        existingResourceId ?? undefined,
      );
    }),
  );

  await upsertPlaidAccounts(db, accounts);

  return item;
};

const syncPlaidItemTransactions = async (
  db: Db,
  item: PlaidItemDocument,
): Promise<ItemTransactionsSyncResult> => {
  const syncState =
    (await findSyncStateByItemResourceId(db, item.resourceId)) ??
    (await ensureSyncState(db, {
      itemId: item.resourceId,
      userId: item.userId,
      plaidItemId: item.plaidItemId,
    }));

  await markSyncStateSyncing(db, item.resourceId);

  const accessToken = getAccessToken(item);
  const addedDocs = [];
  const modifiedDocs = [];
  const removed: { transaction_id: string }[] = [];

  let cursor = syncState.transactionCursor ?? '';
  let hasMore = true;

  try {
    while (hasMore) {
      const { data } = await plaidClient.transactionsSync({
        access_token: accessToken,
        cursor,
      });

      const added = await upsertPlaidTransactions(
        db,
        data.added,
        item.userId,
        item.plaidItemId,
      );
      const modified = await upsertPlaidTransactions(
        db,
        data.modified,
        item.userId,
        item.plaidItemId,
      );

      addedDocs.push(...added);
      modifiedDocs.push(...modified);

      if (data.removed.length > 0) {
        await markPlaidTransactionsRemoved(db, data.removed);
        removed.push(...toRemovedClientTransactions(data.removed));
      }

      cursor = data.next_cursor;
      hasMore = data.has_more;
    }

    await completeSyncState(db, item.resourceId, cursor);
    await updatePlaidItemLastSync(db, item.resourceId);

    return {
      item_id: item.plaidItemId,
      added: toClientTransactions(addedDocs),
      modified: toClientTransactions(modifiedDocs),
      removed,
    };
  } catch (err) {
    await failSyncState(db, item.resourceId);
    throw err;
  }
};

export const syncTransactionsForPlaidItemId = async (
  db: Db,
  plaidItemId: string,
  userId: string,
): Promise<ItemTransactionsSyncResult> => {
  const item = await findPlaidItemByPlaidItemId(db, plaidItemId);

  if (!item || item.userId !== userId || item.status !== 'active') {
    throw new Error(`No linked Plaid item found for item_id: ${plaidItemId}`);
  }

  return syncPlaidItemTransactions(db, item);
};

export const syncTransactionsForUser = async (
  db: Db,
  userId: string,
): Promise<ItemTransactionsSyncResult[]> => {
  const items = await findActivePlaidItemsByUserId(db, userId);

  if (items.length === 0) {
    throw new Error('No linked bank accounts. Connect a bank account first.');
  }

  return Promise.all(items.map((item) => syncPlaidItemTransactions(db, item)));
};
