---
title: "Batch Normalization and Layer Normalization: Reducing Internal Covariate Shift"
excerpt: "Batch norm normalizes activations during training, reducing internal covariate shift. Layer norm is the alternative for RNNs and Transformers. Understand when each applies."
author: Soham Sharma
authorName: Soham Sharma
category: Optimization
tags: ["Normalization", "Batch Norm", "Layer Norm", "Training Stability"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: optimization-mastery
series_slug: optimization-mastery
series_title: "Training Deep Networks: Optimization, Regularization, and Best Practices"
difficulty: intermediate
week: null
day: 3
tools:
  - PyTorch
---

Batch normalization normalizes layer inputs to zero mean/unit variance, stabilizing training and enabling higher learning rates. Layer normalization normalizes across features (instead of batch), solving the batch-size dependency problem. Understanding their trade-offs guides architecture design.

## Batch Normalization

```python
# During training: normalize by batch statistics
# During inference: normalize by running statistics (computed during training)

class BatchNormModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(100, 64)
        self.bn1 = nn.BatchNorm1d(64)  # Normalize across batch dimension
        self.fc2 = nn.Linear(64, 10)
    
    def forward(self, x):
        x = self.fc1(x)
        x = self.bn1(x)  # Normalize
        x = F.relu(x)
        x = self.fc2(x)
        return x
```

Batch norm reduces internal covariate shift, enabling faster training.

## Layer Normalization

```python
# Normalize across features (not batch)
class LayerNormModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(100, 64)
        self.ln1 = nn.LayerNorm(64)  # Normalize across feature dimension
        self.fc2 = nn.Linear(64, 10)
    
    def forward(self, x):
        x = self.fc1(x)
        x = self.ln1(x)  # Normalize
        x = F.relu(x)
        x = self.fc2(x)
        return x
```

Layer norm doesn't depend on batch size, making it ideal for Transformers and variable-length sequences.

## Conclusion

Batch norm and layer norm both stabilize training but have different properties. Batch norm is standard for CNNs; layer norm is standard for Transformers. Understanding when to use each informs architecture choices. Next: weight initialization and their effects on training.
