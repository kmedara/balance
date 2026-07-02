import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { CalendarResponseWire } from '@core/domain';
import { ModalService } from '@modules/modal/modal.service';
import { CalendarEventItem } from './calendar-item/calendar-event-item';
import { calendarStore } from './calendar.store';
import { reviveCalendarResponse, summarizeMonth, buildEmptyMonthDays } from './calendar.utils';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgClass, CurrencyPipe, DataViewModule, ButtonModule, CalendarEventItem, RouterOutlet],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar {
  private readonly modalService = inject(ModalService);
  readonly store = inject(calendarStore);

  weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  private calendar = computed(() => {
    const value = this.store.calendarValue() as CalendarResponseWire | undefined;
    return value ? reviveCalendarResponse(value) : undefined;
  });

  days = computed(() => {
    const loaded = this.calendar()?.days;
    if (loaded?.length) return loaded;

    const { month, year } = this.store.filter();
    return buildEmptyMonthDays(year, month);
  });
  monthLabel = computed(() => {
    const label = this.calendar()?.monthLabel;
    if (label) return label;

    const { month, year } = this.store.filter();
    return new Date(year, month - 1, 1).toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
  });
  monthSummary = computed(() => summarizeMonth(this.days()));
  isLoading = computed(() => this.store.calendarIsLoading());

  isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };
}
