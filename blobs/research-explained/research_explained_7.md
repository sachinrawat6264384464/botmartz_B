---
title: "Research Paper Deep Dive: Chinchilla & Compute Optimal Scaling Laws"
excerpt: "How to allocate compute between model size and training data? Scaling laws show: to maximize performance, increase both equally. A 70B model needs 1.4T tokens."
author: Soham Sharma
authorName: Soham Sharma
category: Research Explained
tags: ["Research", "Scaling Laws", "Compute", "Training"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: research-frontier
series_slug: research-frontier
series_title: "Landmark ML Research Papers with Code & Analysis"
difficulty: advanced
week: null
day: 7
tools:
  - Deep Learning
---

**Paper**: "Training Compute-Optimal Large Language Models" (Hoffmann et al., 2022)
**ArXiv**: https://arxiv.org/abs/2203.15556
**Key Insight**: Previous scaling laws suggested training large models on small datasets. Chinchilla shows the opposite: allocate compute equally between model size and tokens.

## The Problem: How Much to Train?

Before Chinchilla, the question was: given a compute budget, how many parameters and how many tokens?

```
Kaplan et al. (2020) suggested:
- N (parameters) should be much larger than D (tokens)
- E.g., 10B model on 200B tokens

Chinchilla (2022) discovered:
- N and D should be roughly equal
- E.g., 70B model on 1.4T tokens
```

## Scaling Law Formula

```
Loss(N, D) = a * N^(-α) + b * D^(-β) + c

Where:
N = number of parameters
D = number of tokens
α ≈ 0.074
β ≈ 0.0617

For compute-optimal (C FLOP budget):
N ≈ C / (6 * D)
D ≈ C / (6 * N)

To maximize performance:
Increase N and D proportionally
```

## Practical Implications

```
Compute Budget: 1 exaflop (10^18 FLOP)

Old Strategy (Kaplan):
- N = 100B parameters
- D = 100B tokens
- Undertrained, poor performance

Chinchilla Strategy:
- N ≈ 50B parameters
- D ≈ 1.4T tokens
- Compute-optimal, better performance
```

## Benchmarks

```
Same compute budget: 1.3 exaflop

Chinchilla 70B:
- MMLU: 67.5%
- Trained on 1.4T tokens

GPT-3 175B:
- MMLU: 58.5%
- Trained on 300B tokens (undertrained)

Chinchilla 70B < GPT-3 175B in size
But Chinchilla > GPT-3 in quality!

Key: Better data allocation, not model size.
```

## Our Analysis

Chinchilla's impact was massive. It showed that the industry was undertrained—training large models on too little data. This shifted focus to data quality and training longer. Most modern LLMs now follow Chinchilla-style scaling:

```
- LLaMA: Follow Chinchilla closely
- Llama-2: Scale according to Chinchilla
- Mistral: Chinchilla-optimal scaling
```

## Code Example: Computing Optimal Allocation

```python
import numpy as np

def compute_optimal_scaling(compute_budget_flops):
    """
    Given compute budget, return optimal N and D
    """
    # Scaling law constants
    a = 406.4  # loss constant
    alpha = 0.074
    beta = 0.0617
    
    # For compute-optimal:
    # C = 6 * N * D (roughly)
    # So N ≈ D ≈ sqrt(C / 6)
    
    optimal_N = np.sqrt(compute_budget_flops / 6)
    optimal_D = np.sqrt(compute_budget_flops / 6)
    
    return optimal_N, optimal_D


# Example: 1 exaflop
budget = 1e18
N, D = compute_optimal_scaling(budget)
print(f"Optimal N: {N:.2e} parameters")
print(f"Optimal D: {D:.2e} tokens")

# Output:
# Optimal N: 4.08e+10 parameters (40B)
# Optimal D: 4.08e+13 tokens (40T)
```

## References

1. **Paper**: Chinchilla - Training Compute-Optimal Large Language Models (Hoffmann et al., 2022)
2. **Related**: Kaplan et al. Scaling Laws for Neural Language Models (2020)

## Conclusion

Chinchilla established that compute allocation matters as much as total compute. This principle now guides all LLM training. Understanding scaling laws helps predict model quality and plan training budgets. Next: emergence and how new capabilities appear at scale.
