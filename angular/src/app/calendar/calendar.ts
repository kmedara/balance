import { DatePipe, NgClass, NgFor, NgStyle } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { Budget, CalendarDay, Week } from '@__types/types';
import { expenses, incomes } from '@__data__/budgets.data';
import { ModalService } from 'src/app/modals/modal.service';
import { BudgetModal } from 'src/app/modals/budget-modal/budget-modal';
import { toObservable } from '@angular/core/rxjs-interop';
import { getBudgetsForDay } from './calendar.utils';
import { BudgetCalendarItem } from './budget-calendar-item/budget-calendar-item';
import { UserActions } from '@components/user-actions/user-actions';
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
    CardModule,
    BudgetCalendarItem,
  ],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar {
  private _service = inject(ModalService);
  hoveredBudget = signal<Budget | null>(null);
  userBudgets = signal(incomes.concat(expenses));
  weeks: WritableSignal<Array<Week>> = signal([]);
  weeks$ = toObservable(this.weeks);
  currentDate = new Date();
  monthLabel = '';
  days: WritableSignal<CalendarDay[]> = signal([]);
  weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  isToday = (date: Date) => {
    var today = new Date();
    return date.getMonth() == today.getMonth() 
    && date.getDate() == today.getDate() 
    && date.getFullYear() === today.getFullYear();
  }
    

  ngOnInit() {
    this.generateCalendar(this.currentDate);
  }

  add = () => {
    this._service.open(BudgetModal, { header: 'Add a budget', data: { a: 'b'}});
  };

  getTooltip(budget: Budget): string {
    return `
    <div>
      <strong>${budget.title}</strong><br/>
      ${budget.description}<br/>
      <em>${budget.category}</em>
    </div>
  `;
  }
  generateCalendar = (date: Date) => {
    this.days.set([]);
    const year = date.getFullYear();
    const month = date.getMonth();
    this.monthLabel = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const totalDays = lastDayOfMonth.getDate();

    const startDayOfWeek = firstDayOfMonth.getDay();

    const prevMonthLastDate = new Date(year, month, 0).getDate();

    // Previous month's trailing days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDate - i);
      this.days.update((days) => [
        ...days,
        {
          date,
          inCurrentMonth: false,
          budgets: getBudgetsForDay(date, this.userBudgets()),
        },
      ]);
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      const date = new Date(year, month, d);
      this.days.update((days) => [
        ...days,
        {
          date,
          inCurrentMonth: true,
          budgets: getBudgetsForDay(date, this.userBudgets()),
        },
      ]);
    }

    // Next month's leading days
    const endIndex = this.days().length % 7;
    const remainingDays = endIndex === 0 ? 0 : 7 - endIndex;
    for (let d = 1; d <= remainingDays; d++) {
      const date = new Date(year, month + 1, d);
      this.days.update((days) => [
        ...days,
        {
          date,
          inCurrentMonth: false,
          budgets: getBudgetsForDay(date, this.userBudgets()),
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
    this.generateCalendar(this.currentDate);
  }
}
