
/**
 * Modal tokens (what components are allowed to see)
 * Components only know their modal ID and optional data.
 * Angular InjectionToken that allows you to pass arbitrary data from the service 
 * to the modal content component without the component needing 
 * to know anything about ModalRef or the service.
*/
import { InjectionToken, Type } from '@angular/core';
import { ModalConfig, ModalContext, ModalData } from './modal.context';



export const MODAL_CONTEXT = new InjectionToken<ModalContext>('MODAL_CONTEXT');
export const MODAL_ID = new InjectionToken<string>('MODAL_ID');
export const MODAL_CONFIG = new InjectionToken<ModalConfig>('MODAL_CONFIG');
export const MODAL_DATA = new InjectionToken<ModalData>('MODAL_DATA');
