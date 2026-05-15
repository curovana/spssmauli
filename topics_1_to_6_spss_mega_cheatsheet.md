# Topics 1 to 6 SPSS Mega Cheatsheet

**Workflows only. Last-minute exam mode.**

---

## Topic 1: Descriptives

| Task | SPSS path | Put where / read |
|---|---|---|
| Categorical frequencies | **Analyze → Descriptive Statistics → Frequencies** | Variable(s) → read Frequency, Percent, Valid Percent |
| Numerical descriptives | **Analyze → Descriptive Statistics → Frequencies → Statistics** | Mean, Median, SD, Min, Max, Range, Quartiles |
| Histogram | **Frequencies → Charts → Histogram** | Tick normal curve if needed |
| Bar chart / pie chart | **Frequencies → Charts** | Use for categorical variables |

```text
Categorical → frequencies/percentages
Numerical normal → mean + SD
Numerical skewed → median + IQR/range
```

---

## Topic 2: Confidence Intervals

| Task | SPSS path | Read |
|---|---|---|
| CI for mean | **Analyze → Descriptive Statistics → Explore** | Descriptives table: Mean, SE, Lower Bound, Upper Bound |

```text
Mean = X, 95% CI [lower, upper]
Bigger sample → smaller SE → narrower CI
Higher confidence, 99% → wider CI
```

---

## Topic 3: One-Sample Tests

| Question | Test | SPSS path |
|---|---|---|
| Is one mean different from known value? | One-sample t-test | **Analyze → Compare Means → One-Sample T Test** |
| Is one proportion different from expected? | One-sample chi-square | **Analyze → Nonparametric Tests → Legacy Dialogs → Chi-Square** |

### One-Sample T-Test

| Box | Put |
|---|---|
| Test Variable(s) | Continuous variable |
| Test Value | Known value |

Read:

```text
One-Sample Test → t, df, Sig. 2-tailed, Mean Difference, 95% CI
```

### One-Sample Chi-Square

| Box | Put |
|---|---|
| Test Variable List | Categorical variable |
| Expected Values | Equal or custom proportions |

Critical trap:

```text
Custom expected values must follow SPSS category order.
```

---

## Topic 4: Parametric Group Comparisons

### One-Sample T-Test

```text
Analyze → Compare Means → One-Sample T Test
```

Use:

```text
Continuous variable vs known value
```

### Independent Samples T-Test

Use:

```text
Continuous outcome + two independent groups
```

SPSS:

```text
Analyze → Compare Means → Independent-Samples T Test
```

| Box | Put |
|---|---|
| Test Variable(s) | Continuous outcome |
| Grouping Variable | Group variable |
| Define Groups | e.g. 0 and 1 |

Read:

```text
Group Statistics → means/SDs
Independent Samples Test → Levene’s test, t, df, p
```

Levene rule:

```text
Levene p > 0.05 → Equal variances assumed row
Levene p < 0.05 → Equal variances not assumed row
```

### Paired Samples T-Test

Use:

```text
Continuous before/after in same people
```

SPSS:

```text
Analyze → Compare Means → Paired-Samples T Test
```

| Box | Put |
|---|---|
| Paired Variables | before variable + after variable |

Read:

```text
Paired Samples Test → Mean Difference, t, df, p, 95% CI
```

### Pearson Chi-Square

Use:

```text
Two independent categorical variables
```

SPSS:

```text
Analyze → Descriptive Statistics → Crosstabs
```

| Button | Choose |
|---|---|
| Rows | Variable 1 |
| Columns | Variable 2 |
| Statistics | Chi-square |
| Cells | Observed + Row % or Column % |

Read:

```text
Crosstab → proportions
Chi-Square Tests → Pearson Chi-Square, df, p
```

Percentage rule:

```text
Do not compare percentages that add to 100%.
Ask: “Among whom?”
```

### McNemar Test

Use:

```text
Paired categorical before/after yes/no
```

SPSS:

```text
Analyze → Descriptive Statistics → Crosstabs → Statistics → McNemar
```

Read:

```text
McNemar p-value
```

---

## Topic 5: Non-Parametric and Exact Tests

Use Topic 5 when Topic 4 assumptions break.

### One-Sample Wilcoxon Signed-Rank

Use:

```text
Skewed/ordinal/discrete variable vs known median
```

SPSS:

```text
Analyze → Nonparametric Tests → One Sample
```

Settings:

```text
Compare median to hypothesized value
```

Read:

```text
Z / standardized statistic, p
```

### Mann-Whitney U

Use:

```text
Skewed/ordinal/discrete outcome + two independent groups
```

SPSS:

```text
Analyze → Nonparametric Tests → Independent Samples
```

| Box | Put |
|---|---|
| Test Fields | Outcome |
| Groups | Grouping variable |
| Settings | Customize tests → Mann-Whitney U |

Read:

```text
Mann-Whitney U, p
```

### Wilcoxon Matched-Pair Signed-Rank

Use:

```text
Skewed/ordinal/discrete before/after same people
```

SPSS:

```text
Analyze → Nonparametric Tests → Related Samples
```

Settings:

```text
Customize tests → Wilcoxon matched-pair signed-rank
```

Read:

```text
Z / standardized statistic, p
```

### Fisher’s Exact Test

Use:

```text
Two independent categorical variables + chi-square expected counts fail
```

SPSS:

```text
Analyze → Descriptive Statistics → Crosstabs
Statistics → Chi-square
Exact → Exact
```

Read:

```text
Fisher’s Exact p-value
```

### Binomial Exact Test

Use:

```text
One categorical/binary variable vs expected proportion + small expected counts
```

SPSS:

```text
Analyze → Nonparametric Tests → Legacy Dialogs → Chi-Square → Exact
```

Read:

```text
Exact p-value
```

---

## Topic 6: Correlation and Linear Regression

### Scatterplot

Use:

```text
Visual relationship between two continuous variables
```

SPSS:

```text
Graphs → Legacy Dialogs → Scatter/Dot → Simple Scatter → Define
```

| Box | Put |
|---|---|
| Y-axis | Outcome/dependent variable |
| X-axis | Predictor/independent variable |

Interpret:

```text
Upward = positive
Downward = negative
Cloud tight = stronger
No pattern = no linear relationship
```

### Pearson Correlation

Use:

```text
Two continuous, roughly normal, linear variables
```

SPSS:

```text
Analyze → Correlate → Bivariate
```

Choose:

```text
Pearson
```

Read:

```text
Pearson Correlation r
Sig. 2-tailed p
N
```

### Spearman Correlation

Use:

```text
Skewed, ordinal, non-normal, or monotonic variables
```

SPSS:

```text
Analyze → Correlate → Bivariate
```

Choose:

```text
Spearman
```

Read:

```text
Spearman correlation rs
Sig. 2-tailed p
```

### Simple Linear Regression

Use:

```text
Continuous outcome + one predictor
```

SPSS:

```text
Analyze → Regression → Linear
```

| Box | Put |
|---|---|
| Dependent | Continuous outcome Y |
| Independent(s) | Predictor X |
| Statistics | Estimates + Confidence intervals |

Read:

| Table | Read |
|---|---|
| Model Summary | R, R² |
| ANOVA | Whole model p-value |
| Coefficients | B, t, p, 95% CI |

Prediction:

```text
Predicted Y = Constant + Bx
```

---

## Final Test-Selection Map

```text
Describe categorical → Frequencies
Describe numerical → Frequencies/Explore

One continuous vs known value → One-sample t-test
One categorical vs expected % → One-sample chi-square

Continuous normal, 2 independent groups → Independent t-test
Continuous normal, paired → Paired t-test

Categorical independent groups → Pearson chi-square
Categorical paired before/after → McNemar

Skewed/ordinal one sample → Wilcoxon signed-rank
Skewed/ordinal independent groups → Mann-Whitney U
Skewed/ordinal paired → Wilcoxon matched-pair

Chi-square assumptions fail → exact test
Independent categorical small counts → Fisher’s exact
One categorical small expected counts → Binomial exact

Two continuous normal variables → Pearson correlation
Two skewed/ordinal variables → Spearman correlation
Continuous outcome predicted by X → Linear regression
```

---

## Final Exam Rule

```text
First identify the outcome variable.
Then identify whether the design is one-sample, independent, or paired.
Then choose the test.
Then read the correct SPSS table.
```
