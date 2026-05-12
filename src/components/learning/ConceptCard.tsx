import type { VisualSummary } from "@/types/learning";

export function ConceptCard({
  title,
  explanation,
  visualSummary,
}: {
  title: string;
  explanation: string;
  visualSummary: VisualSummary;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-normal text-indigo-600">Plain English</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">{title}</h2>
          <p className="mt-3 text-base leading-7 text-slate-700">{explanation}</p>
        </div>
        <div className="flex-1 rounded-lg border border-indigo-100 bg-indigo-50 p-4">
          <p className="text-sm font-semibold text-indigo-950">{visualSummary.title}</p>
          <div className="mt-4 grid gap-2">
            {visualSummary.items.map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-lg bg-white px-3 py-2 text-sm text-slate-700">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  {index + 1}
                </span>
                {item}
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-lg bg-white px-3 py-2 text-sm font-medium text-indigo-950">{visualSummary.takeaway}</p>
        </div>
      </div>
    </section>
  );
}
