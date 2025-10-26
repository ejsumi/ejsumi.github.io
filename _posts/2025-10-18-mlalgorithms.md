---
title: "Machine Learning Algorithms Quick Reference"
categories: [learnings]
tags: [python, data analysis]
---
This quick reference guide breaks down the most important ML algorithms across supervised learning, unsupervised learning, ensemble methods, and neural networks—complete with descriptions, use cases, and ready-to-use scikit-learn code snippets. Whether you're building your first model or need a quick lookup for your next project, this guide has you covered.

## Supervised Learning - Regression

| Type | ML Algorithm | Description | When to Use | Code Snippet | Model Call |
|------|-------------|-------------|-------------|--------------|------------|
| Supervised Regression | Linear Regression | Predicts continuous values by fitting a linear relationship between features and target | Predicting house prices, sales forecasting, temperature prediction | ```from sklearn.linear_model import LinearRegression``` | ```model = LinearRegression()``` |
| Supervised Regression | Ridge Regression | Linear regression with L2 regularization to prevent overfitting | When you have multicollinearity or need to prevent overfitting | ```from sklearn.linear_model import Ridge``` | ```model = Ridge(alpha=1.0)``` |
| Supervised Regression | Lasso Regression | Linear regression with L1 regularization for feature selection | When you want automatic feature selection and sparse models | ```from sklearn.linear_model import Lasso``` | ```model = Lasso(alpha=0.1)``` |

## Supervised Learning - Classification

| Type | ML Algorithm | Description | When to Use | Code Snippet | Model Call |
|------|-------------|-------------|-------------|--------------|------------|
| Supervised Classification | Logistic Regression | Binary or multiclass classification using logistic function | Email spam detection, disease diagnosis, customer churn prediction | ```from sklearn.linear_model import LogisticRegression``` | ```model = LogisticRegression()``` |
| Supervised Classification | Decision Trees | Tree-based model that splits data based on feature values | When you need interpretable results, handles non-linear relationships | ```from sklearn.tree import DecisionTreeClassifier``` | ```model = DecisionTreeClassifier()``` |
| Supervised Classification | Random Forest | Ensemble of decision trees using bagging | When you need high accuracy and can sacrifice interpretability | ```from sklearn.ensemble import RandomForestClassifier``` | ```model = RandomForestClassifier(n_estimators=100)``` |
| Supervised Classification | Support Vector Machines | Finds optimal hyperplane to separate classes | Image classification, text categorization, small to medium datasets | ```from sklearn.svm import SVC``` | ```model = SVC(kernel='rbf')``` |
| Supervised Classification | k-Nearest Neighbors | Classifies based on majority vote of k nearest neighbors | Simple classification tasks, recommendation systems | ```from sklearn.neighbors import KNeighborsClassifier``` | ```model = KNeighborsClassifier(n_neighbors=5)``` |
| Supervised Classification | Naive Bayes | Probabilistic classifier based on Bayes theorem | Text classification, spam filtering, sentiment analysis | ```from sklearn.naive_bayes import GaussianNB``` | ```model = GaussianNB()``` |
| Supervised Classification | Gradient Boosting | Sequential ensemble that corrects previous errors | Kaggle competitions, when you need maximum accuracy | ```from sklearn.ensemble import GradientBoostingClassifier``` | ```model = GradientBoostingClassifier()``` |

## Unsupervised Learning

| Type | ML Algorithm | Description | When to Use | Code Snippet | Model Call |
|------|-------------|-------------|-------------|--------------|------------|
| Unsupervised Clustering | K-Means | Partitions data into k clusters based on similarity | Customer segmentation, image compression, anomaly detection | ```from sklearn.cluster import KMeans``` | ```model = KMeans(n_clusters=3)``` |
| Unsupervised Clustering | Hierarchical Clustering | Creates tree of nested clusters | When you do not know number of clusters, taxonomies | ```from sklearn.cluster import AgglomerativeClustering``` | ```model = AgglomerativeClustering(n_clusters=3)``` |
| Unsupervised Clustering | DBSCAN | Density-based clustering that finds arbitrary shapes | When clusters have irregular shapes, presence of noise | ```from sklearn.cluster import DBSCAN``` | ```model = DBSCAN(eps=0.5, min_samples=5)``` |
| Unsupervised Dimensionality Reduction | PCA | Reduces dimensions while preserving maximum variance | Data visualization, noise reduction, feature extraction | ```from sklearn.decomposition import PCA``` | ```model = PCA(n_components=2)``` |
| Unsupervised Dimensionality Reduction | t-SNE | Non-linear dimensionality reduction for visualization | Visualizing high-dimensional data in 2D or 3D | ```from sklearn.manifold import TSNE``` | ```model = TSNE(n_components=2)``` |

## Ensemble Methods

| Type | ML Algorithm | Description | When to Use | Code Snippet | Model Call |
|------|-------------|-------------|-------------|--------------|------------|
| Ensemble | Random Forest | Bagging ensemble of decision trees | General purpose classification and regression | ```from sklearn.ensemble import RandomForestClassifier``` | ```model = RandomForestClassifier(n_estimators=100)``` |
| Ensemble | AdaBoost | Adaptive boosting that focuses on misclassified samples | When you have weak learners and need to boost performance | ```from sklearn.ensemble import AdaBoostClassifier``` | ```model = AdaBoostClassifier(n_estimators=50)``` |
| Ensemble | Gradient Boosting | Sequential boosting that minimizes loss function | Competition-level accuracy, structured data | ```from sklearn.ensemble import GradientBoostingClassifier``` | ```model = GradientBoostingClassifier()``` |
| Ensemble | Voting Classifier | Combines predictions from multiple models | When you want to leverage different algorithm strengths | ```from sklearn.ensemble import VotingClassifier``` | ```model = VotingClassifier(estimators=list_of_models)``` |

## Neural Networks

| Type | ML Algorithm | Description | When to Use | Code Snippet | Model Call |
|------|-------------|-------------|-------------|--------------|------------|
| Neural Network | Multi-Layer Perceptron | Feedforward neural network with backpropagation | Complex non-linear patterns, medium-sized datasets | ```from sklearn.neural_network import MLPClassifier``` | ```model = MLPClassifier(hidden_layer_sizes=(100,))``` |
| Neural Network | MLP Regressor | Neural network for regression tasks | Non-linear regression problems | ```from sklearn.neural_network import MLPRegressor``` | ```model = MLPRegressor(hidden_layer_sizes=(100,))``` |

## Other Important Algorithms

| Type | ML Algorithm | Description | When to Use | Code Snippet | Model Call |
|------|-------------|-------------|-------------|--------------|------------|
| Preprocessing | Standard Scaler | Standardizes features by removing mean and scaling to unit variance | Before using algorithms sensitive to feature scales like SVM and KNN | ```from sklearn.preprocessing import StandardScaler```| ```scaler = StandardScaler()``` |
| Model Selection | Grid Search CV | Exhaustive search over hyperparameter space | Finding optimal hyperparameters | ```from sklearn.model_selection import GridSearchCV``` | ```grid = GridSearchCV(estimator, param_grid)``` |

## Basic Usage Pattern

```python
# 1. Import and create model
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=100)

# 2. Train the model
model.fit(X_train, y_train)

# 3. Make predictions
predictions = model.predict(X_test)

# 4. Evaluate
from sklearn.metrics import accuracy_score

```
