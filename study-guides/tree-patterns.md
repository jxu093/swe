# 6 Tree Patterns That Cover 400+ Problems

**Source:** [@0xlelouch_](https://x.com/0xlelouch_/status/2016815150398132585)

---

Trees are where most people quit DSA — recursion breaks your brain and you blank out in the interview. But after analyzing 400+ tree problems, they all reduce to 6 repeating patterns.

---

## 1. Level Order Traversal (BFS)

**When to use:** the problem asks to process nodes "level by level" or find the "shortest path" in an unweighted tree.

**The hack:** stop trying to use recursion for everything. Use a queue.

```python
from collections import deque

def level_order(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):  # process one level at a time
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result
```

**Key insight:** the `for _ in range(len(queue))` loop is what separates levels. Without it, you're just doing a plain BFS without level tracking.

**Variations:**
- **Zigzag level order:** alternate left-to-right and right-to-left each level
- **Right side view:** take the last element of each level
- **Average of levels:** compute mean of each level
- **Minimum depth:** BFS finds it first (first leaf node encountered)

**LeetCode:** #102 (Level Order), #103 (Zigzag), #199 (Right Side View), #111 (Minimum Depth), #637 (Average of Levels)

---

## 2. Depth First Search (DFS)

**When to use:** you need to go deep before going wide — checking a path from root to leaf, computing heights, or validating tree properties.

**The hack:** master Pre-order, In-order, and Post-order. That's 70% of the game.

```python
# Pre-order: process root BEFORE children (top-down)
# Use when: you need to pass information DOWN the tree
def preorder(node):
    if not node:
        return
    process(node)          # root first
    preorder(node.left)
    preorder(node.right)

# In-order: process root BETWEEN children
# Use when: BST problems (gives sorted order)
def inorder(node):
    if not node:
        return
    inorder(node.left)
    process(node)          # root in the middle
    inorder(node.right)

# Post-order: process root AFTER children (bottom-up)
# Use when: you need information FROM children to compute root's answer
def postorder(node):
    if not node:
        return
    postorder(node.left)
    postorder(node.right)
    process(node)          # root last
```

**When to use which:**
- **Pre-order:** copying a tree, serialization, printing paths
- **In-order:** BST operations (sorted output), kth smallest
- **Post-order:** computing heights, checking balance, deleting trees, computing subtree sums

**LeetCode:** #104 (Maximum Depth), #110 (Balanced Binary Tree), #543 (Diameter), #98 (Validate BST)

---

## 3. Path Sum

**When to use:** "find a path that equals K," "find all paths from root to leaf," or any problem tracking a running total along a path.

**The hack:** subtract the node's value from the target as you go down. If target equals 0 at a leaf, you win.

```python
def has_path_sum(root, target):
    if not root:
        return False
    target -= root.val
    if not root.left and not root.right:  # leaf node
        return target == 0
    return has_path_sum(root.left, target) or has_path_sum(root.right, target)

# Find ALL paths that sum to target
def path_sum_all(root, target):
    result = []
    def dfs(node, remaining, path):
        if not node:
            return
        path.append(node.val)
        remaining -= node.val
        if not node.left and not node.right and remaining == 0:
            result.append(list(path))  # copy the path
        dfs(node.left, remaining, path)
        dfs(node.right, remaining, path)
        path.pop()  # backtrack
    dfs(root, target, [])
    return result
```

**Advanced variation — Path Sum III:** paths don't have to start at root or end at leaf. Use a prefix sum hash map (same idea as subarray sum equals K, but on a tree).

```python
def path_sum_iii(root, target):
    prefix = {0: 1}
    count = 0
    def dfs(node, current_sum):
        nonlocal count
        if not node:
            return
        current_sum += node.val
        count += prefix.get(current_sum - target, 0)
        prefix[current_sum] = prefix.get(current_sum, 0) + 1
        dfs(node.left, current_sum)
        dfs(node.right, current_sum)
        prefix[current_sum] -= 1  # backtrack
    dfs(root, 0)
    return count
```

**LeetCode:** #112 (Path Sum), #113 (Path Sum II), #437 (Path Sum III), #129 (Root to Leaf Numbers)

---

## 4. Tree Construction

**When to use:** "build a tree from these two arrays" — given preorder + inorder, or inorder + postorder traversals, reconstruct the tree.

**The hack:** find the root (usually first element of preorder or last element of postorder), then split the arrays and recurse.

```python
def build_tree(preorder, inorder):
    if not preorder or not inorder:
        return None
    root_val = preorder[0]
    root = TreeNode(root_val)
    mid = inorder.index(root_val)  # find root in inorder
    root.left = build_tree(preorder[1:mid+1], inorder[:mid])
    root.right = build_tree(preorder[mid+1:], inorder[mid+1:])
    return root
```

**Optimization:** use a hash map for O(1) lookup of root position in inorder array instead of `index()` which is O(n).

```python
def build_tree_optimized(preorder, inorder):
    inorder_map = {val: idx for idx, val in enumerate(inorder)}
    pre_idx = [0]  # use list for mutable reference

    def helper(in_left, in_right):
        if in_left > in_right:
            return None
        root_val = preorder[pre_idx[0]]
        pre_idx[0] += 1
        root = TreeNode(root_val)
        mid = inorder_map[root_val]
        root.left = helper(in_left, mid - 1)
        root.right = helper(mid + 1, in_right)
        return root

    return helper(0, len(inorder) - 1)
```

**LeetCode:** #105 (From Preorder + Inorder), #106 (From Inorder + Postorder), #108 (Sorted Array to BST), #1008 (From Preorder of BST)

---

## 5. Lowest Common Ancestor (LCA)

**The most repeated tree interview question.**

**The hack for BST:** if both target nodes are smaller than current, go left. If both are larger, go right. If they split (one on each side), the current node is the LCA.

```python
# BST version — O(h) time
def lca_bst(root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root  # split point = LCA

# General binary tree version — O(n) time
def lca_bt(root, p, q):
    if not root or root == p or root == q:
        return root
    left = lca_bt(root.left, p, q)
    right = lca_bt(root.right, p, q)
    if left and right:
        return root      # p and q are on different sides
    return left or right  # both on the same side
```

**Why the general BT version works:** recursively search left and right subtrees. If both return non-null, the current node is the LCA. If only one returns non-null, the LCA is in that subtree.

**LeetCode:** #235 (LCA of BST), #236 (LCA of Binary Tree), #1644 (LCA of BT II — nodes may not exist)

---

## 6. Serialize & Deserialize

**When to use:** how to store a tree in a file/string and reconstruct it. Common in system design too (how do you send a tree over a network?).

**The hack:** pick a traversal (pre-order is easiest), use a delimiter, and put null markers for empty children.

```python
class Codec:
    def serialize(self, root):
        """Encodes a tree to a single string."""
        result = []
        def dfs(node):
            if not node:
                result.append("null")
                return
            result.append(str(node.val))
            dfs(node.left)
            dfs(node.right)
        dfs(root)
        return ",".join(result)

    def deserialize(self, data):
        """Decodes a string back to a tree."""
        values = iter(data.split(","))
        def dfs():
            val = next(values)
            if val == "null":
                return None
            node = TreeNode(int(val))
            node.left = dfs()
            node.right = dfs()
            return node
        return dfs()
```

**Why pre-order works:** the first value is always the root, and the null markers tell you exactly where subtrees end. No need for a second traversal (unlike construction from preorder + inorder).

**BFS alternative:** serialize level by level (like LeetCode's own tree format). Useful when you need to reconstruct level by level.

**LeetCode:** #297 (Serialize and Deserialize Binary Tree), #449 (Serialize BST), #428 (Serialize N-ary Tree)

---

## Summary

| Pattern | Trigger | Key Data Structure |
|---------|---------|-------------------|
| Level Order (BFS) | "level by level", shortest path | Queue |
| DFS | Paths, heights, validation | Recursion / Stack |
| Path Sum | "path equals K", running totals | DFS + backtracking |
| Construction | "build from traversals" | Recursion + index lookup |
| LCA | "common ancestor" | BST property or recursive search |
| Serialize | "store/transmit a tree" | Pre-order + null markers |

**400+ problems, 6 logic blocks.** Stop grinding 100 random questions — master these 6 and you handle the whole category.
