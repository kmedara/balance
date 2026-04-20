import type { FastifyInstance } from "fastify";
import type { PlaidItem } from "@kmedara/balance-domain";
import type { PlaidItemRepository } from "@kmedara/balance-lib/contracts/repositories/plaid-item-repository";

class MongoPlaidItemRepository implements PlaidItemRepository {
  constructor(private readonly server: FastifyInstance) {}

  async save(item: PlaidItem): Promise<void> {
    await this.server.mongo.db?.collection<PlaidItem>("plaid_items").insertOne(item);
  }
}

export const createMongoPlaidItemRepository = (
  server: FastifyInstance,
): PlaidItemRepository => {
  return new MongoPlaidItemRepository(server);
};
