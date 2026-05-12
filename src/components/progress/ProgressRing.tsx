export function ProgressRing({ percent, label }: { percent: number; label: string }) {
  const safePercent = Math.min(100, Math.max(0, percent));
  const background = `conic-gradient(#4f46e5 ${safePercent * 3.6}deg, #e2e8f0 0deg)`;

  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
        style={{ background }}
        aria-label={`${label}: ${safePercent}%`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-900">
          {safePercent}%
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="text-xs text-slate-500">Levels completed</p>
      </div>
    </div>
  );
}
