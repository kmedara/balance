import { EventOutcome } from "@__types/events";

export interface IClosable {
  close<T>(outcome: EventOutcome, payload: T): void;
}
