import { budgetSeeds } from './seed.data.js';

export const incomes = budgetSeeds.filter((b) => b.type === 'Income');
export const expenses = budgetSeeds.filter((b) => b.type === 'Expense');
export { budgetSeeds };
