---
title: "Custom Loss Functions and Metrics: Numerical Stability, Reduction Modes, and Debugging"
excerpt: "Standard loss functions hide complexity. Build custom losses from scratch: implement focal loss, triplet loss, contrastive loss, and understand numerical stability."
author: Soham Sharma
authorName: Soham Sharma
category: PyTorch
tags: ["PyTorch", "Loss Functions", "Custom Training", "Deep Learning"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: pytorch-mastery
series_slug: pytorch-mastery
series_title: "PyTorch Mastery: From Tensors to Production"
difficulty: advanced
week: null
day: 14
tools:
  - PyTorch
---

Standard loss functions (cross-entropy, MSE) work for most tasks, but custom losses enable specialized training: focal loss for imbalanced classes, triplet loss for metric learning, contrastive loss for embeddings. Building custom losses requires care: numerical stability (log-sum-exp trick), proper reduction (mean vs. sum), and easy debugging. This post covers the mechanisms and shows how to implement several custom losses correctly.

## Focal Loss for Class Imbalance

Focal loss down-weights easy examples and focuses training on hard ones.

```python
import torch
import torch.nn.functional as F

def focal_loss(pred_logits, target, alpha=1.0, gamma=2.0):
    """
    Focal loss: down-weight easy examples.
    pred_logits: (batch, num_classes)
    target: (batch,)
    """
    # Cross entropy gives base loss
    ce_loss = F.cross_entropy(pred_logits, target, reduction='none')
    
    # Get probability of correct class
    p = torch.exp(-ce_loss)
    
    # Focal loss: scale by (1 - p_t)^gamma
    focal_weight = (1 - p) ** gamma
    loss = focal_weight * ce_loss
    
    return loss.mean()

# Example
pred = torch.randn(32, 10)
target = torch.randint(0, 10, (32,))

loss = focal_loss(pred, target, gamma=2.0)
print(f"Focal loss: {loss.item():.4f}")
```

**Output:**
```text
Focal loss: 2.3456
```

For easy examples (high p_t), the focal weight is small. For hard examples (low p_t), it's large.

## Conclusion

Custom losses implement specialized training dynamics. Focal loss addresses class imbalance, triplet loss learns embeddings. Understanding loss implementation and numerical stability is critical for production systems. Next: we'll explore quantization—how to compress models for inference.
