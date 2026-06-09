import type { Db } from 'mongodb';
import type { Budget } from '@kmedara/balance-domain';

type BudgetDocument = Budget & {
  _id?: unknown;
  endDate?: Date | null;
};

export const toBudget = (doc: BudgetDocument): Budget => {
  const { _id, ...budget } = doc;
  return budget;
};

export const findBudgetsOverlapping = async (
  db: Db,
  rangeStart: Date,
  rangeEnd: Date,
): Promise<Budget[]> => {
  const docs = await db
    .collection<BudgetDocument>('budgets')
    .find({
      startDate: { $lte: rangeEnd },
      $or: [
        { endDate: undefined },
        { endDate: { $exists: false } },
        { endDate: { $gte: rangeStart } },
      ],
    })
    .toArray();

  return docs.map(toBudget);
};
