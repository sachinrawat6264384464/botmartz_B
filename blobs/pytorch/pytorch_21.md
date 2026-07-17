---
title: "Monitoring a PyTorch Model in Production: Latency Tracking, Data Drift, Prediction Drift, and Alerting"
excerpt: "Models degrade silently in production as data shifts. Learn latency metrics, drift detection, and alerting to catch issues before they impact users."
author: Soham Sharma
authorName: Soham Sharma
category: PyTorch
tags: ["PyTorch", "Monitoring", "Production", "MLOps", "Drift Detection"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: pytorch-mastery
series_slug: pytorch-mastery
series_title: "PyTorch Mastery: From Tensors to Production"
difficulty: advanced
week: null
day: 20
tools:
  - PyTorch
---

Accuracy metrics are computed offline; production metrics matter online. Track latency, throughput, error rates, and data drift. This post covers monitoring infrastructure, drift detection, and alerting rules.

## Latency Tracking

```python
import time
from collections import deque

class LatencyMonitor:
    def __init__(self, window_size=1000):
        self.latencies = deque(maxlen=window_size)
    
    def record(self, latency_ms):
        self.latencies.append(latency_ms)
    
    def p99_latency(self):
        sorted_lats = sorted(self.latencies)
        return sorted_lats[int(0.99 * len(sorted_lats))]

monitor = LatencyMonitor()
# Record latencies during inference
monitor.record(25)
monitor.record(30)
print(f"P99 latency: {monitor.p99_latency()}ms")
```

## Conclusion

Production monitoring detects issues early. Latency, throughput, drift, and error rates provide comprehensive visibility. Building monitoring infrastructure separates hobbyist ML from production-grade systems. This concludes the PyTorch Mastery series.
