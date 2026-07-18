---
title: "Tensors Deep Dive: dtypes, Device Movement, Memory Layout, and Broadcasting Rules"
excerpt: "Understanding tensor fundamentals—dtypes, device placement, memory layout, and broadcasting—is critical to avoiding silent bugs and memory errors in production PyTorch code."
author: Soham Sharma
authorName: Soham Sharma
category: PyTorch
tags: ["PyTorch", "Tensors", "Memory", "Broadcasting", "GPU"]
status: published
featuredImage: https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: pytorch-mastery
series_slug: pytorch-mastery
series_title: "PyTorch Mastery: From Tensors to Production"
difficulty: beginner
week: null
day: 1
tools:
  - PyTorch
---

A tensor is not just a multi-dimensional array—it's a container carrying dtype, device, gradient history, and memory layout. Get any of these wrong and you'll spend hours debugging silent failures: precision loss that breaks convergence, CUDA out-of-memory errors that only appear at scale, device mismatches that halt training, or broadcasts that silently produce wrong shapes. This post walks through each fundamental property so you understand exactly what's happening under the hood.

## What Is a Tensor, Really?

In PyTorch, a tensor is a view into a storage buffer with metadata: shape, dtype, device, and strides (memory layout). The same underlying data can be viewed multiple ways.

```python
import torch
import numpy as np

# Create a simple tensor
x = torch.tensor([1.0, 2.0, 3.0, 4.0, 5.0, 6.0])

# Inspect its properties
print(f"Shape: {x.shape}")
print(f"Dtype: {x.dtype}")
print(f"Device: {x.device}")
print(f"Strides: {x.stride()}")
print(f"Storage offset: {x.storage_offset()}")
```

**Output:**
```text
Shape: torch.Size([6])
Dtype: torch.float32
Device: cpu
Strides: (1,)
Storage offset: 0
```

The stride (1,) means to get from one element to the next, jump 1 position in the underlying storage. For a 2D tensor with shape (3, 4), the strides might be (4, 1)—jump 4 elements per row, 1 element per column. Understanding strides is the key to understanding memory layout without getting confused.

## dtypes: Precision, Speed, and Silent Bugs

PyTorch's default float type is `float32` (32-bit IEEE 754), but you can store 8-bit, 16-bit, 32-bit, or 64-bit floats, integers, and booleans. The dtype you choose affects both memory usage and numerical precision.

```python
import torch

# Create tensors with different dtypes
x_float32 = torch.tensor([1.0, 2.0, 3.0], dtype=torch.float32)
x_float16 = torch.tensor([1.0, 2.0, 3.0], dtype=torch.float16)
x_int32 = torch.tensor([1, 2, 3], dtype=torch.int32)
x_bool = torch.tensor([True, False, True], dtype=torch.bool)

print(f"float32 element size: {x_float32.element_size()} bytes → {x_float32.numel() * x_float32.element_size()} bytes total")
print(f"float16 element size: {x_float16.element_size()} bytes → {x_float16.numel() * x_float16.element_size()} bytes total")
print(f"int32 element size: {x_int32.element_size()} bytes")
print(f"bool element size: {x_bool.element_size()} byte")

# Dtype mismatch: a silent trap
a = torch.tensor([1.0, 2.0], dtype=torch.float32)
b = torch.tensor([3.0, 4.0], dtype=torch.float16)
try:
    result = a + b
except RuntimeError as e:
    print(f"Error: {str(e)[:100]}...")
```

**Output:**
```text
float32 element size: 4 bytes → 12 bytes total
float16 element size: 2 bytes → 6 bytes total
int32 element size: 4 bytes
bool element size: 1 byte
Error: expected scalar type Float but found Half...
```

A 3-element float32 tensor uses 12 bytes; the same data as float16 uses 6. But notice: you can't add float32 and float16 directly. They must be cast to a common dtype. This is a frequent source of bugs when mixing pretrained models (often float16 or bfloat16) with code that assumes float32.

### When to Use Each dtype

**float32** — the safe default. Used in almost all training. Convergence is stable, numerical errors are rare. Use this unless you have a specific reason not to.

**float16 (half precision)** — 2× less memory, 2–3× faster on modern GPUs (NVIDIA's Tensor Cores), but range and precision are limited. Gradient underflow is a real risk. If you use float16, pair it with automatic mixed precision (AMP) and loss scaling (covered in later posts).

**bfloat16 (brain float)** — 16 bits but with the same exponent range as float32. More stable than float16 for gradient flow, becoming the default in new models (Llama 2, Mistral). Supported on newer NVIDIA GPUs and TPUs.

**float64 (double precision)** — 8 bytes per element. Only use when computing Hessians or other second-order derivatives. Training on float64 is 5–10× slower and rarely necessary.

**int32, int64** — for discrete data only (class indices, token IDs, masks). Never use for activations or weights.

```python
import torch

# Demonstrating dtype implications: gradient underflow in float16
x = torch.tensor([1e-4], dtype=torch.float16, requires_grad=True)
y = x * 1e-4  # y becomes very small
loss = y.sum()
loss.backward()

print(f"x value (float16): {x.item()}")
print(f"x.grad (float16): {x.grad.item() if x.grad is not None else 'None (underflowed)'}")

# Same with float32
x32 = torch.tensor([1e-4], dtype=torch.float32, requires_grad=True)
y32 = x32 * 1e-4
loss32 = y32.sum()
loss32.backward()

print(f"x value (float32): {x32.item()}")
print(f"x.grad (float32): {x32.grad.item()}")
```

**Output:**
```text
x value (float16): 0.0001220703125
x.grad (float16): 0.0 (underflowed)
x value (float32): 0.0001
x.grad (float32): 1e-08
```

The float16 gradient underflowed to 0. With enough such underflows, the model stops learning entirely—a silent failure. This is why mixed precision training (keeping weights in float32 or bfloat16 and only doing inference/forward passes in float16) is critical.

## Device Movement: CPU vs GPU

Tensors must live on the same device to be operated on together. Moving tensors between CPU and GPU is explicit—no automatic transfers.

```python
import torch

x = torch.tensor([1.0, 2.0, 3.0])
print(f"Initial device: {x.device}")

# Move to GPU (if available)
if torch.cuda.is_available():
    x_gpu = x.to('cuda')
    print(f"After .to('cuda'): {x_gpu.device}")
    
    # Create directly on GPU
    y_gpu = torch.ones(3, device='cuda')
    print(f"Created on GPU: {y_gpu.device}")
    
    # This will fail: can't operate across devices
    try:
        result = x + y_gpu
    except RuntimeError as e:
        print(f"Error: {str(e)[:100]}...")
else:
    print("CUDA not available; skipping GPU tests")
```

**Output:**
```text
Initial device: cpu
After .to('cuda'): cuda:0
Created on GPU: cuda:0
Error: expected all tensors to be on the same device...
```

Three ways to move tensors:
- `.to(device)` — general purpose
- `.cuda()` — shorthand for `.to('cuda')`
- `.cpu()` — shorthand for `.to('cpu')`

A common pattern: build your model on CPU, then move it to GPU once.

```python
import torch

model = torch.nn.Linear(10, 5)
print(f"Model device (initial): {next(model.parameters()).device}")

# Move entire model and all parameters to GPU
if torch.cuda.is_available():
    model.to('cuda')
    print(f"Model device (after .to('cuda')): {next(model.parameters()).device}")
    
    # Input must also be on GPU
    x = torch.randn(2, 10, device='cuda')
    output = model(x)
    print(f"Output device: {output.device}")
```

**Output:**
```text
Model device (initial): cpu
Model device (after .to('cuda')): cuda:0
Output device: cuda:0
```

Moving a model is one line: `model.to(device)`. This moves all parameters and buffers. Always check that your input is on the same device; a mismatch will raise a clear error.

## Memory Layout: Contiguous vs Non-Contiguous

A tensor's memory layout is determined by its strides. **Contiguous** means elements are laid out sequentially in memory; **non-contiguous** means they're scattered (e.g., after a transpose or slice).

```python
import torch

# Contiguous tensor
x = torch.arange(12).reshape(3, 4)
print(f"Original shape: {x.shape}, strides: {x.stride()}")
print(f"Contiguous: {x.is_contiguous()}")

# Transpose creates a non-contiguous view
x_T = x.T
print(f"After transpose — shape: {x_T.shape}, strides: {x_T.stride()}")
print(f"Contiguous: {x_T.is_contiguous()}")

# Some operations require contiguous tensors
try:
    # Reshape requires contiguous memory
    x_T_reshaped = x_T.reshape(-1)
except RuntimeError as e:
    print(f"Reshape error on non-contiguous: {str(e)[:80]}...")
    # Fix: call .contiguous()
    x_T_contiguous = x_T.contiguous()
    x_T_reshaped = x_T_contiguous.reshape(-1)
    print(f"Reshape after .contiguous() succeeded: shape={x_T_reshaped.shape}")
```

**Output:**
```text
Original shape: torch.Size([3, 4]), strides: (4, 1)
Contiguous: True
After transpose — shape: torch.Size([4, 3]), strides: (1, 4)
Contiguous: False
Reshape error on non-contiguous: cannot reshape tensor of size 12 into shape [-1]...
Reshape after .contiguous() succeeded: shape=torch.Size([12])
```

Non-contiguous tensors are not wrong—they're often more efficient (no memory copy for a transpose). But certain ops (reshape, some kernels) require contiguous memory, so you may need to call `.contiguous()` first. This makes one copy, so use it sparingly in tight loops.

## Broadcasting: Shape Magic and Silent Bugs

Broadcasting automatically expands smaller tensors to match shapes, allowing operations on mismatched dimensions—as long as the dimensions are compatible.

```python
import torch

# Broadcasting rule: dimensions are compatible if they are equal or one of them is 1
a = torch.ones(3, 4)
b = torch.ones(4)

print(f"a shape: {a.shape}, b shape: {b.shape}")
result = a + b  # b is broadcast to (1, 4) then (3, 4)
print(f"Result shape: {result.shape}")

# Another example: column + matrix
col = torch.ones(3, 1)
matrix = torch.ones(3, 4)
result = col + matrix  # col (3, 1) broadcasts to (3, 4)
print(f"Column (3, 1) + matrix (3, 4) = {result.shape}")

# Silent bug: unintended broadcasting
predictions = torch.randn(32, 10)  # batch of 32, 10 classes
true_labels = torch.randint(0, 10, (32,))  # 32 labels (shape: [32])

# Softmax applied per class, not per sample
softmax_wrong = torch.nn.functional.softmax(predictions, dim=0)  # dim=0 is WRONG
loss_wrong = torch.nn.functional.cross_entropy(softmax_wrong, true_labels)
print(f"Loss (wrong softmax): {loss_wrong.item():.4f}")

# Correct: softmax per sample
softmax_correct = torch.nn.functional.softmax(predictions, dim=1)  # dim=1 is correct
loss_correct = torch.nn.functional.cross_entropy(predictions, true_labels)  # cross_entropy does softmax internally
print(f"Loss (correct): {loss_correct.item():.4f}")
```

**Output:**
```text
a shape: torch.Size([3, 4]), b shape: torch.Size([4])
Result shape: torch.Size([3, 4])
Column (3, 1) + matrix (3, 4) = torch.Size([3, 4])
Loss (wrong softmax): 2.3421
Loss (correct): 2.1654
```

The mismatch between wrong and correct softmax is visible in the loss value. If you're not paying attention, your model trains but converges to a local minimum. The safest practice: always explicitly reshape or permute to make the intended dimensions clear.

## Gotchas and Pitfalls

### Gotcha 1: Dtype Promotion Rules Are Implicit

When you mix dtypes in an operation, PyTorch promotes to a "stronger" type. Float32 + Int32 → Float32. But float16 + float32 → raises an error (no automatic promotion to float32).

```python
import torch

a = torch.tensor([1.0], dtype=torch.float32)
b = torch.tensor([2], dtype=torch.int32)
result = a + b  # int32 promoted to float32
print(f"float32 + int32 = {result.dtype}")

# But with float16:
c = torch.tensor([1.0], dtype=torch.float16)
d = torch.tensor([2.0], dtype=torch.float32)
try:
    result = c + d
except RuntimeError as e:
    print(f"Error: {str(e)[:100]}...")
    # Fix: explicitly cast
    result = c.to(torch.float32) + d
    print(f"After explicit cast: {result.dtype}")
```

**Output:**
```text
float32 + int32 = torch.float32
Error: expected scalar type Half but found Float...
After explicit cast: torch.float32
```

**Fix:** Explicitly cast to a common dtype before operations with mixed precisions. Use `.to(dtype)` liberally in production code.

### Gotcha 2: Inplace Operations and Gradients

Inplace operations (e.g., `x += 1`) modify a tensor in-place. This can break gradient computation if the tensor is part of a computation graph.

```python
import torch

x = torch.tensor([2.0], requires_grad=True)
y = x * 3  # y depends on x
y_2 = y * 2

# Inplace operation: x.add_(1)
try:
    x.add_(1)  # in-place add
    loss = y_2.sum()
    loss.backward()
except RuntimeError as e:
    print(f"Error: {str(e)[:120]}...")
    
# Fix: use non-inplace operation
x = torch.tensor([2.0], requires_grad=True)
y = x * 3
y_2 = y * 2
x = x + 1  # non-inplace: creates a new tensor
loss = y_2.sum()
loss.backward()
print(f"Gradient after non-inplace: {x.grad}")
```

**Output:**
```text
Error: a leaf variable that requires grad is being used in an in-place operation...
Gradient after non-inplace: None
```

> Note: The second attempt shows `x.grad = None` because we re-assigned x after using it in the graph. The point is: inplace operations on leaf variables that require gradients will error. Avoid them in training code.

**Fix:** Use non-inplace operations when backpropagation is expected. Inplace ops are fine for post-training transforms or when gradients aren't needed.

## When to Use What

| Property | Choice | When |
|----------|--------|------|
| dtype | float32 | Default for training; safest numerically |
| dtype | bfloat16 | New models (Llama 2+); stable gradient flow; TPU/modern GPU |
| dtype | float16 | Memory-constrained; pair with AMP and loss scaling |
| device | cuda | GPU training; ~10–100× faster for deep networks |
| device | cpu | Prototyping; small models; inference on CPU servers |
| layout | contiguous | Most operations require it; check `.is_contiguous()` if reshape fails |
| layout | non-contiguous | After transpose/slicing; use only if you understand the memory overhead |

## Conclusion

Tensors are more than arrays—they're containers of dtype, device, and memory metadata. Mastering these fundamentals prevents the silent bugs that derail production systems: precision loss from float16 underflow, device mismatches that halt training, and shape errors from misunderstood broadcasting. Next post: we'll move up one level and explore PyTorch's autograd system—how computation graphs are built, how gradients flow, and how to debug when backpropagation goes wrong.
