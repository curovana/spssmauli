import type {
  CalculationQuestion,
  DragDropQuestion,
  FillBlankQuestion,
  MCQQuestion,
  Question,
  TableInterpretationQuestion,
  TestSelectionQuestion,
} from "@/types/learning";

export type ScoreResult = {
  correct: boolean;
  message: string;
  details: string[];
};

function normalise(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function scoreOptionQuestion(
  question: MCQQuestion | TableInterpretationQuestion | TestSelectionQuestion,
  selectedOptionId: string | null,
): ScoreResult {
  const selected = question.options.find((option) => option.id === selectedOptionId);
  const correct = selectedOptionId === question.correctOptionId;

  return {
    correct,
    message: correct ? "Correct." : selected?.explanation ?? "Choose an answer before checking.",
    details: [question.explanation],
  };
}

export function scoreBlankQuestion(
  question: FillBlankQuestion | DragDropQuestion,
  answers: Record<string, string>,
): ScoreResult {
  const details = question.blanks.map((blank) => {
    const value = answers[blank.id];
    const correct = normalise(value ?? "") === normalise(blank.correctAnswer);
    return `${correct ? "Correct" : "Check this"}: ${blank.explanation}`;
  });

  const correct = question.blanks.every(
    (blank) => normalise(answers[blank.id] ?? "") === normalise(blank.correctAnswer),
  );

  return {
    correct,
    message: correct ? "Correct. That is the exam wording." : "Some blanks need another look.",
    details,
  };
}

export function scoreCalculationQuestion(
  question: CalculationQuestion,
  answer: string,
): ScoreResult {
  const accepted = [question.correctAnswer, ...(question.acceptedAnswers ?? [])].map(normalise);
  const correct = accepted.includes(normalise(answer));

  return {
    correct,
    message: correct ? "Correct calculation." : "Not quite. Check the denominator first.",
    details: [question.explanation],
  };
}

export function getCorrectAnswerSummary(question: Question) {
  if (question.type === "calculation") {
    return question.correctAnswer;
  }

  if (question.type === "fill_blank" || question.type === "drag_drop") {
    return question.fullCorrectText;
  }

  return question.options.find((option) => option.id === question.correctOptionId)?.label ?? "";
}
