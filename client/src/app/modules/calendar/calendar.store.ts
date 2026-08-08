import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import {
  BUDGET_EVENT_TYPE,
  PLAID_TRANSACTION_EVENT_TYPE,
  type CalendarResponseWire,
} from '@balance/schemas/client';
import { withDevtools, withGlitchTracking, withResource } from '@angular-architects/ngrx-toolkit';
import { GatewayResourceService } from '@core/gateway-resource.service';
import { CACHE_KEYS, CLIENT_CACHE } from '@core/cache/client-cache';
import { effect, inject } from '@angular/core';

export type CalendarFilter = {
  /** Calendar month, 1–12 (matches API query param). */
  month: number;
  year: number;
  /** Event types to include (maps to repeated `eventType` query params). */
  eventTypes: string[];
};

type CalendarState = {
  filter: CalendarFilter;
};

const today = new Date();
const defaultFilter = (): CalendarFilter => ({
  month: today.getMonth() + 1,
  year: today.getFullYear(),
  eventTypes: [BUDGET_EVENT_TYPE, PLAID_TRANSACTION_EVENT_TYPE],
});

const isCalendarFilter = (value: unknown): value is CalendarFilter => {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as CalendarFilter;
  return (
    typeof candidate.month === 'number' &&
    candidate.month >= 1 &&
    candidate.month <= 12 &&
    typeof candidate.year === 'number' &&
    Array.isArray(candidate.eventTypes) &&
    candidate.eventTypes.every((type) => typeof type === 'string')
  );
};

const shiftMonth = (filter: CalendarFilter, delta: number): CalendarFilter => {
  const date = new Date(filter.year, filter.month - 1 + delta, 1);
  return {
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    eventTypes: filter.eventTypes,
  };
};

const buildCalendarUrl = ({ month, year, eventTypes }: CalendarFilter): string => {
  const params = new URLSearchParams({
    month: String(month),
    year: String(year),
  });
  for (const eventType of eventTypes) {
    params.append('eventType', eventType);
  }
  return `/events/calendar?${params.toString()}`;
};

export const calendarStore = signalStore(
  { providedIn: 'root' },
  withState<CalendarState>({ filter: defaultFilter() }),
  withProps(() => ({
    dataService: inject(GatewayResourceService),
    cache: inject(CLIENT_CACHE),
  })),
  withDevtools('Calendar', withGlitchTracking()),
  withResource(({ filter, dataService }) => ({
    calendar: dataService.createGatewayResource<CalendarResponseWire>(() =>
      buildCalendarUrl(filter()),
    ),
  })),
  withMethods((store) => ({
    setFilter(filter: CalendarFilter) {
      patchState(store, { filter });
    },
    previousMonth() {
      patchState(store, { filter: shiftMonth(store.filter(), -1) });
    },
    nextMonth() {
      patchState(store, { filter: shiftMonth(store.filter(), 1) });
    },
    goToToday() {
      const now = new Date();
      const { eventTypes } = store.filter();
      patchState(store, {
        filter: { month: now.getMonth() + 1, year: now.getFullYear(), eventTypes },
      });
    },
    reloadCalendar() {
      const current = store.filter();
      patchState(store, {
        filter: {
          month: current.month,
          year: current.year,
          eventTypes: [...current.eventTypes],
        },
      });
    },
  })),
  withHooks({
    onInit(store) {
      const saved = store.cache.get<unknown>(CACHE_KEYS.calendarFilter);
      if (isCalendarFilter(saved)) {
        patchState(store, { filter: saved });
      }

      effect(() => {
        store.cache.set(CACHE_KEYS.calendarFilter, store.filter());
      });
    },
  }),
);
