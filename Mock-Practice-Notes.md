# Mock & Practice Session Notes

**Purpose:** Track learnings, gaps, and action items from every SD mock and practice session. Review this file before each new mock to avoid repeating mistakes.

**How to use:** After each mock or timed practice, add an entry below with the date, topic, format, and categorized takeaways. Tag each takeaway with a theme so patterns across mocks become visible over time.

---

## 📌 READ BEFORE EVERY MOCK — Main Areas to Work On

*Synthesized from 5 mocks (4 system design + 1 coding). Target role: Google Senior SWE, Platforms Infrastructure.*

**The meta-pattern:** Gaps aren't *knowledge* — they're **process and communication under pressure.** You know the material; you stumble on how you approach problems and externalize your thinking. Process is faster to fix than content.

**If you only drill three things:**
1. **Estimation-first (SD)** — the instant requirements are done, convert numbers → QPS + storage + bandwidth, then *compare each to a single node's capacity* — the gap forces the architecture. (Appeared in ALL 4 SD mocks.)
2. **Don't disappear (coding)** — announce silence, think on an example, surface clean checkpoints. Don't broadcast the tangle, don't go silently dark.
3. **Reason out loud, whether you hold or change your mind: "I picked X over Y because Z"** — applies to SD components and coding approaches alike.

### System Design (4 mocks — consistent)

- **① Estimation DRIVES design** — you compute but don't *use* the numbers. The method: **number → compare to one node's capacity → the gap forces a specific move** (shard / replicate / cache / fan-out / object store).
  - *Worked example (crawler):* 20B pages / 7d = **33k pages/sec**. One machine, bandwidth-bound at ~1 MB/page: 1 Gbps ≈ 125/s, 10 Gbps ≈ 1,250/s → **tens-to-hundreds of machines = a coordinated fleet.** Storage: 20B × 1 MB = **20 PB** → object store (S3), not a DB. Queue: 33k dequeued × ~10 links = **330k URLs/sec enqueued** → must partition (one Redis ≈ 100k ops/s).
  - **State soft numbers as assumptions and invite correction** ("~a few hundred pages/sec per machine — match your env?"). Anchor to the resource that physically binds (bandwidth). Show the conclusion is *robust* to the assumption — that's the senior move, not asserting a precise number.
- **② Concrete mechanisms** — name the actual data structure / algorithm / keys; no hand-waving when pushed deeper.
- **③ Components must EARN their place** *(refined — not "always label")* — generic labels are fine on the first pass ("a queue here, a cache here"; move fast). Name the specific tech *only when it's load-bearing* (tied to a tradeoff) or when asked. The real test isn't naming — it's: can you justify why each box exists and what breaks without it? (The crawler ding was "why does the URL DB exist?", not "you didn't say Kafka.")
- **④ Reason under pressure — not argue, not fold** *(refined)* — what's tested is tradeoff *reasoning*, not winning. Three cases when poked: **valid + you agree** → concede *with reasoning* ("good point, that breaks under X, so I'd switch to Z because…") = senior, not losing; **unsure** → say so, reason through it; **not actually valid** → hold *as reasoning* ("I considered that; I still prefer this because [tradeoff]"). **Calibrate confidence out loud:** committed decision → defend/update with reasoning; exploratory idea → label it ("let me throw out an option we can poke at") — ruling it out together is collaboration, not folding. Bad = presenting a tentative idea as firm, then caving silently.
- *(Sub: NFR & API precision — exact latency targets, response shapes, status codes.)*

### Coding (1 mock — clear signals)

- **⑤ Clarify before coding** — 60–90 sec on inputs/outputs/validity/edge cases first.
- **⑥ Approach before code** — brute force out loud, then optimize. No solving-while-typing.
- **⑦ Narration / cognitive load** *(refined — what to say when thoughts are tangled)* — you don't verbalize the raw tangle. Three tools: **(a) elevate to structure** — "options → criterion → which I'll try and why," not the stream; **(b) announced, bounded silence** — "let me think 30–60s, then I'll walk you through it" (frees 100% of your brain to solve; ≠ silent struggling); **(c) think on the example** — tracing a concrete case is visible thinking with no clean voiceover required. Cadence = *think (quiet/example) → clean checkpoint → think → checkpoint*. Checkpoints are low-load because you're summarizing a conclusion already reached.
- **⑧ Pattern fluency** — implementation reps on patterns you already know (the expression-tree stumble), not new theory.
- **⑨ Design without invalid states** — constructor validation or type hierarchy.

### Role-specific (Google Platforms Infra)
- **Lean on your distributed-systems background** (Azure SDN control plane) in design + depth + behavioral rounds — it's a real edge.
- **Concurrency concepts** matter more here: locks vs atomics, race conditions, memory model, thread pools, producer/consumer.
- **Coding bar is unchanged** — same algorithmic rounds regardless of team; don't under-invest in DSA fluency.

---

## Themes Index

Quick reference for recurring gap areas. Updated as new mocks surface patterns.

| Theme | Description | Mocks where it appeared |
|---|---|---|
| **NFR precision** | Be concrete on latency targets, availability numbers; separate NFRs from functional reqs cleanly | WhatsApp (Apr 30), Rate Limiter (May 2), Payment System (May 5) ⚠️⚠️ |
| **API completeness** | Define response shapes, status codes, headers; know the exact standard names and units | WhatsApp (Apr 30), Rate Limiter (May 2), Payment System (May 5) ⚠️⚠️ |
| **Speak early phases aloud** | No answer recorded for Requirements, Core Entities, and System Interface — even if you know it, say it | Rate Limiter (May 2) |
| **Offline/reconnect** | Per-user offsets, durable storage before notification, catchup on reconnect | WhatsApp (Apr 30) |
| **Media handling** | Pre-signed URLs, blob storage, keep DB lean with references only | WhatsApp (Apr 30) |
| **Fan-out & PubSub** | Show delivery path to recipients, not just inbound; PubSub for cross-server routing at scale | WhatsApp (Apr 30) |
| **Multi-device** | Per-device sessions and delivery tracking, not just per-user | WhatsApp (Apr 30) |
| **Algorithm precision** | Know the exact mechanism of the algorithm you name; don't conflate it with adjacent concepts | Rate Limiter (May 2) |
| **Atomic hot-path ops** | On latency-critical paths, combine read+write into one atomic operation (INCR, Lua script) to avoid round trips and races | Rate Limiter (May 2) |
| **Payment lifecycle** | Separate PaymentIntent from PaymentAttempt; model multi-stage statuses (created→authorized→pending→settled→failed) | Payment System (May 5) |
| **Security & auditability** | HSM for private keys, CDC for tamper-proof audit trails, encryption beyond just SSL | Payment System (May 5) |
| **Partition key design** | Choose keys that guarantee event ordering per entity; don't mix unrelated IDs into composite keys | Payment System (May 5) |
| **Clarify before coding** | Ask about inputs, outputs, validity, edge cases, space/time tradeoffs BEFORE writing any code. 1-2 min max. | Coding Mock (May 10) |
| **Approach before code** | State brute force first, then optimize. Never "solve while typing" — it reads as no plan. | Coding Mock (May 10) |
| **Design for invalid states** | When designing classes/data structures, discuss how to prevent illegal combinations. Show the tradeoff (validation vs. type hierarchy). | Coding Mock (May 10) |
| **Estimation DRIVES design** | Don't just compute numbers — use them to justify every component (fleet size, queue throughput, storage tier). Same root as NFR precision. | Web Crawler (Jun 1) ⚠️ recurring w/ NFR precision |
| **Concrete mechanisms** | When asked to go deeper, describe the actual algorithm/criteria, not the general idea. "Materialize the idea into an algorithm" before moving on. | Web Crawler (Jun 1) |
| **Label & defend components** | Name the tech (Kafka/SQS/Redis), give a 1-2 sentence why, and explain what breaks without it. If you can't justify a component, cut it. | Web Crawler (Jun 1) |
| **Hold ground under pressure** | Interviewer will keep poking. Defend not just what you chose but why over alternatives, and the cost of doing it differently. | Web Crawler (Jun 1) |

---

## Mock #1: Design WhatsApp / Chat System

**Date:** Thu Apr 30, 2026 (Week 3)
**Format:** Timed solo, 45 min
**Prep reading:** Xu Vol 2 — Distributed Message Queue chapter

### Requirements Phase

- **Fault tolerance ≠ 100% uptime.** It means the system keeps working when individual components fail — data replication, redundant routing, graceful degradation. Don't claim zero downtime; articulate what happens when a server dies (messages reroute, no data loss).
- **Guaranteed deliverability** is a core NFR for any messaging system. Messages must eventually reach the recipient even if they're offline. Achieved via a persistent message queue that holds undelivered messages until reconnect.
- **Latency target: 500ms** for online message delivery. This is the standard number interviewers expect for real-time chat. Users perceive delays above this as lag.
- **NFRs vs. functional requirements — keep them separate.** Latency, availability, fault tolerance = NFRs (how well). Message ordering = functional (what the system does). Mixing these makes the discussion muddy.

### Core Entities

- **Four entities: Users, Chats/Groups, Messages, Media.** Media stored in blob storage (S3/GCS), Messages table holds only a reference URL to the blob. This keeps the DB lean and fast.
- **Blob storage** (S3, GCS) is the standard for unstructured binary data. Don't store raw media in relational or NoSQL databases — size and performance won't work.

### API Design

- **WebSocket event contracts matter.** Don't just say "use WebSockets" — define the actual events. Example: `newMessage` event with fields `chatId`, `senderId`, `content`, `attachments`. This covers both real-time push and reconnection scenarios.
- **Every endpoint needs a defined response.** For a POST creating a message or uploading a file, return the created resource ID + status code at minimum. Interviewers check for this.
- **Cursor-based pagination on history endpoints.** Any endpoint returning a growing list (chat message history) needs a `before`/`after` timestamp cursor. This directly supports offline retrieval without unbounded responses.

### High-Level Design

- **Per-user offset for offline delivery.** Store a `last_delivered_message_id` per user per chat. Without this, the system can't know what a reconnecting user missed. On reconnect, client fetches everything after the offset.
- **Notification ≠ delivery.** Notifications are hints that can be dropped (device off, app uninstalled). Correct pattern: persist message durably first → push notification as hint → on reconnect, client reads from storage using its offset for actual catchup.
- **Pre-signed upload URLs for media.** Client requests a pre-signed URL from blob storage and uploads directly. Keeps large binaries out of the message service entirely. Message record stores only a blob key/URL.
- **Don't forget the fan-out step in WebSocket diagrams.** After a message arrives at the WebSocket server, it must push to all other connected chat participants. Show the delivery path back to recipients, not just the inbound path from sender.

### Deep Dives

- **PubSub for cross-server WebSocket routing.** At scale with many WS servers, messages must reach the specific server holding the recipient's connection. Each WS server subscribes to topics for its current users. Message published → only the right server gets it and forwards. Without this, horizontal scaling doesn't help delivery.
- **Managing PubSub subscription churn.** Millions of subscriptions per WS server = huge churn. Mitigations: single multiplexed connection from each WS server to the PubSub broker (not one per user), batch subscribe/unsubscribe ops, grace period before unsubscribing on disconnect (so brief reconnects don't trigger full re-subscribe).
- **Multi-device = per-device sessions.** Each device is a separate client session. User Activity Service stores all active device sessions. Fan-out goes to every connected device. Delivery tracking is per-device (not per-user), because one device may be online while another is offline — each needs independent catchup state.

### Action Items from This Mock

- [x] Add flashcards for: WebSocket event contract pattern, per-user delivery offset, pre-signed upload URL pattern, PubSub fan-out at scale (→ Deck 12 Q17–Q21)
- [ ] In next SD mock, explicitly define API response shapes (not just request bodies)
- [ ] In next SD mock, always draw the fan-out / delivery path back to recipients
- [ ] Practice articulating fault tolerance concretely (what happens on failure) rather than vaguely ("high availability")
- [ ] Review: notification vs. delivery distinction — make this part of the standard messaging system template

---

## Mock #2: Design a Rate Limiter

**Date:** Sat May 2, 2026 (Week 3)
**Format:** Virtual mock
**Prep reading:** Deck 12 Q5 (rate limiter basics)

### What went well

- **API gateway placement** — correctly identified placing the rate limiter in the API gateway to avoid an extra hop, articulated the tradeoff (complexity in gateway vs. simplicity of dedicated service), and noted the statefulness concern.
- **Consistent hashing for counter sharding** — correctly identified sharding Redis counters by client key using consistent hashing.
- **Fail-open strategy** — good answer on letting traffic through when rate limiter fails, with Redis redundancy, automatic failover, and metrics/heartbeats for detection. Correctly noted that API gateway failure is a different (worse) problem than cache failure.
- **Rules architecture** — solid on rules service + DB + cache layering, with cache-miss fallback to rule service.

### Requirements Phase

- ⚠️ **No answer recorded.** You need to say NFRs out loud even if you think them. The key one here: **< 5ms per check**, not the general 200ms web latency. The rate limiter is in the critical path of every request — even 50ms overhead is unacceptable at scale.
- **Eventual consistency is acceptable.** During a partition, briefly allowing a few extra requests through is fine. Strict consistency would add latency for negligible benefit. This is a good NFR to state proactively.

### Core Entities

- ⚠️ **No answer recorded.** Three entities: **Rules** (define limits), **Clients** (identified by IP/user ID/token), **Requests** (the individual calls being counted). Articulating these early frames the rest of the design.

### System Interface

- ⚠️ **No answer recorded.** Key point from feedback: rate limiting rules are **not passed as inputs per request**. They're stored internally (DB/config store) and looked up by API name or endpoint. The interface is: client ID in → allow/deny + remaining quota out.

### High-Level Design

- **Token bucket confusion.** You said "accept requests from the queue at a fixed interval" — that's traffic shaping (queuing/delaying), not token bucket. Token bucket is simpler: bucket has capacity, tokens refill at steady rate, each request consumes one token, empty bucket = deny. It handles **bursts** naturally (up to bucket capacity) while enforcing a sustained rate. Don't conflate these in an interview.
- **HTTP 429 details wrong.** You didn't name the status code (429 Too Many Requests). You said Retry-After value is in **milliseconds** — it's **seconds**. And it's `Retry-After` (standard), not `x-retry-after`. Also worth mentioning: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` — these help clients self-throttle and reduce retry noise.

### Deep Dives

- **Missed: atomic operations on the hot path.** The single biggest latency optimization is combining the counter read + increment into **one atomic Redis operation** (INCR or a Lua script). This avoids two round trips and prevents race conditions. You talked about caching rejected users instead, which is creative but not the standard answer.
- **Missed: co-locate gateways and Redis.** Keep them in the same region/AZ to minimize network latency on every check.
- **Missed: rule propagation strategies.** Two approaches: polling with short TTL (simple, some delay) vs. push notifications (faster, needed for emergency throttling). Know the tradeoff — you only covered the caching layer, not how updates propagate to gateway instances.
- **Good: two separate storage concerns.** The feedback emphasizes rules (cacheable, slow refresh) vs. counters (distributed, low-latency, sharded) as distinct problems. Your answer covered both but could have been more explicit about the separation.

### Action Items from This Mock

- [ ] **Fix the silent early phases.** Practice saying Requirements, Core Entities, and Interface out loud even in solo mocks — record yourself. If the interviewer hears nothing, it's a zero.
- [ ] Memorize: HTTP **429**, `Retry-After` in **seconds**, plus the three `X-RateLimit-*` headers
- [ ] Memorize: token bucket = tokens + refill + deny when empty. It is NOT a queue. Traffic shaping (leaky bucket with queue) is a different concept.
- [x] Add flashcards for: token bucket (Q22), atomic Redis ops on hot path (Q23), rule propagation polling vs. push (Q24)
- [ ] In next mock, when discussing latency optimization, lead with "reduce round trips on the hot path" before anything else

---

## Mock #3: Design a Payment System (Stripe)

**Date:** Mon May 5, 2026 (Week 4)
**Format:** Guided practice
**Prep reading:** None noted

### What went well

- **High-level payment flow** — correctly described the merchant→transaction service→card processor→update flow with appropriate separation of concerns.
- **Security fundamentals** — identified auth service with token-based access, SSL for transit encryption, and isolated card processor with private key decryption.
- **Scaling approach** — good instincts on stateless services, partitioned databases, async processing via message queues with worker pools, and rate limiting.
- **Idempotency awareness** — mentioned idempotency keys and timestamps for transaction safety, plus saga pattern for cross-service coordination.

### Requirements Phase

- **Missed domain-specific NFRs.** The critical NFRs for payment systems: **security** (PCI-DSS compliance, encryption, strong auth) and **auditability** (tamper-proof trail for every financial event). These aren't optional — they're regulatory requirements. Also: eventual consistency is NOT acceptable for payments — you need strong consistency for financial integrity.

### Core Entities

- **System boundary thinking.** Three entities: **Merchant** (who receives money), **Payment** (the method/instrument), **Transaction** (the record of money movement — charges, refunds, payouts). NOT Product — that belongs to an e-commerce system. Articulating what your system does and doesn't own shows strong design thinking.

### API Design

- Key gaps from feedback:
  - **POST not PUT** for payment actions. PUT = replace entire resource. POST = perform action / create. Submitting a payment is an action.
  - **Card details required in request body** — card number, expiry, CVC. Without these, the system can't charge.
  - **Response body required** — at minimum: transaction status (pending/success/failed) + confirmation ID.
  - **Don't duplicate amount** across transaction creation and payment endpoints. Amount is set at creation; payment just references the transactionId.

### High-Level Design

- **PaymentIntent pattern missed.** A PaymentIntent is a record of what a customer *intends* to pay — created when merchant initiates, holds amount/currency/description, status = "created". No card processor call happens yet (no card details provided). This is fundamental to how Stripe works.
- **Multi-stage status model incomplete.** Your answer had "pending, completed, failed" but the real lifecycle is: **created → authorized → pending → settled → failed**. "Authorized" = funds reserved but not moved. "Settled" = bank completed transfer. This granularity matters for payment UX and reconciliation.
- **Missed: PaymentIntent vs. PaymentAttempt separation.** The intent persists across retries. Each attempt is a separate card charge with its own processor result, status, and timestamp. This lets you retry without losing context.

### Deep Dives

- **HSM for private keys.** You said "encrypted using a private key" but didn't mention WHERE the private key lives. Answer: Hardware Security Module (HSM) — tamper-resistant hardware where the key never exists in plaintext outside of it. Without this, server compromise = all card data exposed.
- **Audit trail approach was weak.** You described replication + blob storage, which is data durability, not auditability. The correct pattern: **Change Data Capture (CDC)** — database-level capture emitting every change to an immutable event stream. App-managed audit logs can go out of sync; CDC can't be skipped by application code.
- **Partition key wrong.** You said "merchant and transaction ID" composite. Correct answer: **transaction ID alone**. All events for a single payment must land on the same partition for ordering guarantees. Merchant ID for load spreading belongs at a higher routing level, not in the partition key.
- **Timeout handling incomplete.** You mentioned idempotency and saga, but missed the key insight: treat timeouts as **pending/uncertain**, not failed. The processor may still complete the charge. Use idempotency keys + optimistic locking to prevent conflicting updates when retries and callbacks race.

### Action Items from This Mock

- [ ] **Memorize domain-specific NFRs for payment systems.** Security (PCI-DSS, HSM, encryption) + auditability (CDC, immutable event stream) + strong consistency. These are non-negotiable for financial systems.
- [ ] Memorize: PaymentIntent lifecycle (created → authorized → pending → settled → failed) and why intent vs. attempt separation matters
- [ ] Memorize: POST for actions, PUT for full resource replacement. Payment submission = POST.
- [ ] Memorize: HSM = where private keys live. CDC = how you get tamper-proof audit trails. These are the standard answers.
- [ ] Memorize: partition key = transaction ID alone for event ordering. Don't mix in merchant ID.
- [x] Add flashcards for: payment lifecycle (Q25), HSM + CDC (Q26), partition key design (Q27), timeout + idempotency (Q28)

---

## Coding Mock: Expression Evaluator

**Date:** Sat May 10, 2026 (Week 4)
**Format:** Paid mock (3 parts: data structure design, method implementation, algorithmic problem)
**Overall rating from interviewer:** Mid-level, not senior — due to process, not technical ability.

### What went well

- **Evaluate method** — explained thinking before coding, came across clearly. This is the standard to replicate.
- **Eventually asked good clarification questions** — integer vs. double, which operators are in scope. Problem: these came mid-implementation instead of upfront.

### What went wrong

- **No clarification questions before coding on any of the 3 parts.** This was the single biggest gap. The interviewer flagged it across all three sections. Senior bar = gather requirements first, just like a real project.
- **Jumped into code on the final problem without defining an approach.** Hoped the solution would emerge while typing. It didn't — wasted time and produced throwaway code.
- **Data structure allowed invalid states.** Expression class had `isLeaf` + `operator` fields that could be set inconsistently. Didn't discuss alternatives (constructor validation vs. type hierarchy with OperatorExpression / ValueExpression subclasses).
- **Went silent when stuck.** Had the right instinct (stack-based) but couldn't map it. Searched silently instead of involving the interviewer or pattern-matching out loud.

### Root cause analysis

The communication gaps weren't random — they stem from one thing: **not recognizing the pattern fast enough.** When you know the approach, you naturally communicate well (see: evaluate method). When you don't, your fallback is "start typing and hope." That fallback is the problem.

### Fallback protocol (when pattern doesn't click in 90 seconds)

Memorize this sequence and use it every time:

1. **State brute force out loud.** Even if it's O(n³), describe it. It shows structure, often reveals the optimization, and gives you a "working" approach. Say: "The brute force would be to [X], which is O(n²). Let me see if I can do better."
2. **Run the pattern checklist out loud.** Can I sort this? Sliding window? Two pointers? Stack? Divide and conquer? Graph/BFS? DP? Say it: "This feels like it could be divide and conquer because there's a natural split point on the lowest-priority operator..."
3. **After 2 minutes of no progress, say so.** "I'm seeing a stack-based approach but I'm not sure how to handle operator precedence — can I walk through my thinking with you?" The interviewer will hint. Hints with dialogue >> silent struggling.

**Key mindset shift:** The communication IS the solving. Don't treat them as "solve first, then explain." Articulating your thinking out loud is how you find the solution faster, AND it's what the interviewer is evaluating. They're the same activity.

### The 90-second opening protocol (do this on EVERY problem)

Before writing a single line of code:

1. **Restate the problem** in your own words (10 sec)
2. **Ask clarification questions** (30-60 sec):
   - What are the inputs? Types? Ranges? Always valid?
   - What are the outputs? Format?
   - Edge cases: empty input, single element, negatives, duplicates?
   - Constraints: space vs. time preference?
3. **State your approach** (30 sec):
   - Brute force first, with complexity
   - Optimized approach if you see it, with complexity
   - "Does that sound reasonable before I start coding?"

### Specific technical takeaway

- **Expression evaluation → divide and conquer.** Split on the lowest-priority operator (scan for `+/-` first, then `*/`), recurse left and right, base case = single number. This is a standard pattern — add to flashcard review.

### The cognitive load problem (and the fix)

**The real issue isn't communication — it's that solving and performing compete for the same working memory.** When the solution isn't already in your head, you talk to yourself non-linearly (sometimes pacing/walking) to think. That thought process doesn't map to being heard and judged. Trying to do both at once splits your brain in half — half solving, half self-conscious about what to say — and you do neither well.

**The fix: narrate ACTIONS, not THINKING.**

Your thinking is non-linear and impossible to narrate cleanly. Don't try. Instead, narrate concrete actions — primarily **tracing through an example**.

- ❌ Narrating thought: "Hmm, maybe a stack... no wait, a hashmap... actually if I go backwards..."
- ✅ Narrating action: "Let me trace through `[4, 2, 7, 1]` and see what happens at each step."

Tracing an example is the cheat code. It (1) helps YOU think because concrete beats abstract — the same reason you like writing code, (2) gives the interviewer visible signal without exposing your messy internal process, and (3) doesn't split your attention, because you're walking through data, not translating thoughts into words.

**Three time-buying phrases that keep you from going silent:**

1. "Let me trace through an example..." → then just work through specific values
2. "I'm stuck on [specific thing], let me think for a sec..." → 30 sec of silence is fine; 3 min is not
3. "I have an instinct that [X] works but I'm not sure why yet — let me verify with this case..."

**Mindset shift:** The interviewer doesn't expect clean linear narration. They expect to not be in the dark. **Uncertainty stated clearly reads as confidence. Uncertainty hidden reads as floundering.** "I think this is sliding window but I'm not sure how to handle the shrink condition — let me try an example" is a senior-level statement.

### THIS WEEK'S DRILL: build the narration muscle in two stages

**Stage 1 — Zero solving load (do this first, 3 sessions):**
Take 3 problems you've ALREADY solved cold (e.g., Two Sum, Valid Parentheses, Reverse Linked List). Re-solve them with a timer, speaking the entire time. Since solving costs ~nothing, 100% of your brainpower goes to the communication muscle. Goal: get used to *what it sounds like* to talk through a problem. The self-consciousness drops once the muscle memory exists.

**Stage 2 — Add back partial solving load:**
Move to problems where you know the PATTERN but haven't seen the exact problem. Now you're layering solving back on, but narration is already semi-automatic. Practice leading every step with a trace-through.

Track it: speak out loud on every LC problem from now until the next mock. No silent solving, even alone.

### Action Items from This Mock

- [ ] **Stage 1 narration drill** — 3 already-solved problems, speak the whole time, timer on. (Do before Stage 2.)
- [ ] **Stage 2 narration drill** — known-pattern-but-new problems, lead each step with a trace-through.
- [ ] **Drill the 90-second opening protocol** on the next 5 LC problems. Don't type anything until you've said the approach out loud (even alone, speak it).
- [ ] **Practice the fallback protocol** by intentionally picking 2 unfamiliar LC problems this week and forcing yourself through the checklist before coding.
- [ ] **Default to tracing an example** whenever stuck, instead of pacing/talking to yourself. The example is both your thinking tool AND your communication tool.
- [ ] **Add "expression evaluation → divide and conquer" to flashcard deck** (Deck 0 or a new card).
- [ ] When designing a class/data structure, always ask: "Can this represent an invalid state? How would I prevent that?" — make this a reflex.
- [ ] **Treat each follow-up question as a new problem.** Re-clarify assumptions. Ask if input is always valid. Don't carry assumptions forward.

---

## Mock #4: Design a Web Crawler

**Date:** Mon Jun 1, 2026
**Format:** Paid mock (Google/FAANG senior bar)
**Prep reading:** None — had never seen a web crawler design before.

### What went well

- **High-level structure was correct** — appropriately skipped the API section, laid out a reasonable HLD, walked through components in order.
- **Good caching instincts** — rate-limiting cache and visited-sites (dedup) cache were both the right calls.

### The headline failure: given numbers, never used them

- Was handed **20 billion pages over 7 days** and never converted it. At senior level this is non-negotiable.
- **The math the interviewer wanted:**
  - Throughput: 20B ÷ (7 × 86,400s) ≈ **33,000 pages/sec** → tells you crawler fleet size + queue throughput requirement
  - Storage: 20B × ~1MB/page = **~20 PB** → flags that cold storage is wrong; S3 is the appropriate choice
- **The lesson:** the numbers aren't a box to tick — they're the JUSTIFICATION engine for every architectural decision. Without them, every choice looks arbitrary and the interviewer can't validate that the design scales. This is the SAME gap as the "NFR precision" theme from mocks 1-3. Four mocks, same hole. **This is now the #1 fix.**

### Where answers were too vague (be concrete about the mechanism)

- **Rate limiter** — took too long to get to a clear answer, and even then the details weren't crisp. Need the actual mechanism (e.g., per-domain token bucket in Redis, key = domain, refill rate = politeness limit).
- **Queue worker enqueue criteria** — answer about "batch size and estimated processing speed" was too approximate. Need exact, defined criteria.
- **URL database purpose** — couldn't crisply explain why it existed as a separate component. Interviewer pushed on whether it was needed at all when the queue already tracks what to visit.
- **Fix:** "materialize the idea into a concrete algorithm before moving on." If you can't describe the exact steps, you haven't finished the thought.

### Queue conflict problem (politeness / same-domain clustering)

- **The problem:** a page like Wikipedia yields ~1000 same-domain URLs that end up contiguous in the queue → crawlers hammer one domain (violates politeness) and starve others.
- **My answer (too weak):** just re-enqueue failed items. Not senior-level.
- **Two defensible solutions the interviewer gave:**
  1. **Interleave across domains** when pulling from the DB so same-domain URLs are spread apart in the queue.
  2. **Partition the queue into channels by domain hash**, crawlers round-robin across channels. (This is consistent hashing applied to queue partitioning.)
- Be able to explain ONE of these clearly and defend it.

### Label and defend every component

- When drawing a queue, say **Kafka vs SQS** and give a 1-2 sentence reason. Same for caches and DBs.
- For a **one-shot 7-day crawl**, question whether each piece of infra is necessary. If you can't explain why a component is there and what breaks without it → cut it or think harder. (The URL DB was the casualty here.)

### Defend tradeoffs under pressure

- Attempted tradeoff discussion (right instinct) but folded when challenged on the URL DB.
- **Fix:** practice articulating (1) what you chose, (2) why over the alternative, (3) the cost of doing it differently. The interviewer WILL keep poking — that's the test.

### Meta-pattern (across coding mock + this one)

Recurring rationalization: "if I'd known the solution beforehand I'd have communicated better." Partly true for SD (canonical set is finite — pre-read it). But the dinged skills here — **estimation-driven design, concrete mechanisms, labeling/defending components, holding ground** — are design-AGNOSTIC and transfer to every problem. Knowing the crawler answer would have HIDDEN these gaps, not fixed them. Don't let "read the canonical designs" become an excuse to skip drilling the universal skills.

### Recommended reading (from interviewer)

- [ ] Consistent Hashing for SD Interviews → domain-partitioned queue channels (the pattern he had to introduce)
- [ ] Kafka Deep Dive for SD Interviews → naming/justifying queue tech
- [ ] Sharding in SD Interviews → domain-sharded queue for politeness
- [ ] Design a Distributed Job Scheduler (Airflow) → fault tolerance / failure recovery (a gap in the crawler design)

### Action Items from This Mock

- [ ] **DRILL: estimation-first.** On the next 5 SD problems, the FIRST thing after requirements is convert given numbers → RPS + storage + bandwidth, then explicitly say "so this means [N] servers / [tier] storage." Make it a reflex, not an afterthought. (Highest priority — recurring across 4 mocks.)
- [ ] **Pre-read the canonical SD designs** — web crawler, TinyURL, chat, feed, search, YouTube, Dropbox, ticketmaster, notification, etc. Finite set; close the floor.
- [ ] **Practice the "defend under pressure" loop** — after stating a choice, immediately self-challenge out loud: "alternative would be X, I picked this because Y, cost is Z."
- [ ] **Concrete-mechanism drill** — when you name a component (rate limiter, dedup, queue worker), force yourself to state the exact data structure + algorithm + keys before moving on.
- [ ] Learn the two queue-conflict solutions (interleave by domain / partition by domain hash) cold.
- [ ] Read the 4 recommended articles above.
- [ ] Add flashcards: crawler throughput/storage math, politeness via domain-partitioned queue, "label every component" checklist.

---

<!-- TEMPLATE FOR FUTURE MOCKS — copy and fill in

## Mock #N: Design [System]

**Date:** [Day, Date] (Week N)
**Format:** [Solo timed / Peer mock / Paid mock]
**Prep reading:** [What you read beforehand]

### Requirements Phase
- [takeaway]

### Core Entities
- [takeaway]

### API Design
- [takeaway]

### High-Level Design
- [takeaway]

### Deep Dives
- [takeaway]

### Action Items from This Mock
- [ ] [action]

-->
