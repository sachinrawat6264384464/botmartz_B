---
title: "Reinforcement Learning: Policy Gradients, Actor-Critic, and PPO"
excerpt: "Agents learn to maximize rewards via RL. Policy gradients directly optimize reward. Actor-Critic separates policy and value learning. PPO is the practical standard."
author: Soham Sharma
authorName: Soham Sharma
category: Models
tags: ["Reinforcement Learning", "Policy Gradients", "PPO", "Deep Learning"]
status: published
featuredImage: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80
colab_notebook: ""
series_id: models-mastery
series_slug: models-mastery
series_title: "State-of-the-Art Models: Vision, Language, and Multimodal"
difficulty: advanced
week: null
day: 4
tools:
  - PyTorch
---

Reinforcement learning trains agents to maximize cumulative rewards. Policy gradients adjust the policy to increase reward. Actor-Critic methods separate policy (actor) and value estimation (critic) for stability. PPO (Proximal Policy Optimization) is the practical standard used in LLM alignment.

## Policy Gradients

```python
# Policy π(a|s) outputs probability of action a in state s
loss = -log(π(a|s)) * (R - V(s))
# Increase probability of actions with high advantage (R - V(s))
```

## Actor-Critic

```
Actor: Policy network π(a|s)
Critic: Value network V(s)

Advantage = Reward - V(s)
Actor loss = -log π(a|s) * Advantage
Critic loss = (Reward - V(s))^2
```

The critic provides a baseline to reduce variance.

## PPO (Proximal Policy Optimization)

```python
# Clip policy ratio to avoid large updates
ratio = π_new(a|s) / π_old(a|s)
loss = -min(ratio * advantage, clip(ratio, 1-ε, 1+ε) * advantage)
```

PPO prevents updates that change the policy too much, improving stability.

## Conclusion

Policy gradient methods and PPO are the foundation of LLM alignment via RLHF. Understanding the actor-critic framework and PPO's clipping mechanism is essential for building aligned models. Next: meta-learning and few-shot learning.
