---
title: "JEPA (Joint-Embedding Predictive Architecture): Self-Supervised Vision Without Reconstruction"
excerpt: "JEPA learns by predicting in latent space, not pixel space. No reconstruction, no contrastive loss—just predict masked regions. Outperforms DINO and is more interpretable."
author: Soham Sharma
authorName: Soham Sharma
category: Advanced Models
tags: ["Self-Supervised Learning", "Vision", "JEPA", "Latent Prediction"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: advanced-models-frontier
series_slug: advanced-models-frontier
series_title: "Advanced Model Architectures: Beyond Transformers"
difficulty: advanced
week: null
day: 3
tools:
  - Deep Learning
---

Most self-supervised vision learns by reconstruction (pixel-level) or contrastive loss (similarity). JEPA (Joint-Embedding Predictive Architecture) learns by predicting in latent space: mask image patches, predict latent representations of masked regions. No pixels, no contrastive loss—just latent space prediction. This is more efficient and learns better representations.

## JEPA Training Loop

```
1. Encode full image: z_full = encoder(image)
2. Mask patches (e.g., 75% of image)
3. Encode visible patches: z_visible = encoder(image_masked)
4. Predict full latent: z_pred = predictor(z_visible)
5. Loss = MSE(z_full, z_pred)
   (only compute loss on masked regions)
```

## Why Latent Space Prediction > Pixel Reconstruction

```
Pixel Prediction:
- Wastes capacity on low-level details (texture, color)
- Leads to blurry, low-quality representations
- Computationally expensive

Latent Prediction:
- Focuses on semantic relationships
- Learns what matters (objects, layout, relationships)
- 10× faster, better generalization
```

## Implementation

```python
import torch
import torch.nn as nn

class JEPA(nn.Module):
    def __init__(self, encoder_layers=12, predictor_layers=6):
        super().__init__()
        # Encoder: Transform image to latent space
        self.encoder = VisionTransformer(depth=encoder_layers)
        
        # Predictor: Predict full latent from partial
        self.predictor = nn.TransformerDecoder(
            nn.TransformerDecoderLayer(d_model=768, nhead=12),
            num_layers=predictor_layers
        )
        
        # Momentum encoder (optional, for stability)
        self.encoder_momentum = copy.deepcopy(self.encoder)
        self.tau = 0.999  # Momentum
    
    def forward(self, image, mask_ratio=0.75):
        # Encode full image with momentum encoder (no grad)
        with torch.no_grad():
            z_full = self.encoder_momentum(image)
        
        # Apply mask, encode visible patches
        image_masked = image * (1 - mask)
        z_visible = self.encoder(image_masked)
        
        # Predict full latent
        z_pred = self.predictor(z_visible)
        
        # Loss: MSE on masked region only
        loss = ((z_pred - z_full) ** 2)[mask.bool()].mean()
        
        return loss
    
    def _update_momentum_encoder(self):
        # Exponential moving average
        for p_encoder, p_momentum in zip(self.encoder.parameters(), 
                                          self.encoder_momentum.parameters()):
            p_momentum.data = self.tau * p_momentum.data + (1 - self.tau) * p_encoder.data
```

## Key Insight: Why No Contrastive Loss?

Contrastive learning requires careful negative sampling and temperature tuning. JEPA avoids this entirely:

```
Contrastive: image_A should be close to image_A', far from image_B
Problem: Requires mining negatives, tuning temperature

JEPA: Just predict masked patches directly
Problem-free: No negative sampling issues, no hyperparameter for temperature
```

## Conclusion

JEPA shows that self-supervised learning doesn't need contrastive loss or pixel reconstruction. Predicting in latent space with masked regions is simpler, faster, and produces better representations. This represents a paradigm shift toward simpler, more efficient self-supervised learning. Next: Phi and other efficient models.
