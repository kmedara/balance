import type { EventWithId } from '../data/types.js';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient } from '../dynamo/client.js';
import { eventFromItem } from '../dynamo/entities.js';
import { matchesEventFilter, toEventWithId } from '../dynamo/helpers.js';
import { queryAll } from '../dynamo/query.js';
import { getTableName } from '../dynamo/tables.js';
import { NotFoundError } from '../errors/http-error.js';

const table = (): string => getTableName();

export type EventDocumentUpdate = {
  set: Record<string, unknown>;
  unset?: string[];
};

export const updateEventById = async (
  id: string,
  filter: { userId: string },
  update: EventDocumentUpdate,
): Promise<EventWithId> => {
  // Single GSI read returns the full item (PK/SK + payload) — no second lookup.
  const items = await queryAll<Record<string, unknown>>({
    TableName: table(),
    IndexName: 'EventIdIndex',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: { ':id': id },
    Limit: 1,
  });

  const raw = items[0];
  if (!raw?.PK || !raw?.SK) throw new NotFoundError('Event not found');

  const existing = eventFromItem(raw);
  if (
    !matchesEventFilter(
      existing,
      { userId: filter.userId, includeRemoved: true },
      raw.status as string | undefined,
    )
  ) {
    throw new NotFoundError('Event not found');
  }

  const setEntries = Object.entries(update.set);
  const unsetFields = update.unset ?? [];
  const setParts: string[] = [];
  const removeParts: string[] = [];
  const names: Record<string, string> = {};
  const values: Record<string, unknown> = { ':userId': filter.userId };

  setEntries.forEach(([field, value], index) => {
    const nameKey = `#f${index}`;
    const valueKey = `:v${index}`;
    names[nameKey] = field;
    values[valueKey] = value instanceof Date ? value.toISOString() : value;
    setParts.push(`${nameKey} = ${valueKey}`);
  });

  unsetFields.forEach((field, index) => {
    const nameKey = `#u${index}`;
    names[nameKey] = field;
    removeParts.push(nameKey);
  });

  if (setParts.length === 0 && removeParts.length === 0) {
    return existing;
  }

  const updateExpression = [
    setParts.length > 0 ? `SET ${setParts.join(', ')}` : '',
    removeParts.length > 0 ? `REMOVE ${removeParts.join(', ')}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const result = await getDocClient().send(
    new UpdateCommand({
      TableName: table(),
      Key: { PK: raw.PK, SK: raw.SK },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
      ConditionExpression: 'userId = :userId',
      ReturnValues: 'ALL_NEW',
    }),
  );

  if (!result.Attributes) throw new NotFoundError('Event not found');

  return toEventWithId(result.Attributes);
};
