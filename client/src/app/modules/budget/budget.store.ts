// budget.store.ts
import { Events, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import { ModalEvents } from '@modules/modal/modal.events';
import { signalStore, withState } from '@ngrx/signals';
import { Budget } from '@kmedara/balance-domain';
import { BudgetEvents } from './budget.events';
import { GATEWAY_HTTP_TOKEN } from '@core/tokens/http.token';
import { inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
type BudgetState = {
    budgets: Budget[];
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
    isLoading: false,
    filter: {
        startDate: new Date(today.getFullYear(), today.getMonth(), 1),
        endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0),
    },
};

export const BudgetStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withEventHandlers((
        store,
        events = inject(Events),
        gateway = inject(GATEWAY_HTTP_TOKEN)) => ({
            loadBudgets$: events
                .on(BudgetEvents.load)
                .pipe(
                    switchMap(({ payload }) => {
                        const params = new HttpParams().set('startDate', payload.filter.startDate.toISOString()).set('endDate', payload.filter.endDate.toISOString());
                        return gateway.get<Budget[]>('/budgets', { params });
                    })
                )
        })),
    // load(), computed, etc.
);