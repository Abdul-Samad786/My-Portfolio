---
title: Interpretable ML for Housing Prices: NLP Embeddings, Ensembles, and SHAP
excerpt: How I built an end-to-end housing price prediction pipeline combining NLP embeddings with Linear Regression, Random Forest, and DNNs — then used SHAP to explain why listings succeed.
category: Machine Learning
readTime: 12 min read
date: 2025-06-18
tags: [SHAP, NLP, Random Forest, Regression, Interpretability]
featured: true
---

# Interpretable ML for Housing Prices: NLP Embeddings, Ensembles, and SHAP

Housing markets are messy. Prices depend on square footage and location — but also on how a listing is *written*. At Enliven AI I built an end-to-end ML pipeline that predicted listing outcomes by fusing structured features with NLP embeddings, then explained every prediction with SHAP.

## The problem

A model that only says “this listing will price at X” is hard to trust in production. Product and ops teams need answers like:

- Which amenities moved the prediction the most?
- Did the description quality help or hurt?
- Why did two similar homes get different scores?

That meant optimizing for **accuracy and interpretability**, not accuracy alone.

## Pipeline overview

```
Listing text + tabular fields
        ↓
Text → sentence embeddings (NLP)
Tabular → cleaned / encoded features
        ↓
Feature fusion
        ↓
Models: Linear Regression · Random Forest · DNN
        ↓
SHAP explanations → listing success insights
```

### 1. NLP embeddings for listing copy

Descriptions carry signal that columns miss: tone, urgency, and amenity language. I embedded listing text with a sentence transformer and concatenated those vectors with numeric/categorical features.

```python
from sentence_transformers import SentenceTransformer

encoder = SentenceTransformer("all-MiniLM-L6-v2")
text_emb = encoder.encode(listings["description"].tolist())
```

### 2. Model zoo: simple → expressive

I compared three families:

| Model | Strength | Weakness |
|-------|----------|----------|
| Linear Regression | Strong baseline, easy to reason about | Misses non-linear interactions |
| Random Forest | Handles mixed features well | Harder to explain without SHAP |
| DNN | Captures embedding + tabular interactions | Needs more data and tuning |

Linear models set a floor. Random Forests usually won on tabular-heavy splits. DNNs helped when text embeddings carried rich semantic structure.

### 3. SHAP for trust

SHAP (SHapley Additive exPlanations) attributed each prediction to features — including embedding dimensions aggregated back to human-readable groups (e.g. “description quality”, “location cluster”).

```python
import shap

explainer = shap.TreeExplainer(rf_model)
shap_values = explainer.shap_values(X_sample)
shap.summary_plot(shap_values, X_sample)
```

Global plots showed what the model relied on overall. Local plots answered “why *this* listing?” for stakeholders.

## What mattered in practice

- **Clean fusion beats fancy models** — bad joins between text and tabular features tanked every architecture.
- **Baselines first** — if Linear Regression was within a few points of the DNN, complexity was rarely worth it.
- **Explainability is a product feature** — SHAP summaries became the bridge between ML and listing strategy.

## Takeaways

1. Treat listing text as a first-class feature, not an afterthought.
2. Keep a ladder of models so you know what complexity buys you.
3. Ship SHAP (or similar) with the model — predictions without reasons stall adoption.

If you are building pricing or listing-success models, start with embeddings + a strong tree baseline, then add a DNN only when the residual error justifies it.
