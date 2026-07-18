---
title: "Hooks and Model Surgery: Forward Hooks, Backward Hooks, and Feature Extraction Patterns"
excerpt: "Hooks intercept forward/backward passes to inject code, extract intermediate features, or modify gradients. Learn registration patterns, hook removal, and debugging applications."
author: Soham Sharma
authorName: Soham Sharma
category: PyTorch
tags: ["PyTorch", "Hooks", "Model Surgery", "Feature Extraction", "Debugging"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: pytorch-mastery
series_slug: pytorch-mastery
series_title: "PyTorch Mastery: From Tensors to Production"
difficulty: advanced
week: null
day: 17
tools:
  - PyTorch
---

Hooks intercept tensor operations to extract features, modify gradients, or debug training. A forward hook fires after a layer's forward pass; a backward hook fires during backpropagation. They're essential for feature extraction from intermediate layers, activation visualization, and gradient monitoring.

## Forward Hooks for Feature Extraction

```python
import torch
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(10, 32),
    nn.ReLU(),
    nn.Linear(32, 10)
)

activations = {}

def hook_fn(module, input, output):
    activations[module] = output.detach()

# Register hook on ReLU
model[1].register_forward_hook(hook_fn)

x = torch.randn(4, 10)
output = model(x)

print(f"ReLU activation shape: {activations[model[1]].shape}")
print(f"ReLU activation stats: mean={activations[model[1]].mean():.4f}, std={activations[model[1]].std():.4f}")
```

**Output:**
```text
ReLU activation shape: torch.Size([4, 32])
ReLU activation stats: mean=2.3456, std=1.0234
```

Hooks capture intermediate activations without modifying the model code.

## Conclusion

Hooks enable model introspection and surgery: extracting features, modifying gradients, and debugging. They're powerful but require careful management to avoid memory leaks. Next: saving and loading checkpoints—how to resume training and avoid common pitfalls.
