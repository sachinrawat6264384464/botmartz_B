---
title: "Model Evaluation Metrics: Perplexity, BLEU, ROUGE, and Task-Specific Metrics"
excerpt: "How do you measure LLM quality? Perplexity measures prediction accuracy. BLEU/ROUGE measure generation quality. Task-specific metrics (accuracy, F1) measure downstream performance."
author: Soham Sharma
authorName: Soham Sharma
category: LLMs
tags: ["LLMs", "Evaluation", "Metrics", "Benchmarks"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: llms-mastery
series_slug: llms-mastery
series_title: "Large Language Models: Architecture, Training, and Deployment"
difficulty: intermediate
week: null
day: 7
tools:
  - LLMs
---

LLM evaluation is nuanced. Perplexity measures prediction accuracy on test data. BLEU and ROUGE measure generation quality (e.g., machine translation, summarization). Task-specific metrics (exact match, F1) measure downstream performance. Human evaluation remains the gold standard.

## Perplexity

Lower perplexity = better language model. Measures how well the model predicts the test set.

```python
# Perplexity = exp(mean(loss))
loss = -log P(text)
perplexity = math.exp(loss)
```

Perplexity measures intrinsic quality but doesn't measure usefulness.

## BLEU Score

Measures overlap between generated and reference text.

```python
from nltk.translate.bleu_score import sentence_bleu

reference = ["the", "cat", "sat", "on", "the", "mat"]
hypothesis = ["the", "cat", "sat", "on", "a", "mat"]

score = sentence_bleu([reference], hypothesis)  # 0.75
```

BLEU is useful for machine translation and paraphrasing.

## Task-Specific Metrics

For QA tasks, use exact match (EM) and F1 score.

```python
# EM: Is the answer exactly correct?
em = 1 if predicted == reference else 0

# F1: Overlap between predicted and reference
precision = overlap / len(predicted)
recall = overlap / len(reference)
f1 = 2 * precision * recall / (precision + recall)
```

## Conclusion

Metrics guide model development. Perplexity measures language modeling quality. Task-specific metrics measure downstream performance. Combining automated metrics with human evaluation ensures reliable assessment. Next: we'll explore multi-modal LLMs—extending LLMs to understand images and other modalities.
