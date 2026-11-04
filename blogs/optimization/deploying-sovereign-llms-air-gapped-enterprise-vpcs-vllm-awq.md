---
title: "Deploying Sovereign LLMs in Air-Gapped Enterprise VPCs: vLLM PagedAttention, TensorRT-LLM, and AWQ Quantization"
slug: "deploying-sovereign-llms-air-gapped-enterprise-vpcs-vllm-awq"
excerpt: "Why regulated enterprises (banking, defense, healthcare) cannot use multi-tenant public AI APIs. End-to-end architecture for sovereign private VPC deployments using vLLM PagedAttention, continuous batching, AWQ 4-bit quantization, and sub-40ms p95 latency."
author: "Soham Sharma"
authorName: "Soham Sharma"
authorId: "soham-sharma-admin"
category: "MLOPS"
tags: ["vLLM", "Sovereign AI", "Private VPC", "AWQ", "Inference", "Quantization", "Docker"]
status: "draft"
featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&auto=format&fit=crop&q=85"
coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&auto=format&fit=crop&q=85"
featuredImageAlt: "Air-Gapped Private VPC LLM Deployment with vLLM PagedAttention and AWQ"
readTime: 18
date: "Nov 5, 2026"
createdAt: "2026-11-05T00:00:00.000Z"
publishedAt: "2026-11-05T00:00:00.000Z"
series_id: "enterprise-ai-mastery"
difficulty: "advanced"
---

# Deploying Sovereign LLMs in Air-Gapped Enterprise VPCs: vLLM PagedAttention, TensorRT-LLM, and AWQ Quantization

*By Soham Sharma · Principal AI Architect, [Botmartz AI Solutions](https://www.botmartz.com)*

---

> *Original canonical engineering dissertation published at [Botmartz Insights: Deploying Sovereign LLMs](https://www.botmartz.com/insights/deploying-sovereign-llms-air-gapped-enterprise-vpcs-vllm-awq).*

---

## Executive Summary: The Data Sovereignty & Compliance Mandate

For enterprises operating across regulated verticals—commercial banking, statutory compliance, defense aerospace, and clinical healthcare—routing proprietary unstructured data to public multi-tenant AI endpoints (such as OpenAI, Anthropic, or public cloud model hubs) is increasingly prohibited by corporate governance and statutory legislation.

Under the **European Union AI Act**, **General Data Protection Regulation (GDPR)**, **India's Digital Personal Data Protection Act (DPDPA)**, and **US Department of Defense FedRAMP High** standards, enterprise customer data must satisfy three non-negotiable requirements:
1. **Zero Data Egress**: Model weights and customer prompts must never traverse the public internet.
2. **Deterministic Data Residency**: Storage, memory caching, and inference must occur exclusively within dedicated enterprise Virtual Private Clouds (VPC) on bare-metal or sovereign cloud tenancies.
3. **Guaranteed Zero Training Retention**: Absolute cryptographic guarantees that client documents are never used for continual model pre-training.

Meeting these mandates requires self-hosting open-weights foundation models (e.g. Llama 3.3 70B, Qwen 2.5 72B, DeepSeek V3) in **air-gapped, zero-egress VPC topologies**. However, naive self-hosting regularly fails due to catastrophic GPU memory fragmentation and abysmal token-per-second unit economics.

This paper specifies the engineering blueprint for running high-throughput, sovereign LLM inference appliances in air-gapped VPCs using **vLLM PagedAttention**, **Continuous Batching**, and **Activation-Aware Weight Quantization (AWQ)**.

---

## 1. The Physics of High-Throughput Inference: The KV Cache Bottleneck

In autoregressive transformer generation, generating each new token requires attending to all prior tokens in the sequence. To avoid recomputing Key and Value activations at every step, transformers maintain a **Key-Value (KV) Cache** in GPU High-Bandwidth Memory (HBM).

### 1.1 The Memory Footprint of the KV Cache
For a model with $L$ layers, $H$ key-value heads, and head dimension $D$, the KV cache memory consumed per token in FP16 precision is:

$$\text{Memory}_{\text{token}} = 2 \times 2 \times L \times H \times D \quad \text{bytes}$$

For a Llama-3-70B model ($L = 80$, $H = 8$ with Grouped Query Attention, $D = 128$):
- Each token consumes **327,680 bytes (320 KB)**.
- For a single request with an 8,192-token context window, the KV cache alone consumes **2.62 GB of VRAM**.
- For 50 concurrent requests, the KV cache requires **131 GB of VRAM**—completely exhausting the memory of two 80GB Nvidia H100 SXM GPUs before accounting for the model's 140 GB weight footprint!

```plaintext
[ TRADITIONAL CONTIGUOUS VRAM ALLOCATION - CATASTROPHIC FRAGMENTATION ]
┌────────────────────────┬──────────────────────────┬────────────────────────┐
│ Request A (Allocated)  │ Wasted Internal Gap (60%)│ Request B (Allocated)  │
└────────────────────────┴──────────────────────────┴────────────────────────┘
Result: 60-80% of expensive GPU VRAM sits idle due to static over-allocation!

[ vLLM PAGEDATTENTION ALLOCATION - VIRTUAL MEMORY BLOCKS ]
┌───────┬───────┬───────┬───────┬───────┬───────┬───────┬───────┐
│ Blk 1 │ Blk 2 │ Blk 3 │ Blk 4 │ Blk 5 │ Blk 6 │ Blk 7 │ Blk 8 │
└───────┴───────┴───────┴───────┴───────┴───────┴───────┴───────┘
Result: Zero fragmentation; blocks allocated on-demand like OS virtual memory.
```

### 1.2 PagedAttention: Virtual Memory for GPU Tensors
Traditional inference engines allocate contiguous blocks of physical VRAM based on the *maximum possible sequence length* ($T_{\max}$), resulting in 60%–80% internal memory fragmentation.

**PagedAttention** solves this by borrowing the classical operating system concept of **virtual memory paging**:
- The KV cache is partitioned into fixed-size physical blocks (e.g. 16 or 32 tokens per block).
- A logical-to-physical block table dynamically maps non-contiguous physical memory chunks during generation.
- **System Impact**: VRAM waste drops to under 4%, allowing **2.8× to 4.5× higher concurrency** on identical GPU clusters.

---

## 2. Quantization Mathematics: AWQ vs. GPTQ vs. FP8

Running a 70-billion-parameter model at 16-bit precision requires ~140 GB of VRAM just to load weights, necessitating multi-GPU tensor parallelism ($2 \times \text{H100 80GB}$). To run high-throughput inference on cost-effective enterprise hardware ($4 \times \text{L40S 48GB}$ or $2 \times \text{A100 80GB}$), model weights must be quantized without degrading reasoning perplexity.

```plaintext
[ WEIGHT QUANTIZATION TRADE-OFF MATRIX ]

  Quantization Method   Perplexity Loss    Throughput (tok/s)   VRAM Footprint
  ─────────────────────────────────────────────────────────────────────────────
  FP16 (Baseline)       0.0% (Zero loss)   100%                 140 GB (70B)
  AWQ 4-Bit             < 0.1% (Near-zero) 240% (GEMM speedup)   38 GB (70B)
  GPTQ 4-Bit            ~ 0.5% (Measurable)190%                  38 GB (70B)
  RTN (Round-to-Near)   ~ 4.8% (Severe)    220%                  38 GB (70B)
```

### Why Activation-Aware Weight Quantization (AWQ) Dominates
Naive Round-to-Nearest (RTN) quantization clips all weights uniformly. However, research proves that **only 0.1% to 1% of salient weight channels dictate the entire model's output quality**. These salient channels correspond to large activation magnitudes.

AWQ identifies these critical channels by observing activation distributions on a small calibration set and applies per-channel protection scales:

$$\mathbf{W}' = \text{Quantize}(\mathbf{W} \cdot \mathbf{S}) \cdot \mathbf{S}^{-1}$$

Where $\mathbf{S}$ is an optimal diagonal scaling matrix chosen to minimize the output activation reconstruction error:

$$\arg\min_{\mathbf{S}} \|\mathbf{W} \mathbf{X} - \text{Quantize}(\mathbf{W} \cdot \mathbf{S}) \cdot \mathbf{S}^{-1} \mathbf{X}\|_2$$

Because salient channels remain unclipped, **AWQ achieves near-lossless 4-bit quantization** while reducing model memory footprint by 72% and doubling generation throughput via INT4 Tensor Core hardware acceleration.

---

## 3. Air-Gapped AWS Private VPC Topology

To satisfy strict CISO audit mandates, the sovereign inference cluster must operate within an isolated subnet with **Zero Internet Gateway (IGW)** access.

```plaintext
┌─────────────────────────────────────────────────────────────────────────┐
│                       ENTERPRISE AIR-GAPPED VPC                         │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │               Private Application Subnet (10.0.1.0/24)          │   │
│   │                                                                 │   │
│   │   [ Internal Enterprise App / Agent Orchestrator ]              │   │
│   │                                │                                │   │
│   │                                ▼ (Internal Private DNS)         │   │
│   │   [ Private Application Load Balancer (Internal ALB) ]          │   │
│   │                                │                                │   │
│   │                                ▼                                │   │
│   │   ┌─────────────────────────────────────────────────────────┐   │   │
│   │   │        GPU Inference Worker Subnet (10.0.2.0/24)        │   │   │
│   │   │                                                         │   │   │
│   │   │   ┌───────────────────────┐   ┌───────────────────────┐ │   │   │
│   │   │   │ vLLM Worker Node 1    │   │ vLLM Worker Node 2    │ │   │   │
│   │   │   │ (4x Nvidia L40S 48GB) │   │ (4x Nvidia L40S 48GB) │ │   │   │
│   │   │   │ Port 8000 (OpenAI API)│   │ Port 8000 (OpenAI API)│ │   │   │
│   │   │   └───────────────────────┘   └───────────────────────┘ │   │   │
│   │   └─────────────────────────────────────────────────────────┘   │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                    │                                    │
│   ┌────────────────────────────────▼────────────────────────────────┐   │
│   │                   AWS VPC Endpoints (PrivateLink)               │   │
│   │   • com.amazonaws.us-east-1.s3 (Pre-loaded Model Weights)       │   │
│   │   • com.amazonaws.us-east-1.ecr (Container Image Repository)   │   │
│   │   • com.amazonaws.us-east-1.logs (CloudWatch Audit Streams)     │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   >>> NO INTERNET GATEWAY · NO NAT GATEWAY · ZERO PUBLIC IP ADDRESSES <<<│
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Production Deployment Specification: Docker & vLLM Engine

Below is the production Docker configuration deploying a sovereign **Llama-3.3-70B-Instruct-AWQ** instance with 4-way tensor parallelism, PagedAttention, and OpenAI-compatible API schemas:

```yaml
version: '3.8'

services:
  vllm-sovereign-node:
    image: vllm/vllm-openai:v0.6.3.post1
    container_name: vllm-sovereign-appliance
    restart: always
    runtime: nvidia
    environment:
      - CUDA_VISIBLE_DEVICES=0,1,2,3
      - NCCL_DEBUG=INFO
      - HF_HUB_OFFLINE=1  # Strictly air-gapped: no HuggingFace downloads
    volumes:
      # Local NVMe drive containing pre-verified model weights and tokenizer
      - /mnt/nvme/models/Llama-3.3-70B-Instruct-AWQ:/models/llama-3.3-70b-awq:ro
      - /mnt/nvme/cache:/root/.cache
    ports:
      - "8000:8000"
    command: >
      --model /models/llama-3.3-70b-awq
      --quantization awq
      --tensor-parallel-size 4
      --max-model-len 8192
      --max-num-seqs 64
      --gpu-memory-utilization 0.92
      --block-size 16
      --enable-prefix-caching
      --disable-log-requests
      --enforce-eager
      --port 8000
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 4
              capabilities: [gpu]
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:8000/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 120s
```

---

## 5. Cost-per-Token Economics: Self-Hosted Sovereign vs. Public APIs

Operating an enterprise AI workload generating **100 million tokens per month** (e.g. 50M input tokens, 50M output tokens):

| Architecture | Monthly Infrastructure Cost | p95 TTFT (Time to First Token) | Data Egress Risk | Compliance Status |
| :--- | :--- | :--- | :--- | :--- |
| **OpenAI GPT-4o Public API** | ~$1,125 / month (variable scale) | 480 ms – 1,200 ms | **High (Third-Party Cloud)** | Fails FedRAMP High / strict banking laws |
| **Anthropic Claude 3.5 Sonnet** | ~$2,250 / month (variable scale) | 520 ms – 1,400 ms | **High (Third-Party Cloud)** | Fails strict air-gapped sovereign VPC |
| **Sovereign vLLM (4x L40S 48GB)** | **$1,650 / month (Fixed reserve)**| **82 ms** | **ZERO (Air-Gapped Private VPC)** | **100% Compliant (GDPR, DPDPA, HIPAA)** |

**The Operational Dividend**: Beyond regulatory survival, dedicated sovereign instances deliver fixed, predictable infrastructure costs that do not balloon with usage, paired with **p95 first-token latencies under 100ms**.

---

## Frequently Asked Questions (FAQ / AEO)

### What is the difference between PagedAttention and standard attention?
Standard attention stores the key-value (KV) cache in contiguous GPU memory blocks sized for the maximum possible sequence length, wasting 60-80% of memory due to fragmentation. PagedAttention divides the KV cache into fixed-size virtual memory pages (like an operating system), allocating blocks dynamically as tokens are generated to eliminate fragmentation and boost throughput by 2-4x.

### Can an air-gapped LLM run without internet connectivity during inference?
Yes. By setting `HF_HUB_OFFLINE=1` and pre-mounting verified model weights from a secure local NVMe mount or private enterprise S3 VPC endpoint, the inference engine operates with zero outbound internet connectivity.

### Why is AWQ preferred over GPTQ for enterprise inference?
AWQ (Activation-Aware Weight Quantization) identifies and protects the salient 1% of weight channels that dominate activation outliers. This preserves model reasoning, code generation, and mathematical accuracy with near-zero perplexity degradation compared to GPTQ, while running at full 4-bit INT4 hardware acceleration.

---

*Botmartz AI Solutions designs defense-grade enterprise AI infrastructure, air-gapped LLM deployments, and sovereign private VPC systems. Explore our solutions at [botmartz.com/insights](https://www.botmartz.com/insights) or enroll in our [Forward Deployed AI Engineering Masterclass](https://classes.botmartz.com).*
