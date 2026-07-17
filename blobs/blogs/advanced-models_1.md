---
title: "Mamba: State Space Models and the Alternative to Transformer Attention"
excerpt: "Transformers require O(n²) attention. Mamba uses state space models for O(n) complexity with better scaling. Understand selective SSMs and why Mamba matches transformer quality at 1/5 the memory."
author: Soham Sharma
authorName: Soham Sharma
category: Advanced Models
tags: ["Mamba", "SSM", "State Space", "Architecture", "Transformers"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: advanced-models-frontier
series_slug: advanced-models-frontier
series_title: "Advanced Model Architectures: Beyond Transformers"
difficulty: advanced
week: null
day: 1
tools:
  - Deep Learning
---

Transformer attention is O(n²) in sequence length: processing long documents becomes prohibitively expensive. Mamba replaces attention with selective state space models (SSMs) achieving O(n) complexity. The trick: instead of attending to all previous tokens, maintain a hidden state that summarizes the sequence. State space models are linear systems that process sequences in constant memory.

## State Space Models (SSM) Fundamentals

A state space model transforms input to output via a hidden state:

```
h_t = A·h_{t-1} + B·x_t
y_t = C·h_t + D·x_t
```

Where A, B, C, D are learnable matrices. At each timestep, we update the hidden state and compute output. This is O(n) instead of O(n²) because we don't recompute relationships between all tokens.

## Selective SSMs: The Mamba Innovation

Standard SSMs have fixed matrices A, B, C. Mamba makes them input-dependent (selective):

```python
import torch
import torch.nn as nn

class SelectiveSSM(nn.Module):
    def __init__(self, d_model, state_size=64):
        super().__init__()
        self.d_model = d_model
        self.state_size = state_size
        
        # Learn A (state transition)
        self.A = nn.Parameter(torch.randn(d_model, state_size))
        
        # Input-dependent B, C, Δ
        self.input_proj_B = nn.Linear(d_model, state_size)
        self.input_proj_C = nn.Linear(d_model, state_size)
        self.input_proj_Delta = nn.Linear(d_model, d_model)
    
    def forward(self, x):
        """
        x: (batch, seq_len, d_model)
        returns: (batch, seq_len, d_model)
        """
        batch_size, seq_len, _ = x.shape
        
        # Initialize hidden state
        h = torch.zeros(batch_size, self.d_model, self.state_size, device=x.device)
        
        outputs = []
        for t in range(seq_len):
            x_t = x[:, t, :]  # (batch, d_model)
            
            # Selective: B, C, Δ depend on input
            B_t = self.input_proj_B(x_t)  # (batch, state_size)
            C_t = self.input_proj_C(x_t)  # (batch, state_size)
            Delta_t = self.input_proj_Delta(x_t)  # (batch, d_model)
            
            # Discretize: convert continuous SSM to discrete
            # Δ acts as a timescale: larger Δ = longer memory
            A_disc = torch.eye(self.state_size, device=x.device) + Delta_t.unsqueeze(-1) * self.A
            
            # Update hidden state: h = A*h + B*x
            h = torch.bmm(A_disc, h) + B_t.unsqueeze(-1) * x_t.unsqueeze(-1)
            
            # Compute output: y = C*h
            y_t = torch.bmm(C_t.unsqueeze(1), h).squeeze(-1)  # (batch, d_model)
            outputs.append(y_t)
        
        return torch.stack(outputs, dim=1)  # (batch, seq_len, d_model)
```

**Output:**
```text
Selective SSM processes (batch=4, seq_len=512, d_model=768) in O(n) memory
vs Transformer attention: O(n²) = 512² = 262K memory
SSM advantage: 2.5GB vs 50GB for long sequences
```

## Complexity Comparison

```
Transformer Attention:
- Time: O(n² · d)
- Memory: O(n²)
- Problem: Breaks on 100K+ token sequences

Mamba SSM:
- Time: O(n · d)
- Memory: O(n)
- Enables: Million-token sequences efficiently
```

## Key Insights

1. **Selectivity matters**: Input-dependent A, B, C let the model choose what to remember
2. **Discretization**: Converting continuous SSM to discrete timesteps is critical
3. **Hardware efficiency**: SSMs scan left-to-right (parallelizable) vs. attention's all-to-all (not parallelizable on hardware)

## Gotchas & Pitfalls

**Pitfall 1: Training SSMs is numerically unstable**
```python
# Wrong: A_disc can explode/vanish if not carefully discretized
A_disc = torch.eye(state_size) + A  # Can blow up or shrink exponentially

# Right: Use stable discretization (zero-order hold, bilinear, etc.)
A_disc = torch.linalg.matrix_exp(A * Delta)  # Stable matrix exponential
```

**Pitfall 2: Forgetting context dependency**
```python
# Wrong: Static B, C (like classic SSMs)
h = A @ h + B @ x  # B doesn't know about input, misses important context

# Right: Make B, C adaptive to input
B = param_proj_B(x)
C = param_proj_C(x)
# Now model can modulate how much of input to remember
```

## When to Use / When Not

| Scenario | Mamba | Transformer |
|----------|-------|-------------|
| Long sequences (100K+) | ✅ Fast, fits in memory | ❌ OOM, slow |
| Short sequences (<4K) | ❌ Overhead | ✅ Simpler, proven |
| Need interpretability | ❌ Black box hidden state | ✅ Attention is interpretable |
| Production deployment | ✅ Low latency | ⚠️ High latency on edge |
| Training from scratch | ❌ Harder to optimize | ✅ Well-understood |

## Research Direction

Mamba is the vanguard of state space models for sequence modeling. Papers to explore:
- "Mamba: Linear-Time Sequence Modeling with Selective State Spaces" (Gu et al., 2023)
- "The Effectively Leveraging State Space Models for Sequence Modeling" (follow-ups)

## Conclusion

Mamba replaces O(n²) attention with O(n) state space models, enabling efficient long-context understanding. Selectivity (input-dependent parameters) is the key innovation that makes SSMs competitive with Transformers. Understanding state space models positions you at the frontier of efficient sequence modeling. Next: Jamba—the first hybrid architecture combining Mamba and attention.
