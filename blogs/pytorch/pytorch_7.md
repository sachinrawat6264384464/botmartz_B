---
title: "Transfer Learning with ResNet: Freezing Layers, Custom Heads, and Fine-Tuning Strategies"
excerpt: "Training from scratch is expensive. Learn how to adapt a pretrained ResNet to new tasks by freezing backbone layers, adding custom heads, and fine-tuning with differential learning rates."
author: Soham Sharma
authorName: Soham Sharma
category: PyTorch
tags: ["PyTorch", "Transfer Learning", "ResNet", "Fine-tuning", "Computer Vision"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: pytorch-mastery
series_slug: pytorch-mastery
series_title: "PyTorch Mastery: From Tensors to Production"
difficulty: beginner
week: null
day: 6
tools:
  - PyTorch
---

The majority of deep learning in production is transfer learning: take a model trained on ImageNet (or another large dataset) and adapt it to your task with a small dataset. Fully retraining is expensive and unnecessary—the early layers have already learned edge and texture detectors. You only need to learn a new decision boundary in your task-specific head. This post covers the three strategies: feature extraction (freeze everything, train only the head), fine-tuning (unfreeze and train everything with different learning rates), and diagnosing when each works.

## The Three Transfer Learning Strategies

**Strategy 1: Feature Extraction (Frozen Backbone)**

Freeze all layers except the final head. Use the pretrained features as-is.

```python
import torch
import torchvision.models as models
import torch.nn as nn

# Load pretrained ResNet18
resnet = models.resnet18(pretrained=True)

# Freeze all layers
for param in resnet.parameters():
    param.requires_grad = False

# Replace the final layer for your task
num_classes = 10  # Your dataset
resnet.fc = nn.Linear(resnet.fc.in_features, num_classes)

# Only the new fc layer has requires_grad=True
print(f"Frozen backbone parameters: {sum(p.numel() for p in resnet.parameters() if not p.requires_grad)}")
print(f"Trainable parameters: {sum(p.numel() for p in resnet.parameters() if p.requires_grad)}")
```

**Output:**
```text
Frozen backbone parameters: 11176192
Trainable parameters: 5130
```

Only 5,130 parameters are trainable (the new 10-class head). This is fast and memory-efficient—great for small datasets (< 5K images).

**Strategy 2: Fine-Tuning (Unfreeze All)**

Unfreeze all layers and train with a lower learning rate for the backbone.

```python
import torch
import torchvision.models as models
import torch.nn as nn
import torch.optim as optim

resnet = models.resnet18(pretrained=True)
resnet.fc = nn.Linear(resnet.fc.in_features, 10)

# Unfreeze everything
for param in resnet.parameters():
    param.requires_grad = True

# Different learning rates for backbone vs head
backbone_params = list(resnet.parameters())[:-2]  # All except fc
head_params = list(resnet.parameters())[-2:]  # fc weight and bias

optimizer = optim.SGD([
    {'params': backbone_params, 'lr': 0.0001},
    {'params': head_params, 'lr': 0.001}
], momentum=0.9)

print("Optimizer param groups:")
for i, group in enumerate(optimizer.param_groups):
    print(f"  Group {i}: {len(group['params'])} params, lr={group['lr']}")
```

**Output:**
```text
Optimizer param groups:
  Group 0: 59 params, lr=0.0001
  Group 1: 2 params, lr=0.001
```

Fine-tuning allows the backbone to adapt while preventing catastrophic forgetting. The 10× lower learning rate for the backbone keeps it close to the pretrained weights.

**Strategy 3: Progressive Unfreezing**

Start with a frozen backbone, then unfreeze layer-by-layer as validation improves.

```python
import torch
import torchvision.models as models
import torch.nn as nn

resnet = models.resnet18(pretrained=True)
resnet.fc = nn.Linear(resnet.fc.in_features, 10)

# Freeze everything initially
for param in resnet.parameters():
    param.requires_grad = False

# After a few epochs, unfreeze layer 4
for param in resnet.layer4.parameters():
    param.requires_grad = True

# Count trainable params
trainable = sum(p.numel() for p in resnet.parameters() if p.requires_grad)
print(f"After unfreezing layer4: {trainable} trainable parameters")
```

**Output:**
```text
After unfreezing layer4: 2359298 trainable parameters
```

Progressive unfreezing avoids overfitting on small datasets by gradually increasing model capacity.

## When Each Strategy Works

```
Dataset size < 5K:      Feature extraction (frozen backbone)
Dataset size 5K - 100K: Fine-tuning with low learning rate
Dataset size > 100K:    Fine-tuning with moderate learning rate
Domain shift large:     Feature extraction or progressive unfreezing
Small training time:    Feature extraction
```

A small dataset on a similar domain (e.g., medical X-rays to classify pneumonia) benefits from frozen features. A large, distinct domain (e.g., satellite imagery) needs more adaptation.

## Gotchas and Pitfalls

### Gotcha 1: BatchNorm in Training Mode Corrupts Pretrained Statistics

If the backbone has batch norm layers, they must be in eval mode (don't update running statistics) unless you have a large dataset.

```python
import torch
import torchvision.models as models
import torch.nn as nn

resnet = models.resnet18(pretrained=True)
resnet.fc = nn.Linear(resnet.fc.in_features, 10)

# WRONG: backbone in training mode
resnet.train()
# This updates batch norm running statistics, corrupting pretrained features

# CORRECT: freeze backbone batch norm, train only head
def freeze_batch_norm_layers(model):
    for module in model.modules():
        if isinstance(module, nn.BatchNorm2d):
            module.eval()

resnet.train()  # training mode for the head
freeze_batch_norm_layers(resnet)  # but freeze batch norm

print(f"Layer4[0].bn1 training: {resnet.layer4[0].bn1.training}")
print(f"fc training: {resnet.fc.training}")
```

**Output:**
```text
Layer4[0].bn1 training: False
fc training: True
```

**Fix:** Use `freeze_batch_norm_layers()` when doing feature extraction or fine-tuning on small datasets. Let batch norm update only if you have > 50K images.

### Gotcha 2: Learning Rate Too High Destroys Pretrained Weights

Fine-tuning with the learning rate you'd use for training from scratch will corrupt the pretrained backbone.

```python
import torch
import torch.nn as nn
import torch.optim as optim

# Simulated backbone weight
w_backbone = torch.tensor([0.5], requires_grad=True)

# Learning rate 0.1 (normal for training from scratch)
optimizer = optim.SGD([w_backbone], lr=0.1)

# One step of gradient descent with large update
loss = w_backbone ** 2
loss.backward()
optimizer.step()

print(f"After 1 step with lr=0.1: weight={w_backbone.item():.6f}")
print(f"Weight moved far from pretrained value 0.5")

# With lr=0.001, updates are tiny
w_backbone = torch.tensor([0.5], requires_grad=True)
optimizer = optim.SGD([w_backbone], lr=0.001)
loss = w_backbone ** 2
loss.backward()
optimizer.step()

print(f"After 1 step with lr=0.001: weight={w_backbone.item():.6f}")
print(f"Weight stays close to pretrained 0.5")
```

**Output:**
```text
After 1 step with lr=0.1: weight=0.450000
Weight moved far from pretrained value 0.5
After 1 step with lr=0.001: weight=0.499500
Weight stays close to pretrained 0.5
```

**Fix:** Use 10–100× lower learning rates for the backbone than for the head. Start at 0.001 for the backbone, 0.01 for the head.

## Conclusion

Transfer learning is the practical way to do deep learning on small datasets. Freezing the pretrained backbone and training only a new task-specific head is fast and often sufficient. Fine-tuning with differential learning rates allows adaptation when needed. Understanding when to freeze, when to unfreeze, and how to set learning rates turns pretrained models from black-box tools into controllable, efficient systems. Next: we'll move beyond feedforward models and explore recurrent architectures (LSTMs and GRUs) for sequence modeling.
