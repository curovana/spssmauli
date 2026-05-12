import Link from "next/link";
import { BarChart3, BookOpen, ClipboardCheck, Home, Route, Workflow } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/topics/topic-01-measurement-descriptives", label: "Start", icon: Route },
  { href: "/practice", label: "Practice", icon: ClipboardCheck },
  { href: "/mock-exam", label: "Mock exam", icon: BarChart3 },
  { href: "/spss-guide", label: "SPSS", icon: Workflow },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">StatsDrill AI</p>
              <p className="truncate text-xs text-slate-500">2-day statistics/SPSS rescue</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white md:hidden">
        <div className="grid grid-cols-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-[11px] font-medium text-slate-600"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="max-w-full truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
