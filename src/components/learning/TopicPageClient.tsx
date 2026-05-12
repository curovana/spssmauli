"use client";

import type { ReactNode } from "react";
import type { TopicModule } from "@/types/learning";
import { BookMarked, ClipboardCheck, ListChecks, Table2, Workflow } from "lucide-react";
import { getTopicProgress, useProgress } from "@/lib/progress";
import { TopicMap } from "@/components/learning/TopicMap";
import { ExamRescueWorkflow } from "@/components/learning/ExamRescueWorkflow";
import { ProgressRing } from "@/components/progress/ProgressRing";
import { SPSSWorkflowCard } from "@/components/spss/SPSSWorkflowCard";
import { TestSelectionCard } from "@/components/learning/TestSelectionCard";

export function TopicPageClient({ topic }: { topic: TopicModule }) {
  const progress = useProgress();

  const completedLevels = progress.completedLevels[topic.id] ?? [];
  const topicProgress = getTopicProgress(progress, topic.id, topic.levels.length);

  return (
    <div className="grid gap-6 pb-20 md:pb-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-600">Preloaded Topic Module</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{topic.title}</h1>
            <p className="mt-2 text-lg text-slate-600">{topic.subtitle}</p>
            <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-600">{topic.examRelevance}</p>
          </div>
          <ProgressRing percent={topicProgress.percent} label={`${topicProgress.completed}/${topicProgress.total}`} />
        </div>
      </section>

      {topic.lastDayRevision ? <LastDayRevisionPanel topic={topic} /> : null}

      <section>
        <h2 className="text-xl font-semibold text-slate-950">Level Path</h2>
        <div className="mt-4">
          <TopicMap topicId={topic.id} levels={topic.levels} completedLevels={completedLevels} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Topic Cheat Sheet</h2>
          <div className="mt-4 grid gap-4">
            {topic.cheatSheet.map((section) => (
              <div key={section.id} className="rounded-lg bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{section.title}</p>
                <ul className="mt-3 grid gap-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm leading-6 text-slate-600">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <TestSelectionCard workflows={topic.spssWorkflows} />
          {topic.commonTraps.map((trap) => (
            <div key={trap.id} className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-950">{trap.trap}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{trap.fix}</p>
            </div>
          ))}
        </div>
      </section>

      <ExamRescueWorkflow />

      <section>
        <h2 className="text-xl font-semibold text-slate-950">SPSS Workflows</h2>
        <div className="mt-4 grid gap-4">
          {topic.spssWorkflows.map((workflow) => (
            <SPSSWorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Source PDFs</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          These are the lecture files used as the source for this module.
        </p>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {topic.sourcePdfs.map((source) => (
            <div key={`${source.fileName}-${source.topicPart}`} className="rounded-lg bg-slate-50 px-3 py-2">
              <p className="text-sm font-semibold text-slate-950">{source.fileName}</p>
              {source.topicPart ? <p className="mt-1 text-xs text-slate-500">{source.topicPart}</p> : null}
              {source.slideRange ? <p className="mt-1 text-xs text-slate-500">Slides: {source.slideRange}</p> : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function LastDayRevisionPanel({ topic }: { topic: TopicModule }) {
  const revision = topic.lastDayRevision;

  if (!revision) {
    return null;
  }

  return (
    <section className="rounded-lg border border-indigo-100 bg-indigo-50/70 p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BookMarked className="h-5 w-5 text-indigo-600" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-slate-950">Last-Day Revision</h2>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">{revision.examTrigger}</p>
        </div>
        <div className="rounded-lg border border-indigo-200 bg-white px-4 py-3 text-sm font-semibold text-indigo-950">
          {revision.memoryHook}
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2 xl:grid-cols-4">
        <RevisionList icon={<ListChecks className="h-4 w-4" aria-hidden="true" />} title="Recognise" items={revision.recognitionChecklist} />
        <RevisionList icon={<ClipboardCheck className="h-4 w-4" aria-hidden="true" />} title="Must Know" items={revision.mustKnow} />
        <RevisionList icon={<Workflow className="h-4 w-4" aria-hidden="true" />} title="SPSS Moves" items={revision.spssFocus} />
        <RevisionList icon={<Table2 className="h-4 w-4" aria-hidden="true" />} title="Read From Output" items={revision.outputFocus} />
      </div>

      {revision.answerTemplates?.length ? (
        <div className="mt-4 rounded-lg border border-indigo-100 bg-white p-4">
          <p className="text-sm font-semibold text-slate-950">Exam answer templates</p>
          <div className="mt-3 grid gap-2">
            {revision.answerTemplates.map((template) => (
              <p key={template} className="rounded-lg bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-700">
                {template}
              </p>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-4 rounded-lg border border-indigo-100 bg-white p-4">
        <p className="text-sm font-semibold text-slate-950">Five-minute drill before moving on</p>
        <ol className="mt-3 grid gap-2 md:grid-cols-2">
          {revision.lastMinuteDrill.map((item, index) => (
            <li key={item} className="text-sm leading-6 text-slate-700">
              <span className="font-semibold text-indigo-700">{index + 1}. </span>
              {item}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function RevisionList({ icon, title, items }: { icon: ReactNode; title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-indigo-100 bg-white p-4">
      <div className="flex items-center gap-2 text-indigo-700">
        {icon}
        <p className="text-sm font-semibold text-slate-950">{title}</p>
      </div>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item} className="text-sm leading-6 text-slate-600">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
