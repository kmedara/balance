import { computed, effect, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

import { debounceTime, distinctUntilChanged, map, pipe, switchMap, tap } from 'rxjs';
import { BudgetService } from '@services/budget.service';
import { Budget } from '@kmedara/balance-domain';
import { ISortable } from '@kmedara/balance-domain/domain/sortable';
import { IPageable } from '@kmedara/balance-domain/domain/pageable';
import { toObservable } from '@angular/core/rxjs-interop';

type BudgetState = {
  budgets: Partial<Budget>[];
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
  withState(initialState),
  withComputed(({ budgets }) => ({
    budgetCount: computed(() => budgets?.length || 0),
  })),
  withMethods((store, _budgetService = inject(BudgetService)) => {
    //no need for manual fetch, reacts to filter changes
    effect(() => {
      //const filter = store.filter();
      const filter$ = toObservable(store.filter);
      filter$
        .pipe(
          switchMap((filter) => {
            patchState(store, { isLoading: true });
            return _budgetService.getBudgets(filter);
          }),
        )
        .subscribe((budgets) => patchState(store, { budgets, isLoading: false }));
    });
    const setFilter = (filter: BudgetFilter) => patchState(store, { filter });

    return { setFilter };
  }),
);
