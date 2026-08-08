import { Injectable } from '@angular/core';
import type { ClientCache, ClientCacheSetOptions } from './client-cache';

type CacheEnvelope<T> = {
  v: T;
  /** Expiry as epoch ms; omitted means no expiry. */
  exp?: number;
};

/**
 * Default ClientCache backed by `localStorage`.
 * Swap via `provideClientCache` for IndexedDB or platform secure storage.
 */
@Injectable()
export class LocalStorageCache implements ClientCache {
  get<T>(key: string): T | undefined {
    const raw = this.readRaw(key);
    if (raw === undefined) return undefined;

    try {
      const envelope = JSON.parse(raw) as CacheEnvelope<T>;
      if (envelope.exp !== undefined && Date.now() > envelope.exp) {
        this.remove(key);
        return undefined;
      }
      return envelope.v;
    } catch {
      this.remove(key);
      return undefined;
    }
  }

  set<T>(key: string, value: T, options?: ClientCacheSetOptions): void {
    const storage = this.storage();
    if (!storage) return;

    const envelope: CacheEnvelope<T> = {
      v: value,
      ...(options?.ttlMs !== undefined ? { exp: Date.now() + options.ttlMs } : {}),
    };

    try {
      storage.setItem(key, JSON.stringify(envelope));
    } catch {
      // Quota or private mode — persistence is best-effort.
    }
  }

  remove(key: string): void {
    this.storage()?.removeItem(key);
  }

  private readRaw(key: string): string | undefined {
    try {
      return this.storage()?.getItem(key) ?? undefined;
    } catch {
      return undefined;
    }
  }

  private storage(): Storage | undefined {
    try {
      if (typeof localStorage === 'undefined') return undefined;
      return localStorage;
    } catch {
      return undefined;
    }
  }
}
