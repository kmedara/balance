import { Component, input } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';
import { CalendarEvent } from '@kmedara/balance-domain/domain/calendar/calendar';
@Component({
  selector: 'app-default-calendar-item',
  imports: [Tooltip],
  templateUrl: './default-calendar-item.html',
  styleUrl: './default-calendar-item.scss',
})
export class DefaultCalendarItem {
  event = input<CalendarEvent<any>>();
}
