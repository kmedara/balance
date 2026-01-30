import { DatePipe, NgClass, NgFor } from '@angular/common';
import { Component, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { CalendarDay, Week } from '../../types/types';
import { expenses, incomes } from '../../../../__data__/budgets.data';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    NgClass,
    DataViewModule,
    SelectButtonModule,
    TagModule,
    ButtonModule,
    TooltipModule,
    DatePipe,
    CardModule,
  ],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar {
  weeks: WritableSignal<Array<Week>> = signal([]);
  currentDate = new Date();
  monthLabel = '';
  days: WritableSignal<CalendarDay[]> = signal([]);
  weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  ngOnInit() {
    this.generateCalendar(this.currentDate);
  }

  isToday = (date: Date) =>
    date.getMonth() == new Date().getMonth() && date.getDate() == new Date().getDate();

  generateCalendar = (date: Date) => {
    this.days.set([]);
    const year = date.getFullYear();
    const month = date.getMonth();
    this.monthLabel = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const totalDays = lastDayOfMonth.getDate();

    const startDayOfWeek = firstDayOfMonth.getDay();

    // Previous month's trailing days
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      this.days.update((days) => [
        ...days,
        {
          date: new Date(year, month - 1, prevMonthLastDate - i),
          inCurrentMonth: false,
          budgets: {},
        },
      ]);
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      this.days.update((days) => [
        ...days,
        {
          date: new Date(year, month, d),
          inCurrentMonth: true,
          budgets: {
            incomes: incomes,
            expenses: expenses,
          },
        },
      ]);
    }

    // Next month's leading days
    const endIndex = this.days().length % 7;
    const remainingDays = endIndex === 0 ? 0 : 7 - endIndex;
    console.log(remainingDays);
    for (let d = 1; d <= remainingDays; d++) {
      this.days.update((days) => [
        ...days,
        {
          date: new Date(year, month + 1, d),
          inCurrentMonth: false,
          budgets: {},
        },
      ]);
    }

    // Split into weeks
    for (let i = 0; i < this.days().length; i += 7) {
      this.weeks.update((curr) => {
        const week = this.days().slice(i, i + 7);
        return [...curr, week] as Week[];
      });
    }
  };

  previousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar(this.currentDate);
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar(this.currentDate);
  }

  today() {
    // this.currentDate = new Date();
    this.generateCalendar(this.currentDate);
  }
}
