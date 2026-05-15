import Link from "next/link";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  Database,
  FileSearch,
  ListChecks,
  Printer,
  Route,
  Table2,
  Workflow,
} from "lucide-react";
import {
  spssDecisionRows,
  spssLastMinuteRules,
  spssMegaCategories,
  spssMegaWorkflows,
  type SpssMegaWorkflow,
} from "@/content/spss-mega-cheatsheet";

export function SPSSGuidePage() {
  const workflowsByCategory = spssMegaCategories.map((category) => ({
    category,
    workflows: spssMegaWorkflows.filter((workflow) => workflow.category === category),
  }));
  const sourceRefCount = new Set(spssMegaWorkflows.flatMap((workflow) => workflow.sourceRefs)).size;

  return (
    <div id="top" className="grid gap-6 pb-20 md:pb-6">
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="grid min-w-0 gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
          <div className="min-w-0">
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-indigo-600">Last-minute SPSS mega cheatsheet</p>
                <h1 className="break-words text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Every click path, output table and exam value in one page
                </h1>
              </div>
            </div>
            <p className="mt-5 max-w-4xl break-words text-base leading-7 text-slate-600">
              Built from the lecture PDFs as a standalone SPSS survival sheet. Use it when the exam gives a research
              question and you need to decide the test, run SPSS, read the right table, and write the interpretation.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge icon={<FileSearch className="h-4 w-4" aria-hidden="true" />}>32 PDFs audited</Badge>
              <Badge icon={<Workflow className="h-4 w-4" aria-hidden="true" />}>
                {spssMegaWorkflows.length} workflows
              </Badge>
              <Badge icon={<BookOpenCheck className="h-4 w-4" aria-hidden="true" />}>
                {sourceRefCount} source slide refs
              </Badge>
            </div>
          </div>

          <div className="min-w-0 rounded-lg bg-slate-950 p-5 text-white">
            <div className="flex items-center gap-2">
              <Route className="h-5 w-5 text-indigo-300" aria-hidden="true" />
              <h2 className="text-lg font-semibold">Exam workflow</h2>
            </div>
            <ol className="mt-4 grid gap-3">
              {["Outcome", "Predictor", "Variable type", "SPSS path", "Output value"].map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-500 text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="min-w-0 break-words text-sm leading-6 text-slate-200">
                    <strong className="text-white">{step}:</strong> {examWorkflowCopy[index]}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="grid min-w-0 gap-4 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-indigo-600" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-slate-950">Jump to section</h2>
          </div>
          <div className="mt-4 grid gap-2">
            <AnchorLink href="#decision-table" label="Which test?" />
            <AnchorLink href="#rules" label="Rules to remember" />
            {spssMegaCategories.map((category) => (
              <AnchorLink key={category} href={`#${anchorId(category)}`} label={category} />
            ))}
          </div>
          <div className="mt-5 border-t border-slate-200 pt-4">
            <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">Quick move</p>
            <Link
              href="/practice"
              className="mt-3 inline-flex h-10 items-center gap-2 rounded-lg bg-indigo-600 px-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Drill weak spots <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </aside>

        <div className="grid min-w-0 gap-6">
          <section id="decision-table" className="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-indigo-600">Start here</p>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Which test do I choose?</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">
                <Printer className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                Browser print works well
              </div>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[920px] border-separate border-spacing-0 text-left text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    {["Question wording", "Variables", "Use this test", "SPSS path", "Read"].map((heading) => (
                      <th key={heading} className="border-b border-slate-200 px-3 py-3 font-semibold first:rounded-l-lg last:rounded-r-lg">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {spssDecisionRows.map((row) => (
                    <tr key={`${row.question}-${row.test}`} className="align-top">
                      <td className="border-b border-slate-100 px-3 py-3 font-medium text-slate-950">{row.question}</td>
                      <td className="border-b border-slate-100 px-3 py-3 text-slate-600">{row.variables}</td>
                      <td className="border-b border-slate-100 px-3 py-3 font-semibold text-indigo-700">{row.test}</td>
                      <td className="border-b border-slate-100 px-3 py-3 text-slate-600">{row.spssPath}</td>
                      <td className="border-b border-slate-100 px-3 py-3 text-slate-600">{row.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="rules" className="min-w-0 rounded-lg border border-indigo-100 bg-indigo-50 p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-indigo-700" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-indigo-950">Rules to remember under pressure</h2>
            </div>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {spssLastMinuteRules.map((rule) => (
                <p key={rule} className="rounded-lg bg-white/75 px-3 py-2 text-sm leading-6 text-indigo-950">
                  {rule}
                </p>
              ))}
            </div>
          </section>

          {workflowsByCategory.map(({ category, workflows }) => (
            <section key={category} id={anchorId(category)} className="grid min-w-0 scroll-mt-24 gap-4">
              <div className="flex items-center gap-2">
                <SectionIcon category={category} />
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{category}</h2>
              </div>
              <div className="grid gap-4">
                {workflows.map((workflow) => (
                  <MegaWorkflowCard key={workflow.id} workflow={workflow} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}

const examWorkflowCopy = [
  "Find the dependent variable first. Is it continuous, categorical, or binary?",
  "Find the independent variable or exposure. Is it a group, score, time point, or covariate?",
  "Decide continuous/categorical, paired/unpaired, normal/skewed, one group/two groups.",
  "Use the exact menu path and put variables into the correct boxes.",
  "Read the one output table the question asks for, then use the exam sentence template.",
];

function MegaWorkflowCard({ workflow }: { workflow: SpssMegaWorkflow }) {
  return (
    <article className="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-normal text-indigo-600">{workflow.category}</p>
          <h3 className="mt-1 break-words text-xl font-semibold text-slate-950">{workflow.title}</h3>
          <p className="mt-2 max-w-4xl break-words text-sm leading-6 text-slate-600">{workflow.examUse}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold text-slate-950">SPSS path</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {workflow.menuPath.map((step, index) => (
            <div key={`${workflow.id}-${step}-${index}`} className="flex items-center gap-2">
              <span className="max-w-full break-words rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-950">
                {step}
              </span>
              {index < workflow.menuPath.length - 1 ? (
                <ArrowRight className="h-4 w-4 text-slate-300" aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid min-w-0 gap-5 lg:grid-cols-2">
        <DetailGroup title="Use when" items={workflow.useWhen} />
        <DetailGroup title="Variables/boxes" items={workflow.variables} />
        <DetailGroup title="Click setup" items={workflow.setup} ordered />
        <DetailGroup title="Options to tick" items={workflow.options} />
        <DetailGroup title="Output to read" items={workflow.output} icon="table" />
        <DetailGroup title="Report these values" items={workflow.report} />
      </div>

      <div className="mt-5 grid min-w-0 gap-4 border-t border-slate-200 pt-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-950">Exam sentence</p>
          <p className="mt-2 break-words rounded-lg bg-slate-50 px-3 py-3 text-sm leading-6 text-slate-700">
            {workflow.examSentence}
          </p>
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-sm font-semibold text-amber-900">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            Common trap
          </p>
          <ul className="mt-2 grid gap-2">
            {workflow.traps.map((trap) => (
              <li key={trap} className="rounded-lg bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-950">
                {trap}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <details className="mt-4 border-t border-slate-200 pt-3">
        <summary className="cursor-pointer text-sm font-semibold text-slate-500">PDF slide refs checked</summary>
        <div className="mt-2 flex flex-wrap gap-2">
          {workflow.sourceRefs.map((source) => (
            <span key={source} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
              {source}
            </span>
          ))}
        </div>
      </details>
    </article>
  );
}

function DetailGroup({
  title,
  items,
  ordered = false,
  icon,
}: {
  title: string;
  items: string[];
  ordered?: boolean;
  icon?: "table";
}) {
  const ListTag = ordered ? "ol" : "ul";
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2">
        {icon === "table" ? (
          <Table2 className="h-4 w-4 text-indigo-600" aria-hidden="true" />
        ) : (
          <CheckCircle2 className="h-4 w-4 text-indigo-600" aria-hidden="true" />
        )}
        <p className="text-sm font-semibold text-slate-950">{title}</p>
      </div>
      <ListTag className="mt-2 grid gap-2">
        {items.map((item, index) => (
          <li key={item} className="flex min-w-0 gap-2 text-sm leading-6 text-slate-600">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" aria-hidden="true" />
            <span className="min-w-0 break-words">
              {ordered ? <span className="font-semibold text-slate-800">{index + 1}. </span> : null}
              {item}
            </span>
          </li>
        ))}
      </ListTag>
    </div>
  );
}

function Badge({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
      {icon}
      {children}
    </span>
  );
}

function AnchorLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="min-w-0 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
    >
      {label}
    </a>
  );
}

function SectionIcon({ category }: { category: string }) {
  const className = "h-5 w-5 text-indigo-600";
  if (category === "Data prep and safety") return <Database className={className} aria-hidden="true" />;
  if (category === "Descriptives and normality") return <FileSearch className={className} aria-hidden="true" />;
  if (category === "Binary logistic regression") return <Workflow className={className} aria-hidden="true" />;
  return <ClipboardList className={className} aria-hidden="true" />;
}

function anchorId(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
