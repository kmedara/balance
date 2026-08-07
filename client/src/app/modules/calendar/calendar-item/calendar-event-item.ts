import { CurrencyPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import type { CalendarEventWire } from '@core/domain';
import { BUDGET_EVENT_TYPE, PLAID_TRANSACTION_EVENT_TYPE } from '@core/domain';
import {
  CalendarItemShell,
  type CalendarItemTypeClass,
} from './calendar-item-shell';

const TYPE_CLASS: Record<string, CalendarItemTypeClass> = {
  Income: 'income',
  Expense: 'expense',
};

@Component({
  selector: 'app-calendar-event-item',
  imports: [CalendarItemShell, CurrencyPipe],
  templateUrl: './calendar-event-item.html',
  styleUrl: './calendar-event-item.scss',
})
export class CalendarEventItem {
  event = input.required<CalendarEventWire>();

  readonly eventType = computed(() => this.event()?.eventType);

  private readonly isBudget = computed(() => this.eventType() === BUDGET_EVENT_TYPE);
  private readonly isPlaid = computed(() => this.eventType() === PLAID_TRANSACTION_EVENT_TYPE);
  private readonly isDefault = computed(() => !this.isBudget() && !this.isPlaid());

  readonly pending = computed(() => (this.isPlaid() ? !!this.event()?.pending : false));

  readonly typeClass = computed((): CalendarItemTypeClass => {
    if (this.isDefault()) {
      return 'default';
    }

    const type = this.event()?.type;
    const fallback: CalendarItemTypeClass = this.isPlaid() ? 'expense' : 'neutral';
    return type !== undefined ? (TYPE_CLASS[type] ?? fallback) : fallback;
  });

  readonly typeLabel = computed(() => {
    if (this.isPlaid()) {
      if (this.pending()) {
        return 'Pending transaction';
      }
      return this.event()?.type === 'Income' ? 'Bank deposit' : 'Bank charge';
    }

    if (this.isBudget()) {
      return this.event()?.type ?? 'Budget';
    }

    return this.event()?.eventType ?? 'Event';
  });

  readonly title = computed(() => {
    if (this.isDefault()) {
      return this.event()?.eventType ?? 'Event';
    }
    return this.event()?.title ?? '';
  });

  readonly showAmount = computed(
    () => !this.isDefault() && this.event()?.amount !== undefined,
  );
}
