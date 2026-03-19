export type SyncState = {
  itemId: string /**unique index */;
  userId: string;
  plaidItemId: string;
  transactionCursor?: string;
  lastSuccessfulSync: Date;
  lastAttemptedSync: Date;
  status: "idle" | "syncing" | "error";
};
