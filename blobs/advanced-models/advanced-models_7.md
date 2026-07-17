---
title: "Advanced Model: Diffusion Models — Generative Modeling via Reverse Diffusion"
excerpt: "Diffusion models beat GANs: add noise to data iteratively, then learn to reverse. Simple, stable, and generates high-quality images. Powers DALL-E, Stable Diffusion."
author: Soham Sharma
authorName: Soham Sharma
category: Advanced Models
tags: ["Diffusion Models", "Generative", "Image Generation", "Probabilistic"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: advanced-models-frontier
series_slug: advanced-models-frontier
series_title: "Advanced Model Architectures: Beyond Transformers"
difficulty: advanced
week: null
day: 7
tools:
  - Deep Learning
---

Diffusion models take a different approach to generative modeling than GANs. Instead of learning a generator directly, they learn to reverse a diffusion process: iteratively remove noise from random noise. This simple process generates high-quality images and is more stable than GANs.

## Diffusion Process

```
Forward (diffusion):
x_0 (real image) → add noise → x_1 → add noise → ... → x_T (pure noise)

Reverse (generation):
x_T (pure noise) → remove noise → x_{T-1} → ... → x_0 (generated image)

Learning: Train network to predict removed noise at each step
```

## Mathematical Formulation

```
Forward process (known):
q(x_t | x_0) = N(x_t; sqrt(1-β_t) * x_{t-1}, β_t * I)

Reverse process (learn):
p_θ(x_{t-1} | x_t) ≈ N(x_{t-1}; μ_θ(x_t, t), Σ_θ(x_t, t))

Loss: Predict noise added at each step
L = E[||ε - ε_θ(x_t, t)||^2]
```

## Implementation

```python
import torch
import torch.nn as nn
import math

class DiffusionModel(nn.Module):
    def __init__(self, image_channels=3, time_channels=128, hidden_channels=64):
        super().__init__()
        self.image_channels = image_channels
        
        # Timestep embedding
        self.time_embed = nn.Sequential(
            nn.Linear(1, time_channels),
            nn.SiLU(),
            nn.Linear(time_channels, time_channels)
        )
        
        # U-Net-like architecture
        self.encoder = nn.Sequential(
            nn.Conv2d(image_channels + time_channels, hidden_channels, 3, padding=1),
            nn.ReLU(),
            nn.Conv2d(hidden_channels, hidden_channels, 3, padding=1),
            nn.ReLU()
        )
        
        self.decoder = nn.Sequential(
            nn.Conv2d(hidden_channels, hidden_channels, 3, padding=1),
            nn.ReLU(),
            nn.Conv2d(hidden_channels, image_channels, 3, padding=1)
        )
    
    def forward(self, x_t, t):
        """
        x_t: (batch, 3, height, width) noisy image at timestep t
        t: (batch,) timestep (0 to T-1)
        
        Returns: predicted noise
        """
        # Embed timestep
        t_embed = self.time_embed(t.unsqueeze(-1).float() / 1000.0)  # (batch, time_channels)
        
        # Expand to spatial dims
        t_embed = t_embed.unsqueeze(-1).unsqueeze(-1)  # (batch, time_channels, 1, 1)
        t_embed = t_embed.expand(-1, -1, x_t.shape[2], x_t.shape[3])  # broadcast
        
        # Concatenate image and time
        x = torch.cat([x_t, t_embed], dim=1)  # (batch, 3 + time_channels, height, width)
        
        # Encode
        encoded = self.encoder(x)
        
        # Decode
        noise_pred = self.decoder(encoded)
        
        return noise_pred


def schedule_noise(t, T=1000):
    """Linear noise schedule"""
    beta = 0.0001 + t / T * (0.02 - 0.0001)
    alpha = 1 - beta
    return alpha, beta


def add_noise(x_0, t, noise):
    """Add noise to image according to schedule"""
    alpha, beta = schedule_noise(t)
    alpha_cumprod = torch.cumprod(alpha, dim=0)[t]
    
    x_t = torch.sqrt(alpha_cumprod) * x_0 + torch.sqrt(1 - alpha_cumprod) * noise
    return x_t


# Training
model = DiffusionModel()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-4)

for epoch in range(100):
    for images in dataloader:
        # Sample random timestep
        t = torch.randint(0, 1000, (images.shape[0],))
        
        # Sample random noise
        noise = torch.randn_like(images)
        
        # Add noise to images
        x_t = add_noise(images, t, noise)
        
        # Predict noise
        pred_noise = model(x_t, t)
        
        # Loss
        loss = nn.functional.mse_loss(pred_noise, noise)
        
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()


# Sampling
@torch.no_grad()
def sample(model, shape, T=1000):
    """Generate image by reverse diffusion"""
    x_t = torch.randn(shape)
    
    for t in range(T-1, 0, -1):
        noise_pred = model(x_t, torch.tensor(t))
        
        # Update x_t
        alpha, beta = schedule_noise(t)
        x_t = (x_t - beta * noise_pred) / torch.sqrt(alpha)
        
        # Add noise back (except last step)
        if t > 1:
            z = torch.randn_like(x_t)
            x_t = x_t + torch.sqrt(beta) * z
    
    return x_t
```

## Why Diffusion Models?

```
GANs:
- Fast generation
- Mode collapse (generates limited variety)
- Training instability

Diffusion Models:
- Slower generation (iterative)
- Better quality and diversity
- Stable training (simple MSE loss)

Modern approach: Use diffusion for training, distill to fast model for inference
```

## Benchmarks

```
Image Generation (ImageNet 256×256)

BigGAN (GAN):
- FID: 9.0
- Training: Complex, unstable

Diffusion Model:
- FID: 3.85
- Training: Simple, stable

Diffusion beats GAN on quality!
```

## Conclusion

Diffusion models revolutionized generative modeling. By learning to reverse a simple noise process, they achieve superior quality and stability. Understanding the forward/reverse diffusion process is essential for modern AI image generation. Next: exploring conditional diffusion and class-guided generation.
