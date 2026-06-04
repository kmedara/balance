import type { FastifyInstance } from "fastify";

export const cateogoryRoutes = (app: FastifyInstance, options: object) => {

  app.get("/", async (req, res) => {
    return Promise.resolve(["Food", "Rent", "Utilities", "Transportation", "Entertainment", "Other", "@@@####"]);
  });
};
