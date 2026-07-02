import type { EventDocument, MongoTimestamps, PlaidAccount, PlaidItem, SyncState } from '@balance/domain';

export type Timestamps = MongoTimestamps;

/** Stored event without legacy `resourceId`. */
export type StoredEventDocument<T extends object = object> = Omit<EventDocument<T>, 'resourceId'>;

export type EventWithId<T extends object = object> = StoredEventDocument<T> & { id: string };

export type StoredPlaidItemDocument = Omit<PlaidItem, 'resourceId'> & Timestamps;

export type PlaidItemSyncState = {
  transactionCursor?: string;
  lastSuccessfulSync?: Date;
  lastAttemptedSync?: Date;
  status?: 'idle' | 'syncing' | 'error';
};

export type PlaidItemWithId = StoredPlaidItemDocument & {
  id: string;
  sync?: PlaidItemSyncState;
};

export type StoredPlaidAccountDocument = Omit<PlaidAccount, 'resourceId'> & Timestamps;

export type StoredSyncStateDocument = SyncState & Timestamps;
