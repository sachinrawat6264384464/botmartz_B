---
title: "Optimizer Comparison: SGD, Momentum, Adam, RMSprop, and When Each Shines"
excerpt: "Different optimizers suit different problems. SGD is stable, Momentum accelerates, Adam is adaptive. Understand why each optimizer works and pick the right one."
author: Soham Sharma
authorName: Soham Sharma
category: Optimization
tags: ["Optimization", "Training", "Gradient Descent", "Deep Learning"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: optimization-mastery
series_slug: optimization-mastery
series_title: "Training Deep Networks: Optimization, Regularization, and Best Practices"
difficulty: intermediate
week: null
day: 1
tools:
  - PyTorch
---

Optimizers are algorithms that update weights based on gradients. SGD is simple but slow. Momentum accelerates convergence. Adam adapts learning rates per parameter. Each optimizer has strengths: SGD generalizes well, Adam is fast, RMSprop for non-stationary problems.

## SGD (Stochastic Gradient Descent)

```python
# Update: w = w - lr * gradient
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)
```

Pros: Simple, generalizes well. Cons: Slow convergence, sensitive to learning rate.

## Momentum

```python
# Momentum accumulates gradients: v = β*v + gradient
# Update: w = w - lr * v
optimizer = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
```

Pros: Faster convergence, escapes local minima. Cons: Can overshoot.

## Adam (Adaptive Moment Estimation)

```python
# Adapts learning rate per parameter
# m = β1*m + (1-β1)*gradient
# v = β2*v + (1-β2)*gradient^2
# Update: w = w - (lr * m) / (sqrt(v) + ε)
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
```

Pros: Fast, automatic learning rate tuning. Cons: Can overfit, memory overhead.

## When to Use

- **SGD**: Simple models, generalization matters
- **Momentum**: CNNs, need faster convergence
- **Adam**: LLMs, complex objectives, most practical choice
- **RMSprop**: Non-stationary data, sparse gradients

## Conclusion

Choosing the right optimizer affects training speed and final performance. Adam is the practical default; SGD for maximum generalization. Understanding optimizer mechanics guides hyperparameter tuning and model development. Next: learning rate scheduling—how to adapt learning rate during training.
