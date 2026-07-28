const DECKS = [
  {
    "id": 0,
    "title": "⚠️ Flagged Problems — Your Personal Gotchas",
    "cards": [
      {
        "id": "F1",
        "title": "F1 · Top K Frequent Elements",
        "topic": "Arrays & Hashing",
        "question": "*Given an array `nums` and integer `k`, return the k most frequent elements in any order.*\nYou know the heap solution (O(n log k)). What is the O(n) bucket approach, and walk through why it's bounded by n?",
        "example": "Input:  nums = [1,1,1,2,2,3], k = 2\nOutput: [1, 2]",
        "answer": "Build a `bucket` list of size `n+1` where index `i` holds all elements with frequency `i`. (Frequency can't exceed n, so the list is always bounded.) Populate using a `Counter`. Scan from index `n` down to `1`, collecting elements into the result until you have `k`. O(n) time — no sort or heap, just a linear scan.",
        "hint": "buckets"
      },
      {
        "id": "F2",
        "title": "F2 · Encode and Decode Strings",
        "topic": "Arrays & Hashing",
        "question": "*Design an algorithm to encode a list of strings to a single string, then decode it back. The strings may contain any character including the delimiter you choose.*\nWhat goes wrong with a naive delimiter (e.g., comma), and what's the robust encoding scheme?",
        "example": "Input:  [\"hello\", \"world\"]\nEncode: \"5#hello5#world\"\nDecode: [\"hello\", \"world\"]",
        "answer": "Any delimiter can appear inside the strings themselves, so a naive split will break. Robust solution: **length-prefix encoding**. Encode as `f\"{len(s)}#{s}\"` for each string, concatenated. Decode by reading digits until `#`, slicing exactly that many characters starting after `#`, then advancing the pointer. Works for any string content, including strings containing `#`.",
        "hint": "Chunk delimiter"
      },
      {
        "id": "F3",
        "title": "F3 · Longest Consecutive Sequence",
        "topic": "Arrays & Hashing",
        "question": "*Given an unsorted array of integers, return the length of the longest consecutive elements sequence. Must run in O(n).*\nWhy not just sort the array? What's the exact O(n) trick, and what's the guard that prevents revisiting starts?",
        "example": "Input:  nums = [100,4,200,1,3,2]\nOutput: 4",
        "answer": "Sorting is O(n log n) and the constraint says O(n). Put all nums into a set. For each number `n`, **only start counting if `n - 1` is NOT in the set** — this means `n` is the start of a new run. Then walk forward (`n+1`, `n+2`, ...) until the run breaks. Each number is visited at most twice — once as a potential start (skipped quickly if not a start) and once during a valid run. O(n) total.",
        "hint": "Use hashset"
      },
      {
        "id": "F4",
        "title": "F4 · 3Sum",
        "topic": "Two Pointers",
        "question": "*Given an integer array `nums`, return all triplets `[nums[i], nums[j], nums[k]]` such that `i ≠ j ≠ k` and `nums[i] + nums[j] + nums[k] == 0`. No duplicate triplets.*\nWhy must you sort, and what are the two places you skip duplicates (outer and inner)?",
        "example": "Input:  nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]",
        "answer": "Sorting enables a two-pointer inner sweep (sum is monotonic with pointer movement — moving left right increases sum, moving right left decreases it). **Outer duplicate skip:** `if i > 0 and nums[i] == nums[i-1]: continue` — avoids repeating the same outer value. **Inner duplicate skip:** after recording a valid triplet, advance `l` and `r` while they match their previous value (e.g., `while l < r and nums[l] == nums[l-1]: l++`). Both skips are necessary to avoid duplicate triplets in the output.",
        "hint": "Sort first"
      },
      {
        "id": "F5",
        "title": "F5 · Trapping Rain Water",
        "topic": "Two Pointers",
        "question": "*Given an elevation map `height[]`, compute how much water it can trap after raining.*\nDescribe the two-pointer approach: what do the pointers track, when do you move which side, and what's the off-by-one in the while condition?",
        "example": "Input:  height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6",
        "answer": "Maintain `leftMax` and `rightMax` — the tallest bar seen so far from each side. Move the pointer on the side with the **smaller max**, because that side is the binding constraint (water at any position = `min(leftMax, rightMax) - height[pos]`). Water added at each step = `min(leftMax, rightMax) - height[ptr]`. **While condition: `l < r` (strict).** Using `<=` causes the bar at `l == r` to be counted from both sides, double-counting zero water but creating an incorrect indexing step.",
        "hint": "Two pointers moving inward. Which side is the bottleneck?"
      },
      {
        "id": "F6",
        "title": "F6 · Daily Temperatures",
        "topic": "Stack",
        "question": "*Given an array `temperatures`, return an array `answer` where `answer[i]` is the number of days you have to wait after day `i` to get a warmer temperature. If no future warmer day exists, `answer[i] = 0`.*\nDescribe the monotonic stack invariant precisely: what does the stack store, what order are values in from bottom to top, and what happens when you see a larger temperature?",
        "example": "Input:  temperatures = [73,74,75,71,69,72,76,73]\nOutput: [1,1,4,2,1,1,0,0]",
        "answer": "The stack stores **indices** of temperatures in strictly increasing order from bottom to top — equivalently, the corresponding temperatures are in **decreasing** order (smaller temps on top). When you encounter `T[i]` larger than `T[stack[-1]]`, pop repeatedly: for each popped index `j`, the answer is `i - j`. Continue popping while the stack is non-empty and the top is smaller. Then push `i`. The invariant holds because any index whose temperature is larger than a later index will \"clear\" everything below it before being pushed.",
        "hint": "Monotonic stack — what order should values be in from bottom to top?"
      },
      {
        "id": "F7",
        "title": "F7 · Largest Rectangle in Histogram",
        "topic": "Stack",
        "question": "*Given an array `heights` representing the widths of bars in a histogram, find the area of the largest rectangle.*\nWhat does the stack store (and why does it need more than just the index), and how do you track the correct width when you pop?",
        "example": "Input:  heights = [2,1,5,6,2,3]\nOutput: 10",
        "answer": "The stack stores `(height, start_index)` pairs — `start_index` is the leftmost x-position this height can still extend back to. When `heights[i] < stack[-1].height`, pop: `area = popped.height * (i - popped.start_index)`. The new bar's `start_index` is set to the last popped `start_index` (it can extend back that far because all taller bars have been cleared). After iterating, pop remaining stack entries using `n` as the right boundary. **Append a sentinel `(0, 0)` or just check at the end** — ensures everything gets flushed. Without `start_index` in the stack, you can't reconstruct the rectangle's left boundary after popping.",
        "hint": "Monotonic stack — but what extra info besides height do you need to store?"
      },
      {
        "id": "F8",
        "title": "F8 · Koko Eating Bananas",
        "topic": "Binary Search",
        "question": "*Koko has `piles` of bananas and `h` hours before guards return. She eats at speed `k` bananas/hour, one pile at a time. Find the minimum integer `k` such that she can eat all piles in `h` hours.*\nWhat is the search space, what is the predicate, and what are the two bugs you flagged?",
        "example": "Input:  piles = [3,6,7,11], h = 8\nOutput: 4",
        "answer": "Search space: `k ∈ [1, max(piles)]`. Predicate: `sum(ceil(p / k) for p in piles) <= h`. **Bug 1 — don't return early on equality:** when the predicate holds, record `result = mid` as a candidate but continue searching left (`r = mid - 1`) for a smaller valid speed. `return mid` on equality locks in a non-minimal answer. **Bug 2 — ceiling division:** use `math.ceil(p / k)` or `(p + k - 1) // k`. In Python this is fine; in Java/C++ integer division truncates, so `p / k` underestimates, making Koko appear faster than she is.",
        "hint": "Don't return early when equals, record the candidate when it's <= h. Watch out for int overflow"
      },
      {
        "id": "F9",
        "title": "F9 · Median of Two Sorted Arrays",
        "topic": "Binary Search",
        "question": "*Given two sorted arrays `nums1` and `nums2` of sizes `m` and `n`, return the median of the two sorted arrays in O(log(min(m, n))) time.*\nWalk through the full partition logic: what are you binary-searching on, how is `j` derived, what is the validity condition, and how do you handle out-of-bounds?",
        "example": "Input:  nums1 = [1,3], nums2 = [2]\nOutput: 2.0\n\nInput:  nums1 = [1,2], nums2 = [3,4]\nOutput: 2.5",
        "answer": "Binary search on the **partition index `i`** in the shorter array A (length `m`). The partition in B is `j = (m + n + 1) // 2 - i`, derived from the rule that the left half always contains `(m+n+1)//2` elements total (the `+1` handles odd totals by putting the extra element on the left).\n\n**Valid partition condition:** `A[i-1] <= B[j]` AND `B[j-1] <= A[i]` — left side of each partition is ≤ right side of the other.\n\n- If `A[i-1] > B[j]`: partition is too far right in A → `r = i - 1`\n- If `B[j-1] > A[i]`: partition is too far left in A → `l = i + 1`\n\n**Result:** Odd total → `max(A[i-1], B[j-1])`. Even total → `(max(A[i-1], B[j-1]) + min(A[i], B[j])) / 2`.\n\n**Out-of-bounds guards:** treat `A[i-1]` as `-∞` when `i == 0` and `A[i]` as `+∞` when `i == m`.",
        "hint": "Binary search a partition index in the shorter array. How do you derive the other partition?"
      },
      {
        "id": "F10",
        "title": "F10 · Longest Repeating Character Replacement",
        "topic": "Sliding Window",
        "question": "*Given a string `s` and integer `k`, you can replace at most `k` characters in the window with any letter. Return the length of the longest substring with all the same letter after replacements.*\nWhat is the invariant that determines when the window is invalid, and why is it OK for `maxCount` to be stale-high when shrinking?",
        "example": "Input:  s = \"AABABBA\", k = 1\nOutput: 4",
        "answer": "Window is invalid when `window_length - maxCount > k` — we'd need more than `k` replacements. When this happens, shrink left by one (decrement the count of `s[l]`, `l++`). **`maxCount` intentionally stays stale-high when shrinking:** it represents the highest frequency seen in *any* window we've examined. A stale-high `maxCount` only makes the validity check stricter — you'll never accept a window you shouldn't. The result only grows when we genuinely find a better window. This is correct because we only care about maximizing, never accepting a smaller valid window than the current best.",
        "hint": "Sliding window — what condition makes the window invalid?"
      },
      {
        "id": "F11",
        "title": "F11 · Sliding Window Maximum",
        "topic": "Sliding Window",
        "question": "*Given an array `nums` and integer `k`, return an array of the maximums of each contiguous subarray of size `k`.*\nWhat data structure, what invariant does it maintain, and what are the two pop conditions (back and front)?",
        "example": "Input:  nums = [1,3,-1,-3,5,3,6,7], k = 3\nOutput: [3,3,5,5,6,7]",
        "answer": "Use a **monotonic deque** (double-ended queue) of indices. Invariant: indices are in increasing order (left to right), and their corresponding values are in **decreasing** order — so `deque[0]` always holds the index of the window maximum.\n\n**Two pop conditions:**\n1. **Pop from the back** (`while deque and nums[deque[-1]] <= nums[i]`): any element smaller than the new element can never be the future maximum — remove them.\n2. **Pop from the front** (`while deque and deque[0] < i - k + 1`): the front index has left the window — remove it.\n\nAfter processing each index, `nums[deque[0]]` is the current window max. Append to result once `i >= k - 1`.",
        "hint": "Use monotonic linkedlist"
      },
      {
        "id": "F12",
        "title": "F12 · Remove Nth Node From End of List",
        "topic": "Linked List",
        "question": "*Given the head of a linked list, remove the nth node from the end of the list and return its head.*\nWhy do you need an `n+1` gap (not n), and where do both pointers start?",
        "example": "Input:  head = [1,2,3,4,5], n = 2\nOutput: [1,2,3,5]",
        "answer": "You need to stop at the **node before** the target so you can rewire `.next`. Use a **dummy head** — both pointers start there. Advance `fast` pointer `n + 1` steps ahead of `slow` (both starting from dummy). Then move both one step at a time until `fast` is `None`. At that point, `slow.next` is the node to delete. Remove with `slow.next = slow.next.next`. The dummy head handles the edge case of deleting the actual head node.",
        "hint": "Two pointers with n distance"
      },
      {
        "id": "F13",
        "title": "F13 · Find the Duplicate Number",
        "topic": "Linked List",
        "question": "*Given an array `nums` of n+1 integers where each integer is in [1, n], find the duplicate without modifying the array, using O(1) extra space.*\nDescribe both approaches. For Floyd's: what is the \"linked list\", where does the traversal start, and what does the entrance of the cycle represent?",
        "example": "Input:  nums = [1,3,4,2,2]\nOutput: 2",
        "answer": "**Binary search on value:** For candidate `mid`, count elements `<= mid`. If count `> mid`, duplicate is in `[1, mid]` by pigeonhole; else `[mid+1, n]`. O(n log n), O(1) space.\n\n**Floyd's cycle detection:** Treat the array as an implicit linked list where index `i` points to `nums[i]` as its \"next\". Index `0` is the guaranteed start (no value points to 0 since values are in `[1, n]`). Phase 1: `slow = nums[slow]`, `fast = nums[nums[fast]]` — repeat until they meet inside the cycle. Phase 2: reset one pointer to index `0`, advance both one step at a time — they meet at the **duplicate value**, which is the cycle entrance (two array positions share the same value, creating two edges into that index). O(n), O(1) space.",
        "hint": "Two approaches: one searches over values, the other treats the array as an implicit graph. What does index → value represent?"
      },
      {
        "id": "F14",
        "title": "F14 · Merge K Sorted Lists",
        "topic": "Heap / Priority Queue",
        "question": "*Given k sorted linked lists, merge them all into one sorted linked list.*\nBoth approaches are O(N log k). When would you argue for one over the other in an interview, and what's the heap's specific memory advantage?",
        "example": "Input:  [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]",
        "answer": "**Heap:** Push `(val, node)` for each list's current head. Pop minimum, push its `.next`, repeat. O(N log k). **Memory advantage:** only the current head of each list lives in the heap at any time — O(k) space. Ideal for streaming or external merge where lists are too large to fully load. **Implementation note:** in Python, add a tie-breaker index to the tuple since `ListNode` isn't comparable: `(val, i, node)`.\n\n**Divide and conquer:** Pair up lists and merge each pair; recurse on results until one list remains. O(N log k) time, O(log k) recursive call stack. Better when lists are fully in memory and you want to avoid heap overhead.\n\n**Interview framing:** if asked \"what if these come from live streams?\", answer heap. If asked \"what if memory is constrained?\", answer D&C.",
        "hint": "Two approaches: one uses a shared data structure across all lists, the other pairs them up. When would you prefer each?"
      },
      {
        "id": "F15",
        "title": "F15 · Task Scheduler",
        "topic": "Heap / Priority Queue",
        "question": "*Given a list of CPU tasks (letters A–Z) and a cooldown `n` meaning the same task must wait `n` intervals before running again. Return the minimum number of intervals to finish all tasks.*\nDescribe both the heap simulation and the O(n) math formula. What does the formula count, and when does each term dominate?",
        "example": "Input:  tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2\nOutput: 8",
        "answer": "**Heap simulation:** Use a max-heap by frequency. Process rounds of size `n+1`: pop up to `n+1` tasks (highest frequency first), decrement counts, re-push non-zero counts. Add `n+1` per round (or `remaining tasks` on the last round). O(N log N).\n\n**Math formula (O(n)):**\n```\nmax_count = max(task_frequencies)\ncount_of_max = number of tasks with that frequency\nanswer = max(len(tasks), (max_count - 1) * (n + 1) + count_of_max)\n```\n**Intuition:** Arrange the most-frequent task at intervals of `n+1`. This creates a \"frame\" of `(max_count - 1)` full slots plus a final partial slot of `count_of_max`. If other tasks are plentiful enough to fill all idle gaps, there's no idle time and the answer is just `len(tasks)`. The `max()` captures both cases — sparse tasks (formula dominates) and dense tasks (total count dominates).",
        "hint": "Even though I had the heap solution, the optimal solution is to use a constant math formula"
      },
      {
        "id": "F16",
        "title": "F16 · Kth Smallest Element in a BST",
        "topic": "Trees",
        "question": "*Given a BST and integer `k`, return the kth smallest value.*\nWrite out the iterative inorder loop structure, and what's the exact bug caused by pushing without checking left first?",
        "example": "Input:  root = [3,1,4,null,2], k = 1\nOutput: 1",
        "answer": "```python\nstack, node = [], root\nwhile node or stack:\n    while node:          # go as far left as possible\n        stack.append(node)\n        node = node.left\n    node = stack.pop()   # visit\n    k -= 1\n    if k == 0:\n        return node.val\n    node = node.right    # move to right subtree\n```\n**The bug:** if you push `node` and immediately also check `node.left` without the inner `while`, you either double-push or miss left children entirely. The key pattern is: use an inner `while` to fully exhaust the left spine before popping. You only push when `node` is non-null; popping gives you the next in-order node.",
        "hint": "Iterative inorder — what two things does your loop manage, and what must you exhaust before popping?"
      },
      {
        "id": "F17",
        "title": "F17 · Serialize and Deserialize Binary Tree",
        "topic": "Trees",
        "question": "*Design an algorithm to serialize a binary tree to a string and deserialize it back. No constraints on format — just make it work.*\nDescribe both approaches. What does each use as a null marker, and which is simpler to implement in an interview?",
        "example": "Input:   root = [1,2,3,null,null,4,5]\nSerialize:   \"1,2,3,N,N,4,5\"\nDeserialize: [1,2,3,null,null,4,5]",
        "answer": "**BFS (level-order):** Use a queue. Serialize non-null nodes by value and null nodes as `\"N\"` (e.g., `\"1,2,3,N,N,4,5\"`). Deserialize by consuming the queue level-by-level: pop a value, create the node, enqueue its two children (peeked from the serialized list). Clear null markers without creating nodes.\n\n**DFS (pre-order):** Recurse left then right. Serialize each node as its value; null as `\"N\"`. Use a `deque` as an iterator during deserialization — `popleft()` gives the next token, recurse for left and right children.\n\n**Your hint about \"length as prefix\"** refers to a variant where instead of a single null sentinel you prefix each non-null node's value with its length (e.g., `\"3:abc\"`) — useful when values are arbitrary strings rather than integers.\n\n**Interview choice:** DFS recursive is the cleanest to write quickly. BFS is easier to reason about visually but needs a queue scaffolding.",
        "hint": "How do you represent absent children in the serialized form? BFS vs DFS — which is simpler to code in an interview?"
      },
      {
        "id": "F18",
        "title": "F18 · N-Queens",
        "topic": "Backtracking",
        "question": "*Place n queens on an n×n chessboard so no two queens attack each other. Return all distinct solutions.*\nWhat are the three sets you maintain, what keys do you use, and why does `r+c` and `r-c` capture diagonals?",
        "example": "Input:  n = 4\nOutput: [[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],\n         [\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]",
        "answer": "Maintain three sets: `cols` (column indices used), `diag` (major-diagonal ids), `anti_diag` (minor-diagonal ids).\n\n- **`cols`:** key is simply `c`.\n- **`diag` (`\\` diagonals):** key is `r - c`. All squares on the same `\\` diagonal have the same `r - c` value. Range: `[-(n-1), n-1]`.\n- **`anti_diag` (`/` diagonals):** key is `r + c`. All squares on the same `/` diagonal have the same `r + c` value. Range: `[0, 2n-2]`.\n\nDFS one row at a time (placement in row `r`, trying each column `c`). If none of the three sets contain the corresponding key, place the queen, add all three keys, recurse to row `r+1`, then backtrack. O(1) conflict check instead of scanning the board.",
        "hint": "Place one queen per row. What three conflict dimensions do you need to track, and how do you key each?"
      },
      {
        "id": "F19",
        "title": "F19 · Course Schedule",
        "topic": "Graphs",
        "question": "*Given `numCourses` and `prerequisites` (pairs [a, b] meaning b must come before a), determine if it's possible to finish all courses (i.e., no cycle in the prerequisite graph).*\nFor Kahn's: what's the exact termination check? For DFS: what are the three node states and what distinguishes \"visiting\" from \"visited\"?",
        "example": "Input:  numCourses = 2, prerequisites = [[1,0]]\nOutput: true\n\nInput:  numCourses = 2, prerequisites = [[1,0],[0,1]]\nOutput: false",
        "answer": "**Kahn's (BFS topological sort):**\n1. Compute in-degrees for all nodes.\n2. Queue all nodes with in-degree 0.\n3. Pop a node, decrement in-degrees of its neighbors; enqueue neighbors that reach 0.\n4. Count processed nodes. **Termination:** if `processed == numCourses`, no cycle. If `< numCourses`, a cycle exists (those nodes never reached in-degree 0).\n\n**DFS (3-color):**\n- `0` = unvisited\n- `1` = currently in the DFS call stack (visiting)\n- `2` = fully processed (all descendants explored)\n\nIf you reach a node with state `1` during DFS, you've found a back edge → cycle. If state `2`, already clean — skip. Mark `2` on return from recursion. State `1` means \"I'm an ancestor in the current path.\"",
        "hint": "Cycle detection in a directed graph. Two classic approaches — one BFS-based, one DFS-based. What signals a cycle in each?"
      },
      {
        "id": "F20",
        "title": "F20 · Graph Valid Tree",
        "topic": "Graphs",
        "question": "*Given n nodes (labeled 0 to n-1) and a list of undirected edges, determine if the edges form a valid tree.*\nWhat does the prescreen catch, what can it NOT rule out alone, and what's the follow-up check?",
        "example": "Input:  n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]\nOutput: true\n\nInput:  n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]\nOutput: false",
        "answer": "A tree on n nodes has **exactly n-1 edges** — this is a necessary condition.\n\n**Prescreen (O(1)):** `if len(edges) != n - 1: return False`. If more edges → must have a cycle. If fewer → must be disconnected. This rules out most invalid inputs instantly.\n\n**Why the prescreen alone is sufficient with a connectivity check:** For simple undirected graphs, n-1 edges + connected ⟺ tree. A graph with exactly n-1 edges *cannot* contain a cycle without also being disconnected (a cycle on k nodes uses k edges, leaving only n-1-k edges for the remaining n-k nodes — not enough to connect them). So the prescreen guarantees no cycles; you just need to verify connectivity.\n\n**Follow-up:** BFS/DFS from node 0, count reachable nodes. If `reachable == n`, it's a tree. Both conditions together are necessary and sufficient.",
        "hint": "A tree on n nodes has a specific edge count. What's the O(1) prescreen, and what does it NOT rule out?"
      },
      {
        "id": "F21",
        "title": "F21 · Maximum Product Subarray",
        "topic": "1-D DP",
        "question": "*Given an integer array `nums`, find the contiguous subarray with the largest product, and return its value.*\nWhy must you track both a running max AND a running min, and why must you update both simultaneously (not sequentially)?",
        "example": "Input:  nums = [2,3,-2,4]\nOutput: 6\n\nInput:  nums = [-2,3,-4]\nOutput: 24",
        "answer": "A negative × negative = a large positive, so the **current minimum** can instantly become the next maximum when multiplied by a negative number. You must track both.\n\n**Update rule (at each `num`):**\n```python\nnew_max = max(cur_max * num, cur_min * num, num)\nnew_min = min(cur_max * num, cur_min * num, num)\ncur_max, cur_min = new_max, new_min\n```\n**Why simultaneous:** if you write `cur_max = max(cur_max * num, ...)` first, then compute `cur_min` using the already-updated `cur_max`, you get the wrong minimum. Always compute both `new_max` and `new_min` from the old values before assigning. Global answer = max of all `cur_max` values seen.",
        "hint": "Why can't you just track a running max like Kadane's? What does a negative number do?"
      },
      {
        "id": "F22",
        "title": "F22 · Reorder List",
        "topic": "Linked List",
        "question": "*Given the head of a singly linked list L0 → L1 → … → Ln, reorder it in-place to: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …*\nWhat are the three distinct phases of the solution, and what algorithm does each phase use?",
        "example": "Input:  head = [1,2,3,4]\nOutput: [1,4,2,3]\n\nInput:  head = [1,2,3,4,5]\nOutput: [1,5,2,4,3]",
        "answer": "Three phases:\n\n1. **Find the midpoint** — slow/fast pointer (Floyd's). `slow` ends at the middle node; the second half starts at `slow.next`. Sever the list: `slow.next = None`.\n\n2. **Reverse the second half** — standard iterative reversal (`prev=None`, walk with `curr`, threading `curr.next = prev`).\n\n3. **Merge the two halves** — interleave by alternating nodes: take one from the first half, then one from the reversed second half, repeat until the second half is exhausted.\n\nAll three phases are O(n) time, O(1) space.",
        "hint": "Three phases — all O(1) space. Think about what you'd need to interleave from both ends."
      }
    ]
  },
  {
    "id": 1,
    "title": "Arrays & Hashing",
    "cards": [
      {
        "id": "Q1",
        "question": "When do you reach for a hash map over sorting?",
        "answer": "When you need O(n) lookup or counting and don't need order. Sorting is O(n log n); hashing trades memory for time. Prefer hashing when order is irrelevant and keys are hashable."
      },
      {
        "id": "Q2",
        "question": "What's the canonical pattern for \"two sum\"-style problems?",
        "answer": "Single-pass hash map: for each element `x`, check if `target - x` is already in the map; otherwise insert `x` with its index. O(n) time, O(n) space."
      },
      {
        "id": "Q3",
        "question": "How do you detect a duplicate in one pass?",
        "answer": "Walk the array, put each element into a set; if insertion finds it already there, you have a duplicate. O(n)/O(n)."
      },
      {
        "id": "Q4",
        "question": "How do you group anagrams efficiently?",
        "answer": "Use a hash map keyed by either the sorted string (O(k log k) per word) or a 26-length character-count tuple (O(k) per word). The tuple key is faster in tight loops."
      },
      {
        "id": "Q5",
        "question": "*Given an unsorted integer array, return the length of the longest consecutive elements sequence in O(n) time.* What's the trick for \"longest consecutive sequence\"? (See also F3)",
        "example": "Input:  nums = [100,4,200,1,3,2]\nOutput: 4  (sequence: 1,2,3,4)",
        "answer": "Put all nums in a set. Only start counting when `n-1` is NOT in the set (n is the start of a run). Walk forward until the run breaks. Amortized O(n)."
      },
      {
        "id": "Q6",
        "question": "*Given an integer array `nums`, return an array `answer` where `answer[i]` equals the product of all elements except `nums[i]`, without using division, in O(n) time.* Why does this need two passes rather than one?",
        "example": "Input:  nums = [1,2,3,4]\nOutput: [24,12,8,6]",
        "answer": "You need each element's left-side product AND right-side product. One pass can carry only one side. Use prefix and suffix passes: first fill output with prefix products; then walk backward multiplying in suffix products using a running variable. O(n)/O(1) extra."
      },
      {
        "id": "Q7",
        "question": "How would you encode a list of strings to a single string and decode it back? (See also F2)",
        "answer": "Prefix each string with its length and a delimiter: `\"5#hello3#abc\"`. Decode by reading the number up to `#`, then slicing that many chars. Robust to any string content."
      },
      {
        "id": "Q8",
        "question": "Why is O(1) for hash lookup only *expected*, not worst-case?",
        "answer": "Assumes a good hash function distributes uniformly. Adversarial keys or a poor hash can cluster into one bucket, making lookup O(n). Randomized seeds and rehashing mitigate this."
      },
      {
        "id": "Q9",
        "question": "What's the O(n) approach for \"top k frequent elements\"? (See also F1)",
        "answer": "Bucket sort by frequency. Build `bucket[0..n]` where `bucket[i]` holds elements with frequency `i`. Scan from high to low, collect until k results. O(n), no heap needed."
      },
      {
        "id": "Q10",
        "question": "*Given an integer array `nums` and an integer `k`, return the total number of subarrays whose sum equals `k`.* What's the prefix sum + hash map pattern, and why can't sliding window solve this?",
        "example": "Input:  nums = [1,1,1], k = 2\nOutput: 2  (subarrays [1,1] starting at index 0 and 1)",
        "answer": "Sliding window fails because elements can be negative (shrinking the window doesn't guarantee the sum decreases). Instead: maintain a running `prefix_sum` and a hash map `{prefix_sum: count}` initialized with `{0: 1}`. At each index, check if `prefix_sum - k` exists in the map — if so, add its count to the result (those are subarrays ending here with sum k). Then increment `map[prefix_sum]`. O(n) time, O(n) space. This pattern generalizes: 'subarray with sum divisible by k' uses `prefix_sum % k` as the key."
      }
    ]
  },
  {
    "id": 2,
    "title": "Two Pointers",
    "cards": [
      {
        "id": "Q1",
        "question": "You're looking at a new problem in an interview. What signals tell you that a two-pointer approach will work, and what does it buy you over brute force?",
        "answer": "When the input is sorted (or sortable), or you need pairs/triples with a monotonic relationship (sum grows as left pointer moves right). Converts O(n²) brute force to O(n)."
      },
      {
        "id": "Q2",
        "question": "*Given a sorted array and a target sum, find two numbers that add up to the target.* Walk through the two-pointer approach — why does it work, and why is it O(n)?",
        "example": "Input:  numbers = [2,7,11,15], target = 9\nOutput: [0,1]",
        "answer": "Left at 0, right at n-1. If sum < target, move `left++`; if > target, move `right--`; if equal, done. Correct because sum changes monotonically with each move."
      },
      {
        "id": "Q3",
        "question": "Why does 3Sum start with sorting? (See also F4)",
        "answer": "Sorting enables the two-pointer inner loop and easy duplicate skipping. Total: O(n²) time, O(1) extra space."
      },
      {
        "id": "Q4",
        "question": "*Given `n` vertical lines at positions `[0..n-1]` with heights `height[i]`, find two lines that together with the x-axis form the container holding the most water.*\nWhat's the \"container with most water\" invariant?",
        "example": "Input:  height = [1,8,6,2,5,4,8,3,7]\nOutput: 49",
        "answer": "Area = `min(left_height, right_height) * width`. Moving the taller side inward can never increase area (width shrinks, min stays ≤). Always move the shorter side."
      },
      {
        "id": "Q5",
        "question": "*Given an elevation map `height[]`, compute how much water is trapped after raining.* Compare the two approaches and their space tradeoffs. (See also F5)",
        "answer": "(1) Precompute `leftMax[]` and `rightMax[]` arrays; water at `i` = `min(L[i], R[i]) - h[i]`. O(n) time, O(n) space. (2) Two pointers tracking running maxes; same O(n) time, O(1) space. Two-pointer is preferred in interviews."
      },
      {
        "id": "Q6",
        "question": "*Given a sorted array `nums`, remove the duplicates in-place so each element appears only once. Return the number of unique elements.* What's the two-pointer pattern for this?",
        "example": "Input:  nums = [0,0,1,1,1,2,2,3,3,4]\nOutput: 5  (nums modified to [0,1,2,3,4,...])",
        "answer": "Slow pointer marks the write position; fast pointer scans. Write only when a new value is seen. O(n)/O(1)."
      },
      {
        "id": "Q7",
        "question": "Why prefer two pointers over reversing for palindrome checks?",
        "answer": "O(1) extra space and early exit on first mismatch. Reversing allocates a new string/array."
      },
      {
        "id": "Q8",
        "question": "*Given a string `s`, return `true` if it can be made into a palindrome by deleting at most one character.* How do you solve this without checking every possible deletion?",
        "example": "Input:  s = \"abca\"\nOutput: true  (remove 'b' or 'c')",
        "answer": "On first mismatch, branch: check if the substring skipping `left` OR skipping `right` is still a palindrome. Two inner two-pointer checks, O(n) overall."
      }
    ]
  },
  {
    "id": 3,
    "title": "Stack",
    "cards": [
      {
        "id": "Q1",
        "question": "You're reading a new interview problem. What patterns in the problem statement signal that a stack is the right data structure?",
        "answer": "Matching/nested structures (parentheses, HTML), or a \"nearest previous/next greater/smaller\" relationship (monotonic stack)."
      },
      {
        "id": "Q2",
        "question": "How does a monotonic decreasing stack help with \"next greater element\"? (See also F6)",
        "answer": "Maintain indices with decreasing values. When you see a bigger value, pop all smaller ones — for each popped index, the current value IS its next greater element. O(n) amortized."
      },
      {
        "id": "Q3",
        "question": "What's the structure of \"largest rectangle in histogram\"? (See also F7)",
        "answer": "Monotonic increasing stack of `(height, start_index)` pairs. When a bar breaks the increasing invariant, pop and compute `area = height * (i - start_index)`. The new element inherits the last popped `start_index`."
      },
      {
        "id": "Q4",
        "question": "*Given an array of tokens representing an arithmetic expression in Reverse Polish Notation (e.g., `[\"2\",\"1\",\"+\",\"3\",\"*\"]` = (2+1)*3 = 9), evaluate and return the result.* Walk through the stack-based approach.",
        "example": "Input:  tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]\nOutput: 9",
        "answer": "Push operands. On operator, pop two (note order for non-commutative ops like `-` and `/`), apply, push result. Final stack top is the answer."
      },
      {
        "id": "Q5",
        "question": "*Design a stack that supports push, pop, top, and retrieving the minimum element — all in O(1) time.* What's the data structure trick that makes O(1) getMin possible?",
        "answer": "Pair each pushed value with the current min at that point (as tuples in the stack, or a parallel min-stack). Pop takes both. All operations O(1)."
      },
      {
        "id": "Q6",
        "question": "When you have a recursive solution (e.g., DFS on a tree) and need to convert it to iterative to avoid stack overflow, what's the general technique?",
        "answer": "Manually push call frames (state tuples). Useful for tree/graph DFS to avoid Python's recursion limit. Also enables early-exit patterns that recursion makes awkward."
      },
      {
        "id": "Q7",
        "question": "When parsing \"decode string\" (e.g., `3[a2[c]]`), what do you push?",
        "answer": "On `[`: push the current string-being-built and the current multiplier; reset locals. On `]`: pop and combine: `prev_string + multiplier * current_string`."
      },
      {
        "id": "Q8",
        "question": "*Given a string containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid (every open bracket is closed by the same type in the correct order).* Walk through the stack approach and the three ways it can fail.",
        "example": "Input:  s = \"([{}])\"\nOutput: true\n\nInput:  s = \"([)]\"\nOutput: false",
        "answer": "Push open brackets onto the stack. On a close bracket, pop and check it matches the corresponding open type (use a map: `)→(`, `]→[`, `}→{`). **Three failure modes:** (1) Close bracket but stack is empty (nothing to match). (2) Popped bracket doesn't match the close type (wrong nesting order). (3) After processing all chars, stack is non-empty (unclosed opens remain). O(n) time, O(n) space."
      },
      {
        "id": "Q9",
        "question": "*Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.*\nWhat are the two recursive choices and the constraints that prune invalid branches?",
        "example": "Input:  n = 3\nOutput: [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
        "answer": "At each position, you can add `(` if `open_count < n`, or `)` if `close_count < open_count`. Base case: `len(path) == 2*n` → append to results. The constraint `close < open` is the key pruning rule — it ensures you never close a bracket that wasn't opened. This is backtracking with an implicit stack (open count acts as the stack depth). Total results = Catalan number C(n)."
      },
      {
        "id": "Q10",
        "question": "*Car Fleet (LC 853): n cars at position[i] with speed[i] drive toward a target on a 1-lane road. A faster car catching a slower one ahead joins its fleet (moves at the slower speed, can't pass). Count the fleets that arrive.* Optimal approach?",
        "answer": "Insight: a car can only ever be blocked by a car **ahead** of it (closer to the target). **Sort cars by position descending** and compute each one's **time to target = `(target - position) / speed`**. Scan the sorted cars keeping the current lead fleet's time: if a car's time is **greater** than the lead ahead, it can't catch up → it's a **new fleet** (count++, it becomes the new lead); if its time is **≤** the lead, it merges into that fleet. The number of leads = number of fleets. O(n log n) sort + O(n) scan. (This is the monotonic-stack pattern — you push a new time only when it exceeds the stack top; an explicit stack isn't even required since you only compare to the lead.)",
        "new": true
      }
    ]
  },
  {
    "id": 4,
    "title": "Binary Search",
    "cards": [
      {
        "id": "Q1",
        "question": "There are two binary search templates — `while l <= r` and `while l < r`. When do you use each one, and what changes between them (loop condition, bound updates, return value)?",
        "answer": "**`while l <= r` — \"find exact target\":** `l` and `r` define a closed interval `[l, r]`. You return `mid` immediately when found; if the loop ends, the target doesn't exist (`return -1`). Bounds always exclude mid: `l = mid + 1` or `r = mid - 1`.\n\n**`while l < r` — \"find a boundary\":** `l` and `r` converge to the answer. No early return — let the loop end and return `l` (which equals `r`). One side keeps mid (`r = mid` or `l = mid`), the other excludes it (`l = mid + 1` or `r = mid - 1`).\n\n**Decision rule:** If you're looking for a specific value, use `l <= r`. If you're looking for the first/last position satisfying a condition (leftmost true, min feasible answer, etc.), use `l < r`."
      },
      {
        "id": "Q2",
        "question": "You suspect a problem can be solved by binary searching on the answer value itself (not on an array index). What three things do you need to define, and what does the template look like?",
        "answer": "Define: (1) **search range** `[lo, hi]` over candidate answers (e.g., `[1, max(piles)]` for Koko). (2) **Feasibility predicate** `feasible(mid)` that checks in O(n) whether `mid` is a valid answer. (3) **Direction** — are you minimizing (search left when feasible) or maximizing (search right)?\n\n**Template (minimize):**\n```\nlo, hi = min_possible, max_possible\nwhile lo < hi:\n    mid = (lo + hi) // 2\n    if feasible(mid):\n        hi = mid        # mid works, try smaller\n    else:\n        lo = mid + 1    # mid fails, need bigger\nreturn lo\n```\nCommon in 'minimize the max' / 'maximize the min' problems (Koko, ship packages, split array)."
      },
      {
        "id": "Q3",
        "question": "You need to find the first occurrence of a target in a sorted array (or the insertion point if absent). Write out the binary search template — what's the loop condition and how do you update bounds?",
        "answer": "`while l < r: m = (l+r)//2; if a[m] < target: l = m+1 else: r = m`. After loop, `l` is the insertion point."
      },
      {
        "id": "Q4",
        "question": "*Given a sorted array that was rotated at an unknown pivot (e.g., `[4,5,6,7,0,1,2]`), search for a target value in O(log n).* How do you decide which half to search at each step?",
        "example": "Input:  nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4",
        "answer": "At each mid, one half is always sorted. Check which (`a[l] <= a[m]`). If target falls in that sorted half's range, search there; else search the other. O(log n)."
      },
      {
        "id": "Q5",
        "question": "*Given a sorted array rotated at an unknown pivot (no duplicates), find the minimum element in O(log n).* In your binary search, why must you compare `mid` to the right endpoint rather than the left?",
        "example": "Input:  nums = [3,4,5,1,2]\nOutput: 1",
        "answer": "Right is a stable anchor: `a[m] > a[r]` means min is strictly right of m; else min is at m or left of m. Comparing to left breaks on already-sorted inputs."
      },
      {
        "id": "Q6",
        "question": "What does \"Koko eating bananas\" binary search over? (See also F8)",
        "answer": "Speed `k ∈ [1, max(piles)]`. Predicate: `sum(ceil(p/k)) <= h`. Record candidate when predicate holds; continue searching left for minimum."
      },
      {
        "id": "Q7",
        "question": "Median of two sorted arrays in O(log(min(m, n))) — what's being searched? (See also F9)",
        "answer": "The partition index `i` in the shorter array. `j = (m+n+1)//2 - i`. Valid when `maxLeft1 <= minRight2` AND `maxLeft2 <= minRight1`. Guard with ±∞."
      },
      {
        "id": "Q8",
        "question": "In `while l < r` binary search, you set `r = mid` when you want to keep mid as a candidate (\"search left including mid\"). Why does pairing `r = mid` with `while l <= r` cause an infinite loop?",
        "answer": "With `while l <= r`, the loop runs while `l == r`. If `r = mid` and `l == r`, then `mid = l = r`, and setting `r = mid` doesn't change anything — the loop never exits.\n\n**The pairing rules:**\n- `while l <= r` → both sides must exclude mid: `l = mid + 1`, `r = mid - 1`. This shrinks the interval every iteration.\n- `while l < r` → one side keeps mid (`r = mid` or `l = mid`), the other excludes it. The loop exits when `l == r`, which is your answer.\n\nIf you use `r = mid - 1` with `while l < r`, you might skip the answer. If you use `r = mid` with `while l <= r`, you infinite-loop. The templates are paired for a reason."
      },
      {
        "id": "Q9",
        "question": "When using `while l < r` with `l = mid` (searching right, keeping mid as candidate), why do you need `mid = (l + r + 1) // 2` (ceiling division) instead of the usual `mid = (l + r) // 2`?",
        "answer": "With floor division and two elements left (`l, l+1`), `mid = l`. Setting `l = mid` doesn't advance — infinite loop.\n\n**Ceiling division** (`(l + r + 1) // 2`) rounds up, so `mid = l + 1 = r`, and `l = mid` actually moves `l` forward.\n\n**Rule of thumb:** if you write `l = mid`, use ceiling. If you write `r = mid`, use floor (the default). This is the only place you need to think about rounding — it only matters when the keeping side is `l = mid`."
      },
      {
        "id": "Q10",
        "question": "For each problem below, which template — `while l <= r` (exact match) or `while l < r` (boundary) — and what are the bound updates?\n\n1. Classic search for target in sorted array\n2. Find leftmost index where `arr[i] >= target` (lower_bound)\n3. Koko eating bananas — minimum speed to finish in h hours\n4. Find peak element (any local max in an unsorted array)",
        "answer": "1. **`while l <= r`** — looking for exact value. `l = mid+1`, `r = mid-1`, return `mid` on match.\n\n2. **`while l < r`** — finding a boundary. `if arr[mid] >= target: r = mid` (mid could be the answer), else `l = mid+1`. Return `l`.\n\n3. **`while l < r`** — minimizing over answer space. `if feasible(mid): r = mid`, else `l = mid+1`. Return `l`.\n\n4. **`while l < r`** — converging to a peak. `if arr[mid] < arr[mid+1]: l = mid+1` (peak is right), else `r = mid` (peak is at mid or left). Return `l`.\n\nNotice: problems 2–4 all use `r = mid` with floor division. You'd only use `l = mid` (with ceiling) if finding a *rightmost* boundary (e.g., last position where condition holds)."
      }
    ]
  },
  {
    "id": 5,
    "title": "Sliding Window",
    "cards": [
      {
        "id": "Q1",
        "question": "In sliding window problems, what's the difference between fixed-size and variable-size windows? When do you use each, and how does the shrink logic differ?",
        "answer": "Fixed: exactly k elements; slide one in, one out each step. Variable: expand right to satisfy/violate a condition, shrink left to restore; track the optimum."
      },
      {
        "id": "Q2",
        "question": "*Given a string `s`, find the length of the longest substring without any repeating characters.* Walk through the sliding window template.",
        "example": "Input:  s = \"abcabcbb\"\nOutput: 3  (\"abc\")",
        "answer": "Expand right, add char to a set. While duplicate exists, shrink left, remove char. Track `max(right - left + 1)`. O(n)/O(|alphabet|)."
      },
      {
        "id": "Q3",
        "question": "*Given strings `s` and `t`, return the shortest substring of `s` that contains every character in `t` (including duplicates). Return `\"\"` if no such substring exists.*\nWhat's the template for \"minimum window substring\"?",
        "example": "Input:  s = \"ADOBECODEBANC\", t = \"ABC\"\nOutput: \"BANC\"",
        "answer": "Expand right, track char counts vs. required. When all required chars are satisfied, shrink left while still valid, tracking min window. O(n)."
      },
      {
        "id": "Q4",
        "question": "Some sliding window problems need a deque (double-ended queue) instead of just two pointers. What type of problem requires this, and what invariant does the deque maintain? (See also F11)",
        "answer": "Sliding-window max/min in O(n): maintain indices in monotonic order; front is always the max/min of the current window. Pop from back when new element dominates; pop from front when out of window."
      },
      {
        "id": "Q5",
        "question": "*Given an array `prices` where `prices[i]` is the stock price on day `i`, find the maximum profit from one buy and one sell (buy before sell). Return 0 if no profit is possible.*\n\"Best time to buy and sell stock\" — why is this a window problem?",
        "example": "Input:  prices = [7,1,5,3,6,4]\nOutput: 5  (buy at 1, sell at 6)",
        "answer": "Left pointer tracks the lowest price seen so far; right pointer scans. Max profit = `price - min_seen`. One pass, O(n)."
      },
      {
        "id": "Q6",
        "question": "*Given a string `s` and integer `k`, you can replace at most `k` characters. Find the length of the longest substring where all characters are the same after replacements.* Why is it safe to leave `maxCount` stale-high when shrinking the window? (See also F10)",
        "answer": "`maxCount` tracks the best frequency seen in any window. A stale-high value only makes the check stricter — you'll never accept an invalid window. The result only updates when a genuinely larger valid window is found."
      },
      {
        "id": "Q7",
        "question": "For character-count windows, how do you avoid O(26) checks on every step?",
        "answer": "Maintain a counter of \"how many chars currently match the required frequency.\" Increment when a char's count hits its target; decrement when it drops below. O(1) check per step."
      }
    ]
  },
  {
    "id": 6,
    "title": "Trees",
    "cards": [
      {
        "id": "Q1",
        "question": "Name the three DFS traversal orders for binary trees, state the node-visit sequence for each, and give a canonical use case where each one is the natural fit.",
        "answer": "Pre-order (root, L, R): serialize/clone. In-order (L, root, R): sorted traversal of BSTs. Post-order (L, R, root): aggregate from children (heights, sums)."
      },
      {
        "id": "Q2",
        "question": "How do you compute the height of a binary tree?",
        "answer": "`1 + max(height(left), height(right))`; return `-1` (or `0`) for `None` depending on your convention."
      },
      {
        "id": "Q3",
        "question": "How to check if a binary tree is balanced?",
        "answer": "Post-order recursion returning height; if any subtree returns `-1` (sentinel for \"unbalanced\"), propagate it up. O(n) with early-exit."
      },
      {
        "id": "Q4",
        "question": "*Given the root of a binary tree, return the length of the diameter — the longest path between any two nodes (measured in edges). The path may or may not pass through the root.*\nDiameter of a binary tree — what do you return vs. what do you update?",
        "example": "Input:  root = [1,2,3,4,5]\nOutput: 3  (path 4→2→1→3 or 5→2→1→3)",
        "answer": "Return height to parent. Update a shared `diameter` with `left_height + right_height` at each node. Diameter need not pass through the root."
      },
      {
        "id": "Q5",
        "question": "*Given the root of a binary tree, determine if it is a valid BST (every node's value is strictly between its ancestors' constraints).* What's the common bug in a naive recursive check, and how do you fix it?",
        "answer": "Checking only `left < root < right` locally misses constraints from ancestors. Correct: pass `(min_bound, max_bound)` down the recursion, or do in-order traversal and verify strictly increasing."
      },
      {
        "id": "Q6",
        "question": "*Given a binary tree and two nodes `p` and `q`, find their lowest common ancestor (the deepest node that has both p and q as descendants).* Describe the recursive algorithm.",
        "answer": "Recurse into both children. If both return non-null, current node is the LCA. Else return whichever child is non-null. O(n)."
      },
      {
        "id": "Q7",
        "question": "*Given a BST and two nodes `p` and `q`, find their lowest common ancestor.* Why is this simpler than the general binary tree case, and what's the algorithm?",
        "answer": "Walk from root: if both p,q < node → go left; if both > node → go right; else current node is the LCA. O(h)."
      },
      {
        "id": "Q8",
        "question": "How to serialize/deserialize a binary tree? (See also F17)",
        "answer": "Pre-order DFS with null markers (`\"N\"`), or BFS level-order. Deserialize by consuming tokens and recursively (or iteratively) building. O(n) both ways."
      },
      {
        "id": "Q9",
        "question": "*Given a binary tree, return its level-order traversal as a list of lists (each inner list = one level, left to right).* What data structure drives this, and how do you know when one level ends and the next begins?",
        "answer": "A queue (BFS). Process one level at a time by recording the queue length at the level's start and popping exactly that many."
      },
      {
        "id": "Q10",
        "question": "*Given two integer arrays `preorder` and `inorder` (both representing traversals of the same binary tree with unique values), construct and return the binary tree.*\nHow do you build a tree from preorder + inorder?",
        "example": "Input:  preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]\nOutput: [3,9,20,null,null,15,7]",
        "answer": "First element of preorder is the root. Find it in inorder — splits left/right subtrees. Use a hash map (value → inorder index) to make splits O(1). Recurse on slices. O(n) total."
      },
      {
        "id": "Q11",
        "question": "*Given a BST and integer `k`, return the kth smallest value (1-indexed).* Walk through the iterative inorder approach using a stack. (See also F16)",
        "answer": "Use a stack and `node` pointer. Inner `while node:` pushes the entire left spine. Pop, decrement k, return if k==0, then go right. Never push without checking left first."
      },
      {
        "id": "Q12",
        "question": "*Given a binary tree where each node has an integer value (can be negative), find the path with the maximum sum. A path is any sequence of connected nodes (doesn't need to pass through the root or be root-to-leaf).*\nMax path sum — what two quantities do you compute per recursion?",
        "example": "Input:  root = [-10,9,20,null,null,15,7]\nOutput: 42  (path 15→20→7)",
        "answer": "**Return to parent:** `node.val + max(0, max(left_gain, right_gain))` (a straight path that can extend upward). **Update global:** `node.val + max(0, left_gain) + max(0, right_gain)` (path that bends at this node)."
      },
      {
        "id": "Q13",
        "question": "*Given the root of a binary tree, invert it (mirror it) and return the root.* This is trivially easy — so what's the real interview value, and what's the one-liner?",
        "example": "Input:  root = [4,2,7,1,3,6,9]\nOutput: [4,7,2,9,6,3,1]",
        "answer": "Recursively swap left and right children: `root.left, root.right = invert(root.right), invert(root.left); return root`. Base case: `if not root: return None`. The interview value isn't the algorithm — it's demonstrating clean recursion, handling the base case, and (if asked) converting to iterative BFS with a queue. Also tests: can you recognize this is just a post-order traversal where the 'visit' step is a swap? O(n) time, O(h) space."
      },
      {
        "id": "Q14",
        "question": "*Given the root of a binary tree, return the values of the nodes you can see from the right side, ordered from top to bottom.* How does this differ from a standard level-order traversal?",
        "example": "Input:  root = [1,2,3,null,5,null,4]\nOutput: [1,3,4]",
        "answer": "It's BFS level-order, but you only record the **last node of each level**. Process one level at a time (record queue length, pop that many); after each level, append the last-popped value. Alternatively, DFS with a `depth` parameter: visit right subtree first; if `depth == len(result)`, this is the first node seen at this depth from the right → append it. The DFS approach is O(n) time, O(h) space."
      },
      {
        "id": "Q15",
        "question": "*House Robber III (LC 337): houses form a binary tree; you can't rob two directly-connected houses. Maximize the loot.* What's the optimal approach, and why does naive recursion blow up?",
        "answer": "Naive recursion (rob node → recurse on grandchildren; skip node → recurse on children) recomputes overlapping subtrees exponentially. **Optimal = tree DP: one post-order DFS returning a pair `(rob, skip)` per node.** `rob = node.val + left.skip + right.skip` (rob here, so both children must be skipped); `skip = max(left.rob, left.skip) + max(right.rob, right.skip)` (don't rob here, each child free to choose). Answer = `max(root.rob, root.skip)`. O(n) time, O(h) stack — each node visited once, returning both states kills the recomputation.",
        "new": true
      }
    ]
  },
  {
    "id": 7,
    "title": "Tries",
    "cards": [
      {
        "id": "Q1",
        "question": "What's the core data layout of a trie node?",
        "answer": "A map (or fixed-size array for known alphabet) from char → child node, plus a boolean `is_end` marking a completed word."
      },
      {
        "id": "Q2",
        "question": "For a trie supporting `insert(word)`, `search(word)`, and `startsWith(prefix)`, what is the time complexity of each operation and what determines it?",
        "answer": "All O(k) in the length of the word. Space O(total characters stored) worst case."
      },
      {
        "id": "Q3",
        "question": "When is a trie preferable to a hash set of strings?",
        "answer": "When you need prefix queries, autocomplete, or longest-common-prefix, or want to amortize repeated prefixes in memory."
      },
      {
        "id": "Q4",
        "question": "*Given an `m × n` board of characters and a list of words, return all words that can be formed by sequentially adjacent cells (horizontal/vertical, no cell reused per word).*\nHow does \"Word Search II\" use a trie?",
        "example": "Input:  board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]], words = [\"oath\",\"pea\",\"eat\",\"rain\"]\nOutput: [\"eat\",\"oath\"]",
        "answer": "Build a trie of all query words. DFS from each grid cell, advancing the trie pointer only if the next char is a child. Prune by removing found words from the trie mid-search."
      },
      {
        "id": "Q5",
        "question": "*Design a data structure that supports `addWord(word)` and `search(word)` where search can contain `.` as a wildcard matching any single character.* How does the wildcard change the trie search logic?",
        "example": "addWord(\"bad\"), addWord(\"dad\")\nsearch(\"b.d\") → true\nsearch(\".ad\") → true\nsearch(\"b..\") → true",
        "answer": "On `.`, recurse into ALL children rather than indexing one. Otherwise behaves like a normal search."
      },
      {
        "id": "Q6",
        "question": "Why `is_end` separately rather than just storing words at nodes?",
        "answer": "A longer word passes through the same nodes as a shorter one (e.g., \"app\" inside \"apple\"). `is_end` marks that a word terminates here independently of children."
      }
    ]
  },
  {
    "id": 8,
    "title": "Backtracking",
    "cards": [
      {
        "id": "Q1",
        "question": "If someone asked you to describe the backtracking template in one sentence — the pattern that subsets, permutations, and N-Queens all share — what would you say?",
        "answer": "Recursive DFS: append a choice → recurse → pop the choice; at base case, record the current partial result."
      },
      {
        "id": "Q2",
        "question": "*Subsets: given `[1,2,3]`, return all subsets. Permutations: given `[1,2,3]`, return all orderings.* What's the key structural difference in the recursive calls?",
        "answer": "Subsets iterate from `start` to n (avoids duplicate orderings). Permutations use a `used` array, starting from 0 each level (all positions considered)."
      },
      {
        "id": "Q3",
        "question": "*When the input array contains duplicates (e.g., `[1,2,2]`), how do you generate subsets or permutations without duplicate results?* What's the sorting + skip trick?",
        "answer": "Sort the input. Skip a value at the same depth if it equals the previous value (and for perms: the previous value was not just used — i.e., `not used[i-1]`)."
      },
      {
        "id": "Q4",
        "question": "*Given an array of distinct integers `candidates` and a target integer, return all unique combinations that sum to target. The same number may be used unlimited times.*\n\"Combination sum\" — why is it OK to reuse elements, and how does the code express that?",
        "example": "Input:  candidates = [2,3,6,7], target = 7\nOutput: [[2,2,3],[7]]",
        "answer": "The recursive call passes `i` (not `i+1`) as the next start, allowing the same element again. Skip to `i+1` only when explicitly moving past an element."
      },
      {
        "id": "Q5",
        "question": "*Place n queens on an n×n board so no two attack each other.* What three things do you track to check conflicts in O(1) per placement, and what keys identify each diagonal? (See also F18)",
        "answer": "Track three sets: columns used, diagonals (`r - c`), anti-diagonals (`r + c`). Reject placements that conflict. O(1) check per candidate placement."
      },
      {
        "id": "Q6",
        "question": "Difference between DFS and backtracking?",
        "answer": "Backtracking *undoes* state changes on the way out of recursion (path, visited markers, partial counts). DFS over an immutable structure doesn't need to."
      },
      {
        "id": "Q7",
        "question": "*Given an m×n grid of characters and a word, determine if the word exists by following adjacent cells (no reuse).* What's the standard in-place trick for tracking visited cells during DFS, and why is it better than a separate set?",
        "answer": "Temporarily overwrite the grid cell with a sentinel (e.g., `'#'`); restore it on backtrack. Avoids a separate visited set."
      },
      {
        "id": "Q8",
        "question": "When should you memoize backtracking?",
        "answer": "Only when subproblems genuinely repeat (the state can be canonicalized). \"Word break\" memoizes on `start` index. \"Permutations\" cannot, because the path itself is part of the state."
      }
    ]
  },
  {
    "id": 9,
    "title": "System Design — Fundamentals & Estimation",
    "cards": [
      {
        "id": "Q1",
        "question": "You're presenting a design doc for a new service. How would you argue that the design addresses reliability, scalability, and maintainability — what concrete evidence would you point to for each?",
        "answer": "**Reliability** (works correctly under faults): redundancy, failover, retries with backoff, chaos testing, no single points of failure. **Scalability** (handles increased load): load parameters identified (QPS, data volume), horizontal scaling path, stateless tiers, partitioning strategy. **Maintainability** (productive to work on over time): operability (runbooks, monitoring, easy deploys), simplicity (clear abstractions, no accidental complexity), evolvability (modular boundaries, schema migration path). A good design doc addresses all three with specific mechanisms, not just aspirational statements."
      },
      {
        "id": "Q2",
        "question": "In distributed systems, what's the difference between a fault and a failure? Why does this distinction matter for system design?",
        "answer": "Fault = one component deviates from spec (a disk dies, a node hangs). Failure = the system as a whole stops serving. **Fault tolerance = stopping faults from cascading into failure.** *Where it shows up:* every availability target — a 3-replica DB tolerates one node fault without failure; redundancy, retries, and bulkheads are how you hit '99.99%'. *Tradeoff:* tolerance costs redundancy (money) and failover logic that can itself be buggy."
      },
      {
        "id": "Q3",
        "question": "Why measure latency with percentiles rather than averages?",
        "answer": "Averages hide tail behavior; p95/p99 show what slow users actually experience, and tail latency amplifies under fan-out. *Where it shows up:* SLOs are written and alerted on p99/p99.9 — the mean can look healthy while 1% of users time out. *Tradeoff:* chasing p99.9 is far more expensive than p50, so you optimize the tail only where the product needs it."
      },
      {
        "id": "Q4",
        "question": "What is tail latency amplification?",
        "answer": "If a request fans out to many backends and waits for all, overall latency approaches the slowest backend's tail — 100 backends at p99=1s means ~63% of requests hit at least one slow one. *Where it shows up:* scatter-gather designs — search across 100 shards, any fan-out read. *Fix/tradeoff:* hedged (backup) requests — send a duplicate to a second replica after a short delay, take the first to answer — cut the tail at the cost of extra load."
      },
      {
        "id": "Q5",
        "question": "What are the two fundamental approaches to scaling a system, and what does each one trade off against the other?",
        "answer": "Vertical (bigger machine): simple, but a hard ceiling. Horizontal (more machines): elastic, but demands partitioning + failure handling. *Where it shows up:* the moment one Postgres can't keep up you face this fork. *Tradeoff:* scaling up delays complexity but doesn't remove the ceiling; scaling out removes the ceiling but you now own sharding, rebalancing, and partial-failure handling."
      },
      {
        "id": "Q6",
        "question": "Walk through the 6 phases of a system design interview in order. What do you cover in each phase?",
        "answer": "(1) Requirements (functional + non-functional). (2) Back-of-envelope estimation (QPS, storage, bandwidth). (3) API design. (4) Data model. (5) High-level diagram. (6) Deep-dive into 1–2 hard components; discuss bottlenecks and tradeoffs."
      },
      {
        "id": "Q7",
        "question": "At the start of any system design interview, there are two categories of clarifying questions you should always ask before designing anything. What are they?",
        "answer": "(1) Scale: DAU, read/write ratio, data retention? (2) Consistency expectations: can this tolerate eventual consistency anywhere?"
      },
      {
        "id": "Q8",
        "question": "What's the actual *method* of back-of-envelope estimation — not just computing numbers, but using them to drive the design?",
        "answer": "The method is: **compute a number → compare it to a single node's capacity → the gap forces a specific architectural move** (shard / replicate / cache / fan-out / object store). Worked example (web crawler): 20B pages / 7 days ≈ **33k pages/sec**; one machine is bandwidth-bound (~1 Gbps ÷ 1 MB/page ≈ 125/sec) → **hundreds of machines = a coordinated fleet**. 20B × 1 MB = **20 PB** → object store, not a database. **Senior move:** state soft per-node numbers as explicit assumptions and show the conclusion is *robust* to them, rather than asserting a precise figure."
      },
      {
        "id": "Q9",
        "question": "What order-of-magnitude latency numbers should you have memorized to sanity-check a design?",
        "answer": "L1 ~1 ns, RAM ref ~100 ns, SSD random read ~150 µs, same-datacenter round trip ~0.5 ms, HDD seek ~10 ms, cross-continent round trip ~150 ms. Redis GET ~0.5–1 ms; indexed DB query ~1–5 ms. *Why it matters:* they tell you instantly whether a latency budget is feasible — e.g., 10 sequential cross-region calls = ~1.5 s, which blows a 200 ms SLO, so you must parallelize or co-locate."
      },
      {
        "id": "Q10",
        "question": "What single-node throughput ceilings let you size a fleet quickly?",
        "answer": "Rules of thumb: app server ~1–10k req/s; Postgres/MySQL ~5–10k read QPS and ~1–5k write QPS; Redis ~100k ops/s; Cassandra ~10–15k writes/s per node; Kafka broker ~200k–500k msg/s; one WebSocket box ~50–100k concurrent connections. *Use:* required_QPS ÷ per-node_capacity = node count — if it's >1, the design is *forced* to shard or replicate, and that's your justification."
      },
      {
        "id": "Q11",
        "question": "What quick-math shortcuts speed up estimation?",
        "answer": "~100k seconds/day (really 86,400). 1M req/day ≈ 12 QPS; 1B req/day ≈ 12k QPS. Peak ≈ 2–5× average. 1 KB × 1M = 1 GB. Storage = items/day × item_size × retention_days. *Why:* lets you go from a DAU figure to QPS, storage, and bandwidth in seconds, so estimation never stalls the interview."
      }
    ]
  },
  {
    "id": 10,
    "title": "System Design — Data Storage & Modeling",
    "cards": [
      {
        "id": "Q1",
        "question": "You're choosing a data model for a new service. When would you pick a document store vs. a relational database vs. a graph database? Give a one-sentence use case for each.",
        "answer": "Relational (Postgres, MySQL): structured data, many-to-many relationships, strong consistency, joins. Document (MongoDB, DynamoDB): self-contained records, schema flexibility, tree-shaped data. Graph (Neo4j): pervasive many-to-many traversals — social graphs, fraud, recommendations. *Tradeoff:* relational gives joins + integrity but a rigid schema; document trades joins for flexibility and forces you to denormalize for your access patterns; graph only wins when traversals dominate."
      },
      {
        "id": "Q2",
        "question": "Schema-on-read vs. schema-on-write tradeoff?",
        "answer": "Schema-on-write (relational): schema enforced at insert — rigid but bad data is rejected at the door. Schema-on-read (document): interpretation happens at read time — flexible but pushes validation into application code. *Where it shows up:* schema-on-read fits log/event ingestion where producers evolve independently; schema-on-write fits a transactional core where correctness can't be optional."
      },
      {
        "id": "Q3",
        "question": "Your interviewer asks you to compare LSM-trees and B-trees as storage engine internals. What's the fundamental difference in how each handles writes, what is write amplification, and how does it manifest in each?",
        "answer": "**LSM-tree** (Cassandra, ScyllaDB, RocksDB, LevelDB): append-only writes into sorted segments (SSTables), merged by background compaction — high write throughput, good compression, worse read tail. **B-tree** (Postgres, MySQL/InnoDB): in-place updates in fixed-size pages — good read latency, mature, but each write rewrites a full page + a WAL entry. **Write amplification** = bytes written to storage ÷ bytes of app data; LSM rewrites data 10–30× across compaction levels (high write amp but sequential I/O), B-trees rewrite a 4 KB page per small update (lower write amp but random I/O). *Where it shows up:* 'design a metrics pipeline at 1M writes/sec' → LSM, and the *why* is exactly this write-amp + sequential-I/O argument; read-heavy transactional (accounts, orders) → B-tree."
      },
      {
        "id": "Q4",
        "question": "When a partitioned database needs a secondary index, there are two strategies. What are they, and what does each optimize for (reads vs. writes)?",
        "answer": "Local indexes (each partition indexes its own data; reads fan out to all partitions). Global indexes (the index is partitioned separately by the indexed attribute; fast targeted reads but writes touch a different partition than the base row, needing async propagation or distributed transactions). *Where it shows up:* DynamoDB LSIs vs GSIs. *Tradeoff:* local optimizes writes (everything stays in one partition); global optimizes reads (no fan-out) at the cost of write complexity and eventual consistency on the index."
      },
      {
        "id": "Q5",
        "question": "Why are covering indexes a big deal?",
        "answer": "A covering index contains every column a query needs, so the engine answers from the index alone and never touches the primary row (an 'index-only scan'). *Where it shows up:* a hot read path you must get under a few ms. *Tradeoff:* big read-latency win, paid for in extra index storage and slower writes (every covered column must be maintained in the index too)."
      },
      {
        "id": "Q6",
        "question": "You're explaining to a junior engineer why OLTP and OLAP workloads need different storage engines. What are the key differences in their access patterns?",
        "answer": "OLTP: small row count per query, keyed by primary key, latency-sensitive, high write rate (user-facing apps). OLAP: large aggregate scans over many rows, analyst-driven, throughput-oriented (dashboards, reporting). *Where it shows up:* OLTP → row-oriented Postgres/MySQL; OLAP → column-oriented ClickHouse / Redshift / BigQuery. *Tradeoff:* column stores compress and scan aggregates beautifully but are terrible at point lookups and single-row writes — never run analytics on your OLTP primary."
      },
      {
        "id": "Q7",
        "question": "How do you decide SQL vs NoSQL for a new service?",
        "answer": "Pick **SQL** for strong consistency, multi-row transactions, joins, ad-hoc/evolving queries, and moderate scale — accounts, orders, payments, anything where integrity matters. Pick **NoSQL** for massive write throughput, well-known access patterns, flexible schema, and horizontal scale — feeds, time-series, sessions, event data. *Tradeoff:* NoSQL buys scale by giving up joins, multi-key transactions, and ad-hoc querying — you must design the data model around your queries up front, and changing query patterns later is painful."
      },
      {
        "id": "Q8",
        "question": "What are the common cache eviction policies and when do you pick each?",
        "answer": "**LRU** (evict least-recently-used): the default, exploits temporal locality. **LFU** (evict least-frequently-used): keeps genuinely hot items through bursts, at the cost of more bookkeeping and slow adaptation to changing popularity. **TTL** (expire by time): for time-bounded data — sessions, tokens, rate-limit windows. *Tradeoff:* LRU is simple but a large scan can flush your hot set ('cache pollution'); LFU resists that but reacts slowly when what's popular changes."
      },
      {
        "id": "Q9",
        "question": "How should a system handle large media (images, video, files)?",
        "answer": "Store the bytes in **object storage** (S3/GCS) and keep only a reference/key in your database. Have clients upload via **pre-signed URLs** — the client uploads directly to S3 and your servers never proxy the bytes. *Where it shows up:* chat attachments, YouTube uploads, Instagram. *Tradeoff:* object storage is cheap, durable, and CDN-friendly but has high per-object latency and no query ability — it's a key→blob store, so all searchable metadata must live in your DB."
      },
      {
        "id": "Q10",
        "question": "How does full-text search work, and what's the tradeoff of adding it?",
        "answer": "Full-text search is built on an **inverted index**: term → list of documents containing it (the core of Elasticsearch / Lucene), enabling fast ranked and fuzzy matching. *Where it shows up:* product search, log search, autocomplete. *Tradeoff:* it's a denormalized *copy* of your data that lags the source (eventual consistency) and costs storage + write amplification — great as a search layer, never as your system of record."
      }
    ]
  },
  {
    "id": 11,
    "title": "System Design — Replication, Partitioning & Consistency",
    "cards": [
      {
        "id": "Q1",
        "question": "Name the three main replication architectures for distributed databases. For each, state in one sentence how writes flow and what the key tradeoff is.",
        "answer": "Single-leader (writes to leader, async/sync to followers). Multi-leader (writes at multiple nodes; conflict resolution needed). Leaderless (quorum reads and writes, e.g., Dynamo)."
      },
      {
        "id": "Q2",
        "question": "Replication lag — what anomaly does it cause?",
        "answer": "Replication lag is the time between a write committing on the leader and becoming visible on followers. *Where it shows up:* it's the root cause of read-your-writes, monotonic-read, and consistent-prefix anomalies (next card is the classic example). *Tradeoff:* synchronous replication eliminates lag but adds write latency and reduces availability (a slow follower stalls writes); asynchronous replication is fast and available but exposes these anomalies."
      },
      {
        "id": "Q3",
        "question": "A user updates their profile photo but refreshes and still sees the old one. What consistency guarantee was violated, and name two infrastructure-level fixes.",
        "answer": "**Read-your-writes consistency** was violated — after a user writes X, that same user should always see X on subsequent reads. **Fix 1:** Route that user's reads to the leader for a short window after their write (e.g., read from leader for 10s after any profile update). **Fix 2:** Tag the client session with the last write's version/timestamp; replicas only serve reads if they're caught up past that version. Both avoid forcing *all* reads to the leader while guaranteeing the writing user sees their own update."
      },
      {
        "id": "Q4",
        "question": "You're partitioning a database table across nodes. Compare range partitioning vs. hash partitioning — what does each do well, and where does each hurt?",
        "answer": "Range: ordered scans easy; risk of hot ranges (e.g., timestamp keys). Hash: uniform distribution; loses range-scan ability. Consistent hashing mitigates rebalancing pain."
      },
      {
        "id": "Q5",
        "question": "Hot partition — what is it, how do you mitigate?",
        "answer": "One partition gets disproportionate traffic. *Where it shows up:* a celebrity user, a viral/trending key, or a monotonically-increasing timestamp key that funnels all writes to the newest partition. *Mitigations & tradeoff:* salt the key with a random prefix (spreads writes, but reads now need scatter-gather), application-level splitting of the hot key, or a cache in front (adds an invalidation problem). Each trades read complexity or staleness for write spread."
      },
      {
        "id": "Q6",
        "question": "CAP in practical engineering terms?",
        "answer": "During a network partition you must choose Consistency (reject requests that can't see the latest write) or Availability (answer with possibly-stale data); with no partition you generally get both. *Where it shows up:* a checkout/inventory path should pick CP (reject rather than oversell); a social feed should pick AP (serve stale, stay up). *Tradeoff:* the choice is per-operation, not system-wide — you decide per request whether a wrong answer or no answer is worse."
      },
      {
        "id": "Q7",
        "question": "An interviewer asks: 'What's the difference between linearizability and serializability?' These are commonly confused. Distinguish them clearly.",
        "answer": "**Linearizability:** single-object, real-time ordering — every read sees the most recent completed write, as if there were one copy. **Serializability:** multi-object transactions appear to run in *some* serial order (not necessarily real-time). *Where it shows up:* you need linearizability for a distributed lock / leader-election / config store (etcd) where a read must see the latest write; you need serializability for a bank transfer or inventory checkout where several rows must move as one consistent unit. *Tradeoff:* linearizability costs latency (every op coordinates through consensus); serializable isolation costs throughput (locking or abort-and-retry under contention) — which is why systems deliberately drop to snapshot isolation or eventual consistency where they can."
      },
      {
        "id": "Q8",
        "question": "What does quorum (R + W > N) guarantee?",
        "answer": "Quorum (R + W > N) guarantees a read set overlaps the last successful write set, so at least one responding replica has the latest value. *Where it shows up:* Dynamo-style stores (Cassandra, DynamoDB) expose R and W as tunable knobs — R=W=1 is fast and loose, R+W>N is consistent-ish. *Tradeoff:* overlap guarantees you *see* the latest successful write, but it is NOT linearizable — concurrent writes and lack of real-time ordering still need read-repair, anti-entropy, or version reconciliation."
      }
    ]
  },
  {
    "id": 12,
    "title": "System Design — Coordination & Transactions",
    "cards": [
      {
        "id": "Q1",
        "question": "What is split-brain in a replicated system, why is it dangerous, and how does a proper leader-election protocol (e.g., Raft) prevent it?",
        "answer": "Split-brain = two nodes simultaneously believe they're leader, so both accept writes and diverge/corrupt data. *Where it shows up:* leader failover in any replicated store — an old leader that 'comes back' after a network blip is the danger. *Fix & tradeoff:* fencing tokens (a monotonically increasing epoch that storage rejects if stale) plus majority-quorum election (Raft/Paxos) prevent it — at the cost of needing an odd node count and a live majority to make any progress."
      },
      {
        "id": "Q2",
        "question": "When would you reach for a consensus protocol like Raft in a system design, what does it give you, and what does it cost?",
        "answer": "**When:** leader election, distributed locks, configuration stores, replicated state machines — anywhere you need a group of nodes to agree on a single value or ordering of events despite crashes. (Think: metadata services, coordination layers like etcd/ZooKeeper, not hot-path user data.)\n\n**What it gives you:** linearizable reads/writes, automatic leader election, guaranteed no split-brain. Committed entries are never lost as long as a majority survives.\n\n**What it costs:** writes require a majority round-trip (latency floor = network RTT to the slowest quorum member). Throughput limited to what a single leader can sequence. Requires an odd number of nodes (3 or 5 typical); 2 of 3 must be up for progress. Not suitable for high-throughput data planes — use it for control planes and coordination."
      },
      {
        "id": "Q3",
        "question": "What is a saga, and when over distributed transactions?",
        "answer": "A saga is a long-running business transaction split into local transactions, each with a compensating action to undo it on failure. *Where it shows up:* e-commerce checkout across order / inventory / payment services — reserve inventory → charge card → confirm order, releasing inventory if payment fails. *Tradeoff:* buys availability and scale over cross-service 2PC, but you lose atomicity — intermediate states are visible, and every compensation must be idempotent and itself reliable."
      },
      {
        "id": "Q4",
        "question": "Idempotency keys — why do they matter?",
        "answer": "Retries can cause duplicate writes. An idempotency key lets the server deduplicate: first request creates a record keyed by the ID; retries observe the existing record and return the original result. Essential for any write API that callers may retry (payments, order creation)."
      },
      {
        "id": "Q5",
        "question": "What is two-phase commit (2PC), and why do microservices usually avoid it?",
        "answer": "A coordinator runs two rounds: 'prepare' (every participant votes and locks resources) then 'commit' (if all voted yes) or 'abort'. It gives true atomicity across nodes. *Where it shows up:* a single distributed transaction that must be strictly all-or-nothing. *Tradeoff:* it's **blocking** — if the coordinator dies after participants vote 'prepare', they hold locks indefinitely, killing availability. That fragility is exactly why microservices prefer sagas + idempotency over 2PC."
      },
      {
        "id": "Q6",
        "question": "How do you implement a distributed lock, and what's the tradeoff between the two common approaches?",
        "answer": "**Redis SETNX + TTL:** fast and simple, but best-effort — the TTL can expire while the holder is still working, letting two holders overlap; mitigate with fencing tokens. **ZooKeeper / etcd:** consensus-backed ephemeral nodes, strongly correct, but slower and heavier. *Where it shows up:* leader election, 'only one worker may process this job.' *Tradeoff:* Redis trades correctness for latency; ZK/etcd trade latency for correctness — choose by how bad a double-acquire actually is."
      },
      {
        "id": "Q7",
        "question": "Why can't you order distributed events by wall-clock time, and what do you use instead?",
        "answer": "Clock skew across machines means timestamps can't reliably order events. **Lamport clocks** give a total order consistent with causality (if A caused B, A's counter < B's). **Vector clocks** go further and *detect concurrent* (conflicting) writes. *Where it shows up:* Dynamo-style conflict detection, collaborative editing, event ordering. *Tradeoff:* vector clocks grow with the number of writers and need pruning; many systems punt to last-write-wins — simpler, but it silently drops concurrent updates."
      },
      {
        "id": "Q8",
        "question": "In a payment system like Stripe, what is a PaymentIntent and how does it differ from a PaymentAttempt? Walk through the full status lifecycle.",
        "answer": "A PaymentIntent records what the customer intends to pay — created when the merchant initiates, holds amount/currency/description, status = 'created'. No card processor call yet. A PaymentAttempt is the actual card charge against that intent — has its own processor result, status, and timestamp. Separation lets you retry failed charges without losing context. Status lifecycle: created → authorized (funds reserved, not moved) → pending (processing) → settled (bank completed transfer) OR failed at any stage."
      },
      {
        "id": "Q9",
        "question": "In a payment system, where must private keys be stored and why? How do you achieve tamper-proof auditability — what's wrong with application-level audit logs?",
        "answer": "Private keys: stored in a Hardware Security Module (HSM) — tamper-resistant hardware where the key never exists in plaintext outside it. Without HSM, server compromise exposes all encrypted card data. Auditability: application-managed audit logs can go out of sync with the main DB if a bug or partial failure skips the log write. Correct pattern: Change Data Capture (CDC) at the database level — automatically emits every change to an immutable event stream. The audit trail is derived directly from the DB and cannot be bypassed by application code."
      },
      {
        "id": "Q10",
        "question": "For a payment event stream, what should the partition key be? Why NOT a composite of merchant ID + transaction ID?",
        "answer": "Partition key = transaction ID alone. All events for a single payment must land on the same partition to guarantee ordering (created → authorized → settled). If you mix merchant ID into the partition key, events for the same transaction could split across partitions, breaking ordering guarantees. Merchant ID can be used for load spreading at a higher routing level (e.g., which cluster handles the merchant), but not in the event partition key."
      },
      {
        "id": "Q11",
        "question": "When a payment call to an external processor times out, how should you handle it? Why is treating it as 'failed' dangerous?",
        "answer": "Treat timeouts as pending/uncertain — NOT failed. The processor may still complete the charge after a network timeout. If you mark it failed and retry, the customer gets double-charged. Correct approach: (1) assign an idempotency key to every payment attempt so retries are safe, (2) use optimistic locking on the payment record to prevent conflicting updates when retries and processor callbacks race to update the same record simultaneously."
      }
    ]
  },
  {
    "id": 13,
    "title": "System Design — Caching, CDN & Hashing",
    "cards": [
      {
        "id": "Q1",
        "question": "When do you need a CDN?",
        "answer": "A CDN caches static assets and cacheable responses at edge PoPs — cutting origin load and latency and absorbing some DDoS. *Where it shows up:* images, JS/CSS, video segments, and read-heavy cacheable API responses for a global audience. *Tradeoff / when NOT:* it adds a layer that doesn't help highly dynamic or personalized responses, and cross-PoP cache invalidation is the genuinely hard part — stale edge content is the classic CDN bug."
      },
      {
        "id": "Q2",
        "question": "Cache placement — client, CDN, app, database? Tradeoffs?",
        "answer": "Closer to user = lower latency, harder to invalidate. Client: fastest, least control. CDN: good for shared cacheable content. App-level (Redis/Memcached): flexible, you control TTL/invalidation. DB buffer: automatic, limited to hot pages."
      },
      {
        "id": "Q3",
        "question": "Compare the three cache write strategies — write-through, write-back, and write-around. For each, explain how the write flows and when you'd pick it.",
        "answer": "Write-through: write cache + DB together (consistent, slower writes). Write-back: write cache, flush to DB later (fast, risk of loss on crash). Write-around: writes bypass the cache straight to the DB (avoids cache churn for write-heavy, rarely-read data). *Where it shows up:* write-through for read-heavy data needing consistency (profiles); write-back for high-volume tolerant-of-loss counters (views, metrics); write-around for write-once-read-rarely (logs). *Tradeoff:* the axis is consistency vs write latency vs crash-durability — pick per data class."
      },
      {
        "id": "Q4",
        "question": "Consistent hashing — one sentence and why it matters for sharding?",
        "answer": "Hash keys and nodes onto a ring; each key is owned by the next node clockwise, so adding/removing a node only rehomes adjacent keys instead of remapping everything. *Where it shows up:* sharding a distributed cache or a Dynamo-style KV ring, and sticky routing in load balancers. *Tradeoff:* without virtual nodes you get load skew; virtual nodes smooth it out at the cost of more routing metadata."
      },
      {
        "id": "Q5",
        "question": "Bloom filter — guarantees and when to use?",
        "answer": "'Definitely not in the set' is reliable; 'maybe in the set' has a tunable false-positive rate — an O(1), space-efficient membership test. *Where it shows up:* crawler URL-dedup, the LSM/Bigtable read path (skip SSTables that provably can't hold the key), and filtering cache misses before an expensive lookup. *Tradeoff:* tiny and fast, but standard Bloom filters can't delete, and a 'maybe present' still needs the real lookup to confirm."
      }
    ]
  },
  {
    "id": 14,
    "title": "System Design — Messaging, Streaming & Real-time",
    "cards": [
      {
        "id": "Q1",
        "question": "Message queue vs. pub/sub vs. event log — which for which job?",
        "answer": "Queue (SQS, RabbitMQ): one consumer processes each message, ordering per queue. Pub/sub: every subscriber gets a copy (fan-out). Event log (Kafka): durable replayable log, consumer groups, per-partition ordering. Choose based on replay, fan-out, ordering, and retention needs."
      },
      {
        "id": "Q2",
        "question": "What is the outbox pattern?",
        "answer": "Write the domain change AND the outgoing event in the *same* local DB transaction (to an 'outbox' table); a separate relay reads the outbox and publishes to the bus. *Where it shows up:* 'update the order AND publish order-placed atomically' — the dual-write problem. *Tradeoff:* solves dual-write without 2PC, but adds a relay (often CDC/Debezium) and is at-least-once, so consumers must dedupe."
      },
      {
        "id": "Q3",
        "question": "What is back-pressure, and why is it better than unbounded queuing?",
        "answer": "**Back-pressure** means a downstream system signals upstream to slow down when it's overwhelmed, rather than accepting work it can't handle. Without it, an overwhelmed service queues unboundedly → memory exhaustion → crash → cascading failure. **Mechanisms:** return HTTP 429/503 with retry-after headers, use bounded queues that reject when full, TCP flow control, reactive streams. **Design principle:** it's better to reject work at the edge (where the caller can retry or degrade gracefully) than to accept it and fail silently deep in the stack. Pairs with circuit breakers: back-pressure is the producer-side control, circuit breakers are the consumer-side control."
      },
      {
        "id": "Q4",
        "question": "When you say 'WebSockets' in a design, what must you define beyond mentioning the upgrade? Give a concrete example for a chat system.",
        "answer": "Define the actual event contract: named events with specific fields. Example: event 'newMessage' with fields chatId, senderId, content, timestamp, attachments. Also define reconnection behavior (client sends last-seen offset, server replays missed messages). Just saying 'use WebSockets' without the contract is incomplete."
      },
      {
        "id": "Q5",
        "question": "In a messaging system, how do you guarantee offline message delivery? What data structure tracks what a user has missed, and what's the reconnect flow?",
        "answer": "Store a last_delivered_message_id (offset) per user per chat. On reconnect: client sends its offset → server fetches all messages after that offset from durable storage → streams them to the client. Push notifications are just hints — they can be dropped. The offset + persistent storage is what guarantees delivery, not the notification."
      },
      {
        "id": "Q6",
        "question": "How should a chat system handle media attachments (images, video)? Walk through the upload and send flow.",
        "answer": "Client requests a pre-signed upload URL from the API server → uploads the file directly to blob storage (S3/GCS) → sends a message containing only the blob key/URL. The message service never touches the binary data. This keeps the DB lean (only stores references) and avoids overloading the message path with large payloads."
      },
      {
        "id": "Q7",
        "question": "You have N WebSocket servers and need to deliver a message to a user connected to one of them. How does the message reach the right server? What problems arise at scale and how do you mitigate them?",
        "answer": "PubSub layer: each WS server subscribes to topics for its connected users. Message is published to the recipient's topic → only the right server receives and forwards it. At scale, subscription churn is the problem. Mitigations: (1) single multiplexed connection per WS server to the broker (not one per user), (2) batch subscribe/unsubscribe ops, (3) grace period before unsubscribing on disconnect so brief reconnects don't re-subscribe."
      },
      {
        "id": "Q8",
        "question": "How does supporting multiple devices per user change a messaging system's design? What needs to be per-device instead of per-user?",
        "answer": "Each device is a separate client session. The User Activity Service stores all active device sessions per user. Fan-out pushes to every connected device. Delivery tracking (offsets) must be per-device, not per-user — one device may be online while another is offline, and each needs independent catchup state on reconnect."
      },
      {
        "id": "Q9",
        "question": "Batch vs stream processing — when each, and what's hard about streaming?",
        "answer": "Batch (MapReduce/Spark): process a bounded dataset on a schedule — simple, high-throughput, high-latency (minutes–hours). Stream (Flink/Kafka Streams): process unbounded events continuously — low latency, but windowing and exactly-once are hard. **Lambda architecture** runs both (batch for accuracy, stream for freshness); **Kappa** is stream-only. *Where it shows up:* metrics/analytics, ad-click aggregation. *Tradeoff:* exactly-once in streaming costs coordination (idempotent sinks or transactional commits); batch is simpler but you wait for the next run."
      }
    ]
  },
  {
    "id": 15,
    "title": "System Design — Networking & Load Balancing",
    "cards": [
      {
        "id": "Q1",
        "question": "Compare the main load balancing strategies — round-robin, least connections, and consistent hashing. When would you pick each in a system design?",
        "answer": "**Round-robin:** simplest, fine when servers are identical and requests cost the same. **Least connections:** routes to the fewest-active-connection server — adapts to slow servers and uneven request cost; a good default for stateless services. **Consistent hashing:** routes by request key (user ID) so the same key hits the same server — needed for sticky sessions and caching tiers. Also know the layer: **L4** load balancers route by IP/port (fast, no payload inspection — NLB, HAProxy-TCP) vs **L7** which route by HTTP path/header/cookie and enable canary + sticky sessions (ALB, Nginx, Envoy) at higher CPU cost."
      },
      {
        "id": "Q2",
        "question": "TCP vs UDP — when each?",
        "answer": "TCP: connection-oriented, reliable, ordered, with flow/congestion control — the default when correctness matters (HTTP, RPC, databases). UDP: connectionless, no delivery or ordering guarantees, minimal overhead — for latency-critical, loss-tolerant traffic (video/voice, DNS, gaming, and QUIC's substrate). *Tradeoff:* TCP's guarantees cost head-of-line blocking and handshake latency; UDP is fast but you re-implement whatever reliability you actually need on top."
      },
      {
        "id": "Q3",
        "question": "What changed across HTTP/1.1, HTTP/2, and HTTP/3?",
        "answer": "HTTP/1.1: one in-flight request per connection (head-of-line blocking), kept alive. HTTP/2: multiplexes many streams over one TCP connection + header compression. HTTP/3: the same multiplexing over **QUIC (UDP)**, removing TCP-level head-of-line blocking and cutting connection-setup latency. *Where it shows up:* HTTP/2+ matters for high-fan-out pages and mobile. *Tradeoff:* HTTP/2 still suffers TCP HoL blocking under packet loss; HTTP/3 fixes it but is newer and UDP-based (some networks throttle/block it)."
      },
      {
        "id": "Q4",
        "question": "REST vs gRPC — when would an infra/platform team pick each?",
        "answer": "REST/JSON over HTTP: human-readable, ubiquitous, browser-friendly — best for public/external APIs. gRPC: binary Protobuf over HTTP/2, schema-enforced, supports streaming and code generation — best for internal service-to-service. *Where it shows up:* infra/microservices lean gRPC for performance + typed contracts. *Tradeoff:* gRPC is faster and type-safe but harder to debug, not natively browser-friendly, and couples you to Protobuf schemas."
      },
      {
        "id": "Q5",
        "question": "Short polling vs long polling vs SSE vs WebSocket — how do you choose?",
        "answer": "Short polling: client re-requests on an interval (simple, wasteful). Long polling: server holds the request open until data arrives (less waste, still HTTP). SSE: a one-way server→client stream over a single HTTP connection (auto-reconnect built in). WebSocket: full-duplex persistent connection. *Where it shows up:* notifications/live feeds → SSE; chat/collaboration/gaming → WebSocket. *Tradeoff:* WebSockets are the most capable but are stateful — connection affinity makes them harder to scale (you need a pub/sub layer to route messages to the right server); SSE is far simpler when you only push one direction."
      },
      {
        "id": "Q6",
        "question": "How is DNS used as a load-balancing / failover layer, and what's its limitation?",
        "answer": "Beyond name→IP resolution, DNS is a traffic-steering layer: weighted, latency-based, or geo records (e.g., Route 53) send users to the nearest or healthiest region. *Where it shows up:* global traffic distribution and coarse failover. *Tradeoff:* DNS responses are cached for their TTL, so changes propagate slowly — it's poor for fast failover, which is why you pair geo-DNS with health-checked L7 load balancers for the last hop."
      }
    ]
  },
  {
    "id": 16,
    "title": "System Design — Reliability, Observability, Deployment & Rate Limiting",
    "cards": [
      {
        "id": "Q1",
        "question": "How do you design for graceful degradation?",
        "answer": "Identify critical vs non-critical paths; non-critical paths fail closed — hide the feature, serve stale, or queue for later — instead of failing the whole request. *Where it shows up:* if the recommendations service is down, the feed still renders (drop the rec rail / serve a cached one) rather than erroring the page. *Tools:* circuit breakers, bulkheads, timeouts, fallbacks. *Tradeoff:* the product must define 'good enough' per path, and every fallback is another code path that needs testing."
      },
      {
        "id": "Q2",
        "question": "Compare blue/green deployments and canary deployments. How does each work, what does each optimize for, and when would you choose one over the other?",
        "answer": "Blue/green: two full environments; cut traffic over atomically (fast rollback, doubles infra). Canary: gradually shift traffic % to new version (safer, slower, needs good metrics + automated rollback)."
      },
      {
        "id": "Q3",
        "question": "Your interviewer says 'tell me how you'd make this system observable.' What are the three pillars of observability, and what does each one help you diagnose?",
        "answer": "**Metrics** (counters, gauges, histograms): answer 'what is happening right now?' — latency percentiles, error rates, queue depths, saturation. Alert on these. **Logs** (structured, per-event records): answer 'what happened to this specific request?' — debug individual failures, audit trails. Expensive at scale; use sampling or log levels. **Distributed traces** (spans across services): answer 'where did this request spend its time?' — diagnose latency in multi-service call chains, find the bottleneck service. Tools: Prometheus/Grafana for metrics, ELK/Datadog for logs, Jaeger/Zipkin for traces. In a design interview, mention all three and note that metrics are cheapest to query, traces are most useful for debugging fan-out."
      },
      {
        "id": "Q4",
        "question": "Define SLI, SLO, and error budget — and how they drive engineering decisions.",
        "answer": "SLI = a measured signal of health (p99 latency, success rate). SLO = the target for it (99.9% of requests < 200 ms). Error budget = 1 − SLO (0.1% may fail) — you 'spend' it on releases and risk; when it's exhausted you freeze features and fix reliability. *Where it shows up:* every production service — it turns 'how reliable?' into a number both eng and product agree on. *Tradeoff:* each extra nine costs roughly an order of magnitude more effort, so SLOs should match real user need, not 100%."
      },
      {
        "id": "Q5",
        "question": "What problem do circuit breakers and bulkheads solve, and what's the cost?",
        "answer": "**Circuit breaker:** after N failures to a dependency, 'open' and fail fast (skip the call) for a cooldown, then probe to close — stops you from hammering a downed service and prevents cascading failure. **Bulkhead:** isolate resources per dependency (separate thread pools / connection limits) so one slow dependency can't exhaust everything. *Where it shows up:* any service with downstream dependencies. *Tradeoff:* both add tuning and complexity, and an over-eager breaker can shed load that would actually have succeeded."
      },
      {
        "id": "Q6",
        "question": "How does a rate limiter typically work?",
        "answer": "Token bucket (allow bursts up to bucket size, refilled at rate r) or leaky bucket (smooths traffic). Implemented in Redis via INCR + EXPIRE or Lua script for atomicity. Shard by user key for distributed fairness."
      },
      {
        "id": "Q7",
        "question": "Explain exactly how token bucket rate limiting works. What are the moving parts, and what makes it good for API rate limiting? What is it NOT?",
        "answer": "Each client gets a bucket with a fixed token capacity. Tokens refill at a steady rate. Each request consumes one token; if the bucket is empty, the request is denied (HTTP 429). Good for APIs because it allows short bursts (up to bucket capacity) while enforcing a sustained rate. It is NOT traffic shaping — token bucket makes allow/deny decisions. Traffic shaping (leaky bucket with a queue) delays and buffers requests instead of rejecting them. Don't conflate these."
      },
      {
        "id": "Q8",
        "question": "On a latency-critical hot path like a rate limiter check, what's the single most important optimization for the counter store? Why?",
        "answer": "Combine the counter read and increment into a single atomic operation — Redis INCR or a Lua script. This avoids two separate round trips (read then write) and prevents race conditions under concurrent requests. Also co-locate gateways and Redis in the same region/AZ to minimize network latency on every check. Target under 5ms per rate limit check."
      },
      {
        "id": "Q9",
        "question": "When rate limit rules change, how do all gateway instances learn about the update? What are the two strategies and when do you pick each?",
        "answer": "Polling with short TTL: each gateway periodically fetches rules from the config store. Simple to operate, but introduces propagation delay (up to TTL). Push notifications: a config service pushes updates to all gateways immediately. More complex but needed for emergency throttling where delay is unacceptable. Most systems use polling as the baseline and add a push channel for urgent overrides."
      }
    ]
  },
  {
    "id": 17,
    "title": "Linked List",
    "cards": [
      {
        "id": "Q1",
        "question": "Slow/fast pointer — what 3 problem classes does it solve?",
        "answer": "(1) Cycle detection (Floyd's). (2) Find midpoint. (3) Find Nth from end (start fast n nodes ahead, then walk together until fast hits null). All O(n) time, O(1) space."
      },
      {
        "id": "Q2",
        "question": "Write out the iterative linked list reversal using three pointers. Which pointer do you return at the end, and why is that a common bug source?",
        "answer": "`prev = None; curr = head; while curr: nxt = curr.next; curr.next = prev; prev = curr; curr = nxt; return prev`. The recursive version uses O(n) stack — interviewers want to see the O(1)-extra iterative one."
      },
      {
        "id": "Q3",
        "question": "Floyd's cycle detection — how do you find the cycle entry point? (See also F13.)",
        "answer": "After slow and fast meet inside the cycle, reset one pointer to head. Move both one step at a time; they meet at the cycle entry. Why: distance from head to entry equals distance from the meeting point to entry (algebra on the loop length and tortoise/hare distances)."
      },
      {
        "id": "Q4",
        "question": "Merge two sorted lists — why is a dummy head node the standard trick?",
        "answer": "It eliminates the special case for the first node. `dummy = ListNode(0); tail = dummy; while a and b: ...; tail.next = a or b; return dummy.next`. Without dummy you'd write redundant 'is this the first node?' branches at every comparison."
      },
      {
        "id": "Q5",
        "question": "Find midpoint — does slow land on the left or right middle for an even-length list?",
        "answer": "Depends on the loop. `while fast.next and fast.next.next` → slow stops on the **left** middle (good for splitting *before* reversing the second half — used in Reorder List, F22). `while fast and fast.next` → slow lands on the **right** middle (handy for palindrome checks where you want to start comparing from the right half)."
      },
      {
        "id": "Q6",
        "question": "Remove Nth from end — why an n+1 gap, not n? (See F12.)",
        "answer": "Use a dummy node before head. Advance fast n+1 steps, then move both until fast is null. Slow then sits one node *before* the target — so `slow.next = slow.next.next` removes it. The +1 gap is what places slow correctly to splice; the dummy handles the case where the head itself is removed."
      },
      {
        "id": "Q7",
        "question": "Reorder list — three-step pattern? (See F22.)",
        "answer": "(1) Find midpoint with slow/fast (slow lands on left middle; null-terminate after slow). (2) Reverse the second half. (3) Interleave — walk both halves with two pointers, splicing nodes alternately. Each step O(n); total O(n) time, O(1) space."
      },
      {
        "id": "Q8",
        "question": "You just finished coding a linked list solution. What are the most common bugs to check for before submitting?",
        "answer": "(1) Forgetting to null-terminate the new tail when splitting (creates a cycle). (2) Losing the head reference when reversing — always return `prev`, not `head`. (3) Off-by-one in the n+1-gap problems. (4) Modifying `node.next` before saving the original `next`. (5) Skipping the dummy head and writing duplicated 'first iteration' code."
      },
      {
        "id": "Q9",
        "question": "*Copy List with Random Pointer (LC 138): deep-copy a list where each node has `next` and a `random` pointer to any node or null.* What's the trick for the random pointers, and the O(1)-space version?",
        "answer": "The catch: a node's `random` may point to a node you haven't cloned yet. **(1) Hash map (O(n) space):** pass 1 clones every node into `map[orig] = clone`; pass 2 wires `clone.next = map[orig.next]` and `clone.random = map[orig.random]`. **(2) Interweaving (O(1) extra):** insert each clone right after its original (A→A'→B→B'…), so `A'.random = A.random.next` (the clone sits right after the original's random target); then unweave into two lists. O(n) either way.",
        "new": true
      },
      {
        "id": "Q10",
        "question": "*Find the Duplicate Number (LC 287): array of n+1 ints in [1,n], exactly one value repeated; find it without modifying the array, O(1) space.* Why is this a cycle problem and what's the exact Floyd's setup?",
        "answer": "Treat the array as a function `i → nums[i]`: values in [1,n] over n+1 slots force a repeat, so following `x = nums[x]` enters a **cycle whose entrance is the duplicate**. **Floyd's:** phase 1 — `slow = nums[slow]`, `fast = nums[nums[fast]]` until they meet. Phase 2 — reset `slow` to the **start (index 0)**, advance both by one step until they meet; that node is the cycle entrance = the duplicate. O(n) time, O(1) space, array untouched. *(Flagged F13 — gotchas: start from index 0, return the entrance not the meeting point.)*",
        "new": true
      },
      {
        "id": "Q11",
        "question": "*LFU Cache (LC 460): get/put in O(1); evict the least-frequently-used, breaking ties by least-recently-used.* What structures give O(1) for both, and what do you track?",
        "answer": "**Two hash maps + per-frequency doubly-linked lists.** `keyMap: key → {value, freq, node}`. `freqMap: freq → DLL of nodes at that frequency`, each DLL ordered by recency (newest at head). Track `minFreq`. **On get/put-hit:** move the node from its `freq` list to the `freq+1` list, bump freq; if its old list emptied and was `minFreq`, increment `minFreq`. **Evict:** pop the tail of `freqMap[minFreq]` (least-recently-used among least-frequent). **On insert:** set `minFreq = 1`. The per-frequency DLL is what makes LFU O(1) instead of needing a heap.",
        "new": true
      }
    ]
  },
  {
    "id": 18,
    "title": "Heap / Priority Queue",
    "cards": [
      {
        "id": "Q1",
        "question": "When do you reach for a heap?",
        "answer": "When you need repeated min/max access on a changing collection: top-K, median-of-stream, K-way merge, scheduling, Dijkstra. Heap gives O(log n) insert/pop and O(1) peek. For a single top-K on static data, sort + slice is simpler."
      },
      {
        "id": "Q2",
        "question": "Top-K largest — min-heap or max-heap, and why?",
        "answer": "**Min-heap of size K.** Push every element; if size > K, pop the smallest. The heap holds the K largest at the end; total O(n log K) — beats O(n log n) sort when K ≪ n. (For top-K smallest, use a max-heap of size K — symmetric.)"
      },
      {
        "id": "Q3",
        "question": "*Design a data structure that supports `addNum(int)` and `findMedian()` on a stream of integers, with O(log n) insert and O(1) median.* Describe the two-heap structure.",
        "answer": "Max-heap holds the lower half, min-heap holds the upper half. Keep sizes equal or off by one. After each insert, rebalance so |sizes| ≤ 1. Median = larger heap's top (odd count) or average of both tops (even). Insert O(log n), query O(1)."
      },
      {
        "id": "Q4",
        "question": "*Given k sorted linked lists, merge them into one sorted list.* In the heap-based approach, what exactly goes into the heap, and why do you need a tiebreaker? (See F14.)",
        "answer": "One node per list initially: `(value, list_idx, node_ref)` — the list_idx is a tiebreaker so heapq doesn't try to compare incomparable nodes when values tie. Pop min, push that node's `next` if any. Total O(N log K) where N = total nodes, K = lists. Divide-and-conquer pairwise merge has the same asymptotic cost but uses O(N) extra space; the heap version uses O(K)."
      },
      {
        "id": "Q5",
        "question": "*Given a list of CPU tasks (letters A–Z) and a cooldown `n`, return the minimum intervals to finish all tasks.* What's the O(1) math formula, and what does each term represent? (See F15.)",
        "answer": "`result = max(len(tasks), (max_count - 1) * (n + 1) + count_of_max)`. The first term covers 'no idling needed' (tasks already spaced enough). The second covers 'must idle' — the most frequent task drives the skeleton, with all max-frequency tasks tacked on at the end. Always `max` of both — formula is exact, no edge cases."
      },
      {
        "id": "Q6",
        "question": "Why is `heapify` O(n) and not O(n log n)?",
        "answer": "Sift-down from the bottom up. Most nodes are near the leaves and sift down very few levels. Sum across levels: ∑ (n/2^h) · h converges to O(n). Building a heap from scratch is strictly faster than n successive inserts (each O(log n))."
      },
      {
        "id": "Q7",
        "question": "Python heap gotcha — max-heap and tie-breaking?",
        "answer": "`heapq` is min-only. For max, push `-x` and negate on pop, or wrap items in a class with reversed `__lt__`. For tuples, prefer `(-priority, tiebreaker, payload)` so equal priorities don't fall through to comparing payloads (which may not be comparable)."
      },
      {
        "id": "Q8",
        "question": "When NOT to use a heap?",
        "answer": "(1) When you need order statistics for arbitrary K once — quickselect is O(n) average. (2) When data is mostly sorted already — a deque or two-pointer sweep is cheaper. (3) When you need O(log n) decrease-key on arbitrary elements — stdlib heap doesn't support it; either use lazy deletion (skip stale entries on pop) or an indexed heap."
      }
    ]
  },
  {
    "id": 19,
    "title": "Graphs",
    "cards": [
      {
        "id": "Q1",
        "question": "BFS vs DFS — when do you pick each?",
        "answer": "**BFS**: shortest path on unweighted graphs, level-order, 'minimum steps'. Uses a queue. **DFS**: path existence, topological order, cycle detection, articulation points, anything needing the call stack to remember context. BFS for distance, DFS for structure."
      },
      {
        "id": "Q2",
        "question": "Visited tracking — mark on enqueue or on dequeue?",
        "answer": "**Mark on enqueue** for BFS and iterative DFS. Marking on dequeue lets the same node be enqueued multiple times before any of them dequeues, blowing up to O(V·E) in dense graphs. Recursive DFS marks at the top of the function — same idea, before exploring neighbors."
      },
      {
        "id": "Q3",
        "question": "Topological sort — Kahn's vs DFS, and how does each detect a cycle? (See F19.)",
        "answer": "**Kahn's**: build in-degree map, enqueue all 0-in-degree nodes, repeatedly pop and decrement neighbors' in-degree. **Cycle if processed count < n.** **DFS 3-color**: white = unseen, gray = on the recursion stack, black = done. **Cycle if you encounter a gray neighbor.** Both O(V+E)."
      },
      {
        "id": "Q4",
        "question": "Detecting a cycle in an undirected graph?",
        "answer": "DFS, passing in the parent. If you visit a neighbor that is already visited *and* not the parent, you've found a back edge → cycle. Or use Union-Find: for each edge, if both endpoints are already in the same set, that edge closes a cycle. (See F20 for the 'valid tree' variant.)"
      },
      {
        "id": "Q5",
        "question": "Shortest path on an unweighted graph?",
        "answer": "BFS from the source. The first time you reach a node is via a shortest path. Track distances with a `dist` map (or count BFS levels for the answer-only case). O(V+E)."
      },
      {
        "id": "Q6",
        "question": "Dijkstra — one-paragraph summary and the lazy-heap gotcha?",
        "answer": "Min-heap of `(dist, node)`. Pop min; for each neighbor, relax: `if dist[u] + w < dist[v]: dist[v] = dist[u] + w; push(dist[v], v)`. **Gotcha**: stdlib heaps don't support decrease-key, so push lazily and skip stale entries on pop with `if d > dist[u]: continue`. Doesn't handle negative edges (use Bellman-Ford). O((V+E) log V)."
      },
      {
        "id": "Q7",
        "question": "Graph valid tree — exact two conditions? (See F20.)",
        "answer": "(1) `edges == n - 1` (necessary: any tree has exactly n-1 edges; fewer disconnects it, more creates a cycle). (2) Graph is fully connected (e.g., BFS reaches all n nodes from any start). Both must hold. Pre-screening edge count is O(1) and short-circuits many failures cheaply."
      },
      {
        "id": "Q8",
        "question": "Connected components — Union-Find vs BFS/DFS?",
        "answer": "Both O(V+E). Union-Find shines when components form *online* (edges arriving over time — 'number of islands II', 'accounts merge'). BFS/DFS is simpler for one-shot static graphs. Union-Find with path compression + union-by-rank is near O(1) amortized per op (inverse Ackermann)."
      },
      {
        "id": "Q9",
        "question": "Bidirectional BFS — when is it worth the complexity?",
        "answer": "When you know both source and target and the graph has high branching factor `b`. Single BFS explores ≈ b^d nodes; bidirectional explores ≈ 2 · b^(d/2) — exponentially fewer at long distances. Standard for word-ladder-style problems on large vocabularies."
      },
      {
        "id": "Q10",
        "question": "Adjacency list vs matrix — what dictates the choice?",
        "answer": "**List** for sparse graphs (E ≪ V²): O(V+E) space, fast neighbor iteration. **Matrix** for dense graphs and when you need O(1) edge-existence checks (e.g., Floyd–Warshall). Most interview graphs are sparse → list."
      },
      {
        "id": "Q11",
        "question": "*Given an m × n 2D grid of `'1'`s (land) and `'0'`s (water), return the number of islands (groups of horizontally/vertically connected `'1'`s).* Walk through the approach and the in-place trick for visited tracking.",
        "example": "Input:  grid = [\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"0\",\"0\",\"1\",\"0\",\"0\"],\n  [\"0\",\"0\",\"0\",\"1\",\"1\"]\n]\nOutput: 3",
        "answer": "Scan the grid; when you hit a `'1'`, increment the island count and BFS/DFS to mark all connected `'1'`s as visited. **In-place trick:** overwrite visited cells with `'0'` (or `'#'`) instead of maintaining a separate visited set — saves O(m·n) space. Each cell is visited at most once → O(m·n) total. This is the canonical 'connected components on a grid' pattern and generalizes to: max area of island, surrounded regions, rotting oranges, shortest path in a grid."
      },
      {
        "id": "Q12",
        "question": "*Given a reference to a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node has a value and a list of neighbors.*\nWhat data structure prevents creating duplicate clones, and what's the DFS vs BFS approach?",
        "answer": "Use a hash map `{original_node: cloned_node}` as both a visited set and a lookup for already-cloned nodes. **DFS:** for each node, create its clone, store in the map, then recurse on each neighbor — if the neighbor is already in the map, just wire the existing clone. **BFS:** same map, but use a queue. Key insight: the map serves double duty — it's your visited set *and* your way to find the clone of any node you've already processed. O(V+E) time and space."
      },
      {
        "id": "Q13",
        "question": "*Number of Islands II (LC 305): an m×n grid starts all water; given a stream of `addLand(r,c)` ops, return the island count after each.* Why is flood-fill-per-query too slow, and what's the optimal structure?",
        "answer": "Re-running a full grid BFS/DFS after every addition is O(k·m·n) for k ops — too slow for a stream. **Use Union-Find (disjoint set) for dynamic connectivity.** Keep a running `count`. On `addLand(r,c)`: if already land, skip; else mark land and `count++`; then for each of the 4 neighbors that is land, **union** it with the new cell, and **each union that actually merges two distinct components does `count--`**. Record `count` after each op. With union-by-rank + path compression, each op is ~O(α(mn)) (near-constant) → total ≈ O(k·α(mn)). Map (r,c) → index `r*n + c` for the parent array.",
        "new": true
      }
    ]
  },
  {
    "id": 20,
    "title": "1-D DP",
    "cards": [
      {
        "id": "Q1",
        "question": "How do you recognize a DP problem?",
        "answer": "Three signals: (1) 'count ways' / 'min/max over choices' / 'is it possible'. (2) Subproblems overlap (naive recursion repeats work). (3) Optimal substructure (best at i depends on best at smaller indices). If only (3) holds, greedy may suffice."
      },
      {
        "id": "Q2",
        "question": "Top-down (memo) vs bottom-up (tab) — when each?",
        "answer": "**Top-down**: cleaner when state space is sparse (you only compute reachable states) or when the recursion tree mirrors the problem naturally. **Bottom-up**: tighter constants, easier to space-optimize, no recursion-limit risk. Bottom-up is the interview default unless states are sparse or hard to enumerate."
      },
      {
        "id": "Q3",
        "question": "Walk through the standard template for solving a 1-D dynamic programming problem — what do you define, what do you initialize, what do you iterate, and what do you return?",
        "answer": "`dp[i]` = answer for prefix (or suffix) ending at i. Define base case (`dp[0]` or `dp[n]`). Write the transition: `dp[i] = f(dp[i-1], dp[i-2], …, nums[i])`. Iterate in dependency order. Return `dp[n-1]` or `dp[n]` per the framing."
      },
      {
        "id": "Q4",
        "question": "Space optimization — when can you collapse to O(1)?",
        "answer": "When `dp[i]` depends only on `dp[i-1]` (and maybe `dp[i-2]`), keep just those values in two scalars. Collapses O(n) → O(1) extra space. Climbing stairs, house robber, max-subarray (Kadane), and Fibonacci-style DPs all qualify."
      },
      {
        "id": "Q5",
        "question": "*Given an array `nums` representing money in each house along a street, return the maximum amount you can rob without robbing two adjacent houses.*\nHouse Robber — what's the transition and the rolling-array form?",
        "example": "Input:  nums = [2,7,9,3,1]\nOutput: 12  (rob houses 0, 2, 4 → 2+9+1)",
        "answer": "`dp[i] = max(dp[i-1], dp[i-2] + nums[i])` — either skip i (take best up to i-1) or rob i (add to best up to i-2). Rolling: `prev2, prev1 = 0, 0; for x in nums: prev2, prev1 = prev1, max(prev1, prev2 + x); return prev1`."
      },
      {
        "id": "Q6",
        "question": "*Coin Change: given coins and an amount, find the fewest coins needed. Coin Change II: count the number of combinations that make the amount.* Both use a 1-D DP array, but the loop order differs. What changes and why?",
        "example": "Coin Change:  coins = [1,2,5], amount = 11 → 3 (5+5+1)\nCoin Change II: coins = [1,2,5], amount = 5 → 4 combinations",
        "answer": "**Coin Change** (min coins to make amount): outer loop over amounts, inner over coins. Order doesn't matter — you're counting min, not arrangements. **Coin Change II** (count combinations, not permutations): **outer over coins, inner over amounts**. Reversing this counts ordered arrangements (permutations) instead. The loop order encodes the combinatorial meaning."
      },
      {
        "id": "Q7",
        "question": "Maximum Product Subarray — why track BOTH curMax and curMin? (See F21.)",
        "answer": "A negative number flips signs. The new max product can come from `curMax * x` (if x is positive) OR `curMin * x` (if x is negative — two negatives multiply to a large positive). Track both, updating simultaneously: `newMax = max(x, curMax*x, curMin*x)`, symmetric for newMin. O(n) time, O(1) space."
      },
      {
        "id": "Q8",
        "question": "*Given a string `s` and a dictionary of words `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.*\nWord Break — what's the DP state and transition?",
        "example": "Input:  s = \"leetcode\", wordDict = [\"leet\",\"code\"]\nOutput: true",
        "answer": "`dp[i] = True` if `s[:i]` can be segmented. `dp[0] = True`. Transition: `dp[i] = any(dp[j] and s[j:i] in dict for j in 0..i-1)`. Return `dp[n]`. O(n²·k) where k is avg word length (the `in` check). Use a set for the dictionary."
      },
      {
        "id": "Q9",
        "question": "*Given an integer array `nums`, return the length of the longest strictly increasing subsequence (not necessarily contiguous).*\nLongest Increasing Subsequence — naive O(n²) vs O(n log n)?",
        "example": "Input:  nums = [10,9,2,5,3,7,101,18]\nOutput: 4  (e.g. [2,3,7,101])",
        "answer": "Naive: `dp[i] = 1 + max(dp[j] for j<i if nums[j]<nums[i])` — O(n²). **Patience sort trick** (O(n log n)): keep a `tails` array where `tails[k]` is the smallest tail of any increasing subseq of length k+1. For each x, binary-search the leftmost tail ≥ x and replace. Length of tails = LIS length. The tails array is **NOT** a valid LIS — only its length is meaningful."
      },
      {
        "id": "Q10",
        "question": "*Given a string `s`, return the number of palindromic substrings (every single character counts as a palindrome).*\nWhat's the expand-from-center technique, and why do you expand from both odd and even centers?",
        "example": "Input:  s = \"aaa\"\nOutput: 6  (\"a\",\"a\",\"a\",\"aa\",\"aa\",\"aaa\")",
        "answer": "For each index `i`, expand outward while characters match. **Odd-length palindromes:** center at `(i, i)`. **Even-length palindromes:** center at `(i, i+1)`. You need both because a palindrome can be centered on a single character (\"aba\") or between two characters (\"abba\"). For each valid expansion, increment the count. O(n²) time, O(1) space. This same technique solves 'longest palindromic substring' — just track the longest expansion instead of counting."
      },
      {
        "id": "Q11",
        "question": "*Given strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0.*\nThis is 2-D DP — what's the state, transition, and how do you read the recurrence?",
        "example": "Input:  text1 = \"abcde\", text2 = \"ace\"\nOutput: 3  (\"ace\")",
        "answer": "`dp[i][j]` = LCS length of `text1[:i]` and `text2[:j]`. **Transition:** if `text1[i-1] == text2[j-1]`: `dp[i][j] = dp[i-1][j-1] + 1` (both chars match, extend the LCS). Else: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])` (skip one char from either string, take the better option). Base case: `dp[0][j] = dp[i][0] = 0`. Fill row by row. O(m·n) time. Space-optimizable to O(min(m,n)) since each row only depends on the previous row."
      },
      {
        "id": "Q12",
        "question": "*Given two strings `word1` and `word2`, return the minimum number of operations (insert, delete, replace) to convert `word1` into `word2` (edit distance).*\nWhat's the DP state and the three transitions?",
        "example": "Input:  word1 = \"horse\", word2 = \"ros\"\nOutput: 3  (horse → rorse → rose → ros)",
        "answer": "`dp[i][j]` = min operations to convert `word1[:i]` to `word2[:j]`. **If chars match** (`word1[i-1] == word2[j-1]`): `dp[i][j] = dp[i-1][j-1]` (no operation needed). **Else** take the min of three operations:\n- `dp[i-1][j-1] + 1` → **replace** `word1[i-1]` with `word2[j-1]`\n- `dp[i-1][j] + 1` → **delete** from `word1`\n- `dp[i][j-1] + 1` → **insert** into `word1`\n\nBase cases: `dp[i][0] = i` (delete all), `dp[0][j] = j` (insert all). O(m·n) time, O(m·n) space (optimizable to O(min(m,n)))."
      }
    ]
  },
  {
    "id": 21,
    "title": "Intervals",
    "cards": [
      {
        "id": "Q1",
        "question": "You're reading a new interview problem. What clues in the problem statement tell you it's an intervals problem, and what's your default first step after recognizing it?",
        "answer": "Inputs are `[start, end]` pairs (meetings, ranges, scheduling, calendar slots). Almost always: sort first by start (or end), then sweep. Most problems reduce to 'merge overlapping' or 'count overlaps at any point in time'."
      },
      {
        "id": "Q2",
        "question": "*Given an array of intervals `[[start, end], ...]`, merge all overlapping intervals and return the non-overlapping result.* Walk through the approach.",
        "example": "Input:  intervals = [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]",
        "answer": "Sort by start. Iterate; if `intervals[i].start <= last.end`, extend `last.end = max(last.end, intervals[i].end)`. Else push intervals[i] as the new last. O(n log n) for the sort, O(n) merge."
      },
      {
        "id": "Q3",
        "question": "*Given a sorted list of non-overlapping intervals and a new interval, insert the new interval and merge if necessary. Return the resulting sorted list of non-overlapping intervals.*\nInsert interval — what's the three-phase pattern?",
        "example": "Input:  intervals = [[1,3],[6,9]], newInterval = [2,5]\nOutput: [[1,5],[6,9]]",
        "answer": "(1) Copy intervals strictly before the new one (`end < new.start`). (2) Merge all overlapping: `while i < n and intervals[i].start <= new.end: new.end = max(new.end, intervals[i].end); i++`. Push the merged interval. (3) Copy the rest. O(n)."
      },
      {
        "id": "Q4",
        "question": "*Given an array of meeting time intervals `[[start, end], ...]`, return the minimum number of conference rooms required so that no two overlapping meetings share a room.*\nMin meeting rooms — how does the sweep-line approach work?",
        "example": "Input:  intervals = [[0,30],[5,10],[15,20]]\nOutput: 2  (meetings [0,30] and [5,10] overlap)",
        "answer": "Build two arrays: starts (sorted) and ends (sorted). Two pointers; whenever `starts[i] < ends[j]` you need a new room (`i++`); else free a room (`j++`). Track running max. O(n log n) for sorts, O(n) sweep. Heap variant: push end times into a min-heap; if next.start ≥ heap.top, pop; always push end. `len(heap)` at any moment = rooms in use."
      },
      {
        "id": "Q5",
        "question": "*Given an array of intervals, return the minimum number of intervals you need to remove to make the remaining intervals non-overlapping.*\nErase overlapping intervals — sort by what, and why?",
        "example": "Input:  intervals = [[1,2],[2,3],[3,4],[1,3]]\nOutput: 1  (remove [1,3])",
        "answer": "Sort by **end** (not start). Greedily keep an interval if its start ≥ the last-kept end; else drop it. Sorting by end maximizes room for future intervals. Number erased = total - kept. (This is 'maximum non-overlapping intervals' in disguise — the classic interval scheduling proof works here.)"
      },
      {
        "id": "Q6",
        "question": "*Given two lists of closed intervals (each sorted and non-overlapping), return their intersection — all intervals that appear in both lists.*\nIntersection of two interval lists — what's the two-pointer pattern?",
        "example": "Input:  A = [[0,2],[5,10],[13,23],[24,25]], B = [[1,5],[8,12],[15,24],[25,26]]\nOutput: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]",
        "answer": "Two pointers over both sorted lists. Compute `lo = max(a.start, b.start)`, `hi = min(a.end, b.end)`. If `lo <= hi`, emit `[lo, hi]`. Then advance the pointer whose interval ends first. O(m + n)."
      },
      {
        "id": "Q7",
        "question": "Two intervals share an endpoint: `[1,2]` and `[2,3]`. Do they overlap? What determines the answer, and why must you clarify this before coding?",
        "answer": "Are `[1,2]` and `[2,3]` overlapping? Depends on whether endpoints are inclusive (closed) or exclusive (half-open). For meetings, `[2,3]` starting at 2 doesn't conflict with one ending at 2 — use `start < end` (strict). For closed real-number ranges, use `start <= end`. **Ask the interviewer** before coding."
      }
    ]
  },
  {
    "id": 22,
    "title": "Greedy",
    "cards": [
      {
        "id": "Q1",
        "question": "When does greedy actually work?",
        "answer": "When the problem admits an **exchange argument**: any optimal solution can be transformed into the greedy choice without making it worse. If you can't articulate the swap, it's probably DP. Greedy candidates also tend to have **matroid** structure or interval-scheduling structure."
      },
      {
        "id": "Q2",
        "question": "*Given an array `nums` where `nums[i]` is the max jump length from position `i`, determine if you can reach the last index starting from index 0.*\nJump Game I — what's the greedy pattern?",
        "example": "Input:  nums = [2,3,1,1,4] → true\n        nums = [3,2,1,0,4] → false (stuck at index 3)",
        "answer": "Track the maximum reachable index as you walk left to right. If `i > maxReach`, return False. Else `maxReach = max(maxReach, i + nums[i])`. Return True if you finish the loop. O(n), O(1)."
      },
      {
        "id": "Q3",
        "question": "*Given an array `nums` where `nums[i]` is the max jump length from position `i`, return the minimum number of jumps to reach the last index. (Guaranteed reachable.)*\nJump Game II — how does the BFS-like greedy work?",
        "example": "Input:  nums = [2,3,1,1,4]\nOutput: 2  (jump 1 step to index 1, then 3 steps to end)",
        "answer": "Track `currentEnd` (farthest reachable with the jumps taken so far) and `farthest` (farthest reachable from any index in the current 'level'). When `i == currentEnd`, take a jump: `jumps++; currentEnd = farthest`. O(n). Conceptually it's BFS without an explicit queue — levels are jump counts."
      },
      {
        "id": "Q4",
        "question": "*There are `n` gas stations in a circle. `gas[i]` is the fuel at station `i`, `cost[i]` is the fuel needed to travel to station `i+1`. Starting with an empty tank, return the starting station index if you can complete the circuit, or -1 if impossible.*\nGas Station — what's the single-pass trick?",
        "example": "Input:  gas = [1,2,3,4,5], cost = [3,4,5,1,2]\nOutput: 3  (start at station 3)",
        "answer": "If `sum(gas) < sum(cost)`, no solution. Otherwise there's exactly one. Walk once tracking `tank`; if `tank < 0`, reset start to `i+1` and tank to 0. The reset is valid because no station before `i+1` could've been a starting point (any prefix-sum dip below zero means you can't reach `i+1` from there either)."
      },
      {
        "id": "Q5",
        "question": "*Given a string `s`, partition it into as many parts as possible so that each letter appears in at most one part. Return a list of the partition lengths.*\nPartition Labels — what's the greedy pattern?",
        "example": "Input:  s = \"ababcbacadefegdehijhklij\"\nOutput: [9,7,8]",
        "answer": "Pre-compute the **last index** of each character: `last = {c: i for i, c in enumerate(s)}`. Walk left to right tracking `end = max(end, last[c])`. When `i == end`, close the current partition (length = end - start + 1) and start a new one. O(n)."
      },
      {
        "id": "Q6",
        "question": "Greedy vs DP — what tells you which to use?",
        "answer": "If the optimal substructure has many overlapping decisions you must remember, → DP. If each step has an obvious locally-best choice that provably composes (exchange argument or no-cost swap), → greedy. Many problems admit both — greedy is faster but harder to prove correct. When unsure, write a small brute force and check on adversarial inputs."
      },
      {
        "id": "Q7",
        "question": "Common trap — when does greedy silently fail?",
        "answer": "Coin change with denominations like {1, 3, 4} and target 6: greedy takes 4+1+1 = 3 coins, optimal is 3+3 = 2 coins. Lesson: greedy works on canonical coin systems (US/EU coins) but not arbitrary ones. Always test a small counterexample before committing."
      },
      {
        "id": "Q8",
        "question": "*Given a set of intervals, find the maximum number of non-overlapping intervals you can keep.* Sketch the exchange argument that proves the greedy (sort-by-end) approach is optimal.",
        "answer": "Sort by end time; greedily take each interval whose start ≥ last-taken end. **Proof**: any optimal schedule's first interval can be swapped with the greedy choice (whose end is ≤ optimal's first end) without conflict; induct on the rest. Same argument backs 'erase overlapping intervals' (Intervals Q5)."
      }
    ]
  },
  {
    "id": 23,
    "title": "System Design — Situational Drills",
    "cards": [
      {
        "id": "Q1",
        "question": "URL shortener: two \"create\" requests could generate the same short code at the same instant. How do you guarantee every code is unique?",
        "answer": "Generate codes from a globally-unique source — an auto-increment ID or a Snowflake ID, Base62-encoded — so uniqueness is guaranteed and collisions are impossible. If you hash instead, you must insert with a UNIQUE constraint and retry on the (rare) collision. *Tradeoff:* sequential IDs are enumerable/guessable — add a key-generation service that hands out pre-reserved ranges, or a random offset, if predictability matters.",
        "new": true
      },
      {
        "id": "Q2",
        "question": "Rate limiter spread across 50 gateway nodes: how do you enforce one global limit without races or double-counting?",
        "answer": "Keep the counter in a shared store (Redis) and make check+increment a single **atomic** op (INCR or a Lua script) so concurrent requests can't race. Co-locate gateways and Redis to keep each check under ~5 ms. *Tradeoff:* during a Redis partition, fail **open** and accept slight over-admission rather than block all traffic — a few extra requests beats an outage.",
        "new": true
      },
      {
        "id": "Q3",
        "question": "News feed: a celebrity with 100M followers posts. Fanning out to 100M timelines on write is far too expensive. How do you handle it?",
        "answer": "Hybrid fan-out: **push** (write into follower timelines) for normal users, but **pull** for high-follower accounts — their posts are merged in at read time instead of pushed. Threshold around ~10K followers. *Tradeoff:* the read path gets more complex (merge the pushed timeline with pulled celebrity posts), but you avoid the write storm.",
        "new": true
      },
      {
        "id": "Q4",
        "question": "Chat: how do you guarantee messages in a conversation appear in the same order on every device?",
        "answer": "Assign a server-side **monotonic sequence number** (or logical clock) per conversation; clients sort by it, never by local receive time. Partition message storage by conversation_id so one partition owns ordering for that conversation. *Tradeoff:* a single sequencer per conversation caps that conversation's write rate — fine, since individual conversations aren't that hot.",
        "new": true
      },
      {
        "id": "Q5",
        "question": "Payment: a charge call to the processor times out and the client retries. How do you avoid double-charging the customer?",
        "answer": "Attach an **idempotency key** to every attempt; the server records it and returns the original result on retry instead of charging again. Treat the timeout as **pending/uncertain**, not failed — the processor may still have completed it — and reconcile via its callback/settlement. *Tradeoff:* you must store keys durably and handle the race between a retry and the async callback (optimistic locking on the payment row).",
        "new": true
      },
      {
        "id": "Q6",
        "question": "Distributed cache: one viral key gets 1M reads/sec, melting the single shard that owns it. How do you spread that load?",
        "answer": "Replicate the hot key across multiple nodes (read from any), and/or add a small in-process cache on each app server so most reads never reach the shard. Detect hot keys with per-key metrics. *Tradeoff:* replication and local caching add invalidation lag — fine for a viral read-mostly item, risky for fast-changing data.",
        "new": true
      },
      {
        "id": "Q7",
        "question": "Distributed job scheduler: how do you make sure two workers don't run the same scheduled job?",
        "answer": "Workers atomically **claim** a job with a lease — a conditional update setting owner + expiry, or a distributed lock — so only the claimer runs it, and the lease auto-expires if the worker dies so another can retry. Make jobs idempotent as a backstop. *Tradeoff:* a lease can expire mid-run on a slow worker, causing a double-run — idempotency is what saves you, not the lock alone.",
        "new": true
      },
      {
        "id": "Q8",
        "question": "Web crawler at ~33k pages/sec across many domains: how do you avoid hammering any single domain (politeness)?",
        "answer": "Rate-limit **per domain** (a token bucket keyed by domain) and **partition the frontier queue by domain** so one worker handles a domain's URLs serially; interleave domains when pulling so same-domain URLs aren't contiguous. *Tradeoff:* per-domain queuing complicates the frontier, but it's the only way to stay polite while still being fast in aggregate.",
        "new": true
      },
      {
        "id": "Q9",
        "question": "YouTube: how do you let a user upload a 10 GB video reliably without HTTP timeouts?",
        "answer": "**Multipart / resumable upload**: the client splits the file into chunks and uploads them directly to object storage via pre-signed URLs, retrying only the chunks that fail; the server is notified on completion and kicks off async transcoding. *Tradeoff:* more client complexity, and you must track and garbage-collect incomplete multipart uploads.",
        "new": true
      },
      {
        "id": "Q10",
        "question": "Search autocomplete fires a request on every keystroke for millions of users. How do you keep it from crushing your datastore?",
        "answer": "Serve suggestions from an in-memory structure (trie) or cache, **cache the top prefixes at the edge/CDN** (most users type the same popular prefixes), and debounce on the client. Never hit the primary DB per keystroke. *Tradeoff:* edge-cached suggestions lag fresh data slightly — perfectly acceptable for autocomplete.",
        "new": true
      },
      {
        "id": "Q11",
        "question": "Notification system: how do you avoid sending the same push twice when delivery is at-least-once?",
        "answer": "**Dedupe** on a key (notification_id + recipient) stored with a TTL; the sender checks-and-sets before delivering, and consumers are idempotent. Accept at-least-once + dedupe rather than chasing true exactly-once (impractical at scale). *Tradeoff:* the dedupe TTL bounds how long you can catch duplicates — too short and a late retry slips through.",
        "new": true
      },
      {
        "id": "Q12",
        "question": "E-commerce: two users race to buy the last item in stock. How do you prevent overselling?",
        "answer": "The stock decrement must be **strongly consistent**: an atomic conditional update (decrement only if quantity > 0, i.e., compare-and-set), a row lock, or a reservation with a TTL confirmed at payment. Eventual consistency on the count = oversell. *Tradeoff:* the hot row/lock limits checkout throughput for that item — shard or queue per-item for a flash sale.",
        "new": true
      },
      {
        "id": "Q13",
        "question": "A user updates a setting, immediately reloads, and a lagging replica serves the old value. How do you guarantee they see their own write?",
        "answer": "**Read-your-writes**: for a short window after a user's write, route that user's reads to the leader; or tag the session with the write's version/timestamp and only serve from replicas caught up past it. *Tradeoff:* leader-routing concentrates load on the leader; version-tracking requires the client to carry the token.",
        "new": true
      },
      {
        "id": "Q14",
        "question": "Metrics pipeline: an engineer adds user_id as a metric label and the time-series DB falls over. Why, and how do you prevent it?",
        "answer": "Each distinct label-value combination is its **own time series** — a high-cardinality label like user_id spawns millions of series, blowing up memory and index. Prevent it by capping label cardinality (allowlist labels, reject or aggregate high-cardinality dimensions at ingestion). *Tradeoff:* you lose per-user drill-down in metrics — push that to logs/traces, which are built for high cardinality.",
        "new": true
      },
      {
        "id": "Q15",
        "question": "Message queue: producers outpace consumers and the queue grows without bound. What do you do?",
        "answer": "Apply **back-pressure** (a bounded queue that rejects/429s when full so producers slow down or shed), **autoscale consumers** up to the partition count, and prioritize or shed low-value work; alert on consumer lag. *Tradeoff:* rejecting work pushes the problem back to the producer — far better than an OOM crash deep in the stack, but the product must define what's droppable.",
        "new": true
      },
      {
        "id": "Q16",
        "question": "Coding platform (LeetCode): you run untrusted user-submitted code on your servers. How do you isolate it?",
        "answer": "Run each submission in a locked-down container with **CPU/memory limits + a hard timeout**, layered with **syscall filtering (seccomp)** to block dangerous host calls (fork, raw sockets), a **read-only filesystem**, and **no outbound network** (only a local path to persist results). *Why all layers:* resource limits stop fork bombs/infinite loops, seccomp + read-only FS stop container escape and tampering, no egress stops data exfiltration. Defense in depth — any single control can fail.",
        "new": true
      },
      {
        "id": "Q17",
        "question": "Coding-contest leaderboard in a Redis sorted set: a user's submissions can finish out of order. How do you stop an older/lower score from overwriting a newer/better one?",
        "answer": "Use **`ZADD … GT`** (Redis 6.2+), which updates the score only if the new value is greater — atomic, no read-then-write race. The score itself is the **fence**: a late, lower result simply no-ops. (If you needed strict ordering rather than best-wins, you'd fence on a logical timestamp instead.)",
        "new": true
      },
      {
        "id": "Q18",
        "question": "Should a 'live' coding-contest leaderboard use SSE/WebSockets or polling?",
        "answer": "**Polling every few seconds is often the better default.** Contest submissions arrive sporadically, so a poll feels near-real-time while being far simpler to operate than persistent connections (no connection state, fan-out, or reconnect logic). Reach for SSE/WebSocket push only when updates are frequent and latency-critical. *(Don't call a pull-based design 'live' without saying it's polling.)*",
        "new": true
      },
      {
        "id": "Q19",
        "question": "Tinder: User A likes User B milliseconds after B liked A. How do you guarantee the match is detected and not lost to a race?",
        "answer": "The like must be an **atomic check-and-write** — in one step, read whether the reverse like exists AND write this like (a DB transaction or a Redis `SETNX`/Lua script). Without atomicity, two simultaneous likes both read 'no match yet' and both skip creating the Match. The Match is its own entity (derived from two one-directional Swipes) and is what unlocks chat/notifications.",
        "new": true
      },
      {
        "id": "Q20",
        "question": "Tinder precomputes a candidate stack per user. Someone changes their age/location preference — how do you keep precomputed feeds fresh without huge recompute cost?",
        "answer": "**Lazy, event-driven recompute:** enqueue the change and have a background worker refresh the affected feed on next read, rather than eagerly recomputing thousands of other users' stacks on every edit. Reserve **eager** invalidation for high-impact changes (a location update invalidates many stacks). Two layers: serve the cached stack instantly, fall back to a real-time indexed query to top it up when a user burns through it.",
        "new": true
      },
      {
        "id": "Q21",
        "question": "Tinder: don't re-show profiles a user already swiped on — but some users have swiped on millions. Keep that filter fast and cheap?",
        "answer": "A **Bloom filter** per user: O(1) membership with tiny, near-constant memory regardless of history size. Trade-off: occasional **false positives** (rarely hide a valid profile) but **never false negatives** (never re-show a swiped one) — the acceptable direction for feed filtering.",
        "new": true
      },
      {
        "id": "Q22",
        "question": "Job scheduler: execute jobs within ~2s of their scheduled time without workers constantly polling `WHERE scheduled_time <= NOW()`.",
        "answer": "Use a **delay queue**: the queue keeps a job **invisible until its scheduled time**, so workers receive it exactly when due — no polling jitter. Stronger than a priority queue (which still needs workers to poll the head) because timing is enforced by the queue itself. A polling design works at small scale but adds latency jitter equal to the poll interval.",
        "new": true
      },
      {
        "id": "Q23",
        "question": "Job scheduler: a job is persisted to the DB but the service crashes before enqueueing it for execution. Guarantee it's enqueued exactly once?",
        "answer": "**Outbox pattern** — write the job and an outbox row in one DB transaction, then a separate publisher moves it to the queue: **CDC** (Debezium tails the DB log) *or* **polling** an outbox table (mark rows published). Both are *at-least-once*, so make the queue insert **idempotent on job ID** (dedup key) for effective exactly-once. Don't mix the two implementations.",
        "new": true
      },
      {
        "id": "Q24",
        "question": "Job scheduler: traffic is bursty (a 10k-job spike, then idle). Static VM worker pools either waste money or can't keep up. Better approach?",
        "answer": "**Container orchestration (Kubernetes) or serverless** that autoscales workers on **queue depth / running-job count** — add capacity for the spike, scale toward zero when idle, bin-pack work onto fewer machines. Fixed VM pools can't react fast enough or efficiently to bursty concurrency.",
        "new": true
      },
      {
        "id": "Q25",
        "question": "Metrics platform: ingest 5M metrics/sec from 500k servers without melting the collectors.",
        "answer": "**Agent-side batching:** the agent on each host buffers and flushes large batches, turning 5M req/s into far fewer, larger payloads at the ingestion tier — that's where most of the scale win comes from. Stateless collectors behind a load balancer write to **Kafka partitioned by metric/host** (partitioning is also parallelism: consumer groups process partitions concurrently). Client push is fire-and-forget so sources never block.",
        "new": true
      },
      {
        "id": "Q26",
        "question": "Designing the metrics store — justify a purpose-built time-series DB (VictoriaMetrics/InfluxDB/Timescale) over a general-purpose DB.",
        "answer": "Three reasons to say out loud: (1) **append-heavy sequential writes** (metrics are write-once, time-ordered); (2) **efficient time-range scans** (queries are 'last 1h/30d for this series'); (3) **aggressive numeric compression** over time (delta/double-delta encoding shrinks huge volumes). A row-store OLTP DB is optimized for point reads/updates — the opposite workload.",
        "new": true
      },
      {
        "id": "Q27",
        "question": "Metrics alerting: evaluate 'above threshold for 5 minutes' in a streaming path. Keep per-series window state correct across crashes and rule deploys?",
        "answer": "A stream processor (**Flink**) keeps **per-series rolling-window state** and **checkpoints it to durable storage (RocksDB / object storage)**, so a node crash restores the window instead of resetting it (which would cause false alerts or missed breaches). For rule changes mid-deploy, **version the rules** and apply a new definition only to windows that **start after** the update, so in-flight window state isn't corrupted.",
        "new": true
      },
      {
        "id": "Q28",
        "question": "Metrics pipeline: you add retries for reliability, but retried writes after a network blip create duplicate data points that corrupt aggregates. Fix?",
        "answer": "Make writes **idempotent**: hash the metric's label set into a stable **series ID** and use it (with the timestamp) as a **dedup key** at the write layer, so a replayed point overwrites instead of double-counting. Retries become safe and aggregations/alerts stay correct.",
        "new": true
      },
      {
        "id": "Q29",
        "question": "Metrics dashboards: a user queries weeks or months of data and it's slow. Serve it fast.",
        "answer": "**Tiered rollups + a result cache.** Pre-aggregate raw points into coarser resolutions (1-min buckets for weeks, 1-hr for months) so long-range queries scan far fewer points (long ranges accept lower resolution). Layer a **result cache** since dashboard refreshes re-run near-identical queries constantly. Route long ranges to the rollup store, recent/high-res to the raw TSDB.",
        "new": true
      },
      {
        "id": "Q30",
        "question": "Ticketmaster: prevent a user from losing their seat mid-checkout while also preventing double-selling.",
        "answer": "**Seat state machine: available → pending → sold.** On select, atomically flip the seat to **pending with a short TTL** (a Redis hold / timestamp) — reserving it so concurrent buyers can't grab it; then take payment; then flip to **sold**. If payment doesn't finish before the TTL, the hold **auto-expires back to available**. The pending state is what makes hold-then-pay safe under concurrency.",
        "new": true
      },
      {
        "id": "Q31",
        "question": "Ticketmaster: the seat map should update in real time as others take seats for the same event.",
        "answer": "Push, don't poll, under high concurrency: **SSE** (one-way is enough for availability) from the Ticket Service, plus a **fan-out layer** that takes each seat-state change and broadcasts it to all clients watching that event. WebSockets only if you need bidirectional. Polling is acceptable only at low concurrency — it lags and wastes requests during a hot on-sale.",
        "new": true
      },
      {
        "id": "Q32",
        "question": "Ticketmaster: a flash sale brings millions of fans for a few thousand seats. Admit them fairly without crushing the booking service.",
        "answer": "A **virtual waiting room** backed by a **Redis sorted set keyed by join timestamp** for ordered, fair admission. Admit users in **batches by popping the front** at a rate the Ticket Service can sustain. Gate booking at the API gateway so only **admitted** users can hit the ticket service — everyone else holds their queue position. Converts an unbounded stampede into a controlled FIFO trickle.",
        "new": true
      }
    ]
  }
];
