"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2, ListChecks } from "lucide-react";
import type { LearningLevel, Question, TopicModule } from "@/types/learning";
import { completeLevel, recordQuestionAttempt, useProgress } from "@/lib/progress";
import { ConceptCard } from "@/components/learning/ConceptCard";
import { FormulaCard } from "@/components/learning/FormulaCard";
import { QuestionRenderer } from "@/components/quiz/QuestionRenderer";
import { SPSSWorkflowCard } from "@/components/spss/SPSSWorkflowCard";

export function LevelPageClient({ topic, level }: { topic: TopicModule; level: LearningLevel }) {
  const progress = useProgress();

  const isComplete = progress.completedLevels[topic.id]?.includes(level.id) ?? false;
  const nextLevel = topic.levels.find((candidate) => candidate.levelNumber === level.levelNumber + 1);

  const handleAnswered = (question: Question, correct: boolean) => {
    recordQuestionAttempt(progress, question, correct);
  };

  return (
    <div className="grid gap-6 pb-20 md:pb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/topics/${topic.id}`}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Topic path
        </Link>
        <span className="rounded-lg bg-indigo-100 px-3 py-2 text-sm font-semibold text-indigo-800">
          Level {level.levelNumber} of {topic.levels.length}
        </span>
      </div>

      <ConceptCard title={level.title} explanation={level.plainEnglishExplanation} visualSummary={level.visualSummary} />

      {level.sourceRef ? (
        <div className="inline-flex w-fit items-start gap-2 rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-950">
          <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" aria-hidden="true" />
          <span>Mapped to: {level.sourceRef}</span>
        </div>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-[0.8fr_1fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-indigo-600" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-slate-950">Key Rules</h2>
          </div>
          <ul className="mt-4 grid gap-2">
            {level.keyRules.map((rule) => (
              <li key={rule} className="rounded-lg bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-700">
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {level.workedExample ? (
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-indigo-600">Worked Example</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">{level.workedExample.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{level.workedExample.scenario}</p>
            <div className="mt-4 grid gap-2">
              {level.workedExample.steps.map((step, index) => (
                <p key={step} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  {index + 1}. {step}
                </p>
              ))}
            </div>
            <p className="mt-4 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-950">
              {level.workedExample.answer}
            </p>
          </div>
        ) : null}
      </section>

      {level.formulas?.length ? (
        <section>
          <h2 className="text-xl font-semibold text-slate-950">Formula Cards</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {level.formulas.map((formula) => (
              <FormulaCard key={formula.id} formula={formula} />
            ))}
          </div>
        </section>
      ) : null}

      {level.spssSteps ? <SPSSWorkflowCard workflow={level.spssSteps} /> : null}

      <section>
        <h2 className="text-xl font-semibold text-slate-950">Active Recall</h2>
        <div className="mt-4 grid gap-4">
          {level.activeRecall.map((question) => (
            <QuestionRenderer key={question.id} question={question} onAnswered={handleAnswered} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-950">Exam Drill</h2>
        <div className="mt-4 grid gap-4">
          {level.examDrills.map((question) => (
            <QuestionRenderer key={question.id} question={question} onAnswered={handleAnswered} />
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Common Mistakes</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {level.commonMistakes.map((mistake) => (
            <span key={mistake} className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900">
              {mistake}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => completeLevel(progress, topic.id, level.id)}
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            {isComplete ? "Completed" : "Mark level complete"}
          </button>
          {nextLevel ? (
            <Link
              href={`/topics/${topic.id}/levels/${nextLevel.id}`}
              className="inline-flex h-11 items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Next level
            </Link>
          ) : (
            <Link
              href="/mock-exam"
              className="inline-flex h-11 items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Mock exam
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
