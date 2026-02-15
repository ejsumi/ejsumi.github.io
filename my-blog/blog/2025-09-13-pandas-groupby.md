---
title: "Pandas GroupBy in Practice: Real-World Scenarios and What to Watch Out For"
description: "Practical guide to GroupBy and aggregation using business scenarios — sales performance, campaign ROI, and support ticket analysis. Covers the gotchas learners commonly hit."
tags: [python, data analysis, learning]
---

When you work with real datasets, raw rows rarely tell the story — you need to roll them up. GroupBy is how you do that.

In these scenarios the data comes in as individual transactions or records, but the business question is always at a higher level: *How did each Sales Manager's team perform? Which Marketing Manager ran the most efficient campaigns? Which Team Lead resolves tickets the fastest?*

This post walks through three of those scenarios and highlights the things that trip people up along the way.

---

## Scenario 1: Sales Performance by Manager

**Dataset:** Individual sales transactions — each row is one sale, with columns for Salesperson, Sales Manager, Sale Amount, Region, Product Category, and Sale Date.

**Goal:** Produce one summary row per Sales Manager showing total revenue, number of transactions, team size, and average deal size.

### Grouping by a single column

```python
grouped = df.groupby('Sales_Manager')['Sale_Amount'].sum()
```

This gives you total revenue per manager — but it returns a **Series** with Sales_Manager as the index, not a column.

### Grouping by multiple columns

When you want a breakdown by Manager **and** Region:

```python
grouped = df.groupby(['Sales_Manager', 'Region'])['Sale_Amount'].sum()
```

Pass a list of column names. The result now has a **MultiIndex** (two-level index). To flatten it back into a regular DataFrame with normal columns:

```python
grouped = grouped.reset_index()
```

### Aggregating multiple metrics at once

Instead of calling `.groupby()` separately for each metric, use `.agg()` with a dictionary — one call, one clean result:

```python
summary = df.groupby('Sales_Manager').agg(
    Total_Revenue=('Sale_Amount', 'sum'),
    Transaction_Count=('Transaction_ID', 'count'),
    Avg_Deal_Size=('Sale_Amount', 'mean'),
    Team_Size=('Salesperson', 'nunique')
).reset_index()
```

**Watch out — `count()` vs `nunique()`:**
- `count()` counts all non-null rows in the group
- `nunique()` counts how many *distinct* values exist

If you use `count()` to measure Team Size, you'll get the number of transactions, not the number of unique salespeople. Use `nunique()` when the question is "how many different X".

### `as_index=False` — when do you need it?

By default, the column you group by becomes the index of the result:

```python
df.groupby('Sales_Manager')['Sale_Amount'].sum()
# Sales_Manager is now the index, not a regular column
```

Use `as_index=False` to keep it as a regular column — especially useful when you want to merge the result back into another DataFrame:

```python
df.groupby('Sales_Manager', as_index=False)['Sale_Amount'].sum()
```

Alternatively, chain `.reset_index()` after `.agg()` — same effect. Pick one and be consistent. With `.agg()`, the habit of ending with `.reset_index()` is cleaner since you're already building multiple columns at once.

---

## Scenario 2: Campaign ROI — Deriving Metrics After Aggregation

**Dataset:** Individual campaign executions — each row is one campaign run with columns for Marketing Manager, Budget, Revenue, Impressions, Clicks, and Conversions.

**Goal:** One row per Marketing Manager showing ROI %, Click-Through Rate, Conversion Rate, and Cost Per Conversion.

### Aggregate first, then calculate

The key insight: **you can't calculate ROI inside `.agg()`**. `.agg()` operates column by column. ROI needs both Revenue and Budget — two columns. So the pattern is: aggregate to get the totals, then derive the metrics on the resulting DataFrame.

```python
summary = df.groupby('Marketing_Manager').agg(
    Total_Budget=('Budget', 'sum'),
    Total_Revenue=('Revenue', 'sum'),
    Total_Clicks=('Clicks', 'sum'),
    Total_Impressions=('Impressions', 'sum'),
    Total_Conversions=('Conversions', 'sum'),
    Campaigns_Run=('Campaign_ID', 'count')
).reset_index()
```

Now derive the metrics on `summary`:

```python
summary['ROI_%'] = ((summary['Total_Revenue'] - summary['Total_Budget'])
                    / summary['Total_Budget'] * 100).round(2)

summary['CTR_%'] = (summary['Total_Clicks']
                    / summary['Total_Impressions'] * 100).round(2)

summary['Conversion_Rate_%'] = (summary['Total_Conversions']
                                 / summary['Total_Clicks'] * 100).round(2)

summary['Cost_Per_Conversion'] = (summary['Total_Budget']
                                   / summary['Total_Conversions']).round(2)
```

This keeps the logic clean — aggregation in one block, derived metrics in a second block.

**Tip:** If you want formatted output (e.g., currency or percentage strings), do that as a final display step, not on the working columns. Keep the numeric columns numeric so you can still sort or filter on them.

```python
# For display only
summary['ROI_%'].map('{:.2f}%'.format)
```

---

## Scenario 3: Support Ticket Analysis — Filtering Groups and Conditional Counts

**Dataset:** Support tickets — each row is one ticket with columns for Agent, Team Lead, Resolution Time (hours), Priority (Low/Medium/High/Critical), Customer Satisfaction Score (1–5), and Department.

**Goal:** Team-level summary with average resolution time, satisfaction rate, and count of critical tickets handled.

### Counting conditional rows within a group

How many Critical priority tickets did each Team Lead's team handle? You can't use a plain `count()` for this — you need to count only rows where Priority == 'Critical'.

One approach: filter first, then group:

```python
critical_counts = df[df['Priority'] == 'Critical']\
    .groupby('Team_Lead')['Ticket_ID'].count()\
    .reset_index()\
    .rename(columns={'Ticket_ID': 'Critical_Tickets'})
```

A cleaner approach: create a flag column, then aggregate it:

```python
df['Is_Critical'] = (df['Priority'] == 'Critical').astype(int)

summary = df.groupby('Team_Lead').agg(
    Total_Tickets=('Ticket_ID', 'count'),
    Avg_Resolution_Hours=('Resolution_Time', 'mean'),
    Avg_Satisfaction=('Satisfaction_Score', 'mean'),
    Critical_Tickets=('Is_Critical', 'sum')
).reset_index()
```

The flag column (0 or 1) means `sum()` gives you the count of matching rows — a useful pattern for any conditional count inside `.agg()`.

### Satisfaction Rate — percentage of tickets rated 4 or above

Same pattern — create a flag, then sum it:

```python
df['High_Satisfaction'] = (df['Satisfaction_Score'] >= 4).astype(int)

summary = df.groupby('Team_Lead').agg(
    Total_Tickets=('Ticket_ID', 'count'),
    High_Sat_Count=('High_Satisfaction', 'sum')
).reset_index()

summary['Satisfaction_Rate_%'] = (summary['High_Sat_Count']
                                   / summary['Total_Tickets'] * 100).round(1)
```

### Using `.filter()` on groups

`.filter()` is different from `.agg()` — it doesn't collapse groups. It returns the **original rows** from groups that meet a condition. Use it when you want to subset the data to only certain groups:

```python
# Keep only rows belonging to teams with avg satisfaction >= 4.0
high_performing_teams = df.groupby('Team_Lead').filter(
    lambda x: x['Satisfaction_Score'].mean() >= 4.0
)
```

This returns a DataFrame with all the original columns — not a summary. Useful when you want to drill into high or low performing groups for further analysis.

---

## Common Gotchas Summary

| Situation | What to do |
|-----------|------------|
| Group column becomes the index | Chain `.reset_index()` or use `as_index=False` |
| Need distinct count per group | Use `nunique()`, not `count()` |
| Need a metric that uses two columns (ROI, rate) | Calculate it after `.agg()`, not inside it |
| Grouped by two columns and got MultiIndex | `.reset_index()` flattens it |
| Need to count rows matching a condition per group | Create a 0/1 flag column, then `sum()` it in `.agg()` |
| Want to keep original rows for only some groups | Use `.filter()`, not `.agg()` |
