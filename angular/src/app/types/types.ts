import { FormControl } from '@angular/forms';

export type FixedLengthArray<T, L extends number, A extends T[] = []> = A['length'] extends L
  ? A
  : FixedLengthArray<T, L, [...A, T]>;

export type Week = FixedLengthArray<CalendarDay, 7>;

export type CalendarDay = {
  date: Date;
  inCurrentMonth: boolean;
  budgets?: Budget[];
};

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
