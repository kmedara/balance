# Setup

# Run

- with docker compose
  - edit the secrets file location in deploy.sh
  - run deploy.sh to export the required_vars into current shell
  - docker compose up
- no docker
  - export all required env vars to current shell using deploy.sh or other methods
  - cd to project
  - npm ci
  - whatever command is used to run project in package.json scripts

- Testing shared library locally
  - docker
    - symlinks don't work in docker, must build and pack tarball and add to project directories. then copy and npm install in docker files (see dockerfiles)
  - no docker
    - symlinks work fine, npm link library in project dirs

# Test

# Deploy

# Notes

Aggregate-centric modeling (User → Item → Account → Transactions)

Write-optimized for append-heavy transactions

Idempotent ingestion (unique plaidTransactionId)

Incremental sync support

Scales horizontally via userId sharding if needed

Angular App
↓
POST /api/plaid/link-token
↓
Plaid Link UI
↓
public_token → POST /api/plaid/exchange
↓
Server exchanges for access_token
↓
Encrypted token stored
↓
Plaid webhook → /api/plaid/webhook
↓
Background job → /transactions/sync
