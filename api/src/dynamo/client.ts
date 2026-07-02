import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

let docClient: DynamoDBDocumentClient | null = null;

export const getDocClient = (): DynamoDBDocumentClient => {
  if (docClient) {
    return docClient;
  }

  const endpoint = process.env.DYNAMODB_ENDPOINT?.trim();
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION ?? process.env.AWS_DEFAULT_REGION ?? 'us-east-1',
    // Adaptive retries smooth over brief throttling without a tight loop, and
    // short timeouts keep a wedged connection from blocking a Lambda invocation
    // for its whole duration.
    maxAttempts: 3,
    retryMode: 'adaptive',
    requestHandler: {
      connectionTimeout: 1_000,
      requestTimeout: 5_000,
    },
    ...(endpoint
      ? {
          endpoint,
          // DynamoDB Local does not validate credentials, but the AWS SDK still
          // requires a provider when an explicit endpoint is configured.
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'local',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? 'local',
          },
        }
      : {}),
  });

  docClient = DynamoDBDocumentClient.from(client, {
    marshallOptions: { removeUndefinedValues: true },
  });

  return docClient;
};
