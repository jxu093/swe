# DDIA Chapters 8 & 9 — Distributed Systems for Interviews

Key concepts from "Designing Data-Intensive Applications" Ch. 8 (The Trouble with Distributed Systems) and Ch. 9 (Consistency and Consensus), focused on what matters in system design interviews.

---

## Chapter 8 — The Trouble with Distributed Systems

Core message: everything that can go wrong will, and you must design for it.

### Unreliable Networks

- Unbounded delays, lost packets, no way to distinguish a slow node from a dead one
- Why timeouts and retries matter, and why you need idempotency

### Unreliable Clocks

- Wall clocks drift, NTP can jump — you can't use timestamps to order events across nodes
- Logical clocks (Lamport, vector clocks) solve ordering without wall time

### Process Pauses

- GC pauses, VM preemption, context switches can make a node "disappear" for seconds
- Lease-based leadership can break during pauses

### Partial Failures

- Some nodes fail while others succeed
- You must decide how to handle the ambiguity (Byzantine vs. crash-stop fault models)

### Interview Application

When an interviewer asks "what happens if this node goes down?" they want you to reason about these failure modes. Mention retries with idempotency keys, timeouts, and heartbeats.

---

## Chapter 9 — Consistency and Consensus

### Linearizability

- Behaves as if there's a single copy of data
- Expensive (requires coordination) but simple to reason about
- Needed for: leader election, uniqueness constraints, payment dedup

### Causal Consistency

- Weaker but cheaper — causally related events are ordered; concurrent events can diverge
- Often "good enough" for most application-layer reads

### Consensus Algorithms (Raft, Paxos, ZAB)

- How nodes agree on a value
- Underpins leader election, atomic commit, total order broadcast
- Key insight: requires a majority quorum, so tolerates minority failures

### 2PC / 3PC

- 2PC: atomic commit across partitions, but blocks if the coordinator dies (interview gotcha)
- 3PC: adds a round but still not partition-tolerant

### CAP / Real-World Tradeoffs

- In a network partition you choose availability or consistency
- Most systems choose availability and handle inconsistency at the application layer (conflict resolution, CRDTs)

### Interview Application

When you propose replication, the interviewer will probe consistency guarantees. Know when to say "we need linearizability here" (e.g., payment dedup) vs. "eventual consistency is fine" (e.g., social feed), and what coordination cost each implies.

---

## One-Sentence Summary

Distributed systems fail in partial, ambiguous ways — getting nodes to agree on anything (ordering, leadership, commits) is fundamentally expensive, so you pick the cheapest consistency model your use case can tolerate.
