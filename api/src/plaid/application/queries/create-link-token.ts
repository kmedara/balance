import { CountryCode, Products, type LinkTokenCreateRequest } from "plaid";
import { plaidClient } from "../../client.js";
import { getPlaidEnvVars } from "../../../env.helper.js";
import type { Mediator } from "../../../core/mediator.js";

export const CREATE_LINK_TOKEN = "plaid.createLinkToken";

export type CreateLinkTokenQuery = {
  clientUserId: string;
};

export const registerCreateLinkTokenHandler = (mediator: Mediator): void => {
  mediator.registerRequest<CreateLinkTokenQuery, unknown>(CREATE_LINK_TOKEN, async (query) => {
    const { PLAID_REDIRECT_URI } = getPlaidEnvVars();

    const request: LinkTokenCreateRequest = {
      language: "en",
      country_codes: [CountryCode.Us],
      products: [Products.Transactions],
      client_name: "Budget-Balance",
      user: {
        client_user_id: query.clientUserId,
      },
      redirect_uri: PLAID_REDIRECT_URI,
      webhook: "",
    };

    const { data } = await plaidClient.linkTokenCreate(request);
    return data;
  });
};
