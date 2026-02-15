---
title: "Supervised Learning: A Quick Reference"
description: "A concise quick reference for Supervised Learning, covering classification vs regression, evaluation metrics, top models, and how to choose the right approach."
tags: [python, machine learning, learning]
---

Supervised learning is a machine learning approach where models learn from labeled training data to make predictions on new, unseen data. The algorithm learns the relationship between input features (X) and target variables (y) to generalize patterns.

## Two Types of Supervised Learning

- **Classification** — Target is a category. Predicts discrete labels like spam/not spam, churn/no churn, or which product category a customer will buy.
- **Regression** — Target is a number. Predicts continuous values like house prices, salary, or laptop price.

**How to tell which one you need:**

```python
print(df['Target'].dtype)         # object/category = Classification
print(df['Target'].nunique())     # many unique values = likely Regression
print(df['Target'].value_counts()) # check class distribution for Classification
```

---

## Evaluation Metrics

### Regression Metrics

| Metric | What It Measures | Good Score |
|--------|-----------------|------------|
| **R²** | Proportion of variance explained by the model | Closer to 1 |
| **MAE** | Average absolute difference between actual and predicted | Lower is better, less sensitive to outliers |
| **RMSE** | Square root of average squared differences | Lower is better, more sensitive to outliers |

```python
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
import numpy as np

r2   = r2_score(y_test, y_pred)
mae  = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
```

---

### Classification Metrics

#### Confusion Matrix

```
              Predicted
            Pos    Neg
Actual  Pos  TP    FN
        Neg  FP    TN
```

- **TP** = True Positives — correctly predicted positive
- **TN** = True Negatives — correctly predicted negative
- **FP** = False Positives — predicted positive, actually negative
- **FN** = False Negatives — predicted negative, actually positive

| Metric | Formula | When to Use |
|--------|---------|-------------|
| **Accuracy** | (TP + TN) / Total | Balanced datasets where all classes matter equally |
| **Precision** | TP / (TP + FP) | When false positives are costly (e.g. spam detection) |
| **Recall** | TP / (TP + FN) | When false negatives are costly (e.g. medical diagnosis) |
| **F1-Score** | 2 × (Precision × Recall) / (Precision + Recall) | Imbalanced datasets, when both matter |

```python
from sklearn.metrics import classification_report, confusion_matrix

print(classification_report(y_test, y_pred))  # Precision, Recall, F1 per class
print(confusion_matrix(y_test, y_pred))
```

#### Which metric to use in which scenario

| Scenario | Use | Why |
|----------|-----|-----|
| Medical diagnosis | **Recall** | Missing a disease (FN) is more dangerous |
| Spam detection | **Precision** | Blocking a real email (FP) is the bigger problem |
| Fraud detection | **Recall** | Missing fraud (FN) is costly |
| Marketing campaigns | **Precision** | Avoid wasting spend on unlikely customers |
| Balanced dataset | **Accuracy** | All classes equally important |
| Imbalanced dataset | **F1-Score** | Balances precision and recall |

---

## Top Models

### Regression

| Model | Best For | Notes |
|-------|----------|-------|
| **Linear Regression** | Baseline, interpretable, linear relationships | Start here |
| **Random Forest Regressor** | Non-linear patterns, mixed data types | Reduces overfitting |
| **Gradient Boosting (XGBoost/LightGBM)** | High accuracy, complex patterns | Popular in competitions |
| **Support Vector Regression (SVR)** | High-dimensional data | Requires feature scaling |
| **Neural Networks** | Very large or complex datasets | Overkill for small data |

### Classification

| Model | Best For | Notes |
|-------|----------|-------|
| **Logistic Regression** | Baseline, binary classification | Simple and interpretable |
| **Random Forest Classifier** | Robust, mixed data types | Provides feature importance |
| **Gradient Boosting (XGBoost/LightGBM)** | High performance, imbalanced data | Feature selection built in |
| **Support Vector Machine (SVM)** | High-dimensional data | Requires feature scaling |
| **Neural Networks** | Image, text, complex patterns | Needs large datasets |

---

## Model Selection Guide

| Data Characteristics | Recommended | Avoid |
|---------------------|-------------|-------|
| Small dataset (<1000 rows) | Linear/Logistic Regression, SVM | Deep Neural Networks |
| Large dataset (>100K rows) | Gradient Boosting, Neural Networks | KNN (slow at prediction time) |
| High dimensions, few samples | Linear models with regularization | Tree-based models |
| Mixed data types | Random Forest, Gradient Boosting | Linear models without preprocessing |
| Need interpretability | Linear Regression, Decision Trees | Neural Networks, Ensembles |
| Non-linear relationships | Tree-based models, Neural Networks | Simple linear models |
| Noisy data | Ensemble methods (Random Forest) | Models prone to overfitting |

---

## Quick Decision Framework

**For Regression:**
1. Start with **Linear Regression** as baseline
2. Try **Random Forest** if non-linear patterns are suspected
3. Use **Gradient Boosting** for highest accuracy
4. Consider **Neural Networks** for very large or complex datasets

**For Classification:**
1. Start with **Logistic Regression** as baseline
2. Try **Random Forest** for robustness
3. Use **Gradient Boosting** for competitive performance
4. Consider **SVM** for high-dimensional data
5. Use **Neural Networks** for image, text, or highly complex data

---

## Key Takeaways

- **Always start simple** — Linear/Logistic Regression first. A strong baseline is more useful than jumping straight to complex models.
- **Understand your data** — Dataset size, feature types, and noise level all affect which model to reach for.
- **Pick metrics based on business context** — A high accuracy score can hide a useless model on imbalanced data. Know the cost of FP vs FN in your problem.
- **Feature engineering often beats model complexity** — Clean, relevant features matter more than which model you pick.
- **Cross-validate** — A single train/test split can mislead you. Use cross-validation for a reliable performance estimate.
