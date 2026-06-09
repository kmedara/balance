import type { Budget } from '@kmedara/balance-domain';

/** Stable ids so re-running the seed upserts instead of duplicating rows. */
export const SEED_BUDGET_IDS = {
  salary: '11111111-1111-4111-8111-111111111101',
  freelance: '11111111-1111-4111-8111-111111111102',
  rent: '22222222-2222-4222-8222-222222222201',
  groceries: '22222222-2222-4222-8222-222222222202',
  utilities: '22222222-2222-4222-8222-222222222203',
  transport: '22222222-2222-4222-8222-222222222204',
} as const;

export type CategorySeed = {
  name: string;
  displayName: string;
  isSystem: boolean;
};

export const categorySeeds: CategorySeed[] = [
  { name: 'food', displayName: 'Food', isSystem: true },
  { name: 'rent', displayName: 'Rent', isSystem: true },
  { name: 'utilities', displayName: 'Utilities', isSystem: true },
  { name: 'transportation', displayName: 'Transportation', isSystem: true },
  { name: 'entertainment', displayName: 'Entertainment', isSystem: true },
  { name: 'other', displayName: 'Other', isSystem: true },
];

type BudgetSeed = Budget & { endDate?: Date | null };

const today = (): Date => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const daysFromToday = (offset: number): Date => {
  const d = today();
  d.setDate(d.getDate() + offset);
  return d;
};

export const budgetSeeds: BudgetSeed[] = [
  {
    resourceId: SEED_BUDGET_IDS.salary,
    title: 'Salary',
    type: 'Income',
    category: 'Other',
    frequency: 'Bi-Weekly',
    startDate: daysFromToday(-200),
    amount: 4500,
  },
  {
    resourceId: SEED_BUDGET_IDS.freelance,
    title: 'Freelance',
    description: 'Side project income',
    type: 'Income',
    category: 'Other',
    frequency: 'Monthly',
    startDate: daysFromToday(-75),
    endDate: daysFromToday(45),
    amount: 800,
  },
  {
    resourceId: SEED_BUDGET_IDS.rent,
    title: 'Rent',
    type: 'Expense',
    category: 'Rent',
    frequency: 'Monthly',
    startDate: daysFromToday(-420),
    amount: 1650,
  },
  {
    resourceId: SEED_BUDGET_IDS.groceries,
    title: 'Groceries',
    type: 'Expense',
    category: 'Food',
    frequency: 'Weekly',
    startDate: daysFromToday(-21),
    endDate: daysFromToday(120),
    amount: 120,
  },
  {
    resourceId: SEED_BUDGET_IDS.utilities,
    title: 'Utilities',
    type: 'Expense',
    category: 'Utilities',
    frequency: 'Monthly',
    startDate: daysFromToday(-150),
    endDate: daysFromToday(-20),
    amount: 185,
  },
  {
    resourceId: SEED_BUDGET_IDS.transport,
    title: 'Transit pass',
    type: 'Expense',
    category: 'Transportation',
    frequency: 'Monthly',
    startDate: daysFromToday(-10),
    amount: 95,
  },
];
/** @deprecated Use budgetSeeds from seed.data.ts */
export const incomes = budgetSeeds.filter((b) => b.type === 'Income');
/** @deprecated Use budgetSeeds from seed.data.ts */
export const expenses = budgetSeeds.filter((b) => b.type === 'Expense');
