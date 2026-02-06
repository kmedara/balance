export type Budget = {
  title: string;
  description?: string;
  startDate: Date;
  amount: number;
  category: 'Income' | 'Expense';
  frequency:
    | 'Once'
    | 'Daily'
    | 'Weekly'
    | 'Bi-Weekly'
    | 'Semi-Monthly'
    | 'Monthly'
    | 'Quarterly'
    | 'Semi-Annually'
    | 'Annually';
};

export type BudgetCategory = Budget['category'];
export type BudgetFrequency = Budget['frequency'];
