import type { CalendarDay, CalendarResponse } from '@balance/domain';
import type { CalendarResponseWire } from '@balance/schemas/events';
import type { EventWithId } from '../data/types.js';
import { toDate, formatDateKey, isSameCalendarDay } from '../data/dates.js';
import { PLAID_TRANSACTION_EVENT_TYPE } from '../plaid/constants.js';
import { eventOccursOnDate } from './recurrence.utils.js';

/**
 * Plaid transactions are single-occurrence and date-anchored, so they match a
 * day by comparing `dtstart` directly — no rrule parsing. Recurring events
 * (budgets) expand from their stored rule.
 */
export const getEventsForDay = <T extends EventWithId>(date: Date, events: T[]): T[] =>
  events.filter((event) =>
    event.eventType === PLAID_TRANSACTION_EVENT_TYPE
      ? event.dtstart !== undefined && isSameCalendarDay(toDate(event.dtstart), date)
      : eventOccursOnDate(event, date),
  );

const buildMonthGrid = <T>(
  year: number,
  monthIndex: number,
  eventsForDay: (dayDate: Date) => T[],
): CalendarResponse => {
  const monthLabel = new Date(year, monthIndex, 1).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const lastDayOfMonth = new Date(year, monthIndex + 1, 0);
  const totalDays = lastDayOfMonth.getDate();
  const startDayOfWeek = firstDayOfMonth.getDay();
  const prevMonthLastDate = new Date(year, monthIndex, 0).getDate();

  const days: CalendarDay[] = [];

  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const dayDate = new Date(year, monthIndex - 1, prevMonthLastDate - i);
    days.push({
      date: dayDate,
      inCurrentMonth: false,
      events: eventsForDay(dayDate),
    });
  }

  for (let d = 1; d <= totalDays; d++) {
    const dayDate = new Date(year, monthIndex, d);
    days.push({
      date: dayDate,
      inCurrentMonth: true,
      events: eventsForDay(dayDate),
    });
  }

  const endIndex = days.length % 7;
  const remainingDays = endIndex === 0 ? 0 : 7 - endIndex;
  for (let d = 1; d <= remainingDays; d++) {
    const dayDate = new Date(year, monthIndex + 1, d);
    days.push({
      date: dayDate,
      inCurrentMonth: false,
      events: eventsForDay(dayDate),
    });
  }

  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return {
    year,
    month: monthIndex + 1,
    monthLabel,
    days,
    weeks,
  };
};

/** Build calendar from a per-day event resolver (budget, plaid, or merged). */
export const buildMonthCalendarFromDayEvents = <T>(
  year: number,
  monthIndex: number,
  eventsForDay: (dayDate: Date) => T[],
): CalendarResponse => buildMonthGrid(year, monthIndex, eventsForDay);

/** Build calendar by expanding rrules in memory (fallback). */
export const buildMonthCalendar = <T extends EventWithId>(
  year: number,
  monthIndex: number,
  events: T[],
): CalendarResponse =>
  buildMonthGrid(year, monthIndex, (dayDate) => getEventsForDay(dayDate, events));

export const gridDateRange = (
  year: number,
  monthIndex: number,
): { gridStart: Date; gridEnd: Date } => {
  const { days } = buildMonthCalendar(year, monthIndex, []);
  const gridStart = new Date(days[0]!.date);
  const gridEnd = new Date(days[days.length - 1]!.date);
  gridStart.setHours(0, 0, 0, 0);
  gridEnd.setHours(0, 0, 0, 0);
  return { gridStart, gridEnd };
};

/** Serialize calendar day dates as `YYYY-MM-DD` to avoid UTC JSON shifts on clients. */
export const toJsonCalendarResponse = (response: CalendarResponse): CalendarResponseWire => ({
  ...response,
  days: response.days.map(toJsonCalendarDay),
  weeks: response.weeks.map((week) => week.map(toJsonCalendarDay)),
});

const toJsonCalendarDay = (day: CalendarDay): CalendarResponseWire['days'][number] => ({
  ...day,
  date: formatDateKey(day.date),
  events: day.events as CalendarResponseWire['days'][number]['events'],
});
