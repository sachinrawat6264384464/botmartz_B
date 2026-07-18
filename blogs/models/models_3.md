---
title: "Diffusion Models: Denoising Diffusion Probabilistic Models (DDPM) and Image Generation"
excerpt: "Diffusion models generate images by learning to reverse noise. Add noise to images, learn to denoise, then sample by denoising random noise. Enables stable, high-quality image generation."
author: Soham Sharma
authorName: Soham Sharma
category: Models
tags: ["Generative Models", "Diffusion", "Image Generation", "Deep Learning"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: models-mastery
series_slug: models-mastery
series_title: "State-of-the-Art Models: Vision, Language, and Multimodal"
difficulty: advanced
week: null
day: 3
tools:
  - PyTorch
---

Diffusion models generate images through an iterative denoising process. Add Gaussian noise to images gradually (forward process), then train a model to reverse this process (reverse process). Sampling starts with pure noise and denoises iteratively to generate new images.

## Forward Process

```
x_0 (real image)
  ↓ (add noise)
x_1 (slightly noisy)
  ↓ (add more noise)
x_2 (more noisy)
  ↓ ...
x_T (pure noise)
```

## Reverse Process (Denoising)

Train a neural network to predict and remove noise:

```python
import torch
import torch.nn as nn

class DiffusionModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.encoder = nn.Sequential(...)  # Image encoder
        self.decoder = nn.Sequential(...)  # Noise predictor
    
    def forward(self, x_t, t):
        # x_t: noisy image at step t
        # Predict and subtract noise
        noise_pred = self.decoder(self.encoder(x_t))
        x_{t-1} = (x_t - noise_pred) / sqrt(alpha_t)
        return x_{t-1}
```

## Sampling

```
Start with x_T ~ N(0, I) (pure noise)
For t = T, T-1, ..., 1:
    x_{t-1} = denoise_model(x_t, t)
Return x_0 (generated image)
```

## Conclusion

Diffusion models are the foundation of modern image generation (DALL-E, Stable Diffusion). Understanding the forward/reverse processes explains how denoising generates realistic images. Next: video generation models that extend diffusion to temporal sequences.
