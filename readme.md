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
