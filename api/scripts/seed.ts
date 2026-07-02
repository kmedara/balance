import 'dotenv/config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { env } from 'process';
import { budgetSeeds, categorySeeds } from '../__data__/seed.data.js';
import { buildCategoriesConfigItem, buildEventItem } from '../src/dynamo/entities.js';
import { userPk } from '../src/dynamo/keys.js';
import { LOCAL_TABLE_NAME } from '../src/dynamo/tables.js';
import { applyLocalTableEnv, ensureLocalTables } from './create-tables.js';

const createDocClient = (): DynamoDBDocumentClient => {
  const endpoint = env.DYNAMODB_ENDPOINT?.trim();

  const client = new DynamoDBClient({
    region: env.AWS_REGION ?? env.AWS_DEFAULT_REGION ?? 'us-east-1',
    maxAttempts: 3,
    requestHandler: {
      connectionTimeout: 1_000,
      requestTimeout: 5_000,
    },
    ...(endpoint
      ? {
          endpoint,
          credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID ?? 'local',
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY ?? 'local',
          },
        }
      : {}),
  });

  return DynamoDBDocumentClient.from(client, {
    marshallOptions: { removeUndefinedValues: true },
  });
};

const deleteUserEvents = async (
  client: DynamoDBDocumentClient,
  tableName: string,
  userId: string,
): Promise<void> => {
  let exclusiveStartKey: Record<string, unknown> | undefined;

  do {
    const result = await client.send(
      new QueryCommand({
        TableName: tableName,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :prefix)',
        ExpressionAttributeValues: {
          ':pk': userPk(userId),
          ':prefix': 'EVT#',
        },
        ExclusiveStartKey: exclusiveStartKey,
      }),
    );

    await Promise.all(
      (result.Items ?? []).map((item) =>
        client.send(
          new DeleteCommand({
            TableName: tableName,
            Key: { PK: item.PK, SK: item.SK },
          }),
        ),
      ),
    );

    exclusiveStartKey = result.LastEvaluatedKey;
  } while (exclusiveStartKey);
};

async function seed(): Promise<void> {
  const drop = process.env.SEED_DROP === 'true' || process.argv.includes('--reset');

  applyLocalTableEnv();
  await ensureLocalTables();

  const client = createDocClient();
  const tableName = env.BALANCE_TABLE ?? LOCAL_TABLE_NAME;
  const now = new Date();

  if (drop && budgetSeeds.length > 0) {
    await deleteUserEvents(client, tableName, budgetSeeds[0]!.userId);
    console.log('Cleared budget events for seed user.');
  }

  await client.send(
    new PutCommand({
      TableName: tableName,
      Item: buildCategoriesConfigItem(categorySeeds, now),
    }),
  );

  for (const budget of budgetSeeds) {
    const { _id, ...fields } = budget;

    await client.send(
      new PutCommand({
        TableName: tableName,
        Item: buildEventItem(
          {
            ...fields,
            id: _id,
            createdAt: now,
            updatedAt: now,
          },
          'active',
        ),
      }),
    );
  }

  console.log(`Seeded DynamoDB table ${tableName} at ${env.DYNAMODB_ENDPOINT}`);
  console.log(`  categories: ${categorySeeds.length}`);
  console.log(`  events (budget): ${budgetSeeds.length}`);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
