import { Budget } from '@kmedara/balance-domain';
import { generateBudgetId } from '@kmedara/balance-domain/domain/resourcable';
export const incomes: Budget[] = [
  {
    resourceId: generateBudgetId(),
    type: 'Income',
    category: 'Salary Role',
    frequency: 'Bi-Weekly',
    startDate: new Date(),
    title: 'City National Bank',
    amount: 4500.44,
  },
  {
    resourceId: generateBudgetId(),
    type: 'Income',
    category: 'Hourly Role',
    frequency: 'Weekly',
    startDate: new Date(),
    title: 'Apex Systems',
    amount: 2800.0,
  },
];

export const expenses: Budget[] = [
  {
    resourceId: generateBudgetId(),
    type: 'Expense',
    category: 'Utilities',
    description: 'user input',
    frequency: 'Monthly',
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 3),
    title: 'Electric',
    amount: 100,
  },
];
