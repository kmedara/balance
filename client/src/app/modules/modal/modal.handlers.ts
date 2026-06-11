import type { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { calendarStore } from '@modules/calendar/calendar.store';
import type { ModalAction, ModalSubmitPayload } from './modal.context';

export type ModalSubmitDeps = {
  gateway: HttpClient;
  calendar: InstanceType<typeof calendarStore>;
};

export type ModalSubmitHandler = (
  deps: ModalSubmitDeps,
  payload: ModalSubmitPayload,
) => Observable<unknown>;

const formatDateOnly = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const toCreateEventRequest = (payload: ModalSubmitPayload) => ({
  eventType: payload.eventType,
  title: payload.title.trim(),
  type: payload.type,
  amount: payload.amount ?? 0,
  category: payload.category.trim(),
  description: payload.description?.trim() || undefined,
  dtstart: formatDateOnly(payload.startDate),
  frequency: payload.frequency,
  interval: payload.interval,
  until: payload.endDate ? formatDateOnly(payload.endDate) : undefined,
});

export const modalSubmitHandlers: Record<ModalAction, ModalSubmitHandler> = {
  createEvent: (deps, payload) =>
    deps.gateway.post('/events', toCreateEventRequest(payload)).pipe(
      tap(() => deps.calendar.reloadCalendar()),
    ),
};

export const getModalSubmitHandler = (
  action: ModalAction,
): ModalSubmitHandler | undefined => modalSubmitHandlers[action];
