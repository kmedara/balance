import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { CalendarResponse } from '@core/domain';
import { withDevtools, withGlitchTracking, withResource } from '@angular-architects/ngrx-toolkit';
import {  GatewayResourceService } from '@core/gateway-resource.service';
import { inject } from '@angular/core';

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
const initialState: CalendarState = {
    filter: {
        month: today.getMonth() + 1,
        year: today.getFullYear(),
        eventTypes: ['budget', 'plaid_transaction'],
    },
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
    withState(initialState),
    withProps((store) => ({
        dataService: inject(GatewayResourceService),
    })),
    withDevtools('Calendar', withGlitchTracking()),
    withResource(({ filter, dataService }) => ({
        calendar:  dataService.createGatewayResource<CalendarResponse>(() =>
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
);

