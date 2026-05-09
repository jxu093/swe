# Designing a Payment System at Scale (Amazon Prime Day)

**Source:** [@ConsciousRide](https://x.com/ConsciousRide/status/2025125707681316881)

---

## The Problem

Amazon Prime Day generates massive checkout traffic — millions of concurrent payment attempts, each of which must be processed exactly once, with low latency and high reliability. How do you design a payment system that handles this?

---

## Key Design Decisions

### 1. Client-Sent Idempotency Keys

The client (web frontend or mobile app) generates a unique idempotency key for each checkout attempt and sends it with the request.

- The server stores this key in a fast datastore like **Redis with a TTL of 24+ hours**
- If the same key arrives again (retry, duplicate request), the server returns the cached result instead of processing again
- This same idempotency key is passed downstream when calling **Stripe or another payment provider**, ensuring end-to-end deduplication

**Why client-generated?** The client knows the user's intent. If the user clicks "Pay" twice, the same key is sent both times. If the user starts a genuinely new checkout, a new key is generated.

---

### 2. Payment State Machine

Payments move through well-defined states, and **state only moves forward**:

```
CREATED -> AUTHORIZED -> CAPTURED -> SETTLED
                \-> FAILED
                \-> CANCELLED
```

- **CREATED:** order submitted, payment initiated
- **AUTHORIZED:** payment provider has confirmed funds are available (hold placed)
- **CAPTURED:** funds have been deducted from the customer's account
- **SETTLED:** funds transferred to the merchant's account (usually batched daily)
- **FAILED:** payment could not be completed (insufficient funds, fraud check, provider error)
- **CANCELLED:** user or system cancelled before capture

**Why forward-only matters:** combined with the idempotency key, forward-only state transitions mean duplicate messages are inherently safe — a message trying to move state backwards is simply ignored.

---

### 3. Transactional Outbox Pattern

Instead of directly publishing events to a message queue (which could fail independently of the DB write), use the **transactional outbox**:

1. Write the order record AND the outbox event in the **same database transaction**
2. A separate process (CDC or poller) reads from the outbox table and publishes to the message queue
3. The outbox stores the idempotency key against the order ID

**Why this matters:** it guarantees that if the order is created, the event will eventually be published. No "order created but event lost" scenarios. This is critical for payment systems where missing an event could mean charging a customer without fulfilling their order.

---

### 4. Async Processing with Immediate Ack

To keep latency low (~300ms target), the synchronous path is minimal:

1. Client sends checkout request with idempotency key
2. Server validates, creates the order in the DB, writes to outbox
3. Server **immediately returns a `txn-id`** (or `order-id`) to the client
4. Client uses this ID to **poll for payment state**

Everything after step 3 is handled asynchronously:

- Queue consumers pick up the payment job
- Consumer calls the payment provider (Stripe, etc.)
- Consumer updates the payment state in the DB
- Client polls and sees the state transition

**Why async?** Payment provider calls can take 1-5+ seconds. Making the client wait synchronously would mean 5+ second checkout times and timeout risks. By returning immediately and letting the client poll, only the order creation path (~300ms) is synchronous.

---

### 5. Ongoing Transaction Tracking

A pattern used at companies like **Grab**: keep the ongoing `order-id` / `txn-id` in a fast store (Redis or DynamoDB) until the payment reaches a **terminal state** (SETTLED, FAILED, or CANCELLED).

- Workers check this store to see what's in-flight
- If a worker crashes mid-processing, another worker can pick up the transaction
- Once a terminal state is reached, the entry is removed (or archived)

This acts as a lightweight state machine that complements the durable DB record.

---

### 6. Reconciliation Flow

A **cron job** runs periodically (e.g., every hour or daily) to:

- Cross-check all completed orders against the payment provider's records
- Identify discrepancies: charged but not fulfilled, fulfilled but not charged, stuck in intermediate states
- Flag anomalies for manual review
- Auto-resolve simple cases (e.g., retry a stuck AUTHORIZED -> CAPTURED transition)

**Why this matters:** in distributed systems, things will go wrong — network partitions, provider outages, race conditions. Reconciliation is the safety net that catches what real-time processing misses.

---

## Architecture Summary

```
Client
  |
  | (idempotency key + checkout request)
  v
API Server  ──(sync)──>  DB (order + outbox)  ──>  return txn-id to client
                              |
                              | (CDC / poller)
                              v
                         Message Queue
                              |
                              v
                      Payment Workers
                         |        |
                  Payment Provider  DB (state update)
                                      |
                                      v
                              Redis/DynamoDB (in-flight tracking)

Client polls: GET /payment/{txn-id}/status

Reconciliation Cron: cross-checks DB vs payment provider
```

---

## Key Takeaways for Interviews

- **Idempotency is non-negotiable** in payment systems — always use client-generated idempotency keys
- **Forward-only state machines** make duplicate handling trivial
- **Transactional outbox** ensures atomicity between DB writes and event publishing
- **Async processing** keeps latency low — only the order creation is synchronous
- **Reconciliation** is your safety net — assume things will go wrong and design for detection and correction
