import { Component, computed, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';
import type { CalendarEvent, Budget } from '@core/domain';

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

export type PlaidTransactionCalendarEvent = CalendarEvent<{
  title: string;
  name: string;
  merchantName?: string | null;
  amount: number;
  type: 'Income' | 'Expense';
  category?: string;
  pending: boolean;
  plaidTransactionId: string;
}>;

type PlaidItemTypeClass = 'income' | 'expense';

const PLAID_TYPE_CLASS: Record<string, PlaidItemTypeClass> = {
  Income: 'income',
  Expense: 'expense',
};

@Component({
  selector: 'app-plaid-transaction-calendar-item',
  imports: [Tooltip, CurrencyPipe],
  templateUrl: './plaid-transaction-calendar-item.html',
  styleUrl: './plaid-transaction-calendar-item.scss',
})
export class PlaidTransactionCalendarItem {
  event = input<PlaidTransactionCalendarEvent | null>(null);

  typeClass = computed((): PlaidItemTypeClass => {
    const type = this.event()?.type;
    return type !== undefined ? (PLAID_TYPE_CLASS[type] ?? 'expense') : 'expense';
  });

  typeLabel = computed(() => {
    if (this.event()?.pending) {
      return 'Pending transaction';
    }

    return this.event()?.type === 'Income' ? 'Bank deposit' : 'Bank charge';
  });

  itemClass = computed(() => {
    const classes = ['calendar-item', `calendar-item--${this.typeClass()}`];
    if (this.event()?.pending) {
      classes.push('calendar-item--pending');
    }
    return classes.join(' ');
  });

  tooltipClass = computed(
    () => `calendar-item-tooltip calendar-item-tooltip--${this.typeClass()}`,
  );

  tooltipContentClass = computed(
    () => `calendar-item__tooltip calendar-item__tooltip--${this.typeClass()}`,
  );
}

@Component({
  selector: 'app-default-calendar-item',
  imports: [Tooltip],
  templateUrl: './default-calendar-item.html',
  styleUrl: './default-calendar-item.scss',
})
export class DefaultCalendarItem {
  event = input<CalendarEvent<any>>();
}
