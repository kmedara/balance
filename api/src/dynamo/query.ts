import { BatchGetCommand, QueryCommand, type QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { getDocClient } from './client.js';

const CHUNK_SIZE = 100;

const chunk = <T>(items: T[]): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    chunks.push(items.slice(i, i + CHUNK_SIZE));
  }
  return chunks;
};

export const batchGetItems = async <T extends Record<string, unknown>>(
  tableName: string,
  keys: Record<string, unknown>[],
): Promise<T[]> => {
  if (keys.length === 0) return [];

  const client = getDocClient();
  const items: T[] = [];

  for (const batch of chunk(keys)) {
    let pending = batch;
    let attempts = 0;

    while (pending.length > 0 && attempts < 5) {
      const result = await client.send(
        new BatchGetCommand({
          RequestItems: {
            [tableName]: { Keys: pending },
          },
        }),
      );

      const responses = (result.Responses?.[tableName] ?? []) as T[];
      items.push(...responses);
      pending = (result.UnprocessedKeys?.[tableName]?.Keys ?? []) as Record<string, unknown>[];
      attempts += 1;
    }
  }

  return items;
};

/**
 * Safety bound on `queryAll` so a single call can never page through an
 * unbounded partition. Each page is up to 1 MB, so 50 pages ≈ 50 MB / request,
 * which is far past any user-facing list we serve eagerly. Real list endpoints
 * should use {@link queryPage} with a cursor instead.
 */
const MAX_QUERY_ALL_PAGES = 50;

export const queryAll = async <T extends Record<string, unknown>>(
  input: QueryCommandInput,
): Promise<T[]> => {
  const client = getDocClient();
  const items: T[] = [];
  let exclusiveStartKey: Record<string, unknown> | undefined;
  let pages = 0;

  do {
    const result = await client.send(
      new QueryCommand({
        ...input,
        ExclusiveStartKey: exclusiveStartKey,
      }),
    );

    items.push(...((result.Items ?? []) as T[]));
    exclusiveStartKey = result.LastEvaluatedKey as Record<string, unknown> | undefined;
    pages += 1;
  } while (exclusiveStartKey && pages < MAX_QUERY_ALL_PAGES);

  return items;
};

/** Opaque cursor: base64 of the DynamoDB `LastEvaluatedKey`. */
export const encodeCursor = (key: Record<string, unknown> | undefined): string | undefined =>
  key ? Buffer.from(JSON.stringify(key), 'utf8').toString('base64url') : undefined;

export const decodeCursor = (cursor?: string): Record<string, unknown> | undefined => {
  if (!cursor) return undefined;
  try {
    return JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8')) as Record<string, unknown>;
  } catch {
    return undefined;
  }
};

/**
 * Single-page query for user-facing lists that can grow without bound. Returns
 * the page plus an opaque `cursor` to pass back for the next page (undefined
 * when the list is exhausted).
 */
export const queryPage = async <T extends Record<string, unknown>>(
  input: QueryCommandInput,
  options: { limit: number; cursor?: string },
): Promise<{ items: T[]; cursor?: string }> => {
  const result = await getDocClient().send(
    new QueryCommand({
      ...input,
      Limit: options.limit,
      ExclusiveStartKey: decodeCursor(options.cursor),
    }),
  );

  return {
    items: (result.Items ?? []) as T[],
    cursor: encodeCursor(result.LastEvaluatedKey as Record<string, unknown> | undefined),
  };
};
