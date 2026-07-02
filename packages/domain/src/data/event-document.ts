import type { IResourcable } from "../domain/resourcable.js";

/** Server-assigned timestamps on documents stored in MongoDB. */
export type MongoTimestamps = {
  createdAt?: Date;
  updatedAt?: Date;
};

/** Recurrence rule persisted on the parent event (RFC 5545). */
export type RecurringEventFields = {
  /**
   * RRULE string (e.g. `FREQ=WEEKLY` or a full rule including DTSTART).
   * Use {@link expandOccurrenceDates} to materialize occurrence rows.
   */
  rrule: string;
  /** Series start when not embedded in `rrule`. Passed to `rrulestr` when expanding. */
  dtstart?: Date;
};

/**
 * Shared MongoDB fields for every recurring event (parent document).
 *
 * Collection: `events`
 * Indexes: `resourceId` (unique), `(userId, eventType)`, `userId`
 */
export type EventDocumentFields = IResourcable &
  RecurringEventFields &
  MongoTimestamps & {
    /** Owner of the event series. */
    userId: string;
    /** Discriminator for entity-specific payload (e.g. `budget`). */
    eventType: string;
  };

/**
 * Generic MongoDB document for a recurring calendar event.
 * Extend with entity-specific fields (e.g. budget title and amount).
 */
export type EventDocument<T extends object = object> = EventDocumentFields & T;

/** Client or seed input before the API assigns `createdAt` / `updatedAt`. */
export type EventDocumentInput<T extends object = object> = Omit<
  EventDocument<T>,
  keyof MongoTimestamps
>;

/** Raw document shape as returned from a MongoDB collection (includes optional `_id`). */
export type CollectionDocument<T extends object = object> = EventDocument<T> & {
  _id?: unknown;
};

export const EventsCollection = "events" as const;
