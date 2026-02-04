import 'dotenv/config'
import { fastify } from 'fastify'
import { plaidRoutes } from './src/plaid/routes.js'

const server = fastify()

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.register(plaidRoutes, { prefix: '/plaid'})

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})