# SWE Interview Prep

Senior SWE interview prep for Jerry Xu — targeting Senior SWE roles at top-tier tech companies (Seattle area). 6-week plan running Apr 14 – May 24, 2026, with a 50/50 DSA/System Design split.

## Hosting

- GitHub repo: `jxu093/swe`
- GitHub Pages: https://jxu093.github.io/swe/
- Deployed from `main` branch root

## Repo structure

```
index.html                  Landing page (dark themed, links to sub-pages)
SWE-Prep-Plan.md            Master 6-week study plan
Prep-Plan-Viewer.html       Visual HTML calendar view of the plan
Mock-Practice-Notes.md      Categorized takeaways from SD mocks and practice
Flashcards/
  SWE-Flashcards.md         Full flashcard deck in markdown (source of truth)
  SWE-Flashcards.html       Interactive flashcard web app
  cards.js                  Card data loaded by the HTML app
study-guides/
  leetcode-20-patterns.md   Top 20 LeetCode patterns
  dsa-top-problems.md       Core DSA problem set
  tree-patterns.md          Tree-specific patterns
  system-design-problem-playbook.md   20 common SD problems at recall density
  system-design-cheat-sheet.md        Numbers, scaling triggers, scenario→tech
  system-design-tech-stacks.md        Tech stack tables per problem
  payment-system-design.md
  ddia-distributed-systems.md         DDIA ch. 8 & 9 notes
  backend-architecture-checklist.md
  index.md                  Study guides index
```

## Context

- This repo lives inside the Obsidian vault at `~/Documents/Obsidian/swe/`
- Flashcard system: 24 decks, 256 cards total (DSA patterns, system design, flagged problems). System Design is decks 9–16 (8 topic decks) plus a situational-drills deck (23); additional DSA is decks 17–22.
- Reference materials: NeetCode 150, DDIA, SDI Vol 2, Hello Interview / Interviewing.io
- The `Prep-Plan-Viewer.html` links to LC problems and deep-links flashcards via `SWE-Flashcards.html#F14` format
