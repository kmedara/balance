import type { EventDocument } from '@balance/domain';

export type PlaidTransactionEventFields = {
  title: string;
  name: string;
  merchantName?: string | null;
  amount: number;
  type: 'Income' | 'Expense';
  category?: string;
  currency: string;
  pending: boolean;
  plaidTransactionId: string;
  plaidItemId: string;
  plaidAccountId: string;
  authorizedDate?: Date | null;
  removed?: boolean;
};

export type PlaidTransactionEventDocument = EventDocument<PlaidTransactionEventFields>;
