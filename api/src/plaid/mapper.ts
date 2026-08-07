import type { AccountBase, Transaction as PlaidTransaction } from 'plaid';
import type { ClientPlaidTransaction, PlaidAccountDocument, PlaidTransactionEventWithId } from './types.js';
import { buildSingleOccurrenceRRule } from '../events/recurrence.utils.js';
import { PLAID_TRANSACTION_EVENT_TYPE } from '@balance/schemas/constants';
import type { PlaidTransactionEventFields } from './event-document.js';

import type { StoredEventDocument } from '../data/types.js';

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
  doc: PlaidTransactionEventWithId,
): ClientPlaidTransaction => ({
  transaction_id: doc.plaidTransactionId,
  account_id: doc.plaidAccountId,
  amount: doc.amount,
  date: formatDateOnly(doc.dtstart ?? new Date()),
  name: doc.name,
  merchant_name: doc.merchantName,
  pending: doc.pending,
});

export const mapPlaidTransactionToEventDocument = (
  tx: PlaidTransaction,
  userId: string,
  plaidItemId: string,
): StoredEventDocument<PlaidTransactionEventFields> => {
  const category =
    tx.personal_finance_category?.primary != null
      ? [tx.personal_finance_category.primary, tx.personal_finance_category.detailed].filter(
          (value): value is string => Boolean(value),
        )
      : (tx.category ?? []);

  const postedDate = parsePlaidDate(tx.date);
  const { rrule, dtstart } = buildSingleOccurrenceRRule(postedDate);
  const title = tx.merchant_name?.trim() || tx.name;
  const isExpense = tx.amount > 0;

  return {
    userId,
    eventType: PLAID_TRANSACTION_EVENT_TYPE,
    title,
    name: tx.name,
    merchantName: tx.merchant_name,
    amount: tx.amount,
    type: isExpense ? 'Expense' : 'Income',
    category: category[0],
    currency: tx.iso_currency_code ?? tx.unofficial_currency_code ?? 'USD',
    pending: tx.pending,
    plaidTransactionId: tx.transaction_id,
    plaidItemId,
    plaidAccountId: tx.account_id,
    authorizedDate: tx.authorized_date ? parsePlaidDate(tx.authorized_date) : null,
    rrule,
    dtstart,
    removed: false,
  };
};

export const mapPlaidAccountToDocument = (
  account: AccountBase,
  userId: string,
  plaidItemId: string,
): PlaidAccountDocument => ({
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
