import { Budget } from '@kmedara/balance-domain';
export const incomes: Budget[] = [
  {
    category: 'anything',
    type: 'Income',
    frequency: 'Bi-Weekly',
    startDate: new Date(),
    title: 'job',
    amount: 4500.44,
    resourceId: crypto.randomUUID(),
  },
];

export const expenses: Budget[] = [
  {
    category: 'anything',
    type: 'Expense',
    description: 'user input',
    frequency: 'Monthly',
    startDate: new Date(),
    title: 'bill',
    amount: 344.11,
    resourceId: crypto.randomUUID(),
  },
];
