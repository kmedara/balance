// modal.store.ts
import { patchState, signalStore, withComputed, withState } from '@ngrx/signals';
import { EventCreator, EventInstance, on, withReducer } from '@ngrx/signals/events';
import { ModalEvents } from './modal.events';
type ModalState = {
    events: ReturnType<typeof ModalEvents.opened | typeof ModalEvents.submitted | typeof ModalEvents.canceled>[]
};

export const ModalStore = signalStore(
    { providedIn: 'root' },
    withState<ModalState>({ events: [] }),
    withReducer(
        on(ModalEvents.opened, ({ payload }) => (state) => {
            console.log('opened', payload);
            return {
                events: [
                    ...state.events,
                    ModalEvents.opened(payload),
                ],
            };
        }),
        on(ModalEvents.submitted, ({ payload }) => (state) => ({
            events: [
                ...state.events,

            ],
        })),
        on(ModalEvents.canceled, ({ payload }) => (state) => ({
            events: [
                ...state.events,

            ],
        })),
    ),
);