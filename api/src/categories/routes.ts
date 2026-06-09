import type { FastifyInstance } from "fastify";

export const cateogoryRoutes = async (app: FastifyInstance, options: object) => {

  app.get("/", async () => {
    const db = app.mongo.db ?? app.mongo.client.db("balance");
    const categories = await db.collection("categories").find({}).toArray();
    return categories.map((c) => c.displayName as string);
  });
};
