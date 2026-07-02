import { inject } from '@angular/core';
import { signalStore, type, withState } from '@ngrx/signals';
import { Dispatcher, Events, eventGroup, on, withEventHandlers } from '@ngrx/signals/events';
import { withDevtools, withGlitchTracking, withTrackedReducer } from '@angular-architects/ngrx-toolkit';
import { EMPTY } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { calendarStore } from '@modules/calendar/calendar.store';
import {
  type ModalSubmitPayload,
  getModalSubmitHandler,
} from './modal.context';
import { GATEWAY_HTTP_TOKEN } from '@core/gateway.http';

export const ModalEvents = eventGroup({
  source: 'Modal',
  events: {
    opened: type<{ resourceId: string; occurredAt: Date }>(),
    submitted: type<{ resourceId: string; occurredAt: Date; payload: ModalSubmitPayload }>(),
    submitSucceeded: type<{ resourceId: string; occurredAt: Date }>(),
    submitFailed: type<{ resourceId: string; occurredAt: Date; error: string }>(),
    canceled: type<{ resourceId: string; occurredAt: Date }>(),
    closed: type<{ resourceId: string; occurredAt: Date }>(),
  },
});

type ModalOpenedEvent = ReturnType<typeof ModalEvents.opened>;
type ModalSubmittedEvent = ReturnType<typeof ModalEvents.submitted>;
type ModalSubmitSucceededEvent = ReturnType<typeof ModalEvents.submitSucceeded>;
type ModalSubmitFailedEvent = ReturnType<typeof ModalEvents.submitFailed>;
type ModalCanceledEvent = ReturnType<typeof ModalEvents.canceled>;
type ModalClosedEvent = ReturnType<typeof ModalEvents.closed>;

export type ModalEventInstance =
  | ModalOpenedEvent
  | ModalSubmittedEvent
  | ModalSubmitSucceededEvent
  | ModalSubmitFailedEvent
  | ModalCanceledEvent
  | ModalClosedEvent;

type ModalState = {
  events: ModalEventInstance[];
};

export const ModalStore = signalStore(
  { providedIn: 'root' },
  withDevtools('Modal', withGlitchTracking()),
  withState<ModalState>({ events: [] }),
  withEventHandlers((store, events = inject(Events)) => {
    const dispatcher = inject(Dispatcher);
    const gateway = inject(GATEWAY_HTTP_TOKEN);
    const calendar = inject(calendarStore);
    const deps = { gateway, calendar };

    return {
      submitModal$: events.on(ModalEvents.submitted).pipe(
        switchMap((event) => {
          const { resourceId, payload } = event.payload;
          const handler = getModalSubmitHandler(payload.action);

          if (!handler) {
            console.warn(`No modal submit handler for action: ${payload.action}`);
            return EMPTY;
          }

          return handler(deps, payload).pipe(
            tap(() => {
              dispatcher.dispatch(
                ModalEvents.submitSucceeded({ resourceId, occurredAt: new Date() }),
              );
            }),
            catchError((err: unknown) => {
              const error = err instanceof Error ? err.message : 'Submit failed';
              dispatcher.dispatch(
                ModalEvents.submitFailed({ resourceId, occurredAt: new Date(), error }),
              );
              return EMPTY;
            }),
          );
        }),
      ),
    };
  }),
  withTrackedReducer(
    on(...Object.values(ModalEvents), (event, state) => ({
      events: [...state.events, event],
    })),
  ),
);
