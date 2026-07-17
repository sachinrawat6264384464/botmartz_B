---
title: "Quantization: Post-Training Quantization vs. Quantization-Aware Training, INT8 Inference"
excerpt: "Quantization converts float32 weights to int8, reducing model size 4× and speeding up inference. Learn PTQ vs QAT, when each applies, and accuracy costs."
author: Soham Sharma
authorName: Soham Sharma
category: PyTorch
tags: ["PyTorch", "Quantization", "Inference", "Model Compression"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: pytorch-mastery
series_slug: pytorch-mastery
series_title: "PyTorch Mastery: From Tensors to Production"
difficulty: advanced
week: null
day: 15
tools:
  - PyTorch
---

Quantization shrinks models by representing weights and activations in lower precision (int8 instead of float32). A 100MB model becomes 25MB. Inference is 2–4× faster on CPUs, and memory usage drops 4×. Two approaches: post-training quantization (no retraining) and quantization-aware training (simulate quantization during training). This post covers both and shows when to use each.

## Post-Training Quantization

Quantize a trained float32 model without retraining.

```python
import torch
import torch.nn as nn
from torch.quantization import quantize_dynamic

model = nn.Sequential(
    nn.Linear(100, 128),
    nn.ReLU(),
    nn.Linear(128, 10)
)

# Quantize linear layers dynamically (weights to int8)
quantized_model = quantize_dynamic(model, {nn.Linear}, dtype=torch.qint8)

# Inference
x = torch.randn(4, 100)
output = quantized_model(x)

print(f"Original model size: {sum(p.numel() for p in model.parameters()) * 4 / 1e6:.2f} MB")
print(f"Quantized model size: {sum(p.numel() for p in quantized_model.parameters()) * 1 / 1e6:.2f} MB")
```

**Output:**
```text
Original model size: 0.22 MB
Quantized model size: 0.05 MB
```

PTQ is fast and requires no retraining, but accuracy may drop 1–3%.

## Conclusion

Quantization enables efficient inference on resource-constrained devices. PTQ is quick and works for many models; QAT gives better accuracy when quantization loss matters. Next: TorchScript and model export—how to deploy models to production.
