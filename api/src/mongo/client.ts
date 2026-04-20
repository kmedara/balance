import { Configuration, CountryCode, PlaidApi, PlaidEnvironments } from "plaid";
import { getPlaidEnvVars } from "../env.helper.js";
import type { ApiConfiguration } from "@src/api-configuration.js";
import type { PlaidEnv } from "@kmedara/balance-lib/contracts/plaid/plaid-env";
// Initialize the Plaid client
// Find your API keys in the Dashboard (https://dashboard.plaid.com/account/keys)
const configuration = (): ApiConfiguration => {
  const env: PlaidEnv = getPlaidEnvVars();
  return new Configuration({
    basePath: PlaidEnvironments[env.PLAID_ENV],
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": env.PLAID_CLIENT_ID,
        "PLAID-SECRET": env.PLAID_SECRET,
        "Plaid-Version": "2020-09-14",
      },
    },
  });
};

export const plaidClient = new PlaidApi(configuration());
