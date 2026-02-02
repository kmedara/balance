// modal.tokens.ts
import { InjectionToken } from '@angular/core';

// Modal tokens (what components are allowed to see)

// Components only know their modal ID and optional data.

export const MODAL_ID = new InjectionToken<string>('MODAL_ID');

export const MODAL_DATA = new InjectionToken<any>('MODAL_DATA');
