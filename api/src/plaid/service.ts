import { CountryCode } from 'plaid';
import { plaidClient } from './client.js';
import { mapPlaidAccountToDocument } from './mapper.js';
import {
  completeSyncState,
  ensureSyncState,
  failSyncState,
  findActivePlaidItemsByUserId,
  findPlaidItemByPlaidItemId,
  findSyncStateByItemId,
  getAccessToken,
  markPlaidTransactionsRemoved,
  markSyncStateSyncing,
  toClientTransactions,
  toRemovedClientTransactions,
  updatePlaidItemLastSync,
  upsertPlaidAccounts,
  upsertPlaidItem,
  upsertPlaidTransactions,
} from './repository.js';
import type { ItemTransactionsSyncResult } from './types.js';
import type { PlaidItemWithId } from '../data/types.js';
import { BadRequestError, NotFoundError } from '../errors/http-error.js';

export const linkPlaidItem = async (input: {
  userId: string;
  plaidItemId: string;
  accessToken: string;
}): Promise<PlaidItemWithId> => {
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

  const item = await upsertPlaidItem({
    userId: input.userId,
    plaidItemId: input.plaidItemId,
    accessToken: input.accessToken,
    institutionId,
    institutionName,
  });

  await ensureSyncState({
    itemId: item.plaidItemId,
    userId: input.userId,
    plaidItemId: input.plaidItemId,
  });

  const { data: accountsData } = await plaidClient.accountsGet({
    access_token: input.accessToken,
  });

  const accounts = accountsData.accounts.map((account) =>
    mapPlaidAccountToDocument(account, input.userId, input.plaidItemId),
  );

  await upsertPlaidAccounts(accounts);

  return item;
};

const syncPlaidItemTransactions = async (
  item: PlaidItemWithId,
): Promise<ItemTransactionsSyncResult> => {
  const syncState =
    (await findSyncStateByItemId(item.plaidItemId)) ??
    (await ensureSyncState({
      itemId: item.plaidItemId,
      userId: item.userId,
      plaidItemId: item.plaidItemId,
    }));

  await markSyncStateSyncing(item.plaidItemId);

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
        data.added,
        item.userId,
        item.plaidItemId,
      );
      const modified = await upsertPlaidTransactions(
        data.modified,
        item.userId,
        item.plaidItemId,
      );

      addedDocs.push(...added);
      modifiedDocs.push(...modified);

      if (data.removed.length > 0) {
        await markPlaidTransactionsRemoved(data.removed);
        removed.push(...toRemovedClientTransactions(data.removed));
      }

      cursor = data.next_cursor;
      hasMore = data.has_more;
    }

    await completeSyncState(item.plaidItemId, cursor);
    await updatePlaidItemLastSync(item.plaidItemId);

    return {
      item_id: item.plaidItemId,
      added: toClientTransactions(addedDocs),
      modified: toClientTransactions(modifiedDocs),
      removed,
    };
  } catch (err) {
    await failSyncState(item.plaidItemId);
    throw err;
  }
};

export const syncTransactionsForPlaidItemId = async (
  plaidItemId: string,
  userId: string,
): Promise<ItemTransactionsSyncResult> => {
  const item = await findPlaidItemByPlaidItemId(plaidItemId);

  if (!item || item.userId !== userId || item.status !== 'active') {
    throw new NotFoundError(`No linked Plaid item found for item_id: ${plaidItemId}`);
  }

  return syncPlaidItemTransactions(item);
};

export const syncTransactionsForUser = async (
  userId: string,
): Promise<ItemTransactionsSyncResult[]> => {
  const items = await findActivePlaidItemsByUserId(userId);

  if (items.length === 0) {
    throw new BadRequestError('No linked bank accounts. Connect a bank account first.');
  }

  return Promise.all(items.map((item) => syncPlaidItemTransactions(item)));
};
