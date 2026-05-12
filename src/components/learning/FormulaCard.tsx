import type { FormulaCard as FormulaCardType } from "@/types/learning";

export function FormulaCard({ formula }: { formula: FormulaCardType }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-slate-950">{formula.title}</p>
      <div className="mt-3 rounded-lg bg-slate-950 px-4 py-3 font-mono text-sm font-semibold text-white">
        {formula.formula}
      </div>
      <p className="mt-3 text-sm text-slate-600">{formula.meaning}</p>
      <p className="mt-2 text-sm font-medium text-indigo-700">{formula.examUse}</p>
    </article>
  );
}
