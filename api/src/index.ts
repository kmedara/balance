import "dotenv/config";

import { fastify } from "fastify";

import { plaidRoutes } from "./plaid/routes.js";

import { ensurePlaidIndexes } from "./plaid/indexes.js";

import { registerAuth } from "./auth/plugin.js";

import { ensureUserIndexes } from "./auth/user.repository.js";

import cors from "@fastify/cors";

import { cateogoryRoutes } from "./categories/routes.js";

import { eventRoutes } from "./events/routes.js";

import { ensureEventIndexes } from "./events/repository.js";

import { ensureOccurrenceIndexes } from "./events/occurrence.repository.js";

import { registerSwagger, registerSwaggerUi } from "./swagger/register.js";

import { createEventBodySchema, publicRouteSecurity } from "./swagger/schemas.js";

import mongodb from "@fastify/mongodb";



const server = fastify();



const start = async (): Promise<void> => {

  await server.register(cors, {

    origin: "http://localhost:4200",

    allowedHeaders: ["Authorization", "Content-Type"],

  });



  await server.register(mongodb as any, {

    url: process.env.MONGO_URL,

  });



  await server.register(registerSwagger);



  server.get(

    "/ping",

    {

      schema: {

        tags: ["Health"],

        summary: "Health check",

        security: publicRouteSecurity,

        response: {

          200: { type: "string", example: "pong\n" },

        },

      },

    },

    async () => "pong\n",

  );



  await server.register(registerAuth);

  await server.register(plaidRoutes, { prefix: "/plaid" });

  await server.register(cateogoryRoutes, { prefix: "/categories" });

  await server.register(eventRoutes, { prefix: "/events" });

  await server.register(registerSwaggerUi);



  server.addHook("onReady", async () => {

    const db = server.mongo.db ?? server.mongo.client.db(process.env.MONGO_DB ?? "balance");

    await Promise.all([

      ensurePlaidIndexes(db),

      ensureUserIndexes(db),

      ensureEventIndexes(db),

      ensureOccurrenceIndexes(db),

    ]);

  });



  await server.listen({ port: 3000, host: "0.0.0.0" });

  console.log(`Server listening at ${server.server.address()}`);

  console.log(`Swagger UI at http://localhost:3000/docs`);

};



start().catch((err) => {

  console.error(err);

  process.exit(1);

});

