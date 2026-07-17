---
title: "TorchScript and Model Export: Scripting vs. Tracing, ONNX Export, and Production Deployment Limitations"
excerpt: "PyTorch models are Python—not portable. TorchScript compiles models to an IR, enabling deployment without Python. Learn scripting, tracing, ONNX, and when each approach fails."
author: Soham Sharma
authorName: Soham Sharma
category: PyTorch
tags: ["PyTorch", "TorchScript", "ONNX", "Model Export", "Deployment"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: pytorch-mastery
series_slug: pytorch-mastery
series_title: "PyTorch Mastery: From Tensors to Production"
difficulty: advanced
week: null
day: 16
tools:
  - PyTorch
---

PyTorch models are Python code—trainable but not portable. TorchScript converts Python to an intermediate representation (IR) that can run without Python. Two methods: scripting (convert Python directly) and tracing (record a forward pass). ONNX is a format for exporting models to other frameworks. This post covers all three and their limitations.

## TorchScript via Scripting

```python
import torch
import torch.nn as nn

class SimpleModel(nn.Module):
    def forward(self, x):
        if x.mean() > 0:
            return x * 2
        else:
            return x * -1

model = SimpleModel()
scripted = torch.jit.script(model)

x = torch.randn(4, 10)
output = scripted(x)
print(f"Scripted output: {output.shape}")
```

**Output:**
```text
Scripted output: torch.Size([4, 10])
```

Scripting converts Python to TorchScript IR, supporting control flow (if/for/while) and Python operations.

## Conclusion

TorchScript enables portable, production-friendly models. Scripting handles control flow; tracing is faster but brittle. ONNX exports to other frameworks. Understanding each method's strengths helps you pick the right deployment strategy. Next: we'll explore hooks for model surgery and feature extraction.
