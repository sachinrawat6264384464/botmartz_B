---
title: "Regularization Techniques: L1/L2, Dropout, Early Stopping, and Preventing Overfitting"
excerpt: "Models overfit by memorizing noise. Use L1/L2 regularization to shrink weights, dropout to disable random neurons, early stopping to stop before overfitting."
author: Soham Sharma
authorName: Soham Sharma
category: Optimization
tags: ["Regularization", "Overfitting", "Training", "Deep Learning"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: optimization-mastery
series_slug: optimization-mastery
series_title: "Training Deep Networks: Optimization, Regularization, and Best Practices"
difficulty: intermediate
week: null
day: 2
tools:
  - PyTorch
---

Regularization prevents overfitting: models fitting noise rather than signal. L1/L2 penalize large weights. Dropout randomly disables neurons. Early stopping halts when validation loss stops improving.

## L1/L2 Regularization

```python
# L2 (ridge): loss += λ * ||w||^2
# Shrinks weights toward zero

optimizer = torch.optim.Adam(model.parameters(), lr=0.001, weight_decay=1e-5)
# weight_decay = L2 regularization strength

# L1 (lasso): loss += λ * ||w||
# Drives weights to exactly zero (feature selection)
```

## Dropout

```python
class RegularizedModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(100, 64)
        self.dropout = nn.Dropout(p=0.5)  # Drop 50% of neurons
        self.fc2 = nn.Linear(64, 10)
    
    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = self.dropout(x)  # Random neurons disabled
        x = self.fc2(x)
        return x
```

Dropout forces the network to learn redundant representations.

## Early Stopping

```python
best_val_loss = float('inf')
patience = 10
patience_counter = 0

for epoch in range(num_epochs):
    train_loss = train()
    val_loss = validate()
    
    if val_loss < best_val_loss:
        best_val_loss = val_loss
        patience_counter = 0
        torch.save(model.state_dict(), 'best_model.pth')
    else:
        patience_counter += 1
        if patience_counter >= patience:
            print("Stopping early")
            break
```

## Conclusion

Regularization prevents overfitting by constraining model complexity. L2 shrinks weights, dropout learns redundancy, early stopping stops before overfitting. Combining techniques is more effective than any single technique alone. Next: batch normalization and layer normalization.
