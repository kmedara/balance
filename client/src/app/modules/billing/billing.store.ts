import type { SubscriptionResponse } from '@balance/schemas/client';
import {
  computed,
  effect,
  inject,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { withDevtools, withGlitchTracking, withResource } from '@angular-architects/ngrx-toolkit';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { GatewayResourceService } from '@core/gateway-resource.service';
import { CACHE_KEYS, CLIENT_CACHE } from '@core/cache/client-cache';
import { environment } from 'src/environments/environment';
import { filter, firstValueFrom, take } from 'rxjs';

const PAID_STATUSES = new Set<SubscriptionResponse['status']>(['active', 'trialing']);

/** Snapshot TTL for last-known subscription (UX only; API remains authoritative). */
const SUBSCRIPTION_CACHE_TTL_MS = 1000 * 60 * 60 * 24;

/** True when the subscription unlocks paid features (plus/pro + active|trialing). */
export const isPaidSubscription = (subscription: SubscriptionResponse): boolean =>
  PAID_STATUSES.has(subscription.status) && subscription.tier !== 'free';

type BillingState = {
  /** Disk-hydrated snapshot for instant UX before/while the network resource loads. */
  lastKnown: SubscriptionResponse | null;
};

export const billingStore = signalStore(
  { providedIn: 'root' },
  withState<BillingState>({ lastKnown: null }),
  withProps(() => ({
    dataService: inject(GatewayResourceService),
    cache: inject(CLIENT_CACHE),
  })),
  withDevtools('Billing', withGlitchTracking()),
  withResource(({ dataService }) => ({
    subscription: dataService.createGatewayResource<SubscriptionResponse>(() =>
      environment.authDisabled ? undefined : '/billing/subscription',
    ),
  })),
  withComputed((store) => ({
    /** Live resource value, falling back to the persisted snapshot. */
    currentSubscription: computed(
      () => store.subscriptionValue() ?? store.lastKnown() ?? null,
    ),
    isPaid: computed(() => {
      const subscription = store.subscriptionValue() ?? store.lastKnown();
      return subscription ? isPaidSubscription(subscription) : false;
    }),
  })),
  withMethods((store) => {
    const status$ = toObservable(store.subscriptionStatus);

    return {
      /**
       * Waits for the network resource to settle (or returns the cache snapshot).
       * Use from guards and one-shot checks; templates can read `isPaid` / `currentSubscription`.
       */
      async ensureLoaded(): Promise<SubscriptionResponse | null> {
        if (environment.authDisabled) {
          return store.lastKnown();
        }

        const status = store.subscriptionStatus();
        if (status === 'loading' || status === 'reloading' || status === 'idle') {
          await firstValueFrom(
            status$.pipe(
              filter((next) => next === 'resolved' || next === 'error' || next === 'local'),
              take(1),
            ),
          );
        }

        return store.subscriptionValue() ?? store.lastKnown();
      },

      clearCachedSubscription(): void {
        store.cache.remove(CACHE_KEYS.billingSubscription);
        patchState(store, { lastKnown: null });
      },
    };
  }),
  withHooks({
    onInit(store) {
      const cached = store.cache.get<SubscriptionResponse>(CACHE_KEYS.billingSubscription);
      if (cached) {
        patchState(store, { lastKnown: cached });
      }

      effect(() => {
        const value = store.subscriptionValue();
        if (!value) return;

        store.cache.set(CACHE_KEYS.billingSubscription, value, {
          ttlMs: SUBSCRIPTION_CACHE_TTL_MS,
        });
        patchState(store, { lastKnown: value });
      });
    },
  }),
);
