import { signalStore, withState } from '@ngrx/signals';
import { EventCreator, on } from '@ngrx/signals/events';
import { ModalEvents } from './modal.events';
import { withDevtools, withGlitchTracking, withTrackedReducer } from '@angular-architects/ngrx-toolkit';

type ModalOpenedEvent = ReturnType<typeof ModalEvents.opened>;
type ModalSubmittedEvent = ReturnType<typeof ModalEvents.submitted>;
type ModalCanceledEvent = ReturnType<typeof ModalEvents.canceled>;
type ModalClosedEvent = ReturnType<typeof ModalEvents.closed>;

export type ModalEventInstance =
  | ModalOpenedEvent
  | ModalSubmittedEvent
  | ModalCanceledEvent
  | ModalClosedEvent;

type ModalState = {
  events: ModalEventInstance[];
};

var x : EventCreator<any,any>[] = [ModalEvents.opened, ModalEvents.submitted, ModalEvents.canceled, ModalEvents.closed];
export const ModalStore = signalStore(
  { providedIn: 'root' },
  withDevtools('Modals', withGlitchTracking()),
  withState<ModalState>({ events: [] }),
  withTrackedReducer(
    on(...Object.values(ModalEvents), (event, state) => {        
        console.log(event.type, event.payload);
        return {
            events: [...state.events, event],
        };
    }),
  ),
);
