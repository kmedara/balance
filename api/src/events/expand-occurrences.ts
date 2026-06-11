import type { EventOccurrenceDocumentInput } from '@kmedara/balance-domain';
import { rrulestr } from './rrule.utils.js';

const DEFAULT_OCCURRENCE_LIMIT = 366;

const occurrenceResourceId = (eventResourceId: string, date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${eventResourceId}#${y}-${m}-${d}`;
};

export type MaterializeOccurrencesInput = {
  eventResourceId: string;
  userId: string;
  eventType: string;
  rrule: string;
  dtstart?: Date;
};

export const expandOccurrenceDates = (
  recurrence: Pick<MaterializeOccurrencesInput, 'rrule' | 'dtstart'>,
  options?: { between?: [Date, Date]; limit?: number },
): Date[] => {
  const rule = rrulestr(recurrence.rrule, {
    ...(recurrence.dtstart !== undefined ? { dtstart: recurrence.dtstart } : {}),
  });

  if (options?.between) {
    const [after, before] = options.between;
    return rule.between(after, before, true);
  }

  const limit = options?.limit ?? DEFAULT_OCCURRENCE_LIMIT;
  return rule.all((_date, index) => index < limit);
};

export const materializeOccurrenceDocuments = (
  event: MaterializeOccurrencesInput,
  options?: { between?: [Date, Date]; limit?: number },
): EventOccurrenceDocumentInput[] => {
  const dates = expandOccurrenceDates(event, options);

  return dates.map((date) => ({
    resourceId: occurrenceResourceId(event.eventResourceId, date),
    eventResourceId: event.eventResourceId,
    userId: event.userId,
    eventType: event.eventType,
    date,
  }));
};
