import { DomainEvent } from '@kmedara/balance-domain';
import { ComponentEvent, ComponentEventType, ModalEventType } from './component-events';

/**
 * Extract prefix before _ if present,
 * i.e, Modal_Opened => Modal,
 * but ModalOpened => ModalOpened
 */
export type OutcomePrefix<T extends string> = T extends `${infer Prefix}_${string}` ? Prefix : T;

/**
 * Appends Event to the prefix
 * ModalOpened => ModalOpenedEvent
 * Modal_Opened => ModalEvent
 */
export type EventTypeName<TOutcome extends string> = `${OutcomePrefix<TOutcome>}Event`;
/**
 * if Outcome = ModalOpened,
 * ModalOpenedEvent =>
 */
export type EventFromOutcome<TOutcome extends string, TPayload = unknown> = {
  [K in EventTypeName<TOutcome>]: ComponentEvent<TOutcome, TPayload>;
}[EventTypeName<TOutcome>];

/**
 *
 */
export type ModalEvent<T = unknown> = EventFromOutcome<ModalEventType, T>;

export interface IClosable {
  close<T>(outcome: ComponentEventType, payload: T): void;
}
