---
title: "Advanced Model: LLaVA (Large Language and Vision Assistant) — Vision-Language Integration"
excerpt: "Connect vision and language: train a simple projection from vision encoder to LLM. LLaVA matches GPT-4 on many tasks using simple, elegant architecture."
author: Soham Sharma
authorName: Soham Sharma
category: Advanced Models
tags: ["Multimodal", "Vision-Language", "LLaVA", "LLMs"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: advanced-models-frontier
series_slug: advanced-models-frontier
series_title: "Advanced Model Architectures: Beyond Transformers"
difficulty: intermediate
week: null
day: 6
tools:
  - Deep Learning
---

Vision Transformers and LLMs excel separately. LLaVA connects them: use a frozen vision encoder (CLIP) + frozen LLM + trainable projection layer. This simple architecture achieves multimodal understanding without expensive retraining.

## Architecture

```
Image → Vision Encoder (CLIP ViT) → [d=768]
                                     ↓
                            Projection Layer (Linear)
                                     ↓
                                 [d=4096]
                                     ↓
Combined with prompt text → LLaVA LLM → Caption/Answer
```

## Implementation

```python
import torch
import torch.nn as nn
from transformers import CLIPVisionModel, AutoModelForCausalLM

class LLaVA(nn.Module):
    def __init__(self, vision_model_name, llm_model_name):
        super().__init__()
        
        # Frozen vision encoder (CLIP)
        self.vision_encoder = CLIPVisionModel.from_pretrained(vision_model_name)
        self.vision_encoder.eval()
        for param in self.vision_encoder.parameters():
            param.requires_grad = False
        
        # Frozen LLM
        self.llm = AutoModelForCausalLM.from_pretrained(llm_model_name)
        self.llm.eval()
        for param in self.llm.parameters():
            param.requires_grad = False
        
        # Only trainable: projection layer
        vision_dim = self.vision_encoder.config.hidden_size  # 768
        llm_dim = self.llm.config.hidden_size  # 4096
        self.projection = nn.Linear(vision_dim, llm_dim)
    
    def forward(self, images, input_ids, attention_mask=None):
        """
        images: (batch, 3, 224, 224)
        input_ids: (batch, seq_len) tokenized text
        """
        # Extract image features
        with torch.no_grad():
            image_features = self.vision_encoder(images).pooler_output  # (batch, 768)
        
        # Project to LLM space
        projected_features = self.projection(image_features)  # (batch, 4096)
        
        # Embed text
        with torch.no_grad():
            text_embeddings = self.llm.get_input_embeddings()(input_ids)  # (batch, seq_len, 4096)
        
        # Combine: [image_feature, text1, text2, ...]
        combined_embeddings = torch.cat([
            projected_features.unsqueeze(1),
            text_embeddings
        ], dim=1)  # (batch, 1 + seq_len, 4096)
        
        # LLM forward
        with torch.no_grad():
            outputs = self.llm(inputs_embeds=combined_embeddings, ...)
        
        return outputs
```

## Training Strategy

```
Stage 1: Pre-training
- Align vision and language: use image-caption pairs
- Only train projection layer
- Training: a few days on single GPU

Stage 2: Fine-tuning (optional)
- Train on instruction-following data
- 1-2 days on single GPU
```

## Benchmarks

```
Model: LLaVA-13B vs GPT-4V vs Claude

Benchmark: MMVP, GQA, LLaVA-Bench

LLaVA-13B:
- MMVP: 61.3%
- GQA: 92.7%
- Instruction: 80.3%

GPT-4V (proprietary):
- MMVP: 88%
- GQA: 95%
- Instruction: 92%

LLaVA is 90% of GPT-4V quality at 1/100 the parameters!
```

## Why This Works

1. **Vision encoders are pre-trained**: CLIP already understands images
2. **LLMs are pre-trained**: Already understand text
3. **Minimal bridge needed**: Simple projection connects them
4. **Alignment is cheap**: Only train 0.01% of parameters

## Conclusion

LLaVA demonstrates that multimodal models don't require expensive retraining. Combining frozen components with a small trainable projection is elegant and effective. This approach powers many open-source multimodal systems. Next: exploring more advanced architectures.
