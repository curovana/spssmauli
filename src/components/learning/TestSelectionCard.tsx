import { GitBranch } from "lucide-react";
import type { SPSSWorkflow } from "@/types/learning";

type TestSelectionRow = {
  pattern: string;
  use: string;
  output: string;
};

const workflowToRow = (workflow: SPSSWorkflow): TestSelectionRow => ({
  pattern: workflow.useWhen,
  use: workflow.title,
  output: workflow.outputTablesToRead
    .map((table) => `${table.tableName}: ${table.keyValues.join(", ")}`)
    .join("; "),
});

export function TestSelectionCard({ workflows }: { workflows: SPSSWorkflow[] }) {
  const rows = workflows.slice(0, 5).map(workflowToRow);

  if (rows.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <GitBranch className="h-5 w-5 text-indigo-600" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-slate-950">SPSS Selection Survival Card</h2>
      </div>
      <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
        <div className="grid grid-cols-3 bg-slate-100 text-xs font-semibold uppercase tracking-normal text-slate-600">
          <div className="p-3">Pattern</div>
          <div className="p-3">Choose</div>
          <div className="p-3">Read</div>
        </div>
        {rows.map((row) => (
          <div key={row.pattern} className="grid grid-cols-1 border-t border-slate-200 text-sm sm:grid-cols-3">
            <div className="p-3 font-medium text-slate-950">{row.pattern}</div>
            <div className="p-3 text-slate-700">{row.use}</div>
            <div className="p-3 text-slate-600">{row.output}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
