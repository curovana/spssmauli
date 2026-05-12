import { ArrowRight, ClipboardCheck, HelpCircle } from "lucide-react";

const workflowSteps = [
  {
    title: "1. Find the outcome",
    body: "What is the researcher trying to explain, compare or predict?",
  },
  {
    title: "2. Classify it",
    body: "Continuous, categorical, binary, paired/repeated, or count/proportion?",
  },
  {
    title: "3. Find the predictor",
    body: "Group, exposure, time point, score, covariate, mediator or moderator?",
  },
  {
    title: "4. Choose the test",
    body: "Match the outcome and design to the shortest safe SPSS route.",
  },
  {
    title: "5. Read one table",
    body: "Use the table the question asks for: Sig., t, X2, r, B, Exp(B), CI or R2.",
  },
  {
    title: "6. Fill the blank",
    body: "Write significant/non-significant and use the exact denominator or effect size.",
  },
];

const testRows = [
  ["Variable type or summary", "Descriptives/Frequencies/Explore", "Counts, %, mean, SD, median, IQR"],
  ["Confidence interval for a mean", "Explore descriptives", "Mean, SE, lower and upper CI"],
  ["One continuous variable vs fixed value", "One-sample t-test", "One-Sample Test: Sig."],
  ["Continuous outcome, two separate groups", "Independent samples t-test", "Levene row, t, df, Sig."],
  ["Continuous before/after in same people", "Paired samples t-test", "Paired Samples Test: Sig."],
  ["Two categorical variables/proportions", "Crosstabs + chi-square", "Pearson Chi-Square or Fisher"],
  ["Skewed/non-normal group comparison", "Non-parametric test", "Hypothesis Test Summary"],
  ["Two continuous variables, association only", "Correlation", "r and Sig."],
  ["Continuous outcome, predictors", "Linear regression", "Coefficients B and Sig."],
  ["Continuous outcome, several predictors", "Multiple linear regression", "Adjusted B, Adjusted R2, residual checks"],
  ["Effect works through another variable", "Mediation", "a, b, c, c prime, indirect CI"],
  ["Effect differs by subgroup", "Interaction term", "Product-term B and Sig."],
  ["Possible influential case", "Outlier/influence checks", "Tukey fences, DFBETA, DFFIT"],
  ["Binary outcome, predictors", "Binary logistic regression", "Variables in the Equation: Exp(B)"],
];

export function ExamRescueWorkflow() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-indigo-600" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-slate-950">Exam Rescue Workflow</h2>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Use this same chain for every MCQ, SPSS practical and interpretation blank.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-2 md:grid-cols-3">
        {workflowSteps.map((step, index) => (
          <div key={step.title} className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold text-indigo-950">{step.title}</p>
              {index < workflowSteps.length - 1 ? <ArrowRight className="hidden h-4 w-4 text-indigo-400 md:block" aria-hidden="true" /> : null}
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-700">{step.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
        <div className="grid grid-cols-3 bg-slate-100 text-xs font-semibold uppercase tracking-normal text-slate-600">
          <div className="p-3">Question pattern</div>
          <div className="p-3">Choose</div>
          <div className="p-3">Read</div>
        </div>
        {testRows.map(([pattern, test, read]) => (
          <div key={pattern} className="grid grid-cols-1 border-t border-slate-200 text-sm sm:grid-cols-3">
            <div className="p-3 font-medium text-slate-950">{pattern}</div>
            <div className="p-3 text-slate-700">{test}</div>
            <div className="p-3 text-slate-600">{read}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-lg bg-amber-50 p-4">
        <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
        <p className="text-sm leading-6 text-amber-950">
          If stuck, do not start with the test name. Start with the outcome variable, then ask whether the data are
          continuous, categorical, binary, or paired.
        </p>
      </div>
    </section>
  );
}
