import type { Mediator } from "../../../core/mediator.js";
import { PLAID_ITEM_LINKED } from "../commands/exchange-public-token.js";

type PlaidItemLinkedEvent = {
  userId: string;
  plaidItemId: string;
  occurredAt: string;
};

export const registerPlaidItemLinkedHandlers = (mediator: Mediator): void => {
  mediator.subscribe<PlaidItemLinkedEvent>(PLAID_ITEM_LINKED, async (event) => {
    // Placeholder side effect for event-driven flow.
    console.log("Plaid item linked", event);
  });
};
