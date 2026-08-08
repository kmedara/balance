import type { Provider } from '@angular/core';
import { CLIENT_CACHE } from './client-cache';
import { LocalStorageCache } from './local-storage-cache';

/** Default: localStorage. Swap `useClass` for IndexedDB or secure-storage adapters. */
export const provideClientCache = (): Provider => ({
  provide: CLIENT_CACHE,
  useClass: LocalStorageCache,
});
