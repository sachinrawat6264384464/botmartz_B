---
title: "Recurrent Neural Networks: LSTM/GRU Internals, Hidden State, and Sequence Packing"
excerpt: "RNNs process sequences by maintaining hidden state. Understand LSTMs' cell state, GRUs' reset/update gates, and how to pack variable-length sequences for efficient batching."
author: Soham Sharma
authorName: Soham Sharma
category: PyTorch
tags: ["PyTorch", "RNN", "LSTM", "GRU", "Sequences"]
status: published
featuredImage: https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: pytorch-mastery
series_slug: pytorch-mastery
series_title: "PyTorch Mastery: From Tensors to Production"
difficulty: intermediate
week: null
day: 7
tools:
  - PyTorch
---

An LSTM maintains two states: hidden state (short-term memory) and cell state (long-term memory). Gates decide what to forget, what to remember, and what to output. This architecture solves the vanishing gradient problem that plagues vanilla RNNs. Understanding the three gates—forget, input, output—and the cell state is the foundation of any sequence modeling work. This post walks through the mechanics and shows how to pack variable-length sequences for efficient GPU batching.

## The LSTM Cell: Gates and State

An LSTM processes one timestep at a time. At each step, it updates two states: hidden state h_t and cell state c_t.

```python
import torch
import torch.nn as nn

# LSTM: sequence of 5 timesteps, 3 features per timestep, hidden size 4
seq_len = 5
input_size = 3
hidden_size = 4
batch_size = 2

x = torch.randn(batch_size, seq_len, input_size)

lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
output, (h_n, c_n) = lstm(x)

print(f"Input shape: {x.shape}")
print(f"Output shape: {output.shape}")  # (batch, seq_len, hidden_size)
print(f"Final hidden state shape: {h_n.shape}")  # (1, batch, hidden_size)
print(f"Final cell state shape: {c_n.shape}")  # (1, batch, hidden_size)
```

**Output:**
```text
Input shape: torch.Tensor([2, 5, 3])
Output shape: torch.Size([2, 5, 4])
Final hidden state shape: torch.Size([1, 2, 4])
Final cell state shape: torch.Size([1, 2, 4])
```

The output contains all hidden states (one per timestep). The final hidden and cell states can be used for the next sequence (in stateful prediction).

### The Four Gates

An LSTM has four gates, each computing a sigmoid or tanh nonlinearity:

1. **Forget gate**: Decides what to forget from the cell state
2. **Input gate**: Decides what to add to the cell state
3. **Cell gate (candidate)**: Candidate values to add
4. **Output gate**: Decides what to output from the hidden state

```python
import torch
import torch.nn as nn

# Manually implement a single LSTM step (simplified)
def lstm_cell_step(x, h_prev, c_prev, weights):
    """One timestep of LSTM."""
    # Concatenate input and previous hidden state
    combined = torch.cat([x, h_prev], dim=1)
    
    # Forget gate: which parts of cell state to forget
    f = torch.sigmoid(combined @ weights['W_f'] + weights['b_f'])
    
    # Input gate: which parts of candidate to add
    i = torch.sigmoid(combined @ weights['W_i'] + weights['b_i'])
    
    # Candidate: new values
    c_tilde = torch.tanh(combined @ weights['W_c'] + weights['b_c'])
    
    # Output gate: which parts of cell state to expose
    o = torch.sigmoid(combined @ weights['W_o'] + weights['b_o'])
    
    # Update states
    c_next = f * c_prev + i * c_tilde  # cell state update
    h_next = o * torch.tanh(c_next)     # hidden state update
    
    return h_next, c_next

# Example usage
batch_size, input_size, hidden_size = 2, 3, 4
x = torch.randn(batch_size, input_size)
h_prev = torch.randn(batch_size, hidden_size)
c_prev = torch.randn(batch_size, hidden_size)

# Initialize weights (normally learned)
weights = {
    'W_f': torch.randn(input_size + hidden_size, hidden_size),
    'b_f': torch.randn(hidden_size),
    'W_i': torch.randn(input_size + hidden_size, hidden_size),
    'b_i': torch.randn(hidden_size),
    'W_c': torch.randn(input_size + hidden_size, hidden_size),
    'b_c': torch.randn(hidden_size),
    'W_o': torch.randn(input_size + hidden_size, hidden_size),
    'b_o': torch.randn(hidden_size),
}

h_next, c_next = lstm_cell_step(x, h_prev, c_prev, weights)
print(f"Hidden state shape: {h_next.shape}")
print(f"Cell state shape: {c_next.shape}")
```

**Output:**
```text
Hidden state shape: torch.Size([2, 4])
Cell state shape: torch.Size([2, 4])
```

The forget gate (f) controls what to keep from the old cell state. The input gate (i) controls what new information to add. This multiplicative structure prevents gradients from vanishing across many timesteps.

## GRU: Simplified LSTM

A GRU (Gated Recurrent Unit) has only two gates (reset and update) and a single hidden state. It's simpler than LSTM but often performs comparably.

```python
import torch
import torch.nn as nn

x = torch.randn(2, 5, 3)  # batch_size=2, seq_len=5, input_size=3

# GRU: same API as LSTM but without cell state
gru = nn.GRU(input_size=3, hidden_size=4, batch_first=True)
output, h_n = gru(x)

print(f"Output shape: {output.shape}")  # (2, 5, 4)
print(f"Final hidden state shape: {h_n.shape}")  # (1, 2, 4)
```

**Output:**
```text
Output shape: torch.Size([2, 5, 4])
Final hidden state shape: torch.Size([1, 2, 4])
```

GRU returns only hidden states (no cell state). It's faster than LSTM and works well for most tasks.

## Variable-Length Sequences: Packing and Padding

Real sequences have different lengths. Padding shorter sequences to a fixed length wastes computation. PyTorch's `pack_padded_sequence` solves this by storing only valid timesteps.

```python
import torch
import torch.nn as nn
from torch.nn.utils.rnn import pack_padded_sequence, pad_packed_sequence

# Variable-length sequences
lengths = torch.tensor([5, 3, 4])  # Actual lengths
batch_size = 3
max_len = 5
hidden_size = 4

# Pad sequences to max_len
x = torch.randn(batch_size, max_len, 3)
# (In practice, shorter sequences are padded with zeros, then reordered by length)

# Pack the padded sequences
packed = pack_padded_sequence(x, lengths.cpu(), batch_first=True, enforce_sorted=False)
print(f"Packed batch size: {packed.batch_sizes}")  # Which timesteps are valid per batch

# Process with RNN
lstm = nn.LSTM(3, hidden_size, batch_first=True)
packed_output, (h_n, c_n) = lstm(packed)

# Unpack
output, output_lengths = pad_packed_sequence(packed_output, batch_first=True)
print(f"Unpacked output shape: {output.shape}")
print(f"Output lengths: {output_lengths}")
```

**Output:**
```text
Packed batch sizes: tensor([3, 3, 3, 2, 1])
Unpacked output shape: torch.Size([3, 5, 4])
Output lengths: tensor([5, 3, 4])
```

Packing avoids computing gradients for padding tokens, making training faster. The batch_sizes tensor shows how many valid sequences exist at each timestep: 3 at t=0, 3 at t=1, etc. This saves computation for shorter sequences.

## Gotchas and Pitfalls

### Gotcha 1: Detached Hidden States Between Sequences

If you process multiple sequences in a loop (not recommended) and want to maintain state between them, you must detach the hidden state. Otherwise, gradients flow too far back in time.

```python
import torch
import torch.nn as nn

lstm = nn.LSTM(input_size=3, hidden_size=4, batch_first=True)

# Sequence 1
x1 = torch.randn(2, 5, 3)
output1, (h1, c1) = lstm(x1)

# Process sequence 2 with hidden state from sequence 1
x2 = torch.randn(2, 4, 3)
output2, (h2, c2) = lstm(x2, (h1, c1))

# Gradients now flow from seq2 back through seq1's hidden state
# This can cause exploding gradients if sequences are long

# FIX: Detach the hidden state
output2, (h2, c2) = lstm(x2, (h1.detach(), c1.detach()))
print("Hidden state detached to break long-range gradient flow")
```

**Fix:** Detach hidden states between independent sequences to keep gradient flow manageable.

## When to Use What

| Architecture | Use |
|--------------|-----|
| LSTM | Sequences with long-range dependencies (text, speech) |
| GRU | Similar to LSTM but faster and simpler |
| Bidirectional | Classification tasks; process sequence both ways |
| Stateful | Streaming/online prediction; maintain state between sequences |

## Conclusion

LSTMs solve the vanishing gradient problem through multiplicative gates that control information flow. Cell state (long-term memory) and hidden state (short-term memory) work together to model long-range dependencies. Packing variable-length sequences avoids wasting computation on padding. Understanding the gating mechanism and how to handle variable lengths separates effective sequence models from buggy, inefficient ones. Next: we'll shift to attention mechanisms, the foundation of modern Transformers.
