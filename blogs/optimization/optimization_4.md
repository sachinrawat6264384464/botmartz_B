---
title: "Weight Initialization Strategies: Xavier, He Initialization, and Training from Scratch"
excerpt: "Bad weight initialization breaks training: dead neurons, gradient vanishing. Use Xavier init for tanh, He init for ReLU. Understand why initialization matters."
author: Soham Sharma
authorName: Soham Sharma
category: Optimization
tags: ["Weight Initialization", "Training", "Neural Networks", "Deep Learning"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: optimization-mastery
series_slug: optimization-mastery
series_title: "Training Deep Networks: Optimization, Regularization, and Best Practices"
difficulty: beginner
week: null
day: 4
tools:
  - PyTorch
---

Weight initialization determines whether training converges. Random uniform weights can lead to dead neurons (stuck at zero activation) or gradient vanishing (gradients too small). Xavier and He initialization set weight variance based on layer size and activation function.

## Bad Initialization

```python
# Too large: Exploding gradients
weights = torch.randn(100, 100) * 10  # Variance too high

# Too small: Vanishing gradients
weights = torch.randn(100, 100) * 0.01  # Variance too low
```

## Xavier Initialization

For tanh activations:

```python
# Variance = 2 / (fan_in + fan_out)
fan_in = 100
fan_out = 64
weights = torch.randn(fan_in, fan_out) * math.sqrt(2 / (fan_in + fan_out))
```

## He Initialization

For ReLU activations:

```python
# Variance = 2 / fan_in (ReLU kills negative half)
fan_in = 100
weights = torch.randn(fan_in, 64) * math.sqrt(2 / fan_in)

# PyTorch implements this
nn.Linear(100, 64)  # Initialized with He init by default
```

## Conclusion

Weight initialization dramatically affects training speed and convergence. Xavier and He init match activation functions and layer sizes. Understanding initialization prevents many subtle training failures. Next: understanding gradient flow with residual connections.
