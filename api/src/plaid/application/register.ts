import type { Mediator } from "../../core/mediator.js";
import type { PlaidItemRepository } from "../../db/index.js";
import { registerExchangePublicTokenHandler } from "./commands/exchange-public-token.js";
import { registerPlaidItemLinkedHandlers } from "./events/plaid-item-linked.js";
import { registerCreateLinkTokenHandler } from "./queries/create-link-token.js";

export const registerPlaidApplication = (
  mediator: Mediator,
  plaidItemRepository: PlaidItemRepository,
): void => {
  registerCreateLinkTokenHandler(mediator);
  registerExchangePublicTokenHandler(mediator, plaidItemRepository);
  registerPlaidItemLinkedHandlers(mediator);
};
