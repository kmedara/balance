import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { RichTooltipDirective } from '@core/rich-tooltip/rich-tooltip.directive';

export type CalendarItemTypeClass = 'income' | 'expense' | 'neutral' | 'default';

@Component({
  selector: 'app-calendar-item-shell',
  imports: [NgTemplateOutlet, RichTooltipDirective],
  templateUrl: './calendar-item-shell.html',
  styleUrl: './calendar-item-shell.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CalendarItemShell {
  typeClass = input.required<CalendarItemTypeClass>();
  pending = input(false);
  tooltip = input<TemplateRef<unknown> | null>(null);

  itemClass = computed(() => {
    const classes = ['calendar-item', `calendar-item--${this.typeClass()}`];
    if (this.pending()) {
      classes.push('calendar-item--pending');
    }
    return classes.join(' ');
  });

  tooltipPanelClasses = computed(() => [
    'calendar-item-tooltip',
    `calendar-item-tooltip--${this.typeClass()}`,
  ]);

  tooltipContentClass = computed(
    () => `calendar-item__tooltip calendar-item__tooltip--${this.typeClass()}`,
  );
}
