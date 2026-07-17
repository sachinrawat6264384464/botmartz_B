---
title: "Advanced Model: Retentive Networks (RetNet) — Transformer Alternative with Perfect Recall"
excerpt: "Transformers have quadratic attention. RetNet uses parallel attention + recurrence + chained matrix multiplication. Better scaling, perfect token recall, O(n) complexity."
author: Soham Sharma
authorName: Soham Sharma
category: Advanced Models
tags: ["RetNet", "Sequence Modeling", "Architecture", "Efficiency"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: advanced-models-frontier
series_slug: advanced-models-frontier
series_title: "Advanced Model Architectures: Beyond Transformers"
difficulty: advanced
week: null
day: 8
tools:
  - Deep Learning
---

RetNet (Retentive Networks) is an alternative to transformers that maintains three paradigms simultaneously: parallel (training), recurrent (inference), and chained matrix multiplication (long-range dependency). It achieves O(n) complexity with perfect recall of all tokens.

## The Problem: Transformers Have Limits

```
Transformers:
- O(n²) attention (quadratic memory)
- Excellent training (parallel)
- Poor inference (long sequences)

What we need:
- Fast training (parallel)
- Fast inference (recurrent)
- Fast long-range (linear scaling)
- Perfect token recall
```

## RetNet Mechanism: Retention

RetNet replaces attention with a "retention" mechanism:

```
Parallel (training):
M(S) = softmax(Q @ K^T / sqrt(d)) @ V

Recurrent (inference):
s_n = s_{n-1} * γ + k_n ⊗ v_n^T
output = q_n @ s_n

Chained:
Maintain state s as rank-1 outer products
Recall any previous token exactly (no approximation)
```

Where γ is a decay factor (usually 0.99), and ⊗ is outer product.

## Why Perfect Recall?

```
Transformer attention at position n:
Can only access tokens via learned Q@K weights
Information loss: soft attention blurs information

Retention at position n:
State s_n = outer products of all previous k, v
Can recover ANY token exactly: just query with its key
Perfect recall: no information loss
```

## Implementation Sketch

```python
import torch
import torch.nn as nn

class Retention(nn.Module):
    def __init__(self, d_model, decay=0.9):
        super().__init__()
        self.d_model = d_model
        self.decay = decay
        
        self.Q = nn.Linear(d_model, d_model)
        self.K = nn.Linear(d_model, d_model)
        self.V = nn.Linear(d_model, d_model)
    
    def forward_parallel(self, x):
        """Training: parallel computation"""
        # x: (batch, seq_len, d_model)
        Q = self.Q(x)
        K = self.K(x)
        V = self.V(x)
        
        # Decay weights: γ^(n-m) where n is current position, m is source
        n = torch.arange(x.shape[1], device=x.device)
        decay_matrix = self.decay ** (n.unsqueeze(1) - n.unsqueeze(0))  # (seq_len, seq_len)
        
        # Attention with decay
        scores = torch.einsum('bni,bmi->bnm', Q, K) * decay_matrix
        scores = scores / (torch.abs(K).sum(dim=-1, keepdim=True).unsqueeze(0) + 1e-8)
        
        output = torch.einsum('bnm,bmd->bnd', scores, V)
        return output
    
    def forward_recurrent(self, x):
        """Inference: recurrent computation"""
        # x: (seq_len, d_model)
        Q = self.Q(x)
        K = self.K(x)
        V = self.V(x)
        
        # Initialize state
        state = torch.zeros(self.d_model, self.d_model, device=x.device)
        outputs = []
        
        for t in range(x.shape[0]):
            # Update state: s_n = decay * s_{n-1} + k_n ⊗ v_n
            state = self.decay * state + torch.outer(K[t], V[t])
            
            # Output: q_n @ s_n
            output = torch.matmul(Q[t], state.sum(dim=0))  # Simplification
            outputs.append(output)
        
        return torch.stack(outputs, dim=0)


# Benchmark
print("Parallel (training):")
print("Time: O(n²d) - standard attention")
print("Memory: O(n²)")
print()
print("Recurrent (inference):")
print("Time: O(n) - process token-by-token")
print("Memory: O(d²) - maintain state matrix")
```

## Complexity Comparison

```
                | Training | Inference | Memory (inference)
Transformer     | O(n²)    | O(n)      | O(n)
RetNet          | O(n²)    | O(n)      | O(d²)

For n=4K, d=4096:
Transformer KV cache: 4000 × 4096 × 2 = 32.8M values
RetNet state: 4096 × 4096 = 16.8M values

Similar memory, but RetNet has perfect recall!
```

## Key Insights

1. **Decay matters**: γ close to 1 → longer memory
2. **Perfect recall**: Can recover any token from state
3. **Parallel and recurrent**: Same computation, different execution
4. **Rank-1 updates**: Efficient state updates via outer products

## Conclusion

RetNet shows that transformers aren't the only option. By using retention instead of attention, we get O(n) inference with perfect recall. This is a frontier direction: sequence modeling beyond transformers. Next: exploring other alternatives like S4 and state space models.
