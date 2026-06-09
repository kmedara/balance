import { Component, computed, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';
import { CalendarEvent } from '@kmedara/balance-domain/domain/calendar/calendar';
import { Budget } from '@kmedara/balance-domain/domain/budget/budget';

export type BudgetItemTypeClass = 'income' | 'expense' | 'neutral';

const BUDGET_TYPE_CLASS: Record<string, BudgetItemTypeClass> = {
  Income: 'income',
  Expense: 'expense',
};

@Component({
  selector: 'app-budget-calendar-item',
  imports: [Tooltip, CurrencyPipe],
  templateUrl: './budget-calendar-item.html',
  styleUrl: './budget-calendar-item.scss',
})
export class BudgetCalendarItem {
  event = input<CalendarEvent<Budget> | null>(null);

  typeClass = computed((): BudgetItemTypeClass => {
    const type = this.event()?.type;
    return type !== undefined ? (BUDGET_TYPE_CLASS[type] ?? 'neutral') : 'neutral';
  });

  typeLabel = computed(() => this.event()?.type ?? 'Budget');

  itemClass = computed(() => `calendar-item calendar-item--${this.typeClass()}`);

  tooltipClass = computed(
    () => `calendar-item-tooltip calendar-item-tooltip--${this.typeClass()}`,
  );

  tooltipContentClass = computed(
    () => `calendar-item__tooltip calendar-item__tooltip--${this.typeClass()}`,
  );
}
