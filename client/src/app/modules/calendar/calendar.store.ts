import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { CalendarResponse } from '@core/domain';
import { withDevtools, withGlitchTracking, withResource } from '@angular-architects/ngrx-toolkit';
import { DataService } from '@core/customResource';
import { inject } from '@angular/core';

export type CalendarFilter = {
    /** Calendar month, 1–12 (matches API query param). */
    month: number;
    year: number;
};

type CalendarState = {
    filter: CalendarFilter;
};

const today = new Date();
const initialState: CalendarState = {
    filter: {
        month: today.getMonth() + 1,
        year: today.getFullYear(),
    },
};

const shiftMonth = (month: number, year: number, delta: number): CalendarFilter => {
    const date = new Date(year, month - 1 + delta, 1);
    return { month: date.getMonth() + 1, year: date.getFullYear() };
};

export const calendarStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withProps((store) => ({
        dataService: inject(DataService),
    })),
    withDevtools('Calendar', withGlitchTracking()),
    withResource(({ filter, dataService }) => ({
        calendar: dataService.createGatewayResource<CalendarResponse>(() => {
            const { month, year } = filter();
            return `/events/calendar?month=${month}&year=${year}&eventType=budget`;
        }),
    })),
    withMethods((store) => ({
        setFilter(filter: CalendarFilter) {
            patchState(store, { filter });
        },
        previousMonth() {
            patchState(store, { filter: shiftMonth(store.filter().month, store.filter().year, -1) });
        },
        nextMonth() {
            patchState(store, { filter: shiftMonth(store.filter().month, store.filter().year, 1) });
        },
        goToToday() {
            const now = new Date();
            patchState(store, { filter: { month: now.getMonth() + 1, year: now.getFullYear() } });
        },
    })),
);

