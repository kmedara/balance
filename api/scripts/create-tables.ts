import 'dotenv/config';
import { pathToFileURL } from 'node:url';
import {
  AttributeDefinition,
  BillingMode,
  CreateTableCommand,
  DescribeTableCommand,
  DynamoDBClient,
  KeyType,
  ProjectionType,
  ScalarAttributeType,
  type GlobalSecondaryIndex,
  type KeySchemaElement,
} from '@aws-sdk/client-dynamodb';
import { LOCAL_TABLE_NAME } from '../src/dynamo/tables.js';
import { env } from 'process';

const tableName = LOCAL_TABLE_NAME;

export const applyLocalTableEnv = (): void => {
  if (!env.DYNAMODB_ENDPOINT) {
    env.DYNAMODB_ENDPOINT = 'http://localhost:8000';
  }

  if (!env.BALANCE_TABLE) {
    env.BALANCE_TABLE = LOCAL_TABLE_NAME;
  }

  if (!env.AWS_REGION && !env.AWS_DEFAULT_REGION) {
    env.AWS_REGION = 'us-east-1';
  }
};

const keySchema: KeySchemaElement[] = [
  { AttributeName: 'PK', KeyType: KeyType.HASH },
  { AttributeName: 'SK', KeyType: KeyType.RANGE },
];

const attributeDefinitions: AttributeDefinition[] = [
  { AttributeName: 'PK', AttributeType: ScalarAttributeType.S },
  { AttributeName: 'SK', AttributeType: ScalarAttributeType.S },
  { AttributeName: 'stripeCustomerId', AttributeType: ScalarAttributeType.S },
  { AttributeName: 'userRef', AttributeType: ScalarAttributeType.S },
  { AttributeName: 'plaidItemId', AttributeType: ScalarAttributeType.S },
  { AttributeName: 'id', AttributeType: ScalarAttributeType.S },
];

const globalSecondaryIndexes: GlobalSecondaryIndex[] = [
  {
    IndexName: 'StripeCustomerIndex',
    KeySchema: [
      { AttributeName: 'stripeCustomerId', KeyType: KeyType.HASH },
      { AttributeName: 'userRef', KeyType: KeyType.RANGE },
    ],
    Projection: { ProjectionType: ProjectionType.KEYS_ONLY },
  },
  {
    IndexName: 'PlaidItemIndex',
    KeySchema: [
      { AttributeName: 'plaidItemId', KeyType: KeyType.HASH },
      { AttributeName: 'userRef', KeyType: KeyType.RANGE },
    ],
    Projection: { ProjectionType: ProjectionType.KEYS_ONLY },
  },
  {
    IndexName: 'EventIdIndex',
    KeySchema: [
      { AttributeName: 'id', KeyType: KeyType.HASH },
      { AttributeName: 'userRef', KeyType: KeyType.RANGE },
    ],
    Projection: { ProjectionType: ProjectionType.ALL },
  },
];

const createClient = (): DynamoDBClient => {
  const endpoint = env.DYNAMODB_ENDPOINT?.trim();

  return new DynamoDBClient({
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
};

const tableExists = async (client: DynamoDBClient): Promise<boolean> =>
  await client
    .send(new DescribeTableCommand({ TableName: tableName }))
    .then(() => true)
    .catch(() => false);

export const ensureLocalTables = async (): Promise<void> => {
  const client = createClient();

  if (await tableExists(client)) {
    console.log(`Table ${tableName} already exists.`);
    return;
  }

  await client.send(
    new CreateTableCommand({
      TableName: tableName,
      BillingMode: BillingMode.PAY_PER_REQUEST,
      KeySchema: keySchema,
      AttributeDefinitions: attributeDefinitions,
      GlobalSecondaryIndexes: globalSecondaryIndexes,
    }),
  );

  console.log(`Created table ${tableName}`);
};

async function main(): Promise<void> {
  console.log('Creating tables...');
  applyLocalTableEnv();
  await ensureLocalTables();
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().catch((err) => {
    console.error('Create tables failed:', err);
    process.exit(1);
  });
}
