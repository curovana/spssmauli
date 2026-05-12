# StatsDrill AI

StatsDrill AI is a focused 2-day exam rescue app for King's College London MSc Affective Disorders students revising Introduction to Statistics and SPSS.

The MVP ships with a preloaded PDF-derived course:

- Topic 1: Measurement and Descriptives
- Topic 2: Confidence and Significance I
- Topic 3: Hypothesis Testing
- Topic 4: Comparing Groups I
- Topic 5: Comparing Groups II
- Topic 6: Correlation and Linear Regression
- Topic 7: Multiple Linear Regression
- Topic 8: Mediation
- Topic 9: Interaction and Outliers
- Topic 10: Binary Logistic Regression
- SPSS workflow cards
- MCQ, calculation, output interpretation, fill-blank and drag/drop style drills
- localStorage progress and weak-area tracking
- mixed practice and timed mock exam pages

## Run

```bash
pnpm install
pnpm dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Build Checks

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Content Workflow

Topic content lives in `src/content/topics/`. The current structured course was created from the shared Google Drive PDFs and distilled into static TypeScript modules.

When adding a PDF-backed topic:

1. Extract the lecture's concepts, formulas, SPSS paths, output tables, worked examples and traps.
2. Create a new typed `TopicModule`.
3. Add the module to `src/content/topics/index.ts`.
4. Keep source PDF names and slide ranges in the topic data where useful.
5. Do not add student PDF upload, auth, database or generic chat for the MVP.
