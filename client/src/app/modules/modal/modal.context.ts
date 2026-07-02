import { InjectionToken, Type } from '@angular/core';
import type { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { calendarStore } from '@modules/calendar/calendar.store';
import { toEventWriteRequest } from './event-form.utils';

export type ModalConfig = {
  content: Type<unknown>;
  header?: string | Type<unknown> | undefined;
};

export type ModalContext = {
  submit: (payload: CreateEventFormPayload) => void;
  cancel: () => void;
};

export type ModalAction = 'createEvent' | 'updateEvent';

export type ModalData = {
  action: ModalAction;
  eventType: 'budget' | 'placeholder';
  eventId?: string;
};

export type CreateEventFormPayload = {
  type: 'Income' | 'Expense';
  title: string;
  amount: number | null;
  category: string;
  description?: string;
  startDate: Date;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  interval: number;
  endDate?: Date | null;
};

export type ModalSubmitPayload = ModalData & CreateEventFormPayload;

/**
 * Modal tokens (what components are allowed to see).
 * Components only know their modal ID and optional data.
 */
export const MODAL_CONTEXT = new InjectionToken<ModalContext>('MODAL_CONTEXT');
export const MODAL_ID = new InjectionToken<string>('MODAL_ID');
export const MODAL_CONFIG = new InjectionToken<ModalConfig>('MODAL_CONFIG');
export const MODAL_DATA = new InjectionToken<ModalData>('MODAL_DATA');

export type ModalSubmitDeps = {
  gateway: HttpClient;
  calendar: InstanceType<typeof calendarStore>;
};

export type ModalSubmitHandler = (
  deps: ModalSubmitDeps,
  payload: ModalSubmitPayload,
) => Observable<unknown>;

const toCreateEventRequest = (payload: ModalSubmitPayload) => ({
  eventType: payload.eventType,
  ...toEventWriteRequest(payload),
});

export const modalSubmitHandlers: Record<ModalAction, ModalSubmitHandler> = {
  createEvent: (deps, payload) =>
    deps.gateway.post('/events', toCreateEventRequest(payload)).pipe(
      tap(() => deps.calendar.reloadCalendar()),
    ),

  updateEvent: (deps, payload) => {
    if (!payload.eventId) {
      throw new Error('Missing event id');
    }

    return deps.gateway.patch(`/events/${payload.eventId}`, toEventWriteRequest(payload)).pipe(
      tap(() => deps.calendar.reloadCalendar()),
    );
  },
};

export const getModalSubmitHandler = (
  action: ModalAction,
): ModalSubmitHandler | undefined => modalSubmitHandlers[action];
