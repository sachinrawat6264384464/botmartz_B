---
title: "Model Serving and Deployment: vLLM, TGI, Ollama, and On-Device Inference"
excerpt: "Deploying LLMs requires specialized frameworks. vLLM and TGI optimize throughput with batching and paging. Ollama runs models locally. Choose based on latency/throughput needs."
author: Soham Sharma
authorName: Soham Sharma
category: LLMs
tags: ["LLMs", "Deployment", "vLLM", "Inference Serving"]
status: published
featuredImage: https://images.unsplash.com/photo-1677422446511-6b13b8a4f0f6?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: llms-mastery
series_slug: llms-mastery
series_title: "Large Language Models: Architecture, Training, and Deployment"
difficulty: advanced
week: null
day: 6
tools:
  - LLMs
---

Serving LLMs requires specialized infrastructure. vLLM batches requests and pages KV cache. TGI (Text Generation Inference) optimizes throughput. Ollama runs models locally. Each framework optimizes different objectives: latency vs. throughput.

## vLLM: High-Throughput Serving

vLLM batches requests and uses paged attention (like virtual memory for KV cache) to support high throughput.

```bash
# Start vLLM server
python -m vllm.entrypoints.openai_api_server \
    --model meta-llama/Llama-2-7b \
    --tensor-parallel-size 2 \
    --gpu-memory-utilization 0.9
```

## TGI: Text Generation Inference

TGI optimizes latency with continuous batching and speculative decoding.

```bash
# Start TGI server
docker run --gpus all -p 8080:80 -v $MODEL_DIR:/data ghcr.io/huggingface/text-generation-inference:latest
```

## Ollama: On-Device Inference

Run models locally without cloud infrastructure.

```bash
# Install and run
ollama pull llama2
ollama run llama2 "What is 2+2?"
```

Ollama is ideal for privacy-sensitive applications, offline use, and development.

## Conclusion

Model serving frameworks enable production LLM deployment. vLLM and TGI optimize cloud serving; Ollama enables local inference. Choosing the right framework depends on latency/throughput requirements and deployment constraints. Next: monitoring and observability for production LLM systems.
