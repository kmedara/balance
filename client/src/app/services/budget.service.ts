import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BudgetFilter } from '../store/budget.store';
import { Budget } from '@kmedara/balance-domain';
import { tapResponse, mapResponse } from '@ngrx/operators';
import { Observable } from '@apollo/client';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private http = inject(HttpClient);
  private apollo = inject(Apollo);

  getBudgets = (filter: BudgetFilter) =>
    this.apollo
      .watchQuery<{ budgets: Budget[] }>({
        query: gql`
          query GetBudgetItems($filter: GetBudgetsQuery) {
            budgets(filter: $filter) {
              resourceId
              title
              amount
              category
              startDate
            }
          }
        `,
      })
      .valueChanges.pipe(
        mapResponse({
          next: (res) => res.data && res.data?.budgets,
          error: (res) => {
            console.log(res);
            return [];
          },
        }),
      );
}
