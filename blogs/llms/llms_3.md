---
title: "Inference Optimization for LLMs: Quantization, Batching, KV Cache, and Speculative Decoding"
excerpt: "LLM inference is slow: generating token-by-token is sequential. Optimize with quantization (smaller models), batching (throughput), KV cache (latency), and speculative decoding (faster generation)."
author: Soham Sharma
authorName: Soham Sharma
category: LLMs
tags: ["LLMs", "Inference", "Optimization", "Quantization", "Latency"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: llms-mastery
series_slug: llms-mastery
series_title: "Large Language Models: Architecture, Training, and Deployment"
difficulty: advanced
week: null
day: 3
tools:
  - LLMs
---

LLM inference is I/O bound: each token generation requires matrix multiplications that are small relative to memory transfer. Optimize with quantization (reduce model size), batching (amortize I/O), KV cache (avoid recomputation), and speculative decoding (predict multiple tokens ahead).

## Quantization

Reduce model precision: float32 → float16 → int8. Smaller models fit in smaller memory, reducing latency.

```python
import torch
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b")

# Quantize to int8
quantized_model = torch.quantization.quantize_dynamic(
    model, {torch.nn.Linear}, dtype=torch.qint8
)

# 4× smaller, faster inference
```

## KV Cache

During generation, attention recomputes all keys/values. Cache them instead.

```
Without KV cache: Each token recomputes attention for all previous tokens. O(n²)
With KV cache: Store keys/values, reuse. O(n)
```

This reduces latency 4-8× for long sequences.

## Speculative Decoding

Generate multiple tokens ahead speculatively, then verify.

```
1. Guess next 5 tokens using a fast model
2. Verify with main model: which guess is correct?
3. Keep correct tokens, speculate on remainder
```

This reduces latency by 2-3× with minimal accuracy loss.

## Conclusion

Inference optimization is essential for production LLM serving. Each technique (quantization, KV cache, speculative decoding, batching) addresses a specific bottleneck. Combined, they enable real-time, cost-effective inference. Next: deploying LLMs—how to serve models reliably at scale.
