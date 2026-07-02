import { toDate } from '../data/dates.js';
import type { EventWithId, StoredEventDocument } from '../data/types.js';

const DATE_FIELDS = new Set([
  'dtstart',
  'createdAt',
  'updatedAt',
  'lastSyncAt',
  'lastSynced',
  'lastWebhook',
  'revokedAt',
  'currentPeriodEnd',
  'trialEnd',
  'lastSuccessfulSync',
  'lastAttemptedSync',
  'authorizedDate',
]);

const serializeValue = (value: unknown): unknown => {
  if (value === undefined) return undefined;
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(serializeValue);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).flatMap(([key, nested]) => {
        const serialized = serializeValue(nested);
        return serialized === undefined ? [] : [[key, serialized]];
      }),
    );
  }
  return value;
};

export const serializeRecord = (record: Record<string, unknown>): Record<string, unknown> => {
  const out: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(record)) {
    const serialized = serializeValue(value);
    if (serialized !== undefined) {
      out[key] = serialized;
    }
  }

  return out;
};

export const deserializeDates = (record: Record<string, unknown>): Record<string, unknown> => {
  const out = { ...record };

  for (const field of DATE_FIELDS) {
    if (typeof out[field] === 'string') {
      out[field] = toDate(out[field] as string);
    }
  }

  if (out.sync && typeof out.sync === 'object') {
    out.sync = deserializeDates(out.sync as Record<string, unknown>);
  }

  return out;
};

export const toEventWithId = <T extends object = object>(
  item: Record<string, unknown>,
): EventWithId<T> => {
  const parsed = deserializeDates(item);
  const {
    PK: _pk,
    SK: _sk,
    entityType: _entityType,
    userRef: _userRef,
    status: _status,
    eventSk: _eventSk,
    id,
    ...rest
  } = parsed;

  return { ...(rest as StoredEventDocument<T>), id: id as string };
};

export const matchesEventFilter = (
  event: EventWithId,
  filter?: {
    eventType?: string;
    eventTypes?: string[];
    userId?: string;
    includeRemoved?: boolean;
    status?: string;
  },
  itemStatus?: string,
): boolean => {
  if (filter?.userId !== undefined && event.userId !== filter.userId) return false;

  const removed =
    itemStatus === 'removed' ||
    (event as { removed?: boolean; status?: string }).removed ||
    (event as { status?: string }).status === 'removed';

  if (!filter?.includeRemoved && removed) return false;

  if (filter?.eventTypes?.length) {
    return filter.eventTypes.includes(event.eventType);
  }

  if (filter?.eventType !== undefined && event.eventType !== filter.eventType) {
    return false;
  }

  return true;
};
