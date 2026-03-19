import type { IResourcable } from "./resourcable";
import type { ISyncable } from "./syncable";

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
