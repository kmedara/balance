import type { ComponentEventType } from "./events";

export interface IClosable {
  close<T>(outcome: ComponentEventType, payload: T): void;
}
