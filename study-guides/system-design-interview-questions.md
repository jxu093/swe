# System Design Interview Questions & What Interviewers Really Probe

**Source:** [@0xlelouch_](https://x.com/0xlelouch_/status/2023272048395788589)

---

## The 10 Questions That Keep Showing Up

### 1. Design a URL Shortener (at Amazon scale)

**What they push on:** hot keys, read-heavy traffic, cache strategy, storage growth, TTL, abuse prevention.

**Key points to cover:**
- **Encoding:** Base62 encoding of an auto-increment ID or hash. Trade-off: sequential IDs are predictable; hashes can collide.
- **Read-heavy:** 100:1 read-to-write ratio. Cache popular short URLs in Redis/Memcached.
- **Hot keys:** a viral link hammers one cache key. Use replication or consistent hashing with multiple replicas.
- **Storage growth:** billions of URLs over time. Use TTL to expire old entries. Estimate: 500 bytes/record x 1B records = ~500 GB.
- **Abuse prevention:** rate limiting on creation, blocking malicious redirect targets, CAPTCHA for anonymous users.
- **Data model:** `short_code (PK) -> original_url, created_at, expires_at, user_id`

---

### 2. Design a Rate Limiter for an API Gateway

**What they push on:** token bucket vs leaky bucket, per-user vs per-IP, distributed counters, Redis vs in-memory, consistency under bursts.

**Key points to cover:**
- **Token bucket:** tokens refill at a fixed rate; each request costs a token. Allows bursts up to bucket capacity. Most common in practice.
- **Leaky bucket:** requests enter a queue processed at a fixed rate. Smooths out bursts but adds latency.
- **Sliding window:** count requests in a rolling time window. More precise than fixed windows but more memory.
- **Distributed:** use Redis (`INCR` + `EXPIRE`) for shared counters across multiple gateway instances. Lua scripts for atomicity.
- **Per-user vs per-IP:** authenticated users get per-user limits; unauthenticated fall back to per-IP (beware NAT — many users behind one IP).
- **Consistency under bursts:** race conditions with distributed counters. Accept slight over-admission or use Redis Lua for atomic check-and-increment.

---

### 3. Design a Notification System (email/SMS/push)

**What they push on:** retries, DLQ, idempotency keys, delivery guarantees, provider failures, fan-out at scale.

**Key points to cover:**
- **Fan-out:** a single event (e.g., "new post") may notify millions of followers. Use a message queue to decouple and distribute work.
- **Priority queues:** separate queues for high-priority (OTP, security alerts) vs low-priority (marketing).
- **Provider failures:** abstract notification providers behind an interface. Fail over to a backup provider (e.g., Twilio -> Vonage for SMS).
- **Idempotency:** deduplicate using notification_id + recipient. Don't send the same notification twice.
- **DLQ (Dead Letter Queue):** after N retries, move failed notifications to a DLQ for manual inspection.
- **Delivery guarantees:** at-least-once with idempotency. Exactly-once is impractical at scale.
- **User preferences:** respect opt-outs, quiet hours, channel preferences (email vs push).

---

### 4. Design a File Upload / S3-like Object Store

**What they push on:** multipart upload, checksum integrity, dedupe, metadata store, access control, lifecycle policies.

**Key points to cover:**
- **Multipart upload:** split large files into chunks (e.g., 5 MB each). Upload chunks in parallel. Resume on failure without re-uploading entire file.
- **Checksum integrity:** compute MD5/SHA-256 on upload, store it, verify on download. Detect silent corruption.
- **Deduplication:** hash file content (content-addressable storage). If the hash already exists, just create a new metadata pointer.
- **Metadata store:** relational DB or DynamoDB for file metadata (name, size, owner, permissions, storage location). Separate from the blob store.
- **Access control:** pre-signed URLs with TTL for temporary access. IAM policies for service-level access.
- **Lifecycle policies:** auto-transition from hot storage (SSD) to cold storage (HDD/Glacier) based on access patterns.
- **Storage:** replicate across availability zones. Erasure coding for durability (like S3's 11 nines).

---

### 5. Design a Real-time Chat / Messaging System

**What they push on:** ordering, offline delivery, read receipts, multi-device sync, websockets, storage model.

**Key points to cover:**
- **Connection:** WebSockets for persistent bidirectional communication. Fall back to long polling for restrictive networks.
- **Message ordering:** use server-assigned timestamps or Lamport clocks. Within a conversation, messages must be strictly ordered.
- **Offline delivery:** store undelivered messages in a per-user inbox. Deliver when the user reconnects. TTL for old messages.
- **Read receipts:** track `last_read_message_id` per user per conversation. Propagate via lightweight updates (not full messages).
- **Multi-device sync:** each device maintains a cursor. On connect, fetch messages after that cursor.
- **Storage:** recent messages in a fast store (Redis, Cassandra). Archive old messages to cold storage. Shard by conversation_id.
- **Group chat fan-out:** for a message in a 500-person group, fan out to 500 inboxes. Use async processing.

---

### 6. Design a Feed System (Twitter/Instagram-like)

**What they push on:** fanout-on-write vs fanout-on-read, cache invalidation, ranking, storage, backpressure.

**Key points to cover:**
- **Fanout-on-write (push):** when a user posts, immediately write to all followers' feeds. Fast reads, but expensive writes for users with millions of followers.
- **Fanout-on-read (pull):** when a user opens their feed, fetch posts from everyone they follow and merge. Cheap writes, but slow reads.
- **Hybrid (what Twitter does):** push for regular users, pull for celebrities (high follower count). Threshold: e.g., >10K followers.
- **Ranking:** not just chronological — use ML models considering recency, engagement, relationship strength.
- **Cache invalidation:** pre-computed feeds in Redis. Invalidate/update when new posts arrive or posts are deleted.
- **Backpressure:** if a celebrity posts and fanout queue grows, apply backpressure to prevent overwhelming downstream services.

---

### 7. Design a Metrics / Monitoring System

**What they push on:** ingestion pipeline, aggregation windows, cardinality explosions, retention, query performance.

**Key points to cover:**
- **Ingestion:** agents on each host emit metrics. Use a message queue (Kafka) as a buffer before writing to the time-series DB.
- **Aggregation windows:** pre-aggregate at 1m, 5m, 1h, 1d granularity. Store raw data for a short period (7d), aggregated data longer (1y).
- **Cardinality explosion:** metrics with high-cardinality labels (e.g., user_id as a tag) blow up storage and query times. Limit label cardinality.
- **Storage:** time-series databases (InfluxDB, Prometheus, TimescaleDB). Columnar storage with compression for time-series data.
- **Retention policies:** auto-delete or downsample old data. Raw 7d -> 1m aggregates 30d -> 1h aggregates 1y.
- **Query performance:** pre-computed rollups, caching for dashboards, approximate queries (HyperLogLog for unique counts).

---

### 8. Design a Distributed Logging / Tracing Platform

**What they push on:** sampling, correlation IDs, storage cost, indexing strategy, high write throughput.

**Key points to cover:**
- **Sampling:** trace 1-5% of requests in production. Use head-based (decide at entry) or tail-based (decide after seeing the result) sampling.
- **Correlation IDs:** propagate a request_id / trace_id across all services via HTTP headers and message metadata.
- **Ingestion:** high write throughput — use Kafka as a buffer. Batch writes to the storage backend.
- **Storage:** ElasticSearch for full-text search on logs. Object storage (S3) for archival. Separate hot (recent, indexed) and cold (old, compressed) tiers.
- **Indexing strategy:** index on timestamp, service_name, trace_id, log_level. Don't index high-cardinality fields by default.
- **Cost:** logs are expensive at scale. Set retention policies, compress aggressively, drop debug-level logs in production.

---

### 9. Design an E-commerce Checkout / Order System

**What they push on:** idempotency, inventory reservation, payment failures, saga pattern, consistency vs availability.

**Key points to cover:**
- **Idempotency:** client sends an idempotency key with the checkout request. Prevents double-charging on retries.
- **Inventory reservation:** use a reservation (soft lock) with TTL. If payment fails or times out, release the reservation.
- **Saga pattern:** Order Created -> Inventory Reserved -> Payment Charged -> Order Confirmed. If payment fails, compensate by releasing inventory.
- **Payment failures:** retry with exponential backoff. After max retries, mark order as failed and release inventory.
- **Consistency vs availability:** inventory counts can be eventually consistent for display, but must be strongly consistent at checkout (to avoid overselling).
- **State machine:** CREATED -> PENDING_PAYMENT -> PAID -> FULFILLING -> SHIPPED -> DELIVERED (with CANCELLED/REFUNDED branches).

---

### 10. Design a Queue / Task Processing System (SQS-lite)

**What they push on:** visibility timeout, retries, at-least-once semantics, dedupe, ordering vs throughput.

**Key points to cover:**
- **Visibility timeout:** when a worker picks up a message, it becomes invisible to others for N seconds. If the worker doesn't ack in time, the message reappears for another worker.
- **At-least-once:** messages may be delivered more than once (worker crashes after processing but before ack). Consumers must be idempotent.
- **Deduplication:** assign a dedup_id to each message. The queue rejects duplicates within a dedup window (e.g., 5 minutes).
- **Ordering vs throughput:** FIFO queues guarantee order but limit throughput. Standard queues offer higher throughput but best-effort ordering.
- **Retries & DLQ:** after N failed processing attempts, move the message to a Dead Letter Queue for investigation.
- **Backpressure:** if consumers are slow, the queue grows. Set alarms on queue depth. Auto-scale consumers based on queue size.

---

## What Amazon Evaluates in Every Question

1. **Requirements clarity** — you ask good questions before drawing anything
2. **Tradeoffs** — CAP, cost, latency, correctness — you can articulate why you chose one approach over another
3. **Failure thinking** — timeouts, retries, partial failures, backpressure — you design for things going wrong
4. **Data model + APIs** — not just boxes and arrows; you define the actual schema and endpoints
5. **"How would you run this in prod?"** — metrics, alerts, rollbacks, migrations — you think beyond the whiteboard

If you can talk through those 5 dimensions calmly, you're already ahead of most candidates.
