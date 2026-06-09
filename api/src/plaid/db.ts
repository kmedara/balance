import type { Db } from 'mongodb';
import type { FastifyInstance } from 'fastify';

const DEFAULT_DB_NAME = process.env.MONGO_DB ?? 'balance';

export const getDb = (app: FastifyInstance): Db =>
  app.mongo.db ?? app.mongo.client.db(DEFAULT_DB_NAME);
