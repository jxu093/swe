# Amazon LP → Story Map

Each Leadership Principle shows its common question forms, which story to lead with, the beat to emphasize, and the backup. Full story details live in `behavioral_story_bank.md`.

---

## 1. Customer Obsession
*Leaders start with the customer and work backwards. They never let internal process or competitor focus displace the customer.*

**Common question forms:**
- Tell me about a time you went above and beyond for a customer.
- Describe a time you used customer feedback to improve a product.
- Tell me about a time you prioritized customer needs over internal process.
- Tell me about a time you advocated for the customer when others pushed back.

| Priority | Story | Beat to emphasize |
|---|---|---|
| **Lead** | **#11 — Orphaned incident** | You had a legitimate out (not your team's issue, had already bounced) and chose to own it to closure anyway — the customer's outcome over the convenient hand-off. |
| Alt | **#3 — FastPath** | 90%+ provisioning speed improvement and 1M+ VMs migrated — customer-facing impact at Azure scale. Frame as: "the original system was making customers slower than AWS." |
| Alt | **#12 — Partner team on-call** | Customer got a working fix faster because you stayed engaged beyond your obligation. |

**Watch-out:** #11 is customer-*adjacent* (you drove to a real owner; you didn't fix the technical issue yourself). If pushed for "advocated against pressure to fix something bad for the customer" specifically, you need the open customer-complaint story (still a gap).

---

## 2. Ownership
*Leaders act on behalf of the entire company. They never say "that's not my job." They take accountability.*

**Common question forms:**
- Tell me about a time you took ownership of something outside your job description.
- Tell me about a time you took accountability for a failure or mistake.
- Describe a time you saw a problem and fixed it without being asked.
- Tell me about a time you took ownership beyond your scope and what the result was.

| Priority | Story | Beat to emphasize |
|---|---|---|
| **Lead** | **#11 — Orphaned incident** | The playbook gave you an exit; you stayed. Ownership over convenience. *(home for Q30/Q25 — "took ownership beyond scope")* |
| Strong alt | **#14 — VM Delete API leak-detection** | You discovered the leak yourself via manual scan (no monitoring existed), then escalated to on-calls, leadership, and Compute and paused your own rollout — even though it blocked other teams' changes. *Proactive accountability act, in the moment, with visible consequences.* |
| Alt | **#3 — FastPath** | Took ownership of a program-level re-architecture risk; didn't wait for a manager to tell you the RNM model needed a drastic fix. |

**#14 is your cleanest "took responsibility for a mistake" answer** — you found it, you raised it publicly, it cost you and others. Now fully written up in `behavioral_story_bank.md` (Story #14).

---

## 3. Invent and Simplify
*Leaders expect innovation and always find ways to simplify. They are not limited by "not invented here."*

**Common question forms:**
- Tell me about a time you invented a creative solution to a hard problem.
- Describe a time you simplified a complex or risky process.
- Tell me about a time you found a novel way to solve an old problem.

| Priority | Story | Beat to emphasize |
|---|---|---|
| **Lead** | **#1 — CCSH** | Replaced a risky PubSub migration with a one-line overload of an existing API — same result, fraction of the complexity. Simplification *was* the judgment call. |
| Alt | **#3 — FastPath** | Removed RNM entirely rather than continuing to optimize it — a genuine architectural inversion, not an iteration. |
| Alt | **#10 — VIP race** | Invented a guard-railed auto-remediation script under pressure: fully automated at night, supervised during the day, with an append-only audit log. Simplest thing that could safely hold the line. |

---

## 4. Are Right, A Lot
*Leaders have strong judgment and good instincts. They seek diverse perspectives and work to disconfirm their beliefs.*

**Common question forms:**
- Tell me about a time you had conviction about a technical direction and were proven right.
- Describe a time you made a difficult call others doubted, and how it turned out.
- Tell me about a time your judgment led you to a correct decision.

| Priority | Story | Beat to emphasize |
|---|---|---|
| **Lead** | **#2 — Delete VM API** | Pushed for the IaaS modernization over pushback. ~A year later, Compute's new single-VM stack adopted it immediately — confirmation the bet was right. Frame the year-later adoption as *confirmation*, not the original justification. |
| Alt | **#3 — FastPath gRPC sub-beat** | Pushed for gRPC over WCF when it was contested, backed it with k6 benchmarks (3x latency win), earned buy-in with data. |
| Alt | **#1 — CCSH** | Called the de-scope when the PubSub approach was heading for a miss; the simpler path shipped in a month with no issues. |

**Watch-out:** several stories end with "I was right." Be ready for an "Are Right, A Lot" follow-up: *"Tell me about a time you were wrong."* **Lead with #17 (FastPath eligibility-check regression)** — it's the one story where someone else's read beat yours (coworkers suspected your change, you initially disagreed, they were right), not a self-discovered mistake like #7 (RNM) or #10 (VIP misjudgment). #17 is the cleanest fit for "seek diverse perspectives and work to disconfirm their beliefs" specifically.

---

## 5. Learn and Be Curious
*Leaders are never done learning. They are curious about new possibilities and act on them.*

**Common question forms:**
- Describe a recent learning experience and how you applied it.
- Tell me about a time you learned something from a colleague.
- How do you keep up with technology? Give me a recent example.
- Tell me about a time you sought knowledge outside your area.

| Priority | Story | Beat to emphasize |
|---|---|---|
| **Lead** | **Learning answer** *(structured, non-STAR)* | Lead with the breadth: multiple methods, flex by situation. Use a real onboarding mini-story (FastPath gRPC, or learning a new stack) as a 2-sentence anchor. |
| Alt | **#7 → #1 arc** | Learned from the RNM follow-through failure, applied it directly on CCSH. "I carried that lesson: if a fallback removes the urgency to finish, build the forcing function to remove it." |
| Alt | **#3 — FastPath gRPC sub-beat** | Learned gRPC specifically for the job, benchmarked it to win a contested call. Shows curiosity tied to a real outcome. |

---

## 6. Hire and Develop the Best
*Leaders raise the performance bar. They develop leaders and take coaching seriously.*

**Common question forms:**
- Tell me about a time you mentored or coached someone to a result.
- Describe a time you helped someone grow professionally.
- Tell me about a time you invested in someone who was struggling.
- Give me an example of raising the performance bar on your team.

| Priority | Story | Beat to emphasize |
|---|---|---|
| **Lead** | **#5 — Coaching the plateaued engineer** | Diagnosed *why* a 2-year engineer had stalled (executing without understanding the why), then 4 distinct deliberate interventions. He went from tasks he couldn't explain to owning a critical customer-facing tool end-to-end. |
| Alt | **#4 — India team** | Structured ramp for 6 engineers across a 13-hour timezone gap → self-sufficient and on-call in 3–6 months, team has since grown to 12. |

**Watch-out:** if asked "how did he/she perform long-term?" have the one-liner ready: *"He later left the company for reasons outside our work together — the growth was real regardless."*

---

## 7. Insist on the Highest Standards
*Leaders have relentlessly high standards. Problems are fixed so they stay fixed.*

**Common question forms:**
- Tell me about a time you maintained high standards when others were willing to cut corners.
- Describe a time you pushed back on a quality issue.
- Tell me about a time you prevented a defect from going to production (or caught one after it did).
- Give me an example of raising the quality bar on a project.

| Priority | Story | Beat to emphasize |
|---|---|---|
| **Lead** | **#14 — VM Delete API leak-detection** | No stable monitoring existed, but you built and ran manual leak scans yourself. Discovered VM metadata leaking from a Compute-side contract gap, escalated, and paused the rollout before it spread past the first region. Didn't wait for tooling or for the defect to grow. |
| Alt | **#3 — FastPath** | Quality drive: e2e tests, test-case spreadsheets, a full-day bug bash — raised the bar before migration of 1M+ VMs. |
| Alt | **#2 — Delete VM API** | Refused to bolt onto the legacy PaaS model when a better design was achievable. The original ask was a small cleanup signal; you held to a higher standard. |

---

## 8. Think Big
*Leaders create bold direction. They think differently and look around corners.*

**Common question forms:**
- Tell me about a time you proposed a bold idea or ambitious vision.
- Describe a time you thought bigger than the immediate ask.
- Tell me about a time you set an ambitious goal and achieved it.

| Priority | Story | Beat to emphasize |
|---|---|---|
| **Lead** | **#3 — FastPath** | The architectural call itself: don't optimize the RNM hop — remove RNM entirely. Multi-year, multi-team, 1M+ VM migration. The thinking-bigger signal is choosing to *remove* a service others would have kept patching. |
| Alt | **#2 — Delete VM API** | The ask was "give us a cleanup signal." You thought bigger: full IaaS model, modernized contract, set the platform up for the next generation. |

---

## 9. Bias for Action
*Speed matters. Many decisions are reversible. We value calculated risk-taking.*

**Common question forms:**
- Tell me about a time you made a decision without complete information.
- Describe a time you took action before being asked.
- Tell me about a time you moved quickly and it paid off (or cost you something).
- Give me an example of taking a calculated risk.

| Priority | Story | Beat to emphasize |
|---|---|---|
| **Lead** | **#1 — CCSH** | Called the de-scope when the project was heading for a miss — didn't wait for permission or consensus; proposed the simpler path, got buy-in, shipped in a month. |
| Alt | **#10 — VIP race** | Wrote and deployed an auto-remediation script while the hotfix was still weeks out. Calculated risk: got team buy-in on the tradeoff, added guardrails (day-supervised, night-automated, audit log). |
| Alt | **#11 — Orphaned incident** | Acted when the playbook failed and no one else was stepping up. The bias-for-action framing: "I didn't need permission to own a customer's problem to closure." |
| Alt | **#9 — MAC depletion** | Drove three mitigation fronts in parallel under live incident pressure before root cause was fully established. |

---

## 10. Frugality
*Accomplish more with less. Constraints breed resourcefulness.*

**Common question forms:**
- Tell me about a time you accomplished more with fewer resources.
- Describe a time you found a more cost-effective or efficient solution.
- Tell me about a time you had to do something with limited budget/headcount.

| Priority | Story | Beat to emphasize |
|---|---|---|
| **Lead** | **#3 — FastPath** | Kept the NRP Allocate API contract unchanged (zero changes to CRP — an entire Compute team). Reused existing code where it made sense. The efficient path: clean re-implementation behind a stable boundary, not a costly wholesale rewrite. |
| Alt | **#1 — CCSH** | Got the same outcome (goal state delivery to clusters) with an API overload instead of a full PubSub integration — days of work vs. weeks of environment issues. |

**Note:** Frugality is rarely a standalone question at the SWE level. More likely surfaces as "what tradeoffs did you make?" or "how did you scope it?" — blend it into FastPath or CCSH when relevant.

---

## 11. Earn Trust
*Leaders are vocally self-critical. They listen, speak candidly, treat others respectfully.*

**Common question forms:**
- Tell me about a time you were transparent about a failure or mistake with stakeholders.
- Describe a time you delivered difficult news honestly.
- Tell me about a time you were vocally self-critical, even when it was uncomfortable.
- Give me an example of building trust with a difficult colleague or team.

| Priority | Story | Beat to emphasize |
|---|---|---|
| **Lead** | **#14 — VM Delete API leak-detection** | Self-discovered a metadata leak from a Compute-side contract gap during rollout. Escalated to on-calls, leadership, and Compute, then paused the rollout — stopping a release that blocked others. Transparent, immediate, no deflection. The act of surfacing (not just the learning) is the signal. |
| Strong alt | **#17 — FastPath eligibility-check regression** | Told coworkers directly "I was wrong, it's my code" after initially (honestly) dismissing their suspicion. Candor toward *colleagues*, not just leadership — a distinct trust-building angle from #14. |
| Alt | **#7 — RNM failure** | Vocally self-critical in retrospect: "the absence of a fire is exactly why it never got fixed" — owns the systemic failure, not just the outcome. |
| Alt | **#10 — VIP misjudgment** | Owns the risk-assessment miss cleanly: judged severity by current frequency, not adoption trajectory. |
| Alt | **#9 — MAC depletion** | Delivered the full multi-factor RCA to leadership — the transparent, dive-deep version of a hard message. |

---

## 12. Dive Deep
*Leaders stay connected to details, audit frequently. No task is beneath them. They surface data.*

**Common question forms:**
- Tell me about a time you investigated a complex problem to its root cause.
- Describe a time when the details really mattered and you went deep.
- Tell me about a time you used data to understand something others missed.

| Priority | Story | Beat to emphasize |
|---|---|---|
| **Lead** | **#9 — MAC depletion** | The feedback-loop insight: a correctness mechanism (record timed-out partition for release, to avoid MAC leaks) became an amplifier under stress, piling more load onto the already-failing partition. Multi-factor RCA delivered to leadership. |
| Alt | **#10 — VIP race** | Root-caused a non-obvious race condition across distributed systems (VM-level cluster notifications + tenant-level goal state, ordering not guaranteed). |
| Alt | **#2 — Delete VM API** | Read CRP's own codebase to build the data case for force-delete coverage — earned buy-in by knowing their code better than their PoC expected. |

---

## 13. Have Backbone; Disagree and Commit
*Leaders challenge decisions they disagree with, even when uncomfortable. Once decided, they commit wholly.*

**Common question forms:**
- Tell me about a time you disagreed with your manager and what happened.
- Describe a time you challenged a decision you thought was wrong.
- Tell me about a time you committed to something even though you disagreed with it.
- Give me an example of pushing back when it was unpopular.

| Priority | Story | Beat to emphasize |
|---|---|---|
| **Lead** | **#1 — CCSH** | Two-part story: (1) flagged the PubSub scope as a risk → leadership decided to proceed → I **committed fully and did the hands-on integration** (disagree-and-commit, genuine); (2) then later forced the de-scope when the timeline was at risk. Shows both halves of the principle. |
| Alt | **#3 — FastPath gRPC sub-beat** | Pushed for gRPC when it was contested; didn't fold under pushback — backed conviction with k6 benchmarks. |
| Alt | **#2 — Delete VM API** | Pushed for the IaaS modernization when the ask was a narrow cleanup signal, against CRP pushback. |

**CCSH is your cleanest answer here:** it has genuine disagree-*and*-commit (you committed to a direction you warned against, did the work, then legitimately changed it when the facts changed — not stubbornness).

---

## 14. Deliver Results
*Leaders focus on key inputs and deliver with the right quality and timeliness. They rise to the occasion despite setbacks.*

**Common question forms:**
- Tell me about a time you delivered a project that was at risk.
- Describe a time you had high-pressure delivery and how you managed it.
- Tell me about a time you overcame significant obstacles to deliver.
- Give me an example of delivering under a tight deadline.

| Priority | Story | Beat to emphasize |
|---|---|---|
| **Lead** | **#1 — CCSH** | Inherited an at-risk project with a partner team deadline bearing down. De-scoped the risky piece, drove to a clean ship in a month. From "heading for a miss" to "shipped, no issues." |
| Alt | **#3 — FastPath** | Multi-year, multi-team program. 1M+ VMs migrated; 90%+ provisioning improvement. The delivery signal is the risk sequencing — how you kept a high-risk change safe all the way through. |

---

## 15. Strive to be Earth's Best Employer
*Leaders create a safer, more productive, more just work environment. They lead with empathy. They ask: are people growing? Are they empowered?*

**Common question forms:**
- Tell me about a time you improved team culture or work-life balance.
- Describe a time you advocated for someone's growth or wellbeing.
- Tell me about a time you made your team a better place to work.
- Give me an example of leading with empathy.

| Priority | Story | Beat to emphasize |
|---|---|---|
| **Lead** | **#4 — India team** | Took the weekly sync at night (your time) so the India team stayed inside their working hours. After they joined on-call, it gave the US team their nights back — follow-the-sun. Empathy baked into the structural design of the onboarding. |
| Alt | **#5 — Coaching the plateaued engineer** | Noticed someone struggling and stepped in outside your remit. The empathy signal: you heard the "I'm not progressing" frustration and addressed the *actual* habit problem, not just the surface complaint. |
| Alt | **#12 — Partner team on-call** | Recognized a new engineer was on their first rotation, after hours, and chose to stay and help rather than bounce the ticket back. |

---

## 16. Success and Scale Bring Broad Responsibility
*A second thought about secondary effects is required. We want to do more good in the world.*

**Common question forms** *(less frequent in SWE loops, usually at Staff/Principal level)*:
- Tell me about a time you considered the broader impact of a technical decision.
- Describe a time you weighed unintended consequences of your work.

| Priority | Story | Beat to emphasize |
|---|---|---|
| **Lead** | **#3 — FastPath** | At 1M+ VM scale, a bad rollout has massive blast radius. The entire risk-sequencing strategy (barebones-first, create-then-migrate, lightest-footprint-first, instant fallback) was about containing that impact. |
| Alt | **#10 — VIP race** | Security exposure baked into the impact assessment — a leaked public IP is a real customer security issue, not just a resource conflict. |

---

## Story #14 note: VM Delete API leak-detection — now fully written up

This story (formerly a scratch "NEW story" note here) is now Story #14 in `behavioral_story_bank.md`, with the disclosure chain filled in: escalated to on-calls, leadership, and Compute; paused the rollout yourself; the root cause was a scenario Compute's side of the cross-team API hadn't yet implemented, which your side's fallback logic misread as a successful deletion. See the story bank for the full write-up and framing reminders.

---

## Quick-reference: LP → lead story

| LP | Lead story |
|---|---|
| Customer Obsession | #11 Orphaned incident |
| Ownership | #11 Orphaned incident / #14 VM Delete API leak-detection |
| Invent and Simplify | #1 CCSH |
| Are Right, A Lot | #2 Delete VM API (wrong-answer follow-up: #17 FastPath eligibility-check regression) |
| Learn and Be Curious | Learning answer |
| Hire and Develop the Best | #5 Coaching the plateaued engineer |
| Insist on the Highest Standards | #14 VM Delete API leak-detection |
| Think Big | #3 FastPath |
| Bias for Action | #1 CCSH |
| Frugality | #3 FastPath |
| Earn Trust | #14 VM Delete API leak-detection (colleague-facing alt: #17) |
| Dive Deep | #9 MAC depletion |
| Have Backbone; Disagree and Commit | #1 CCSH |
| Deliver Results | #1 CCSH |
| Strive to be Earth's Best Employer | #4 India team |
| Success and Scale Bring Broad Responsibility | #3 FastPath |

Companion files: `behavioral_story_bank.md` · `behavioral_story_question_map.md`
