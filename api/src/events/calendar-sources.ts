import type { EventDocument } from '@kmedara/balance-domain/data/event-document';
import type { EventOccurrenceDocument } from '@kmedara/balance-domain';
import { isPlaidTransactionEvent, toPlaidCalendarEvent } from '../plaid/calendar.mapper.js';
import {
  getOccurrencesForDay,
  resolveOccurrencesToEvents,
} from './calendar.utils.js';

export type CalendarDayEvent = EventDocument;

export const resolveDayCalendarEvents = (
  dayDate: Date,
  occurrences: EventOccurrenceDocument[],
  eventsById: ReadonlyMap<string, EventDocument>,
): CalendarDayEvent[] =>
  resolveOccurrencesToEvents(getOccurrencesForDay(dayDate, occurrences), eventsById).map(
    (event) => (isPlaidTransactionEvent(event) ? toPlaidCalendarEvent(event) : event),
  );
