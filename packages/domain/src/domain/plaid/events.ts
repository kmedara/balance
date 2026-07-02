import type { ConcatCapitalizeLowercase } from "../../util.js";

export type PlaidItemEventType = ConcatCapitalizeLowercase<
  "PlaidItem",
  "Linked" | "AccessTokenRotated" | "Removed"
>;
