import { encrypt } from "@kmedara/balance-domain/crypto";
import { generatePlaidItemId } from "@kmedara/balance-domain/domain/resourcable";
import { plaidClient } from "../../client.js";
import type { PlaidItemRepository } from "../../../../../db/index.js";
import type { Mediator } from "../../../core/mediator.js";

export const EXCHANGE_PUBLIC_TOKEN = "plaid.exchangePublicToken";
export const PLAID_ITEM_LINKED = "plaid.itemLinked";

export type ExchangePublicTokenCommand = {
  publicToken: string;
  userId: string;
};

export type ExchangePublicTokenResult = {
  item_id: string;
  request_id: string;
};

type PlaidItemLinkedEvent = {
  userId: string;
  plaidItemId: string;
  occurredAt: string;
};

export const registerExchangePublicTokenHandler = (
  mediator: Mediator,
  plaidItemRepository: PlaidItemRepository,
): void => {
  mediator.registerRequest<ExchangePublicTokenCommand, ExchangePublicTokenResult>(
    EXCHANGE_PUBLIC_TOKEN,
    async (command) => {
      const { data } = await plaidClient.itemPublicTokenExchange({
        public_token: command.publicToken,
      });

      await plaidItemRepository.save({
        userId: command.userId,
        plaidItemId: data.item_id,
        accessTokenEncrypted: encrypt(data.access_token),
        status: "active",
        resourceId: generatePlaidItemId(),
      });

      await mediator.publish<PlaidItemLinkedEvent>(PLAID_ITEM_LINKED, {
        userId: command.userId,
        plaidItemId: data.item_id,
        occurredAt: new Date().toISOString(),
      });

      return {
        item_id: data.item_id,
        request_id: data.request_id,
      };
    },
  );
};
