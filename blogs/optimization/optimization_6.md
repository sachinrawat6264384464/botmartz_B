---
title: "Hyperparameter Tuning: Learning Rate, Batch Size, Warmup, and Grid vs. Random Search"
excerpt: "Hyperparameters (learning rate, batch size) dramatically affect training. Use learning rate warmup, experiment with batch sizes, and search efficiently (random > grid)."
author: Soham Sharma
authorName: Soham Sharma
category: Optimization
tags: ["Hyperparameter Tuning", "Learning Rate", "Batch Size", "Training"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: optimization-mastery
series_slug: optimization-mastery
series_title: "Training Deep Networks: Optimization, Regularization, and Best Practices"
difficulty: intermediate
week: null
day: 6
tools:
  - PyTorch
---

Hyperparameter tuning is tedious but essential: a 2× difference in learning rate can mean 10× difference in convergence speed. Learn rate warmup prevents training instability. Batch size affects memory/quality trade-offs. Random search finds good hyperparameters faster than grid search.

## Learning Rate Warmup

```python
# Linear warmup: lr increases from 0 to target over warmup_steps
from torch.optim.lr_scheduler import LinearLR

scheduler = LinearLR(
    optimizer,
    start_factor=0.1,
    total_iters=1000  # Warmup steps
)

for epoch in range(num_epochs):
    train()
    scheduler.step()  # Gradually increase learning rate
```

Warmup prevents training instability in the first steps.

## Batch Size Effects

```
Large batch size: Fast training, lower memory per sample, but may converge slower
Small batch size: Slower training, higher memory per sample, but may converge faster
```

A common approach: Start with the largest batch that fits in memory, then tune learning rate.

## Hyperparameter Search

```python
import optuna

def objective(trial):
    lr = trial.suggest_float('lr', 1e-5, 1e-2, log=True)
    batch_size = trial.suggest_categorical('batch_size', [32, 64, 128])
    
    model = train_and_evaluate(lr=lr, batch_size=batch_size)
    return model.val_accuracy

study = optuna.create_study()
study.optimize(objective, n_trials=100)
```

Random search (via Optuna) finds better hyperparameters than grid search with the same budget.

## Conclusion

Hyperparameter tuning dramatically affects training. Warmup stabilizes early training, batch size balances speed/quality, and random search finds good hyperparameters efficiently. Developing tuning intuition is essential for effective model training. This completes the optimization series.
