import { Budget } from '@kmedara/balance-domain';
import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { BudgetFilter } from './budget.store';

export const BudgetEvents = eventGroup({
  source: 'Budget',
  events: {
    load: type<{ filter: BudgetFilter }>(),
    create: type<{ payload: Omit<Budget, 'resourceId'> }>(),
    created: type<{ resourceId: string }>(),
  },
});