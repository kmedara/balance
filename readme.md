# Run

```bash
./deploy.sh
```

Reads `.env.local.secrets` for Plaid, Cognito, and other vars. Docker Compose sets `MONGO_URL` to `mongodb://mongo:27017/balance` for the API container (do not use `localhost` there — that points at the API container itself).

To connect from your host machine (Compass, mongosh): `mongodb://localhost:27017/balance`

## Authentication (Cognito)

Local dev defaults to `AUTH_DISABLED=true` in `.env.local.secrets`, which bypasses Cognito and uses the seed user id.

### Rollout

1. Deploy Cognito with CDK (see `infrastructure/README.md`).
2. Copy stack outputs into `.env.local.secrets`:
   - `COGNITO_USER_POOL_ID`
   - `COGNITO_CLIENT_ID`
   - `COGNITO_REGION`
   - `COGNITO_AUTHORITY`
3. Set `AUTH_DISABLED=false` in `.env.local.secrets`.
4. Restart `./deploy.sh`.

The Angular app redirects unauthenticated users to `/login` (Cognito Hosted UI via OAuth PKCE). The API validates Cognito ID tokens on every route except `GET /ping` and upserts a `users` document on first login.

Infrastructure deploys via GitHub Actions — see [`infrastructure/README.md`](infrastructure/README.md).

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

