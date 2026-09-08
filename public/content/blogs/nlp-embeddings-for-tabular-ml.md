---
title: When Text Meets Tables: Using NLP Embeddings in Regression Pipelines
excerpt: Property listings are half numbers, half language. Here is how I fused sentence embeddings with classical and deep regression models to improve prediction quality.
category: Machine Learning
readTime: 8 min read
date: 2025-05-28
tags: [NLP, Embeddings, Feature Engineering, scikit-learn, DNN]
featured: false
---

# When Text Meets Tables: Using NLP Embeddings in Regression Pipelines

Most housing models start with bedrooms, baths, and square footage. Listing *text* is often ignored — or stuffed into crude bag-of-words features. When I built price / listing-success models at Enliven AI, fusing **NLP embeddings** with tabular features was one of the highest-leverage upgrades.

## Why embeddings beat keyword flags

Keyword features (`has_pool`, `mentions_renovated`) miss paraphrase and tone. Sentence embeddings map descriptions into a dense space where “sun-drenched patio” and “bright outdoor seating” sit closer together — even when vocabulary differs.

```python
import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")
emb = model.encode(df["description"].fillna("").tolist())
X = np.hstack([tabular_features, emb])
```

## Fusion patterns

### Late concat (simple and strong)

Encode text → concatenate with scaled tabular columns → train Linear Regression, Random Forest, or a small DNN.

### Dual-tower DNN

One branch for tabular inputs, one for embeddings, then a merge layer. Useful when interactions between text and numbers are non-linear.

```text
tabular MLP ──┐
              ├─ concat → dense → prediction
text emb MLP ─┘
```

## Pitfalls

- **Leakage**: embeddings from text that contains the target price will cheat — strip price language from descriptions when needed.
- **Dimensionality**: 384-d embeddings dwarf 20 tabular columns; tree models may under-use either side unless you tune carefully.
- **Missing text**: empty descriptions need an explicit strategy (zero vector vs learned “missing” token).

## How I evaluated

I compared:

1. Tabular-only baseline  
2. Tabular + TF-IDF  
3. Tabular + sentence embeddings  

Embeddings consistently improved residual error on listings where copy quality varied a lot. Gains were smaller on sparse, template-like descriptions — which is itself a useful product insight.

## Pairing with interpretability

Raw embedding dimensions are opaque. For stakeholder reports I grouped SHAP attributions into “text semantics” vs concrete tabular drivers so non-ML teammates still got actionable explanations.

## Takeaway

If your regression problem has free text, try embeddings before reaching for a much larger model. Concatenate, validate against a tabular baseline, and only then invest in dual-tower architectures — measure twice, stack once.
