import { InjectionToken } from '@angular/core';

/** Options for a cache write. */
export type ClientCacheSetOptions = {
  /** Time-to-live in milliseconds. Omit for no expiry. */
  ttlMs?: number;
};

/**
 * Persistence port for client-side cache.
 * Feature stores depend on this token; they do not call localStorage directly.
 */
export interface ClientCache {
  get<T>(key: string): T | undefined;
  set<T>(key: string, value: T, options?: ClientCacheSetOptions): void;
  remove(key: string): void;
}

export const CLIENT_CACHE = new InjectionToken<ClientCache>('CLIENT_CACHE');

/** Stable keys for persisted feature slices. */
export const CACHE_KEYS = {
  calendarFilter: 'balance.calendar.filter',
  billingSubscription: 'balance.billing.subscription',
} as const;
