import { Component, computed, input } from '@angular/core';
import { BudgetCalendarItem } from './budget/budget-calendar-item';
import { DefaultCalendarItem } from './default/default-calendar-item';
import { PlaidTransactionCalendarItem } from './plaid-transaction/plaid-transaction-calendar-item';
import { CalendarEvent } from '@kmedara/balance-domain/domain/calendar/calendar';

@Component({
  selector: 'app-calendar-event-item',
  imports: [BudgetCalendarItem, PlaidTransactionCalendarItem, DefaultCalendarItem],
  templateUrl: './calendar-event-item.html',
})
export class CalendarEventItem {
  event = input.required<CalendarEvent<any>>();

  eventType = computed(() => this.event()?.eventType);
}
