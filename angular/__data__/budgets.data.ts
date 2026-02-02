import { Budget } from '../src/app/types/types';
export const incomes: Budget[] = [
  {
    category: 'Income',
    frequency: 'Bi-Weekly',
    startDate: new Date(),
    title: 'job',
    amount: 4500.44,
  },
];

export const expenses: Budget[] = [
  {
    category: 'Expense',
    description: 'user input',
    frequency: 'Monthly',
    startDate: new Date(),
    title: 'bill',
    amount: 344.11,
  },
];
