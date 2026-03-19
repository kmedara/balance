Client → /api/plaid/create-link-token
Client → Plaid Link UI
Plaid → public_token (client)
Client → /api/plaid/exchange-public-token
Server → Plaid /item/public_token/exchange
Server → Store encrypted access_token
Plaid → Webhook (transactions ready)
Server → /transactions/sync
Server → Store transactions
