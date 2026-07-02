import { rrulestr } from "rrule";

import type { RecurringEventFields } from "./event-document.js";
import {
  occurrenceResourceId,
  type EventOccurrenceDocumentInput,
} from "./event-occurrence-document.js";

export type ExpandOccurrenceDatesOptions = {
  /** Inclusive window; preferred over unbounded `all()`. */
  between?: [Date, Date];
  /** Max dates when not using `between` (default 366). Unbounded rules need a cap. */
  limit?: number;
};

const DEFAULT_OCCURRENCE_LIMIT = 366;

/** Parse `rrule` / optional `dtstart` and return occurrence dates via rrule. */
export const expandOccurrenceDates = (
  recurrence: Pick<RecurringEventFields, "rrule" | "dtstart">,
  options?: ExpandOccurrenceDatesOptions,
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

export type MaterializeOccurrencesInput = Pick<
  RecurringEventFields,
  "rrule" | "dtstart"
> & {
  eventResourceId: string;
  userId: string;
  eventType: string;
};

/** Build occurrence documents for MongoDB from a parent event and rrule expansion. */
export const materializeOccurrenceDocuments = (
  event: MaterializeOccurrencesInput,
  options?: ExpandOccurrenceDatesOptions,
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
