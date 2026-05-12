"use client";

import Link from "next/link";
import { CheckCircle2, Lock, PlayCircle } from "lucide-react";
import type { LearningLevel } from "@/types/learning";
import { getLevelState } from "@/lib/topicEngine";

export function TopicMap({
  topicId,
  levels,
  completedLevels,
}: {
  topicId: string;
  levels: LearningLevel[];
  completedLevels: string[];
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {levels.map((level) => {
        const state = getLevelState(level, completedLevels);
        const Icon = state === "completed" ? CheckCircle2 : state === "current" ? PlayCircle : Lock;

        return (
          <Link
            key={level.id}
            href={`/topics/${topicId}/levels/${level.id}`}
            className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">Level {level.levelNumber}</p>
                <h3 className="mt-1 text-base font-semibold text-slate-950">{level.title}</h3>
              </div>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  state === "completed"
                    ? "bg-emerald-100 text-emerald-700"
                    : state === "current"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-slate-100 text-slate-500"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{level.objective}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium capitalize text-slate-600">
                {level.difficulty}
              </span>
              <span className="text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
                {state === "completed" ? "Review" : "Start"}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
