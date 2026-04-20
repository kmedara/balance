import type { FastifyInstance } from "fastify";
import { Mediator } from "../core/mediator.js";
import { createMongoPlaidItemRepository } from "../../../db/index.js";
import { registerPlaidApplication } from "./application/register.js";
import { CREATE_LINK_TOKEN } from "./application/queries/create-link-token.js";
import {
  EXCHANGE_PUBLIC_TOKEN,
  type ExchangePublicTokenResult,
} from "./application/commands/exchange-public-token.js";

export const plaidRoutes = (app: FastifyInstance, options: object) => {
  const plaidItemRepository = createMongoPlaidItemRepository(app);
  const mediator = new Mediator();
  registerPlaidApplication(mediator, plaidItemRepository);

  app.get("/link-token", async () => {
    return { status: "ok" };
  });

  // Create Link Token
  app.post("/link-token", async () => {
    return mediator.send(CREATE_LINK_TOKEN, {
      clientUserId: "user_good",
    });
  });

  //Exchange public_token for access_token
  app.post<{
    Body: { public_token: string };
  }>("/exchange-token", async (req) => {
    const { public_token } = req.body;

    return mediator.send<{ publicToken: string; userId: string }, ExchangePublicTokenResult>(
      EXCHANGE_PUBLIC_TOKEN,
      {
        publicToken: public_token,
        userId: "test-123",
      },
    );
  });
};
