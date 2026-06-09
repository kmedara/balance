import type { AccountBase, Transaction as PlaidTransaction } from 'plaid';
import { randomUUID } from 'node:crypto';
import type {
  ClientPlaidTransaction,
  PlaidAccountDocument,
  PlaidTransactionDocument,
} from './types.js';

const parsePlaidDate = (date: string): Date => {
  const [year, month, day] = date.split('-').map(Number);
  if (year === undefined || month === undefined || day === undefined) {
    throw new Error(`Invalid Plaid date: ${date}`);
  }
  return new Date(year, month - 1, day);
};

const formatDateOnly = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const toClientTransaction = (
  doc: PlaidTransactionDocument,
): ClientPlaidTransaction => ({
  transaction_id: doc.plaidTransactionId,
  account_id: doc.plaidAccountId,
  amount: doc.amount,
  date: formatDateOnly(doc.postedDate),
  name: doc.name,
  merchant_name: doc.merchantName,
  pending: doc.pending,
});

export const mapPlaidTransactionToDocument = (
  tx: PlaidTransaction,
  userId: string,
  plaidItemId: string,
  existingResourceId?: string,
): PlaidTransactionDocument => {
  const category =
    tx.personal_finance_category?.primary != null
      ? [tx.personal_finance_category.primary, tx.personal_finance_category.detailed].filter(
          (value): value is string => Boolean(value),
        )
      : (tx.category ?? []);

  const location =
    tx.location &&
    Object.fromEntries(
      Object.entries(tx.location).filter((entry): entry is [string, string] => entry[1] != null),
    );

  return {
    resourceId: (existingResourceId ?? randomUUID()) as PlaidTransactionDocument['resourceId'],
    userId,
    plaidTransactionId: tx.transaction_id,
    plaidItemId,
    plaidAccountId: tx.account_id,
    name: tx.name,
    merchantName: tx.merchant_name,
    amount: tx.amount,
    currency: tx.iso_currency_code ?? tx.unofficial_currency_code ?? 'USD',
    category,
    categoryId: tx.category_id ?? tx.personal_finance_category?.primary ?? null,
    pending: tx.pending,
    authorizedDate: tx.authorized_date ? parsePlaidDate(tx.authorized_date) : null,
    postedDate: parsePlaidDate(tx.date),
    location: location && Object.keys(location).length > 0 ? location : undefined,
    removed: false,
  };
};

export const mapPlaidAccountToDocument = (
  account: AccountBase,
  userId: string,
  plaidItemId: string,
  existingResourceId?: string,
): PlaidAccountDocument => ({
  resourceId: (existingResourceId ?? randomUUID()) as PlaidAccountDocument['resourceId'],
  userId,
  plaidItemId,
  plaidAccountId: account.account_id,
  name: account.name,
  mask: account.mask ?? '',
  type: account.type,
  subtype: account.subtype ?? undefined,
  currentBalance: account.balances.current ?? 0,
  availableBalance: account.balances.available ?? undefined,
  currency: account.balances.iso_currency_code ?? account.balances.unofficial_currency_code ?? 'USD',
});
