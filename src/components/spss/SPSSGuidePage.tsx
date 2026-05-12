import { ClipboardList } from "lucide-react";
import type { TopicModule } from "@/types/learning";
import { ExamRescueWorkflow } from "@/components/learning/ExamRescueWorkflow";
import { SPSSWorkflowCard } from "@/components/spss/SPSSWorkflowCard";
import { TestSelectionCard } from "@/components/learning/TestSelectionCard";

export function SPSSGuidePage({ topics }: { topics: TopicModule[] }) {
  const workflows = Array.from(
    new Map(topics.flatMap((topic) => topic.spssWorkflows).map((item) => [item.id, item])).values(),
  );

  return (
    <div className="grid gap-6 pb-20 md:pb-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
            <ClipboardList className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold text-indigo-600">SPSS Survival Guide</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Click paths and output tables</h1>
          </div>
        </div>
      </section>

      <TestSelectionCard workflows={workflows} />
      <ExamRescueWorkflow />

      <section className="grid gap-4">
        {workflows.map((workflow) => (
          <SPSSWorkflowCard key={workflow.id} workflow={workflow} />
        ))}
      </section>
    </div>
  );
}
