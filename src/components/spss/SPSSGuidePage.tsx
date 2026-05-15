"use client";

import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Compass,
  FileSearch,
  ListChecks,
  MessageSquareQuote,
  Printer,
  Search,
  Sparkles,
  Table2,
  Target,
  Workflow,
  X,
} from "lucide-react";
import {
  spssDecisionRows,
  spssLastMinuteRules,
  spssMegaCategories,
  spssMegaWorkflows,
  type SpssMegaWorkflow,
} from "@/content/spss-mega-cheatsheet";

type CategoryStyle = {
  accent: string;
  chip: string;
  pathBg: string;
  pathText: string;
  headerBg: string;
  border: string;
  ring: string;
  dot: string;
};

const categoryStyles: Record<string, CategoryStyle> = {
  "Data prep and safety": {
    accent: "bg-slate-500",
    chip: "bg-slate-100 text-slate-700",
    pathBg: "bg-slate-100",
    pathText: "text-slate-800",
    headerBg: "bg-slate-50",
    border: "border-slate-200",
    ring: "hover:ring-slate-300",
    dot: "bg-slate-500",
  },
  "Descriptives and normality": {
    accent: "bg-emerald-500",
    chip: "bg-emerald-100 text-emerald-800",
    pathBg: "bg-emerald-50",
    pathText: "text-emerald-900",
    headerBg: "bg-emerald-50/60",
    border: "border-emerald-200",
    ring: "hover:ring-emerald-300",
    dot: "bg-emerald-500",
  },
  "Means and t-tests": {
    accent: "bg-indigo-500",
    chip: "bg-indigo-100 text-indigo-800",
    pathBg: "bg-indigo-50",
    pathText: "text-indigo-900",
    headerBg: "bg-indigo-50/60",
    border: "border-indigo-200",
    ring: "hover:ring-indigo-300",
    dot: "bg-indigo-500",
  },
  "Proportions and chi-square": {
    accent: "bg-violet-500",
    chip: "bg-violet-100 text-violet-800",
    pathBg: "bg-violet-50",
    pathText: "text-violet-900",
    headerBg: "bg-violet-50/60",
    border: "border-violet-200",
    ring: "hover:ring-violet-300",
    dot: "bg-violet-500",
  },
  "Non-parametric tests": {
    accent: "bg-amber-500",
    chip: "bg-amber-100 text-amber-900",
    pathBg: "bg-amber-50",
    pathText: "text-amber-900",
    headerBg: "bg-amber-50/60",
    border: "border-amber-200",
    ring: "hover:ring-amber-300",
    dot: "bg-amber-500",
  },
  "Correlation and linear regression": {
    accent: "bg-sky-500",
    chip: "bg-sky-100 text-sky-800",
    pathBg: "bg-sky-50",
    pathText: "text-sky-900",
    headerBg: "bg-sky-50/60",
    border: "border-sky-200",
    ring: "hover:ring-sky-300",
    dot: "bg-sky-500",
  },
  "Mediation, interaction and outliers": {
    accent: "bg-rose-500",
    chip: "bg-rose-100 text-rose-800",
    pathBg: "bg-rose-50",
    pathText: "text-rose-900",
    headerBg: "bg-rose-50/60",
    border: "border-rose-200",
    ring: "hover:ring-rose-300",
    dot: "bg-rose-500",
  },
  "Binary logistic regression": {
    accent: "bg-red-500",
    chip: "bg-red-100 text-red-800",
    pathBg: "bg-red-50",
    pathText: "text-red-900",
    headerBg: "bg-red-50/60",
    border: "border-red-200",
    ring: "hover:ring-red-300",
    dot: "bg-red-500",
  },
};

const fallbackStyle: CategoryStyle = categoryStyles["Data prep and safety"];

type DecisionMapSection = {
  title: string;
  color: string;
  items: Array<{ question: string; test: string; workflowId: string }>;
};

const decisionMapSections: DecisionMapSection[] = [
  {
    title: "Describing one variable",
    color: "bg-emerald-500",
    items: [
      { question: "Categorical variable", test: "Frequencies", workflowId: "frequencies-categorical" },
      { question: "Numerical variable", test: "Frequencies / Explore", workflowId: "numerical-descriptives-histogram" },
      { question: "95% CI for a mean", test: "Explore", workflowId: "explore-confidence-interval" },
    ],
  },
  {
    title: "One-sample tests",
    color: "bg-indigo-500",
    items: [
      { question: "Continuous vs known value", test: "One-sample t-test", workflowId: "one-sample-t" },
      { question: "Categorical vs expected %", test: "One-sample chi-square", workflowId: "one-sample-chi-square" },
      { question: "Skewed/ordinal vs median", test: "Wilcoxon signed-rank", workflowId: "wilcoxon-one-sample" },
      { question: "Small-count one proportion", test: "Binomial / exact test", workflowId: "binomial-exact" },
    ],
  },
  {
    title: "Two groups — parametric",
    color: "bg-indigo-500",
    items: [
      { question: "Continuous, two unrelated groups", test: "Independent t-test", workflowId: "independent-samples-t" },
      { question: "Continuous, before/after", test: "Paired t-test", workflowId: "paired-samples-t" },
    ],
  },
  {
    title: "Two groups — non-parametric",
    color: "bg-amber-500",
    items: [
      { question: "Skewed/ordinal, two unrelated", test: "Mann-Whitney U", workflowId: "mann-whitney" },
      { question: "Skewed/ordinal, before/after", test: "Wilcoxon matched-pair", workflowId: "wilcoxon-related" },
    ],
  },
  {
    title: "Categorical comparisons",
    color: "bg-violet-500",
    items: [
      { question: "Two categorical variables", test: "Pearson chi-square", workflowId: "crosstabs-pearson-chi-square" },
      { question: "Before/after categorical", test: "McNemar test", workflowId: "mcnemar" },
      { question: "Small counts in 2×2", test: "Fisher's exact", workflowId: "fisher-exact" },
      { question: "Risk / odds ratios", test: "Crosstabs + Risk", workflowId: "risk-estimates-crosstabs" },
    ],
  },
  {
    title: "Relationships & prediction",
    color: "bg-sky-500",
    items: [
      { question: "Visualise two continuous", test: "Scatterplot", workflowId: "scatterplot" },
      { question: "Two continuous variables", test: "Pearson / Spearman correlation", workflowId: "bivariate-correlation" },
      { question: "Predict continuous outcome", test: "Linear regression", workflowId: "simple-linear-regression" },
      { question: "Predict binary yes/no", test: "Binary logistic regression", workflowId: "binary-logistic-basic" },
    ],
  },
];

const examWorkflowCopy = [
  "Find the dependent variable. Is it continuous, categorical, or binary?",
  "Find the independent variable or exposure. Group, score, time point, or covariate?",
  "Decide: continuous/categorical, paired/unpaired, normal/skewed, one or two groups.",
  "Use the exact menu path and put each variable in the correct box.",
  "Read the one table the question asks for, then write the exam sentence.",
];

export function SPSSGuidePage() {
  const [query, setQuery] = useState("");
  const [showAllRules, setShowAllRules] = useState(false);
  const [showComparisonTable, setShowComparisonTable] = useState(false);

  const normalisedQuery = query.trim().toLowerCase();

  const filteredWorkflows = useMemo(() => {
    if (!normalisedQuery) return spssMegaWorkflows;
    return spssMegaWorkflows.filter((workflow) => {
      const haystack = [
        workflow.title,
        workflow.examUse,
        workflow.category,
        workflow.menuPath.join(" "),
        workflow.useWhen.join(" "),
        workflow.variables.join(" "),
        workflow.report.join(" "),
        workflow.examSentence,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalisedQuery);
    });
  }, [normalisedQuery]);

  const workflowsByCategory = useMemo(
    () =>
      spssMegaCategories
        .map((category) => ({
          category,
          workflows: filteredWorkflows.filter((workflow) => workflow.category === category),
        }))
        .filter(({ workflows }) => workflows.length > 0),
    [filteredWorkflows],
  );

  const visibleRules = showAllRules ? spssLastMinuteRules : spssLastMinuteRules.slice(0, 4);

  return (
    <div id="top" className="grid gap-6 pb-20 md:pb-6">
      <HeroSection query={query} onQueryChange={setQuery} workflowCount={spssMegaWorkflows.length} />

      {!normalisedQuery ? (
        <>
          <DecisionMap />

          <RulesCard
            rules={visibleRules}
            totalRules={spssLastMinuteRules.length}
            expanded={showAllRules}
            onToggle={() => setShowAllRules((v) => !v)}
          />
        </>
      ) : null}

      <section className="grid min-w-0 gap-5 lg:grid-cols-[240px_1fr]">
        {normalisedQuery ? null : (
          <Sidebar workflowsByCategory={workflowsByCategory.map((c) => ({ category: c.category, count: c.workflows.length }))} />
        )}

        <div className={`grid min-w-0 gap-6 ${normalisedQuery ? "lg:col-span-2" : ""}`}>
          {normalisedQuery ? (
            <div className="flex items-center justify-between gap-3 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-900">
              <p>
                <span className="font-semibold">{filteredWorkflows.length}</span> {filteredWorkflows.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" /> Clear
              </button>
            </div>
          ) : null}

          {workflowsByCategory.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <FileSearch className="mx-auto h-8 w-8 text-slate-400" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-slate-700">No tests match &ldquo;{query}&rdquo;</p>
              <p className="mt-1 text-sm text-slate-500">Try a different keyword, like &ldquo;levene&rdquo; or &ldquo;paired&rdquo;.</p>
            </div>
          ) : (
            workflowsByCategory.map(({ category, workflows }) => (
              <section key={category} id={anchorId(category)} className="grid min-w-0 scroll-mt-24 gap-3">
                <CategoryHeading category={category} count={workflows.length} />
                <div className="grid gap-4">
                  {workflows.map((workflow) => (
                    <WorkflowCard key={workflow.id} workflow={workflow} highlight={normalisedQuery} />
                  ))}
                </div>
              </section>
            ))
          )}

          {!normalisedQuery ? (
            <DetailedComparisonTable expanded={showComparisonTable} onToggle={() => setShowComparisonTable((v) => !v)} />
          ) : null}

          {!normalisedQuery ? <ExamRuleFooter /> : null}
        </div>
      </section>
    </div>
  );
}

function HeroSection({
  query,
  onQueryChange,
  workflowCount,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  workflowCount: number;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 shadow-sm">
      <div className="grid gap-6 p-6 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:p-8">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
            <ClipboardList className="h-3.5 w-3.5" aria-hidden="true" />
            SPSS mega cheatsheet
          </div>
          <h1 className="mt-4 break-words text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Find the test. Click the path. Read the table.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Every SPSS workflow you need for the exam, on one scannable page. Built for the last 12 hours of revision.
          </p>

          <ol className="mt-5 grid gap-2 sm:grid-cols-2 lg:max-w-xl">
            {examWorkflowCopy.map((copy, index) => (
              <li
                key={copy}
                className="flex items-start gap-2.5 rounded-lg border border-white/60 bg-white/70 px-3 py-2 text-sm text-slate-700 backdrop-blur"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-indigo-600 text-[11px] font-bold text-white">
                  {index + 1}
                </span>
                <span className="min-w-0 break-words leading-5">{copy}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <label htmlFor="spss-search" className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Search className="h-4 w-4 text-indigo-600" aria-hidden="true" />
            Find a test
          </label>
          <p className="mt-1 text-xs text-slate-500">Search by test name, SPSS menu, or what the question is asking.</p>

          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              id="spss-search"
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="e.g. mann-whitney, levene, paired, mediator"
              className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            />
            {query ? (
              <button
                type="button"
                onClick={() => onQueryChange("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {["t-test", "chi-square", "mann-whitney", "regression", "logistic"].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => onQueryChange(suggestion)}
                className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
            <div>
              <p className="text-2xl font-semibold text-slate-950">{workflowCount}</p>
              <p className="text-xs text-slate-500">workflows ready</p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (typeof window === "undefined") return;
                document.querySelectorAll("details").forEach((d) => {
                  d.open = true;
                });
                window.print();
              }}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" /> Print
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DecisionMap() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" id="decision-map">
      <div className="flex flex-col gap-1 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Compass className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">Which test do I pick?</h2>
            <p className="text-sm text-slate-500">If the question reads like this, jump to that test.</p>
          </div>
        </div>
        <a
          href="#test-comparison"
          className="hidden text-xs font-semibold text-indigo-600 hover:text-indigo-700 sm:inline"
        >
          See full comparison →
        </a>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {decisionMapSections.map((section) => (
          <div key={section.title} className="min-w-0">
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${section.color}`} aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{section.title}</p>
            </div>
            <div className="mt-2 grid gap-1.5">
              {section.items.map((item) => (
                <a
                  key={item.test}
                  href={`#${item.workflowId}`}
                  className="group flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm transition hover:border-indigo-300 hover:bg-indigo-50/50"
                >
                  <span className="min-w-0 break-words text-slate-600">{item.question}</span>
                  <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-800 transition group-hover:bg-indigo-100 group-hover:text-indigo-800">
                    {item.test}
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RulesCard({
  rules,
  totalRules,
  expanded,
  onToggle,
}: {
  rules: string[];
  totalRules: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <section className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 shadow-sm sm:p-6" id="rules">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-indigo-950">Golden rules under pressure</h2>
            <p className="text-sm text-indigo-800/80">If you only remember these, you&apos;re still safe.</p>
          </div>
        </div>
        {totalRules > 4 ? (
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex shrink-0 items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
          >
            {expanded ? "Show fewer" : `Show all ${totalRules}`}
            <ChevronDown className={`h-3 w-3 transition ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
        ) : null}
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {rules.map((rule, index) => (
          <div
            key={rule}
            className="flex items-start gap-2.5 rounded-lg bg-white/80 px-3 py-2.5 text-sm leading-6 text-indigo-950"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white">
              {index + 1}
            </span>
            <span className="min-w-0 break-words">{rule}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Sidebar({
  workflowsByCategory,
}: {
  workflowsByCategory: Array<{ category: string; count: number }>;
}) {
  return (
    <aside className="hidden min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-24 lg:block lg:self-start">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <ListChecks className="h-4 w-4 text-indigo-600" aria-hidden="true" />
        <p className="text-sm font-semibold text-slate-950">Jump to category</p>
      </div>
      <div className="mt-3 grid gap-1">
        <a
          href="#decision-map"
          className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
        >
          <Compass className="h-3.5 w-3.5 text-indigo-500" aria-hidden="true" />
          Which test?
        </a>
        <a
          href="#rules"
          className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
        >
          <Sparkles className="h-3.5 w-3.5 text-indigo-500" aria-hidden="true" />
          Golden rules
        </a>
        <div className="my-1 border-t border-slate-100" />
        {workflowsByCategory.map(({ category, count }) => {
          const style = categoryStyles[category] ?? fallbackStyle;
          return (
            <a
              key={category}
              href={`#${anchorId(category)}`}
              className="flex items-start justify-between gap-2 rounded-md px-2.5 py-1.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
            >
              <span className="flex min-w-0 items-start gap-2">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${style.dot}`} aria-hidden="true" />
                <span className="min-w-0 break-words leading-5">{category}</span>
              </span>
              <span className="mt-0.5 shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-semibold text-slate-600">
                {count}
              </span>
            </a>
          );
        })}
      </div>

      <div className="mt-4 border-t border-slate-100 pt-3">
        <Link
          href="/practice"
          className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 text-xs font-semibold text-white transition hover:bg-indigo-700"
        >
          <Target className="h-3.5 w-3.5" aria-hidden="true" /> Drill weak spots
        </Link>
      </div>
    </aside>
  );
}

function CategoryHeading({ category, count }: { category: string; count: number }) {
  const style = categoryStyles[category] ?? fallbackStyle;
  return (
    <div className="flex items-center gap-3 pt-2">
      <span className={`h-6 w-1.5 rounded-full ${style.accent}`} aria-hidden="true" />
      <h2 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">{category}</h2>
      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${style.chip}`}>{count}</span>
    </div>
  );
}

function WorkflowCard({ workflow, highlight }: { workflow: SpssMegaWorkflow; highlight: string }) {
  const style = categoryStyles[workflow.category] ?? fallbackStyle;
  const primaryTrap = workflow.traps[0];
  const remainingTraps = workflow.traps.slice(1);
  const hasMoreDetail =
    workflow.options.length > 0 ||
    workflow.useWhen.length > 0 ||
    workflow.variables.length > 0 ||
    remainingTraps.length > 0 ||
    workflow.sourceRefs.length > 0;

  return (
    <article
      id={workflow.id}
      className={`overflow-hidden rounded-xl border ${style.border} bg-white shadow-sm scroll-mt-24 transition`}
    >
      {/* Header: category + title + 1-line use */}
      <div className={`flex items-start gap-3 px-5 py-4 ${style.headerBg}`}>
        <span className={`mt-1.5 h-12 w-1.5 shrink-0 rounded-full ${style.accent}`} aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${style.chip}`}>
            {workflow.category}
          </span>
          <h3 className="mt-2 break-words text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
            <Highlighted text={workflow.title} query={highlight} />
          </h3>
          <p className="mt-1 max-w-3xl break-words text-sm leading-6 text-slate-600">
            <Highlighted text={workflow.examUse} query={highlight} />
          </p>
        </div>
      </div>

      {/* SPSS click path — emphasized */}
      <div className="border-t border-slate-100 px-5 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Click path in SPSS</p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {workflow.menuPath.map((step, index) => (
            <Fragment key={`${workflow.id}-path-${index}`}>
              <span
                className={`max-w-full break-words rounded-lg border px-3 py-1.5 font-mono text-sm font-semibold sm:text-[15px] ${style.pathBg} ${style.pathText} ${style.border}`}
              >
                {step}
              </span>
              {index < workflow.menuPath.length - 1 ? (
                <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>

      {/* Steps — the hero of the card */}
      <div className="border-t border-slate-100 px-5 py-5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Do these steps</p>
        <ol className="mt-3 grid gap-2">
          {workflow.setup.map((step, index) => (
            <li
              key={`${workflow.id}-step-${index}`}
              className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-3"
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-sm font-bold text-white shadow-sm ${style.accent}`}
              >
                {index + 1}
              </span>
              <span className="min-w-0 flex-1 break-words text-[15px] font-medium leading-6 text-slate-800 sm:text-base">
                <Highlighted text={step} query={highlight} />
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Everything else: hidden by default */}
      <details className="group/out border-t border-slate-100">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 select-none">
          <span className="inline-flex items-center gap-2">
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition group-open/out:rotate-90" aria-hidden="true" />
            Show output to read, exam sentence &amp; trap
          </span>
          <span className="hidden text-xs font-medium text-slate-400 sm:inline">click to expand</span>
        </summary>

        <div className="grid gap-4 border-t border-slate-100 bg-slate-50/40 px-5 py-4">
          {/* Read & report */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <Table2 className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Read &amp; report</p>
            </div>
            <ul className="mt-2 grid gap-1.5">
              {[...workflow.output, ...workflow.report].map((item, index) => (
                <li
                  key={`${workflow.id}-out-${index}`}
                  className="flex min-w-0 items-start gap-2 text-sm leading-6 text-slate-700"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                  <span className="min-w-0 break-words">
                    <Highlighted text={item} query={highlight} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exam sentence + Trap */}
          <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr]">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <MessageSquareQuote className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Say it like this</p>
              </div>
              <p className="mt-1.5 break-words rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm italic leading-6 text-slate-700">
                &ldquo;
                <Highlighted text={workflow.examSentence} query={highlight} />
                &rdquo;
              </p>
            </div>
            {primaryTrap ? (
              <div className="min-w-0 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-700" aria-hidden="true" />
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-900">Trap to avoid</p>
                </div>
                <p className="mt-1 break-words text-sm leading-6 text-amber-950">{primaryTrap}</p>
              </div>
            ) : null}
          </div>

          {/* Deeper detail — nested collapsible */}
          {hasMoreDetail ? (
            <details className="group/more rounded-lg border border-slate-200 bg-white">
              <summary className="flex cursor-pointer list-none items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:text-slate-900 select-none">
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 transition group-open/more:rotate-90"
                  aria-hidden="true"
                />
                More detail · variables, when to use, slide refs
              </summary>
              <div className="grid gap-4 border-t border-slate-100 px-3 py-3 lg:grid-cols-2">
                {workflow.useWhen.length > 0 ? (
                  <DetailList title="Use when" items={workflow.useWhen} />
                ) : null}
                {workflow.variables.length > 0 ? (
                  <DetailList title="Variables needed" items={workflow.variables} />
                ) : null}
                {workflow.options.length > 0 ? (
                  <DetailList title="Options to tick" items={workflow.options} />
                ) : null}
                {remainingTraps.length > 0 ? (
                  <DetailList title="Other traps" items={remainingTraps} tone="amber" />
                ) : null}
                {workflow.sourceRefs.length > 0 ? (
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Slide references</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {workflow.sourceRefs.map((source) => (
                        <span
                          key={source}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </details>
          ) : null}
        </div>
      </details>
    </article>
  );
}

function DetailList({ title, items, tone = "slate" }: { title: string; items: string[]; tone?: "slate" | "amber" }) {
  const titleColor = tone === "amber" ? "text-amber-800" : "text-slate-500";
  const bullet = tone === "amber" ? "bg-amber-500" : "bg-slate-400";
  return (
    <div className="min-w-0">
      <p className={`text-xs font-semibold uppercase tracking-wide ${titleColor}`}>{title}</p>
      <ul className="mt-2 grid gap-1.5">
        {items.map((item, index) => (
          <li key={`${item}-${index}`} className="flex min-w-0 items-start gap-2 text-sm leading-6 text-slate-700">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${bullet}`} aria-hidden="true" />
            <span className="min-w-0 break-words">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailedComparisonTable({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) {
  return (
    <section id="test-comparison" className="min-w-0 rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
            <Table2 className="h-4 w-4 text-slate-700" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-950">Side-by-side test comparison</h2>
            <p className="text-xs text-slate-500">Variables, paths and output in one table.</p>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition ${expanded ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {expanded ? (
        <div className="overflow-x-auto border-t border-slate-100">
          <table className="w-full min-w-[900px] border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-700">
                {["Question", "Variables", "Test", "SPSS path", "Read"].map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-slate-200 px-3 py-3 text-xs font-semibold uppercase tracking-wide"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {spssDecisionRows.map((row) => (
                <tr key={`${row.question}-${row.test}`} className="align-top hover:bg-slate-50/60">
                  <td className="border-b border-slate-100 px-3 py-3 font-medium text-slate-950">{row.question}</td>
                  <td className="border-b border-slate-100 px-3 py-3 text-slate-600">{row.variables}</td>
                  <td className="border-b border-slate-100 px-3 py-3 font-semibold text-indigo-700">{row.test}</td>
                  <td className="border-b border-slate-100 px-3 py-3 font-mono text-xs text-slate-700">{row.spssPath}</td>
                  <td className="border-b border-slate-100 px-3 py-3 text-slate-600">{row.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

function ExamRuleFooter() {
  const rules = [
    "Find the outcome variable first.",
    "Identify one-sample, independent, or paired design.",
    "Pick the test from the decision map.",
    "Read the one table the question asks for.",
  ];
  return (
    <section className="rounded-xl border border-slate-900 bg-slate-950 p-6 text-white shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-200">
          <Target className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-300">Final exam rule</p>
          <h2 className="text-lg font-semibold tracking-tight">When in doubt, do these four things in order.</h2>
        </div>
      </div>
      <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {rules.map((rule, index) => (
          <li
            key={rule}
            className="flex items-start gap-2.5 rounded-lg bg-white/5 px-3 py-3 text-sm leading-6 ring-1 ring-white/10"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-500 text-xs font-bold">
              {index + 1}
            </span>
            <span className="min-w-0 break-words text-slate-100">{rule}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Highlighted({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-yellow-200 px-0.5 text-slate-950">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function anchorId(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
