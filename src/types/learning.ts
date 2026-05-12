export type Difficulty = "easy" | "medium" | "hard";

export type SourcePdf = {
  fileName: string;
  topicPart?: string;
  slideRange?: string;
};

export type VisualSummary = {
  title: string;
  kind: "flow" | "comparison" | "table" | "output" | "decision";
  items: string[];
  takeaway: string;
};

export type FormulaCard = {
  id: string;
  title: string;
  formula: string;
  meaning: string;
  examUse: string;
};

export type SPSSWorkflow = {
  id: string;
  title: string;
  useWhen: string;
  steps: string[];
  outputTablesToRead: {
    tableName: string;
    useFor: string;
    keyValues: string[];
  }[];
};

export type WorkedExample = {
  title: string;
  scenario: string;
  steps: string[];
  answer: string;
};

export type QuestionBase = {
  id: string;
  type:
    | "mcq"
    | "fill_blank"
    | "drag_drop"
    | "table_interpretation"
    | "calculation"
    | "test_selection";
  stem: string;
  skillTags: string[];
  sourceRef?: string;
};

export type QuestionOption = {
  id: string;
  label: string;
  explanation: string;
};

export type MCQQuestion = QuestionBase & {
  type: "mcq";
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
};

export type FillBlankQuestion = QuestionBase & {
  type: "fill_blank";
  answerBank: string[];
  blanks: {
    id: string;
    correctAnswer: string;
    explanation: string;
  }[];
  fullCorrectText: string;
};

export type DragDropQuestion = QuestionBase & {
  type: "drag_drop";
  answerBank: string[];
  blanks: {
    id: string;
    correctAnswer: string;
    explanation: string;
  }[];
  fullCorrectText: string;
};

export type OutputTable = {
  caption: string;
  columns: string[];
  rows: string[][];
  highlightedCells?: {
    rowIndex: number;
    columnIndex: number;
    label: string;
  }[];
};

export type TableInterpretationQuestion = QuestionBase & {
  type: "table_interpretation";
  table: OutputTable;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
};

export type CalculationQuestion = QuestionBase & {
  type: "calculation";
  given: string[];
  formula: string;
  correctAnswer: string;
  acceptedAnswers?: string[];
  explanation: string;
};

export type TestSelectionQuestion = QuestionBase & {
  type: "test_selection";
  scenario: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
};

export type Question =
  | MCQQuestion
  | FillBlankQuestion
  | DragDropQuestion
  | TableInterpretationQuestion
  | CalculationQuestion
  | TestSelectionQuestion;

export type CheatSheetSection = {
  id: string;
  title: string;
  bullets: string[];
};

export type CommonTrap = {
  id: string;
  trap: string;
  fix: string;
  skillTag: string;
};

export type LastDayRevision = {
  examTrigger: string;
  memoryHook: string;
  recognitionChecklist: string[];
  mustKnow: string[];
  spssFocus: string[];
  outputFocus: string[];
  answerTemplates?: string[];
  lastMinuteDrill: string[];
};

export type LearningLevel = {
  id: string;
  title: string;
  levelNumber: number;
  difficulty: Difficulty;
  sourceRef?: string;
  objective: string;
  plainEnglishExplanation: string;
  visualSummary: VisualSummary;
  keyRules: string[];
  formulas?: FormulaCard[];
  spssSteps?: SPSSWorkflow;
  workedExample?: WorkedExample;
  activeRecall: Question[];
  examDrills: Question[];
  commonMistakes: string[];
};

export type TopicModule = {
  id: string;
  title: string;
  subtitle: string;
  examRelevance: string;
  lastDayRevision?: LastDayRevision;
  sourcePdfs: SourcePdf[];
  levels: LearningLevel[];
  cheatSheet: CheatSheetSection[];
  spssWorkflows: SPSSWorkflow[];
  examDrills: Question[];
  commonTraps: CommonTrap[];
};

export type QuestionAttempt = {
  questionId: string;
  attempts: number;
  correct: number;
  lastCorrect: boolean;
  lastAnsweredAt: string;
  skillTags: string[];
  prompt: string;
};

export type ProgressState = {
  completedLevels: Record<string, string[]>;
  questionAttempts: Record<string, QuestionAttempt>;
};
