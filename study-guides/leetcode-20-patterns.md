# LeetCode was HARD until I Learned these 20 Patterns

**Author:** Ashish Pratap Singh (@ashishps_1)
**Published:** January 18, 2026 on X
**Source:** [Original Post](https://x.com/ashishps_1/status/2012864271773016266)

---

I've solved more than **1500 LeetCode problems**, and if there is one thing I learned, it's this:

> LeetCode is **less** about how many problems you have solved and **more** about how many **patterns** you know.

Learning patterns help you solve a wide range of problems in less time because they train you to recognize the right approach, even for questions you have never seen before.

In this article, I'll walk you through the **20 most important patterns** that made my LeetCode journey far less painful. Even better, these are the same patterns that showed up repeatedly in my coding interviews, including at companies like **Amazon** and **Google**.

For each pattern, I'll share:
- When to use it
- A reusable template
- A sample problem walkthrough
- Links to deeper explanations for each pattern
- Practice links to related LeetCode problems

This article is the essence of everything I have learned about DSA and LeetCode, distilled into one guide. If you want to learn more patterns, checkout my website: [algomaster.io](https://algomaster.io)

Let's get started.

---

## 1. Prefix Sum

The Prefix Sum pattern involves **preprocessing** an array to create a new array where each element at index i represents the sum of all elements from the start up to i. This allows for **O(1) sum queries** on any subarray.

**When to use:**
- Multiple sum queries on subarrays
- Finding subarrays with a target sum
- Calculating cumulative totals

**Template (Java):**
```java
// Build prefix sum array
int[] prefix = new int[n + 1];
for (int i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
}
// Query sum of range [left, right]
int rangeSum = prefix[right + 1] - prefix[left];
```

**Sample Problem — Range Sum Query:**
Given an array nums, answer multiple queries about the sum of elements within a specific range [i, j].

- Input: `nums = [1, 2, 3, 4, 5, 6]`, i = 1, j = 3
- Output: 9

**Walkthrough:**
```
nums = [1, 2, 3, 4, 5, 6]
prefix = [0, 1, 3, 6, 10, 15, 21]
sum for range [1, 3] = prefix[4] - prefix[1] = 10 - 1 = 9
```

**LeetCode Problems:**
- Range Sum Query - Immutable (#303)
- Contiguous Array (#525)
- Subarray Sum Equals K (#560)
- Product of Array Except Self (#238)

---

## 2. Two Pointers

The Two Pointers pattern uses two pointers to traverse an array or list, typically from opposite ends or both moving in the same direction. It reduces time complexity from O(n²) to O(n) for many array/string problems.

**When to use:**
- Finding pairs in sorted arrays
- Comparing elements from both ends
- Partitioning arrays
- Palindrome checks

**Template (Java):**
```java
// Opposite direction (converging)
int left = 0, right = n - 1;
while (left < right) {
    if (condition_met) { /* found answer */ }
    else if (need_larger_sum) { left++; }
    else { right--; }
}

// Same direction
int slow = 0;
for (int fast = 0; fast < n; fast++) {
    if (condition) { slow++; }
}
```

**Sample Problem — Two Sum II:**
Find two numbers in a sorted array that add up to a target value.

- Input: `nums = [1, 2, 3, 4, 6]`, target = 6
- Output: [1, 3]

**LeetCode Problems:**
- Merge Sorted Array (#88)
- Two Sum II - Input Array is Sorted (#167)
- 3Sum (#15)
- Container With Most Water (#11)
- Trapping Rain Water (#42)

---

## 3. Sliding Window

The Sliding Window pattern maintains a window of elements and slides it across the array to find subarrays or substrings that satisfy certain conditions.

**When to use:**
- Contiguous subarray/substring problems
- Finding maximum/minimum in window of size k
- Longest/shortest substring with certain properties
- Problems involving consecutive elements

**Template (Java):**
```java
// Fixed-size window
int windowSum = 0;
for (int i = 0; i < n; i++) {
    windowSum += nums[i];
    if (i >= k - 1) {
        result = Math.max(result, windowSum);
        windowSum -= nums[i - k + 1];
    }
}

// Variable-size window
int left = 0;
for (int right = 0; right < n; right++) {
    // expand window
    while (window_condition_violated) {
        left++;  // shrink from left
    }
    // update result
}
```

**Sample Problem — Maximum Sum Subarray of Size K:**
- Input: `nums = [2, 1, 5, 1, 3, 2]`, k = 3
- Output: 9

**LeetCode Problems:**
- Maximum Average Subarray I (#643)
- Longest Substring Without Repeating Characters (#3)
- Minimum Window Substring (#76)
- Permutation in String (#567)
- Sliding Window Maximum (#239)

---

## 4. Fast & Slow Pointers

The Fast & Slow Pointers pattern (Tortoise and Hare) uses two pointers moving at different speeds. When there is a cycle, the fast pointer will eventually meet the slow pointer.

**When to use:**
- Detecting cycles in linked lists or arrays
- Finding the middle of a linked list
- Finding the start of a cycle

**Template (Java):**
```java
// Find middle
while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
}
return slow;

// Cycle detection
ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow == fast) return true;  // cycle detected
}
return false;
```

**LeetCode Problems:**
- Middle of the Linked List (#876)
- Linked List Cycle (#141)
- Linked List Cycle II (#142)
- Happy Number (#202)
- Find the Duplicate Number (#287)

---

## 5. LinkedList In-place Reversal

This pattern reverses parts of a linked list without using extra space by manipulating pointers.

**When to use:**
- Reversing a linked list or portion of it
- Reversing nodes in groups
- Checking for palindromes in linked lists

**Template (Java):**
```java
ListNode prev = null, curr = head;
while (curr != null) {
    ListNode next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
}
return prev;
```

**Sample Problem — Reverse Linked List II:**
- Input: `head = [1, 2, 3, 4, 5]`, m = 2, n = 4
- Output: [1, 4, 3, 2, 5]

**LeetCode Problems:**
- Reverse Linked List (#206)
- Reverse Linked List II (#92)
- Swap Nodes in Pairs (#24)
- Reverse Nodes in k-Group (#25)
- Palindrome Linked List (#234)

---

## 6. Frequency Counting

Uses hash maps or arrays to count occurrences of elements. Transforms O(n²) lookup problems into O(n) by trading space for time.

**When to use:**
- Finding duplicates or unique elements
- Checking if two collections have same elements
- Finding elements that appear k times
- Anagram problems

**Template (Java):**
```java
Map<Integer, Integer> freq = new HashMap<>();
for (int num : nums) {
    freq.put(num, freq.getOrDefault(num, 0) + 1);
}
```

**LeetCode Problems:**
- Valid Anagram (#242)
- First Unique Character in a String (#387)
- Group Anagrams (#49)
- Top K Frequent Elements (#347)

---

## 7. Monotonic Stack

A Monotonic Stack maintains elements in either increasing or decreasing order. As you iterate, you pop elements that violate the order, revealing relationships between elements.

**When to use:**
- Finding the next greater/smaller element
- Finding previous greater/smaller element
- Problems involving spans or ranges
- Histogram problems

**Template (Java):**
```java
int[] result = new int[n];
Arrays.fill(result, -1);
Stack<Integer> stack = new Stack<>();
for (int i = 0; i < n; i++) {
    while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
        int idx = stack.pop();
        result[idx] = nums[i];
    }
    stack.push(i);
}
```

**LeetCode Problems:**
- Next Greater Element I (#496)
- Daily Temperatures (#739)
- Largest Rectangle in Histogram (#84)
- Trapping Rain Water (#42)
- Online Stock Span (#901)

---

## 8. Bit Manipulation

Uses binary operations (AND, OR, XOR, NOT, shifts) to solve problems efficiently. XOR is particularly useful since `a ^ a = 0` and `a ^ 0 = a`.

**When to use:**
- Finding unique numbers (XOR)
- Checking power of 2
- Counting bits
- Generating subsets using bit masks
- Space optimization

**Template (Java):**
```java
// Check if power of 2
boolean isPowerOf2 = (n > 0) && ((n & (n - 1)) == 0);

// Find single number (XOR all elements)
int single = 0;
for (int num : nums) { single ^= num; }
```

**LeetCode Problems:**
- Single Number (#136)
- Number of 1 Bits (#191)
- Counting Bits (#338)
- Power of Two (#231)
- Missing Number (#268)

---

## 9. Top 'K' Elements

Finds the k largest or smallest elements using heaps (priority queues).

**When to use:**
- Finding k largest/smallest elements
- Finding kth largest/smallest element
- Finding k most/least frequent elements
- Merging k sorted lists

**Template (Java):**
```java
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
for (int num : nums) {
    minHeap.offer(num);
    if (minHeap.size() > k) {
        minHeap.poll();
    }
}
// minHeap.peek() is the kth largest
```

**LeetCode Problems:**
- Kth Largest Element in an Array (#215)
- Top K Frequent Elements (#347)
- K Closest Points to Origin (#973)
- Find K Pairs with Smallest Sums (#373)
- Kth Largest Element in a Stream (#703)

---

## 10. Overlapping Intervals

Handles problems involving intervals that may overlap. After sorting by start time, two intervals [a,b] and [c,d] overlap if `b >= c`.

**When to use:**
- Merging overlapping intervals
- Finding interval intersections
- Scheduling problems (meeting rooms)
- Inserting into sorted intervals

**Template (Java):**
```java
Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
List<int[]> merged = new ArrayList<>();
for (int[] interval : intervals) {
    if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {
        merged.add(interval);
    } else {
        merged.get(merged.size() - 1)[1] = Math.max(
            merged.get(merged.size() - 1)[1], interval[1]);
    }
}
```

**LeetCode Problems:**
- Merge Intervals (#56)
- Insert Interval (#57)
- Non-overlapping Intervals (#435)
- Meeting Rooms (#252)

---

## 11. Modified Binary Search

Adapts binary search to handle rotated arrays, finding boundaries, or searching for conditions rather than exact values.

**When to use:**
- Searching in rotated sorted arrays
- Finding first/last occurrence of element
- Finding minimum/maximum satisfying a condition
- Peak finding problems

**Template (Java):**
```java
int left = 0, right = n - 1;
while (left <= right) {
    int mid = left + (right - left) / 2;
    if (nums[mid] == target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
}
```

**LeetCode Problems:**
- Search in Rotated Sorted Array (#33)
- Find Minimum in Rotated Sorted Array (#153)
- Search a 2D Matrix (#74)
- Find Peak Element (#162)
- First Bad Version (#278)

---

## 12. Binary Tree Traversal

Visits all nodes in a specific order: preorder (root-left-right), inorder (left-root-right), postorder (left-right-root).

**When to use:**
- Processing tree nodes in specific order
- Building trees from traversals
- BST operations (inorder gives sorted order)
- Tree serialization/deserialization

**Template (Java):**
```java
// Preorder (Root -> Left -> Right)
void preorder(TreeNode node) {
    if (node == null) return;
    process(node);
    preorder(node.left);
    preorder(node.right);
}

// Inorder (Left -> Root -> Right)
void inorder(TreeNode node) {
    if (node == null) return;
    inorder(node.left);
    process(node);
    inorder(node.right);
}

// Postorder (Left -> Right -> Root)
void postorder(TreeNode node) {
    if (node == null) return;
    postorder(node.left);
    postorder(node.right);
    process(node);
}
```

**LeetCode Problems:**
- Binary Tree Inorder Traversal (#94)
- Binary Tree Preorder Traversal (#144)
- Binary Tree Postorder Traversal (#145)
- Kth Smallest Element in a BST (#230)
- Validate Binary Search Tree (#98)

---

## 13. Depth-First Search (DFS)

Explores as deep as possible along each branch before backtracking. Uses a stack (or recursion).

**When to use:**
- Exploring all paths in a tree/graph
- Finding connected components
- Detecting cycles
- Topological sorting
- Path finding when all paths matter

**Template (Java):**
```java
void dfs(int node, boolean[] visited, List<List<Integer>> graph) {
    visited[node] = true;
    process(node);
    for (int neighbor : graph.get(node)) {
        if (!visited[neighbor]) {
            dfs(neighbor, visited, graph);
        }
    }
}
```

**LeetCode Problems:**
- Path Sum (#112)
- Path Sum II (#113)
- Clone Graph (#133)
- Course Schedule II (#210)
- Number of Islands (#200)

---

## 14. Breadth-First Search (BFS)

Explores nodes level by level, visiting all neighbors before moving deeper. Uses a queue and guarantees the shortest path in unweighted graphs.

**When to use:**
- Finding shortest path (unweighted)
- Level-order traversal
- Finding all nodes at distance k
- Spreading problems (rotting oranges, walls and gates)

**Template (Java):**
```java
Queue<Node> queue = new LinkedList<>();
Set<Node> visited = new HashSet<>();
queue.offer(start);
visited.add(start);

while (!queue.isEmpty()) {
    Node current = queue.poll();
    process(current);
    for (Node neighbor : current.getNeighbors()) {
        if (!visited.contains(neighbor)) {
            visited.add(neighbor);
            queue.offer(neighbor);
        }
    }
}
```

**LeetCode Problems:**
- Binary Tree Level Order Traversal (#102)
- Rotting Oranges (#994)
- Word Ladder (#127)
- Minimum Depth of Binary Tree (#111)
- Walls and Gates (#286)

---

## 15. Shortest Path

Finds the minimum distance between nodes. Dijkstra's works for non-negative weights; Bellman-Ford handles negative weights.

**When to use:**
- Finding minimum cost/distance paths
- Network routing problems
- Weighted graph traversal
- Problems with varying edge costs

**Template — Dijkstra's (Java):**
```java
int[] dist = new int[n];
Arrays.fill(dist, Integer.MAX_VALUE);
dist[source] = 0;
PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
pq.offer(new int[]{0, source});

while (!pq.isEmpty()) {
    int[] curr = pq.poll();
    int d = curr[0], node = curr[1];
    if (d > dist[node]) continue;
    for (int[] edge : graph.get(node)) {
        int neighbor = edge[0], weight = edge[1];
        int newDist = dist[node] + weight;
        if (newDist < dist[neighbor]) {
            dist[neighbor] = newDist;
            pq.offer(new int[]{newDist, neighbor});
        }
    }
}
```

**LeetCode Problems:**
- Network Delay Time (#743)
- Cheapest Flights Within K Stops (#787)
- Path with Maximum Probability (#1514)
- Swim in Rising Water (#778)
- Path with Minimum Effort (#1631)

---

## 16. Matrix Traversal

Uses DFS or BFS to explore 2D grids. The key is handling 4-directional movement and boundary checks.

**When to use:**
- Grid-based problems (islands, regions)
- Flood fill algorithms
- Finding connected components in 2D
- Path finding in mazes

**Template (Java):**
```java
int[] dx = {0, 0, 1, -1};
int[] dy = {1, -1, 0, 0};

void dfs(int[][] grid, int i, int j, boolean[][] visited) {
    int m = grid.length, n = grid[0].length;
    if (i < 0 || i >= m || j < 0 || j >= n) return;
    if (visited[i][j] || grid[i][j] == 0) return;
    visited[i][j] = true;
    for (int d = 0; d < 4; d++) {
        dfs(grid, i + dx[d], j + dy[d], visited);
    }
}
```

**LeetCode Problems:**
- Number of Islands (#200)
- Flood Fill (#733)
- Surrounded Regions (#130)
- Max Area of Island (#695)
- Pacific Atlantic Water Flow (#417)

---

## 17. Backtracking

Explores all possible solutions by making choices and undoing (backtracking) when a path leads to an invalid solution.

**When to use:**
- Generating all permutations/combinations/subsets
- Solving constraint satisfaction problems (N-Queens, Sudoku)
- Finding all paths meeting certain criteria
- String partitioning problems

**Template (Java):**
```java
public void backtrack(State state, Choices choices, Results results) {
    if (isComplete(state)) {
        results.add(copy(state));
        return;
    }
    for (Choice choice : getAvailableChoices(state, choices)) {
        makeChoice(state, choice);       // 1. CHOOSE
        backtrack(state, choices, results); // 2. EXPLORE
        undoChoice(state, choice);        // 3. UNCHOOSE
    }
}
```

**LeetCode Problems:**
- Subsets (#78)
- Permutations (#46)
- Combination Sum (#39)
- N-Queens (#51)
- Word Search (#79)

---

## 18. Prefix Search (Trie)

A Trie (prefix tree) stores strings character by character, allowing efficient prefix lookups.

**When to use:**
- Autocomplete and search suggestions
- Spell checking
- IP routing (longest prefix match)
- Word games (finding valid words)

**Template (Java):**
```java
class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEndOfWord = false;
}

class Trie {
    TrieNode root = new TrieNode();

    void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null)
                node.children[idx] = new TrieNode();
            node = node.children[idx];
        }
        node.isEndOfWord = true;
    }

    boolean search(String word) {
        TrieNode node = searchPrefix(word);
        return node != null && node.isEndOfWord;
    }

    boolean startsWith(String prefix) {
        return searchPrefix(prefix) != null;
    }
}
```

**LeetCode Problems:**
- Implement Trie (#208)
- Word Search II (#212)
- Design Add and Search Words Data Structure (#211)
- Replace Words (#648)
- Longest Word in Dictionary (#720)

---

## 19. Greedy

Greedy algorithms make locally optimal choices at each step, hoping to find a global optimum.

**When to use:**
- Optimization problems with greedy choice property
- Interval scheduling
- Huffman coding
- Activity selection
- When proof by exchange argument works

**Template (Java):**
```java
public Result solveGreedy(Input input) {
    sort(input, byGreedyCriterion);
    Result result = initialResult();
    State state = initialState();

    for (Element element : input) {
        if (canInclude(element, state)) {
            result = update(result, element);
            state = updateState(state, element);
        }
    }
    return result;
}
```

**LeetCode Problems:**
- Jump Game (#55)
- Jump Game II (#45)
- Gas Station (#134)
- Task Scheduler (#621)
- Partition Labels (#763)

---

## 20. Dynamic Programming Patterns

DP solves problems by breaking them into overlapping subproblems and storing results to avoid recomputation.

**When to use:**
- Problems with overlapping subproblems
- Optimization (min/max) problems
- Counting problems (number of ways)
- Decision problems (can we achieve X?)

**Common DP Patterns:**
- Fibonacci Pattern (1D DP with previous states)
- 0/1 Knapsack (include or exclude each item)
- Longest Common Subsequence (2D DP on two sequences)
- Longest Increasing Subsequence

**Sample Problem — Climbing Stairs:**
Find the number of ways to climb n stairs, taking 1 or 2 steps at a time.
- Input: n = 4
- Output: 5

```
dp[0] = 1, dp[1] = 1
dp[2] = dp[1] + dp[0] = 2
dp[3] = dp[2] + dp[1] = 3
dp[4] = dp[3] + dp[2] = 5
```

**LeetCode Problems:**
- Climbing Stairs (#70)
- House Robber (#198)
- Coin Change (#322)
- Longest Common Subsequence (#1143)
- Longest Increasing Subsequence (#300)
- Partition Equal Subset Sum (#416)
- Edit Distance (#72)

---

*For more patterns and problems, visit [algomaster.io](https://algomaster.io)*
