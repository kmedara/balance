import 'dotenv/config';
import { MongoClient } from 'mongodb';
import { materializeOccurrenceDocuments } from '@kmedara/balance-domain';
import { budgetSeeds, categorySeeds } from '../__data__/seed.data.js';
import { BUDGET_EVENT_TYPE } from '../__data__/seed.constants.js';
import { ensureEventIndexes, EVENTS_COLLECTION } from '../src/events/repository.js';
import {
  ensureOccurrenceIndexes,
  OCCURRENCES_COLLECTION,
  upsertOccurrences,
} from '../src/events/occurrence.repository.js';

const DEFAULT_URL = 'mongodb://localhost:27017/balance';
const DB_NAME = process.env.MONGO_DB ?? 'balance';

async function seed(): Promise<void> {
  const url = process.env.MONGO_URL ?? DEFAULT_URL;
  const drop = process.env.SEED_DROP === 'true' || process.argv.includes('--reset');

  const client = new MongoClient(url);
  await client.connect();

  try {
    const db = client.db(DB_NAME);
    const events = db.collection(EVENTS_COLLECTION);
    const categories = db.collection('categories');
    const occurrences = db.collection(OCCURRENCES_COLLECTION);

    if (drop) {
      await Promise.all([
        events.deleteMany({ eventType: BUDGET_EVENT_TYPE }),
        occurrences.deleteMany({ eventType: BUDGET_EVENT_TYPE }),
        categories.deleteMany({}),
      ]);
      console.log('Cleared events, event_occurrences, and categories.');
    }

    const now = new Date();

    for (const category of categorySeeds) {
      await categories.updateOne(
        { name: category.name },
        {
          $set: { ...category, updatedAt: now },
          $setOnInsert: { createdAt: now },
        },
        { upsert: true },
      );
    }

    for (const budget of budgetSeeds) {
      const { ...fields } = budget;
      await events.updateOne(
        { resourceId: budget.resourceId },
        { $set: { ...fields, updatedAt: now }, $setOnInsert: { createdAt: now } },
        { upsert: true },
      );
    }

    const occurrenceInputs = budgetSeeds.flatMap((budget) =>
      materializeOccurrenceDocuments({
        eventResourceId: budget.resourceId,
        userId: budget.userId,
        eventType: budget.eventType,
        rrule: budget.rrule,
        dtstart: budget.dtstart,
      }),
    );

    if (drop) {
      await occurrences.deleteMany({ eventType: BUDGET_EVENT_TYPE });
    }

    const occurrenceCount = await upsertOccurrences(db, occurrenceInputs, now);

    await categories.createIndex({ name: 1 }, { unique: true });
    await ensureEventIndexes(db);
    await ensureOccurrenceIndexes(db);

    const [eventCount, categoryCount, totalOccurrences] = await Promise.all([
      events.countDocuments({ eventType: BUDGET_EVENT_TYPE }),
      categories.countDocuments(),
      occurrences.countDocuments({ eventType: BUDGET_EVENT_TYPE }),
    ]);

    console.log(`Seeded ${DB_NAME} at ${url}`);
    console.log(`  categories: ${categoryCount}`);
    console.log(`  events (budget): ${eventCount}`);
    console.log(`  event_occurrences (budget): ${totalOccurrences} (${occurrenceCount} upserted this run)`);
  } finally {
    await client.close();
  }
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
