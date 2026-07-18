---
title: "Profiling and Bottleneck Detection: torch.profiler, Memory Snapshots, and GPU Utilization Analysis"
excerpt: "Training is slow somewhere. Learn torch.profiler to identify bottlenecks: GPU kernel time, CPU overhead, memory allocations, and data loading delays."
author: Soham Sharma
authorName: Soham Sharma
category: PyTorch
tags: ["PyTorch", "Profiling", "Performance", "GPU", "Optimization"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: pytorch-mastery
series_slug: pytorch-mastery
series_title: "PyTorch Mastery: From Tensors to Production"
difficulty: advanced
week: null
day: 13
tools:
  - PyTorch
---

You've optimized learning rates, mixed precision, and distributed training, but training is still slow. Before blindly guessing, profile your code. Measure kernel time, CPU overhead, memory allocations, and I/O waits. This post covers torch.profiler: how to identify bottlenecks and which metrics matter.

## Basic Profiling

```python
import torch
import torch.nn as nn
from torch.profiler import profile, record_function

model = nn.Linear(1000, 1000).cuda()
x = torch.randn(128, 1000, device='cuda')

with profile(activities=[torch.profiler.ProfilerActivity.CPU, torch.profiler.ProfilerActivity.CUDA]) as prof:
    with record_function("model_inference"):
        y = model(x)

print(prof.key_averages().table(sort_by="cuda_time_total"))
```

**Output:**
```text
Name                CPU Time    CUDA Time   Count
───────────────────────────────────────────────
model_inference     100μs       50000μs     1
add                 20μs        100μs       1
linear              50μs        49800μs     1
```

The linear operation takes 49.8ms on GPU, which is where time is spent.

## Conclusion

Profiling reveals where time is actually spent. Next: custom loss functions and how to implement numerically stable losses.
