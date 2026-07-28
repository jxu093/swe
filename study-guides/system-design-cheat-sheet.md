# System Design Cheat Sheet

Quick-reference for interviews. Not exhaustive — optimized for the things you'll actually reach for mid-design.

---

## Numbers to Know

### Latency

| Operation | Time |
|---|---|
| L1 cache ref | 1 ns |
| L2 cache ref | 4 ns |
| RAM ref | 100 ns |
| SSD random read | 150 μs |
| HDD random read | 10 ms |
| Same-datacenter round trip | 0.5 ms |
| Cross-continent round trip | 150 ms |
| Redis GET | 0.5–1 ms |
| Memcached GET | 0.2–0.5 ms |
| DB indexed query | 1–5 ms |
| DB full table scan (1M rows) | 500–1000 ms |

### Throughput (single node)

| System | Capacity |
|---|---|
| Nginx / reverse proxy | ~50k–100k concurrent connections |
| Single Postgres | ~5k–10k QPS reads, ~1k–5k QPS writes (depends on schema) |
| Single MySQL | similar to Postgres |
| Single Redis | ~100k QPS (simple GET/SET) |
| Single Cassandra node | ~5k–15k QPS writes, ~3k–10k QPS reads |
| Kafka broker (single) | ~200k–500k messages/sec (small messages) |
| WebSocket server (single) | ~50k–100k concurrent connections |
| Single application server | ~1k–10k req/sec (depends on work per request) |

### Storage / size

| Item | Size |
|---|---|
| UUID | 16 bytes |
| Timestamp (epoch ms) | 8 bytes |
| URL | ~100 bytes avg |
| Tweet / short message | ~250 bytes |
| Chat message (with metadata) | ~500 bytes–1 KB |
| Photo (compressed) | 200 KB–1 MB |
| Thumbnail | 10–50 KB |
| 1 min video (compressed) | 5–10 MB |
| 1 hr video (720p) | ~1 GB |

### Quick math

| Quantity | Value |
|---|---|
| Seconds in a day | 86,400 (~100k for estimation) |
| Seconds in a year | ~31.5 million (~30M) |
| 1 million req/day | ~12 QPS |
| 1 billion req/day | ~12k QPS |
| 1 TB | 1,000 GB = 10^12 bytes |
| 1 PB | 1,000 TB |

---

## Scenario → Technology

### Data stores

| Need | Reach for | Why |
|---|---|---|
| General CRUD, transactions, joins | **Postgres / MySQL** | ACID, mature, flexible |
| High write throughput, time-series, append-heavy | **Cassandra / ScyllaDB** | LSM-tree, tunable consistency, linear horizontal scale |
| Document store, flexible schema | **MongoDB** | Schema-less, good for catalogs, profiles |
| Caching / ephemeral state | **Redis / Memcached** | In-memory, sub-ms reads |
| Full-text search | **Elasticsearch** | Inverted index, fuzzy matching |
| Graph relationships | **Neo4j / DGraph** | Social graphs, recommendation traversals |
| Blob / file storage | **S3 / GCS / Azure Blob** | Cheap, durable, CDN-friendly |
| Analytics / OLAP | **ClickHouse / BigQuery / Redshift** | Column-oriented, aggregation-optimized |
| Counters / rate limiting | **Redis** (INCR + TTL) | Atomic ops, expiry built-in |
| Leaderboard / ranking | **Redis** (sorted sets) | O(log N) insert + rank queries |
| Trending / hot items | **Redis** (sorted sets + ZINCRBY) | Real-time "top K" with atomic score bumps |
| Rate limiter (sliding window) | **Redis** (sorted set or INCR+TTL) | Score=timestamp, count entries in window, prune old |
| Delayed job scheduling | **Redis** (sorted set) | Score=execution timestamp, poll for score ≤ now |
| Session store | **Redis** | TTL, fast, shared across app servers |
| Coordination / config | **ZooKeeper / etcd** | Consensus-backed, strong consistency for leader election, config |

### Communication

| Scenario | Use |
|---|---|
| Client → server request/response | **HTTP REST** or **gRPC** |
| Real-time push (server → client) | **WebSocket** |
| Mobile push when app closed | **APNs / FCM** |
| Fire-and-forget async work | **Message queue** (Kafka, SQS, RabbitMQ) |
| Fan-out to many consumers | **Pub/Sub** (Kafka topics, SNS, Redis Pub/Sub) |
| Service-to-service sync calls | **gRPC** (binary, schema-enforced, streaming) |
| Webhook / callback | **HTTP POST** to registered URL |
| Long-running job status | **Polling** or **SSE** (Server-Sent Events) |

### Processing patterns

| Problem | Pattern |
|---|---|
| Slow write path → move work off the hot path | **Async queue** (write to queue, worker processes later) |
| One event needs to update many things | **Fan-out on write** (push to all) or **fan-out on read** (pull at read time) |
| Need exactly-once or at-least-once | **Idempotency key** + **dedup at consumer** |
| Global ordering | **Single partition** (kills throughput — avoid unless truly needed) |
| Per-user ordering | **Partition by user_id** |
| Rate limiting | **Token bucket** or **sliding window counter** (Redis) |
| Deduplication | **Bloom filter** (probabilistic) or **seen-set** (exact) |
| Scheduling / delayed jobs | **Delay queue** (SQS) or **DB polling** with lease + timeout |
| Leader election | **ZooKeeper / etcd** lease-based |
| Distributed locking | **Redis SETNX + TTL** (best-effort) or **ZooKeeper** (strong) |

---

## When to Scale Beyond a Single Node

| Signal | Response |
|---|---|
| DB reads > 10k QPS or latency > 50ms p99 | Add **read replicas** |
| DB writes > 5k QPS | **Shard** (partition by key) |
| DB size > 1–2 TB | **Shard** or move cold data to archive |
| Cache hit rate < 80% | Bigger cache or revisit key design |
| Single app server CPU > 70% sustained | Horizontal scale behind **load balancer** |
| WebSocket connections > 50k per box | Add nodes + **connection registry** (Redis) to route messages |
| Kafka consumer lag growing | Add **consumers** (up to partition count) |
| Cross-region latency > 200ms | **Multi-region** deployment, geo-routing |

---

## Caching

### Strategies

| Strategy | How | When |
|---|---|---|
| **Cache-aside** | App checks cache → miss → read DB → populate cache | Default. Works for most read-heavy paths. |
| **Write-through** | App writes cache + DB together | Need strong consistency between cache and DB |
| **Write-behind** | App writes cache → async flush to DB | High write throughput, can tolerate brief data loss |
| **Read-through** | Cache itself fetches from DB on miss | When cache library supports it (e.g., Guava) |

### Eviction

| Policy | Use case |
|---|---|
| **LRU** | General purpose (most common) |
| **LFU** | When popular items should stick regardless of recency |
| **TTL** | Time-sensitive data (sessions, tokens, rate limit windows) |

### Cache invalidation rules of thumb
- TTL for eventual consistency (simple, usually good enough)
- Explicit invalidation on write for strong consistency (harder — must not miss any write path)
- Never cache unbounded result sets

---

## Consistency & Replication

| Model | Guarantees | Use when |
|---|---|---|
| **Strong consistency** | Read always sees latest write | Financial transactions, inventory counts |
| **Eventual consistency** | Reads may lag, converges over time | Social feeds, analytics, notifications |
| **Read-your-writes** | A user sees their own writes immediately | User profiles, settings, post creation |
| **Causal consistency** | If A causes B, everyone sees A before B | Chat messages within a conversation |

| Replication topology | Tradeoff |
|---|---|
| **Single-leader** | Simple, strong consistency easy, single write bottleneck |
| **Multi-leader** | Multi-region writes, conflict resolution required |
| **Leaderless** (Dynamo-style) | High availability, quorum reads/writes (R+W > N) |

---

## Load Balancing

| Layer | Tool |
|---|---|
| DNS-level | Route53, Cloudflare (geo, weighted) |
| L4 (TCP) | AWS NLB, HAProxy |
| L7 (HTTP) | AWS ALB, Nginx, Envoy |

| Algorithm | When |
|---|---|
| **Round robin** | Stateless, homogeneous servers |
| **Least connections** | Varying request durations |
| **Consistent hashing** | Sticky sessions, cache sharding (minimize reshuffling) |
| **Weighted** | Heterogeneous hardware |

---

## API Design Quick Reference

| Concern | Do this |
|---|---|
| Pagination | Cursor-based (`?after=<last_id>&limit=20`), not offset-based |
| Idempotency | Client sends `Idempotency-Key` header, server deduplicates |
| Versioning | URL path (`/v1/`) or header (`Accept: application/vnd.api.v1+json`) |
| Rate limiting response | `429 Too Many Requests` + `Retry-After` header |
| Partial failure | Return `207 Multi-Status` or per-item error in response body |
| Long-running operations | Return `202 Accepted` + poll endpoint or callback URL |
| File uploads | **Pre-signed URL** (S3) — client uploads directly, bypasses your servers |

---

## Back-of-Envelope Template

Use this structure in interviews:

```
1. Clarify: read-heavy or write-heavy?
2. Users:    DAU = ___
3. QPS:      DAU × actions/user/day ÷ 86,400
             Peak = avg × 2–5
4. Storage:  items/day × item_size × retention_days
5. Bandwidth: QPS × avg_response_size
6. Memory (cache): QPS × avg_item_size × cache_duration
             Or: working_set × item_size (if caching hot items)
```

### Common benchmarks to sanity-check against

| System | Rough DAU | Rough QPS |
|---|---|---|
| Twitter/X reads | 500M | ~300k read QPS |
| Instagram photo uploads | 100M | ~1k upload QPS, ~100k feed QPS |
| WhatsApp messages | 2B | ~500k msg/sec |
| YouTube video uploads | 50M creators | ~500 uploads/sec |
| Google Search | 1B | ~70k QPS |

---

## Common Design Patterns — One-Liners

| Pattern | When to reach for it |
|---|---|
| **CQRS** | Read and write models differ significantly (e.g., feed vs. post) |
| **Event sourcing** | Need full audit trail, can replay state (payments, banking) |
| **Saga** | Distributed transaction across services, each step compensatable |
| **Circuit breaker** | Downstream service flaky — fail fast instead of cascading |
| **Bulkhead** | Isolate failure domains (separate thread pools per dependency) |
| **Sidecar** | Cross-cutting concerns (logging, auth, TLS) without modifying service |
| **CDC (Change Data Capture)** | React to DB changes without dual-write (Debezium → Kafka) |
| **Pre-signed URLs** | Client uploads directly to blob store, bypassing your servers |
| **Fan-out on write** | Pre-compute results at write time (feeds for users with few followers) |
| **Fan-out on read** | Compute at read time (feeds for celebrity users with millions of followers) |
| **Consistent hashing** | Distribute load across cache/storage nodes with minimal reshuffling |
| **Bloom filter** | Cheap membership test (URL dedup, spam filter) — false positives OK |

---

## Fault Tolerance Checklist

Ask yourself these for every component in your design:

- **What happens when this node dies?** (failover, replication, re-election)
- **What happens when the network partitions?** (which side serves traffic, stale reads?)
- **What happens when this queue backs up?** (backpressure, dead letter queue, alerting)
- **What happens on deploy/restart?** (graceful drain, in-flight request handling)
- **What if the client retries?** (idempotency, dedup, at-least-once → exactly-once)
- **What data can I lose?** (async replication lag, cache eviction, queue crash before flush)
