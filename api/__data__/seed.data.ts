import type { BudgetDocumentFields } from '@balance/domain';
import { RRule } from '../src/events/recurrence.utils.js';
import { BUDGET_EVENT_TYPE, SEED_USER_ID } from './seed.constants.js';
import type { StoredEventDocument } from '../src/data/types.js';

type BudgetSeedDocument = StoredEventDocument<BudgetDocumentFields>;

const budgetSeed = (
  fields: Omit<BudgetSeedDocument, 'userId' | 'eventType'>,
): BudgetSeedDocument & { _id: string } => ({
  ...fields,
  userId: SEED_USER_ID,
  eventType: BUDGET_EVENT_TYPE,
});

/** Stable ObjectIds so re-running the seed upserts instead of duplicating rows. */
export const SEED_BUDGET_IDS = {
  salary: '6478f1f77bcf86cd79943901',
  freelance: '6478f1f77bcf86cd79943902',
  rent: '6478f1f77bcf86cd79943903',
  groceries: '6478f1f77bcf86cd79943904',
  utilities: '6478f1f77bcf86cd79943905',
  transport: '6478f1f77bcf86cd79943906',
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

export const budgetSeeds: Array<BudgetSeedDocument & { _id: string }> = [
  budgetSeed({
    _id: SEED_BUDGET_IDS.salary,
    title: 'Salary',
    type: 'Income',
    category: 'Other',
    rrule: new RRule({
      freq: RRule.WEEKLY,
      interval: 2,
      dtstart: daysFromToday(-200),
    }).toString(),
    amount: 4500,
    dtstart: daysFromToday(-200),
  }),
  budgetSeed({
    _id: SEED_BUDGET_IDS.freelance,
    title: 'Freelance',
    description: 'Side project income',
    type: 'Income',
    category: 'Other',
    rrule: new RRule({
      freq: RRule.MONTHLY,
      interval: 1,
      dtstart: daysFromToday(-75),
      until: daysFromToday(45),
    }).toString(),
    amount: 800,
    dtstart: daysFromToday(-75),
  }),
  budgetSeed({
    _id: SEED_BUDGET_IDS.rent,
    title: 'Rent',
    type: 'Expense',
    category: 'Rent',
    rrule: new RRule({
      freq: RRule.MONTHLY,
      interval: 1,
      dtstart: daysFromToday(-175),
    }).toString(),
    amount: 1650,
    dtstart: daysFromToday(-175),
  }),
  budgetSeed({
    _id: SEED_BUDGET_IDS.groceries,
    title: 'Groceries',
    type: 'Expense',
    category: 'Food',
    rrule: new RRule({
      freq: RRule.MONTHLY,
      interval: 1,
      dtstart: daysFromToday(-21),
      until: daysFromToday(120),
    }).toString(),
    amount: 120,
    dtstart: daysFromToday(-21),
  }),
  budgetSeed({
    _id: SEED_BUDGET_IDS.utilities,
    title: 'Utilities',
    type: 'Expense',
    category: 'Utilities',
    rrule: new RRule({
      freq: RRule.MONTHLY,
      interval: 1,
      dtstart: daysFromToday(-150),
      until: daysFromToday(-20),
    }).toString(),
    amount: 185,
    dtstart: daysFromToday(-150),
  }),
  budgetSeed({
    _id: SEED_BUDGET_IDS.transport,
    title: 'Transit pass',
    type: 'Expense',
    category: 'Transportation',
    rrule: new RRule({
      freq: RRule.MONTHLY,
      interval: 1,
      dtstart: daysFromToday(-10),
    }).toString(),
    amount: 95,
    dtstart: daysFromToday(-10),
  }),
];

/** @deprecated Use budgetSeeds from seed.data.ts */
export const incomes = budgetSeeds.filter((b) => b.type === 'Income');
/** @deprecated Use budgetSeeds from seed.data.ts */
export const expenses = budgetSeeds.filter((b) => b.type === 'Expense');
