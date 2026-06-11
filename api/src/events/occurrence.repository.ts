import type { Db } from 'mongodb';
import type {
  EventOccurrenceDocument,
  EventOccurrenceDocumentInput,
} from '@kmedara/balance-domain';

type OccurrenceCollectionDocument = EventOccurrenceDocument & { _id?: unknown };

const startOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const OCCURRENCES_COLLECTION = 'event_occurrences';

export const ensureOccurrenceIndexes = async (db: Db): Promise<void> => {
  const occurrences = db.collection(OCCURRENCES_COLLECTION);
  await occurrences.createIndex({ resourceId: 1 }, { unique: true });
  await occurrences.createIndex({ userId: 1, date: 1 });
  await occurrences.createIndex({ eventResourceId: 1, date: 1 }, { unique: true });
  await occurrences.createIndex({ eventType: 1, date: 1 });
};

export const upsertOccurrences = async (
  db: Db,
  inputs: EventOccurrenceDocumentInput[],
  now = new Date(),
): Promise<number> => {
  if (inputs.length === 0) return 0;

  const occurrences = db.collection<OccurrenceCollectionDocument>(OCCURRENCES_COLLECTION);
  const ops = inputs.map((occurrence) => ({
    updateOne: {
      filter: { resourceId: occurrence.resourceId },
      update: {
        $set: { ...occurrence, updatedAt: now },
        $setOnInsert: { createdAt: now },
      },
      upsert: true,
    },
  }));

  const result = await occurrences.bulkWrite(ops, { ordered: false });
  return result.upsertedCount + result.modifiedCount;
};

export const syncOccurrencesForEvents = async (
  db: Db,
  inputs: EventOccurrenceDocumentInput[],
  eventResourceIds: string[],
  eventType: string,
): Promise<number> => {
  const occurrences = db.collection(OCCURRENCES_COLLECTION);

  await occurrences.deleteMany({
    eventResourceId: { $in: eventResourceIds },
    eventType,
  });

  return upsertOccurrences(db, inputs);
};

export const deleteOccurrencesForEventResourceIds = async (
  db: Db,
  eventResourceIds: string[],
): Promise<number> => {
  if (eventResourceIds.length === 0) return 0;

  const result = await db.collection(OCCURRENCES_COLLECTION).deleteMany({
    eventResourceId: { $in: eventResourceIds },
  });

  return result.deletedCount;
};

export const findOccurrencesInRange = async (
  db: Db,
  rangeStart: Date,
  rangeEnd: Date,
  eventTypes?: string[],
  userId?: string,
): Promise<EventOccurrenceDocument[]> => {
  const filter: Record<string, unknown> = {
    date: { $gte: startOfDay(rangeStart), $lte: endOfDay(rangeEnd) },
  };
  if (eventTypes?.length === 1) filter.eventType = eventTypes[0];
  else if (eventTypes && eventTypes.length > 1) filter.eventType = { $in: eventTypes };
  if (userId !== undefined) filter.userId = userId;

  const docs = await db
    .collection<OccurrenceCollectionDocument>(OCCURRENCES_COLLECTION)
    .find(filter)
    .sort({ date: 1 })
    .toArray();

  return docs.map(({ _id, ...occurrence }) => occurrence);
};
