\## Overview



\- open source library for Data Analysis and Data manipulatiion

\- built on top of NumPy and integrates well with other libraries like Matplotlib, Seaborn, Scikit-learn



2 primary data structures

\- Series - 1 D array

\- DataFrames - 2 D array hetrogeneous table like excel, sql, with rows amd columns.



\## Key Features

\- \*\*Easy Handling of Missing Data\*\* - - With functions like .fillna(), .dropna(), and more.



\- \*\*Data Alignment and Indexing\*\* allows for label-based and position-based data selection and slicing.

&nbsp;

\- \*\*Data Filtering and Transformation\*\* - using conditions, and transformation using apply(), map(), etc.



\- \*\*Merging and Joining\*\* - Similar to SQL joins via merge(), join(), and concat() functions.



\- \*\*GroupBy Functionality\*\* - Split data into groups, apply operations, and combine results.



\- \*\*Time Series Support\*\* - Built-in support for date and time operations.



\- \*\*Read/Write from Multiple File Formats\*\* - Supports CSV, Excel, JSON, SQL, and more.





\## Quick Reference



\### Load a CSV File



```python

df = pd.read\_csv('data.csv')

```



\### Dropping a Column



```python

df = df.drop('column\_name', axis=1)

```



\###  Filling Missing Values 



\- with Median



```python

df\['col'] = df\['col'].fillna(df\['col'].median())

```



\- with Mode



```python

df\['col'] = df\['col'].fillna(df\['col'].mode()\[0])

```



\### Combining Two Columns into One



```python

df\['combined'] = df\['col1'].astype(str) + '\_' + df\['col2'].astype(str)

```



\### Converting to Numeric (with errors turned to NaN)



```python

df\['col'] = pd.to\_numeric(df\['col'], errors='coerce')

```



\### Filtering Rows Based on Condition



```python

filtered\_df = df\[df\['col'] > 10]

```

\### One-Hot Encoding Categorical Features



```python

df = pd.get\_dummies(df, columns=\['category\_column'])

```



\### Label Encoding



```python

df\['encoded'] = df\['category\_column'].astype('category').cat.codes

```



\### Rename Columns



```python

df = df.rename(columns={'old\_name': 'new\_name'})

```



\### Groupby and Aggregate



```python

grouped = df.groupby('category')\['col'].mean()

```



\### Sorting DataFrame



```python

df = df.sort\_values(by='col', ascending=False)

```



\### Reset Index



```python

df = df.reset\_index(drop=True)

```



\### Selecting Multiple Columns



```python

selected = df\[\['col1', 'col2', 'col3']]

```



\### Date time operations

\-  Conversion to date time column

```python

df\['date\_column'] = pd.to\_datetime(df\['date\_column'])

```



\-  Extract Date, Year, Month, and Day

```python

df\['date'] = df\['date\_column'].dt.date        # Extract date

df\['year'] = df\['date\_column'].dt.year        # Extract year

df\['month'] = df\['date\_column'].dt.month      # Extract month

df\['day'] = df\['date\_column'].dt.day          # Extract day

```



\- Extract Time Component

```python

df\['time'] = df\['date\_column'].dt.time

```



\- Combine Year, Month, Day, and Time Columns into a Single Datetime

```python

df\['datetime'] = pd.to\_datetime(df\[\['year', 'month', 'day', 'hour', 'minute', 'second']])

```



\- Filter or Select Data for a Specific Time Period

```python

df\[(df\['date\_column'] >= '2023-01-01') \& (df\['date\_column'] < '2024-01-01')]

```



Tip: Use .dt accessor for various datetime features (like dt.hour, dt.minute, dt.dayofweek, etc.) to further engineer time-related columns or extract more granularity from your datetime data



\### Replace Operations



\- Replace specific characters

```python

\# Replace spaces and '/' with NaN in all columns

df.replace(\[' ', '/'], np.nan, inplace=True)



\# Replace only in a specific column

df\['col'] = df\['col'].replace(\[' ', '/'], np.nan)

```



\- Replace using Regex

```python

\# Replace spaces and '/' characters with NaN using regex in a column

df\['col'] = df\['col'].replace(r'\[ /]', np.nan, regex=True)



\# To replace with another value (e.g., 'missing')

df\['col'] = df\['col'].replace(r'\[ /]', 'missing', regex=True)

```



Tip:



\- Use np.nan to replace with NaN.

\- Use the regex=True argument to match patterns (e.g., all whitespace or special characters).

\- Set inplace=True to modify the DataFrame directly.

\- These patterns work for spaces, slashes, or any regex you specify!





```

