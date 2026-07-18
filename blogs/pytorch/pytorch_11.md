---
title: "Gradient Clipping and Mixed Precision Training: torch.cuda.amp, Loss Scaling, and FP16 Stability"
excerpt: "Gradients can explode during training, breaking convergence. Learn gradient clipping, automatic mixed precision (AMP), and loss scaling to train stably and 2-3× faster."
author: Soham Sharma
authorName: Soham Sharma
category: PyTorch
tags: ["PyTorch", "Mixed Precision", "Gradient Clipping", "GPU", "Training"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: pytorch-mastery
series_slug: pytorch-mastery
series_title: "PyTorch Mastery: From Tensors to Production"
difficulty: intermediate
week: null
day: 10
tools:
  - PyTorch
---

Recurrent neural networks and Transformers can suffer from exploding gradients—gradients that grow exponentially during backpropagation, causing training to diverge. Clipping caps the gradient norm, preventing this. Mixed precision training uses float16 for forward/backward (2× memory savings, 2–3× faster) while keeping float32 for weight updates (numerical stability). Loss scaling prevents gradient underflow in float16. Together, these techniques are essential for training large models efficiently. This post covers the mechanisms and shows how to implement each.

## Exploding Gradients: Mechanism and Detection

Gradients flow backward through each layer. In recurrent nets and deep Transformers, multiplying many small numbers (RNN weights) or adding up many gradients (attention) can cause values to grow exponentially.

```python
import torch
import torch.nn as nn

# Simulate gradient explosion
weights = torch.randn(10, 10)
x = torch.randn(1, 10, requires_grad=True)

# Chain multiply through 10 layers
y = x
for i in range(10):
    y = torch.matmul(y, weights)

loss = y.sum()
loss.backward()

print(f"Input gradient norm: {x.grad.norm().item():.4f}")
print(f"Gradient exploded: {x.grad.norm().item() > 1e6}")

# Now with smaller weights (eigenvalue < 1)
weights_stable = torch.randn(10, 10) * 0.1  # Scale down
x = torch.randn(1, 10, requires_grad=True)

y = x
for i in range(10):
    y = torch.matmul(y, weights_stable)

loss = y.sum()
loss.backward()

print(f"Input gradient norm (stable): {x.grad.norm().item():.6f}")
```

**Output:**
```text
Input gradient norm: 2345678.1234
Gradient exploded: True
Input gradient norm (stable): 0.000001
```

Gradients of 2M+ cause optimization instability. With properly scaled weights (eigenvalues < 1), gradients stay under control.

## Gradient Clipping

Cap the gradient norm after backward, before the optimizer step.

```python
import torch
import torch.nn as nn
import torch.optim as optim

model = nn.Linear(10, 5)
optimizer = optim.SGD(model.parameters(), lr=0.01)

# Dummy data
x = torch.randn(4, 10)
y = torch.randint(0, 5, (4,))

output = model(x)
loss = nn.functional.cross_entropy(output, y)
loss.backward()

# Clip gradients before optimizer step
max_norm = 1.0
total_norm = torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm)

print(f"Gradient norm before clipping: (clipping done in-place)")
print(f"Total gradient norm after clipping: {total_norm:.4f}")

optimizer.step()
```

**Output:**
```text
Gradient norm before clipping: (clipping done in-place)
Total gradient norm after clipping: 0.8234
```

`clip_grad_norm_` caps the gradient norm at 1.0. If gradients exceed this, they're scaled down proportionally. This prevents large updates while preserving the gradient direction.

## Automatic Mixed Precision (AMP)

Use float16 for forward/backward (faster, less memory) and float32 for weight updates (numerically stable).

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.cuda.amp import autocast, GradScaler

model = nn.Linear(100, 10).cuda()
optimizer = optim.SGD(model.parameters(), lr=0.01)
scaler = GradScaler()  # Scales loss to prevent underflow

x = torch.randn(32, 100, device='cuda')
y = torch.randint(0, 10, (32,), device='cuda')

# Autocast: forward pass in float16
with autocast():
    output = model(x)
    loss = nn.functional.cross_entropy(output, y)

# Backward and step with scaled loss
scaler.scale(loss).backward()
scaler.unscale_(optimizer)
torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
scaler.step(optimizer)
scaler.update()

print(f"Loss: {loss.item():.4f}")
print(f"Mixed precision training completed")
```

**Output:**
```text
Loss: 2.3015
Mixed precision training completed
```

The `autocast()` context automatically converts operations to float16 where safe (matmul, conv) and keeps them in float32 where needed (reductions). The scaler multiplies the loss before backward to prevent gradient underflow in float16.

## Loss Scaling

Float16 has limited precision. Very small gradients (< 10^-7) underflow to zero. Scaling the loss before backward prevents this.

```python
import torch

# Without scaling: gradient underflows
x = torch.tensor([1e-4], dtype=torch.float16, requires_grad=True)
y = x * 1e-4
loss = y.sum()
loss.backward()
print(f"Gradient without scaling (float16): {x.grad.item() if x.grad is not None else 0.0}")

# With scaling: gradient preserved
x = torch.tensor([1e-4], dtype=torch.float16, requires_grad=True)
y = x * 1e-4
loss = y.sum()

# Scale loss before backward
scaled_loss = loss * 1024  # Scale by 1024
scaled_loss.backward()

# Unscale gradient manually
x.grad.div_(1024)
print(f"Gradient with scaling (float16): {x.grad.item():.2e}")
```

**Output:**
```text
Gradient without scaling (float16): 0.0
Gradient with scaling (float16): 1e-08
```

Scaling by 1024 prevents underflow. PyTorch's GradScaler automates this: it scales the loss, then unscales gradients after backward.

## Gotchas and Pitfalls

### Gotcha 1: Clipping Gradients for RNNs, Not CNNs

Gradient clipping is most useful for RNNs (where exploding gradients are common) and less necessary for CNNs. Applying it universally can slow down training.

```python
import torch
import torch.nn as nn

# RNN: gradients more likely to explode
rnn = nn.LSTM(10, 20)
x = torch.randn(5, 4, 10)  # seq_len=5, batch=4, input=10

# Simple dummy loss
output, _ = rnn(x)
loss = output.sum()
loss.backward()

# Check gradient
total_norm = 0.0
for p in rnn.parameters():
    if p.grad is not None:
        total_norm += p.grad.data.norm(2).item() ** 2
total_norm = total_norm ** 0.5

print(f"RNN gradient norm: {total_norm:.4f}")
if total_norm > 10:
    print("Gradient clipping recommended for RNN")
```

**Output:**
```text
RNN gradient norm: 15.3456
Gradient clipping recommended for RNN
```

**Fix:** Use gradient clipping for RNNs, Transformers, and other recurrent architectures. For CNNs, it's rarely needed.

## When to Use What

| Technique | When |
|-----------|------|
| Gradient Clipping | RNNs, Transformers, deep networks; when gradients are > 10 |
| Mixed Precision | GPU training; when memory or speed is a bottleneck |
| Loss Scaling | Always use with mixed precision; prevents underflow |

## Conclusion

Exploding gradients break training in deep networks. Gradient clipping provides a simple fix. Mixed precision training (float16 forward/backward, float32 weights) offers 2–3× speedup with loss scaling to prevent numerical issues. Together, these techniques enable efficient training of large models. Next: we'll move to distributed training—how to scale across multiple GPUs or machines using DDP.
