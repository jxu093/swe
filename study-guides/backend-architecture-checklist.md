# The Senior Backend Architecture Checklist

**Source:** [@SumitM_X](https://x.com/SumitM_X/status/2032265988771889376)

---

## 1. Event-Driven Architecture (EDA)

Systems communicate through decoupled events rather than direct synchronous calls. Producers emit events without knowing who consumes them; consumers react independently.

**Key concepts:**
- **Event broker** (Kafka, RabbitMQ, AWS SNS/SQS) sits between producers and consumers
- **Event schema** defines the contract — use a schema registry (Avro, Protobuf) to avoid breaking changes
- **Ordering guarantees** vary by broker — Kafka guarantees order within a partition, SQS does not
- **At-least-once delivery** is the norm; design consumers to be idempotent

**When to use:** high fan-out (one action triggers many downstream effects), decoupling teams/services, eventual consistency is acceptable.

**When to avoid:** you need strong consistency or the added complexity isn't justified (e.g., a monolith with a single DB).

---

## 2. Saga Pattern

Manages distributed transactions that span multiple services. Instead of a single ACID transaction, a saga is a sequence of local transactions where each step publishes an event or message that triggers the next.

**Choreography (decentralized):**
- Each service listens for events and decides what to do next
- No single coordinator — services talk to each other
- Simpler to set up, but harder to reason about as the number of steps grows
- Debugging failures requires tracing events across services

**Orchestration (centralized):**
- A dedicated orchestrator service tells each participant what to do and when
- Easier to understand the full flow — the orchestrator holds the state machine
- Single point of failure if not designed for HA
- Better for complex, multi-step workflows (e.g., order fulfillment)

**Compensating transactions:** if step 3 fails, you run compensating actions for steps 2 and 1 (e.g., refund payment, release inventory).

---

## 3. CQRS (Command Query Responsibility Segregation)

Separate the data models (and often the databases) for reading and writing.

- **Command side (write):** optimized for validation, business rules, and consistency. Typically uses a normalized relational model.
- **Query side (read):** optimized for fast reads, denormalized views, materialized projections. Can use ElasticSearch, Redis, or read replicas.
- **Sync between sides:** usually via events (pairs naturally with Event Sourcing).

**Why it matters:** read and write workloads often have very different scaling and optimization needs. A feed system might have 100:1 read-to-write ratio — CQRS lets you scale reads independently.

**Trade-off:** eventual consistency between write and read models. The read side may lag behind the write side.

---

## 4. Event Sourcing

Instead of storing the current state of an entity, store the sequence of events that led to that state. The current state is derived by replaying events.

**Example:** a bank account doesn't store "balance = $500." It stores: Deposited $1000, Withdrew $300, Deposited $100, Withdrew $300. Current balance is computed by replay.

**Benefits:** full audit trail, ability to reconstruct state at any point in time, natural fit with EDA and CQRS.

**When it's overkill:** simple CRUD apps, low-volume systems, when audit trails aren't a requirement. The replay/projection complexity adds significant engineering cost.

**Snapshot optimization:** periodically store a snapshot of the current state so you don't have to replay all events from the beginning.

---

## 5. Circuit Breaker Pattern

Prevents cascading failures by stopping requests to a failing downstream service. Named after electrical circuit breakers.

**Three states:**
- **Closed (normal):** requests flow through. Failures are counted.
- **Open (tripped):** requests are immediately rejected (fail fast) without hitting the downstream service. A timeout timer starts.
- **Half-Open (testing):** after the timeout, a limited number of requests are allowed through. If they succeed, the circuit closes. If they fail, it opens again.

**Related patterns:**
- **Retries:** retry transient failures with exponential backoff + jitter
- **Timeouts:** always set timeouts on downstream calls — never wait indefinitely
- **Bulkheads:** isolate resources (thread pools, connection pools) per dependency so one failing service can't exhaust resources needed by others

**Libraries:** Resilience4j (Java), Polly (.NET), Hystrix (legacy).

---

## 6. Distributed Tracing

Track a single request as it flows across multiple microservices.

**Core concepts:**
- **Trace:** the entire journey of a request, identified by a unique trace ID
- **Span:** a single operation within a trace (e.g., one service call). Spans have parent-child relationships forming a tree.
- **Context propagation:** trace ID and span ID are passed in HTTP headers (e.g., `traceparent` in W3C Trace Context)
- **Sampling:** in high-traffic systems, trace only a percentage of requests (1%, 10%) to reduce overhead and storage costs

**Tools:** OpenTelemetry (standard), Jaeger, Zipkin, AWS X-Ray, Datadog APM.

**Key for interviews:** explain how you'd propagate trace context across async boundaries (message queues) — not just HTTP calls.

---

## 7. CAP Theorem

In a distributed system experiencing a network partition, you must choose between Consistency and Availability.

- **Consistency (C):** every read receives the most recent write or an error
- **Availability (A):** every request receives a response (even if stale)
- **Partition Tolerance (P):** the system continues despite network partitions between nodes

**In practice:** partitions will happen, so the real choice is CP vs AP:
- **CP systems** (e.g., HBase, MongoDB with majority reads): reject requests rather than return stale data
- **AP systems** (e.g., Cassandra, DynamoDB): return data even if it might be stale, resolve conflicts later

**Interview tip:** don't just recite the theorem. Explain which trade-off you'd pick for a specific use case and why. E.g., a banking ledger needs CP; a social media feed is fine with AP.

---

## 8. Idempotency

An operation is idempotent if performing it multiple times produces the same result as performing it once.

**Why it matters:** in distributed systems, retries are inevitable (network timeouts, duplicate messages). Without idempotency, a retry could charge a customer twice or create duplicate records.

**Implementation patterns:**
- **Idempotency keys:** the client sends a unique key (e.g., UUID) with each request. The server checks if it's already processed that key before executing.
- **Deduplication:** store processed keys in a fast lookup (Redis with TTL, or a DB unique constraint)
- **Natural idempotency:** some operations are inherently idempotent — `SET balance = 500` is idempotent; `INCREMENT balance BY 100` is not

**Database-level:** use upserts (`INSERT ... ON CONFLICT DO NOTHING/UPDATE`) to make writes idempotent.

---

## 9. Data Sharding

Horizontal partitioning of data across multiple database instances.

**Sharding strategies:**
- **Range-based:** shard by ID ranges (1-1M on shard 1, 1M-2M on shard 2). Simple but prone to hot partitions.
- **Hash-based:** hash the shard key and distribute by modulo. Even distribution but range queries become expensive.
- **Directory-based:** a lookup table maps keys to shards. Flexible but the directory is a single point of failure.
- **Consistent hashing:** minimizes data movement when adding/removing shards. Used by Cassandra, DynamoDB.

**Hot partitions:** when one shard gets disproportionate traffic (e.g., a celebrity's data). Mitigate with: salting keys, splitting hot shards, caching hot data.

**Cross-shard queries:** expensive and complex. Design your shard key so that common queries hit a single shard.

---

## 10. API Gateway

A single entry point for all client requests that centralizes cross-cutting concerns.

**Responsibilities:**
- **Authentication & Authorization:** validate tokens (JWT, OAuth2) before forwarding requests
- **Rate limiting:** protect backend services from abuse (token bucket, sliding window)
- **Request routing:** route to the correct microservice based on path, headers, or content
- **Load balancing:** distribute traffic across service instances
- **Observability:** log requests, emit metrics, propagate trace context
- **Request/response transformation:** aggregate multiple backend calls into one client response (BFF pattern)

**Tools:** Kong, AWS API Gateway, Envoy, NGINX, Traefik.

**Interview tip:** distinguish between an API Gateway (external traffic) and a service mesh (internal service-to-service communication).
