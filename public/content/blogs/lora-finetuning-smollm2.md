---
title: Fine-Tuning Small LLMs with LoRA: Building a Precise Unit Conversion Reasoner
excerpt: A practical walkthrough of in-context learning, LoRA fine-tuning, and reinforcement fine-tuning (RFT) on SmolLM2 to generate accurate unit conversions across diverse measurement systems.
category: AI
readTime: 14 min read
date: 2025-04-22
tags: [LoRA, SmolLM2, Fine-Tuning, In-Context Learning, LLMs]
featured: true
---

# Fine-Tuning Small LLMs with LoRA: Building a Precise Unit Conversion Reasoner

Unit conversion sounds trivial until you need *precise* answers across messy real-world units — cooking volumes, imperial/metric mixes, scientific prefixes, and compound rates. At Enliven AI I built an advanced conversion system on **SmolLM2**, stacking in-context learning, **LoRA** fine-tuning, and **RFT** (reinforcement fine-tuning) for stronger reasoning.

## Why a small LLM?

Large proprietary models are accurate but expensive and hard to specialize. SmolLM2 gave us:

- Fast iteration on Colab / local GPUs
- Full control over training data and prompts
- A base that responds well to LoRA adapters

The goal was not open-ended chat — it was **high-accuracy conversion answers** with clear reasoning steps.

## Stage 1: In-context learning

Before touching weights, I measured what the base model could do with carefully designed few-shot prompts:

```text
Convert 2.5 cups to milliliters.
Reason step-by-step, then give the final numeric answer with units.

Example:
Q: 3 inches to centimeters
A: 1 inch = 2.54 cm → 3 × 2.54 = 7.62 cm
Final: 7.62 cm
```

In-context learning caught common cases but failed on rare units and multi-hop conversions (e.g. mph → m/s with rounding rules). That gap defined the fine-tuning dataset.

## Stage 2: LoRA fine-tuning

LoRA freezes the base weights and trains low-rank adapters — cheap, reversible, and ideal for specialized skills.

```python
from peft import LoraConfig, get_peft_model

config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    task_type="CAUSAL_LM",
)

model = get_peft_model(base_model, config)
```

Training tips that mattered:

- Prefer **verified** conversion pairs over scraped noise
- Include chain-of-thought targets, not just final numbers
- Mix easy and hard units so the adapter does not overfit recipes

## Stage 3: RFT for reasoning quality

After supervised LoRA, reinforcement fine-tuning rewarded answers that were:

1. Numerically correct within tolerance
2. Unit-labeled correctly
3. Accompanied by coherent intermediate steps

Incorrect finals scored zero even if the prose looked confident — which pushed the model away from fluent-but-wrong conversions.

## Evaluation

I tracked:

- Exact / near-exact numeric match rates
- Unit string correctness
- Failure modes on compound units and regional aliases

LoRA alone lifted accuracy over ICL. RFT tightened edge cases where the model “almost” got the formula right.

## Lessons

- **Specialize the objective** — conversion is a skill, not a chatbot persona.
- **ICL → LoRA → RFT** is a clean progression: diagnose, teach, then refine.
- Small models + adapters can beat generic prompting when the domain is narrow and measurable.

If you are teaching an LLM a precision skill, define a strict scorer early. Everything else — prompts, LoRA rank, RFT rewards — becomes easier once “correct” is unambiguous.
