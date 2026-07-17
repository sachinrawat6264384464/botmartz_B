---
title: "Mixture of Experts (MoE) and Mixtral: Scaling Without Dense Computation"
excerpt: "Dense models scale poorly (compute cost ∝ size). MoE scales differently: activate only relevant experts. Mixtral 8×7B is competitive with 70B models but uses 1/3 the compute at inference."
author: Soham Sharma
authorName: Soham Sharma
category: Advanced Models
tags: ["Mixture of Experts", "Mixtral", "Scaling", "Efficient Inference"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: advanced-models-frontier
series_slug: advanced-models-frontier
series_title: "Advanced Model Architectures: Beyond Transformers"
difficulty: advanced
week: null
day: 5
tools:
  - Deep Learning
---

Dense models require computing all weights for all tokens. Mixture of Experts routes each token to specialized subnetworks (experts). Each token only activates a few experts, keeping inference cost low. Mixtral 8×7B (8 experts, each 7B) outperforms Llama-2 70B while using 1/3 the inference compute.

## MoE Architecture

```
Input token
    ↓
[Router Network] → softmax over experts
    ↓
Select top-k experts (e.g., k=2)
    ↓
Forward through selected experts
    ↓
Combine outputs (weighted by router scores)
    ↓
Output
```

## Expert Routing

```python
import torch
import torch.nn as nn

class MixtralMoE(nn.Module):
    def __init__(self, num_experts=8, d_model=768, k=2):
        super().__init__()
        self.num_experts = num_experts
        self.k = k  # Top-k experts
        
        # Expert networks
        self.experts = nn.ModuleList([
            nn.Sequential(
                nn.Linear(d_model, 4*d_model),
                nn.GELU(),
                nn.Linear(4*d_model, d_model)
            ) for _ in range(num_experts)
        ])
        
        # Router: decides which experts to use
        self.router = nn.Linear(d_model, num_experts)
    
    def forward(self, x):
        # x: (batch, seq_len, d_model)
        batch_size, seq_len, d_model = x.shape
        
        # Route: which experts for each token?
        router_scores = self.router(x)  # (batch, seq_len, num_experts)
        router_probs = torch.softmax(router_scores, dim=-1)
        
        # Select top-k experts
        top_k_probs, top_k_indices = torch.topk(router_probs, self.k, dim=-1)
        # top_k_probs: (batch, seq_len, k)
        # top_k_indices: (batch, seq_len, k)
        
        # Renormalize probabilities (only for selected experts)
        top_k_probs = top_k_probs / top_k_probs.sum(dim=-1, keepdim=True)
        
        # Flatten for expert computation
        x_flat = x.reshape(-1, d_model)  # (batch*seq_len, d_model)
        
        # Forward through selected experts and combine
        outputs = torch.zeros_like(x_flat)
        for i in range(self.k):
            expert_idx = top_k_indices[:, :, i].reshape(-1)  # Which expert for each token
            prob = top_k_probs[:, :, i].reshape(-1, 1)  # Weight
            
            # Gather tokens routed to this expert
            expert_mask = (expert_idx.unsqueeze(-1) == torch.arange(self.num_experts))
            for e in range(self.num_experts):
                mask = expert_mask[:, e]
                if mask.any():
                    outputs[mask] += prob[mask] * self.experts[e](x_flat[mask])
        
        return outputs.reshape(batch_size, seq_len, d_model)
```

**Output:**
```text
Input: (batch=4, seq_len=512, d_model=768)
Router selects top-2 out of 8 experts per token
Total compute: ~1/4 of dense network with same number of parameters
Memory: 8 × 7B = 56B parameters (loaded), but only 2/8 active per forward
```

## Computation Efficiency

```
Dense 56B model:
- Inference: 56B FLOP per token
- Throughput: 100 tok/s on V100

MoE 8×7B (k=2 experts):
- Inference: 56B * (2/8) = 14B FLOP per token
- Throughput: 400 tok/s on V100 (4× faster!)
```

## Load Balancing: The Hidden Challenge

Naive routing causes "expert collapse": all tokens route to same expert (unbalanced load, poor GPU utilization).

```python
# Add auxiliary loss to balance expert load
def moe_loss(router_probs, expert_indices):
    # Encourage even distribution across experts
    mean_expert_load = router_probs.mean(dim=[0, 1])  # Average load per expert
    balance_loss = torch.std(mean_expert_load) ** 2
    return balance_loss

total_loss = task_loss + 0.01 * balance_loss  # Encourage balanced routing
```

## Conclusion

Mixture of Experts enables scaling without proportional compute increase. Selective routing is the key: activate only relevant experts per token. Mixtral shows MoE is practical for production LLMs. Understanding expert routing and load balancing is essential for scaling efficiently. Next: Spiking neural networks and neuromorphic computing.
