import type { EventWithId } from '../data/types.js';
import { isPlaidTransactionEvent, toPlaidCalendarEvent } from '../plaid/calendar.mapper.js';
import { getEventsForDay } from './calendar.utils.js';

export type CalendarDayEvent = EventWithId;

export const resolveDayCalendarEvents = (
  dayDate: Date,
  events: EventWithId[],
): CalendarDayEvent[] =>
  getEventsForDay(dayDate, events).map((event) =>
    isPlaidTransactionEvent(event) ? toPlaidCalendarEvent(event) : event,
  );
