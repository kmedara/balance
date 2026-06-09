import type { Db } from 'mongodb';
import type { BudgetDocument } from '@kmedara/balance-domain';
import { BUDGET_EVENT_TYPE } from './constants.js';
import { eventOccursInRange } from '../events/recurrence.utils.js';

const EVENTS_COLLECTION = 'events';
type EventCollectionDocument = BudgetDocument & { _id?: unknown };

export const toBudgetDocument = (doc: EventCollectionDocument): BudgetDocument => {
  const { _id, ...budget } = doc;
  return budget;
};

export const findBudgetsByResourceIds = async (
  db: Db,
  resourceIds: string[],
): Promise<BudgetDocument[]> => {
  if (resourceIds.length === 0) return [];

  const docs = await db
    .collection<EventCollectionDocument>(EVENTS_COLLECTION)
    .find({
      resourceId: { $in: resourceIds },
      eventType: BUDGET_EVENT_TYPE,
    } as Record<string, unknown>)
    .toArray();

  return docs.map(toBudgetDocument);
};

export const findAllBudgetEvents = async (db: Db): Promise<BudgetDocument[]> => {
  const docs = await db
    .collection<EventCollectionDocument>(EVENTS_COLLECTION)
    .find({ eventType: BUDGET_EVENT_TYPE, rrule: { $exists: true, $ne: '' } })
    .toArray();

  return docs.map(toBudgetDocument);
};

export const findBudgetsOverlapping = async (
  db: Db,
  rangeStart: Date,
  rangeEnd: Date,
): Promise<BudgetDocument[]> => {
  const docs = await findAllBudgetEvents(db);
  return docs.filter((budget) => eventOccursInRange(budget, rangeStart, rangeEnd));
};
