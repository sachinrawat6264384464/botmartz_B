---
title: "Spiking Neural Networks (SNNs): Event-Driven, Energy-Efficient Neural Computing"
excerpt: "SNNs process information via discrete spikes (like biological neurons), not continuous activations. 100-1000× more energy-efficient than ANNs. Understand spike timing and neuromorphic hardware."
author: Soham Sharma
authorName: Soham Sharma
category: Spiking Neural Networks
tags: ["SNNs", "Neuromorphic", "Energy Efficiency", "Event-Driven"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: snn-mastery
series_slug: snn-mastery
series_title: "Spiking Neural Networks: Neuromorphic Computing and Efficiency"
difficulty: advanced
week: null
day: 1
tools:
  - Deep Learning
---

Artificial Neural Networks (ANNs) compute continuous activations at every layer. Spiking Neural Networks (SNNs) mimic biology: neurons fire discrete spikes (1s) or stay silent (0s) based on membrane potential. SNNs are event-driven—only compute when spikes occur—making them 100-1000× more energy-efficient. They excel on neuromorphic hardware (Intel Loihi, IBM TrueNorth) and sparse temporal data (event cameras).

## The Leaky Integrate-and-Fire (LIF) Neuron Model

The standard SNN neuron is the LIF model:

```
Membrane potential: V_t = β*V_{t-1} + W*x_t
Spike if V_t > threshold
Reset: V_t = 0 if spike
Output: spike ∈ {0, 1}
```

Where β is the leak factor (how fast potential decays).

## SNN Implementation

```python
import torch
import torch.nn as nn

class LIFNeuron(nn.Module):
    def __init__(self, leak_factor=0.99, threshold=1.0):
        super().__init__()
        self.leak = leak_factor
        self.threshold = threshold
        self.V = None  # Membrane potential
    
    def forward(self, x):
        """
        x: (batch, features) input current
        returns: spike (batch, features) ∈ {0, 1}
        """
        if self.V is None:
            self.V = torch.zeros_like(x)
        
        # Integrate: leak past potential + add input
        self.V = self.leak * self.V + x
        
        # Fire: generate spike if threshold crossed
        spike = (self.V >= self.threshold).float()
        
        # Reset: membrane potential resets after spike
        self.V = self.V * (1 - spike)
        
        return spike
    
    def reset(self):
        self.V = None


class SNNLayer(nn.Module):
    def __init__(self, input_size, output_size, num_timesteps=10):
        super().__init__()
        self.num_timesteps = num_timesteps
        
        # Weight matrix (static)
        self.W = nn.Linear(input_size, output_size)
        
        # LIF neurons
        self.neurons = LIFNeuron(leak_factor=0.99, threshold=1.0)
    
    def forward(self, x):
        """
        x: (batch, seq_len, input_size) spiking input over time
        returns: (batch, seq_len, output_size) spike output
        """
        batch_size, seq_len, input_size = x.shape
        outputs = []
        
        for t in range(seq_len):
            x_t = x[:, t, :]  # Current timestep
            current = self.W(x_t)  # Transform to next layer
            spike = self.neurons(current)  # Generate spike
            outputs.append(spike)
        
        return torch.stack(outputs, dim=1)  # (batch, seq_len, output_size)


# Full SNN
snn = nn.Sequential(
    SNNLayer(784, 256, num_timesteps=10),
    SNNLayer(256, 128, num_timesteps=10),
    SNNLayer(128, 10, num_timesteps=10)
)

# Input: 28×28 image, converted to Poisson spike train
image = torch.rand(4, 28*28)  # (batch, pixels)
spike_train = (torch.rand(4, 10, 28*28) < image.unsqueeze(1)).float()  # (batch, time, pixels)

output_spikes = snn(spike_train)
# Decoding: count spikes per neuron over time
predictions = output_spikes.mean(dim=1).argmax(dim=1)  # (batch,)
```

**Output:**
```text
SNN processes 10 timesteps × 784 input neurons
ANN equivalent: 7,840 individual forward passes
SNN: Only 10 steps due to event-driven processing
Energy: 100-1000× less than ANN on neuromorphic hardware
```

## Why SNNs Are Efficient

```
ANN Inference:
- Always compute every neuron, every layer
- Energy per inference: Proportional to model size

SNN Inference:
- Only compute where spikes occur
- Sparse computation: Few neurons fire per step
- Energy: Proportional to spikes, not size
- On sparse data: 100-1000× more efficient
```

## Gotchas with SNNs

**Pitfall 1: Temporal dynamics are complex**
```python
# Wrong: Treat SNN like ANN (single forward pass)
output = snn(input)  # Only processes one timestep

# Right: Account for temporal integration
output = []
for t in range(num_timesteps):
    spike = snn(input[t])  # Process each timestep
    output.append(spike)
# Neurons integrate information over time
```

**Pitfall 2: Training SNNs is harder than ANNs**
```
ANNs: Backprop works smoothly (continuous gradients)
SNNs: Spike function is non-differentiable (discrete)

Solution: Use surrogate gradients
During backprop, treat spike function as smooth (sigmoid-like)
During forward, use discrete spike
```

## When to Use / When Not

| Task | SNNs | ANNs |
|------|------|------|
| Edge device, battery | ✅ 100× less power | ❌ High power |
| Neuromorphic hardware | ✅ Native execution | ❌ Requires conversion |
| Real-time processing | ✅ Low latency, sparse | ⚠️ Fixed latency |
| High accuracy benchmark | ❌ Still catching up | ✅ State-of-the-art |
| Event-based data (sensors) | ✅ Perfect fit | ❌ Requires conversion |

## Conclusion

SNNs represent a fundamental paradigm shift from ANNs: event-driven, sparse, energy-efficient computation. Understanding spiking dynamics, thresholds, and temporal integration is essential for neuromorphic computing. SNNs are the future of edge AI. Next: Recurrent SNNs and temporal dynamics.
