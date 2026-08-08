import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LocalStorageCache } from './local-storage-cache';

const createMemoryStorage = (): Storage => {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (key: string) => map.get(key) ?? null,
    key: (index: number) => [...map.keys()][index] ?? null,
    removeItem: (key: string) => {
      map.delete(key);
    },
    setItem: (key: string, value: string) => {
      map.set(key, value);
    },
  };
};

describe('LocalStorageCache', () => {
  let cache: LocalStorageCache;
  let storage: Storage;

  beforeEach(() => {
    storage = createMemoryStorage();
    vi.stubGlobal('localStorage', storage);
    cache = new LocalStorageCache();
  });

  it('stores and reads a value', () => {
    cache.set('k', { a: 1 });
    expect(cache.get<{ a: number }>('k')).toEqual({ a: 1 });
  });

  it('returns undefined for missing keys', () => {
    expect(cache.get('missing')).toBeUndefined();
  });

  it('removes a key', () => {
    cache.set('k', 'v');
    cache.remove('k');
    expect(cache.get('k')).toBeUndefined();
  });

  it('expires values after ttl', () => {
    cache.set('k', 'v', { ttlMs: 1 });
    expect(cache.get('k')).toBe('v');

    const raw = storage.getItem('k');
    expect(raw).toBeTruthy();
    const envelope = JSON.parse(raw!) as { v: string; exp: number };
    envelope.exp = Date.now() - 1;
    storage.setItem('k', JSON.stringify(envelope));

    expect(cache.get('k')).toBeUndefined();
    expect(storage.getItem('k')).toBeNull();
  });

  it('clears corrupt entries', () => {
    storage.setItem('bad', 'not-json');
    expect(cache.get('bad')).toBeUndefined();
    expect(storage.getItem('bad')).toBeNull();
  });
});
