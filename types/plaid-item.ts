import type crypto = require("@src/crypto");
import type { IResourcable } from "./resourcable";
import type { ISyncable } from "./syncable";

/**
 * 1 item per bank connection per user
 */
export type PlaidItem = {
  userId: string /**index */;
  plaidItemId: string /** unique index */;
  accessTokenEncrypted: crypto.EncryptedValue;
  institutionId?: string;
  institutionName?: string;
  status: "active" | "error" | "revoked";
  lastSyncAt?: Date;
  revokedAt?: Date;
} & IResourcable &
  ISyncable;
