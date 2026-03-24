import { Component, computed, input } from '@angular/core';
import { Budget, BudgetType } from '@kmedara/balance-domain';
import { CurrencyPipe, NgClass, NgStyle } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-budget-calendar-item',
  imports: [Tooltip, NgStyle, NgClass, CurrencyPipe],
  templateUrl: './budget-calendar-item.html',
  styleUrl: './budget-calendar-item.scss',
})
export class BudgetCalendarItem {
  budget = input<Budget | null>();

  className = computed(() =>
    this.budget()?.type === 'Income' ? 'income-calendar-item' : 'expense-calendar-item',
  );

  /**
   * Tooltip styling wasn't working with ngClass
   */
  tooltipStyle = computed(() => {
    switch (this.budget()?.type) {
      case 'Income':
        return { 'background-color': 'var(--income-color)' };
      case 'Expense':
        return { 'background-color': 'var(--expense-color)' };
      default:
        return { 'background-color': 'red' };
    }
  });
}
