import type { BudgetType, RecurrenceFrequency } from './events.js';

/** Discriminator for budget calendar events (wire + DynamoDB `eventType`). */
export const BUDGET_EVENT_TYPE = 'budget';

/** Discriminator for Plaid transaction calendar events. */
export const PLAID_TRANSACTION_EVENT_TYPE = 'plaid_transaction';

export const budgetTypes: BudgetType[] = ['Income', 'Expense'] satisfies readonly BudgetType[];

export const recurrenceFrequencies: RecurrenceFrequency[] = [
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'YEARLY',
] satisfies readonly RecurrenceFrequency[];
