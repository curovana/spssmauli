"use client";

import { RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import type { Question, TopicModule } from "@/types/learning";
import { getWeakAreas, recordQuestionAttempt, useProgress } from "@/lib/progress";
import { getBalancedCoursePracticeSet, getCourseStarterSet } from "@/lib/quizEngine";
import { QuestionRenderer } from "@/components/quiz/QuestionRenderer";

export function PracticeClient({ topics }: { topics: TopicModule[] }) {
  const progress = useProgress();
  const [questions, setQuestions] = useState<Question[]>(() => getCourseStarterSet(topics, 10));

  const weakAreas = getWeakAreas(progress);

  const handleAnswered = (question: Question, correct: boolean) => {
    recordQuestionAttempt(progress, question, correct);
  };

  return (
    <div className="grid gap-6 pb-20 md:pb-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-600">Mixed Practice</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Drill the weak links</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              A balanced course set: variables, confidence intervals, p-values, t-tests, chi-square, non-parametric
              routes, correlation, regression, mediation, interaction and logistic output.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setQuestions(getBalancedCoursePracticeSet(topics, 10))}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            New set
          </button>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {weakAreas.length ? (
            weakAreas.map((area) => (
              <span key={area.tag} className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">
                {area.tag}
              </span>
            ))
          ) : (
            <span className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-900">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              First pass
            </span>
          )}
        </div>
      </section>

      <section className="grid gap-4">
        {questions.map((question) => (
          <QuestionRenderer key={question.id} question={question} onAnswered={handleAnswered} />
        ))}
      </section>
    </div>
  );
}
