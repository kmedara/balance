import type { Db } from 'mongodb';
import type { EventDocument } from '@kmedara/balance-domain';
import { eventOccursInRange } from './recurrence.utils.js';

export const EVENTS_COLLECTION = 'events';

type EventCollectionDocument = EventDocument & { _id?: unknown };

export type EventQueryFilter = {
  eventType?: string;
  userId?: string;
};

const toEventDocument = <T extends EventDocument>(doc: EventCollectionDocument): T => {
  const { _id, ...event } = doc;
  return event as T;
};

const buildFilter = (filter?: EventQueryFilter): Record<string, unknown> => {
  const query: Record<string, unknown> = {};
  if (filter?.eventType !== undefined) query.eventType = filter.eventType;
  if (filter?.userId !== undefined) query.userId = filter.userId;
  return query;
};

export const ensureEventIndexes = async (db: Db): Promise<void> => {
  const events = db.collection(EVENTS_COLLECTION);
  await events.createIndex({ resourceId: 1 }, { unique: true });
  await events.createIndex({ userId: 1, eventType: 1 });
  await events.createIndex({ userId: 1 });
  await events.createIndex({ rrule: 1 });
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
