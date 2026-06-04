// budget.store.ts
import { Events, on, withEventHandlers } from '@ngrx/signals/events';
import { signalStore, withState } from '@ngrx/signals';
import { Budget } from '@kmedara/balance-domain';
import { BudgetEvents } from './budget.events';
import { GATEWAY_HTTP_TOKEN } from '@core/tokens/http.token';
import { inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map, switchMap } from 'rxjs';
import { withDevtools, withGlitchTracking, withTrackedReducer } from '@angular-architects/ngrx-toolkit';
type BudgetState = {
    budgets: Budget[];
    categorySuggestions: string[];
    isLoading: boolean;
    filter: BudgetFilter;
};

export type BudgetFilter = {
    startDate: Date;
    endDate: Date;
};

const today = new Date();
const initialState: BudgetState = {
    budgets: [],
    categorySuggestions: [],
    isLoading: false,
    filter: {
        startDate: new Date(today.getFullYear(), today.getMonth(), 1),
        endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0),
    },
};

export const BudgetStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withDevtools('Budget', withGlitchTracking()),
    withEventHandlers((
        store,
        events = inject(Events),
        gateway = inject(GATEWAY_HTTP_TOKEN)) => ({
            loadCategories$: events
                .on(BudgetEvents.loadCategories)
                .pipe(
                    switchMap(({ payload }) => {
                        const query = payload.category.trim().toLowerCase();
                        return gateway.get<string[]>('/categories').pipe(
                            map((response) => {
                                return BudgetEvents.categoriesLoaded({  categories: response });
                            })
                        );
                    })
                )
        })),
    withTrackedReducer(
        on(BudgetEvents.categoriesLoaded, (_event, state) => ({
            categorySuggestions: _event.payload.categories,
        })),
    )
    // load(), computed, etc.
);