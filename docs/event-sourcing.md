Incremental Sync Flow (Event Driven)

Plaid webhook received

Load Sync:<itemId> aggregate

Fetch /transactions/sync

Emit:

TransactionsSynced

TransactionAdded

TransactionUpdated

TransactionRemoved

Projection workers update read models

Everything is replayable.

🏗 Event Processing Model

You can process events using:

MongoDB Change Streams

Kafka (recommended at scale)

Background worker polling

For scale:
Event Store → Kafka → Projection Services → MongoDB Read Models

🧩 Why Event Sourcing Here?

Financial data is:

Auditable

Frequently updated

Requires idempotency

Requires replay

Sensitive to drift

Event sourcing gives:

Complete audit log

Deterministic rebuild

Easy rollback

Schema evolution via versioned events

Plaid Webhook
↓
Command Handler
↓
Append Events (Sharded)
↓
Event Bus
↓
Projection Workers
↓
Read Models (Sharded by userId)
↓
API Queries
