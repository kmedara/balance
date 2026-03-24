import { Component } from '@angular/core';
import { IResourcable } from '@kmedara/balance-domain/domain/resourcable';
import { ConcatCapitalizeLowercase } from '@kmedara/balance-domain/util';

/**
 * Template literal types distribute over unions
 */
export type ModalEventType = ConcatCapitalizeLowercase<
  'Modal',
  'Opened' | 'Submitted' | 'canceled'
>;

export type ToastEventType = ConcatCapitalizeLowercase<'Toast', 'Shown' | 'Dismissed'>;

export type ApiEventType = ConcatCapitalizeLowercase<'Api', 'Success' | 'Failure'>;

export type ComponentEventType = ModalEventType | ToastEventType | ApiEventType | 'OK';

/**
 *
 */
export type ComponentEvent<T = ComponentEventType, K = unknown> = {
  id: string;
  eventType: T;
  payload?: K;
  occurredAt: Date;
};
