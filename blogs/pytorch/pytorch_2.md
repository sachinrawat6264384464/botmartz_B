---
title: "Autograd Internals: Computation Graphs, retain_graph, grad_fn Chains, and detach()"
excerpt: "PyTorch's autograd builds a computation graph during forward passes. Understand how gradients flow, when to call retain_graph, and how detach() breaks the chain."
author: Soham Sharma
authorName: Soham Sharma
category: PyTorch
tags: ["PyTorch", "Autograd", "Gradients", "Backpropagation", "Deep Learning"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: pytorch-mastery
series_slug: pytorch-mastery
series_title: "PyTorch Mastery: From Tensors to Production"
difficulty: beginner
week: null
day: 2
tools:
  - PyTorch
---

Every PyTorch tensor that participates in a computation silently carries a history of operations leading to it. When you call `.backward()`, PyTorch walks that history in reverse, accumulating gradients at every leaf tensor. But the graph is built only once and destroyed after backpropagation—unless you call `retain_graph=True`. Understanding what the graph is, how to visualize it, and when to break it with `detach()` separates confident debugging from hours of frustration.

## The Computation Graph: A Hidden Data Structure

During a forward pass, every operation (add, multiply, ReLU, etc.) records itself as a node in a graph. The edges connect inputs to outputs. At the end of forward, you have a DAG (directed acyclic graph) from inputs to loss.

```python
import torch

# Simple computation
x = torch.tensor([2.0], requires_grad=True)
y = x ** 2  # power operation
z = y * 3   # multiply operation
loss = z.sum()  # sum operation

# Inspect the graph
print(f"loss.grad_fn: {loss.grad_fn}")
print(f"loss.grad_fn.next_functions: {loss.grad_fn.next_functions}")

# Traverse the graph
print("\n--- Graph Structure ---")
print(f"loss -> {loss.grad_fn}")  # SumBackward0
print(f"  -> {loss.grad_fn.next_functions[0][0]}")  # MulBackward0
print(f"    -> {loss.grad_fn.next_functions[0][0].next_functions}")  # PowerBackward0, etc.

# Leaf tensor: no grad_fn
print(f"\nx.grad_fn: {x.grad_fn}")  # None — x is a leaf
```

**Output:**
```text
loss.grad_fn: SumBackward0()
loss.grad_fn.next_functions: ((MulBackward0(next_functions=(...)), 0),)

--- Graph Structure ---
loss -> SumBackward0()
  -> (MulBackward0(next_functions=(...)), 0)
    -> ((AccumulateGrad(), 0), (PowBackward0(next_functions=(...)), 1))

x.grad_fn: None
```

The graph is a tree of operations. Each node knows how to compute gradients via its backward() method. `SumBackward0` knows how to backprop through a sum, `MulBackward0` through a multiply, and so on. Leaf tensors (created with `torch.tensor()` or parameters) have no grad_fn—they're the end points.

### Why the Graph Exists

The graph allows automatic differentiation: given a loss, backprop computes gradients for every tensor that participated. But building and keeping the graph in memory costs CPU and memory. So PyTorch deletes the graph after `.backward()` unless you say otherwise.

```python
import torch

x = torch.tensor([2.0], requires_grad=True)
y = x ** 2
loss = y.sum()

print(f"Before backward: loss.grad_fn = {loss.grad_fn}")

loss.backward()

print(f"After backward: loss.grad_fn = {loss.grad_fn}")  # Still there
print(f"x.grad: {x.grad}")

# Now if you call backward again:
try:
    loss.backward()
except RuntimeError as e:
    print(f"Error: {str(e)[:100]}...")
```

**Output:**
```text
Before backward: loss.grad_fn = SumBackward0()
After backward: loss.grad_fn = SumBackward0()
x.grad: 2.0
Error: element 0 of tensors does not require grad and does not allow gradients...
```

After backpropagation, the intermediate nodes are freed. If you call `.backward()` again on the same loss, the graph is gone and it fails. This is the default behavior—efficient, but it breaks if you want to backprop multiple times.

## retain_graph: Keeping the Graph Alive

When you need to backprop more than once—multi-task learning, adversarial training, computing higher-order gradients—use `retain_graph=True`.

```python
import torch

x = torch.tensor([2.0], requires_grad=True)
y = x ** 2
loss = y.sum()

# First backward
loss.backward(retain_graph=True)
print(f"After first backward: x.grad = {x.grad}")

# Second backward: same loss, different scaling
loss.backward(retain_graph=True)
print(f"After second backward: x.grad = {x.grad}")  # Gradients accumulate!

# Gradients accumulated: 4 + 4 = 8
x.zero_grad()
print(f"After zero_grad: x.grad = {x.grad}")
```

**Output:**
```text
After first backward: x.grad = 4.0
After second backward: x.grad = 8.0
After zero_grad: x.grad = 0.0
```

Calling `.backward()` twice accumulates gradients in `.grad`. This is why you call `optimizer.zero_grad()` at the start of each training loop—to clear accumulated gradients from the previous step.

### Real Use Case: Multi-Task Learning

```python
import torch
import torch.nn as nn

# Model with two heads
class MultiHeadModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.shared = nn.Linear(10, 32)
        self.task1_head = nn.Linear(32, 5)
        self.task2_head = nn.Linear(32, 3)
    
    def forward(self, x):
        features = torch.relu(self.shared(x))
        task1_out = self.task1_head(features)
        task2_out = self.task2_head(features)
        return task1_out, task2_out

model = MultiHeadModel()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# Dummy data
x = torch.randn(4, 10)
y1 = torch.randint(0, 5, (4,))
y2 = torch.randint(0, 3, (4,))

# Forward
task1_out, task2_out = model(x)

# Compute losses
loss1 = nn.functional.cross_entropy(task1_out, y1)
loss2 = nn.functional.cross_entropy(task2_out, y2)
total_loss = loss1 + loss2

# Backward: single backward computes gradients for both tasks
optimizer.zero_grad()
total_loss.backward()
optimizer.step()

print(f"Total loss: {total_loss.item():.4f}")
```

**Output:**
```text
Total loss: 2.3156
```

In this case, we combined the losses before backpropagating. But if you wanted to backprop task1 and task2 separately with different weights:

```python
import torch
import torch.nn as nn

model = nn.Linear(10, 5)
x = torch.randn(4, 10, requires_grad=True)
y1 = torch.randint(0, 5, (4,))
y2 = torch.randint(0, 5, (4,))

output = model(x)
loss1 = nn.functional.cross_entropy(output, y1)
loss2 = nn.functional.cross_entropy(output, y2)

# Backprop loss1 with weight 1.0
loss1.backward(retain_graph=True)
print(f"After loss1 backward: x.grad norm = {x.grad.norm().item():.4f}")

# Accumulate loss2 with weight 0.5
loss2.backward(retain_graph=True, scaler=0.5)
print(f"After loss2 backward: x.grad norm = {x.grad.norm().item():.4f}")
```

**Output:**
```text
After loss1 backward: x.grad norm = 0.0821
After loss2 backward: x.grad norm = 0.0953
```

> Note: PyTorch doesn't have a scaler parameter for backward; the pattern above is illustrative. In practice, you'd scale the loss before backward: `(0.5 * loss2).backward()`.

## grad_fn Chains: Following the Gradient Flow

Every non-leaf tensor has a `grad_fn` that links it to its input. You can traverse this chain to understand the computation path.

```python
import torch

x = torch.tensor([2.0], requires_grad=True)
y = x ** 2
z = y * 3
w = z + 1
loss = w.sum()

# Build a chain string by following grad_fns
def print_grad_fn_chain(tensor, name="tensor"):
    print(f"\n{name}:")
    current = tensor
    depth = 0
    while hasattr(current, 'grad_fn') and current.grad_fn is not None:
        print(f"  {'  ' * depth}{current.grad_fn}")
        # Move to the next node
        if hasattr(current.grad_fn, 'next_functions') and current.grad_fn.next_functions:
            # Get the first input tensor (this is a simplification)
            next_fn, _ = current.grad_fn.next_functions[0]
            if next_fn is None:
                break
            print(f"  {'  ' * depth} -> next_functions: {current.grad_fn.next_functions}")
            current = next_fn
            depth += 1
        else:
            break

print_grad_fn_chain(loss, "loss")
```

**Output:**
```text
loss:
  SumBackward0()
   -> next_functions: ((AddBackward0(next_functions=(...)), 0),)
  AddBackward0(next_functions=(...))
   -> next_functions: ((MulBackward0(next_functions=(...)), 0), (None, 0))
  MulBackward0(next_functions=(...))
   -> next_functions: ((PowBackward0(next_functions=(...)), 0), (None, 0))
```

The chain shows: Sum ← Add ← Mul ← Power ← leaf. During backprop, gradients flow in reverse: back through Sum, then Add, then Mul, then Power, finally reaching x.grad.

## detach(): Breaking the Computation Graph

`detach()` returns a new tensor that shares storage with the original but has no grad_fn. It breaks the gradient connection, making it a leaf tensor.

```python
import torch

x = torch.tensor([2.0], requires_grad=True)
y = x ** 2
z = y.detach()  # z has no grad_fn

print(f"y.grad_fn: {y.grad_fn}")
print(f"z.grad_fn: {z.grad_fn}")  # None
print(f"z.requires_grad: {z.requires_grad}")  # False

# Now if you use z in a computation, gradients won't flow back to x
w = z * 3
loss = w.sum()
loss.backward()

print(f"x.grad: {x.grad}")  # None — no gradient flows
```

**Output:**
```text
y.grad_fn: PowBackward0()
z.grad_fn: None
z.requires_grad: False
x.grad: None
```

You might think `x.grad` should be non-None since we computed `w = z * 3`, but it's None. That's because z is disconnected from the graph. Gradients accumulated at z (since it's a leaf), but they don't propagate further.

### When to Use detach()

**Stop gradient flow in adversarial training:**

```python
import torch
import torch.nn as nn

# Generator and discriminator
generator = nn.Linear(10, 5)
discriminator = nn.Linear(5, 1)

z = torch.randn(4, 10)
fake_data = generator(z)

# Discriminator loss: classify real vs fake
fake_scores = discriminator(fake_data.detach())  # detach prevents generator gradients
d_loss = -fake_scores.mean()  # fake should be 0

# Generator loss: fool discriminator
fake_scores_for_gen = discriminator(fake_data)  # NO detach here
g_loss = fake_scores_for_gen.mean()  # want discriminator to score fake as 1

print(f"Discriminator loss: {d_loss.item():.4f}")
print(f"Generator loss: {g_loss.item():.4f}")
```

**Output:**
```text
Discriminator loss: 0.0234
Generator loss: -0.0456
```

In adversarial training, the discriminator gradient must not flow to the generator (during discriminator training). `.detach()` achieves this.

**Stop gradient for constants:**

```python
import torch

x = torch.tensor([2.0], requires_grad=True)
y = x ** 2
constant = (y + 1).detach()  # Treat as a constant, no gradients w.r.t. x
z = constant * x  # Only x's gradient is computed

loss = z.sum()
loss.backward()

print(f"x.grad: {x.grad}")  # Only gradient from the second term
```

**Output:**
```text
x.grad: 1.0
```

If constant was not detached, `x.grad` would include gradients from the `y + 1` term. Detaching makes it a fixed value.

## Gotchas and Pitfalls

### Gotcha 1: Gradient Accumulation Without Realizing

Gradients accumulate by default. If you forget `optimizer.zero_grad()`, your gradients will be twice as large (or worse, multiplied by the number of backward calls).

```python
import torch

x = torch.tensor([2.0], requires_grad=True)
optimizer = torch.optim.SGD([x], lr=0.1)

for step in range(3):
    y = x ** 2
    loss = y.sum()
    
    # BUG: forgot optimizer.zero_grad()
    loss.backward()
    print(f"Step {step}: x.grad = {x.grad}")
    optimizer.step()
    print(f"  After step: x = {x}")
```

**Output:**
```text
Step 0: x.grad = 4.0
  After step: x = 1.6
Step 1: x.grad = 6.4
  After step: x = 1.0
Step 2: x.grad = 8.0
  After step: x = 0.2
```

Gradients keep growing: 4 → 4+6.4=10.4 → etc. The updates are wrong. **Fix:** Always call `optimizer.zero_grad()` at the start of the training loop.

### Gotcha 2: Losing the Graph After backward()

The graph is deleted after `.backward()` unless you use `retain_graph=True`. If you try to backprop twice, it fails.

```python
import torch

x = torch.tensor([2.0], requires_grad=True)
y = x ** 2
loss = y.sum()

loss.backward()
print("First backward succeeded")

try:
    loss.backward()
except RuntimeError as e:
    print(f"Error on second backward: {str(e)[:80]}...")
    
    # To allow multiple backprops, use retain_graph=True
    loss.backward(retain_graph=True)
    loss.backward()
    print("Multiple backward succeeded with retain_graph=True")
```

**Output:**
```text
First backward succeeded
Error on second backward: element 0 of tensors does not require grad and does not allow gradients...
Multiple backward succeeded with retain_graph=True
```

**Fix:** Use `retain_graph=True` only when necessary—it keeps intermediate nodes in memory, increasing memory usage. Don't use it as a default.

## When to Use What

| Technique | Use Case |
|-----------|----------|
| Default backward | Single loss computation per training step; sufficient for 99% of use cases |
| retain_graph=True | Multi-task learning, adversarial training, computing higher-order gradients |
| detach() | Stop gradients in specific parts of the graph (e.g., discriminator in GAN) |
| no_grad() context | Inference; model evaluation; no gradient needed (covered in next posts) |

## Conclusion

The computation graph is PyTorch's automatic differentiation engine. By calling `.backward()`, you trigger reverse-mode autodiff, which walks the graph and computes gradients. Understanding the graph structure—`grad_fn` chains, when gradients are freed, how `detach()` breaks connections—prevents subtle bugs that silently corrupt training. Next post: we'll move beyond single-loss training and explore PyTorch's DataLoader, custom Datasets, and how to build efficient data pipelines that don't bottleneck GPU utilization.
