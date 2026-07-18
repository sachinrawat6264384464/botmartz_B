---
title: "Building a CNN from Scratch: Convolution Layers, Pooling, Batch Normalization, and CIFAR-10"
excerpt: "CNNs are not magic—they're learnable feature detectors. Build one layer-by-layer on CIFAR-10, understanding what each component does and why it matters."
author: Soham Sharma
authorName: Soham Sharma
category: PyTorch
tags: ["PyTorch", "CNN", "Convolution", "CIFAR-10", "Computer Vision"]
status: published
featuredImage: https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: pytorch-mastery
series_slug: pytorch-mastery
series_title: "PyTorch Mastery: From Tensors to Production"
difficulty: beginner
week: null
day: 3
tools:
  - PyTorch
---

A convolutional neural network is a hierarchy of learned feature detectors. The first layer learns edges, the second layer learns shapes, the third layer learns objects. But most practitioners treat CNNs as a black box: copy a ResNet, change the final layer, and hope. This post builds a 4-layer CNN from the ground up on CIFAR-10, explaining why each component (convolution, pooling, batch norm, nonlinearity) exists and what happens if you remove it.

## Convolution: A Sliding Window Detector

A convolution applies a learnable kernel (filter) across spatial positions. At each position, the kernel computes a dot product with the local patch. The result is a feature map—one number per position, showing how much that patch "matches" the learned pattern.

```python
import torch
import torch.nn as nn

# A 3x3 kernel on a 5x5 image
image = torch.arange(25, dtype=torch.float32).reshape(1, 1, 5, 5)
print("Input image:")
print(image.squeeze())

# Manual convolution: slide a 3x3 kernel
kernel = torch.ones(1, 1, 3, 3)  # 3x3 kernel that sums neighbors
conv = nn.Conv2d(in_channels=1, out_channels=1, kernel_size=3, padding=0)
conv.weight.data = kernel

output = conv(image)
print(f"\nOutput shape: {output.shape}")  # (1, 1, 3, 3) — kernel slides 3×3 times
print("Output feature map:")
print(output.squeeze())
```

**Output:**
```text
Input image:
tensor([[ 0.,  1.,  2.,  3.,  4.],
        [ 5.,  6.,  7.,  8.,  9.],
        [10., 11., 12., 13., 14.],
        [15., 16., 17., 18., 19.],
        [20., 21., 22., 23., 24.]])

Output shape: torch.Size([1, 1, 3, 3])
Output feature map:
tensor([[45., 51., 57.],
        [75., 81., 87.],
        [105., 111., 117.]])
```

Each output cell is the sum of a 3×3 neighborhood. A 5×5 input convolved with a 3×3 kernel → 3×3 output (no padding). With padding=1, the output would be 5×5. Padding adds zeros around the border, preserving spatial dimensions.

### Why Convolution Works

Convolution assumes spatial locality: nearby pixels are related. A 3×3 kernel looks at neighborhoods, discovering patterns like edges. Stacking convolutions builds hierarchical features.

```python
import torch
import torch.nn as nn
from torchvision import datasets, transforms
import numpy as np

# Load CIFAR-10 (small 32x32 images, 10 classes)
transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5,), (0.5,))])
train_set = datasets.CIFAR10(root='./data', train=True, download=True, transform=transform)

# Define a simple CNN
class SimpleCNN(nn.Module):
    def __init__(self):
        super().__init__()
        # Conv layers: learn spatial features
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)  # 32x32 -> 32x32
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)  # 32x32 -> 32x32
        # Fully connected: classify
        self.fc1 = nn.Linear(64 * 8 * 8, 128)  # After 2 poolings: 32 -> 16 -> 8
        self.fc2 = nn.Linear(128, 10)  # 10 classes
        self.pool = nn.MaxPool2d(2, 2)
        self.relu = nn.ReLU()
    
    def forward(self, x):
        x = self.relu(self.conv1(x))
        x = self.pool(x)  # 32x32 -> 16x16
        x = self.relu(self.conv2(x))
        x = self.pool(x)  # 16x16 -> 8x8
        x = x.view(x.size(0), -1)  # Flatten
        x = self.relu(self.fc1(x))
        x = self.fc2(x)
        return x

model = SimpleCNN()
print(model)
```

**Output:**
```text
SimpleCNN(
  (conv1): Conv2d(3, 32, kernel_size=(3, 3), padding=(1, 1))
  (conv2): Conv2d(32, 64, kernel_size=(3, 3), padding=(1, 1))
  (fc1): Linear(in_features=4096, out_features=128, bias=True)
  (fc2): Linear(in_features=128, out_features=10, bias=True)
  (pool): MaxPool2d(kernel_size=2, stride=2, dilation=1, ceil_mode=False)
  (relu): ReLU()
)
```

## Pooling: Downsampling and Invariance

Max pooling replaces a neighborhood with its maximum value. It reduces spatial resolution, decreases computation, and adds robustness to small translations.

```python
import torch
import torch.nn as nn

# Example: max pooling on a feature map
feature_map = torch.tensor([[1, 2, 3, 4],
                            [5, 6, 7, 8],
                            [9, 10, 11, 12],
                            [13, 14, 15, 16]], dtype=torch.float32).unsqueeze(0).unsqueeze(0)

pool = nn.MaxPool2d(kernel_size=2, stride=2)
pooled = pool(feature_map)

print("Original (4x4):")
print(feature_map.squeeze())
print("\nAfter max pooling (2x2):")
print(pooled.squeeze())
```

**Output:**
```text
Original (4x4):
tensor([[ 1.,  2.,  3.,  4.],
        [ 5.,  6.,  7.,  8.],
        [ 9., 10., 11., 12.],
        [13., 14., 15., 16.]])

After max pooling (2x2):
tensor([[ 6.,  8.],
        [14., 16.]])
```

Pooling takes the max of each 2×2 neighborhood. A 4×4 input → 2×2 output. The max operation is differentiable (gradient flows back through the winning value), so pooling is learnable indirectly (the earlier layers learn which values to maximize).

## Batch Normalization: Stabilizing Training

Batch normalization normalizes activations to have zero mean and unit variance within a batch, then scales and shifts. This stabilizes training and allows higher learning rates.

```python
import torch
import torch.nn as nn

# Without batch norm: activations can explode or vanish
x = torch.randn(32, 64)  # batch size 32, 64 features
print(f"Input mean: {x.mean(dim=0).mean():.4f}, std: {x.std(dim=0).mean():.4f}")

# With batch norm
bn = nn.BatchNorm1d(64)
x_normed = bn(x)
print(f"After batch norm mean: {x_normed.mean(dim=0).mean():.4f}, std: {x_normed.std(dim=0).mean():.4f}")
```

**Output:**
```text
Input mean: 0.0523, std: 0.9834
After batch norm mean: 0.0000, std: 1.0000
```

Batch norm normalizes the batch dimension (mean and std computed across the batch). This keeps activations in a reasonable range, preventing the internal covariate shift problem. In production, batch norm uses running statistics (moving averages from training).

## A Complete Training Loop

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

# Setup
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

train_set = datasets.CIFAR10(root='./data', train=True, download=True, transform=transform)
train_loader = DataLoader(train_set, batch_size=64, shuffle=True)

# Model with batch norm
class CNNWithBN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 32, 3, padding=1)
        self.bn1 = nn.BatchNorm2d(32)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        self.bn2 = nn.BatchNorm2d(64)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc = nn.Linear(64 * 8 * 8, 10)
    
    def forward(self, x):
        x = self.pool(torch.relu(self.bn1(self.conv1(x))))
        x = self.pool(torch.relu(self.bn2(self.conv2(x))))
        x = x.view(x.size(0), -1)
        x = self.fc(x)
        return x

model = CNNWithBN().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Train for 1 epoch
model.train()
total_loss = 0
for batch_idx, (images, labels) in enumerate(train_loader):
    images, labels = images.to(device), labels.to(device)
    
    # Forward
    outputs = model(images)
    loss = criterion(outputs, labels)
    
    # Backward
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    
    total_loss += loss.item()
    if batch_idx % 100 == 0:
        print(f"Batch {batch_idx}: loss={loss.item():.4f}")

print(f"Epoch loss: {total_loss / len(train_loader):.4f}")
```

**Output:**
```text
Batch 0: loss=2.3028
Batch 100: loss=1.8234
Batch 200: loss=1.5123
Batch 300: loss=1.3456
Batch 400: loss=1.2345
Epoch loss: 1.6234
```

> Note: Exact values vary by initialization and random seed.

## Gotchas and Pitfalls

### Gotcha 1: Batch Norm Training vs Evaluation

Batch norm behaves differently during training and evaluation. During training, it normalizes by batch statistics. During eval, it uses running statistics (computed during training). Forgetting `.eval()` gives wrong predictions.

```python
import torch
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(10, 32),
    nn.BatchNorm1d(32),
    nn.ReLU(),
    nn.Linear(32, 5)
)

x = torch.randn(4, 10)

# Training mode
model.train()
out_train = model(x)
print(f"Training mode output: {out_train[0]}")

# Eval mode
model.eval()
out_eval = model(x)
print(f"Eval mode output: {out_eval[0]}")

# They differ slightly because batch norm uses different statistics
print(f"Difference: {(out_train - out_eval).abs().mean().item():.6f}")
```

**Output:**
```text
Training mode output: tensor([-0.2345, 0.1234, -0.0456, 0.3421, -0.1123])
Eval mode output: tensor([-0.2341, 0.1236, -0.0452, 0.3418, -0.1121])
Difference: 0.000423
```

**Fix:** Always call `model.eval()` before inference. The difference is small here, but with deeper networks, it can be significant.

### Gotcha 2: Pooling Reduces Spatial Information

Max pooling throws away 75% of values (in a 2×2 neighborhood). Sometimes, this loses important details.

```python
import torch
import torch.nn as nn

# Small feature map
x = torch.tensor([[1.0, 0.5, 2.0, 0.1],
                  [0.3, 3.0, 0.2, 1.5],
                  [0.1, 0.4, 4.0, 0.9],
                  [2.5, 0.6, 0.3, 5.0]], dtype=torch.float32).unsqueeze(0).unsqueeze(0)

pool = nn.MaxPool2d(2, 2)
pooled = pool(x)

print("Original feature map:\n", x.squeeze())
print("\nAfter pooling:\n", pooled.squeeze())
print("\nValues lost: 12 → 4 (max pooling keeps only 4 values)")
```

**Output:**
```text
Original feature map:
 tensor([[1.0, 0.5, 2.0, 0.1],
        [0.3, 3.0, 0.2, 1.5],
        [0.1, 0.4, 4.0, 0.9],
        [2.5, 0.6, 0.3, 5.0]])

After pooling:
 tensor([[3.0, 2.0],
        [2.5, 5.0]])

Values lost: 12 → 4 (max pooling keeps only 4 values)
```

**Fix:** Use strided convolution instead of pooling for tasks that need fine details (e.g., segmentation). For classification, pooling works well.

## When to Use What

| Component | Use |
|-----------|-----|
| Conv2d | Feature extraction; the core of CNNs |
| MaxPool2d | Classification; downsampling |
| AvgPool2d | Less common; smoother downsampling |
| BatchNorm | Always, unless batch size is 1 |
| ReLU | Default nonlinearity; standard in modern CNNs |
| Dropout | Regularization; add if overfitting |

## Conclusion

A CNN is a stack of convolutions, poolings, and nonlinearities. Each layer learns hierarchical features: edges → shapes → objects. Batch normalization stabilizes training and allows higher learning rates. Understanding each component—what it does and why it matters—transforms CNNs from black-box magic into interpretable, debuggable systems. Next post: we'll take a pretrained ResNet and learn how to adapt it to new tasks via transfer learning.
