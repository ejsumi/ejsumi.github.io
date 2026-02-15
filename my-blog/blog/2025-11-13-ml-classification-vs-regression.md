---
title: "Machine Learning Practice Problems: Classification vs Regression"
description: "A practical walkthrough of ML problems with both categorical and numerical targets — what changes in your pipeline, how to encode correctly, which metrics to use, and the gotchas to watch out for."
tags: [python, machine learning, learning]
---

When you start working through ML practice problems, you'll notice that two problems can look almost identical — same preprocessing steps, same train/test split structure — but one has a price as the target and the other has a category. That difference changes several things in your pipeline.

This post walks through real scenarios from both sides and highlights what to watch out for at each step.

---

## First: How to Tell What You're Working With

Before writing a single line of model code, check your target column:

```python
print(df['Target'].dtype)          # object/category → Classification
                                    # int/float → likely Regression
print(df['Target'].nunique())       # few unique values → Classification
print(df['Target'].value_counts())  # see the class distribution
```

**Regression targets** in the practice problems: `Price` (laptops, used cars) — a continuous number.

**Classification targets** in the practice problems: `Churn` (Yes/No), `elective` (DataScience/WebDev/AI...), `Purchase_Category`, `Location`, `Flavor`, `Main_Course` — all category labels.

---

## What Changes Between the Two

| Step | Regression | Classification |
|------|-----------|----------------|
| Target encoding | Nothing — it's already numeric | Encode labels to numbers |
| Model imports | `RandomForestRegressor`, `SVR`, etc. | `RandomForestClassifier`, `LogisticRegression`, etc. |
| Evaluation metrics | R², MAE, RMSE | Accuracy, Precision, Recall, F1 |
| Predicting | Returns a number | Returns a class label |
| Decoding predictions | Not needed | May need `inverse_transform()` to get label back |

Feature preprocessing (missing values, encoding, scaling) is the same regardless. The differences kick in from the model choice onwards.

---

## Regression Scenarios

### Laptop Price Prediction — Random Forest Regressor

Target: `Price` (a number — predict what a laptop costs)

**Outlier handling before scaling:**

A step you won't always see but matters here — the laptop dataset uses IQR to filter out outlier RAM values before training:

```python
Q1 = df['RAM_GB'].quantile(0.25)
Q3 = df['RAM_GB'].quantile(0.75)
IQR = Q3 - Q1

lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

df = df[(df['RAM_GB'] >= lower) & (df['RAM_GB'] <= upper)]
```

Outliers can skew a regressor's predictions significantly — a laptop with 1TB RAM as a data entry error will pull predictions up. Filter first, then scale.

**Reserving rows for prediction:**

```python
pred = df.tail(5).copy()      # held-out rows for final prediction
data = df.iloc[:-5].copy()    # everything else for train/test
```

This simulates new unseen data arriving — you train on everything up to those rows, then predict the last 5.

**Evaluation:**

```python
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
import numpy as np

print("R2:", round(r2_score(y_test, y_pred), 3))
print("MAE:", round(mean_absolute_error(y_test, y_pred), 3))
print("RMSE:", round(np.sqrt(mean_squared_error(y_test, y_pred)), 3))
```

- **R²** tells you how much of the price variance your model explains. 0.85 means 85% explained — the higher the better.
- **MAE** tells you the average error in the same unit as your target (e.g., dollars). Easy to interpret.
- **RMSE** penalises large errors more heavily than MAE. If RMSE is much higher than MAE, your model has a few big misses worth investigating.

---

### Used Car Prices — Comparing Multiple Models

Same regression setup but this problem goes a step further: it trains four models on the same data and compares them.

**Feature engineering the target-related column:**

```python
df['Car_Age'] = 2024 - df['Year']
```

The raw `Year` column (e.g., 2015, 2018) is less meaningful to a model than how old the car actually is. Always ask: is the raw value what matters, or is a derived version more informative?

**Comparing models side by side:**

```python
models = {
    'Random Forest': RandomForestRegressor(n_estimators=200, max_depth=12, random_state=42),
    'KNN':           KNeighborsRegressor(n_neighbors=7),
    'Decision Tree': DecisionTreeRegressor(max_depth=10, random_state=42),
    'SVR':           SVR(kernel='rbf', C=100, gamma=0.1)
}

for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    print(f"{name} → R2: {r2_score(y_test, y_pred):.3f} | "
          f"MAE: {mean_absolute_error(y_test, y_pred):.3f} | "
          f"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.3f}")
```

**Watch out:** KNN and SVR require scaled features — they use distance calculations. Random Forest and Decision Tree do not require scaling. In this problem, scaling is applied to all models before any of them are trained, so all four get the same prepared data.

---

## Classification Scenarios

### Customer Churn — Binary Classification

Target: `Churn` — Yes or No. Two classes.

**Encoding the target:**

The `Churn` column contains string values (`'Yes'`/`'No'`). Most classifiers accept string targets directly, but being explicit is better:

```python
df['Churn'] = df['Churn'].map({'Yes': 1, 'No': 0})
```

**Encoding the features — LabelEncoder for tree-based models:**

```python
catg_cols = ['Gender', 'ContractType', 'InternetService', 'PaymentMethod']
encoder = LabelEncoder()
for col in catg_cols:
    df[col] = encoder.fit_transform(df[col])
```

LabelEncoder assigns integers (0, 1, 2...) to categories. This is fine for Random Forest because trees split on thresholds — the numeric ordering doesn't imply a false relationship. For linear or distance-based models, use `pd.get_dummies()` instead.

**Scale after reserving prediction rows:**

```python
df_pred = df.tail(3).copy()   # reserve before scaling
df = df.iloc[:-3].copy()

scaler = StandardScaler()
df[num_cols] = scaler.fit_transform(df[num_cols])
df_pred[num_cols] = scaler.transform(df_pred[num_cols])  # transform only, not fit
```

This is a critical gotcha — `fit_transform` on training data, `transform` only on prediction/test data. If you fit the scaler again on the prediction rows, you're computing different statistics and the scaling becomes inconsistent.

**Evaluation:**

```python
from sklearn.metrics import accuracy_score, precision_score, classification_report

print("Accuracy:", round(accuracy_score(y_test, y_pred), 3))
print("Precision:", round(precision_score(y_test, y_pred), 3))
print(classification_report(y_test, y_pred))
```

For churn, **Recall matters more than Precision** — missing a customer who is about to churn (False Negative) is more costly than flagging one who wasn't going to (False Positive). Accuracy alone can mislead you if most customers don't churn.

---

### Student Course Selection — Multi-Class Classification

Target: `elective` — one of six courses (DataScience, WebDev, AI, CloudComputing, Cybersecurity, GameDev).

This is where the encoding approach diverges from the binary case.

**One-hot encoding both features AND target:**

```python
X_en = pd.get_dummies(X, drop_first=True)   # features: drop_first to avoid multicollinearity
y_en = pd.get_dummies(y)                     # target: do NOT drop_first — you need all class columns
```

Note: `drop_first=True` on the features, but NOT on the target. If you drop one class from the target, you can't recover which course was predicted.

**Aligning prediction rows to training columns:**

```python
test_en = pd.get_dummies(test, drop_first=True)
test_en = test_en.reindex(columns=X_en.columns, fill_value=0)
```

When you one-hot encode a single prediction row, it may not contain all the categories that appeared in training — so some columns will be missing. `reindex` fills them with 0, ensuring the prediction row has exactly the same shape as what the model was trained on.

**Decoding the prediction:**

```python
pred = model.predict(test_en)
pred_course = y_en.columns[pred.argmax()]
print(pred_course)  # e.g., 'DataScience'
```

`predict()` here returns a one-hot style array — `argmax()` finds the column (class) with the highest value, and `y_en.columns` maps it back to the course name.

---

## Key Gotchas Summary

| Situation | What to Watch Out For |
|-----------|----------------------|
| Binary target (Yes/No) | Map to 1/0 explicitly — don't rely on alphabetical encoding |
| Multi-class target | One-hot encode without `drop_first` — you need every class column |
| LabelEncoder on features | Fine for tree models, not for linear/distance models |
| Scaling with reserved prediction rows | `fit_transform` on train data, `transform` only on prediction rows |
| Prediction row has unseen categories | Use `reindex(columns=X_train.columns, fill_value=0)` after get_dummies |
| Accuracy on imbalanced classes | Use `classification_report()` — read per-class Precision, Recall, F1 |
| Outliers before regression | Check with IQR before scaling — one extreme value skews the whole scaler |
| Feature engineering | Derive meaningful columns before training (e.g., Car_Age = 2024 - Year) |
