---
title: "CLIP: Contrastive Vision-Language Learning and Zero-Shot Transfer"
excerpt: "CLIP aligns images and text via contrastive learning. Train once on image-caption pairs, then use for zero-shot classification without task-specific fine-tuning."
author: Soham Sharma
authorName: Soham Sharma
category: Models
tags: ["Multimodal", "Vision-Language", "CLIP", "Zero-Shot"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: models-mastery
series_slug: models-mastery
series_title: "State-of-the-Art Models: Vision, Language, and Multimodal"
difficulty: intermediate
week: null
day: 2
tools:
  - PyTorch
---

CLIP (Contrastive Language-Image Pre-training) learns to align image and text embeddings. The trick: images and captions should be close in embedding space; mismatched pairs should be far. This enables zero-shot transfer: classify any object without task-specific training.

## CLIP Training

```
Image embedding: ResNet or ViT encoder
Text embedding: BERT or GPT-like encoder

Loss = Contrastive loss
Positive pair: image and its caption (should be close)
Negative pairs: image paired with other captions (should be far)
```

## Zero-Shot Classification

```python
import torch
import clip

# Load model
model, preprocess = clip.load("ViT-B/32")

# Load and preprocess image
image = preprocess(Image.open("dog.jpg")).unsqueeze(0)

# Candidate classes
classes = ["dog", "cat", "bird", "fish"]
text = clip.tokenize(classes)

# Encode
with torch.no_grad():
    image_features = model.encode_image(image)
    text_features = model.encode_text(text)
    
    # Compute similarities
    logits = image_features @ text_features.t()
    
    probs = logits.softmax(dim=-1)
    print(probs)  # [0.95, 0.03, 0.01, 0.01]
```

CLIP predicts "dog" with 95% confidence without ever seeing a training example of that specific image.

## Conclusion

CLIP demonstrates the power of contrastive multimodal learning. Aligning vision and language enables zero-shot transfer and powerful semantic representations. Understanding CLIP informs building other multimodal systems. Next: speech recognition models like Whisper.
