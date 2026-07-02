import type { MongoTimestamps } from "./event-document.js";

/**
 * Materialized single instance of a recurring event, derived from `RRule.all()` /
 * `RRule.between()`.
 *
 * Collection: `event_occurrences`
 * Indexes: `resourceId` (unique), `(userId, date)`, `(eventResourceId, date)` (unique)
 */
export type EventOccurrenceDocument = {
  /** Stable id: `{eventResourceId}#{yyyy-mm-dd}`. */
  resourceId: string;
  /** Parent event `resourceId` (FK to `events`). */
  eventResourceId: string;
  /** Owner; denormalized from parent for calendar queries. */
  userId: string;
  /** Discriminator matching parent `eventType`. */
  eventType: string;
  /** Occurrence instant from the recurrence rule. */
  date: Date;
} & MongoTimestamps;

export type EventOccurrenceDocumentInput = Omit<
  EventOccurrenceDocument,
  keyof MongoTimestamps
>;

export const EventOccurrencesCollection = "event_occurrences" as const;

export const occurrenceResourceId = (
  eventResourceId: string,
  date: Date,
): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${eventResourceId}#${y}-${m}-${d}`;
};
