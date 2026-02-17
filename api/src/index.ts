import "dotenv/config";
import { fastify } from "fastify";
import { plaidRoutes } from "./plaid/routes.js";
import cors from "@fastify/cors";

const server = fastify();

server.get("/ping", async (request, reply) => {
  return "pong\n";
});
server.register(cors, {
  origin: "http://localhost:4200",
  credentials: true,
});
server.register(plaidRoutes, { prefix: "/plaid" });

server.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
