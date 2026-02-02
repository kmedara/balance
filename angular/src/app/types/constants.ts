import { BudgetCategory, BudgetFrequency } from './types';
import { RequireAll, UnionToTuple } from './utility.types';

export const frequencies: UnionToTuple<BudgetFrequency> = [
  'Once',
  'Daily',
  'Weekly',
  'Bi-Weekly',
  'Semi-Monthly',
  'Monthly',
  'Quarterly',
  'Semi-Annually',
  'Annually',
];

export const categories: UnionToTuple<BudgetCategory> = ['Income', 'Expense'];
