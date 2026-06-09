import type { BudgetDocumentFields } from '@kmedara/balance-domain';
import type { EventDocumentInput } from '@kmedara/balance-domain';
import { RRule } from '../src/budgets/rrule.utils.js';
import { BUDGET_EVENT_TYPE, SEED_USER_ID } from './seed.constants.js';

type BudgetDocumentInput = EventDocumentInput<BudgetDocumentFields>;

const budgetSeed = (
  fields: Omit<BudgetDocumentInput, 'userId' | 'eventType'>,
): BudgetDocumentInput => ({
  ...fields,
  userId: SEED_USER_ID,
  eventType: BUDGET_EVENT_TYPE,
});
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

export const budgetSeeds: BudgetDocumentInput[] = [
  budgetSeed({
    resourceId: SEED_BUDGET_IDS.salary,
    title: 'Salary',
    type: 'Income',
    category: 'Other',
    rrule: new RRule({
      freq: RRule.WEEKLY,
      interval: 2,
      dtstart: daysFromToday(-200),
    }).toString(),
    amount: 4500,
  }),
  budgetSeed({
    resourceId: SEED_BUDGET_IDS.freelance,
    title: 'Freelance',
    description: 'Side project income',
    type: 'Income',
    category: 'Other',
    rrule: new RRule({
      freq: RRule.MONTHLY,
      interval: 1,
      dtstart:daysFromToday(-75),
      until: daysFromToday(45),
    }).toString(),
    amount: 800,
  }),
  budgetSeed({
    resourceId: SEED_BUDGET_IDS.rent,
    title: 'Rent',
    type: 'Expense',
    category: 'Rent',
    rrule: new RRule({
      freq: RRule.MONTHLY,
      interval: 1,
      dtstart:daysFromToday(-175),
    }).toString(),
    amount: 1650,
  }),
  budgetSeed({
    resourceId: SEED_BUDGET_IDS.groceries,
    title: 'Groceries',
    type: 'Expense',
    category: 'Food',
    rrule: new RRule({
      freq: RRule.MONTHLY,
      interval: 1,
      dtstart:daysFromToday(-21),
      until: daysFromToday(120),
    }).toString(),
    amount: 120,
  }),
  budgetSeed({
    resourceId: SEED_BUDGET_IDS.utilities,
    title: 'Utilities',
    type: 'Expense',
    category: 'Utilities',
    rrule: new RRule({
      freq: RRule.MONTHLY,
      interval: 1,
      dtstart:daysFromToday(-150),
      until: daysFromToday(-20),
    }).toString(),
    amount: 185,
  }),
  budgetSeed({
    resourceId: SEED_BUDGET_IDS.transport,
    title: 'Transit pass',
    type: 'Expense',
    category: 'Transportation',
    rrule: new RRule({
      freq: RRule.MONTHLY,
      interval: 1,
      dtstart:daysFromToday(-10),
    }).toString(),
    amount: 95,
  }),
];

/** @deprecated Use budgetSeeds from seed.data.ts */
export const incomes = budgetSeeds.filter((b) => b.type === 'Income');
/** @deprecated Use budgetSeeds from seed.data.ts */
export const expenses = budgetSeeds.filter((b) => b.type === 'Expense');
