import { Component, computed, input } from '@angular/core';
import { BudgetCalendarItem } from '../calendar-item/budget/budget-calendar-item';
import { DefaultCalendarItem } from '../calendar-item/default/default-calendar-item';
import { CalendarEvent } from '@kmedara/balance-domain/domain/calendar/calendar';

@Component({
  selector: 'app-calendar-event-item',
  imports: [BudgetCalendarItem, DefaultCalendarItem],
  templateUrl: './calendar-event-item.html',
})
export class CalendarEventItem {
  event = input.required<CalendarEvent<any>>();

  eventType = computed(() => this.event()?.eventType);
}
