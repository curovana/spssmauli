import { CheckCircle2, XCircle } from "lucide-react";
import type { ScoreResult } from "@/lib/scoring";

export function MistakeFeedback({ result }: { result: ScoreResult | null }) {
  if (!result) {
    return null;
  }

  const Icon = result.correct ? CheckCircle2 : XCircle;

  return (
    <div
      className={`mt-4 rounded-lg border p-4 ${
        result.correct ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"
      }`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 h-5 w-5 ${result.correct ? "text-emerald-700" : "text-amber-700"}`} aria-hidden="true" />
        <div>
          <p className={`text-sm font-semibold ${result.correct ? "text-emerald-950" : "text-amber-950"}`}>
            {result.message}
          </p>
          <div className="mt-2 grid gap-1">
            {result.details.map((detail) => (
              <p key={detail} className="text-sm leading-6 text-slate-700">
                {detail}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
