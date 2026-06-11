import { Type } from '@angular/core';

export type ModalConfig = {
  content: Type<unknown>;
  header?: string | Type<unknown> | undefined;
};

export type ModalContext = {
  submit: (payload: CreateEventFormPayload) => void;
  cancel: () => void;
};

export type ModalAction = 'createEvent';

export type ModalData = {
  action: ModalAction;
  eventType: 'budget';
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
