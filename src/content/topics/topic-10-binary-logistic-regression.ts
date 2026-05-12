import type { Question, SPSSWorkflow, TopicModule } from "@/types/learning";

const crosstabsWorkflow: SPSSWorkflow = {
  id: "crosstabs-chi-square-risk",
  title: "Crosstabs, chi-square, risk and odds",
  useWhen:
    "Use when you have two categorical variables, want to compare proportions, or need risk/odds from a 2 by 2 table.",
  steps: [
    "Analyze",
    "Descriptive Statistics",
    "Crosstabs",
    "Rows: exposure or group variable",
    "Columns: binary outcome variable",
    "Statistics: Chi-square and Risk",
    "Cells: Observed, Row %, Column %",
  ],
  outputTablesToRead: [
    {
      tableName: "Crosstabulation",
      useFor: "Counts, row percentages and column percentages.",
      keyValues: ["Observed counts", "Row %", "Column %"],
    },
    {
      tableName: "Chi-Square Tests",
      useFor: "Whether the two categorical variables are associated.",
      keyValues: ["Pearson Chi-Square", "df", "Asymptotic Significance", "Fisher's Exact Test"],
    },
    {
      tableName: "Risk Estimate",
      useFor: "Risk ratio and odds ratio from a 2 by 2 table.",
      keyValues: ["Odds Ratio", "Relative Risk", "95% Confidence Interval"],
    },
  ],
};

const binaryLogisticWorkflow: SPSSWorkflow = {
  id: "binary-logistic-regression",
  title: "Binary logistic regression",
  useWhen:
    "Use when the outcome/dependent variable has two categories and you want to predict odds or adjust for other variables.",
  steps: [
    "Analyze",
    "Regression",
    "Binary Logistic",
    "Dependent: binary outcome",
    "Covariates: predictors",
    "Categorical: define categorical predictors and reference category",
    "Options: CI for Exp(B), Classification plots, Hosmer-Lemeshow if needed",
  ],
  outputTablesToRead: [
    {
      tableName: "Omnibus Tests of Model Coefficients",
      useFor: "Whether the model as a whole improves prediction.",
      keyValues: ["Chi-square", "df", "Sig."],
    },
    {
      tableName: "Model Summary",
      useFor: "A rough guide to variation explained.",
      keyValues: ["Nagelkerke R Square"],
    },
    {
      tableName: "Variables in the Equation",
      useFor: "The result for each predictor.",
      keyValues: ["B", "Sig.", "Exp(B)", "95% CI for Exp(B)"],
    },
    {
      tableName: "Classification Table",
      useFor: "How well the model classifies cases at the chosen cut-off.",
      keyValues: ["Sensitivity", "Specificity", "Overall Percentage"],
    },
    {
      tableName: "Hosmer and Lemeshow Test",
      useFor: "Goodness of fit for the logistic regression model.",
      keyValues: ["Chi-square", "df", "Sig."],
    },
  ],
};

const socialSupportDragDrop: Question = {
  type: "drag_drop",
  id: "t10-social-support-drag-drop",
  stem: "Researchers are trying to understand whether level of social support impacts non-adherence to hypertension treatment. Complete the exam-style interpretation.",
  skillTags: ["risk-ratio", "odds-ratio", "chi-square", "proportions", "p-values"],
  sourceRef: "Topic 10 provided prompt: social support practical pattern",
  answerBank: [
    "65.0%",
    "35.0%",
    "67.5%",
    "32.5%",
    "2",
    "3.857",
    "higher",
    "lower",
    "larger",
    "smaller",
    "significant",
    "non-significant",
    "Pearson's Chi Squared",
    "Fisher's exact",
    "X2 = 5.735",
    "p = 0.017",
    "0.017",
  ],
  blanks: [
    {
      id: "risk-ratio",
      correctAnswer: "2",
      explanation: "Risk ratio compares risk in the exposed group with risk in the unexposed group.",
    },
    {
      id: "odds-ratio",
      correctAnswer: "3.857",
      explanation: "Odds ratio compares event/non-event odds between the two groups.",
    },
    {
      id: "odds-direction",
      correctAnswer: "higher",
      explanation: "An odds ratio above 1 means the odds are higher in the first group.",
    },
    {
      id: "proportion-direction",
      correctAnswer: "larger",
      explanation: "The non-adherent group has a larger low-social-support proportion than high-social-support proportion.",
    },
    {
      id: "low-proportion",
      correctAnswer: "67.5%",
      explanation:
        "The phrase 'of those patients who did not adhere' uses the non-adherent patients as the denominator.",
    },
    {
      id: "high-proportion",
      correctAnswer: "32.5%",
      explanation:
        "Use the percentage within the non-adherent group, not the percentage within the social-support group.",
    },
    {
      id: "significance",
      correctAnswer: "significant",
      explanation: "p = 0.017 is below 0.05, so the result is statistically significant.",
    },
    {
      id: "test-name",
      correctAnswer: "Pearson's Chi Squared",
      explanation: "Use Pearson's Chi-Square when the expected cell count assumption is acceptable.",
    },
    {
      id: "chi-square",
      correctAnswer: "X2 = 5.735",
      explanation: "This is the test statistic reported in the Chi-Square Tests table.",
    },
    {
      id: "p-value",
      correctAnswer: "0.017",
      explanation: "The blank already says p =, so use the number only.",
    },
  ],
  fullCorrectText:
    "The risk of non-adherence when the patient received low social support is 2 times that of patients receiving high social support. The odds of non-adherence when the patient received low social support are 3.857 times higher than the odds of patients receiving high social support. Of those patients who did not adhere, there was a larger proportion who received low social support compared with high social support (67.5% versus 32.5%). This difference was statistically significant according to Pearson's Chi Squared test (X2 = 5.735, df = 1, p = 0.017).",
};

const expBQuestion: Question = {
  type: "table_interpretation",
  id: "t10-expb-table-read",
  stem: "In the SPSS table below, which value should you use as the odds ratio for smoking during pregnancy?",
  skillTags: ["exp-b", "odds-ratio", "spss-output", "low-birthweight"],
  sourceRef: "Lecture 10-2 slides 23-24: Variables in the Equation, Exp(B) for smoker and confidence interval",
  table: {
    caption: "Variables in the Equation",
    columns: ["Predictor", "B", "S.E.", "Wald", "Sig.", "Exp(B)", "95% CI Lower", "95% CI Upper"],
    rows: [["Smoker(1)", "1.466", "0.696", "4.430", "0.030", "4.333", "1.156", "16.248"]],
    highlightedCells: [{ rowIndex: 0, columnIndex: 5, label: "Odds ratio" }],
  },
  options: [
    {
      id: "b",
      label: "1.466",
      explanation: "B is the log-odds coefficient. It is not the odds ratio you interpret in plain English.",
    },
    {
      id: "sig",
      label: "0.030",
      explanation: "This is the p-value. It tells you statistical significance, not effect size.",
    },
    {
      id: "expb",
      label: "4.333",
      explanation: "Correct. Exp(B) is the odds ratio in logistic regression output.",
    },
    {
      id: "wald",
      label: "4.430",
      explanation: "Wald is a test statistic. For odds ratio interpretation, use Exp(B).",
    },
  ],
  correctOptionId: "expb",
  explanation: "For practical interpretation, use Exp(B). B is log odds; Exp(B) is the odds ratio.",
};

const hosmerQuestion: Question = {
  type: "mcq",
  id: "t10-hosmer-significance-rule",
  stem: "The lecture Hosmer-Lemeshow test gives p = 0.519. What is the exam-safe interpretation?",
  skillTags: ["hosmer-lemeshow", "model-fit", "p-values"],
  sourceRef: "Lecture 10-4 slides 20-22: Hosmer-Lemeshow goodness-of-fit interpretation",
  options: [
    {
      id: "poor",
      label: "The model has poor fit because p is above 0.05.",
      explanation: "For Hosmer-Lemeshow, this reverses the rule.",
    },
    {
      id: "adequate",
      label: "The model has adequate fit because p is above 0.05.",
      explanation: "Correct. For Hosmer-Lemeshow, p > 0.05 suggests adequate fit.",
    },
    {
      id: "predictor",
      label: "Every predictor is significant.",
      explanation: "Hosmer-Lemeshow does not test each predictor. Use Variables in the Equation for that.",
    },
    {
      id: "or",
      label: "The odds ratio is 0.519.",
      explanation: "p = 0.519 is a p-value, not an odds ratio.",
    },
  ],
  correctOptionId: "adequate",
  explanation: "Hosmer-Lemeshow is a goodness-of-fit test. In the exam, remember: p > 0.05 is the good result.",
};

const classificationCalculation: Question = {
  type: "calculation",
  id: "t10-classification-sensitivity",
  stem: "The lecture classification table shows TP = 13 and FN = 5 for low-birth-weight babies. Calculate sensitivity.",
  skillTags: ["sensitivity", "classification-table", "low-birthweight"],
  sourceRef: "Lecture 10-4 slides 14-19: classification table and sensitivity calculation",
  given: ["True positives = 13", "False negatives = 5"],
  formula: "Sensitivity = TP / (TP + FN)",
  correctAnswer: "72.2%",
  acceptedAnswers: ["0.722", "72.2", "72.2%", "0.72"],
  explanation: "Sensitivity = 13 / (13 + 5) = 13 / 18 = 0.722 = 72.2%.",
};

const testSelectionBinaryOutcome: Question = {
  type: "test_selection",
  id: "t10-test-selection-binary-outcome",
  stem: "Choose the most appropriate statistical test.",
  skillTags: ["test-selection", "binary-outcome", "logistic-regression"],
  scenario:
    "The baby dataset asks whether smoking during pregnancy and mother's pre-pregnancy weight predict whether the baby has low birthweight. The outcome is yes/no lowbirthwgt.",
  options: [
    {
      id: "linear",
      label: "Linear regression",
      explanation: "Linear regression is for a continuous outcome, not a yes/no outcome.",
    },
    {
      id: "logistic",
      label: "Binary logistic regression",
      explanation: "Correct. The outcome is binary and there are multiple predictors.",
    },
    {
      id: "ttest",
      label: "Independent samples t-test",
      explanation: "A t-test compares means of a continuous outcome between two groups.",
    },
    {
      id: "correlation",
      label: "Pearson correlation",
      explanation: "Correlation is for the relationship between continuous variables.",
    },
  ],
  correctOptionId: "logistic",
  explanation: "Binary outcome means binary logistic regression, especially when adjusting for covariates.",
};

const topic10LevelSourceRefs: Record<string, string> = {
  "binary-outcomes": "Lecture 10-1 slides 3-8 and Lecture 10-2 slides 7-10: binary outcomes and low-birthweight data",
  "contingency-tables": "Lecture 10-1 slides 7-11: crosstabs for smoker and low birthweight",
  "risk-vs-odds": "Lecture 10-1 slides 15-19: risk, odds and low-birthweight denominators",
  "ratios": "Lecture 10-1 slides 16-22: risk ratio, odds ratio and SPSS Risk Estimate table",
  "chi-square": "Lecture 10-1 slides 12-15: Pearson chi-square output for smoker and lowbirthwgt",
  "why-logistic": "Lecture 10-2 slides 8-20: binary outcomes, non-linear probability and logit link",
  "b-expb": "Lecture 10-2 slides 18-24: logit, B, Exp(B) and smoker odds ratio",
  "multiple-predictors": "Lecture 10-3 slides 4-14: adjusted odds ratios, Omnibus, Nagelkerke and Variables in the Equation",
  "reference-categories": "Lecture 10-3 slides 10-12: categorical predictors, reference categories and dummy variables",
  "confounding-mediation-moderation": "Lecture 10-3 slide 3: confounders, mediators and moderators",
  "classification": "Lecture 10-4 slides 11-19 and 24-26: classification table, cut-off, sensitivity, specificity, PPV and NPV",
  "model-fit": "Lecture 10-3 slides 8 and 13-14 plus Lecture 10-4 slides 20-22: Omnibus, Nagelkerke R2 and Hosmer-Lemeshow goodness of fit",
  "prediction-probability": "Lecture 10-4 slides 3-8 and 24-25: linear predictor, odds and predicted probability",
};

const topic10BinaryLogisticRegressionBase: TopicModule = {
  id: "topic-10-binary-logistic-regression",
  title: "Topic 10: Binary Logistic Regression",
  subtitle: "Risk, odds, chi-square, SPSS output and exam interpretation",
  examRelevance:
    "This topic trains the exact practical chain: research question, binary outcome, group/predictor, risk or odds, SPSS workflow, output table, p-value, confidence interval and interpretation.",
  lastDayRevision: {
    examTrigger:
      "Use this topic when the outcome is yes/no and the exam asks for risk, odds, odds ratios, chi-square, logistic regression output, classification or predicted probability.",
    memoryHook: "Binary outcome: risk table first, Exp(B) for odds ratio.",
    recognitionChecklist: [
      "Is the outcome binary, such as lowbirthwgt yes/no?",
      "Is the question comparing two categorical variables or predicting the binary outcome?",
      "Does it ask for risk, odds, risk ratio or odds ratio?",
      "Does the output show Variables in the Equation, Classification Table or Hosmer-Lemeshow?",
    ],
    mustKnow: [
      "Risk = event / total; odds = event / non-event.",
      "Risk ratio compares risks; odds ratio compares odds.",
      "Exp(B) is the odds ratio; B is log odds.",
      "OR confidence intervals are judged against 1; indirect-effect CIs are judged against 0.",
      "Hosmer-Lemeshow p > .05 suggests adequate fit.",
    ],
    spssFocus: [
      "Crosstabs with Chi-square and Risk for 2 by 2 tables.",
      "Binary Logistic with Dependent = binary outcome.",
      "Categorical button for categorical predictors/reference categories.",
      "Options for CI for Exp(B), classification and Hosmer-Lemeshow when needed.",
    ],
    outputFocus: [
      "Crosstabulation: counts, row percent and column percent.",
      "Chi-Square Tests: Pearson X2, df and p.",
      "Risk Estimate: odds ratio and risk ratio.",
      "Variables in the Equation: B, Sig., Exp(B), 95% CI.",
      "Classification Table: sensitivity, specificity, PPV and NPV.",
    ],
    answerTemplates: [
      "The risk is [event]/[total]; the odds are [event]/[non-event].",
      "Mothers who smoked had [Exp(B)] times the odds of low birthweight compared with non-smokers, p = [p].",
      "Because the 95% CI for Exp(B) [includes/excludes] 1, the odds ratio is [not significant/significant].",
      "Hosmer-Lemeshow p = [p] is above .05, so the model fit is adequate.",
    ],
    lastMinuteDrill: [
      "Calculate smoker risk 13/22 and smoker odds 13/9.",
      "Explain Exp(B) = 4.333 without using B.",
      "Decide significance from p = .030 and CI 1.156 to 16.248.",
      "Calculate sensitivity from TP = 13 and FN = 5.",
      "Interpret Hosmer-Lemeshow p = .519 correctly.",
    ],
  },
  sourcePdfs: [
    { fileName: "28-Lecture 10-1.pdf", topicPart: "Risks and Odds", slideRange: "slides 3-28: odds, risk, crosstabs, chi-square, risk ratio and odds ratio" },
    { fileName: "29-lecture 10-2.pdf", topicPart: "Binary Logistic Regression", slideRange: "slides 3-27: why logistic regression, logit, B, Exp(B), SPSS Binary Logistic" },
    { fileName: "30-lecture 10-3.pdf", topicPart: "Multiple Independent Variables", slideRange: "slides 3-14: adjusted odds ratios, reference categories, model building and output interpretation" },
    {
      fileName: "31-lecture 10-4.pdf",
      topicPart: "Prediction, Goodness of Fit and Classification",
      slideRange: "slides 3-26: prediction probabilities, classification tables, cut-offs and Hosmer-Lemeshow",
    },
  ],
  spssWorkflows: [crosstabsWorkflow, binaryLogisticWorkflow],
  cheatSheet: [
    {
      id: "risk-odds",
      title: "Risk and Odds",
      bullets: [
        "Risk = event / total.",
        "Odds = event / non-event.",
        "Risk ratio = risk exposed / risk unexposed.",
        "Odds ratio = odds exposed / odds unexposed.",
        "Do not use odds logic when the wording asks for risk.",
      ],
    },
    {
      id: "test-choice",
      title: "Choosing the Test",
      bullets: [
        "Two categorical variables or comparing proportions: Crosstabs with chi-square.",
        "Small expected counts: Fisher's exact test may be needed.",
        "Binary outcome with one or more predictors: binary logistic regression.",
        "Continuous outcome: do not choose binary logistic regression.",
      ],
    },
    {
      id: "logistic-output",
      title: "Logistic Regression Output",
      bullets: [
        "Exp(B) is the odds ratio.",
        "B is log odds, not the odds ratio.",
        "Variables in the Equation tests individual predictors.",
        "Omnibus Tests of Model Coefficients tests the whole model.",
        "Nagelkerke R2 roughly indicates variation explained.",
      ],
    },
    {
      id: "significance",
      title: "Significance Rules",
      bullets: [
        "p < 0.05 means statistically significant.",
        "For OR/Exp(B), a 95% CI including 1 means not significant.",
        "For OR/Exp(B), a 95% CI excluding 1 means significant.",
        "Hosmer-Lemeshow p > 0.05 suggests adequate fit.",
        "Hosmer-Lemeshow p < 0.05 suggests poor fit.",
      ],
    },
    {
      id: "classification",
      title: "Classification Metrics",
      bullets: [
        "Sensitivity = TP / (TP + FN).",
        "Specificity = TN / (TN + FP).",
        "PPV = TP / (TP + FP).",
        "NPV = TN / (TN + FN).",
        "Cut-off value changes how strict the model is when classifying predicted outcomes.",
      ],
    },
  ],
  commonTraps: [
    {
      id: "wrong-denominator",
      trap: "Choosing the wrong percentage from a crosstab.",
      fix: "Read the sentence carefully. 'Of those who did not adhere' means use the non-adherent group as the denominator.",
      skillTag: "proportions",
    },
    {
      id: "risk-vs-odds",
      trap: "Using event/non-event when the question asks for risk.",
      fix: "Risk uses event/total. Odds uses event/non-event.",
      skillTag: "risk-odds",
    },
    {
      id: "b-vs-expb",
      trap: "Interpreting B as the odds ratio.",
      fix: "Use Exp(B) for odds ratio interpretation. B is log odds.",
      skillTag: "exp-b",
    },
    {
      id: "ci-one",
      trap: "Missing the 1 in an odds ratio confidence interval.",
      fix: "If the 95% CI for OR includes 1, treat it as not significant.",
      skillTag: "confidence-intervals",
    },
  ],
  examDrills: [
    socialSupportDragDrop,
    expBQuestion,
    classificationCalculation,
    hosmerQuestion,
    testSelectionBinaryOutcome,
    {
      type: "fill_blank",
      id: "t10-ci-fill-blank",
      stem: "Complete the interpretation rule for an odds ratio confidence interval.",
      skillTags: ["confidence-intervals", "odds-ratio"],
      answerBank: ["1", "0", "significant", "not significant", "Exp(B)", "B"],
      blanks: [
        {
          id: "ci-value",
          correctAnswer: "1",
          explanation: "For odds ratios, 1 means equal odds. That is the no-effect value.",
        },
        {
          id: "ci-meaning",
          correctAnswer: "not significant",
          explanation: "If a 95% CI for an odds ratio includes 1, the result is not statistically significant.",
        },
      ],
      fullCorrectText:
        "If the 95% confidence interval for an odds ratio includes 1, the result is not significant.",
    },
  ],
  levels: [
    {
      id: "binary-outcomes",
      title: "Binary Outcomes",
      levelNumber: 1,
      difficulty: "easy",
      objective: "Spot when the outcome has exactly two categories.",
      plainEnglishExplanation:
        "A binary outcome has two possible results, such as adherent/non-adherent, case/control, relapse/no relapse or yes/no. In the exam, the outcome is the thing the researchers are trying to explain or predict.",
      visualSummary: {
        title: "Binary outcome pattern",
        kind: "flow",
        items: ["Research question", "Outcome has two categories", "Use binary-outcome thinking"],
        takeaway: "If the dependent variable is yes/no, ordinary linear regression is not the safe choice.",
      },
      keyRules: [
        "Outcome means dependent variable.",
        "Binary means two categories.",
        "Binary outcome points toward chi-square for two categorical variables or binary logistic regression for prediction.",
      ],
      workedExample: {
        title: "Low birthweight",
        scenario: "The lecture baby dataset asks whether a baby has low birthweight.",
        steps: [
          "Outcome: lowbirthwgt.",
          "Values: yes or no.",
          "Conclusion: the outcome is binary.",
        ],
        answer: "Use binary-outcome methods, not a test for a continuous outcome.",
      },
      activeRecall: [
        {
          type: "mcq",
          id: "t10-l1-binary-mcq",
          stem: "Which variable is the binary outcome?",
          skillTags: ["variable-identification", "binary-outcome"],
          options: [
            { id: "age", label: "Age in years", explanation: "Age is continuous, not binary." },
            { id: "score", label: "Depression score", explanation: "A score is usually continuous." },
            {
              id: "lowbirthwgt",
              label: "Low birthweight: yes/no",
              explanation: "Correct. It has two possible outcome categories.",
            },
            {
              id: "support",
              label: "Social support: low/medium/high",
              explanation: "This is categorical, but it has three categories here.",
            },
          ],
          correctOptionId: "lowbirthwgt",
          explanation: "Binary outcome means the dependent variable has two categories.",
        },
      ],
      examDrills: [testSelectionBinaryOutcome],
      commonMistakes: ["Choosing linear regression just because the word regression appears."],
    },
    {
      id: "contingency-tables",
      title: "Contingency Tables",
      levelNumber: 2,
      difficulty: "easy",
      objective: "Read a 2 by 2 table and know which denominator the sentence needs.",
      plainEnglishExplanation:
        "A contingency table counts people in combinations of two categorical variables. The exam often hides the key denominator inside words like 'of babies with low birthweight' or 'among mothers who smoked'.",
      visualSummary: {
        title: "Read the sentence before the percentage",
        kind: "table",
        items: ["Rows: usually group/exposure", "Columns: usually outcome", "Row % answers 'within this group'", "Column % answers 'of this outcome group'"],
        takeaway: "The correct percentage depends on the denominator named by the sentence.",
      },
      keyRules: [
        "Use row percentage when the denominator is the row group.",
        "Use column percentage when the denominator is the outcome column.",
        "Counts tell you frequency; percentages tell you proportion.",
      ],
      spssSteps: crosstabsWorkflow,
      workedExample: {
        title: "Which percentage?",
        scenario: "The sentence says: 'Of the babies with low birthweight, what proportion had mothers who smoked?'",
        steps: [
          "Find the low-birthweight babies.",
          "Use that group as the denominator: 18 babies.",
          "13 of those 18 babies had mothers who smoked.",
        ],
        answer: "13 / 18 = 72.2%. Use the denominator named after 'of'.",
      },
      activeRecall: [
        {
          type: "mcq",
          id: "t10-l2-denominator-mcq",
          stem: "The phrase 'of the babies with low birthweight' tells you to use which denominator?",
          skillTags: ["proportions", "crosstabs"],
          options: [
            {
              id: "all-low",
              label: "All mothers who smoked",
              explanation: "That would answer a different question: among smokers.",
            },
            {
              id: "all-non",
              label: "All babies with low birthweight",
              explanation: "Correct. The phrase names the low-birthweight group as the denominator.",
            },
            {
              id: "all-study",
              label: "All mothers in the study",
              explanation: "That is a whole-sample denominator, not this phrase.",
            },
            {
              id: "all-high",
              label: "All babies without low birthweight",
              explanation: "That would be the normal-birthweight group denominator.",
            },
          ],
          correctOptionId: "all-non",
          explanation: "In interpretation sentences, 'of those...' usually tells you the denominator.",
        },
      ],
      examDrills: [socialSupportDragDrop],
      commonMistakes: ["Picking any percentage that looks familiar instead of matching the denominator."],
    },
    {
      id: "risk-vs-odds",
      title: "Risk vs Odds",
      levelNumber: 3,
      difficulty: "easy",
      objective: "Separate risk from odds without algebra panic.",
      plainEnglishExplanation:
        "Risk asks: out of everyone in this group, how many had the event? Odds asks: for every non-event, how many events were there? They are related, but they are not the same calculation.",
      visualSummary: {
        title: "Two denominators",
        kind: "comparison",
        items: ["Risk: event / total", "Odds: event / non-event", "Risk feels like a percentage", "Odds compares event to non-event"],
        takeaway: "If the denominator is total, it is risk. If the denominator is non-event, it is odds.",
      },
      keyRules: ["Risk = event / total.", "Odds = event / non-event.", "Never call B the odds ratio; use Exp(B)."],
      formulas: [
        {
          id: "risk",
          title: "Risk",
          formula: "event / total",
          meaning: "The probability or proportion with the event.",
          examUse: "Use when the question asks for risk or proportion in a group.",
        },
        {
          id: "odds",
          title: "Odds",
          formula: "event / non-event",
          meaning: "How many events there are compared with non-events.",
          examUse: "Use for odds and odds ratios.",
        },
      ],
      workedExample: {
        title: "Smokers and low birthweight",
        scenario: "In the lecture table, 13 of 22 mothers who smoked had a low-birth-weight baby; 9 did not.",
        steps: ["Risk = 13 / 22 = 0.59.", "Odds = 13 / 9 = 1.44."],
        answer: "Same table, different denominator.",
      },
      activeRecall: [
        {
          type: "calculation",
          id: "t10-l3-risk-calc",
          stem: "In the lecture table, 13 of 22 mothers who smoked had a low-birth-weight baby. Calculate the risk.",
          skillTags: ["risk-odds", "risk", "low-birthweight"],
          given: ["Event = 13", "Total = 22"],
          formula: "Risk = event / total",
          correctAnswer: "59.1%",
          acceptedAnswers: ["59.1", "59.1%", "0.591", "0.59", "59%"],
          explanation: "Risk = 13 / 22 = 0.591 = 59.1%.",
        },
      ],
      examDrills: [
        {
          type: "calculation",
          id: "t10-l3-odds-calc",
          stem: "In the lecture table, 13 mothers who smoked had a low-birth-weight baby and 9 did not. Calculate the odds.",
          skillTags: ["risk-odds", "odds", "low-birthweight"],
          given: ["Event = 13", "Non-event = 9"],
          formula: "Odds = event / non-event",
          correctAnswer: "1.44",
          acceptedAnswers: ["1.44", "1.444", "13:9", "13/9"],
          explanation: "Odds = 13 / 9 = 1.44. This is event divided by non-event, not event divided by total.",
        },
      ],
      commonMistakes: ["Using event/total for odds.", "Using event/non-event for risk."],
    },
    {
      id: "ratios",
      title: "Risk Ratio vs Odds Ratio",
      levelNumber: 4,
      difficulty: "medium",
      objective: "Compare two groups using the right ratio.",
      plainEnglishExplanation:
        "A ratio compares one group with another. Risk ratio compares risks. Odds ratio compares odds. A value above 1 means the first group has a higher risk or higher odds than the reference group.",
      visualSummary: {
        title: "Ratio interpretation",
        kind: "comparison",
        items: ["Ratio = 1: no difference", "Ratio > 1: higher in first group", "Ratio < 1: lower in first group"],
        takeaway: "Check whether the question says risk ratio or odds ratio before choosing the value.",
      },
      keyRules: [
        "Risk ratio = risk exposed / risk unexposed.",
        "Odds ratio = odds exposed / odds unexposed.",
        "Odds ratio is the same idea as Exp(B) in logistic regression output.",
      ],
      formulas: [
        {
          id: "risk-ratio",
          title: "Risk Ratio",
          formula: "risk exposed / risk unexposed",
          meaning: "How many times the risk is in one group compared with another.",
          examUse: "Use when the question asks how many times the risk is.",
        },
        {
          id: "odds-ratio",
          title: "Odds Ratio",
          formula: "odds exposed / odds unexposed",
          meaning: "How many times the odds are in one group compared with another.",
          examUse: "Use for logistic regression interpretation and crosstab risk estimates.",
        },
      ],
      workedExample: {
        title: "Smoker versus non-smoker",
        scenario: "The lecture compares low-birth-weight babies for mothers who smoked and did not smoke during pregnancy.",
        steps: [
          "Risk in smokers = 13 / 22 = 0.59.",
          "Risk in non-smokers = 5 / 20 = 0.25.",
          "Risk ratio = 0.59 / 0.25 = 2.36.",
          "Odds in smokers = 13 / 9 = 1.44; odds in non-smokers = 5 / 15 = 0.33.",
          "Odds ratio = 1.44 / 0.33 = 4.33.",
        ],
        answer: "Smoking is associated with 2.36 times the risk and about 4.33 times the odds of low birthweight.",
      },
      activeRecall: [
        {
          type: "mcq",
          id: "t10-l4-ratio-direction",
          stem: "An odds ratio of 4.333 for smokers versus non-smokers means:",
          skillTags: ["odds-ratio", "interpretation"],
          options: [
            {
              id: "lower",
              label: "Smokers have lower odds of low birthweight.",
              explanation: "The odds ratio is above 1, so the odds are higher in the first group.",
            },
            {
              id: "higher",
              label: "Smokers have higher odds of low birthweight.",
              explanation: "Correct. Above 1 means higher odds in the first named group.",
            },
            {
              id: "same",
              label: "The two groups have identical odds.",
              explanation: "Identical odds would be odds ratio = 1.",
            },
            {
              id: "percent",
              label: "4.333% of babies had low birthweight.",
              explanation: "An odds ratio is not a percentage.",
            },
          ],
          correctOptionId: "higher",
          explanation: "For OR/Exp(B), above 1 means higher odds compared with the reference group.",
        },
      ],
      examDrills: [socialSupportDragDrop],
      commonMistakes: ["Reading an odds ratio as a percentage.", "Forgetting which group is the reference group."],
    },
    {
      id: "chi-square",
      title: "Chi-square and Fisher",
      levelNumber: 5,
      difficulty: "medium",
      objective: "Know when crosstabs gives Pearson chi-square and when Fisher can matter.",
      plainEnglishExplanation:
        "Pearson's chi-square tests whether two categorical variables are associated. Fisher's exact test is used when the 2 by 2 table has small expected counts. In SPSS, both can appear in the Chi-Square Tests table.",
      visualSummary: {
        title: "Crosstabs decision",
        kind: "decision",
        items: ["Two categorical variables", "Run Crosstabs", "Read Chi-Square Tests", "Use Pearson or Fisher depending on assumptions"],
        takeaway: "For exam interpretation, report the test statistic, df and p-value from the correct row.",
      },
      keyRules: [
        "Pearson's chi-square tests association between categorical variables.",
        "p < 0.05 means statistically significant.",
        "Fisher's exact is relevant for small expected cell counts.",
      ],
      spssSteps: crosstabsWorkflow,
      workedExample: {
        title: "Smoking and low birthweight",
        scenario: "Smoker and lowbirthwgt are both categorical variables in the Lecture 10 baby dataset.",
        steps: [
          "Run Crosstabs.",
          "Request Chi-square and Risk.",
          "Read the Chi-Square Tests table.",
          "The lecture reports Pearson chi-square = 4.972, df = 1, p = 0.026.",
        ],
        answer: "Smoking status and low birthweight are statistically associated.",
      },
      activeRecall: [
        {
          type: "table_interpretation",
          id: "t10-l5-chi-square-table",
          stem: "Which row gives the main chi-square result in this table?",
          skillTags: ["chi-square", "spss-output"],
          table: {
            caption: "Chi-Square Tests",
            columns: ["Test", "Value", "df", "Asymptotic Significance"],
            rows: [
              ["Pearson Chi-Square", "4.972", "1", "0.026"],
              ["Continuity Correction", "3.690", "1", "0.055"],
              ["Fisher's Exact Test", "", "", "0.030"],
            ],
            highlightedCells: [{ rowIndex: 0, columnIndex: 0, label: "Main row" }],
          },
          options: [
            {
              id: "pearson",
              label: "Pearson Chi-Square",
              explanation: "Correct. This is the standard chi-square row when assumptions are acceptable.",
            },
            {
              id: "df",
              label: "df",
              explanation: "df is a column, not the test row.",
            },
            {
              id: "risk",
              label: "Risk Estimate",
              explanation: "Risk Estimate is a different table for risk and odds ratios.",
            },
            {
              id: "nagelkerke",
              label: "Nagelkerke R Square",
              explanation: "That appears in logistic regression Model Summary, not crosstabs.",
            },
          ],
          correctOptionId: "pearson",
          explanation: "For a crosstab chi-square result, use the Chi-Square Tests table.",
        },
      ],
      examDrills: [socialSupportDragDrop],
      commonMistakes: ["Reporting the wrong SPSS table.", "Calling a significant association a causal effect."],
    },
    {
      id: "why-logistic",
      title: "Why Logistic Regression",
      levelNumber: 6,
      difficulty: "medium",
      objective: "Explain why binary outcomes need binary logistic regression.",
      plainEnglishExplanation:
        "Linear regression predicts a continuous number. A yes/no outcome is not continuous, so binary logistic regression is used to model the odds or probability of the event.",
      visualSummary: {
        title: "Outcome drives the model",
        kind: "flow",
        items: ["Continuous outcome -> linear regression", "Binary outcome -> binary logistic regression", "Multiple predictors -> adjusted logistic model"],
        takeaway: "Start by identifying the outcome. That choice usually decides the test family.",
      },
      keyRules: [
        "Binary outcome means binary logistic regression.",
        "Use logistic regression to predict odds/probability of a binary event.",
        "Use it when adjusting for covariates or confounders.",
      ],
      spssSteps: binaryLogisticWorkflow,
      workedExample: {
        title: "Predicting low birthweight",
        scenario: "Outcome is lowbirthwgt, coded yes/no. Predictors include smoking during pregnancy and mother's pre-pregnancy weight.",
        steps: ["Dependent: lowbirthwgt.", "Covariates: smoker and mppwgt.", "Categorical: define smoker if SPSS needs the reference category made explicit."],
        answer: "Analyze -> Regression -> Binary Logistic.",
      },
      activeRecall: [testSelectionBinaryOutcome],
      examDrills: [
        {
          type: "mcq",
          id: "t10-l6-linear-not-appropriate",
          stem: "Why is linear regression not appropriate for a yes/no outcome in this course context?",
          skillTags: ["logistic-regression", "test-selection"],
          options: [
            {
              id: "too-hard",
              label: "Because linear regression is always harder.",
              explanation: "Difficulty is not the reason.",
            },
            {
              id: "binary",
              label: "Because the outcome is binary, not continuous.",
              explanation: "Correct. Linear regression is for a continuous outcome.",
            },
            {
              id: "categorical-predictor",
              label: "Because it has a categorical predictor.",
              explanation: "Linear regression can use categorical predictors if coded properly; the outcome is the key issue.",
            },
            {
              id: "pvalue",
              label: "Because p-values cannot be used.",
              explanation: "Both linear and logistic regression use p-values.",
            },
          ],
          correctOptionId: "binary",
          explanation: "The outcome/dependent variable is the first thing to inspect.",
        },
      ],
      commonMistakes: ["Choosing the test from the predictor instead of the outcome."],
    },
    {
      id: "b-expb",
      title: "B vs Exp(B)",
      levelNumber: 7,
      difficulty: "medium",
      objective: "Read the correct column in SPSS logistic regression output.",
      plainEnglishExplanation:
        "In SPSS logistic regression, B is the log-odds coefficient. It is useful for the model, but it is not the plain-English odds ratio. Exp(B) is the odds ratio and is usually the value you interpret.",
      visualSummary: {
        title: "Variables in the Equation",
        kind: "output",
        items: ["B: log odds", "Sig.: p-value", "Exp(B): odds ratio", "95% CI for Exp(B): uncertainty"],
        takeaway: "When writing an odds-ratio sentence, use Exp(B), not B.",
      },
      keyRules: [
        "Exp(B) is the odds ratio.",
        "B is log odds, not the odds ratio.",
        "Sig. is the p-value for the predictor.",
        "95% CI for Exp(B) including 1 means not significant.",
      ],
      spssSteps: binaryLogisticWorkflow,
      workedExample: {
        title: "Smoker OR",
        scenario: "Variables in the Equation shows B = 1.466 and Exp(B) = 4.333 for mothers who smoked during pregnancy.",
        steps: ["Read Exp(B) = 4.333.", "Check Sig. = 0.030.", "Check 95% CI = 1.156 to 16.248."],
        answer: "Mothers who smoked had 4.33 times larger odds of a low-birth-weight baby than mothers who did not smoke.",
      },
      activeRecall: [expBQuestion],
      examDrills: [
        {
          type: "fill_blank",
          id: "t10-l7-expb-fill",
          stem: "Complete the output-reading rule.",
          skillTags: ["exp-b", "spss-output"],
          answerBank: ["B", "Exp(B)", "Sig.", "Nagelkerke R2", "odds ratio", "mean"],
          blanks: [
            {
              id: "column",
              correctAnswer: "Exp(B)",
              explanation: "Exp(B) is the odds ratio column.",
            },
            {
              id: "meaning",
              correctAnswer: "odds ratio",
              explanation: "The odds ratio is the plain-English effect size for logistic regression.",
            },
          ],
          fullCorrectText: "Use Exp(B) as the odds ratio.",
        },
      ],
      commonMistakes: ["Interpreting B as if it were an odds ratio.", "Ignoring the confidence interval."],
    },
    {
      id: "multiple-predictors",
      title: "Adjusted Odds Ratios",
      levelNumber: 8,
      difficulty: "medium",
      objective: "Understand what changes when multiple predictors enter the model.",
      plainEnglishExplanation:
        "A multiple-predictor logistic regression gives adjusted odds ratios. Adjusted means the predictor is interpreted while the other variables in the model are held constant.",
      visualSummary: {
        title: "Adjusted interpretation",
        kind: "flow",
        items: ["Add predictor", "Add covariates/confounders", "Read Exp(B)", "Say adjusted odds"],
        takeaway: "With multiple predictors, write 'adjusted for' or 'holding other variables constant'.",
      },
      keyRules: [
        "Adjusted odds ratio comes from a model with multiple predictors.",
        "Variables in the Equation tests individual predictors.",
        "Omnibus Tests tests whether the whole model improves prediction.",
      ],
      spssSteps: binaryLogisticWorkflow,
      workedExample: {
        title: "Smoking adjusted for mother's pre-pregnancy weight",
        scenario: "Lecture 10-3 adds smoker and mother's pre-pregnancy weight to the binary logistic model.",
        steps: [
          "Omnibus chi-square = 8.573, df = 2, p = .014, so the final model improves on the constant-only model.",
          "Nagelkerke R2 = 24.8%, so roughly 24.8% of variation in low birthweight is explained.",
          "Smoker Exp(B) = 4.831, p = .026, 95% CI [1.204, 19.386].",
          "Mother's pre-pregnancy weight Exp(B) = 0.961, p = .077, 95% CI [0.919, 1.004].",
        ],
        answer: "Smoking remains a significant adjusted predictor; pre-pregnancy weight is not significant because p > .05 and the CI includes 1.",
      },
      activeRecall: [
        {
          type: "mcq",
          id: "t10-l8-adjusted-mcq",
          stem: "What does an adjusted odds ratio mean?",
          skillTags: ["adjusted-odds-ratio", "multiple-predictors"],
          options: [
            {
              id: "one-predictor",
              label: "It comes from a model with only one predictor.",
              explanation: "That is usually unadjusted.",
            },
            {
              id: "other-vars",
              label: "It accounts for other variables in the model.",
              explanation: "Correct. It is adjusted for included covariates.",
            },
            {
              id: "no-p",
              label: "It means no p-value is needed.",
              explanation: "You still read the p-value and confidence interval.",
            },
            {
              id: "risk",
              label: "It is the same as risk ratio.",
              explanation: "An adjusted odds ratio is still an odds ratio, not a risk ratio.",
            },
          ],
          correctOptionId: "other-vars",
          explanation: "Adjusted means interpreted while accounting for the other predictors in the model.",
        },
      ],
      examDrills: [
        {
          type: "table_interpretation",
          id: "t10-l8-variables-table",
          stem: "Which table do you read for individual predictors in binary logistic regression?",
          skillTags: ["spss-output", "variables-in-equation"],
          table: {
            caption: "Binary Logistic Regression Output",
            columns: ["Table", "Main use"],
            rows: [
              ["Omnibus Tests of Model Coefficients", "Whole model test"],
              ["Model Summary", "Nagelkerke R Square"],
              ["Variables in the Equation", "B, Sig., Exp(B) for each predictor"],
            ],
            highlightedCells: [{ rowIndex: 2, columnIndex: 0, label: "Predictors" }],
          },
          options: [
            {
              id: "omnibus",
              label: "Omnibus Tests of Model Coefficients",
              explanation: "This tests the model as a whole, not each predictor.",
            },
            {
              id: "variables",
              label: "Variables in the Equation",
              explanation: "Correct. This table gives B, Sig. and Exp(B) for each predictor.",
            },
            {
              id: "classification",
              label: "Classification Table",
              explanation: "This is for prediction/classification performance.",
            },
            {
              id: "crosstab",
              label: "Crosstabulation",
              explanation: "This is not the logistic regression predictor table.",
            },
          ],
          correctOptionId: "variables",
          explanation: "For individual predictors, go to Variables in the Equation.",
        },
      ],
      commonMistakes: ["Calling an adjusted odds ratio a risk ratio.", "Reading Omnibus for individual predictors."],
    },
    {
      id: "reference-categories",
      title: "Reference Categories",
      levelNumber: 9,
      difficulty: "medium",
      objective: "Interpret categorical predictors against the reference group.",
      plainEnglishExplanation:
        "For categorical predictors, SPSS compares each displayed category with a reference category. The odds ratio tells you odds relative to that reference group.",
      visualSummary: {
        title: "Reference category",
        kind: "comparison",
        items: ["Reference group: baseline", "Displayed category: compared with baseline", "Exp(B): odds ratio for that comparison"],
        takeaway: "Always ask: compared with whom?",
      },
      keyRules: [
        "Categorical predictors need reference categories.",
        "Dummy variables compare categories with the reference category.",
        "An OR above 1 means higher odds than the reference category.",
      ],
      spssSteps: binaryLogisticWorkflow,
      workedExample: {
        title: "Smoker versus non-smoker",
        scenario: "Non-smokers are the reference category for the smoker predictor.",
        steps: ["SPSS displays Smoker(1).", "Exp(B) = 4.333 in the one-predictor model.", "Compare smokers with non-smokers."],
        answer: "Mothers who smoked had 4.333 times the odds of a low-birth-weight baby compared with mothers who did not smoke.",
      },
      activeRecall: [
        {
          type: "mcq",
          id: "t10-l9-reference-mcq",
          stem: "If non-smokers are the reference category, Exp(B) for Smoker(1) compares:",
          skillTags: ["reference-category", "exp-b"],
          options: [
            {
              id: "low-high",
              label: "Smokers with non-smokers",
              explanation: "Correct. The displayed category is compared with the reference category.",
            },
            {
              id: "high-low",
              label: "Non-smokers with smokers",
              explanation: "That reverses the comparison.",
            },
            {
              id: "low-medium",
              label: "Smokers with all mothers combined",
              explanation: "Reference category comparisons are not made against the total sample.",
            },
            {
              id: "all",
              label: "All support groups with the total sample",
              explanation: "Reference category comparisons are category-to-category.",
            },
          ],
          correctOptionId: "low-high",
          explanation: "Categorical logistic regression interpretation is always relative to the reference category.",
        },
      ],
      examDrills: [expBQuestion],
      commonMistakes: ["Forgetting to name the reference group.", "Reversing the comparison."],
    },
    {
      id: "confounding-mediation-moderation",
      title: "Confounders, Mediators, Moderators",
      levelNumber: 10,
      difficulty: "hard",
      objective: "Recognize the three common third-variable ideas at exam level.",
      plainEnglishExplanation:
        "A confounder is a third variable that can distort the exposure-outcome relationship. A mediator helps explain how an effect happens. A moderator or effect modifier changes the strength or direction of an effect.",
      visualSummary: {
        title: "Third-variable map",
        kind: "comparison",
        items: ["Confounder: alternative explanation", "Mediator: pathway", "Moderator: effect differs by subgroup"],
        takeaway: "For exam survival, match the wording to the role of the third variable.",
      },
      keyRules: [
        "Confounder: related to predictor and outcome; adjust for it.",
        "Mediator: sits on the pathway between predictor and outcome.",
        "Moderator/effect modifier: changes the relationship; often tested with interaction.",
      ],
      workedExample: {
        title: "Pre-pregnancy weight as an adjustment variable",
        scenario: "Lecture 10-3 adjusts the smoking effect for mother's pre-pregnancy weight.",
        steps: ["Add mppwgt as a covariate.", "Read the adjusted Exp(B) for smoker.", "Compare with the unadjusted odds ratio if asked."],
        answer: "The adjusted smoking odds ratio is 4.831 after accounting for mother's pre-pregnancy weight.",
      },
      activeRecall: [
        {
          type: "mcq",
          id: "t10-l10-moderator-mcq",
          stem: "Which phrase most clearly suggests a moderator/effect modifier?",
          skillTags: ["moderator", "interaction"],
          options: [
            {
              id: "explains",
              label: "The variable explains how the effect happens.",
              explanation: "That suggests mediation.",
            },
            {
              id: "distorts",
              label: "The variable is an alternative explanation for the association.",
              explanation: "That suggests confounding.",
            },
            {
              id: "differs",
              label: "The effect differs for men and women.",
              explanation: "Correct. A different effect by subgroup suggests moderation/effect modification.",
            },
            {
              id: "outcome",
              label: "The variable is the outcome.",
              explanation: "That is not a third-variable role.",
            },
          ],
          correctOptionId: "differs",
          explanation: "Moderation means the relationship changes depending on another variable.",
        },
      ],
      examDrills: [
        {
          type: "test_selection",
          id: "t10-l10-interaction-selection",
          stem: "Choose the analysis idea being described.",
          skillTags: ["interaction", "moderator"],
          scenario:
            "Researchers ask whether the effect of smoking on low birthweight is stronger for younger mothers than older mothers.",
          options: [
            {
              id: "confounder",
              label: "Confounding",
              explanation: "Confounding is about distortion by a third variable, not different effects by subgroup.",
            },
            {
              id: "mediator",
              label: "Mediation",
              explanation: "Mediation is about the pathway explaining how an effect happens.",
            },
            {
              id: "moderator",
              label: "Moderation/effect modification",
              explanation: "Correct. The effect changes by age group.",
            },
            {
              id: "normality",
              label: "Normality testing",
              explanation: "This is not about checking a distribution.",
            },
          ],
          correctOptionId: "moderator",
          explanation: "Different effect strength across subgroups points to moderation.",
        },
      ],
      commonMistakes: ["Treating every third variable as a confounder.", "Confusing mediator with moderator."],
    },
    {
      id: "classification",
      title: "Classification Metrics",
      levelNumber: 11,
      difficulty: "hard",
      objective: "Calculate sensitivity, specificity, PPV and NPV from a classification table.",
      plainEnglishExplanation:
        "A classification table compares what actually happened with what the model predicted. Sensitivity focuses on actual positives. Specificity focuses on actual negatives. PPV and NPV focus on predicted groups.",
      visualSummary: {
        title: "Classification table focus",
        kind: "table",
        items: ["Sensitivity: actual positives", "Specificity: actual negatives", "PPV: predicted positives", "NPV: predicted negatives"],
        takeaway: "Choose the denominator from the metric name.",
      },
      keyRules: [
        "Sensitivity = TP / (TP + FN).",
        "Specificity = TN / (TN + FP).",
        "PPV = TP / (TP + FP).",
        "NPV = TN / (TN + FN).",
        "Cut-off value affects predicted classifications.",
      ],
      spssSteps: binaryLogisticWorkflow,
      workedExample: {
        title: "Lecture classification table",
        scenario: "At the default cut value, the low-birth-weight classification table has TN = 15, FP = 9, FN = 5 and TP = 13.",
        steps: [
          "Overall accuracy = (15 + 13) / 42 = 66.7%.",
          "Sensitivity = 13 / (13 + 5) = 72.2%.",
          "Specificity = 15 / (15 + 9) = 62.5%.",
          "PPV = 13 / (13 + 9) = 59.1%; NPV = 15 / (15 + 5) = 75%.",
        ],
        answer: "The model is better at finding low-birth-weight cases than ruling out non-cases, but PPV is low.",
      },
      activeRecall: [classificationCalculation],
      examDrills: [
        {
          type: "calculation",
          id: "t10-l11-specificity-calc",
          stem: "The lecture classification table shows TN = 15 and FP = 9. Calculate specificity.",
          skillTags: ["specificity", "classification-table"],
          given: ["True negatives = 15", "False positives = 9"],
          formula: "Specificity = TN / (TN + FP)",
          correctAnswer: "62.5%",
          acceptedAnswers: ["62.5", "62.5%", "0.625", "0.63"],
          explanation: "Specificity = 15 / (15 + 9) = 15 / 24 = 62.5%.",
        },
      ],
      commonMistakes: ["Using predicted positives as the denominator for sensitivity.", "Mixing up false positives and false negatives."],
    },
    {
      id: "model-fit",
      title: "Model Fit",
      levelNumber: 12,
      difficulty: "hard",
      objective: "Read whole-model and goodness-of-fit output safely.",
      plainEnglishExplanation:
        "Logistic regression has several output tables. Omnibus tests whether the model improves prediction overall. Nagelkerke R2 is a rough variation-explained value. Hosmer-Lemeshow checks fit, where p above 0.05 is the reassuring result.",
      visualSummary: {
        title: "Which output table?",
        kind: "output",
        items: ["Omnibus: whole model", "Model Summary: Nagelkerke R2", "Variables: predictors", "Hosmer-Lemeshow: fit"],
        takeaway: "Do not use one table to answer every output question.",
      },
      keyRules: [
        "Omnibus table tests the whole model.",
        "Nagelkerke R2 roughly indicates variation explained.",
        "Variables in the Equation tests individual predictors.",
        "Hosmer-Lemeshow p > 0.05 suggests adequate fit.",
        "Hosmer-Lemeshow p < 0.05 suggests poor fit.",
      ],
      spssSteps: binaryLogisticWorkflow,
      workedExample: {
        title: "Lecture model-fit tables",
        scenario: "The low-birth-weight adjusted model is assessed with Omnibus, Nagelkerke R2 and Hosmer-Lemeshow.",
        steps: [
          "Omnibus chi-square = 8.573, df = 2, p = .014 means the model is better than constant-only.",
          "Nagelkerke R2 = 24.8% means about 24.8% of the outcome variation is explained.",
          "Hosmer-Lemeshow p = .519 means the model is consistent with the data.",
        ],
        answer: "Whole-model improvement is significant and Hosmer-Lemeshow does not suggest poor fit.",
      },
      activeRecall: [hosmerQuestion],
      examDrills: [
        {
          type: "table_interpretation",
          id: "t10-l12-omnibus-table",
          stem: "Which conclusion follows from this Omnibus Tests table?",
          skillTags: ["omnibus", "model-fit", "p-values"],
          table: {
            caption: "Omnibus Tests of Model Coefficients",
            columns: ["", "Chi-square", "df", "Sig."],
            rows: [["Step", "8.573", "2", "0.014"], ["Block", "8.573", "2", "0.014"], ["Model", "8.573", "2", "0.014"]],
            highlightedCells: [{ rowIndex: 2, columnIndex: 3, label: "Whole model p-value" }],
          },
          options: [
            {
              id: "whole",
              label: "The model as a whole significantly improves prediction.",
              explanation: "Correct. Omnibus tests the model as a whole.",
            },
            {
              id: "all-predictors",
              label: "Every individual predictor is significant.",
              explanation: "Omnibus does not test each predictor separately.",
            },
            {
              id: "poor-fit",
              label: "The Hosmer-Lemeshow test shows poor fit.",
              explanation: "This is not the Hosmer-Lemeshow table.",
            },
            {
              id: "or",
              label: "The odds ratio is 8.573.",
              explanation: "The chi-square value is not an odds ratio.",
            },
          ],
          correctOptionId: "whole",
          explanation: "Use Omnibus for the whole-model test. Use Variables in the Equation for individual predictors.",
        },
      ],
      commonMistakes: ["Using Omnibus to claim every predictor is significant.", "Applying the usual p < 0.05 rule incorrectly to Hosmer-Lemeshow fit."],
    },
    {
      id: "prediction-probability",
      title: "Prediction and Probability",
      levelNumber: 13,
      difficulty: "hard",
      objective: "Convert a logistic prediction into odds and probability language.",
      plainEnglishExplanation:
        "The final lecture shows that logistic regression can make predictions. First the model gives a linear predictor L. Exponentiating L gives the odds of the event. To turn odds into probability, use odds divided by one plus odds.",
      visualSummary: {
        title: "Prediction chain",
        kind: "flow",
        items: ["Linear predictor L", "exp(L) = odds", "odds / (1 + odds) = probability", "Compare with cut-off"],
        takeaway: "Logistic prediction moves from log-odds to odds to probability.",
      },
      keyRules: [
        "The linear predictor is L = B0 + B1X1 + B2X2 + ...",
        "exp(L) gives the odds of the event.",
        "Probability = odds / (1 + odds).",
        "The classification cut-off decides predicted event versus predicted non-event.",
      ],
      formulas: [
        {
          id: "odds-from-linear-predictor",
          title: "Odds From L",
          formula: "odds = exp(L)",
          meaning: "Exponentiate the linear predictor to leave the log-odds scale.",
          examUse: "Use when a question gives L and asks for odds.",
        },
        {
          id: "probability-from-odds",
          title: "Probability From Odds",
          formula: "probability = odds / (1 + odds)",
          meaning: "Turns odds into a predicted probability between 0 and 1.",
          examUse: "Use when a logistic regression question asks for predicted probability.",
        },
      ],
      spssSteps: binaryLogisticWorkflow,
      workedExample: {
        title: "Smoker weighing 110 lbs before pregnancy",
        scenario: "Lecture 10-4 predicts low birthweight for a mother who smoked and weighed 110 lbs before pregnancy.",
        steps: [
          "Use L = 3.898 + 1.575(smoker) - 0.040(mppwgt).",
          "L = 3.898 + 1.575(1) - 0.040(110) = 1.073.",
          "Odds = exp(1.073) = 2.924.",
          "Probability = 2.924 / (1 + 2.924) = 0.745.",
        ],
        answer: "The predicted probability of low birthweight is 74.5%.",
      },
      activeRecall: [
        {
          type: "mcq",
          id: "t10-l13-prediction-chain",
          stem: "A logistic model gives a linear predictor L. What do you do to get odds?",
          skillTags: ["prediction", "odds", "logistic-regression"],
          options: [
            {
              id: "mean",
              label: "Take the mean of L",
              explanation: "The lecture says to exponentiate the linear predictor.",
            },
            {
              id: "exp",
              label: "Calculate exp(L)",
              explanation: "Correct. exp(L) gives the odds.",
            },
            {
              id: "chi",
              label: "Read Pearson Chi-Square",
              explanation: "That is a crosstabs result, not logistic prediction.",
            },
            {
              id: "b",
              label: "Use B directly as the probability",
              explanation: "B/log-odds values are not probabilities.",
            },
          ],
          correctOptionId: "exp",
          explanation: "Lecture 10-4 shows the prediction chain: linear predictor -> exp(L) odds -> probability.",
        },
      ],
      examDrills: [
        {
          type: "calculation",
          id: "t10-l13-probability-calc",
          stem: "Lecture 10-4 gives odds = 2.924 for low birthweight. Calculate the predicted probability.",
          skillTags: ["prediction", "probability", "odds", "low-birthweight"],
          given: ["Odds = 2.924", "Probability = odds / (1 + odds)"],
          formula: "2.924 / (1 + 2.924)",
          correctAnswer: "74.5%",
          acceptedAnswers: ["0.745", "74.5", "74.5%"],
          explanation: "2.924 / 3.924 = 0.745 = 74.5%.",
        },
        {
          type: "fill_blank",
          id: "t10-l13-cutoff-fill",
          stem: "Complete the logistic prediction sentence.",
          skillTags: ["prediction", "classification-table", "cut-off"],
          answerBank: ["probability", "cut-off", "event", "non-event", "B", "Pearson"],
          blanks: [
            {
              id: "b1",
              correctAnswer: "probability",
              explanation: "The model prediction can be expressed as a probability.",
            },
            {
              id: "b2",
              correctAnswer: "cut-off",
              explanation: "The cut-off decides how probabilities become predicted classes.",
            },
            {
              id: "b3",
              correctAnswer: "event",
              explanation: "Above the cut-off, SPSS classifies the case as predicted event.",
            },
          ],
          fullCorrectText:
            "SPSS compares the predicted probability with the cut-off. Above the cut-off, the case is classified as the predicted event.",
        },
      ],
      commonMistakes: ["Calling log-odds a probability.", "Forgetting to convert odds to probability using odds / (1 + odds)."],
    },
  ],
};

export const topic10BinaryLogisticRegression: TopicModule = {
  ...topic10BinaryLogisticRegressionBase,
  levels: topic10BinaryLogisticRegressionBase.levels.map((level) => {
    const sourceRef = level.sourceRef ?? topic10LevelSourceRefs[level.id];
    return {
      ...level,
      sourceRef,
      activeRecall: level.activeRecall.map((question) =>
        sourceRef && !question.sourceRef ? { ...question, sourceRef } : question,
      ),
      examDrills: level.examDrills.map((question) =>
        sourceRef && !question.sourceRef ? { ...question, sourceRef } : question,
      ),
    };
  }),
};
