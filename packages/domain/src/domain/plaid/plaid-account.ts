import type { IResourcable } from "../resourcable.js";
import type { ISyncable } from "./syncable.js";

export type PlaidAccount = {
  userId: string; /**index */
  plaidItemId: string /**index */;
  plaidAccountId: string /**unique index */;
  name: string;
  mask: string;
  type: string;
  subtype?: string;
  currentBalance: number;
  availableBalance?: number;
  currency: string;
} & IResourcable &
  ISyncable;
