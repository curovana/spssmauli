"use client";

import { useMemo, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import type {
  DragDropQuestion,
  FillBlankQuestion,
  MCQQuestion,
  Question,
  TableInterpretationQuestion,
  TestSelectionQuestion,
} from "@/types/learning";
import { scoreBlankQuestion, scoreCalculationQuestion, scoreOptionQuestion, type ScoreResult } from "@/lib/scoring";
import { MistakeFeedback } from "@/components/quiz/MistakeFeedback";
import { OutputTableView } from "@/components/quiz/OutputTableView";

type Props = {
  question: Question;
  onAnswered?: (question: Question, correct: boolean) => void;
  examMode?: boolean;
};

export function QuestionRenderer({ question, onAnswered, examMode = false }: Props) {
  const [result, setResult] = useState<ScoreResult | null>(null);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-normal text-indigo-600">
            {question.type.replace("_", " ")}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-slate-950">{question.stem}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {question.skillTags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {question.sourceRef && !examMode ? (
        <p className="mt-3 text-xs font-medium text-slate-500">Source: {question.sourceRef}</p>
      ) : null}

      {question.type === "mcq" || question.type === "table_interpretation" || question.type === "test_selection" ? (
        <OptionQuestion
          question={question}
          setResult={setResult}
          onAnswered={onAnswered}
          examMode={examMode}
        />
      ) : null}

      {question.type === "fill_blank" || question.type === "drag_drop" ? (
        <BlankQuestion
          question={question}
          setResult={setResult}
          onAnswered={onAnswered}
          examMode={examMode}
        />
      ) : null}

      {question.type === "calculation" ? (
        <CalculationQuestion
          question={question}
          setResult={setResult}
          onAnswered={onAnswered}
          examMode={examMode}
        />
      ) : null}

      {!examMode || result ? <MistakeFeedback result={result} /> : null}
    </article>
  );
}

function OptionQuestion({
  question,
  setResult,
  onAnswered,
  examMode,
}: {
  question: MCQQuestion | TableInterpretationQuestion | TestSelectionQuestion;
  setResult: (result: ScoreResult | null) => void;
  onAnswered?: (question: Question, correct: boolean) => void;
  examMode: boolean;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const check = () => {
    const next = scoreOptionQuestion(question, selected);
    setResult(next);
    if (selected) {
      onAnswered?.(question, next.correct);
    }
  };

  return (
    <>
      {question.type === "test_selection" ? (
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          {question.scenario}
        </div>
      ) : null}
      {question.type === "table_interpretation" ? <OutputTableView table={question.table} /> : null}
      <div className="mt-4 grid gap-2">
        {question.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setSelected(option.id)}
            className={`flex min-h-12 items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition ${
              selected === option.id
                ? "border-indigo-400 bg-indigo-50 text-indigo-950"
                : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-slate-50"
            }`}
          >
            <span>{option.label}</span>
            {selected === option.id ? <Check className="h-4 w-4 text-indigo-600" aria-hidden="true" /> : null}
          </button>
        ))}
      </div>
      <QuestionActions onCheck={check} onReset={() => { setSelected(null); setResult(null); }} examMode={examMode} />
    </>
  );
}

function BlankQuestion({
  question,
  setResult,
  onAnswered,
  examMode,
}: {
  question: FillBlankQuestion | DragDropQuestion;
  setResult: (result: ScoreResult | null) => void;
  onAnswered?: (question: Question, correct: boolean) => void;
  examMode: boolean;
}) {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const usedAnswers = useMemo(() => new Set(Object.values(answers).filter(Boolean)), [answers]);

  const assign = (blankId: string, value: string | null) => {
    if (!value) {
      setAnswers((current) => {
        const next = { ...current };
        delete next[blankId];
        return next;
      });
      return;
    }

    setAnswers((current) => ({
      ...Object.fromEntries(Object.entries(current).filter(([, answer]) => answer !== value)),
      [blankId]: value,
    }));
    setSelectedChip(null);
  };

  const check = () => {
    const next = scoreBlankQuestion(question, answers);
    setResult(next);
    onAnswered?.(question, next.correct);
  };

  return (
    <>
      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-wrap gap-2">
          {question.answerBank.map((answer) => (
            <button
              key={answer}
              type="button"
              draggable
              onDragStart={(event) => event.dataTransfer.setData("text/plain", answer)}
              onClick={() => setSelectedChip(answer)}
              disabled={usedAnswers.has(answer)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                selectedChip === answer
                  ? "border-indigo-500 bg-indigo-600 text-white"
                  : usedAnswers.has(answer)
                    ? "border-slate-200 bg-slate-100 text-slate-400"
                    : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200"
              }`}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {question.blanks.map((blank, index) => (
          <button
            key={blank.id}
            type="button"
            onClick={() => assign(blank.id, selectedChip)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => assign(blank.id, event.dataTransfer.getData("text/plain"))}
            className="flex min-h-14 items-center justify-between gap-3 rounded-lg border border-dashed border-slate-300 bg-white px-4 py-3 text-left text-sm transition hover:border-indigo-300 hover:bg-indigo-50/50"
          >
            <span className="font-medium text-slate-500">Blank {index + 1}</span>
            <span className={answers[blank.id] ? "font-semibold text-slate-950" : "text-slate-400"}>
              {answers[blank.id] ?? "Drop answer"}
            </span>
            {answers[blank.id] ? (
              <span
                role="button"
                tabIndex={0}
                onClick={(event) => {
                  event.stopPropagation();
                  assign(blank.id, null);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.stopPropagation();
                    assign(blank.id, null);
                  }
                }}
                className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500"
              >
                Clear
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <QuestionActions
        onCheck={check}
        onReset={() => {
          setAnswers({});
          setSelectedChip(null);
          setResult(null);
        }}
        examMode={examMode}
      />
    </>
  );
}

function CalculationQuestion({
  question,
  setResult,
  onAnswered,
  examMode,
}: {
  question: Extract<Question, { type: "calculation" }>;
  setResult: (result: ScoreResult | null) => void;
  onAnswered?: (question: Question, correct: boolean) => void;
  examMode: boolean;
}) {
  const [answer, setAnswer] = useState("");

  const check = () => {
    const next = scoreCalculationQuestion(question, answer);
    setResult(next);
    if (answer.trim()) {
      onAnswered?.(question, next.correct);
    }
  };

  return (
    <>
      <div className="mt-4 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
        {question.given.map((item) => (
          <p key={item} className="text-sm font-medium text-slate-700">
            {item}
          </p>
        ))}
        <p className="rounded-lg bg-white px-3 py-2 font-mono text-sm font-semibold text-slate-950">{question.formula}</p>
      </div>
      <label className="mt-4 block">
        <span className="text-sm font-semibold text-slate-700">Answer</span>
        <input
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          placeholder="Example: 70%"
        />
      </label>
      <QuestionActions onCheck={check} onReset={() => { setAnswer(""); setResult(null); }} examMode={examMode} />
    </>
  );
}

function QuestionActions({
  onCheck,
  onReset,
  examMode,
}: {
  onCheck: () => void;
  onReset: () => void;
  examMode: boolean;
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onCheck}
        className="inline-flex h-11 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        {examMode ? "Submit" : "Check answer"}
      </button>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Reset
      </button>
    </div>
  );
}
