# StatsDrill AI Content Overhaul Plan

## Purpose

StatsDrill AI must become a standalone last-day revision tool for a weak beginner preparing for the KCL MSc Affective Disorders Introduction to Statistics and SPSS exam.

The current app has a useful structure, but the content still feels too much like lecture PDFs converted into cards. The overhaul goal is to make the app usable without opening the PDFs, without needing a tutor beside the student, and without assuming confidence in maths, statistics, or SPSS.

The product standard is:

> A student should be able to open any topic at midnight before the exam, recognise the exam question pattern, choose the correct test, remember the SPSS path, read the right table, and fill the answer blank.

## Core Problem To Fix

The app currently has several content problems:

- Some explanations are still lecture-shaped rather than exam-shaped.
- Some questions reference lecture tables or examples without showing enough context inside the app.
- Some drills assume the student already understands the PDF.
- Some stems are vague, overlong, or not self-contained.
- Some feedback explains the correct answer but not the student's likely mistake.
- The UI presents too many panels at once for an overwhelmed beginner.
- The app needs more "what do I do next?" guidance and fewer dense lists.

This overhaul is not a copy-editing pass. It is a learning-design rewrite.

## Non-Negotiable Content Rules

Every level must pass these rules:

1. It teaches one idea only.
2. It is understandable without the PDF open.
3. It starts from exam wording or a realistic research question.
4. It tells the student what variable is the outcome.
5. It tells the student what variable is the predictor or grouping variable.
6. It classifies the variables in plain English.
7. It names the test or SPSS workflow only after the variables are identified.
8. It shows the SPSS path when relevant.
9. It shows the exact output table or value to read when relevant.
10. It gives one answer sentence the student can imitate.

Every question must pass these rules:

1. It is self-contained.
2. It includes all data, output values, or tables needed to answer.
3. It asks one clear task.
4. It avoids "according to the lecture" unless the relevant table or facts are shown.
5. It uses plausible wrong answers based on real beginner mistakes.
6. It gives mistake-specific feedback.
7. It avoids trickiness that does not match the exam.
8. It has a skill tag that helps weak-area revision.

## Student Voice Standard

All explanations should sound like this:

- "First find the outcome. The outcome is what the researcher is trying to explain."
- "This is a yes/no outcome, so ordinary linear regression is not the safe choice."
- "Use Exp(B), not B, because Exp(B) is the odds ratio."
- "This blank says 'of those who did not adhere', so the denominator is the non-adherent group."

Avoid:

- Dense lecture phrasing.
- Abstract theory before practical recognition.
- Long paragraphs.
- Unsupported facts.
- Output values with no explanation of where they came from.
- Questions that require the PDF to be open.

## New Level Template

Each rewritten level should follow this structure:

1. **Exam Trigger**
   What wording tells the student this level matters?

2. **Tiny Explanation**
   One beginner-safe explanation in plain English.

3. **Recognition Pattern**
   How to spot it in a research question.

4. **SPSS Move**
   The menu path or workflow, if relevant.

5. **Output Decoder**
   The exact SPSS table and values to read.

6. **Worked Example**
   A complete example with all needed data or output shown inside the app.

7. **Memory Hook**
   One short phrase that helps recall.

8. **Active Recall**
   One low-stress question to check the concept.

9. **Exam Drill**
   One harder exam-style question.

10. **Mistake Feedback**
   Beginner-friendly explanations for common wrong answers.

## New Question Template

Every exam-style question should include:

- Research question.
- Variables.
- Variable types.
- Mini table, SPSS output, or enough numbers to calculate.
- Clear instruction.
- Answer options or blanks.
- Correct answer.
- Feedback for each wrong answer.

Example quality bar:

```text
Researchers ask whether smoking during pregnancy is associated with low birthweight.

Outcome: low birthweight, coded yes/no.
Predictor: smoking during pregnancy, coded smoker/non-smoker.

SPSS output:
Pearson Chi-Square = 4.972, df = 1, p = .026

Question:
Which conclusion is safest?

Correct:
Smoking status and low birthweight are statistically associated, X2(1) = 4.972, p = .026.

Feedback if wrong:
This table tests association between two categorical variables. It does not prove smoking caused low birthweight.
```

## Phase 1: Product Simplification

Goal: Reduce cognitive overload before rewriting all content.

Tasks:

- Redesign topic pages so the first screen prioritises "What this topic is for" and "How to recognise it."
- Move source PDF details lower on the page or behind a small traceability section.
- Make "Last-Day Revision" the main topic entry point.
- Collapse long cheat sheets into shorter high-yield rules.
- Ensure the level page flows in this order: recognise, learn, do SPSS, read output, drill.
- Reduce repeated panels where they duplicate the same information.

Acceptance criteria:

- A weak beginner can open a topic and understand what it is used for within 20 seconds.
- The page does not feel like a dashboard of unrelated widgets.
- The main action is obvious: start level, practice, or mock exam.

## Phase 2: Topic 10 Gold Standard Rewrite

Goal: Rewrite Topic 10 first because it is high-yield, complex, and currently the best test of the product.

Topic 10 must become the model for every other topic.

Levels to rewrite:

1. Binary outcomes.
2. Crosstabs and contingency tables.
3. Risk versus odds.
4. Risk ratio versus odds ratio.
5. Pearson chi-square and Fisher's exact.
6. Why binary logistic regression is used.
7. B versus Exp(B).
8. Adjusted odds ratios.
9. Reference categories.
10. Confounders, mediators, moderators.
11. Classification table metrics.
12. Model fit and Hosmer-Lemeshow.
13. Predicted probability.
14. Topic 10 exam simulation.

Required standalone examples:

- Smoking and low birthweight crosstab.
- Risk = 13 / 22.
- Odds = 13 / 9.
- Risk ratio = 2.36.
- Odds ratio = 4.333.
- Pearson Chi-Square = 4.972, df = 1, p = .026.
- Exp(B) = 4.333, p = .030, CI 1.156 to 16.248.
- Adjusted Exp(B) = 4.831, p = .026, CI 1.204 to 19.386.
- Omnibus Chi-Square = 8.573, p = .014.
- Nagelkerke R2 = 24.8%.
- Sensitivity = 13 / 18 = 72.2%.
- Specificity = 15 / 24 = 62.5%.
- PPV = 13 / 22 = 59.1%.
- NPV = 15 / 20 = 75%.
- Hosmer-Lemeshow p = .519.
- Predicted probability example: odds = 2.924, probability = 74.5%.

Topic 10 acceptance criteria:

- No question requires the lecture PDF.
- Every output question shows the relevant output table.
- Every calculation shows the needed numbers.
- Every wrong answer teaches a specific beginner trap.
- The student can explain the difference between risk, odds, OR, B, and Exp(B).

## Phase 3: Topics 1-5 Foundation Rewrite

Goal: Make the early topics feel like foundations, not lecture summaries.

### Topic 1: Measurement and Descriptives

Rewrite focus:

- Variable types.
- Categorical versus numerical.
- Nominal, ordinal, discrete, continuous.
- Counts and percentages.
- Mean and SD.
- Median and IQR.
- Histograms, skew, boxplots and outliers.

Must train:

- "What kind of variable is this?"
- "What summary should I use?"
- "Which SPSS menu gives that summary?"
- "Which graph makes sense?"

Questions to create:

- Variable classification MCQs.
- Match variable type to summary.
- Read a frequency table.
- Read a descriptives table.
- Choose mean/SD versus median/IQR.

### Topic 2: Confidence and Significance I

Rewrite focus:

- Sample versus population.
- Statistic versus parameter.
- Random error versus systematic error.
- Standard error.
- Confidence intervals.

Must train:

- "What does a CI mean in plain English?"
- "What does SE tell me?"
- "Does the CI include the comparison value?"

Questions to create:

- CI interpretation MCQs.
- Fill blanks for point estimate, lower bound, upper bound.
- SE versus SD distinction.
- Sampling error scenarios.

### Topic 3: Hypothesis Testing

Rewrite focus:

- Null and alternative hypotheses.
- p-values.
- Alpha.
- Type I and Type II error.
- One-sample t-test.
- One-sample chi-square.

Must train:

- "What is H0?"
- "Is p below .05?"
- "Do I reject or fail to reject?"
- "Which one-sample test fits?"

Questions to create:

- H0/Ha recognition.
- p-value decisions.
- One-sample t-test output interpretation.
- One-sample chi-square output interpretation.

### Topic 4: T-tests and Chi-square

Rewrite focus:

- One-sample t-test.
- Independent samples t-test.
- Paired samples t-test.
- Pearson chi-square.
- McNemar.
- Levene's test row choice.

Must train:

- "Is the outcome continuous or categorical?"
- "Are groups independent or paired?"
- "Which SPSS output row should I read?"

Questions to create:

- Test selection scenarios.
- Levene's row choice.
- t-test table interpretation.
- Chi-square table interpretation.
- McNemar paired binary scenario.

### Topic 5: Non-parametric and Exact Tests

Rewrite focus:

- Why non-parametric tests are backups.
- One-sample Wilcoxon.
- Mann-Whitney U.
- Wilcoxon signed-rank.
- Fisher's exact test.

Must train:

- "Same design, backup test."
- "Independent versus related still matters."
- "Use Fisher when expected counts are too small."

Questions to create:

- Parametric test to non-parametric backup matching.
- Mann-Whitney versus Wilcoxon paired scenarios.
- Fisher's exact output interpretation.
- Exact significance fill blanks.

## Phase 4: Topics 6-9 Practical Output Rewrite

Goal: Make later topics exam-executable and output-focused.

### Topic 6: Correlation and Linear Regression

Rewrite focus:

- Scatterplots.
- Pearson versus Spearman.
- Correlation does not imply causation.
- Simple linear regression.
- B coefficient.
- R and R2.
- Categorical predictors and dummy variables.

Must train:

- "Association only or prediction?"
- "Read r for correlation."
- "Read B for regression."
- "Use R2 for variation explained."

Questions to create:

- Pearson/Spearman selection.
- Correlation output interpretation.
- Regression coefficient interpretation.
- Prediction from y = a + bx.
- Dummy variable interpretation.

### Topic 7: Multiple Regression and Confounding

Rewrite focus:

- Multiple predictors.
- Adjusted B.
- Confounders.
- Model comparison.
- Adjusted R2.
- Assumption checks.
- Residual plots.

Must train:

- "Adjusted means holding other variables constant."
- "A confounder is related to predictor and outcome."
- "Residual plots show whether assumptions are reasonable."

Questions to create:

- Adjusted coefficient interpretation.
- Confounder identification.
- Model choice using adjusted R2.
- Residual assumption diagnosis.

### Topic 8: Mediation

Rewrite focus:

- X, M, Y.
- Path c, a, b and c prime.
- Direct, indirect and total effects.
- Baron and Kenny.
- Sobel.
- Bootstrap CI.
- PROCESS output.

Must train:

- "Mediation asks how an effect happens."
- "Indirect effect = a times b."
- "Indirect-effect CI is judged against 0."

Questions to create:

- Label path diagram.
- Identify mediator versus confounder versus moderator.
- Complete Baron and Kenny steps.
- Read PROCESS indirect effect CI.
- Complete mediation versus partial mediation.

### Topic 9: Interaction and Outliers

Rewrite focus:

- Effect modification.
- Moderator.
- Interaction product terms.
- Dummy variables for multi-level categories.
- Presenting interactions.
- Tukey fences.
- DFBETA and DFFIT.

Must train:

- "Interaction asks whether the effect differs by subgroup."
- "Create a product term."
- "Outlier is unusual; influential means it changes the model."

Questions to create:

- Interaction recognition.
- Product term workflow.
- Interpret interaction coefficient.
- Compute simple slopes.
- Flag outliers using IQR fences.
- Interpret DFBETA and DFFIT.

## Phase 5: Question Bank Replacement

Goal: Replace weak questions with a smaller but stronger exam bank.

Minimum question counts:

- 5 active recall questions per topic.
- 5 exam drills per topic.
- 2 SPSS workflow questions per topic.
- 2 output interpretation questions per output-heavy topic.
- 1 mixed exam simulation set per major topic group.

Question categories:

- MCQ: concept and test selection.
- Fill blank: exam sentence completion.
- Drag/drop: values into interpretation sentence.
- Calculation: risk, odds, sensitivity, specificity, prediction.
- Output interpretation: SPSS table reading.
- Test selection: research question to test.

Question quality checklist:

- Does the stem include all needed context?
- Is the correct answer unambiguous?
- Are wrong answers plausible beginner mistakes?
- Does feedback explain why the mistake happens?
- Does the question train a real exam action?
- Would the student understand it without a PDF?

## Phase 6: UI Decluttering

Goal: Make the app feel calm, guided and not overwhelming.

Topic page changes:

- Put "Exam Trigger" at the top.
- Show "How to recognise this topic" before the full level path.
- Make cheat sheets shorter and more visual.
- Move PDF source references into a compact traceability section.
- Add "Start 20-minute revision" as the main action.

Level page changes:

- Use a step-by-step layout:
  1. Recognise the question.
  2. Identify variables.
  3. Choose test or workflow.
  4. Read output.
  5. Answer.
- Collapse formulas unless needed.
- Show SPSS paths as compact chips.
- Keep one worked example visible before asking a drill.

Practice page changes:

- Let student choose:
  - Weak areas.
  - Test selection only.
  - SPSS paths only.
  - Output interpretation only.
  - Calculations only.
- Default to "exam survival mix."

Mock exam changes:

- Questions must be self-contained.
- Hints should be hidden by default.
- After submission, show the shortest correct reasoning path.

## Phase 7: Sister-Mode QA

Goal: Test the app like the real user.

For each topic, answer these:

1. Can a weak beginner understand the first screen in 20 seconds?
2. Can the student identify the outcome and predictor in every drill?
3. Does every question include all needed data/output?
4. Does every feedback message teach the likely mistake?
5. Is the SPSS path explicit when relevant?
6. Is there any paragraph that can be cut in half?
7. Is any level dependent on the PDF being open?
8. Can the student revise this topic in 15-20 minutes?

Any topic that fails one of these needs another rewrite.

## Implementation Order

Recommended order:

1. Rewrite Topic 10 fully as the gold standard.
2. Update components if the new content template needs better rendering.
3. QA Topic 10 end to end.
4. Rewrite Topic 1.
5. Rewrite Topic 4.
6. Rewrite Topic 6.
7. Rewrite Topic 7.
8. Rewrite Topic 8.
9. Rewrite Topic 9.
10. Rewrite Topics 2, 3 and 5.
11. Replace mixed practice and mock exam questions.
12. Final UI declutter pass.
13. Final production build and deploy.

Reasoning:

- Topic 10 proves the hardest output interpretation workflow.
- Topic 1 and Topic 4 are foundational and high-yield.
- Topics 6-9 benefit from the same output-decoder pattern.
- Topics 2, 3 and 5 are conceptually smaller and can follow the new style quickly.

## Definition Of Done

The overhaul is done when:

- Every topic can stand alone without the PDFs.
- Every level has one clear purpose.
- Every question is self-contained.
- Every SPSS workflow says exactly what to click.
- Every output interpretation names the exact table and value.
- Every wrong answer gives mistake-specific feedback.
- The dashboard feels like a revision command centre, not a content dump.
- The app builds successfully.
- The deployed link works.
- A weak beginner can use the app for last-day revision without getting more overwhelmed.

## Deployment Requirement

The public GitHub Pages deployment must continue to work after each overhaul phase:

- Repo: `curovana/spssmauli`
- Public URL: `https://curovana.github.io/spssmauli/`
- Build mode: static Next.js export with `GITHUB_PAGES=true`

Before pushing each major phase:

```bash
pnpm exec tsc --noEmit
pnpm lint
GITHUB_PAGES=true pnpm build
```

After pushing:

```bash
gh run watch --repo curovana/spssmauli
curl -I https://curovana.github.io/spssmauli/
```

