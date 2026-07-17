---
title: "Graph Neural Networks: Message Passing, Graph Convolutions, and Node Classification"
excerpt: "GNNs extend neural networks to graph data. Learn message passing (aggregate neighbor info), graph convolutions, and applications like social network analysis."
author: Soham Sharma
authorName: Soham Sharma
category: Models
tags: ["Graph Networks", "GNNs", "Message Passing", "Deep Learning"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: models-mastery
series_slug: models-mastery
series_title: "State-of-the-Art Models: Vision, Language, and Multimodal"
difficulty: intermediate
week: null
day: 5
tools:
  - PyTorch
---

Graphs have nodes and edges. GNNs learn by message passing: each node aggregates information from its neighbors. Graph convolutions are the neural network equivalent for graphs. Applications include social networks, molecular graphs, and knowledge graphs.

## Message Passing

```
For each node v:
    1. Aggregate neighbor messages: m_v = AGG({h_u : u ∈ neighbors(v)})
    2. Update node: h_v_new = UPDATE(h_v, m_v)
```

## Graph Convolution

```python
import torch.nn as nn
from torch_geometric.nn import GCNConv

class GCN(nn.Module):
    def __init__(self, in_channels, hidden_channels, out_channels):
        super().__init__()
        self.conv1 = GCNConv(in_channels, hidden_channels)
        self.conv2 = GCNConv(hidden_channels, out_channels)
    
    def forward(self, x, edge_index):
        x = self.conv1(x, edge_index)
        x = F.relu(x)
        x = self.conv2(x, edge_index)
        return x
```

## Conclusion

GNNs extend deep learning to structured graph data. Message passing is the key abstraction enabling powerful graph representations. Understanding GNNs enables modeling structured domains: molecules, social networks, knowledge graphs. Next: attention is all you need—the Transformer architecture applied to graphs.
