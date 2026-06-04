import { Type } from "@angular/core";
import { Dispatcher, EventCreator, EventInstance } from "@ngrx/signals/events";
export type ModalConfig = {
    content: Type<unknown>;
    header?: string | Type<unknown> | undefined;
}

/**
 *  Relying on specific @Outputs (submitForm, cancelForm) in the content component couples the modal shell to the component API, 
 * which reduces reusability. Instead, you can use injection tokens + a shared “modal context” service that 
 * each content component can use to communicate with the shell/service, without the shell needing to know the component’s properties.
 */
export type ModalContext<T = unknown> = {
    /** Call this to submit data from the content component */
    submit:(payload: T, event: EventCreator<any, any>) => void;
    cancel: () => void;
}