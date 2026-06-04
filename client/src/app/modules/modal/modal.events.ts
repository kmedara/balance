// modal.events.ts
import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import type { Budget } from '@kmedara/balance-domain';
export const ModalEvents = eventGroup({
  source: 'Modal',
  events: {
    opened: type<{ resourceId: string, occurredAt: Date }>(),
    submitted: type<{ resourceId: string, occurredAt: Date, payload: any }>(),
    canceled: type<{ resourceId: string, occurredAt: Date }>(),
    closed: type<{ resourceId: string, occurredAt: Date }>(),
  },
});