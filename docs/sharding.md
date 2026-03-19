events = hottest write collection
{ "metadata.userId": "hashed" }
why hashed?
even distribution
prevents hot shards
high write parallelism

Hotspot Avoidance Strategy

Plaid sync bursts can cause:

High write volume

Single-item contention

Mitigation:

Process each Item in isolation

Partition work queue by itemId hash

Limit concurrency per item
