---
title: "LLM Training: Pretraining, Supervised Fine-Tuning (SFT), and Reinforcement Learning from Human Feedback (RLHF)"
excerpt: "Training LLMs involves three stages: pretraining (learn language), SFT (follow instructions), and RLHF (align with humans). Understand each stage's purpose and methods."
author: Soham Sharma
authorName: Soham Sharma
category: LLMs
tags: ["LLMs", "Training", "RLHF", "Fine-Tuning"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: llms-mastery
series_slug: llms-mastery
series_title: "Large Language Models: Architecture, Training, and Deployment"
difficulty: intermediate
week: null
day: 2
tools:
  - LLMs
---

Training modern LLMs is a three-stage pipeline: pretraining (learn from internet-scale text), supervised fine-tuning (learn to follow instructions), and RLHF (align with human preferences). Each stage addresses a specific objective and constraint.

## Stage 1: Pretraining

Predict the next token from previous tokens on massive text corpus.

```
Loss = -log P(token_i | token_1, ..., token_{i-1})
```

This stage learns language structure, factual knowledge, and reasoning patterns. It's computationally expensive (weeks on thousands of GPUs) but done once per base model.

## Stage 2: Supervised Fine-Tuning (SFT)

Fine-tune pretrained model on instruction-following examples.

```python
examples = [
    {
        "prompt": "What is 2+2?",
        "completion": "2+2 equals 4."
    },
    {
        "prompt": "Translate to French: Hello",
        "completion": "Bonjour"
    }
]

# Fine-tune on instruction-response pairs
# Loss = -log P(completion | prompt)
```

SFT teaches the model to follow instructions and be helpful. It's much cheaper than pretraining (hours on single GPU).

## Stage 3: RLHF (Reinforcement Learning from Human Feedback)

Align model behavior with human preferences. Train a reward model, then use it to fine-tune via reinforcement learning.

```
1. Humans rate model outputs (e.g., "Response A is better than B")
2. Train reward model: reward_model(output) -> score
3. Use reward model to optimize model: max E[reward_model(output)]
```

RLHF reduces harmful outputs, makes models more helpful, and aligns with user intent.

## Conclusion

The three-stage pipeline (pretraining → SFT → RLHF) is the recipe for state-of-the-art LLMs. Understanding each stage's purpose helps in fine-tuning for specific domains. Next: inference optimization—how to make LLMs faster and cheaper to run.
