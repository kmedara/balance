import type { CalendarDay, CalendarDayWire, CalendarResponse, CalendarResponseWire } from '@core/domain';

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

/** Build a padded month grid with no events (before API data or empty month). */
export const buildEmptyMonthDays = (year: number, month: number): CalendarDay[] => {
  const monthIndex = month - 1;
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const lastDayOfMonth = new Date(year, monthIndex + 1, 0);
  const totalDays = lastDayOfMonth.getDate();
  const startDayOfWeek = firstDayOfMonth.getDay();
  const prevMonthLastDate = new Date(year, monthIndex, 0).getDate();

  const days: CalendarDay[] = [];

  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, monthIndex - 1, prevMonthLastDate - i),
      inCurrentMonth: false,
      events: [],
    });
  }

  for (let d = 1; d <= totalDays; d++) {
    days.push({
      date: new Date(year, monthIndex, d),
      inCurrentMonth: true,
      events: [],
    });
  }

  const remainingDays = days.length % 7 === 0 ? 0 : 7 - (days.length % 7);
  for (let d = 1; d <= remainingDays; d++) {
    days.push({
      date: new Date(year, monthIndex + 1, d),
      inCurrentMonth: false,
      events: [],
    });
  }

  return days;
};

/** Parse `YYYY-MM-DD` (or ISO prefix) into local midnight. */
export const parseCalendarDate = (value: Date | string): Date => {
  if (typeof value === 'string') {
    const [y, m, d] = value.slice(0, 10).split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
};

const reviveDay = (day: CalendarDayWire): CalendarDay => ({
  ...day,
  date: parseCalendarDate(day.date),
});

/** JSON responses serialize dates as strings — revive as local calendar dates. */
export const reviveCalendarResponse = (response: CalendarResponseWire): CalendarResponse => ({
  ...response,
  days: response.days.map(reviveDay),
  weeks: response.weeks.map((week) => week.map(reviveDay)),
});
