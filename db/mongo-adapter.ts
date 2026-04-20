import mongodb from "@fastify/mongodb";
import type { FastifyInstance } from "fastify";

export interface MongoAdapterOptions {
  url: string;
  forceClose?: boolean;
}

/**
 * Registers MongoDB as an infrastructure adapter on the Fastify server.
 */
export const registerMongoAdapter = (
  server: FastifyInstance,
  options: MongoAdapterOptions,
): void => {
  server.register(mongodb, {
    forceClose: options.forceClose ?? true,
    url: options.url,
  });
};
