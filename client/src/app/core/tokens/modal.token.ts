/**
 * Modal tokens (what components are allowed to see)
 * Components only know their modal ID and optional data.
 * Angular InjectionToken that allows you to pass arbitrary data from the service 
 * to the modal content component without the component needing 
 * to know anything about ModalRef or the service.
*/
import { InjectionToken, Type } from '@angular/core';

export type ModalConfig = {
    content: Type<unknown>;
    header?: string | Type<unknown> | undefined;
    data?: unknown;
}

/**
 *  Relying on specific @Outputs (submitForm, cancelForm) in the content component couples the modal shell to the component API, 
 * which reduces reusability. Instead, you can use injection tokens + a shared “modal context” service that 
 * each content component can use to communicate with the shell/service, without the shell needing to know the component’s properties.
 */
export type ModalContext<T = unknown> = {
    /** Call this to submit data from the content component */
    submit:(payload: T) => void;
    cancel: () => void;
}

export const MODAL_CONTEXT = new InjectionToken<ModalContext>('MODAL_CONTEXT');
export const MODAL_ID = new InjectionToken<string>('MODAL_ID');
export const MODAL_CONFIG = new InjectionToken<ModalConfig>('MODAL_CONFIG');
export const MODAL_DATA = new InjectionToken<unknown>('MODAL_DATA');
