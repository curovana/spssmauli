"use client";

import { Clock3, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import type { Question, TopicModule } from "@/types/learning";
import { recordQuestionAttempt, useProgress } from "@/lib/progress";
import { getBalancedCoursePracticeSet, getCourseStarterSet } from "@/lib/quizEngine";
import { QuestionRenderer } from "@/components/quiz/QuestionRenderer";

const EXAM_SECONDS = 20 * 60;

export function MockExamClient({ topics }: { topics: TopicModule[] }) {
  const progress = useProgress();
  const [questions, setQuestions] = useState<Question[]>(() => getCourseStarterSet(topics, 10));
  const [secondsLeft, setSecondsLeft] = useState(EXAM_SECONDS);
  const [score, setScore] = useState({ answered: 0, correct: 0 });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  const restart = () => {
    setQuestions(getBalancedCoursePracticeSet(topics, 10));
    setSecondsLeft(EXAM_SECONDS);
    setScore({ answered: 0, correct: 0 });
  };

  const handleAnswered = (question: Question, correct: boolean) => {
    recordQuestionAttempt(progress, question, correct);
    setScore((current) => ({
      answered: current.answered + 1,
      correct: current.correct + (correct ? 1 : 0),
    }));
  };

  return (
    <div className="grid gap-6 pb-20 md:pb-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-600">Mock Exam</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Timed practical set</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              A mixed course mock with MCQs, calculations, SPSS output interpretation and drag/drop blanks from the
              PDF-mapped topic modules.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                <Clock3 className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                {minutes}:{seconds}
              </div>
              <p className="mt-1 text-xs text-slate-500">Time left</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-sm font-semibold text-slate-950">
                {score.correct}/{score.answered || questions.length}
              </p>
              <p className="mt-1 text-xs text-slate-500">Score</p>
            </div>
            <button
              type="button"
              onClick={restart}
              className="inline-flex h-full min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Restart
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        {questions.map((question) => (
          <QuestionRenderer key={question.id} question={question} onAnswered={handleAnswered} examMode />
        ))}
      </section>
    </div>
  );
}
