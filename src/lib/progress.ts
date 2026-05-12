"use client";

import { useSyncExternalStore } from "react";
import type { ProgressState, Question } from "@/types/learning";

const STORAGE_KEY = "statsdrill-ai-progress-v1";
const CHANGE_EVENT = "statsdrill-ai-progress-change";

export const emptyProgress: ProgressState = {
  completedLevels: {},
  questionAttempts: {},
};

let cachedRawProgress: string | null | undefined;
let cachedProgress: ProgressState = emptyProgress;

function toProgressState(value: Partial<ProgressState> | null | undefined): ProgressState {
  return {
    completedLevels: value?.completedLevels ?? {},
    questionAttempts: value?.questionAttempts ?? {},
  };
}

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") {
    return emptyProgress;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === cachedRawProgress) {
      return cachedProgress;
    }

    cachedRawProgress = stored;
    cachedProgress = stored ? toProgressState(JSON.parse(stored) as Partial<ProgressState>) : emptyProgress;
    return cachedProgress;
  } catch {
    cachedRawProgress = null;
    cachedProgress = emptyProgress;
    return emptyProgress;
  }
}

export function saveProgress(progress: ProgressState) {
  if (typeof window === "undefined") {
    return;
  }

  const serialized = JSON.stringify(progress);
  cachedRawProgress = serialized;
  cachedProgress = progress;
  window.localStorage.setItem(STORAGE_KEY, serialized);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function recordQuestionAttempt(
  progress: ProgressState,
  question: Question,
  correct: boolean,
): ProgressState {
  const existing = progress.questionAttempts[question.id];
  const next = {
    ...progress,
    questionAttempts: {
      ...progress.questionAttempts,
      [question.id]: {
        questionId: question.id,
        attempts: (existing?.attempts ?? 0) + 1,
        correct: (existing?.correct ?? 0) + (correct ? 1 : 0),
        lastCorrect: correct,
        lastAnsweredAt: new Date().toISOString(),
        skillTags: question.skillTags,
        prompt: question.stem,
      },
    },
  };

  saveProgress(next);
  return next;
}

export function completeLevel(progress: ProgressState, topicId: string, levelId: string): ProgressState {
  const completed = new Set(progress.completedLevels[topicId] ?? []);
  completed.add(levelId);

  const next = {
    ...progress,
    completedLevels: {
      ...progress.completedLevels,
      [topicId]: Array.from(completed),
    },
  };

  saveProgress(next);
  return next;
}

export function resetProgress() {
  if (typeof window !== "undefined") {
    cachedRawProgress = null;
    cachedProgress = emptyProgress;
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
}

function subscribeProgress(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", handleStorage);
  };
}

export function useProgress() {
  return useSyncExternalStore(subscribeProgress, loadProgress, () => emptyProgress);
}

export function getWeakAreas(progress: ProgressState) {
  const misses = new Map<string, number>();

  Object.values(progress.questionAttempts).forEach((attempt) => {
    if (!attempt.lastCorrect) {
      attempt.skillTags.forEach((tag) => {
        misses.set(tag, (misses.get(tag) ?? 0) + 1);
      });
    }
  });

  return Array.from(misses.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));
}

export function getRecentMistakes(progress: ProgressState) {
  return Object.values(progress.questionAttempts)
    .filter((attempt) => !attempt.lastCorrect)
    .sort((a, b) => new Date(b.lastAnsweredAt).getTime() - new Date(a.lastAnsweredAt).getTime())
    .slice(0, 5);
}

export function getTopicProgress(progress: ProgressState, topicId: string, levelCount: number) {
  const completed = progress.completedLevels[topicId]?.length ?? 0;
  return {
    completed,
    total: levelCount,
    percent: levelCount === 0 ? 0 : Math.round((completed / levelCount) * 100),
  };
}
