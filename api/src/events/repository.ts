import type { Db } from 'mongodb';
import type { EventDocument } from '@kmedara/balance-domain';
import { eventOccursInRange } from './recurrence.utils.js';

export const EVENTS_COLLECTION = 'events';

type EventCollectionDocument = EventDocument & { _id?: unknown };

export type EventQueryFilter = {
  eventType?: string;
  eventTypes?: string[];
  userId?: string;
  includeRemoved?: boolean;
};

const toEventDocument = <T extends EventDocument>(doc: EventCollectionDocument): T => {
  const { _id, ...event } = doc;
  return event as T;
};

const buildEventTypeFilter = (
  eventType?: string,
  eventTypes?: string[],
): Record<string, unknown> => {
  if (eventTypes?.length === 1) return { eventType: eventTypes[0] };
  if (eventTypes && eventTypes.length > 1) return { eventType: { $in: eventTypes } };
  if (eventType !== undefined) return { eventType };
  return {};
};

const buildFilter = (filter?: EventQueryFilter): Record<string, unknown> => {
  const query: Record<string, unknown> = {
    ...buildEventTypeFilter(filter?.eventType, filter?.eventTypes),
  };

  if (filter?.userId !== undefined) query.userId = filter.userId;
  if (!filter?.includeRemoved) query.removed = { $ne: true };

  return query;
};

export const ensureEventIndexes = async (db: Db): Promise<void> => {
  const events = db.collection(EVENTS_COLLECTION);
  await events.createIndex({ resourceId: 1 }, { unique: true });
  await events.createIndex({ userId: 1, eventType: 1 });
  await events.createIndex({ userId: 1 });
  await events.createIndex({ rrule: 1 });
  await events.createIndex(
    { plaidTransactionId: 1 },
    { unique: true, sparse: true },
  );
};

export const findEventsByResourceIds = async <T extends EventDocument = EventDocument>(
  db: Db,
  resourceIds: string[],
  filter?: EventQueryFilter,
): Promise<T[]> => {
  if (resourceIds.length === 0) return [];

  const docs = await db
    .collection<EventCollectionDocument>(EVENTS_COLLECTION)
    .find({
      ...buildFilter(filter),
      resourceId: { $in: resourceIds },
    } as Record<string, unknown>)
    .toArray();

  return docs.map(toEventDocument<T>);
};

export const findEvents = async <T extends EventDocument = EventDocument>(
  db: Db,
  filter?: EventQueryFilter,
): Promise<T[]> => {
  const docs = await db
    .collection<EventCollectionDocument>(EVENTS_COLLECTION)
    .find(buildFilter(filter) as Record<string, unknown>)
    .toArray();

  return docs.map(toEventDocument<T>);
};

export const findRecurringEvents = async <T extends EventDocument = EventDocument>(
  db: Db,
  filter?: EventQueryFilter,
): Promise<T[]> => {
  const docs = await db
    .collection<EventCollectionDocument>(EVENTS_COLLECTION)
    .find({
      ...buildFilter(filter),
      rrule: { $exists: true, $ne: '' },
    })
    .toArray();

  return docs.map(toEventDocument<T>);
};

export const findEventsOverlappingRange = async <T extends EventDocument = EventDocument>(
  db: Db,
  rangeStart: Date,
  rangeEnd: Date,
  filter?: EventQueryFilter,
): Promise<T[]> => {
  const events = await findRecurringEvents<T>(db, filter);
  return events.filter((event) => eventOccursInRange(event, rangeStart, rangeEnd));
};

export const insertEvent = async (db: Db, event: EventDocument): Promise<void> => {
  await db.collection(EVENTS_COLLECTION).insertOne(event);
};
