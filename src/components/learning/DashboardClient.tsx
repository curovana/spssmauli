"use client";

import Link from "next/link";
import { AlertCircle, ArrowRight, Clock, ClipboardCheck, FileText, Target, TimerReset } from "lucide-react";
import type { TopicModule } from "@/types/learning";
import { getRecentMistakes, getTopicProgress, getWeakAreas, resetProgress, useProgress } from "@/lib/progress";
import { getNextLevel } from "@/lib/topicEngine";
import { ExamRescueWorkflow } from "@/components/learning/ExamRescueWorkflow";
import { ProgressRing } from "@/components/progress/ProgressRing";

export function DashboardClient({ topics }: { topics: TopicModule[] }) {
  const progress = useProgress();

  const totalLevels = topics.reduce((total, topic) => total + topic.levels.length, 0);
  const completedLevelCount = topics.reduce((total, topic) => total + (progress.completedLevels[topic.id]?.length ?? 0), 0);
  const coursePercent = totalLevels === 0 ? 0 : Math.round((completedLevelCount / totalLevels) * 100);
  const nextTopic =
    topics.find((topic) => (progress.completedLevels[topic.id]?.length ?? 0) < topic.levels.length) ?? topics[0];
  const completedLevels = progress.completedLevels[nextTopic.id] ?? [];
  const nextLevel = getNextLevel(nextTopic, completedLevels);
  const weakAreas = getWeakAreas(progress);
  const recentMistakes = getRecentMistakes(progress);

  return (
    <div className="grid gap-6 pb-20 md:pb-6">
      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-indigo-600">King&apos;s College London MSc Affective Disorders</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">StatsDrill AI</h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                Last-day revision for Introduction to Statistics and SPSS. Learn the trigger pattern, run the SPSS path,
                read the one output table that matters, then drill the exact interpretation blank.
              </p>
            </div>
            <ProgressRing percent={coursePercent} label="Course" />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Link
              href={`/topics/${nextTopic.id}/levels/${nextLevel.id}`}
              className="rounded-lg bg-indigo-600 p-4 text-white transition hover:bg-indigo-700"
            >
              <Target className="h-5 w-5" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold">Next level</p>
              <p className="mt-1 text-sm text-indigo-100">{nextTopic.title.replace("Topic ", "T")}: {nextLevel.title}</p>
            </Link>
            <Link href="/practice" className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:bg-white">
              <ClipboardCheck className="h-5 w-5 text-indigo-600" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-slate-950">Mixed drills</p>
              <p className="mt-1 text-sm text-slate-600">Balanced across all topics</p>
            </Link>
            <Link href="/mock-exam" className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:bg-white">
              <Clock className="h-5 w-5 text-indigo-600" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-slate-950">Mock exam</p>
              <p className="mt-1 text-sm text-slate-600">Timed practical questions</p>
            </Link>
          </div>
        </div>

        <aside className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
          <div className="flex items-center gap-2">
            <TimerReset className="h-5 w-5 text-indigo-300" aria-hidden="true" />
            <h2 className="text-lg font-semibold">Last-day rescue plan</h2>
          </div>
          <div className="mt-5 grid gap-4">
            <div>
              <p className="text-sm font-semibold text-indigo-200">First pass</p>
              <p className="mt-1 text-sm leading-6 text-slate-200">Read each topic&apos;s Last-Day Revision block and say the SPSS path aloud.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-indigo-200">Second pass</p>
              <p className="mt-1 text-sm leading-6 text-slate-200">Do the active recall and exam drill for weak topics only.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-indigo-200">Final pass</p>
              <p className="mt-1 text-sm leading-6 text-slate-200">Run mixed practice, then mock exam. Fix mistakes by skill tag.</p>
            </div>
          </div>
        </aside>
      </section>

      <ExamRescueWorkflow />

      <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-indigo-600">Preloaded course</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-950">KCL Statistics and SPSS Course Map</h2>
            </div>
            <Link
              href={`/topics/${nextTopic.id}`}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Built from the shared lecture PDFs as preloaded modules. The course starts with measurement and descriptives,
            then moves through inference, group comparisons, regression, mediation, interaction and binary logistic regression.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Metric label="Topics" value={topics.length.toString()} />
            <Metric label="Levels" value={totalLevels.toString()} />
            <Metric label="SPSS workflows" value={topics.reduce((total, topic) => total + topic.spssWorkflows.length, 0).toString()} />
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {topics.map((topic) => {
              const topicProgress = getTopicProgress(progress, topic.id, topic.levels.length);
              return (
                <Link
                  key={topic.id}
                  href={`/topics/${topic.id}`}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-indigo-200 hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-950">{topic.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{topic.subtitle}</p>
                    </div>
                    <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-indigo-700">
                      {topicProgress.percent}%
                    </span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-200">
                    <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${topicProgress.percent}%` }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-slate-950">Weak areas</h2>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {weakAreas.length ? (
              weakAreas.map((area) => (
                <span key={area.tag} className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">
                  {area.tag} ({area.count})
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-500">No weak areas yet. Missed answers will appear here.</p>
            )}
          </div>
          <div className="mt-5 border-t border-slate-200 pt-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-500" aria-hidden="true" />
              <p className="text-sm font-semibold text-slate-950">Recent mistakes</p>
            </div>
            <div className="mt-3 grid gap-2">
              {recentMistakes.length ? (
                recentMistakes.map((mistake) => (
                  <p key={mistake.questionId} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                    {mistake.prompt}
                  </p>
                ))
              ) : (
                <p className="text-sm text-slate-500">No mistakes recorded.</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                resetProgress();
              }}
              className="mt-4 text-sm font-semibold text-slate-500 transition hover:text-slate-950"
            >
              Reset local progress
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-2xl font-semibold text-slate-950">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}
