"use client";

import QuestionIndexPage from "@/components/QuestionIndexPage";
import { backendQuestions } from "@/lib/backendQuestions";

const STORAGE_KEY = "backend-seen-questions";

export default function BackendPage() {
  return (
    <QuestionIndexPage
      themeClassName="theme-page-backend"
      background="var(--backend-background)"
      storageKey={STORAGE_KEY}
      storageScope="backend"
      questions={backendQuestions}
      eyebrow="Backend theory questions"
      title="Backend theory interview questions"
      description="This page focuses on Go, PostgreSQL, and backend fundamentals."
      accentClassName="border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
      accentTextClassName="text-emerald-300"
      accentSoftClassName="border-emerald-400/30 bg-emerald-400/12 text-emerald-200"
      backButtonClassName="inline-flex items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/20"
      resetButtonClassName="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/20"
      sidebarSeenClassName="border-emerald-400/30 bg-emerald-400/12 text-emerald-100 hover:bg-emerald-400/18"
      enableSidebarSearch
      sidebarSearchPlaceholder="Search full questions or keywords..."
      sidebarShowPrompt
    />
  );
}
