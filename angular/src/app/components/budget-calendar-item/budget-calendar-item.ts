import { Component, input } from '@angular/core';
import { Budget } from '../../types/types';
import { NgClass, NgStyle } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-budget-calendar-item',
  imports: [Tooltip, NgStyle, Card],
  templateUrl: './budget-calendar-item.html',
  styleUrl: './budget-calendar-item.scss',
})
export class BudgetCalendarItem {
  budget = input<Budget | null>();

  getSidebarColor(category?: string): string {
    switch (category) {
      case 'Income':
        return 'var(--income-color)';
      case 'Expense':
        return 'var(--expense-color)';
      default:
        return 'red';
    }
  }

  getBackgroundColor(category?: string): string {
    switch (category) {
      case 'Income':
        return 'color-mix(in srgb, var(--income-color) 50%, transparent)';
      case 'Expense':
        return 'color-mix(in srgb, var(--expense-color) 50%, transparent)';

      default:
        return 'red';
    }
  }
}
