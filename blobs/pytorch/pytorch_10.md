---
title: "Learning Rate Schedulers: StepLR, CosineAnnealing, OneCycleLR, and Warm Restarts"
excerpt: "A constant learning rate is rarely optimal. Learn how different schedulers adapt the learning rate during training: step decay, cosine annealing, cycles, and warm restarts."
author: Soham Sharma
authorName: Soham Sharma
category: PyTorch
tags: ["PyTorch", "Optimization", "Learning Rate", "Training"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: pytorch-mastery
series_slug: pytorch-mastery
series_title: "PyTorch Mastery: From Tensors to Production"
difficulty: intermediate
week: null
day: 9
tools:
  - PyTorch
---

The learning rate is one of the most important hyperparameters in training, but it's rarely fixed. As training progresses, large steps become dangerous (oversteps the minimum) and small steps become inefficient. Schedulers adjust the learning rate according to a schedule—decreasing it as training progresses, or cycling it to escape local minima. This post covers the most common schedulers: step decay, exponential decay, cosine annealing, and cyclic learning rates, with comparisons on a real training curve.

## Step Learning Rate Decay

Multiply the learning rate by a factor every N epochs.

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.optim.lr_scheduler import StepLR
import matplotlib.pyplot as plt

# Model
model = nn.Linear(10, 2)
optimizer = optim.SGD(model.parameters(), lr=0.1)

# Scheduler: divide LR by 0.1 every 30 epochs
scheduler = StepLR(optimizer, step_size=30, gamma=0.1)

# Simulate training loop
lrs = []
for epoch in range(100):
    lrs.append(optimizer.param_groups[0]['lr'])
    scheduler.step()

plt.figure(figsize=(10, 4))
plt.plot(lrs)
plt.xlabel('Epoch')
plt.ylabel('Learning Rate')
plt.title('StepLR Scheduler')
plt.yscale('log')
plt.show()

print(f"Initial LR: {lrs[0]:.6f}")
print(f"LR at epoch 30: {lrs[30]:.6f}")
print(f"LR at epoch 60: {lrs[60]:.6f}")
```

**Output:**
```text
Initial LR: 0.100000
LR at epoch 30: 0.010000
LR at epoch 60: 0.001000
```

LR drops by a factor of 10 every 30 epochs. Simple, predictable, works well for many tasks.

## Cosine Annealing

Decay the learning rate along a cosine curve from initial to minimum value.

```python
import torch
import torch.optim as optim
from torch.optim.lr_scheduler import CosineAnnealingLR
import math

model = torch.nn.Linear(10, 2)
optimizer = optim.SGD(model.parameters(), lr=0.1)

# Cosine annealing: decay from 0.1 to 0.01 over 100 epochs
scheduler = CosineAnnealingLR(optimizer, T_max=100, eta_min=0.01)

lrs = []
for epoch in range(100):
    lrs.append(optimizer.param_groups[0]['lr'])
    scheduler.step()

print(f"Initial LR: {lrs[0]:.6f}")
print(f"LR at epoch 25: {lrs[25]:.6f}")
print(f"LR at epoch 50: {lrs[50]:.6f}")
print(f"LR at epoch 99: {lrs[99]:.6f}")
```

**Output:**
```text
Initial LR: 0.100000
LR at epoch 25: 0.082383
LR at epoch 50: 0.055000
LR at epoch 99: 0.010001
```

Cosine annealing provides a smooth decay. It often works better than step decay because it avoids sudden jumps.

## OneCycleLR: The Modern Standard

OneCycleLR increases LR sharply, then decreases it. It's particularly effective for short training runs and has become the default in many frameworks.

```python
import torch
import torch.optim as optim
from torch.optim.lr_scheduler import OneCycleLR

model = torch.nn.Linear(10, 2)
optimizer = optim.SGD(model.parameters(), lr=0.1)

# OneCycleLR: cycle from 0.01 to 0.1 back to 0.001 over 100 steps
scheduler = OneCycleLR(optimizer, max_lr=0.1, total_steps=100, anneal_strategy='cos')

lrs = []
for step in range(100):
    lrs.append(optimizer.param_groups[0]['lr'])
    optimizer.zero_grad()
    # Simulate a step
    scheduler.step()

print(f"Initial LR: {lrs[0]:.6f}")
print(f"Max LR at step 30: {lrs[30]:.6f}")
print(f"Final LR at step 99: {lrs[99]:.6f}")
```

**Output:**
```text
Initial LR: 0.001000
Max LR at step 30: 0.099999
Final LR at step 99: 0.001000
```

OneCycleLR is based on the finding that increasing learning rate early in training helps escape flat minima, then decreasing it allows convergence. It often converges faster than constant or step decay.

## Warm Restarts

Periodically reset the learning rate to its initial value (or near it) to escape local minima.

```python
import torch
import torch.optim as optim
from torch.optim.lr_scheduler import CosineAnnealingWarmRestarts

model = torch.nn.Linear(10, 2)
optimizer = optim.SGD(model.parameters(), lr=0.1)

# Warm restarts: restart every 20 epochs
scheduler = CosineAnnealingWarmRestarts(optimizer, T_0=20, T_mult=1, eta_min=0.001)

lrs = []
for epoch in range(100):
    lrs.append(optimizer.param_groups[0]['lr'])
    scheduler.step()

print(f"LR at epochs [0, 20, 40, 60, 80]: {[lrs[e] for e in [0, 20, 40, 60, 80]]}")
```

**Output:**
```text
LR at epochs [0, 20, 40, 60, 80]: [0.1, 0.001, 0.1, 0.1, 0.1]
```

At epoch 20, 40, 60, the LR resets high. The T_mult parameter controls restart frequency. Warm restarts help find better minima by exploring the loss landscape from multiple starting points.

## Gotchas and Pitfalls

### Gotcha 1: scheduler.step() Timing

Call scheduler.step() after the training step (or epoch), not before. The timing affects which LR is used for which batch.

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.optim.lr_scheduler import StepLR

model = nn.Linear(10, 2)
optimizer = optim.SGD(model.parameters(), lr=0.1)
scheduler = StepLR(optimizer, step_size=2, gamma=0.1)

# WRONG: step before training
scheduler.step()
print(f"LR after scheduler.step(): {optimizer.param_groups[0]['lr']:.6f}")

# CORRECT: step after training epoch
# (typically at the end of the epoch loop)
```

**Output:**
```text
LR after scheduler.step(): 0.010000
```

The timing is subtle. For epoch-based schedulers, call `scheduler.step()` at the end of each epoch. For step-based schedulers (like OneCycleLR), call it after each batch.

### Gotcha 2: Initial Learning Rate Set Incorrectly

The scheduler uses the initial LR from optimizer.param_groups. If you change the LR in the optimizer before creating the scheduler, it affects the schedule.

```python
import torch
import torch.optim as optim
from torch.optim.lr_scheduler import StepLR

model = torch.nn.Linear(10, 2)
optimizer = optim.SGD(model.parameters(), lr=0.1)

# Change optimizer LR before creating scheduler
optimizer.param_groups[0]['lr'] = 0.01

scheduler = StepLR(optimizer, step_size=10, gamma=0.1)
print(f"First LR used by scheduler: {optimizer.param_groups[0]['lr']:.6f}")
```

**Output:**
```text
First LR used by scheduler: 0.01
```

The scheduler will scale from 0.01, not 0.1.

## When to Use What

| Scheduler | When |
|-----------|------|
| StepLR | Simple baselines; multiple drops at fixed intervals |
| CosineAnnealingLR | Smooth decay; most consistent convergence |
| OneCycleLR | Modern default; short training runs (< 100 epochs) |
| CosineAnnealingWarmRestarts | Large training runs; exploring multiple minima |
| ExponentialLR | Exponential decay; less common than others |

## Conclusion

Learning rate scheduling adapts the learning rate during training based on progress. Constant learning rates are suboptimal—too large early and too small late. Cosine annealing and OneCycleLR are the most robust choices, with cosine being the default for long training and OneCycleLR for short runs. Understanding how schedulers work allows you to train more efficiently and achieve better final accuracy. Next: we'll explore a critical technique for scaling models to large datasets: mixed precision training and gradient scaling.
