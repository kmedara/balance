import type { IResourcable } from "../resourcable.js";
import type { ISyncable } from "./syncable.js";
import type { EncryptedValue } from "../../crypto.js";

/**
 * 1 item per bank connection per user
 */
export type PlaidItem = {
  userId: string /**index */;
  plaidItemId: string /** unique index */;
  accessTokenEncrypted: EncryptedValue;
  institutionId?: string;
  institutionName?: string;
  status: "active" | "error" | "revoked";
  lastSyncAt?: Date;
  revokedAt?: Date;
} & IResourcable &
  ISyncable;
