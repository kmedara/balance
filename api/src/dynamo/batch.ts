import {
  BatchWriteCommand,
  type BatchWriteCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { getDocClient } from './client.js';

const CHUNK_SIZE = 25;

export type DocumentWriteRequest = {
  PutRequest?: { Item: Record<string, unknown> };
  DeleteRequest?: { Key: Record<string, unknown> };
};

const chunk = <T>(items: T[]): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    chunks.push(items.slice(i, i + CHUNK_SIZE));
  }
  return chunks;
};

export const batchWriteAll = async (
  tableName: string,
  requests: DocumentWriteRequest[],
): Promise<void> => {
  if (requests.length === 0) {
    return;
  }

  const client = getDocClient();

  for (const batch of chunk(requests)) {
    let pending = batch;
    let attempts = 0;

    while (pending.length > 0 && attempts < 5) {
      const input: BatchWriteCommandInput = {
        RequestItems: { [tableName]: pending },
      };
      const result = await client.send(new BatchWriteCommand(input));
      pending = (result.UnprocessedItems?.[tableName] ?? []) as DocumentWriteRequest[];
      attempts += 1;
    }

    if (pending.length > 0) {
      throw new Error(`Failed to write ${pending.length} items to ${tableName}`);
    }
  }
};
