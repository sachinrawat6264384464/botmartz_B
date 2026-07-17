---
title: "Vision Transformers (ViT): Image Classification with Pure Transformers"
excerpt: "Vision Transformers apply Transformers to image classification. Patch embeddings convert images to sequences, enabling the same architecture as NLP models."
author: Soham Sharma
authorName: Soham Sharma
category: Models
tags: ["Computer Vision", "Transformers", "Image Classification", "Deep Learning"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: models-mastery
series_slug: models-mastery
series_title: "State-of-the-Art Models: Vision, Language, and Multimodal"
difficulty: intermediate
week: null
day: 1
tools:
  - PyTorch
---

Vision Transformers replace convolutional layers with pure attention. Divide the image into patches, embed them, and apply Transformer blocks. ViTs achieve state-of-the-art accuracy on ImageNet and scale well to large datasets.

## ViT Architecture

```python
import torch
import torch.nn as nn
from torchvision.models import vision_transformer

# Load pretrained ViT
model = vision_transformer.vit_b_16(pretrained=True)

# ViT divides image into patches (16×16)
# Patches are flattened and embedded
# Then standard Transformer blocks

x = torch.randn(4, 3, 224, 224)  # Batch of images
output = model(x)  # (4, 1000) class logits
```

## Patch Embedding

```python
class PatchEmbedding(nn.Module):
    def __init__(self, patch_size=16, embed_dim=768):
        super().__init__()
        self.patch_size = patch_size
        # Linear projection of patches
        self.proj = nn.Linear(3 * patch_size * patch_size, embed_dim)
    
    def forward(self, x):
        # x: (batch, 3, 224, 224)
        # Convert to patches
        patches = x.unfold(2, self.patch_size, self.patch_size) \
                   .unfold(3, self.patch_size, self.patch_size)
        # Reshape and embed
        patches = patches.contiguous().view(x.size(0), -1, 3 * self.patch_size ** 2)
        return self.proj(patches)
```

## Conclusion

Vision Transformers show that pure attention can replace convolution. Understanding ViT architecture enables building efficient vision models. Next: multimodal models that combine vision and language.
