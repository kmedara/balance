import 'dotenv/config';

import { buildApp } from './app.js';

const start = async (): Promise<void> => {
  const server = await buildApp();

  await server.listen({ port: 3000, host: '0.0.0.0' });

  console.log(`Server listening at ${server.server.address()}`);
  console.log('Swagger UI at http://localhost:3000/docs');
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
