import { Component, computed, inject, input } from '@angular/core';
import {
  BudgetCalendarItem,
  DefaultCalendarItem,
  PlaidTransactionCalendarItem,
} from './calendar-item-types';
import type { CalendarEvent } from '@core/domain';
import { ModalService } from '@modules/modal/modal.service';
import { AddEventModal } from '@modules/modal/add-event-modal/add-event-modal';

type CalendarEventWithId = CalendarEvent<unknown> & { id?: string };

@Component({
  selector: 'app-calendar-event-item',
  imports: [BudgetCalendarItem, PlaidTransactionCalendarItem, DefaultCalendarItem],
  templateUrl: './calendar-event-item.html',
  styleUrl: './calendar-event-item.scss',
})
export class CalendarEventItem {
  private readonly modalService = inject(ModalService);

  event = input.required<CalendarEvent<unknown>>();

  eventType = computed(() => this.event()?.eventType);

  isEditable = computed(() => this.eventType() === 'budget');

  onClick(event: Event): void {
    event.stopPropagation();

    if (event instanceof KeyboardEvent) {
      event.preventDefault();
    }

    if (!this.isEditable()) return;

    const calEvent = this.event() as CalendarEventWithId;
    const eventId = calEvent.id;
    if (!eventId) return;

    void this.modalService.open(
      { content: AddEventModal, header: 'Edit budget' },
      { action: 'updateEvent', eventType: 'budget', eventId },
    );
  }
}
