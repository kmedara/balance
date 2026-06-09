# Run

```bash
./deploy.sh
```

Reads `.env.local.secrets` for Plaid and other vars. Docker Compose sets `MONGO_URL` to `mongodb://mongo:27017/balance` for the API container (do not use `localhost` there — that points at the API container itself).

To connect from your host machine (Compass, mongosh): `mongodb://localhost:27017/balance`

## Seed MongoDB

From the host (Mongo exposed on port 27017):

```bash
cd api
npm install
npm run db:seed
```

Wipe collections and re-seed:

```bash
npm run db:seed:reset
```

From the Docker network (API container image):

```bash
docker compose run --rm -e MONGO_URL=mongodb://mongo:27017/balance node npm run db:seed
```

Seeds `categories` and `budgets` in the `balance` database (see `api/__data__/seed.data.ts`).

# Types

