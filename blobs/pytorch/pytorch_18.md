---
title: "Saving and Loading Checkpoints: state_dict, Full Checkpoints, and Resuming Training"
excerpt: "Checkpoints save model state so you can resume training or deploy. Learn state_dict vs full-model saving, handling distributed training, and pitfall recovery."
author: Soham Sharma
authorName: Soham Sharma
category: PyTorch
tags: ["PyTorch", "Checkpoints", "Model Saving", "Training Resumption"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: pytorch-mastery
series_slug: pytorch-mastery
series_title: "PyTorch Mastery: From Tensors to Production"
difficulty: intermediate
week: null
day: 18
tools:
  - PyTorch
---

Checkpoints save training state (weights, optimizer state, epoch) so you can resume training or load into production. The two approaches: save state_dict (portable, smaller) or save the full model (heavier, less portable). This post covers both, shows how to handle distributed training, and explains common failure modes.

## Saving and Loading state_dict

```python
import torch
import torch.nn as nn
import torch.optim as optim

model = nn.Linear(10, 2)
optimizer = optim.SGD(model.parameters(), lr=0.01)

# Save checkpoint
checkpoint = {
    'epoch': 5,
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'loss': 0.5
}
torch.save(checkpoint, 'checkpoint.pth')

# Load checkpoint
checkpoint = torch.load('checkpoint.pth')
model.load_state_dict(checkpoint['model_state_dict'])
optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
epoch = checkpoint['epoch']

print(f"Resumed from epoch {epoch}")
```

**Output:**
```text
Resumed from epoch 5
```

state_dict contains only weights and buffers, not the full class definition. It's portable across code versions.

## Conclusion

Checkpoints are essential for long training and deployment. Use state_dict for production; save full-model checkpoints for development. Understanding what's saved and how to resume training prevents training loss and corruption. Next: we'll explore TorchServe and FastAPI—how to productionize models.
