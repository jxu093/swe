# Top 10 DSA Problems That Dominate Coding Rounds

**Source:** [@0xlelouch_](https://x.com/0xlelouch_/status/2021272400411885776)

---

The same 10 problem types appear across coding rounds at top companies. Master these and you can handle the majority of what you'll see.

---

## 1. Two Sum (Hash Map)

**Pattern:** Use a hash map to store complements as you iterate. For each element, check if `target - current` exists in the map.

**Time:** O(n) | **Space:** O(n)

```python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
```

**Variations:** Two Sum II (sorted array — use two pointers instead), 3Sum (sort + two pointers for each element), 4Sum.

**Key edge cases:** duplicates, negative numbers, single-element arrays.

**LeetCode:** #1 (Two Sum), #167 (Two Sum II), #15 (3Sum)

---

## 2. Sliding Window Maximum / Longest Substring (Window + Frequency Map)

**Pattern:** Maintain a window with a frequency map. Expand the right pointer, shrink the left when constraints are violated.

**Time:** O(n) | **Space:** O(k) where k is the character set

```python
def longest_substring_without_repeating(s):
    seen = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        if char in seen and seen[char] >= left:
            left = seen[char] + 1
        seen[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len
```

**Variations:** longest substring with at most K distinct characters, minimum window substring, sliding window maximum (use a monotonic deque).

**LeetCode:** #3 (Longest Substring Without Repeating), #239 (Sliding Window Maximum), #76 (Minimum Window Substring)

---

## 3. Binary Search on Answer (Min Capacity, Koko Bananas)

**Pattern:** When the answer space is monotonic (if X works, all values > X also work), binary search on the answer itself rather than on the input array.

**Time:** O(n log M) where M is the answer range | **Space:** O(1)

```python
def min_eating_speed(piles, h):
    left, right = 1, max(piles)
    while left < right:
        mid = (left + right) // 2
        hours = sum(math.ceil(p / mid) for p in piles)
        if hours <= h:
            right = mid
        else:
            left = mid + 1
    return left
```

**Variations:** ship packages within D days, split array largest sum, magnetic force between two balls.

**Key insight:** the trick is recognizing that you're binary searching the answer, not the array. Ask: "Can I verify a candidate answer in O(n)?"

**LeetCode:** #875 (Koko Eating Bananas), #1011 (Capacity to Ship Packages), #410 (Split Array Largest Sum)

---

## 4. Merge Intervals (Sort + Scan)

**Pattern:** Sort intervals by start time, then iterate and merge overlapping intervals.

**Time:** O(n log n) for sort | **Space:** O(n)

```python
def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged
```

**Variations:** insert interval, non-overlapping intervals (greedy — count removals), meeting rooms (check any overlap), meeting rooms II (min rooms — use a min-heap on end times).

**LeetCode:** #56 (Merge Intervals), #57 (Insert Interval), #252 (Meeting Rooms), #253 (Meeting Rooms II)

---

## 5. Top K Frequent (Heap / Bucket Sort)

**Pattern:** Count frequencies with a hash map, then use a min-heap of size K to find the top K elements.

**Time:** O(n log k) with heap, O(n) with bucket sort | **Space:** O(n)

```python
# Heap approach
def top_k_frequent(nums, k):
    freq = Counter(nums)
    return heapq.nlargest(k, freq.keys(), key=freq.get)

# Bucket sort approach (O(n))
def top_k_frequent_bucket(nums, k):
    freq = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, count in freq.items():
        buckets[count].append(num)
    result = []
    for i in range(len(buckets) - 1, -1, -1):
        result.extend(buckets[i])
        if len(result) >= k:
            return result[:k]
```

**Variations:** K closest points to origin, kth largest element (use quickselect for O(n) average), sort characters by frequency.

**LeetCode:** #347 (Top K Frequent Elements), #215 (Kth Largest Element), #973 (K Closest Points)

---

## 6. LRU Cache (Hash Map + Doubly Linked List)

**Pattern:** Hash map for O(1) lookup, doubly linked list for O(1) insertion/removal and maintaining access order.

**Time:** O(1) for get and put | **Space:** O(capacity)

```python
class LRUCache:
    def __init__(self, capacity):
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)
```

**Why this matters:** LRU Cache is one of the most frequently asked design + coding questions. Know how to implement it from scratch with a raw doubly linked list (not just OrderedDict).

**LeetCode:** #146 (LRU Cache), #460 (LFU Cache)

---

## 7. Kth Smallest in BST / Inorder (Stack)

**Pattern:** Inorder traversal of a BST visits nodes in sorted order. Use an iterative approach with a stack and stop at the kth node.

**Time:** O(H + k) where H is tree height | **Space:** O(H)

```python
def kth_smallest(root, k):
    stack = []
    current = root
    count = 0
    while stack or current:
        while current:
            stack.append(current)
            current = current.left
        current = stack.pop()
        count += 1
        if count == k:
            return current.val
        current = current.right
```

**Key insight:** iterative inorder with a stack is more interview-friendly than recursive because you can stop early.

**LeetCode:** #230 (Kth Smallest Element in BST), #98 (Validate BST), #94 (Binary Tree Inorder Traversal)

---

## 8. Linked List Cycle + Reverse (Fast/Slow Pointers)

**Pattern:** Fast pointer moves 2 steps, slow pointer moves 1 step. If they meet, there's a cycle. To find the cycle start, reset one pointer to head and move both at speed 1.

```python
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False

def reverse_list(head):
    prev = None
    while head:
        next_node = head.next
        head.next = prev
        prev = head
        head = next_node
    return prev
```

**Variations:** find cycle start, find middle of list, palindrome linked list (reverse second half + compare), reverse in groups of K.

**LeetCode:** #141 (Linked List Cycle), #142 (Cycle II), #206 (Reverse Linked List), #234 (Palindrome Linked List)

---

## 9. Islands / Shortest Path (BFS/DFS on Grids)

**Pattern:** Treat the grid as a graph. For counting components (islands), use DFS/BFS to flood-fill each component. For shortest path, use BFS.

```python
def num_islands(grid):
    count = 0
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == '1':
                count += 1
                dfs(grid, i, j)
    return count

def dfs(grid, i, j):
    if i < 0 or i >= len(grid) or j < 0 or j >= len(grid[0]):
        return
    if grid[i][j] != '1':
        return
    grid[i][j] = '0'  # mark visited
    for di, dj in [(0,1),(0,-1),(1,0),(-1,0)]:
        dfs(grid, i + di, j + dj)
```

**Variations:** max area of island, surrounded regions, rotting oranges (BFS with time steps), walls and gates.

**LeetCode:** #200 (Number of Islands), #695 (Max Area of Island), #994 (Rotting Oranges), #130 (Surrounded Regions)

---

## 10. DP Classics (Coin Change, LIS)

**Pattern:** Define a subproblem, find the recurrence relation, memoize or build bottom-up.

```python
# Coin Change: minimum coins to make amount
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

# LIS: Longest Increasing Subsequence
def length_of_lis(nums):
    dp = [1] * len(nums)
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)
```

**Key DP problems to know:** coin change, LIS, longest common subsequence, house robber, 0/1 knapsack, edit distance, climbing stairs.

**LeetCode:** #322 (Coin Change), #300 (LIS), #1143 (LCS), #198 (House Robber), #72 (Edit Distance)

---

## Study Strategy

Learn to code these fast, explain tradeoffs (time vs space, iterative vs recursive), and handle edge cases (empty inputs, single elements, all duplicates, negative numbers). That combination clears most coding rounds.
