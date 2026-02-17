import { BudgetCategory, BudgetFrequency } from '@__types/budget';
import { UnionToTuple } from './util';

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
