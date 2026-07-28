# System Design — Technology Cheat Sheet by Problem

For each common design problem: the tech stack you'd reach for, why that choice over alternatives, and the one-liner justification for the interview.

---

## 1. URL Shortener

| Component | Technology | Why |
|---|---|---|
| Primary store | **Postgres** | Small rows (short_code → URL), indexed lookups, ACID for write dedup |
| Cache | **Redis** (string, key=short_code) | 100:1 read-to-write — cache absorbs almost all reads |
| ID generation | **Snowflake / auto-increment + Base62** | Sequential IDs are simple; Snowflake if multi-region |
| Analytics (click counts) | **Kafka → ClickHouse** | Async event stream, don't block the redirect |

**Why not Cassandra?** Data is small, read-heavy, needs strong consistency on write (no duplicate codes). Postgres + Redis handles this easily without the operational overhead.

---

## 2. Rate Limiter

| Component | Technology | Why |
|---|---|---|
| Counter store | **Redis** (INCR + EXPIRE, or sorted set) | Atomic, in-memory, sub-ms, shared across gateway instances |
| Algorithm | **Token bucket** (most common) | Allows bursts up to capacity, simple mental model |
| Rule config | **Postgres or etcd** | Rules change rarely, need durability, pushed to gateways on change |
| Placement | **API Gateway layer** (Nginx, Envoy, or custom) | Before requests hit your services |

**Why not in-memory per-instance?** Distributed — user hits different gateway instances. Need shared state. Redis is the standard answer.

**Why sorted set for sliding window?** Score=timestamp, ZREMRANGEBYSCORE to prune, ZCARD to count. More precise than fixed-window INCR but uses more memory.

---

## 3. Real-Time Chat (WhatsApp / Slack)

| Component | Technology | Why |
|---|---|---|
| Message ingress | **HTTP POST** | Reliable, retriable, explicit ack (200 = persisted) |
| Message egress | **WebSocket** | Server pushes to connected clients in real-time |
| Message store | **Cassandra** (partition by conversation_id) | High write throughput, range scan by timestamp within partition |
| Connection registry | **Redis** (hash: user_id → server_id) | "Which WebSocket server is user X connected to?" |
| Offline delivery pointer | **Redis** (per-user last_delivered_seq) | Fast offset lookup on reconnect |
| Push notifications (offline) | **APNs / FCM** | Wake the mobile app when WebSocket is disconnected |
| Media | **S3 + pre-signed URLs** | Client uploads directly, server never touches the blob |
| Message queue | **Kafka** | Decouple write path from fan-out, replay on failure |

**Why Cassandra over Postgres for messages?** Chat is write-heavy and append-only. Cassandra's LSM-tree is optimized for this. Partition by conversation_id gives you all messages in a conversation in one partition, ordered by timestamp.

**Why HTTP for send, WebSocket for receive?** See earlier discussion — separates durability (HTTP ack) from real-time push. Simpler than building app-level acks over WebSocket.

---

## 4. Social Feed (Twitter / Instagram)

| Component | Technology | Why |
|---|---|---|
| Post store | **Postgres or Cassandra** | Source of truth for posts |
| Feed cache | **Redis** (list per user, stores post_ids) | Pre-computed feed, fast reads |
| Fan-out | **Kafka → workers** | Async push to follower feeds on new post |
| Ranking | **ML ranking service** | Reorder feed by relevance, not just chronological |
| Media | **S3 + CDN** (CloudFront) | Serve images/video close to users |
| Social graph | **Postgres** or **Redis** (set per user) | Follower/following relationships, set intersection for "mutuals" |
| Search | **Elasticsearch** | Full-text search on posts, hashtags, usernames |

**The hybrid fan-out rule:**
- Followers < 10K → **fan-out on write** (push post_id to all follower feeds in Redis)
- Followers > 10K → **fan-out on read** (merge at read time, don't write to millions of feeds)

**Why Redis list for feeds?** LPUSH to prepend, LTRIM to cap at N items, LRANGE to fetch a page. Simple, fast, fits the access pattern exactly.

---

## 5. Notification System

| Component | Technology | Why |
|---|---|---|
| Event ingestion | **Kafka** | Decouple producers from notification logic, handle bursts |
| Priority routing | **Separate Kafka topics or SQS queues** | High-priority (OTP) vs low-priority (marketing) |
| Notification service | **Stateless workers** consuming from queue | Horizontally scalable |
| Email provider | **SES / SendGrid** | Managed, handles deliverability |
| SMS provider | **Twilio** (primary) + **Vonage** (fallback) | Provider failover for reliability |
| Push | **APNs / FCM** | Platform-native mobile push |
| Dedup | **Redis** (SET with TTL on notification_id) | Prevent duplicate sends |
| DLQ | **SQS DLQ or Kafka DLT** | Failed notifications after N retries land here for inspection |
| User preferences | **Postgres** | Opt-outs, quiet hours, channel preferences |
| Template store | **Postgres or S3** | Versioned notification templates |

**Why Kafka over SQS here?** Multiple consumers (email worker, SMS worker, push worker) each read the same event independently via consumer groups. With SQS you'd need SNS fan-out first.

---

## 6. Distributed Job Scheduler

| Component | Technology | Why |
|---|---|---|
| Job metadata | **Postgres** | Job definitions, schedules, status, history. ACID for state transitions. |
| Job queue | **Redis** (sorted set, score=next_run_time) | Poll for jobs where score ≤ now. O(log N) insert + fetch. |
| Worker coordination | **Kafka or SQS** | Distribute jobs to workers, at-least-once delivery |
| Leader election | **ZooKeeper or etcd** | One scheduler instance polls the sorted set and enqueues — avoid double-scheduling |
| Locking (per-job) | **Redis SETNX + TTL** | Prevent two workers from running the same job |
| Cron parsing | **Application code** | Compute next_run_time from cron expression, ZADD back to sorted set |

**Why Redis sorted set for scheduling?** Natural fit: score = timestamp, ZRANGEBYSCORE to get all jobs due now, ZADD to reschedule. Beats DB polling on latency.

**Why leader election?** Without it, multiple scheduler instances all poll the sorted set and double-enqueue. One leader does the polling; workers are stateless and scale horizontally.

---

## 7. YouTube / Video Streaming

| Component | Technology | Why |
|---|---|---|
| Video upload | **S3 + pre-signed URLs** | Client uploads directly, no proxy through your servers |
| Transcoding | **Kafka → FFmpeg workers** (or AWS MediaConvert) | Async, CPU-heavy — generate 240p/480p/720p/1080p variants |
| Video storage | **S3** (source + transcoded) | Cheap, durable, CDN-origin friendly |
| Video serving | **CDN** (CloudFront, Akamai) | Edge delivery, adaptive bitrate (HLS/DASH segments) |
| Metadata | **Postgres** | Title, description, uploader, view count |
| View counting | **Kafka → aggregation → Postgres/Redis** | Don't increment DB on every view — batch and dedup |
| Search | **Elasticsearch** | Full-text on titles, descriptions, tags |
| Recommendations | **ML service** | Collaborative filtering, watch history |
| Thumbnails | **S3 + CDN** | Generated during transcode pipeline |
| Comments | **Cassandra** (partition by video_id) | High volume, append-heavy, range scan by timestamp |

**Why pre-signed upload?** Video files are huge. If they proxy through your servers, you need massive bandwidth and your upload service becomes a bottleneck. Pre-signed URL = client → S3 directly.

**Why adaptive bitrate?** Video is split into small segments (2–10 sec). Client requests the appropriate quality based on current bandwidth. This is HLS (Apple) or DASH (standard).

---

## 8. E-Commerce / Checkout

| Component | Technology | Why |
|---|---|---|
| Product catalog | **Postgres** (or MongoDB for flexible attributes) | Structured data, joins for categories/variants |
| Inventory | **Postgres** (with row-level locking) | Strong consistency — can't oversell |
| Cart | **Redis** (hash per user) | Ephemeral, fast, TTL for abandoned carts |
| Order service | **Postgres** | ACID transactions, state machine (CREATED → PAID → SHIPPED) |
| Payment | **Stripe / payment gateway** | PCI compliance offloaded |
| Coordination | **Saga pattern** (choreography via Kafka or orchestration via a saga service) | Distributed transaction: reserve inventory → charge payment → confirm order |
| Idempotency | **Redis or Postgres** (idempotency_key → response) | Client retries don't double-charge |
| Search | **Elasticsearch** | Product search with facets, filters, fuzzy matching |
| CDN | **CloudFront** | Product images, static assets |

**Why saga over 2PC?** 2PC blocks all participants until the coordinator decides — kills availability. Saga is async: each step publishes an event, and if a step fails, compensating actions undo previous steps. Fits microservices.

**Why strong consistency for inventory?** Eventual consistency = overselling. Use `SELECT ... FOR UPDATE` or optimistic locking (version column) on the inventory row at checkout time.

---

## 9. Search Autocomplete / Typeahead

| Component | Technology | Why |
|---|---|---|
| Suggestion index | **Trie in memory** or **Elasticsearch prefix queries** | Trie: O(prefix length) lookup. ES: simpler ops, good enough for most scales. |
| Popular queries | **Redis** (sorted set, score=frequency) | Top-K suggestions per prefix, ZINCRBY on each search |
| Query logging | **Kafka → aggregation pipeline** | Don't write to Redis on every keystroke — batch and aggregate |
| Serving | **CDN / edge cache** | Cache top suggestions for common prefixes — most users type the same things |
| Personalization | **User search history in Redis or Postgres** | Blend personal history with global popularity |

**Why cache at CDN?** The top 1000 prefixes cover the vast majority of queries. "how t", "what i", "best r" — these are identical across users. Cache the response at the edge.

**Why not query the DB on every keystroke?** A fast typist sends 5–10 requests/second. Multiply by millions of users. The serving layer must be in-memory or cached, not hitting a database.

---

## 10. Metrics / Monitoring

| Component | Technology | Why |
|---|---|---|
| Agent | **StatsD / OpenTelemetry collector** | Runs on each host, emits metrics |
| Ingestion buffer | **Kafka** | Handle bursty metric streams, decouple from storage |
| Time-series store | **InfluxDB / Prometheus / TimescaleDB** | Optimized for time-range queries, downsampling, retention policies |
| Dashboards | **Grafana** | Query + visualize from multiple data sources |
| Alerting | **Prometheus Alertmanager / PagerDuty** | Threshold-based alerts, routing, dedup, escalation |
| Long-term analytics | **ClickHouse** or **S3 + Athena** | Cheap storage for historical aggregates |
| Cardinality control | **Pre-aggregation at ingestion** | Don't let high-cardinality labels (user_id) blow up your TSDB |

**Retention rule of thumb:** Raw data 7 days → 1-min aggregates 30 days → 1-hour aggregates 1 year → drop.

---

## 11. Distributed Logging / Tracing

| Component | Technology | Why |
|---|---|---|
| Log shipping | **Fluentd / Filebeat** | Tail log files, forward to central pipeline |
| Buffer | **Kafka** | High write throughput, decouples producers from indexing |
| Indexing + search | **Elasticsearch** | Full-text search on log messages, filter by service/level/timestamp |
| Trace propagation | **OpenTelemetry** | Inject trace_id into headers, auto-instrument frameworks |
| Trace storage | **Jaeger / Tempo** | Visualize request flow across services |
| Cold archive | **S3** (compressed) | Compliance, cost — move logs older than 7-14 days |
| Sampling | **Head-based (1-5%)** at entry point | Trace every request = too expensive at scale |

**Why Elasticsearch for logs but not for traces?** Logs are full-text (you grep for error messages). Traces are structured spans with parent-child relationships — Jaeger/Tempo are purpose-built for this.

---

## 12. Payment System

| Component | Technology | Why |
|---|---|---|
| Payment state | **Postgres** | ACID. Payment lifecycle is a state machine — must not lose transitions. |
| Idempotency store | **Postgres** (idempotency_key column, unique constraint) | Dedup retries at the DB level, survives app restarts |
| Event log | **Kafka** (or transactional outbox → CDC → Kafka) | Downstream consumers (ledger, notifications, analytics) react to payment events |
| HSM | **AWS CloudHSM / dedicated hardware** | Card encryption keys never leave the HSM |
| Reconciliation | **Batch job** comparing internal ledger to payment provider settlement files | Catch discrepancies daily |
| Timeout handling | **Delayed queue** or **DB polling with lease** | Payment stuck in PENDING → auto-cancel after timeout |

**Why transactional outbox over dual-write?** Dual-write (write DB + publish Kafka) can fail between the two. Outbox: write payment row + outbox event in one DB transaction. CDC (Debezium) tails the outbox table and publishes to Kafka. Exactly-once semantics without 2PC.

**Partition key for payments table:** `merchant_id` or `user_id`, NOT `payment_id`. You query "all payments for this merchant" far more than "this one payment."

---

## Cross-Cutting: When to Use What

### Queue selection

| Need | Use | Why not the other |
|---|---|---|
| Multiple independent consumers per event | **Kafka** | SQS is single-consumer per message |
| Simple task queue, one consumer per message | **SQS** | Kafka is overkill, more ops overhead |
| Complex routing (topic/fanout/direct) | **RabbitMQ** | Kafka routing is partition-based only |
| AWS-native, minimal ops | **SQS + SNS** | Managed, no clusters to run |

### Database selection by access pattern

| Access pattern | Use |
|---|---|
| Transactions, joins, complex queries | **Postgres** |
| High write throughput, known partition key | **Cassandra** |
| Flexible/nested documents | **MongoDB** |
| Sub-ms lookups, ephemeral data | **Redis** |
| Full-text search, faceted filtering | **Elasticsearch** |
| Time-series, aggregation-heavy | **InfluxDB / TimescaleDB** |
| Analytics, column scans over billions of rows | **ClickHouse / BigQuery** |
| Relationships / traversals | **Neo4j** |

### "Do I need a cache?"

| Signal | Answer |
|---|---|
| Read-to-write ratio > 10:1 | Yes — Redis or Memcached |
| Same data requested by many users | Yes — and consider CDN too |
| Data changes every request | No — cache hit rate will be near zero |
| Strong consistency required on every read | Probably no — or use write-through with short TTL |
| Latency target < 5ms | Yes — DB can't reliably hit this |
