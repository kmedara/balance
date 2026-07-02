import type { EventDocument } from './event-document.js';

export type BudgetType = 'Income' | 'Expense';

export type BudgetDocumentFields = {
  title: string;
  description?: string;
  amount: number;
  type: BudgetType;
  category: string;
};

/** Budget row persisted in DynamoDB. */
export type BudgetDocument = EventDocument<BudgetDocumentFields>;
