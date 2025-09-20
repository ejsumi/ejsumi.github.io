# Supervised Learning Quick Reference Sheet

## Overview of Supervised Learning

Supervised learning is a machine learning approach where models learn from labeled training data to make predictions on new, unseen data. The algorithm learns the relationship between input features (X) and target variables (y) to generalize patterns.

## Two Types of Supervised Learning

| Type              | Output Type        | Examples                                   |
|-------------------|--------------------|--------------------------------------------|
| **Classification** | Discrete labels     | Spam/Not Spam, Disease/No Disease, Sentiment Analysis |
| **Regression**     | Continuous values   | Predicting house prices, stock values, temperature |

## Key Evaluation Metrics

### Regression Metrics

| Metric | Formula | Range | Interpretation | Good Score | Notes |
|--------|---------|-------|----------------|------------|-------|
| **R² (Coefficient of Determination)** | R² = 1 - (SS_res / SS_tot) | 0 to 1 (can be negative) | Proportion of variance explained by model | Closer to 1 | Most common regression metric |
| **Mean Absolute Error (MAE)** | MAE = Σ\|y_actual - y_pred\|/n | 0 to ∞ | Average absolute difference | Lower is better | Less sensitive to outliers |
| **Root Mean Square Error (RMSE)** | RMSE = √(Σ(y_actual - y_pred)²/n) | 0 to ∞ | Square root of average squared differences | Lower is better | More sensitive to outliers than MAE |

### Classification Metrics

#### Confusion Matrix
A table showing correct vs incorrect predictions for each class:

```
                Predicted
              Pos    Neg
Actual  Pos   TP    FN
        Neg   FP    TN
```

**Legend**: TP = True Positives, TN = True Negatives, FP = False Positives, FN = False Negatives

| Metric | Formula | Range | Interpretation | When to Use |
|--------|---------|-------|----------------|-------------|
| **Accuracy** | (TP + TN) / (TP + TN + FP + FN) | 0 to 1 | Proportion of correct predictions | Balanced datasets with equal class importance |
| **Precision** | TP / (TP + FP) | 0 to 1 | Of all positive predictions, how many were actually positive | When false positives are costly (e.g., spam detection) |
| **Recall (Sensitivity)** | TP / (TP + FN) | 0 to 1 | Of all actual positives, how many were correctly identified | When false negatives are costly (e.g., medical diagnosis) |
| **F1-Score** | 2 × (Precision × Recall) / (Precision + Recall) | 0 to 1 | Harmonic mean of precision and recall | Balance between precision and recall, imbalanced datasets |

## Which Metric is Important When?

| Scenario | Primary Metric | Reason |
|----------|---------------|---------|
| Medical diagnosis | **Recall** | Missing a disease (FN) is more dangerous than false alarms |
| Spam detection | **Precision** | Important emails in spam folder (FP) is problematic |
| Fraud detection | **Recall** | Missing fraud (FN) is costly |
| Marketing campaigns | **Precision** | Don't want to waste money on unlikely customers |
| Balanced dataset | **Accuracy** | All classes equally important |
| Imbalanced dataset | **F1-Score** | Balances precision and recall |
| Cost-sensitive | **Custom metric** | Based on business costs of FP vs FN |

## Top 5 Models for Each Task

### Top 5 Regression Models

1. **Linear Regression**
   - Simple, interpretable, fast
   - Good baseline model

2. **Random Forest**
   - Handles non-linearity, reduces overfitting
   - Good for mixed data types

3. **Gradient Boosting (XGBoost/LightGBM)**
   - High accuracy, handles complex patterns
   - Popular in competitions

4. **Support Vector Regression (SVR)**
   - Effective for high-dimensional data
   - Good with kernel tricks

5. **Neural Networks**
   - Captures complex non-linear relationships
   - Good for large datasets

### Top 5 Classification Models

1. **Logistic Regression**
   - Simple, interpretable, probabilistic output
   - Good baseline for binary classification

2. **Random Forest**
   - Robust, handles mixed data types
   - Provides feature importance

3. **Gradient Boosting (XGBoost/LightGBM)**
   - High performance, handles imbalanced data
   - Feature selection capabilities

4. **Support Vector Machine (SVM)**
   - Effective for high-dimensional data
   - Good generalization with proper tuning

5. **Neural Networks**
   - Powerful for complex patterns
   - Excellent for image/text data

## Model Selection Guide

| Data Characteristics | Recommended Models | Avoid |
|---------------------|-------------------|-------|
| **Small dataset (<1000 samples)** | Linear/Logistic Regression, SVM | Deep Neural Networks |
| **Large dataset (>100K samples)** | Gradient Boosting, Neural Networks | KNN (slow prediction) |
| **High dimensions, few samples** | Linear models with regularization | Tree-based models |
| **Mixed data types** | Random Forest, Gradient Boosting | Linear models (without preprocessing) |
| **Need interpretability** | Linear Regression, Decision Trees | Neural Networks, Ensemble methods |
| **Time/resource constraints** | Linear models, Naive Bayes | Grid search on complex models |
| **Non-linear relationships** | Tree-based models, Neural Networks | Simple linear models |
| **Noisy data** | Ensemble methods (Random Forest) | Overfitting-prone models |

## Quick Decision Framework

### For Regression:
1. Start with **Linear Regression** (baseline)
2. Try **Random Forest** if non-linear patterns suspected
3. Use **Gradient Boosting** for highest accuracy
4. Consider **Neural Networks** for very large/complex datasets

### For Classification:
1. Start with **Logistic Regression** (baseline)
2. Try **Random Forest** for robustness
3. Use **Gradient Boosting** for competitive performance
4. Consider **SVM** for high-dimensional data
5. Use **Neural Networks** for image/text/complex data

## Key Takeaways

- **Always start simple**: Begin with linear models as baseline
- **Understand your data**: Size, dimensions, noise level affect model choice
- **Consider the business context**: Choose metrics based on cost of errors
- **Cross-validation is crucial**: Use it to get reliable performance estimates
- **Feature engineering often beats complex models**: Clean, relevant features are key
- **Ensemble methods**: Often provide the best performance by combining multiple models
