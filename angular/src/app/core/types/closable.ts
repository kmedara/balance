import { EventOutcome } from './events';

export interface IClosable {
  close<T>(outcome: EventOutcome, payload: T): void;
}
