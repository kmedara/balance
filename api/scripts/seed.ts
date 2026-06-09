import 'dotenv/config';
import { MongoClient } from 'mongodb';
import { budgetSeeds, categorySeeds } from '../__data__/seed.data.js';

const DEFAULT_URL = 'mongodb://localhost:27017/balance';
const DB_NAME = process.env.MONGO_DB ?? 'balance';

async function seed(): Promise<void> {
  const url = process.env.MONGO_URL ?? DEFAULT_URL;
  const drop = process.env.SEED_DROP === 'true' || process.argv.includes('--reset');

  const client = new MongoClient(url);
  await client.connect();

  try {
    const db = client.db(DB_NAME);
    const budgets = db.collection('budgets');
    const categories = db.collection('categories');

    if (drop) {
      await Promise.all([budgets.deleteMany({}), categories.deleteMany({})]);
      console.log('Cleared budgets and categories collections.');
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
      const { endDate, ...fields } = budget;
      const update: Record<string, unknown> = {
        $set: { ...fields, updatedAt: now },
        $setOnInsert: { createdAt: now },
      };
      if (endDate !== undefined) {
        (update.$set as Record<string, unknown>).endDate = endDate;
      } else {
        update.$unset = { endDate: '' };
      }
      await budgets.updateOne({ resourceId: budget.resourceId }, update, { upsert: true });
    }

    await categories.createIndex({ name: 1 }, { unique: true });
    await budgets.createIndex({ resourceId: 1 }, { unique: true });
    await budgets.createIndex({ startDate: 1, type: 1 });

    const [budgetCount, categoryCount] = await Promise.all([
      budgets.countDocuments(),
      categories.countDocuments(),
    ]);

    console.log(`Seeded ${DB_NAME} at ${url}`);
    console.log(`  categories: ${categoryCount}`);
    console.log(`  budgets: ${budgetCount}`);
  } finally {
    await client.close();
  }
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
