# PyTorch Low-Level Primitives vs. Agent Framework Abstractions

*By Botmartz Engineering · What agent frameworks cannot see, and why it matters once you self-host models*

---

## The question this article answers

Agent frameworks such as LangChain, LlamaIndex, CrewAI and AutoGen are good at what they are designed for: wiring prompts, tools, memory and routing into a workflow. They make prototypes fast to build.

But they operate at a particular layer. When a self-hosted model runs out of GPU memory, when time to first token grows with prompt length, or when throughput collapses under concurrent load, the cause is not in the orchestration layer. It lives in the model-serving stack beneath it: memory layout, KV-cache sizing, attention kernels and batching. A framework call like `agent.run(...)` neither controls these nor reports on them.

This article does two things. It draws a precise line between what frameworks do and what the serving stack does, and it walks through the low-level mechanics that decide whether a self-hosted deployment is affordable and stable: tensor memory layout, KV-cache arithmetic, PagedAttention and FlashAttention. Where numbers appear, they are either derived from stated formulas or attributed to the papers that report them.

---

## 1. Where agent frameworks stop

Most agent frameworks are orchestration libraries. They build prompts, parse outputs, call tools, keep conversation state and decide what to do next. They typically reach the model through an HTTP API, either a hosted provider or a self-hosted inference server. They do not run tensor operations themselves.

```python
# This is orchestration. The model call below is an HTTP request;
# no tensors are created or transposed in this process.
agent = Agent(role="Researcher", memory=ConversationBuffer(), tools=[search_tool])
result = agent.run("Summarize this quarter's engineering metrics")
```

That gives you a clean decision rule:

- **If you call hosted model APIs,** the low-level topics below do not apply to you. Your levers are prompt size, caching, model choice and the number of calls your agent makes.
- **If you self-host models,** latency, cost and stability are determined by the serving stack, which the framework cannot observe. You need working knowledge of it, even if you never write a CUDA kernel yourself.

Note what we are *not* saying. Most teams should not hand-write inference code. They should use a mature server such as vLLM, TensorRT-LLM or Hugging Face TGI. But to size hardware, read the metrics and choose settings sensibly, you need to understand the mechanics those servers implement.

---

## 2. Tensor memory layout: shape, strides and contiguity

A PyTorch tensor is a view over a one-dimensional block of storage, described by a shape and a set of strides. The strides say how many elements to skip in storage to advance one step along each dimension.

Take the common attention step of moving the head dimension forward, from `(batch, seq, heads, head_dim)` to `(batch, heads, seq, head_dim)`:

```python
import torch

x = torch.randn(2, 4, 3, 8)        # (batch, seq, heads, head_dim)
print(x.stride())                  # (96, 24, 8, 1): contiguous

y = x.transpose(1, 2)              # (batch, heads, seq, head_dim), a view
print(y.shape, y.stride())         # (2, 3, 4, 8) (96, 8, 24, 1)
print(y.is_contiguous())           # False: no data was moved, only the strides changed

# Some operations need contiguous memory:
# y.view(2, 3, 32)                 # raises an error: strides are incompatible
z = y.contiguous()                 # allocates new memory and copies the data
w = y.reshape(2, 3, 32)            # copies automatically when it has to
```

`transpose` is free because it only rewrites strides. The cost appears when a later operation needs contiguous memory and PyTorch has to allocate a new buffer and copy into it. This is sometimes unavoidable and often negligible next to the matrix multiplications around it. Whether it matters in your system is a question for a profiler, not an assumption:

```python
from torch.profiler import profile, ProfilerActivity

with profile(activities=[ProfilerActivity.CPU, ProfilerActivity.CUDA],
             record_shapes=True) as prof:
    run_one_step()   # your forward pass or generation step

print(prof.key_averages().table(sort_by="cuda_time_total", row_limit=10))
```

If copy or memory-allocation operations appear near the top of that table, you have found a real optimization target. If they do not, leave them alone. This habit of measuring before optimizing is the core skill, more than any specific trick.

---

## 3. KV-cache arithmetic: why concurrency runs out of memory

During autoregressive generation, each new token attends to all previous tokens. To avoid recomputing the key and value projections for every past token at every step, inference engines store them in a **KV cache** in GPU memory. The cache grows with sequence length and with the number of concurrent requests.

For a model stored in 16-bit precision, the cache cost per token is:

$$\text{bytes per token} = 2 \times b \times L \times H_{kv} \times D_{head}$$

where the leading 2 covers keys and values, $b$ is bytes per element (2 for FP16 or BF16), $L$ is the number of layers, $H_{kv}$ is the number of key-value heads and $D_{head}$ is the head dimension.

**Worked example.** Llama 3 70B uses 80 layers, 8 key-value heads (grouped-query attention) and a head dimension of 128:

$$2 \times 2 \times 80 \times 8 \times 128 = 327{,}680 \text{ bytes} = 320\ \text{KiB per token}$$

For one request with a 32,768-token context:

$$32{,}768 \times 327{,}680 \text{ bytes} = 10\ \text{GiB}$$

Eight such requests in flight need 80 GiB for the KV cache alone. Meanwhile, the model weights at 16-bit precision take roughly 140 GB (70 billion parameters at 2 bytes each), so this model already spans multiple GPUs, and the KV cache competes for whatever memory remains after the weights.

Two things follow. First, grouped-query attention (Ainslie et al., 2023) matters economically: with 8 KV heads instead of 64, the cache is 8 times smaller than it would be with full multi-head attention for the same model. Second, a framework prompt that quietly grows the context, for example by appending full conversation history on every agent step, directly increases this memory bill when you self-host. When your server returns out-of-memory errors under load, the fix is in context length limits, cache quantization (such as FP8 KV cache in servers that support it), or capacity, and it will not be found in the prompt template.

---

## 4. PagedAttention: fixing KV-cache fragmentation

Earlier serving systems typically reserved a contiguous region of GPU memory for each request's KV cache sized to the maximum possible sequence length. A request that stops early leaves the unused remainder stranded, and varying request lengths leave gaps that cannot be reused. This is internal and external fragmentation.

```
Contiguous reservation (older approach):
[ Request 1: used |------ reserved but unused ------ ]
[ Request 2: used |---------- reserved but unused --- ]
```

**PagedAttention**, introduced with vLLM (Kwon et al., SOSP 2023), borrows the idea of virtual memory paging from operating systems. The KV cache is divided into fixed-size blocks (16 tokens by default in vLLM), a per-request block table maps logical positions to physical blocks, and blocks need not be contiguous.

```
Physical KV blocks (non-contiguous):  [B0] [B1] [B2] [B3] ...
Block table for request A:  logical 0 → B0,  logical 1 → B2,  logical 2 → B1
```

The paper reports that existing systems used only a fraction of their reserved KV-cache memory for actual token states, that PagedAttention reduces waste to under about 4 percent, and that vLLM improves throughput by roughly 2 to 4 times over systems such as FasterTransformer and Orca at the same latency. Those figures are the authors' measurements on their workloads and hardware; your gain will depend on request-length distribution, model and GPU. It is a result worth knowing and a number worth re-measuring.

---

## 5. Attention kernels: the bottleneck is memory traffic

Scaled dot-product attention is simple to write:

$$\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d_k}}\right)V$$

A direct implementation materializes the full $N \times N$ score matrix per head:

```python
scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)   # [B, H, N, N]
weights = torch.softmax(scores, dim=-1)                          # [B, H, N, N]
out = torch.matmul(weights, V)                                   # [B, H, N, D]
```

For a sequence of 16,384 tokens, each head's score matrix has $16{,}384^2 \approx 268$ million entries. On modern GPUs, the limiting factor for such operations is often not arithmetic throughput but **memory bandwidth**: moving those matrices between large, slower high-bandwidth memory (HBM) and small, fast on-chip SRAM. The FlashAttention paper (Dao et al., 2022) cites roughly 1.5 to 2 TB/s for HBM versus about 19 TB/s for SRAM on an A100.

**FlashAttention** restructures the computation. It processes Q, K and V in tiles that fit in SRAM and uses an online softmax that keeps running normalization statistics, so the full score matrix is never written to HBM. Two precise statements are worth knowing, because they are often garbled:

- **Memory:** the extra memory for attention becomes linear in sequence length rather than quadratic, because the $N \times N$ matrix is never stored.
- **Compute:** the arithmetic remains quadratic in sequence length. FlashAttention is *exact* attention, not an approximation, and it saves time by reducing HBM reads and writes, not by doing fewer floating-point operations. Its HBM traffic scales as $\Theta(N^2 d^2 / M)$, where $M$ is SRAM size, versus $\Theta(Nd + N^2)$ for the standard implementation.

The speedups depend on workload and hardware. The original paper reports, among other results, roughly 3 times faster end-to-end GPT-2 training at sequence length 1K and a 15 percent end-to-end speedup on BERT-large, and FlashAttention-2 (Dao, 2023) reports about twice the speed of its predecessor. These are reported results on specific setups.

In PyTorch you rarely call these kernels directly. `scaled_dot_product_attention` selects among several backends (FlashAttention, memory-efficient attention, a cuDNN fused kernel on supported hardware, or a plain math fallback) based on dtype, GPU architecture, head dimension and masking:

```python
import torch.nn.functional as F
from torch.nn.attention import sdpa_kernel, SDPBackend

out = F.scaled_dot_product_attention(q, k, v, is_causal=True)

# To verify which backend you are actually getting, force one.
# It raises an error if that backend cannot run with your inputs.
with sdpa_kernel(SDPBackend.FLASH_ATTENTION):
    out = F.scaled_dot_product_attention(q, k, v, is_causal=True)
```

The forcing trick is useful as a check: FlashAttention in PyTorch generally requires half-precision inputs (FP16 or BF16), so a model silently running in FP32 will not get it.

---

## 6. Mapping symptoms to causes

When a self-hosted deployment misbehaves, this table is a better starting point than the agent framework's logs:

| Symptom | Likely layer | First things to check |
| :--- | :--- | :--- |
| CUDA out-of-memory under concurrent load | KV-cache sizing | Context length limits, number of concurrent sequences, KV-cache dtype, GPU memory utilization setting, and the formula in section 3 |
| Time to first token grows with prompt length | Prefill compute and attention kernel | Whether an efficient attention backend is active, prompt size growth from agent history, chunked-prefill options |
| Throughput collapses as requests increase | Batching and memory management | Continuous batching, KV-cache fragmentation, maximum concurrent sequences |
| Latency spikes at the 99th percentile | Queueing and scheduling | Request queue depth, preemption events, prompt-length outliers |
| High cost per request | Hardware sizing and context growth | Model size, quantization, context trimming, caching of repeated prefixes |

Inference servers expose metrics for most of these. Reading them requires only the vocabulary above.

---

## Frequently asked questions

### Do agent frameworks like LangChain run PyTorch operations?
No. They are orchestration libraries that build prompts, call tools and manage state. Model computation happens in the model provider's infrastructure or in your own inference server, reached over an API.

### When do low-level GPU details matter for an AI product?
When you self-host models. With hosted APIs, the provider handles memory, batching and kernels. With self-hosting, KV-cache sizing, batching and attention kernels determine capacity, latency and cost.

### How do I estimate KV-cache memory for a model?
Multiply 2 (keys and values) by bytes per element, layers, KV heads and head dimension to get bytes per token, then multiply by tokens per sequence and by concurrent sequences. For Llama 3 70B in 16-bit precision, that is 320 KiB per token.

### What is PagedAttention and why does it matter?
PagedAttention stores the KV cache in fixed-size blocks mapped through a per-request block table, avoiding the fragmentation of contiguous reservations. In vLLM it lets a GPU serve more concurrent requests. The vLLM authors report 2 to 4 times higher throughput than earlier systems at the same latency on their benchmarks.

### Is FlashAttention an approximation?
No. It computes exact attention with a different memory-access pattern, reducing slow memory traffic and the memory needed for the score matrix. The arithmetic cost stays quadratic in sequence length.

---

## Conclusion

Agent frameworks and the GPU serving stack solve different problems at different layers, and confusing them leads to fixing the wrong thing. If you use hosted APIs, optimize prompts, caching and call counts. If you self-host, learn enough of the lower layer to size memory with real arithmetic, to profile before optimizing, and to read your server's metrics. You do not need to write kernels, but you do need to know which layer your problem lives in.

**Planning a self-hosted or private deployment?** If you are sizing GPUs, choosing an inference server, or diagnosing latency and memory problems in a self-hosted LLM stack, [talk to our engineering team](https://www.botmartz.com/contact).

---

### References

1. Kwon, W. et al. *Efficient Memory Management for Large Language Model Serving with PagedAttention.* SOSP 2023.
2. Dao, T., Fu, D., Ermon, S., Rudra, A., and Ré, C. *FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness.* NeurIPS 2022.
3. Dao, T. *FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning.* ICLR 2024.
4. Ainslie, J. et al. *GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints.* EMNLP 2023.
5. PyTorch documentation: `torch.nn.functional.scaled_dot_product_attention`, `torch.nn.attention.sdpa_kernel`, `torch.profiler`.
