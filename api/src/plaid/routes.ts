import type { FastifyInstance } from "fastify";
import { plaidClient } from "./client.js";
import { getPlaidEnvVars } from "../env.helper.js";
import { CountryCode, Products, type LinkTokenCreateRequest } from "plaid";
import { encrypt } from "@kmedara/balance-domain/crypto";
import type { PlaidItem } from "@kmedara/balance-domain";
import { generateResourceId } from "@src/resource.js";

export const plaidRoutes = (app: FastifyInstance, options: object) => {
  app.get("/link-token", async () => {
    const x = async () => "hello";

    return await x().then((d) => d);
  });

  // Create Link Token
  app.post("/link-token", async (req, res) => {
    const {
      PLAID_CLIENT_NAME,
      PLAID_PRODUCTS,
      PLAID_COUNTRY_CODES,
      PLAID_CLIENT_ID,
      PLAID_SECRET,
      PLAID_REDIRECT_URI,
    } = getPlaidEnvVars();

    const request: LinkTokenCreateRequest = {
      language: "en",
      country_codes: [CountryCode.Us],
      products: [Products.Transactions], //https://plaid.com/docs/balance/add-to-app/ should NOT include balance in products array in link creation, but should include signal
      client_name: "Budget-Balance",
      user: {
        client_user_id: "user_good", // replace with your user ID
      },
      redirect_uri: PLAID_REDIRECT_URI,
      webhook: "",
    };

    res.send({});
    return await plaidClient.linkTokenCreate(request).then(({ data }) => data);
  });

  //Exchange public_token for access_token
  app.post<{
    Body: { public_token: string };
  }>("/exchange-token", async (req, reply) => {
    const { public_token } = req.body;

    return await plaidClient
      .itemPublicTokenExchange({
        public_token,
      })
      .then(async ({ data }) => {
        const encrypted = encrypt(data.access_token);
        const userId = "test-123";
        await app.mongo.db?.collection<PlaidItem>("plaid_items").insertOne({
          userId,
          plaidItemId: data.item_id,
          accessTokenEncrypted: encrypted,
          status: "active",
          resourceId: generateResourceId(),
        });
        return {
          item_id: data.item_id,
          request_id: data.request_id,
        };
      });
  });
};
