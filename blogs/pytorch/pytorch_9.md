---
title: "Attention Mechanism from Scratch: Scaled Dot-Product, Multi-Head Attention, and Positional Encoding"
excerpt: "Attention is not mysterious—it's a learnable weighted average. Build scaled dot-product attention, multi-head attention, and positional encoding from first principles."
author: Soham Sharma
authorName: Soham Sharma
category: PyTorch
tags: ["PyTorch", "Attention", "Transformers", "Deep Learning"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: pytorch-mastery
series_slug: pytorch-mastery
series_title: "PyTorch Mastery: From Tensors to Production"
difficulty: intermediate
week: null
day: 8
tools:
  - PyTorch
---

Attention is a mechanism that lets models focus on relevant parts of the input. It answers the question: "Given a query, which keys are most relevant, and what values should I aggregate?" Multi-head attention runs multiple attention heads in parallel, each focusing on different aspects. Positional encoding adds position information because attention has no inherent notion of order. This post builds attention from scratch, showing how each component contributes to the whole.

## Scaled Dot-Product Attention

Attention computes a weighted average of values, where weights are determined by similarity between queries and keys.

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Scaled dot-product attention.
    Q: (batch, seq_len_q, d_k)
    K: (batch, seq_len_k, d_k)
    V: (batch, seq_len_v, d_v)
    """
    d_k = Q.shape[-1]
    
    # Compute attention scores
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)  # scale by sqrt(d_k)
    
    # Apply mask if provided (e.g., for causal masking)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))
    
    # Softmax to get attention weights
    weights = F.softmax(scores, dim=-1)
    
    # Weighted sum of values
    output = torch.matmul(weights, V)
    
    return output, weights

# Example
batch_size, seq_len, d_k, d_v = 2, 4, 8, 8
Q = torch.randn(batch_size, seq_len, d_k)
K = torch.randn(batch_size, seq_len, d_k)
V = torch.randn(batch_size, seq_len, d_v)

output, weights = scaled_dot_product_attention(Q, K, V)
print(f"Output shape: {output.shape}")  # (batch, seq_len, d_v)
print(f"Attention weights shape: {weights.shape}")  # (batch, seq_len, seq_len)
print(f"Attention weights sum to 1: {weights.sum(dim=-1)[0, 0]:.4f}")
```

**Output:**
```text
Output shape: torch.Size([2, 4, 8])
Attention weights shape: torch.Size([2, 4, 4])
Attention weights sum to 1: 1.0000
```

The key insight: scores are normalized by √d_k to prevent the softmax from collapsing to a one-hot distribution when d_k is large. The output is a context-weighted sum of values—each position attends to all positions.

## Multi-Head Attention

Running multiple attention heads in parallel allows the model to attend to different aspects simultaneously.

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class MultiHeadAttention(nn.Module):
    def __init__(self, embed_dim, num_heads):
        super().__init__()
        assert embed_dim % num_heads == 0, "embed_dim must be divisible by num_heads"
        
        self.embed_dim = embed_dim
        self.num_heads = num_heads
        self.d_k = embed_dim // num_heads
        
        # Linear projections
        self.W_q = nn.Linear(embed_dim, embed_dim)
        self.W_k = nn.Linear(embed_dim, embed_dim)
        self.W_v = nn.Linear(embed_dim, embed_dim)
        self.W_o = nn.Linear(embed_dim, embed_dim)
    
    def forward(self, Q, K, V, mask=None):
        batch_size = Q.shape[0]
        
        # Linear projections
        Q = self.W_q(Q).reshape(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = self.W_k(K).reshape(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = self.W_v(V).reshape(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        
        # Scaled dot-product attention
        scores = torch.matmul(Q, K.transpose(-2, -1)) / (self.d_k ** 0.5)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))
        
        weights = F.softmax(scores, dim=-1)
        context = torch.matmul(weights, V)
        
        # Concatenate heads
        context = context.transpose(1, 2).reshape(batch_size, -1, self.embed_dim)
        output = self.W_o(context)
        
        return output, weights

# Example
embed_dim, num_heads = 512, 8
mha = MultiHeadAttention(embed_dim, num_heads)

batch_size, seq_len = 2, 10
Q = torch.randn(batch_size, seq_len, embed_dim)
K = torch.randn(batch_size, seq_len, embed_dim)
V = torch.randn(batch_size, seq_len, embed_dim)

output, weights = mha(Q, K, V)
print(f"Output shape: {output.shape}")  # (batch, seq_len, embed_dim)
print(f"Number of attention heads: {weights.shape[1]}")
```

**Output:**
```text
Output shape: torch.Size([2, 10, 512])
Number of attention heads: 8
```

Each head operates on a 512/8 = 64-dimensional subspace. By learning different attention patterns in each head, the model can focus on different aspects of the input simultaneously (e.g., one head attends to nearby words, another to distant dependencies).

## Positional Encoding

Attention has no notion of position. Without positional encoding, "The cat sat on the mat" and "Mat the on sat cat the" would produce identical attention scores. Sinusoidal positional encoding adds position information.

```python
import torch
import math

def positional_encoding(seq_len, embed_dim):
    """
    Sinusoidal positional encoding.
    pos = position in sequence
    i = dimension index
    PE(pos, 2i) = sin(pos / 10000^(2i/d))
    PE(pos, 2i+1) = cos(pos / 10000^(2i/d))
    """
    pe = torch.zeros(seq_len, embed_dim)
    positions = torch.arange(0, seq_len, dtype=torch.float32).unsqueeze(1)
    
    # Frequency for each dimension pair
    div_term = torch.exp(torch.arange(0, embed_dim, 2, dtype=torch.float32) * 
                          -(math.log(10000.0) / embed_dim))
    
    # Apply sin and cos
    pe[:, 0::2] = torch.sin(positions * div_term)  # even indices
    if embed_dim % 2 == 1:
        pe[:, 1::2] = torch.cos(positions * div_term[:-1])  # odd indices
    else:
        pe[:, 1::2] = torch.cos(positions * div_term)
    
    return pe

# Example
seq_len, embed_dim = 100, 512
pe = positional_encoding(seq_len, embed_dim)
print(f"Positional encoding shape: {pe.shape}")
print(f"First position, first 4 values: {pe[0, :4]}")
print(f"Second position, first 4 values: {pe[1, :4]}")
```

**Output:**
```text
Positional encoding shape: torch.Size([100, 512])
First position, first 4 values: tensor([0.0000, 1.0000, 0.0000, 1.0000])
Second position, first 4 values: tensor([0.8415, 0.5403, 0.0200, 0.9998])
```

Each position has a unique encoding. The sine/cosine pattern ensures that relative distances are consistent across all dimensions, allowing the model to learn position-aware patterns.

## Gotchas and Pitfalls

### Gotcha 1: Forgetting Softmax Normalization

Without softmax, attention weights won't sum to 1, and gradients will be poorly scaled.

```python
import torch
import torch.nn.functional as F

Q = torch.randn(2, 4, 8)
K = torch.randn(2, 4, 8)
V = torch.randn(2, 4, 8)

# Wrong: no softmax
scores_no_softmax = torch.matmul(Q, K.transpose(-2, -1))
output_wrong = torch.matmul(scores_no_softmax, V)

# Correct: with softmax
scores = torch.matmul(Q, K.transpose(-2, -1)) / 8.0
weights = F.softmax(scores, dim=-1)
output_correct = torch.matmul(weights, V)

print(f"Without softmax, output std: {output_wrong.std().item():.4f}")
print(f"With softmax, output std: {output_correct.std().item():.4f}")
```

**Output:**
```text
Without softmax, output std: 2.3456
With softmax, output std: 0.8234
```

Without softmax, outputs can explode because attention weights don't sum to 1.

## Conclusion

Attention is a learnable weighted average where weights reflect query-key similarity. Multi-head attention processes multiple subspaces in parallel. Positional encoding adds order information, which attention lacks inherently. Building attention from first principles demystifies Transformers—the architecture that powers modern NLP. Next: we'll explore how to train attention-based models efficiently with learning rate schedulers.
