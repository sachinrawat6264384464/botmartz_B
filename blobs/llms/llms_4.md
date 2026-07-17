---
title: "Fine-Tuning LLMs: LoRA, QLoRA, Prompt Tuning, and When Each Applies"
excerpt: "Fine-tuning full models is expensive. Use LoRA (low-rank adaptation) to update only a fraction of parameters. Understand LoRA, QLoRA, and prompt tuning trade-offs."
author: Soham Sharma
authorName: Soham Sharma
category: LLMs
tags: ["LLMs", "Fine-Tuning", "LoRA", "Parameter Efficiency"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: llms-mastery
series_slug: llms-mastery
series_title: "Large Language Models: Architecture, Training, and Deployment"
difficulty: intermediate
week: null
day: 4
tools:
  - LLMs
---

Fine-tuning a 7B parameter model requires storing gradients for all parameters, consuming enormous GPU memory. LoRA reduces this by updating only low-rank matrices, reducing memory by 10×. Understanding parameter-efficient fine-tuning is essential for practical LLM customization.

## LoRA (Low-Rank Adaptation)

Instead of updating weight matrix W, update W + A·B where A and B are small (low-rank).

```python
from peft import LoraConfig, get_peft_model

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b")

config = LoraConfig(
    r=8,  # Low-rank dimension
    lora_alpha=16,  # Scaling factor
    target_modules=["q_proj", "v_proj"],  # Which layers to update
    lora_dropout=0.05,
)

model = get_peft_model(model, config)

# Fine-tune with 10× less memory
```

LoRA achieves 99% of full fine-tuning quality with 10× less memory.

## QLoRA

Combine LoRA with quantization: 4-bit quantized model + LoRA updates.

```python
from peft import LoraConfig, get_peft_model
from transformers import BitsAndBytesConfig

# Quantize to 4-bit
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.float16,
)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b",
    quantization_config=bnb_config
)

# Add LoRA
config = LoraConfig(r=8, target_modules=["q_proj", "v_proj"])
model = get_peft_model(model, config)
```

QLoRA fits a 13B model on a single GPU (8GB VRAM).

## Conclusion

Parameter-efficient fine-tuning (LoRA, QLoRA) makes customizing LLMs practical and cost-effective. LoRA is the standard for most use cases; QLoRA for extreme memory constraints. Understanding these techniques enables building domain-specific models affordably. Next: evaluating and comparing LLMs.
