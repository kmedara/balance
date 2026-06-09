import type { CalendarDay, CalendarResponse } from '@core/domain';

export type MonthSummary = {
  income: number;
  expenses: number;
  net: number;
};

const hasAmount = (event: unknown): event is { amount: number; type?: string } =>
  typeof event === 'object' &&
  event !== null &&
  'amount' in event &&
  typeof (event as { amount: unknown }).amount === 'number';

/** Sum expected income and expenses for days in the displayed month. */
export const summarizeMonth = (days: CalendarDay[]): MonthSummary => {
  let income = 0;
  let expenses = 0;

  for (const day of days) {
    if (!day.inCurrentMonth) continue;

    for (const event of day.events ?? []) {
      if (!hasAmount(event)) continue;

      if (event.type === 'Income') income += event.amount;
      else if (event.type === 'Expense') expenses += event.amount;
    }
  }

  return { income, expenses, net: income - expenses };
};

/** Parse `YYYY-MM-DD` (or ISO prefix) into local midnight. */
export const parseCalendarDate = (value: Date | string): Date => {
  if (typeof value === 'string') {
    const [y, m, d] = value.slice(0, 10).split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
};

const reviveDay = (day: CalendarDay): CalendarDay => ({
  ...day,
  date: parseCalendarDate(day.date as Date | string),
});

/** JSON responses serialize dates as strings — revive as local calendar dates. */
export const reviveCalendarResponse = (response: CalendarResponse): CalendarResponse => ({
  ...response,
  days: response.days.map(reviveDay),
  weeks: response.weeks.map((week) => week.map(reviveDay)),
});
