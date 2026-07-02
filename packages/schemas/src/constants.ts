import type { BudgetType, RecurrenceFrequency } from './events.js';

export const budgetTypes = ['Income', 'Expense'] as const satisfies readonly BudgetType[];

export const recurrenceFrequencies = [
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'YEARLY',
] as const satisfies readonly RecurrenceFrequency[];
