import "dotenv/config";
import { fastify } from "fastify";
import { plaidRoutes } from "./plaid/routes.js";
import { ensurePlaidIndexes } from "./plaid/indexes.js";
import { registerAuth } from "./auth/plugin.js";
import { ensureUserIndexes } from "./auth/user.repository.js";
import cors from "@fastify/cors";
import { cateogoryRoutes } from "./categories/routes.js";
import { eventRoutes } from "./events/routes.js";
import mongodb from "@fastify/mongodb";

const server = fastify();

const start = async (): Promise<void> => {
  server.get("/ping", async () => "pong\n");

  await server.register(cors, {
    origin: "http://localhost:4200",
    allowedHeaders: ["Authorization", "Content-Type"],
  });

  await server.register(mongodb as any, {
    url: process.env.MONGO_URL,
  });

  await server.register(registerAuth);
  await server.register(plaidRoutes, { prefix: "/plaid" });
  await server.register(cateogoryRoutes, { prefix: "/categories" });
  await server.register(eventRoutes, { prefix: "/events" });

  server.addHook("onReady", async () => {
    const db = server.mongo.db ?? server.mongo.client.db(process.env.MONGO_DB ?? "balance");
    await Promise.all([ensurePlaidIndexes(db), ensureUserIndexes(db)]);
  });

  await server.listen({ port: 3000, host: "0.0.0.0" });
  console.log(`Server listening at ${server.server.address()}`);
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
