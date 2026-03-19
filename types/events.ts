import type { IResourcable } from "./resourcable";

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
type ModalEventType = ConcatCapitalizeLowercase<
  "Modal",
  "Opened" | "Submitted" | "canceled"
>;

type ToastEventType = ConcatCapitalizeLowercase<"Toast", "Shown" | "Dismissed">;

type ApiEventType = ConcatCapitalizeLowercase<"Api", "Success" | "Failure">;

type UserEventType = ConcatCapitalizeLowercase<
  "User",
  "Registered" | "Disabled"
>;
type PlaidItemEventType = ConcatCapitalizeLowercase<
  "PlaidItem",
  "Linked" | "AccessTokenRotated" | "Removed"
>;

type ComponentEventType = ModalEventType | ToastEventType | ApiEventType | "OK";

type EntityEventType = UserEventType | PlaidItemEventType;
/**
 * Extract prefix before _ if present,
 * i.e, Modal_Opened => Modal,
 * but ModalOpened => ModalOpened
 */
type OutcomePrefix<T extends string> = T extends `${infer Prefix}_${string}`
  ? Prefix
  : T;

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
  eventType: T;
  eventVersion: number;
  metadata: {
    userId: string;
    source: string; //plaid, api, system, service
  };
  payload?: K;
  occuredAt: Date;
} & IResourcable;

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
type ModalEvent<T = unknown> = EventFromOutcome<ModalEventType, T>;

export type { ModalEvent, ComponentEventType, EntityEventType };
