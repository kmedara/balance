import type { BudgetType } from '../data/budget-document.js';

type BudgetLike = {
  title?: unknown;
  type?: unknown;
};

const isBudget = (value: unknown): value is BudgetLike & { title: string; type: BudgetType } => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const record = value as BudgetLike;
  return typeof record.title === 'string';
};

export { isBudget };
