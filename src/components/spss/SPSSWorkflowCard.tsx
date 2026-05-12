import { ArrowRight, Table2 } from "lucide-react";
import type { SPSSWorkflow } from "@/types/learning";

export function SPSSWorkflowCard({ workflow }: { workflow: SPSSWorkflow }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">{workflow.title}</h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">{workflow.useWhen}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {workflow.steps.map((step, index) => (
          <div key={`${workflow.id}-${step}`} className="flex items-center gap-2">
            <span className="rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-950">
              {step}
            </span>
            {index < workflow.steps.length - 1 ? <ArrowRight className="h-4 w-4 text-slate-300" aria-hidden="true" /> : null}
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {workflow.outputTablesToRead.map((table) => (
          <div key={table.tableName} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <Table2 className="h-4 w-4 text-indigo-600" aria-hidden="true" />
              <p className="text-sm font-semibold text-slate-950">{table.tableName}</p>
            </div>
            <p className="mt-2 text-sm text-slate-600">{table.useFor}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {table.keyValues.map((value) => (
                <span key={value} className="rounded-md bg-white px-2 py-1 text-xs font-medium text-slate-600">
                  {value}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
