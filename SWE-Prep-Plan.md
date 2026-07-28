# Senior SWE Interview Prep Plan — 6 Weeks

**Dates:** Tue Apr 14, 2026 → Sun May 24, 2026
**Target:** Start applying the week of May 25, 2026
**Weekly budget:** ~13.5 hrs (1.5 hr × 5 weekdays + 3 hr × 2 weekend days)
**Split:** ~50% DSA / ~50% System Design, with spaced-repetition review woven into every day.

> **📍 Current status (Jun 1, 2026):** Core 6-week plan complete. **Week 6 was mostly missed** — did light flashcard reading, finished the behavioral STAR stories, and have continued doing mocks since (including a coding mock and a web crawler SD mock — see `Mock-Practice-Notes.md`). Now in **[Phase 2: Application & Interview Readiness](#phase-2-application--interview-readiness-jun-1-onward)** (jump to the bottom). Cadence shifts from *learning* to *staying sharp + closing the specific gaps the mocks surfaced.*

---

## About this plan

**Who:** Senior SWE, 9 years total experience (7 at Microsoft on Azure Software-Defined Networking Control Plane). Targeting Senior SWE roles at top-tier tech companies, Seattle area.

**Why 50/50 DSA/SD:** SDN control plane background means system design concepts (consistency, replication, distributed coordination) are familiar in practice but need to be articulated at the whiteboard level. DSA is not a weakness but needs sharpening on specific patterns. The split reflects equal risk on both axes.

**Reference materials used in this plan:**
- **NeetCode 150** — a curated list of 150 LeetCode problems organized by pattern (arrays, two pointers, trees, graphs, DP, etc.), widely used for FAANG-level prep. See [neetcode.io](https://neetcode.io).
- **DDIA** — *Designing Data-Intensive Applications* by Martin Kleppmann. The primary SD reading material. Covers reliability, replication, partitioning, transactions, CAP, and consensus.
- **SDI Vol 2** — *System Design Interview – An Insider's Guide: Volume 2* by Alex Xu. End-to-end design walkthroughs (distributed message queue, payment system, proximity service, metrics monitoring, etc.) structured like real interviews: requirements → estimation → API → data model → HLD → deep dive → tradeoffs. Use as mock prep reading — read the relevant chapter the day before or morning of a mock.
- **Hello Interview / Interviewing.io** — platforms for booking paid or peer SD mock interviews with real engineers. Use for Saturday mocks; self-graded solo mocks are a fallback, not a substitute.

**Companion files (all in the `SWE Interview/` folder):**
- `SWE-Prep-Plan.md` — this file
- `Mock-Practice-Notes.md` — categorized takeaways from every SD mock and practice session; review before each new mock
- `Flashcards/SWE-Flashcards.md` — full flashcard deck in markdown (source of truth)
- `Flashcards/SWE-Flashcards.html` — interactive flashcard web app (open in browser); deep-link to a specific card via `SWE-Flashcards.html#F14`
- `Flashcards/cards.js` — card data file loaded by the HTML app
- `Prep-Plan-Viewer.html` — visual HTML calendar view of this plan with LC links and card deep-links

---

## How to use the flashcards

**Flashcard system:** The flashcard file contains 24 decks (256 cards total). Deck 0 is the personal "flagged problems" deck (22 cards, F1–F22) — problems that caused trouble and need extra repetition. Decks 1–8 are core DSA pattern decks (Arrays & Hashing, Two Pointers, Stack, Binary Search, Sliding Window, Trees, Tries, Backtracking). **Decks 9–16 are System Design**, reorganized by topic (replacing the old DDIA-chapter grouping): (9) Fundamentals & Estimation, (10) Data Storage & Modeling, (11) Replication/Partitioning/Consistency, (12) Coordination & Transactions, (13) Caching/CDN/Hashing, (14) Messaging/Streaming/Real-time, (15) Networking & Load Balancing, (16) Reliability/Observability/Deployment/Rate Limiting. Every SD card carries three layers: the concept, where it shows up in a real design, and the tradeoff. The mock-derived cards (chat, rate limiter, payment) now live in their topic decks (14, 16, 12). Decks 17–22 are additional DSA decks (Linked List, Heap / Priority Queue, Graphs, 1-D DP, Intervals, Greedy). The 1-D DP deck also includes 2-D DP cards (LCS, Edit Distance) since there's no separate 2-D DP deck yet.

**Daily warm-up routine (15–30 min):**
1. Open the specified deck(s) for that day
2. Read the question — *attempt the answer in your head or scratch paper* before scrolling/flipping
3. Reveal the answer and compare honestly
4. Mark "got it" or "missed it" — missed cards come back sooner

**Timing calibration:** The 15-min warm-up assumes 2–4 specific cards called out by name (e.g., "F6+F7"). Every day after the first pass does this. A full first-pass through all 22 Deck 0 cards with no time pressure per card takes ~45 min — budget accordingly the first time you run a new full deck.

**Flagged re-solve workflow (for ⚠️ sessions, ~30 min per problem):**
1. **Flashcard first (5 min):** Pull the Deck 0 card, recall the key insight from memory before reading the answer
2. **Blank-page on LeetCode (20 min):** Solve it fresh with no hints. The goal is clean execution on the specific detail that tripped you up — not just getting AC
3. **Post-mortem (5 min):** If you got stuck again, note *exactly where* and update your flashcard hint

**Spaced repetition intervals:** +1d, +3d, +7d, +14d, +21d, +30d after first completion of a deck.

---

## Guiding principles

1. **Retrieval > re-reading.** Every session starts with a short flashcard warm-up. Re-reading DDIA without active recall is low-yield.
2. **One deep thing per day.** Weekdays have a single focused block (one LC problem OR one SD deep-dive). Don't try to do both on a weekday.
3. **Spaced repetition cadence.** Each completed topic is reviewed at Day 1, 3, 7, 14, 21, 30 after first completion. Miss a day → don't try to catch up on everything, just resume.
4. **Mocks are non-negotiable.** Book real SD mocks weekly (Interviewing.io, Hello Interview, peer). Self-graded mocks count but are weaker signal.
5. **Behavioral prep is cheap.** 30 min/week on STAR stories is enough given your 9 YoE.

---

## Baseline snapshot (Apr 14)

From your NeetCode tree:

- **Completed (DSA ready for review-only):** Arrays & Hashing, Two Pointers, Stack, Binary Search, Sliding Window, Trees, Tries, Backtracking, Linked List, Heap / Priority Queue, Graphs, 1-D DP
- **Not started:** Intervals, Greedy, Advanced Graphs, 2-D DP, Bit Manipulation, Math & Geometry
- **System Design:** Reading DDIA, doing walkthroughs, early mocks show gaps.

**⚠️ Flagged problems (gave you trouble — see Deck 0 in Flashcards):**

| Problem | Topic | Key insight flagged |
|---|---|---|
| Top K Frequent Elements | Arrays & Hashing | Bucket sort O(n) — not just heap |
| Encode and Decode | Arrays & Hashing | Length-prefixed chunks, not delimiter |
| Longest Consecutive Sequence | Arrays & Hashing | Hashset, only start count when n-1 absent |
| 3Sum | Two Pointers | Sort first; duplicate-skip logic |
| Trapping Rain Water | Two Pointers | leftMax/rightMax; `l < r` not `l <= r` |
| Daily Temperatures | Stack | Monotonic stack of indices; larger clears smaller |
| Largest Rectangle in Histogram | Stack | Store `(height, start_index)` in stack for width tracking |
| Koko Eating Bananas | Binary Search | Don't return early on equality; ceiling division |
| Median of Two Sorted Arrays | Binary Search | Partition j = (m+n+1)//2 - i; ±inf guards |
| Longest Repeating Char Replacement | Sliding Window | maxCount stays stale-high intentionally |
| Sliding Window Maximum | Sliding Window | Monotonic deque; pop back when smaller; pop front when out-of-window |
| Remove Nth Node from End | Linked List | n+1 gap so slow lands *before* target |
| Find the Duplicate Number | Linked List | Floyd's: start=index 0, not value 0; return entrance not meeting point |
| Merge K Sorted Lists | Heap | Heap=streaming; D&C=space; both O(N log k) |
| **Task Scheduler** | **Heap / Priority Queue** | **Math formula: `max(len(tasks), (max_count-1)*(n+1) + count_of_max)` — not just heap simulation** |
| Kth Smallest in BST | Trees | Iterative inorder: push only when node non-null, don't pre-push |
| Serialize/Deserialize Binary Tree | Trees | BFS with null markers OR DFS with length prefix |
| N-Queens | Backtracking | Track cols, diag (r-c), anti_diag (r+c) |
| Course Schedule | Graphs | Kahn's: count processed==n; DFS: 3-color |
| Graph Valid Tree | Graphs | Prescreen edges==n-1 THEN check connectivity |
| Maximum Product Subarray | 1-D DP | Track curMax and curMin; update both simultaneously |
| Reorder List | Linked List | Find midpoint (slow/fast pointers) → reverse second half → merge the two halves |

Strategy:
- **Weeks 1–2:** All 12 core topics are complete — use this time to burn down flagged problem re-solves and start new DSA (Intervals, Greedy). SD focus on fundamentals (reliability/scalability/consistency) since mocks are weak.
- **Weeks 3–4:** New DSA topics (continue Greedy, 2-D DP, Advanced Graphs intro). SD focus on common designs (rate limiter, chat, Instagram, job scheduler) with Xu Vol 2 chapters as mock prep reading.
- **Weeks 5–6:** Finish long-tail DSA (Bit Manip, Math & Geometry). SD shifts to intensive mocks + weak-spot drilling. Mixed-topic LC sets simulating real interviews.

---

## Weekly rhythm (template)

| Day  | Time  | Block 1 (warm-up)          | Block 2 (main work)                                 |
|------|-------|----------------------------|-----------------------------------------------------|
| Mon  | 1.5 h | 15 min flashcards (DSA)    | 75 min: 1 medium LC (new topic or review)           |
| Tue  | 1.5 h | 15 min flashcards (SD)     | 75 min: SD reading + write 1-pager on a concept     |
| Wed  | 1.5 h | 15 min flashcards (DSA)    | 75 min: 1 medium LC                                 |
| Thu  | 1.5 h | 15 min flashcards (SD)     | 75 min: SD problem outline (solo, timed 45 min) + review |
| Fri  | 1.5 h | 15 min flashcards (mixed)  | 75 min: Review week's LCs — re-solve without hints  |
| Sat  | 3 h   | 30 min flashcards          | 90 min SD mock (or recorded solo mock) + 60 min hard LC |
| Sun  | 3 h   | 30 min flashcards          | 90 min: 2 LC problems timed + 60 min SD review/DDIA chapter |

**Total:** ~13.5 h/week. Drop one weekday block if life happens; never drop Saturday mock.

---

## Spaced repetition queue (auto-scheduling rule)

When you complete a topic or a flashcard deck for the first time, add review sessions at:

- **+1 day** (quick recall)
- **+3 days** (short deck)
- **+7 days** (full deck)
- **+14 days** (full deck)
- **+21 days** (full deck)
- **+30 days** (full deck, final)

The flashcard file has decks for all 14 DSA topics (8 core + Linked List, Heap, Graphs, 1-D DP, Intervals, Greedy) and 4 System Design decks (DDIA Ch 1, Ch 2–3, Replication/Partitioning/Consistency, Common Patterns). Add new decks as you finish topics.

---

# Week 1: Apr 14 – Apr 19

**DSA focus:** Flagged problem re-solves (Linked List, Heap, Stack groups) + start Intervals
**SD focus:** Reliability, Scalability, Maintainability (DDIA Ch 1); back-of-envelope estimation

### Tue Apr 14 — 1.5 h
- 15 min: Flashcards — Deck 0 (flagged) + Arrays & Hashing (first pass of each)
- 75 min: LC — Re-implement **Reorder List** (F22) and **Remove Nth Node from End** (F12) from scratch. Review your flashcard *after* each attempt, not before.

> ⚠️ *Flagged re-solves:* Reorder List (F22), Remove Nth Node from End (F12)

### Wed Apr 15 — 1.5 h
- 15 min: Flashcards — Two Pointers deck
- 75 min: DDIA Ch 1 re-read + write a 1-page summary in your own words on *"What makes a system reliable vs. available vs. maintainable?"* Do not copy sentences.

### Thu Apr 16 — 1.5 h
- 15 min: Flashcards — Stack deck (Deck 0 cards F6+F7 specifically)
- 75 min: LC — **Merge K Sorted Lists** (F14): implement both approaches from memory. After each, write one sentence on when you'd use each in a real system. Then re-implement **Daily Temperatures** (F6) from scratch. Check flashcards only after attempting.

> ⚠️ *Flagged re-solves:* Merge K Sorted Lists, Daily Temperatures

### Fri Apr 17 — 1.5 h *(adjusted)*
- 45 min: Finish remaining Deck 0 cards — resume from where you left off, no time pressure per card
- 45 min: LC — **Reorder List** (F22) clean solve on LeetCode, then **Remove Nth Node from End** (F12). No hints. Both should be fluent by end of session.

> ⚠️ *Flagged re-solves:* Reorder List (F22), Remove Nth Node from End (F12)

> *Note: Binary Search deck (F8+F9) and back-of-envelope estimation drill moved — see Sat and Week 2 Thu respectively.*

### Sat Apr 18 — 3 h *(adjusted warm-up)*
- 30 min: Flashcards — Binary Search deck (Deck 0 cards F8+F9) *(moved from Fri)* + Sliding Window deck (F10+F11) + System Design (DDIA Ch 1) deck
- 90 min: **SD Mock #1** — Design a URL shortener (solo, timed, record yourself or write it all up). Score yourself against the Hello Interview rubric after.
- 60 min: LC — Re-implement **Task Scheduler** (F15) both ways from memory. Then re-implement **Sliding Window Maximum** (F11) from scratch. Check flashcards only after attempting.

> ⚠️ *Flagged re-solves:* Task Scheduler (both approaches), Sliding Window Maximum

### Sun Apr 19 — 3 h
- 30 min: Flashcards — Trees deck (Deck 0 cards F16+F17) + Tries deck
- 90 min: Timed session — re-implement **Serialize/Deserialize Binary Tree** (F17) + **Kth Smallest in BST** (F16). Both are flagged — attempt from scratch before checking cards.
- 60 min: DDIA Ch 2 (Data Models) start — read + note-take, no more than 40 pages.

> ⚠️ *Flagged re-solves:* Serialize/Deserialize Binary Tree, Kth Smallest in BST

**End of Week 1 check:** Linked List and Heap should be fully green. You should have 1 SD mock on record and 5 DSA flashcard decks cycled once.

---

# Week 2: Apr 20 – Apr 26

**DSA focus:** Intervals (complete), start Greedy; flagged re-solves for Graphs/DP group
**SD focus:** Data models, storage engines, indexes (DDIA Ch 2–3)

### Mon Apr 20 — 1.5 h
- 15 min: Flashcards — Backtracking deck (Deck 0 card F18) + Arrays & Hashing (+7d review — Deck 0 cards F1+F2+F3)
- 75 min: LC — Intervals kickoff: Insert Interval + Merge Intervals. Then re-solve **N-Queens** (F18) from scratch. Check flashcard after.

> ⚠️ *Flagged re-solve:* N-Queens

### Tue Apr 21 — 1.5 h
- 15 min: Flashcards — System Design (DDIA Ch 1) deck
- 75 min: DDIA Ch 3 — storage engines (LSM vs B-tree). Afterward, without notes, explain write/read amplification for each. Write 1 paragraph per engine.

### Wed Apr 22 — 1.5 h
- 15 min: Flashcards — Two Pointers (+7d review — Deck 0 cards F4+F5)
- 75 min: LC — Non-overlapping Intervals + **Course Schedule** (F19) re-solve — implement both approaches from memory. State the termination condition for each without hesitation. Check flashcard after.

> ⚠️ *Flagged re-solve:* Course Schedule (both approaches)

### Thu Apr 23 — 1.5 h *(adjusted)*
- 15 min: Flashcards — new System Design deck (DDIA Ch 2–3)
- 20 min: Back-of-envelope estimation drill *(moved from Fri Apr 17)* — estimate QPS for Twitter reads, storage for YouTube uploads/year, bandwidth for Netflix peak. Write assumptions explicitly.
- 55 min: SD problem — Design a key-value store (timed, then compare to a reference).

### Fri Apr 24 — 1.5 h
- 15 min: Flashcards — Stack (+7d review — Deck 0 cards F6+F7) + Heap (new deck, first pass)
- 75 min: LC review — re-solve **Graph Valid Tree** (F20) + **Find the Duplicate Number** (F13). Both flagged — attempt from scratch before checking cards.

> ⚠️ *Flagged re-solves:* Graph Valid Tree, Find the Duplicate Number

### Sat Apr 25 — 3 h
- 30 min: Flashcards — Intervals deck (first pass) + SD DDIA Ch 2–3 (+3d review) + SD DDIA Ch 1 (+7d review)
- 90 min: **SD Mock #2** — Design Twitter/X feed (solo or peer). Focus specifically on write vs. read fan-out tradeoffs.
- 60 min: LC — Meeting Rooms II (finish Intervals) + Greedy kickoff: Jump Game + Gas Station.

### Sun Apr 26 — 3 h
- 30 min: Flashcards — Binary Search + Sliding Window (+7d review)
- 90 min: 2 mediums timed (pick one graph, one interval).
- 60 min: DDIA Ch 4 (Encoding & Evolution) — read + 5 bullet takeaways.

**End of Week 2:** Graphs green, Intervals ~70% done, 2 SD mocks recorded, DDIA Ch 1–4 summarized.

---

# Week 3: Apr 27 – May 3

**DSA focus:** Finish Intervals, start Greedy, continue 1-D DP
**SD focus:** Replication, Partitioning (DDIA Ch 5–6); Xu Vol 2: Distributed Message Queue

### Mon Apr 27 — 1.5 h
- 15 min: Flashcards — Trees (+14d) + Tries (+14d)
- 75 min: LC — Meeting Rooms II + Min Interval to Include Each Query.

### Tue Apr 28 — 1.5 h
- 15 min: Flashcards — DDIA Ch 2–3 deck
- 40 min: DDIA Ch 5 (Replication) — skim key concepts. Draw single-leader vs. multi-leader vs. leaderless from memory at the end.
- 35 min: Xu Vol 2 — "Distributed Message Queue" chapter (mock prep for Thu's WhatsApp design — message ordering, delivery guarantees, consumer groups).

### Wed Apr 29 — 1.5 h
- 15 min: Flashcards — Backtracking (+14d)
- 75 min: LC — Jump Game + Gas Station + Hand of Straights (greedy). State the greedy invariant in plain English for each.

### Thu Apr 30 — 1.5 h
- 15 min: Flashcards — new SD deck (Replication)
- 75 min: SD problem — Design WhatsApp/chat (timed 45 min). Focus on message ordering, delivery semantics, presence.

### Fri May 1 — 1.5 h
- 15 min: Flashcards — Arrays & Hashing (+14d — Deck 0 cards F1+F2+F3)
- 75 min: LC — 1-D DP push: Climbing Stairs, House Robber I & II, **Maximum Product Subarray** (F21 — flagged). Then Longest Palindromic Substring. Check flashcards only after attempting each.

> ⚠️ *Flagged re-solve:* Maximum Product Subarray

### Sat May 2 — 3 h
- 30 min: Flashcards — Deck 12 Q17–Q28 first pass (WhatsApp mock: WebSocket contracts, offline delivery, pre-signed uploads, PubSub fan-out, multi-device; Rate limiter mock: token bucket mechanics, atomic hot-path ops, rule propagation; Payment system mock: payment lifecycle, HSM+CDC, partition keys, timeout handling) + Intervals (+7d) + Heap (+7d)
- 10 min: **Pre-mock review** — read `Mock-Practice-Notes.md` themes index. Focus areas for this mock: define API response shapes (not just requests), articulate fault tolerance concretely (what happens when X fails).
- 80 min: **SD Mock #3** — Design a rate limiter (prefer a real peer mock this week if possible). Post-mock: add entry to `Mock-Practice-Notes.md`.
- 60 min: LC — Longest Common Subsequence + Word Break.

### Sun May 3 — 3 h
- 30 min: Flashcards — review everything ≥14d old
- 90 min: 2 mediums timed, mixed.
- 60 min: DDIA Ch 6 (Partitioning) — read + write the consistent hashing argument in your own words.

**End of Week 3:** Intervals green, Greedy ~80%, 1-D DP ~70%, Replication + Partitioning internalized.

---

# Week 4: May 4 – May 10

**DSA focus:** Finish Greedy + 1-D DP, start 2-D DP
**SD focus:** Transactions, Consistency, CAP, Consensus (DDIA Ch 7–9); Xu Vol 2: Payment System

### Mon May 4 — 1.5 h
- 15 min: Flashcards — Two Pointers (+21d) + Stack (+21d)
- 75 min: LC — Coin Change + Partition Equal Subset Sum.

### Tue May 5 — 1.5 h
- 15 min: Flashcards — Replication deck
- 40 min: DDIA Ch 7 (Transactions) — focus on isolation levels. Must be able to draw the matrix (read committed, snapshot, serializable) from memory.
- 35 min: Xu Vol 2 — "Payment System" chapter (concrete application of idempotency, exactly-once semantics, and transaction consistency).

### Wed May 6 — 1.5 h
- 15 min: Flashcards — Binary Search (+21d)
- 75 min: LC — Unique Paths + Longest Increasing Subsequence (2-D DP intro).

### Thu May 7 — 1.5 h
- 15 min: Flashcards — new Consistency/CAP deck + review Deck 12 Q19 (pre-signed uploads — directly applies to Instagram)
- 75 min: SD problem — Design Instagram/photo upload+feed (timed 45 min). Apply WhatsApp learnings: pre-signed upload URLs for media, blob storage with DB references, fan-out for feed delivery. Define API response shapes explicitly.

### Fri May 8 — 1.5 h
- 15 min: Flashcards — Sliding Window (+21d)
- 75 min: LC review — re-solve this week's 2-D DPs from scratch. Explain the state + transition out loud.

### Sat May 9 — 3 h
- 30 min: Flashcards — Deck 12 Q17–Q28 (+7d) + Trees (+21d) + Tries (+21d) + Backtracking (+21d)
- 10 min: **Pre-mock review** — read `Mock-Practice-Notes.md` themes index. Check which gaps from mocks 1–3 are recurring.
- 80 min: **SD Mock #4** — Design a distributed job scheduler. Peer mock if possible. Post-mock: add entry to `Mock-Practice-Notes.md`.
- 60 min: LC — Edit Distance + Interleaving String (2-D DP).

### Sun May 10 — 3 h
- 30 min: Flashcards — catch-up sweep of decks due for review but not yet hit this week:
  - Arrays & Hashing (Deck 1, +21d)
  - SD DDIA Ch 1 (Deck 9, +21d)
  - SD DDIA Ch 2–3 (Deck 10, +14d)
  - Heap (Deck 14, +14d)
  - Intervals (Deck 17, +14d)
- 90 min: 2 mediums timed (45 min each, no hints):
  - **Course Schedule II** (LC 210, Graphs) — output the topological order, not just cycle detection. Builds on Course Schedule (F19).
  - **Partition Labels** (LC 763, Greedy) — find the last occurrence of each char, then greedily extend partitions.
- 60 min: DDIA Ch 8–9 (Distributed troubles, Consistency) — skim + flashcard add.

**End of Week 4:** Greedy green, 1-D DP green, 2-D DP ~60%. CAP/transactions internalized.

---

# Week 5: May 11 – May 17

**DSA focus:** Finish 2-D DP, Bit Manipulation, Math & Geometry, dip into Advanced Graphs
**SD focus:** Intensive mocks + weak-spot drilling; Xu Vol 2: targeted chapter for weakest area
This week shifts toward synthesis. Fewer new concepts, more end-to-end practice.

### Mon May 11 – Wed May 13 — Oncall block (4.5 h total, do modules in any order when time allows)

> ⚠️ **Oncall Mon–Thu noon.** Modules below are independent and priority-ranked. Do as many as you can in whatever gaps you get. Flashcard modules first — they're 15 min and compound. LC modules next. SD reading last (most flexible to defer).

**Priority 1 — Flashcards (15 min each, do one per break)**
1. ☐ Trees (+30d) + Tries (+30d) — final review, should be instant
2. ☐ Backtracking (+30d) — final review
3. ☐ Consistency/CAP deck — reinforcement

**Priority 2 — LC: Bit Manipulation (40 min total)**
4. ☐ **Single Number** (LC 136) + **Counting Bits** (LC 338) + **Reverse Bits** (LC 190) — speed drill, all easy/medium. Can split: do Single Number alone in 10 min if that's all you have.

**Priority 3 — LC: Math & Geometry (45 min total, splittable)**
5. ☐ **Rotate Image** (LC 48, Medium) — 15 min. In-place 90° rotation via transpose + reverse.
6. ☐ **Spiral Matrix** (LC 54, Medium) — 15 min. Layer-by-layer boundary shrink.
7. ☐ **Happy Number** (LC 202, Easy) — 10 min. Floyd's cycle detection on digit-sum sequence.

**Priority 4 — SD: Weak-spot drilling (75 min, needs a contiguous block)**
8. ☐ Xu Vol 2 — read the chapter closest to your weakest mock topic (Proximity Service if geo patterns are weak, Metrics Monitoring for time-series/aggregation, or Hotel Reservation for booking/concurrency). (35 min)
9. ☐ Re-attempt that weakest SD topic from mocks 1–4 fully, applying what you just read. Compare to v1. (40 min)

### Thu May 14 — 1.5 h *(oncall ends at noon — do this session in the afternoon)*
- 15 min: Flashcards — all SD decks fast pass (including Deck 12 Q17–Q28 at +14d)
- 75 min: SD problem — Design a search autocomplete / typeahead (timed 45 min). Apply: WebSocket event contract for streaming suggestions, API response shapes, cursor-based pagination for history.

### Fri May 15 — 1.5 h
- 15 min: Flashcards — Arrays & Hashing (+30d, final)
- 75 min: LC — Advanced Graphs sampler: Network Delay Time (Dijkstra) + Reconstruct Itinerary (Hierholzer). Know Dijkstra cold.

### Sat May 16 — 3 h
- 30 min: Flashcards — Deck 12 Q17–Q28 (+14d) + Heap (+21d) + Intervals (+21d) + Graphs (+21d)
- 10 min: **Pre-mock review** — read `Mock-Practice-Notes.md` themes index. By now you have 4 mocks logged — check which themes keep appearing. These are your real weak spots vs. one-off mistakes.
- 110 min: **SD Mock #5** — full 60-min peer mock (book this by Tue May 12). 50 min of self-review afterward. Post-mock: add entry to `Mock-Practice-Notes.md`.
- 30 min: LC — **Binary Tree Maximum Path Sum** (LC 124, Hard, Trees) — confident topic, should be clean by now.

### Sun May 17 — 3 h
- 30 min: Flashcards — 1-D DP (+21d) + SD Replication (+14d) + Consistency/CAP (+7d)
- 90 min: 2 mediums timed (45 min each, no hints):
  - **Container With Most Water** (LC 11, Two Pointers) — classic two-pointer speed test.
  - **Word Search** (LC 79, Backtracking) — grid DFS with visited tracking.
- 60 min: Behavioral prep — write 4–6 STAR stories from your Azure SDN work. Cover: conflict, ambiguity, driving change, scope creep, failure, mentoring.

**End of Week 5:** All NeetCode 150 topics touched. 5 SD mocks done. STAR bank started.

---

# Week 6: May 18 – May 24

**DSA focus:** Mixed-topic interview simulations, weak-spot drilling
**SD focus:** 2 more mocks + polish
**Behavioral:** STAR rehearsal
**Goal:** Walk into week 7 application-ready.

### Mon May 18 — 1.5 h
- 15 min: Flashcards — Intervals deck (new, from your own notes) + Greedy deck (new)
- 75 min: **Full LC interview sim** — strict timing, no hints:
  - **Group Anagrams** (LC 49, Medium, Arrays & Hashing) — 20 min. Should be instant.
  - **Word Search II** (LC 212, Hard, Backtracking + Tries) — 40 min. Trie-based pruning on a grid.

### Tue May 19 — 1.5 h
- 15 min: Flashcards — all SD decks fast pass (Deck 12 Q17–Q28 at +21d — should feel automatic by now)
- 75 min: SD problem — Design YouTube/video streaming (timed 45 min). Apply: pre-signed uploads for video, blob storage references, API response shapes.

### Wed May 20 — 1.5 h
- 15 min: Flashcards — Heap (+30d) + DP decks (new)
- 75 min: LC — 2 mediums from the newest (likely weakest) topics:
  - **Target Sum** (LC 494, Medium, DP) — 2-D DP reinforcement, knapsack variant.
  - **Cheapest Flights Within K Stops** (LC 787, Medium, Graphs) — Bellman-Ford / BFS with constraints.

### Thu May 21 — 1.5 h
- 15 min: Flashcards — Behavioral STAR recall (speak each story out loud in < 2 min)
- 75 min: SD problem — Design a notification system (timed 45 min). Key connection: notification ≠ delivery (WhatsApp mock lesson). Design for offline catchup with per-device offsets, not just push.

### Fri May 22 — 1.5 h
- 15 min: Flashcards — Linked List (+30d) + Graphs (+30d)
- 75 min: LC — **Longest Increasing Path in a Matrix** (LC 329, Hard, DFS + Memoization). Full write-up — combines graph traversal and DP, two areas that benefit from reinforcement.

### Sat May 23 — 3 h
- 30 min: Flashcards — SD Replication (+21d) + Consistency/CAP (+14d) + Intervals (+30d, from own notes) + Greedy (+3d)
- 10 min: **Pre-mock review** — `Mock-Practice-Notes.md` final themes check. Any theme that appeared in 3+ mocks = drill it one more time before the mock.
- 80 min: **SD Mock #6** — peer mock, pretend it's on-site. Post-mock: add entry to `Mock-Practice-Notes.md`.
- 60 min: LC — timed:
  - **Palindromic Substrings** (LC 647, Medium, DP) — expand-around-center, 20 min.
  - **Alien Dictionary** (LC 269, Hard, Topological Sort) — builds on Course Schedule pattern, 40 min.

### Sun May 24 — 3 h
- 30 min: Flashcards — final sweep (Deck 12 Q17–Q28 at +30d — mark mature if instant)
- 90 min: **SD Mock #7** — solo timed, pick a design you haven't done yet (e.g., Dropbox, Uber). Post-mock: final `Mock-Practice-Notes.md` entry.
- 60 min: Final behavioral rehearsal + resume/LinkedIn polish.

**End of Week 6:** Ready to apply starting Mon May 25.

> *What actually happened:* Week 6 was mostly skipped. Behavioral stories got done, flashcards stayed warm with light reading, and mocks continued. Good enough to enter the application phase — Phase 2 below picks up from here.

---

# Phase 2: Application & Interview Readiness (Jun 1 onward)

**Status:** Applying now. This is a **focused 3-week sprint (Jun 1 – Jun 21)** to close the four gaps the mocks exposed before interviews ramp up. After Jun 21, revert to a light maintenance loop between interviews (flashcards warm + 1 mock/week).

**The shift:** Weeks 1–6 were about *learning*. Phase 2 is about *staying sharp*, *reviewing the high-ROI core*, and *closing the four gaps the mocks exposed.* The spine is **~50/50**: **~2 canonical SD designs per week** (math done every time) + **a mock every Saturday**, balanced with **deliberate DSA coverage** — both reviewing the common, high-frequency NeetCode topics (arrays, two pointers, trees, graphs, binary search, DP — these get asked far more than exotic patterns, so they get the most reps) *and* quick refreshers on edge variations whose *idea* you already have but whose step-by-step trips you up — the stack-based expression eval you blanked on in the mock is the archetype (you knew to reach for a stack, you just couldn't execute it cleanly under pressure). The goal is **fluency on algorithms you mostly know**, not learning complicated low-probability concepts from scratch — anything that smells like a brand-new hard concept (e.g., interval DP) is out. Coding-process drills (narration, fallback, 90-sec opening) ride on top of the DSA problems rather than taking their own slots.

> **🎯 Role tailoring — Google Senior SWE, Platforms Infrastructure Engineering (Seattle):**
> - **Coding bar is unchanged** — Google holds the same algorithmic bar regardless of team, so the DSA plan stands as-is.
> - **System design leans infrastructure**, not product — swapped YouTube/Uber out for **Distributed Cache** (Wk8 Mon) and **Distributed KV store** (Wk9 Wed). Kept crawler, message queue, job scheduler, Ticketmaster.
> - **Concurrency bumped up** (more relevant for infra than a generic L5): a thread-safe-LRU coding rep (Wk7 Thu) + a concept block (Wk8 Sun).
> - **Lean on your background** — Azure SDN control plane = distributed systems, consistency, replication, coordination. This is a real edge in the design + domain-depth ("RRK") + behavioral rounds. Make your STAR stories foreground the hard distributed-systems work.
> - **DDIA fundamentals matter more here** — consensus (Raft/Paxos), replication, partitioning, consistency models, fault tolerance. Be able to explain them cold.

## Top gaps from mocks (priority order)

1. **Estimation DRIVES design** — appeared in all 4 SD mocks (as "NFR precision" then blatantly in the crawler mock). You compute fine; you don't *use* the numbers to justify decisions. **Cheapest, highest-frequency fix — make it a reflex.**
2. **Canonical SD pre-reading** — highest-ROI floor-raiser. Finite set (~15). A familiar problem is where your communication, estimation, and defense all look best.
3. **Concrete mechanisms + defend under pressure** — describe the actual algorithm/keys, name every component, hold your ground when challenged.
4. **Coding process** — 90-second opening (clarify before coding), narration muscle (trace examples, don't go silent), fallback protocol (brute force → pattern checklist → ask).

## Non-negotiable daily habit

**Every SD touch this sprint starts the same way:** after requirements, convert the given numbers → **QPS + storage + bandwidth**, then say out loud *"so that means N servers / X storage tier."* This is gap #1 and it's baked into every design day below. If you skip it, the day doesn't count.

---

## Week 7: Jun 1 – Jun 7 — Crawler + queue · parsing/design patterns · core review

**DSA focus:** Review core (Arrays & Hashing, Two Pointers) + close the parsing/expression and design/simulation gaps the mock exposed
**SD focus:** Web Crawler (failed mock), Distributed Message Queue

### Mon Jun 1 — 1.5 h *(SD)*
- 15 min: Flashcards — SD: Messaging, Streaming & Real-time deck (Deck 14) — on-theme for the queue/crawler work
- 75 min: SD — **Web Crawler** (the failed mock — do this one first). Math first: 20B pages / 7d ≈ **33k pages/sec**, ~**20 PB** → S3 not cold storage. Politeness via **domain-partitioned queue** (interleave or hash-channel). Label & defend every component; **cut the URL DB if you can't justify it.** Write a 1-page reference answer.

### Tue Jun 2 — 1.5 h *(DSA — core review + narration)*
- 15 min: Flashcards — Arrays & Hashing deck
- 75 min: LC — **Core review (Arrays & Hashing + Two Pointers — your most-asked topics) + Narration Stage 1.** Re-solve 3 you know cold (Group Anagrams, Valid Palindrome, Container With Most Water), speaking the entire time, timer on. Then drill the 90-second opening (restate → clarify → approach) on each. Zero solving load — 100% on the talking muscle.

### Wed Jun 3 — 1.5 h *(DSA — fluency drill, your mock gap)*
- 15 min: Flashcards — Stack deck
- 75 min: LC — **Stack-based expression evaluation** (exactly what you blanked on — you had the stack idea, just drill the step-by-step). **Evaluate Reverse Polish Notation** (LC 150) → **Basic Calculator II** (LC 227, the stack implementation). Then **Different Ways to Add Parentheses** (LC 241) as the divide-and-conquer variation. Goal: clean execution, not new theory.

### Thu Jun 4 — 1.5 h *(Design/sim + OOP modeling + concurrency coding rep)*
- 15 min: Flashcards — weakest DSA deck
- 75 min: LC — **LRU Cache** (LC 146): build it clean (HashMap + doubly-linked list), then **make it thread-safe** — this is your one **concurrency coding rep** (lock around map+list, or lock striping; be ready to say why a single coarse lock kills throughput). **OOP/LLD micro-review (~10 min):** ask *"can this class reach an invalid state?"* → constructor validation or a small type hierarchy (the exact gap from your coding mock — the Expression class with `isLeaf` + operator both set). Narration on throughout.

> *Multithreading — revised for the Platforms Infrastructure role:* concurrency is **more** relevant here than for a generic L5. You still likely won't write heavy thread-safe code in the coding round, but it can surface in design and a domain-depth discussion. Coverage = this thread-safe-LRU rep + the concept block on Sun Jun 14. Know cold: locks vs lock-free/atomics (CAS), race conditions & data races, the memory model (happens-before), thread pools, producer/consumer + backpressure, processes vs threads.

### Fri Jun 5 — 1.5 h *(SD)*
- 15 min: Flashcards — SD: Fundamentals & Estimation deck (Deck 9)
- 75 min: SD — **Distributed Message Queue** (Kafka-style). Math first. Partitions & ordering, consumer groups, at-least-once, retention. Directly closes the "name & justify Kafka vs SQS/RabbitMQ" gap. Reference answer.

### Sat Jun 6 — 3 h
- 30 min: Flashcards — **pre-mock prime:** SD Fundamentals & Estimation (Deck 9) + Situational Drills (Deck 23)
- 10 min: **Pre-mock review** — `Mock-Practice-Notes.md` themes index. If estimation appears in 3+ mocks, drill it once more.
- 80 min: **SD Mock #5** — peer/paid. Pick a cold design (e.g., Dropbox or notification). **Lead with the numbers.** Post-mock → notes.
- 60 min: LC — 1 medium + 1 hard, narration on.

### Sun Jun 7 — 3 h
- 30 min: Flashcards — first pass: SD Replication, Partitioning & Consistency (Deck 11) + Caching, CDN & Hashing (Deck 13)
- 60 min: **Estimation drill** — 3 cold problems, convert numbers → fleet/storage/bandwidth out loud (Twitter reads QPS, YouTube storage/yr, WhatsApp msg/sec).
- 60 min: SD — turn the crawler + message queue designs into clean 1-page reference notes (math included).
- 30 min: Behavioral — speak 3 STAR stories, < 2 min each.

**End of Week 7:** Crawler + Message Queue reference answers done. Parsing & design/simulation gaps closed. Core arrays/two-pointers warm. Mock #5 logged.

---

## Week 8: Jun 8 – Jun 14 — Distributed cache + scheduler · advanced graphs · two-heaps · concurrency

**DSA focus:** Advanced Graphs (Union-Find, Dijkstra) + Heap/two-heaps + core Trees & Graph BFS/DFS review + fallback drill
**SD focus:** Distributed Cache (infra), Distributed Job Scheduler

### Mon Jun 8 — 1.5 h *(SD — infra)*
- 15 min: Flashcards — SD: Caching, CDN & Hashing deck (Deck 13)
- 75 min: SD — **Distributed Cache** (memcached/Redis at scale — core infra, on-theme for Platforms). Math first (working-set size, QPS, memory footprint). Consistent hashing for sharding, replication, eviction (LRU/LFU/TTL), hot-key handling, write policies (write-through vs write-back), coherence/invalidation. Reference answer.

### Tue Jun 9 — 1.5 h *(DSA — missed family + fallback)*
- 15 min: Flashcards — Graphs deck
- 75 min: LC — **Advanced Graphs: Union-Find** (mostly untouched). **Number of Connected Components** (LC 323) + **Redundant Connection** (LC 684); learn the find+union-by-rank template cold. Then run the **fallback protocol** on 1 unfamiliar problem (brute force → pattern checklist → ask). Stretch: Dijkstra via Network Delay Time (LC 743).

### Wed Jun 10 — 1.5 h *(DSA — missed family + core)*
- 15 min: Flashcards — Heap deck
- 75 min: LC — **Two-Heaps pattern + core Heap review.** **Find Median from Data Stream** (LC 295 — the two-heaps problem, a senior favorite). Then refresh core heap: **Kth Largest Element** (LC 215) and recall the Merge K / Task Scheduler approaches.

### Thu Jun 11 — 1.5 h *(SD)*
- 15 min: Flashcards — SD: Coordination & Transactions deck (Deck 12)
- 75 min: SD — **Distributed Job Scheduler**. Math first. Sorted-set scheduling, leader election, at-least-once, failure recovery. Reference answer.

### Fri Jun 12 — 1.5 h *(DSA — core review, highest-frequency)*
- 15 min: Flashcards — Trees deck
- 75 min: LC — **Core Trees + Graph BFS/DFS** (the most-asked topics in real interviews — give them the most reps). **Number of Islands** (LC 200) + **Binary Tree Level Order** (LC 102) + **Lowest Common Ancestor** (LC 236) + **Clone Graph** (LC 133). Narration on.

### Sat Jun 13 — 3 h
- 30 min: Flashcards — **pre-mock prime:** SD Fundamentals & Estimation (Deck 9) + Situational Drills (Deck 23)
- 10 min: **Pre-mock review** — themes index.
- 80 min: **SD Mock #6** — peer, cold design. Lead with numbers, label every component, hold ground under pushback. Post-mock → notes.
- 60 min: LC — 1 medium + 1 hard, narration on.

### Sun Jun 14 — 3 h
- 30 min: Flashcards — first pass: SD Networking & Load Balancing (Deck 15) + Reliability, Observability & Deployment (Deck 16)
- 45 min: **Estimation drill** — 3 more cold problems.
- 60 min: **Concurrency & OS/systems concepts review** *(for the infra design + depth rounds)* — locks vs lock-free/atomics (CAS), race conditions & data races, memory model / happens-before, thread pools & executors, producer/consumer + backpressure, processes vs threads, async/non-blocking I/O, deadlock vs livelock. Be able to explain each in 1–2 sentences and name where it shows up. *(This + Thu's thread-safe LRU = your full concurrency coverage.)*
- 45 min: SD reference notes (Distributed Cache + Job Scheduler) + 2 STAR stories.

**End of Week 8:** Distributed Cache + Scheduler reference answers done. Union-Find + two-heaps closed. Core trees/graphs warm. Concurrency concepts reviewed. Mock #6 logged.

---

## Week 9: Jun 15 – Jun 21 — Ticketmaster + KV store · DP + binary search/sliding window · sims

**DSA focus:** Core 1-D DP, Binary Search, Sliding Window review (+ one tricky-implementation DP rep) + full interview sims
**SD focus:** Ticketmaster (concurrency), Distributed Key-Value Store (infra)

### Mon Jun 15 — 1.5 h *(SD)*
- 15 min: Flashcards — SD: Replication, Partitioning & Consistency deck (Deck 11)
- 75 min: SD — **Ticketmaster** (booking/concurrency). Math first. Seat-hold with TTL, strong consistency at checkout, no oversell. Reference answer.

### Tue Jun 16 — 1.5 h *(DSA — core DP review + one tricky-implementation rep)*
- 15 min: Flashcards — 1-D DP deck
- 75 min: LC — **Core DP you already know — drill the implementation; skip exotic interval DP (low ROI).** **Coin Change** (LC 322) + **House Robber** (LC 198) + **Longest Increasing Subsequence** (LC 300), then **Decode Ways** (LC 91 — the classic *you know it's DP but the 0s and two-digit cases trip the step-by-step*). *(Book the Sat peer mock today.)*

### Wed Jun 17 — 1.5 h *(SD — infra)*
- 15 min: Flashcards — SD: Data Storage & Modeling deck (Deck 10)
- 75 min: SD — **Distributed Key-Value Store** (Dynamo/Bigtable-style — core infra). Math first. Partitioning (consistent hashing), replication, quorum reads/writes (R + W > N), tunable consistency, conflict resolution (vector clocks / LWW), LSM-tree storage, anti-entropy/read-repair. Reference answer.

### Thu Jun 18 — 1.5 h *(DSA — core review, high-frequency)*
- 15 min: Flashcards — Binary Search + Sliding Window decks
- 75 min: LC — **Core Binary Search + Sliding Window** (both extremely common — high ROI). **Search in Rotated Sorted Array** (LC 33) + **Koko Eating Bananas** (LC 875, flagged F8) + **Longest Substring Without Repeating** (LC 3) + **Minimum Window Substring** (LC 76). Narration on.

### Fri Jun 19 — 1.5 h *(DSA — full sim)*
- 15 min: Flashcards — Behavioral STAR recall
- 75 min: LC — **Full LC interview sim** (1 medium in 20 min + 1 hard in 40 min, mixed/random topic, strict timing, narration on). Then 15 min re-reading the `Mock-Practice-Notes.md` themes index for the defend-under-pressure habit.

### Sat Jun 20 — 3 h
- 30 min: Flashcards — **pre-mock prime:** SD Fundamentals & Estimation (Deck 9) + Situational Drills (Deck 23)
- 10 min: **Pre-mock review** — themes index, final gap check.
- 110 min: **SD Mock #7** — full 60-min on-site sim (book a peer by Tue Jun 16) + 50 min self-review. By now it should feel automatic: numbers first, components labeled, hold ground. Post-mock → notes.
- 30 min: LC — 1 hard from a confident topic.

### Sun Jun 21 — 3 h
- 30 min: Flashcards — final sweep: fast pass over your weakest SD decks, esp. Fundamentals & Estimation (Deck 9) + Situational Drills (Deck 23)
- 90 min: 2 mixed mediums timed, narration on.
- 60 min: Final themes-index review + behavioral final rehearsal + resume/LinkedIn polish.

**End of Week 9:** Core DSA (DP, binary search, sliding window) refreshed. Ticketmaster + Distributed KV store reference answers done. Concurrency covered. 3 more mocks logged (5, 6, 7). Drop to maintenance loop after Jun 21.

## Coverage trackers

**Canonical SD designs** — reference answer written *(infra-tilted for the Platforms role):*
- [x] URL shortener ✅ · [x] Chat/WhatsApp ✅ · [x] Rate limiter ✅ · [x] Payment ✅ *(all prior)*
- [ ] Web crawler *(Wk7 Mon)* · [ ] Message queue *(Wk7 Fri)* · [ ] **Distributed cache** *(Wk8 Mon)* · [ ] Job scheduler *(Wk8 Thu)* · [ ] Ticketmaster *(Wk9 Mon)* · [ ] **Distributed KV store** *(Wk9 Wed)*
- *Optional / lower-priority (familiar or defer to maintenance loop):* News feed *(you know this)*, YouTube, Uber/proximity, Autocomplete, Dropbox/file sync, Notification, Ad-click aggregation
- *If time in maintenance loop, add more infra:* distributed file system (GFS/Colossus), load balancer, service discovery / config, metrics & monitoring pipeline

**Concurrency / systems (infra-role specific):**
- [ ] Thread-safe LRU coding rep *(Wk7 Thu)* · [ ] Concurrency & OS/systems concept block *(Wk8 Sun)*

**DSA coverage** — core review (high-ROI) + fluency drills on patterns you already know:
- *Core review:* [ ] Arrays & Hashing + Two Pointers *(Wk7 Tue)* · [ ] Trees + Graph BFS/DFS *(Wk8 Fri)* · [ ] Heap *(Wk8 Wed)* · [ ] 1-D DP *(Wk9 Tue)* · [ ] Binary Search + Sliding Window *(Wk9 Thu)*
- *Fluency drills (idea known — drill the implementation):* [ ] Stack-based expression eval — RPN, Basic Calculator *(Wk7 Wed)* · [ ] Design / simulation — LRU, Min Stack *(Wk7 Thu)* · [ ] Union-Find template *(Wk8 Tue)* · [ ] Two-heaps — Median from Data Stream *(Wk8 Wed)* · [ ] Decode Ways — tricky known DP *(Wk9 Tue)*
- *Process drills (ride on top):* Narration Stage 1 *(Wk7 Tue)* · Stage 2 *(Wk7 Thu)* · Fallback *(Wk8 Tue)* · Full sim *(Wk9 Fri)*

## After the sprint (Jun 22+) — maintenance loop

Between interviews, run a light weekly cycle: flashcards warm (2–3 × 15 min), 1 SD mock (cold design, numbers-first), 1 coding session (narration on), 1 behavioral rehearsal. Before any real interview: read the `Mock-Practice-Notes.md` themes index and drill anything that appeared in 3+ mocks.

---

## Metrics to track (keep a running log)

- LC problems solved, by topic, by difficulty
- LC "first-try correct" rate (target > 60% on mediums in completed topics by end of Week 4)
- SD mocks done + entry in `Mock-Practice-Notes.md` for each (check themes index for recurring gaps)
- Flashcard deck completion (first pass + review count)
- DDIA chapters fully absorbed (able to explain without notes)
- STAR stories polished (target: 6 by Week 6)

## If you fall behind

Triage in this order:
1. **Keep the Saturday mock.** Always.
2. **Keep the daily 15-min flashcard warm-up.** It's the compounding asset.
3. **Drop a weekday main block over dropping review.** Review > new content.
4. **Skip weekend #2 (Sunday) before skipping #1 (Saturday).**

## Apply criteria (gate before Week 7)

Before sending applications, you should be able to:
- Solve any NeetCode 150 medium in ≤ 25 min with ≥ 60% first-pass success.
- Complete a 45-min SD mock covering requirements → estimation → API → data model → HLD → deep-dive → tradeoffs, with your peer-rated score ≥ "hire" on ≥ 2 of your last 3 mocks.
- Recite 6 STAR stories in under 2 min each, without notes.
- Explain CAP, replication lag, LSM vs B-tree (including write amplification), consistent hashing, when to reach for consensus (and its costs), load balancing strategies, and the three pillars of observability — without opening DDIA.

---

See the **About this plan** section at the top for a full list of companion files. The flashcard decks cover all 14 DSA topics, 8 System Design topic decks, and a situational-drills deck (24 decks, 256 cards). Add new decks as you complete each new topic.

---

## Appendix: Flagged Problem Re-solve Schedule

Every problem you flagged appears at least twice in the calendar above (once in the relevant topic week, once in a later review), plus in Deck 0 of the flashcards at every warm-up. This table gives you the full queue at a glance so you can find them without scrolling.

| Problem | Topic | First re-solve | Second re-solve | Deck 0 card |
|---|---|---|---|---|
| Top K Frequent Elements | Arrays & Hashing | **Week 1 Sun** (timed) | Week 3 Fri (mixed review) | F1 |
| Encode and Decode | Arrays & Hashing | **Week 1 Sun** (timed) | Week 3 Fri | F2 |
| Longest Consecutive Sequence | Arrays & Hashing | **Week 1 Sun** (timed) | Week 3 Fri | F3 |
| 3Sum | Two Pointers | **Week 2 Wed** (timed) | Week 4 Fri | F4 |
| Trapping Rain Water | Two Pointers | **Week 2 Wed** (timed) | Week 4 Fri | F5 |
| Daily Temperatures | Stack | **Week 1 Thu** | Week 3 Fri | F6 |
| Largest Rectangle in Histogram | Stack | **Week 1 Sun** (timed) | Week 3 Mon | F7 |
| Koko Eating Bananas | Binary Search | **Week 2 Mon** (timed) | Week 4 Wed | F8 |
| Median of Two Sorted Arrays | Binary Search | **Week 2 Mon** (timed) | Week 5 Mon | F9 |
| Longest Repeating Char Replacement | Sliding Window | **Week 2 Sun** (timed) | Week 4 Fri | F10 |
| Sliding Window Maximum | Sliding Window | **Week 1 Sat** | Week 4 Sun | F11 |
| Remove Nth Node from End | Linked List | **Week 1 Tue** | Week 3 Wed | F12 |
| Find the Duplicate Number | Linked List | **Week 2 Fri** | Week 4 Wed | F13 |
| Merge K Sorted Lists | Heap | **Week 1 Thu** | Week 3 Sat | F14 |
| Task Scheduler | Heap / Priority Queue | **Week 1 Sat** (both approaches) | Week 3 Thu | F15 |
| Kth Smallest in BST | Trees | **Week 1 Sun** | Week 3 Mon | F16 |
| Serialize/Deserialize Binary Tree | Trees | **Week 1 Sun** | Week 4 Mon | F17 |
| N-Queens | Backtracking | **Week 2 Mon** | Week 4 Mon | F18 |
| Course Schedule | Graphs | **Week 2 Wed** | Week 4 Mon | F19 |
| Graph Valid Tree | Graphs | **Week 2 Fri** | Week 4 Thu | F20 |
| Maximum Product Subarray | 1-D DP | **Week 3 Fri** | Week 5 Wed | F21 |
| Reorder List | Linked List | **Week 1 Tue** | Week 3 Wed | F22 |

**Bold** = earliest scheduled re-solve (Week 1 or 2). All are incorporated into later review days organically. If you want to accelerate any of these, substitute one of the "pick from completed list" timed sessions with a flagged problem.
