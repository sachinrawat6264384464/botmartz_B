---
title: "Distributed Training with DDP: Setup, Process Groups, Gradient Synchronization, and Scaling Laws"
excerpt: "Training across multiple GPUs requires careful synchronization. Learn torch.nn.parallel.DistributedDataParallel, process groups, and how to scale training from 1 to N GPUs."
author: Soham Sharma
authorName: Soham Sharma
category: PyTorch
tags: ["PyTorch", "Distributed Training", "DDP", "Scaling"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: pytorch-mastery
series_slug: pytorch-mastery
series_title: "PyTorch Mastery: From Tensors to Production"
difficulty: advanced
week: null
day: 11
tools:
  - PyTorch
---

Distributed Data Parallel (DDP) replicates the model across GPUs and synchronizes gradients. Each GPU processes a shard of the batch, computes gradients, and all-reduces (synchronizes) them before the weight update. Scaling is nearly linear: 2 GPUs → ~2× throughput, 8 GPUs → ~8× throughput. This post covers DDP setup, process groups, gradient synchronization, and common pitfalls.

## Single-Machine, Multi-GPU Setup

DDP runs one process per GPU. Each process holds one replica of the model.

```python
import torch
import torch.nn as nn
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP

def setup_ddp(rank, world_size):
    """Setup process group."""
    dist.init_process_group(
        backend='nccl',  # NVIDIA Collective Communications Library
        rank=rank,
        world_size=world_size,
        init_method='tcp://localhost:29500'
    )
    torch.cuda.set_device(rank)

def train_ddp(rank, world_size):
    setup_ddp(rank, world_size)
    
    # Model on GPU
    model = nn.Linear(100, 10).cuda(rank)
    model = DDP(model, device_ids=[rank])
    
    optimizer = torch.optim.SGD(model.parameters(), lr=0.01)
    
    # DistributedSampler ensures no overlap between processes
    dataset = range(1000)
    sampler = torch.utils.data.DistributedSampler(
        dataset, num_replicas=world_size, rank=rank, shuffle=True
    )
    loader = torch.utils.data.DataLoader(dataset, sampler=sampler, batch_size=64)
    
    model.train()
    for epoch in range(2):
        for batch in loader:
            x = torch.randn(len(batch), 100, device=rank)
            y = torch.randint(0, 10, (len(batch),), device=rank)
            
            optimizer.zero_grad()
            output = model(x)
            loss = nn.functional.cross_entropy(output, y)
            loss.backward()
            
            # DDP automatically synchronizes gradients during backward
            optimizer.step()
    
    dist.destroy_process_group()

# Launch with: torch.distributed.launch --nproc_per_node=2 script.py
```

Each process calls train_ddp with its rank (0, 1, ... , world_size-1). The DistributedSampler partitions data so each GPU gets a different shard. DDP's backward hook synchronizes gradients across all GPUs before the optimizer step.

## Process Groups and All-Reduce

DDP uses all-reduce to synchronize gradients. All-reduce computes the sum (or other operation) across all processes and broadcasts back.

```python
import torch
import torch.distributed as dist

# Assume distributed.init_process_group was called

# Create a tensor on each GPU
rank = dist.get_rank()
tensor = torch.tensor([rank * 10], dtype=torch.float32, device='cuda')

print(f"Rank {rank}, before all-reduce: {tensor.item()}")

# All-reduce: sum across all ranks
dist.all_reduce(tensor, op=dist.ReduceOp.SUM)

print(f"Rank {rank}, after all-reduce: {tensor.item()}")
```

**Output (rank 0):**
```text
Rank 0, before all-reduce: 0.0
Rank 0, after all-reduce: 30.0
```

**Output (rank 1):**
```text
Rank 1, before all-reduce: 10.0
Rank 1, after all-reduce: 30.0
```

**Output (rank 2):**
```text
Rank 2, before all-reduce: 20.0
Rank 2, after all-reduce: 30.0
```

After all-reduce, all ranks have the sum (0 + 10 + 20 = 30). DDP uses this to synchronize gradients: after all processes compute gradients on their batch, all-reduce sums them, then each process divides by world_size to get the mean gradient.

## Scaling and Batch Size

With DDP, global batch size = batch_size_per_gpu × world_size. If you have 8 GPUs and batch_size_per_gpu=64, global batch_size=512. Larger batches require larger learning rates.

```python
import torch

# Scaling rule: learning_rate ∝ batch_size
base_lr = 0.01
base_batch_size = 32

world_size = 8
batch_size_per_gpu = 32
global_batch_size = batch_size_per_gpu * world_size

# Linear scaling rule
scaled_lr = base_lr * (global_batch_size / base_batch_size)

print(f"Base LR: {base_lr} (batch_size={base_batch_size})")
print(f"Scaled LR: {scaled_lr:.4f} (global_batch_size={global_batch_size})")
```

**Output:**
```text
Base LR: 0.01 (batch_size=32)
Scaled LR: 0.08 (global_batch_size=256)
```

With 8 GPUs and batch_size_per_gpu=32, the global batch size is 256. The learning rate should increase proportionally (8× in this case).

## Gotchas and Pitfalls

### Gotcha 1: Forgetting to Use DistributedSampler

Without DistributedSampler, all GPUs process the same data, doubling training time and breaking results.

```python
import torch
from torch.utils.data import DataLoader, DistributedSampler

dataset = range(1000)

# WRONG: no DistributedSampler
loader_wrong = DataLoader(dataset, batch_size=64, shuffle=True)

# CORRECT: with DistributedSampler
sampler = DistributedSampler(dataset, shuffle=True)
loader_correct = DataLoader(dataset, batch_size=64, sampler=sampler)

print("DistributedSampler ensures each GPU gets unique data")
```

**Fix:** Always use DistributedSampler in DDP training.

## Conclusion

DDP scales training across multiple GPUs by replicating the model and synchronizing gradients. Each GPU processes a shard of the batch, and all-reduce computes the mean gradient. Linear scaling laws apply: 8× GPUs ≈ 8× speedup (with appropriately scaled learning rate and batch size). Understanding DDP is essential for training large models efficiently. Next: we'll explore how to profile and bottleneck-detect to understand where your training time actually goes.
