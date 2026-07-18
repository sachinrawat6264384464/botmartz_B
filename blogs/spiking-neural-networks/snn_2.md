---
title: "Training Spiking Neural Networks: Surrogate Gradients and Neuromorphic Learning Rules"
excerpt: "SNNs are hard to train: the spike function is non-differentiable. Use surrogate gradients (fake smooth spikes during backprop) to enable standard optimization."
author: Soham Sharma
authorName: Soham Sharma
category: Spiking Neural Networks
tags: ["SNNs", "Training", "Surrogate Gradients", "Backpropagation"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: snn-mastery
series_slug: snn-mastery
series_title: "Spiking Neural Networks: Neuromorphic Computing and Efficiency"
difficulty: advanced
week: null
day: 2
tools:
  - Deep Learning
---

Training SNNs with standard backpropagation fails because spikes are discrete (0/1), making gradients zero everywhere. Surrogate gradients solve this: pretend the spike function is smooth during backprop, but use discrete spikes during forward pass. This trick enables training SNNs like standard neural networks.

## The Surrogate Gradient Method

```python
import torch
import torch.nn as nn

class SurrogateSpike(torch.autograd.Function):
    @staticmethod
    def forward(ctx, x):
        # Forward: discrete spike
        spike = (x > 0).float()
        ctx.save_for_backward(x)
        return spike
    
    @staticmethod
    def backward(ctx, grad_output):
        # Backward: smooth surrogate (sigmoid-like gradient)
        x, = ctx.saved_tensors
        # Surrogate: fast sigmoid (smooth approximation)
        grad = 1.0 / (1.0 + torch.abs(x)) ** 2  # Fast sigmoid surrogate
        return grad_output * grad

class SurrogateLIF(nn.Module):
    def __init__(self, leak=0.99, threshold=1.0):
        super().__init__()
        self.leak = leak
        self.threshold = threshold
        self.V = None
    
    def forward(self, x):
        if self.V is None:
            self.V = torch.zeros_like(x)
        
        # Integrate
        self.V = self.leak * self.V + x
        
        # Spike with surrogate gradient
        spike = SurrogateSpike.apply(self.V - self.threshold)
        
        # Reset
        self.V = self.V * (1 - spike)
        
        return spike
```

## Training Example

```python
import torch.optim as optim

device = torch.device('cuda')
snn = SNNNetwork().to(device)
optimizer = optim.Adam(snn.parameters(), lr=1e-3)
criterion = nn.CrossEntropyLoss()

for epoch in range(100):
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        
        # Convert to spike trains (Poisson encoding)
        spike_train = (torch.rand_like(images).expand(32, 10, -1) < images.unsqueeze(1)).float()
        
        # Forward
        output = snn(spike_train)  # (batch, 10 timesteps, 10 classes)
        
        # Decode: average spike count per class
        pred = output.mean(dim=1)  # (batch, 10)
        loss = criterion(pred, labels)
        
        # Backward (with surrogate gradients)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
        snn.reset()  # Reset membrane potentials
```

## Surrogate Functions

```
Different surrogates have different properties:

1. Fast Sigmoid: 1 / (1 + |x|)^2
   - Fast, smooth, good for STDP-like rules

2. Error Function: erf(x / sqrt(2))
   - Mathematically principled

3. Exponential: exp(-|x|)
   - Sharper, more localized

Choose based on empirical performance on your task.
```

## Conclusion

Surrogate gradients enable training SNNs with standard backpropagation. The forward/backward asymmetry is the key: discrete spikes forward, smooth surrogate backward. This pragmatic solution makes SNNs trainable and competitive with ANNs. Next: Neuromorphic hardware and deployment.
