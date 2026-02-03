/**
 * 
 */
export type ConcatCapitalizeLowercase<S1 extends string, S2 extends string> = `${Capitalize<Lowercase<S1>>}${Capitalize<Lowercase<S2>>}`

/**
 * 
 */
export type ModalOutcome = ConcatCapitalizeLowercase<
'Modal',
'Opened' | 'Submitted' | 'Canceled'>

/**
 * 
 */
export type ToastOutcome = ConcatCapitalizeLowercase<
  'Toast',
  'Shown' | 'Dismissed'
>;

export type ApiOutcome = ConcatCapitalizeLowercase<
  'Api',
  'Success' | 'Failure'
>;

/**
 * 
 */
export type EventOutcome =
  | ModalOutcome
  | ToastOutcome
  | ApiOutcome
  | 'OK';

  export type OutcomePrefix<T extends string> =
  T extends `${infer Prefix}_${string}`
    ? Prefix
    : T;

    export type EventTypeName<TOutcome extends string> =
  `${OutcomePrefix<TOutcome>}Event`;

  export type EventFromOutcome<
  TOutcome extends string,
  TPayload = unknown
> = {
  [K in EventTypeName<TOutcome>]: IEvent<TOutcome, TPayload>
}[EventTypeName<TOutcome>];

/**
 * 
 */
export interface IEvent<T = unknown, K = unknown> {
    id: string;
    outcome: T
    payload?: K;
  }

  /**
   * 
   */
  export type ModalEvent<T = unknown> =
  EventFromOutcome<ModalOutcome, T>;
