---
title: "Advanced SNNs: Recurrent Spiking Networks and Temporal Dynamics"
excerpt: "Feedforward SNNs have limited memory. Recurrent SNNs maintain state across timesteps, enabling temporal pattern learning. Understand LSTM-like mechanisms in spiking networks."
author: Soham Sharma
authorName: Soham Sharma
category: Spiking Neural Networks
tags: ["SNNs", "Recurrent Networks", "Temporal Processing", "Memory"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: snn-mastery
series_slug: snn-mastery
series_title: "Spiking Neural Networks: Neuromorphic Computing and Efficiency"
difficulty: advanced
week: null
day: 3
tools:
  - Deep Learning
---

Feedforward SNNs process one timestep at a time (no inter-step communication). Recurrent SNNs have connections between timesteps, enabling temporal dynamics. Add gating mechanisms (inspired by LSTMs) to SNNs, and you get powerful temporal learning with neuromorphic efficiency.

## Recurrent SNN Architecture

```
Standard SNN:
x_t → Neuron → spike_t
(no memory between timesteps)

Recurrent SNN:
x_t + hidden_{t-1} → Neuron → spike_t, hidden_t
(hidden state carries information forward)
```

## Implementation: Spiking LSTM-like Unit

```python
import torch
import torch.nn as nn

class RecurrentLIFCell(nn.Module):
    def __init__(self, input_size, hidden_size, leak=0.99):
        super().__init__()
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.leak = leak
        
        # Input to hidden
        self.W_x = nn.Linear(input_size, hidden_size)
        
        # Hidden to hidden (recurrence)
        self.W_h = nn.Linear(hidden_size, hidden_size)
        
        # Membrane potential
        self.V = None
    
    def forward(self, x, hidden=None):
        """
        x: (batch, input_size)
        hidden: (batch, hidden_size) previous state
        
        Returns: spike (batch, hidden_size), new_hidden
        """
        if hidden is None:
            hidden = torch.zeros(x.size(0), self.hidden_size, device=x.device)
        
        if self.V is None:
            self.V = torch.zeros_like(hidden)
        
        # Input current + recurrent input
        current = self.W_x(x) + self.W_h(hidden)
        
        # Integrate
        self.V = self.leak * self.V + current
        
        # Generate spike
        spike = (self.V >= 1.0).float()
        
        # Reset
        self.V = self.V * (1 - spike)
        
        return spike, spike  # spike becomes new hidden state


class RecurrentSNN(nn.Module):
    def __init__(self, input_size, hidden_size, output_size, num_layers=2):
        super().__init__()
        self.num_layers = num_layers
        self.hidden_size = hidden_size
        
        # Recurrent layers
        self.cells = nn.ModuleList([
            RecurrentLIFCell(
                input_size if i == 0 else hidden_size,
                hidden_size,
                leak=0.99
            )
            for i in range(num_layers)
        ])
        
        # Output layer
        self.output = nn.Linear(hidden_size, output_size)
    
    def forward(self, x):
        """
        x: (batch, seq_len, input_size)
        
        Returns: (batch, output_size)
        """
        batch_size, seq_len, input_size = x.shape
        
        # Process sequence
        hidden = [torch.zeros(batch_size, self.hidden_size) for _ in range(self.num_layers)]
        outputs = []
        
        for t in range(seq_len):
            x_t = x[:, t, :]  # (batch, input_size)
            
            # Forward through layers
            for layer_idx, cell in enumerate(self.cells):
                spike, hidden[layer_idx] = cell(x_t if layer_idx == 0 else spike, hidden[layer_idx])
            
            # Decode output
            output = self.output(spike)
            outputs.append(output)
        
        # Average over time
        final_output = torch.stack(outputs, dim=1).mean(dim=1)
        return final_output


# Training
snn = RecurrentSNN(input_size=28*28, hidden_size=128, output_size=10, num_layers=2)
optimizer = torch.optim.Adam(snn.parameters(), lr=1e-3)
criterion = nn.CrossEntropyLoss()

for epoch in range(10):
    for images, labels in train_loader:
        # Convert image to spike train (Poisson)
        spike_train = (torch.rand(images.size(0), 20, 28*28) < images.unsqueeze(1) / 255.0).float()
        
        output = snn(spike_train)
        loss = criterion(output, labels)
        
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
```

## Temporal Pattern Learning

Recurrent SNNs can learn patterns like:
- Sequences (speech, time series)
- Spatiotemporal events (video, action)
- Context-dependent decisions

## Conclusion

Recurrent SNNs add temporal dynamics to spiking networks. Combining recurrence with surrogate gradients enables training complex temporal models with neuromorphic efficiency. These networks are the future of event-based sensor processing. Next: neuromorphic hardware (Intel Loihi, IBM TrueNorth).
