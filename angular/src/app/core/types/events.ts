/**
 * Creates a pascal case string literal from two inputs
 */
type ConcatCapitalizeLowercase<
  S1 extends string,
  S2 extends string,
> = `${Capitalize<Lowercase<S1>>}${Capitalize<Lowercase<S2>>}`;

/**
 * Template literal types distribute over unions
 */
type ModalOutcome = ConcatCapitalizeLowercase<'Modal', 'Opened' | 'Submitted' | 'canceled'>;

type ToastOutcome = ConcatCapitalizeLowercase<'Toast', 'Shown' | 'Dismissed'>;

type ApiOutcome = ConcatCapitalizeLowercase<'Api', 'Success' | 'Failure'>;

/**
 * Master set of allowed outcomes
 */
export type EventOutcome = ModalOutcome | ToastOutcome | ApiOutcome | 'OK';

/**
 * Extract prefix before _ if present,
 * i.e, Modal_Opened => Modal,
 * but ModalOpened => ModalOpened
 */
type OutcomePrefix<T extends string> = T extends `${infer Prefix}_${string}` ? Prefix : T;

/**
 * Appends Event to the prefix
 * ModalOpened => ModalOpenedEvent
 * Modal_Opened => ModalEvent
 */
type EventTypeName<TOutcome extends string> = `${OutcomePrefix<TOutcome>}Event`;

/**
 *
 */
type Event<T = unknown, K = unknown> = {
  id: string;
  outcome: T;
  payload?: K;
};

/**
 * if Outcome = ModalOpened,
 * ModalOpenedEvent =>
 */
type EventFromOutcome<TOutcome extends string, TPayload = unknown> = {
  [K in EventTypeName<TOutcome>]: Event<TOutcome, TPayload>;
}[EventTypeName<TOutcome>];

/**
 *
 */
type ModalEvent<T = unknown> = EventFromOutcome<ModalOutcome, T>;

export type { ModalEvent, ModalOutcome, ToastOutcome, ApiOutcome };
