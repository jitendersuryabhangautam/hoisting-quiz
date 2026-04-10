"use client";

import QuestionIndexPage from "@/components/QuestionIndexPage";
import { dbQuestions } from "@/lib/dbQuestions";

const STORAGE_KEY = "db-theory-seen-questions";

export default function DatabaseTheoryPage() {
  return (
    <QuestionIndexPage
      themeClassName="theme-page-backend"
      background="var(--backend-background)"
      storageKey={STORAGE_KEY}
      storageScope="db-theory"
      questions={dbQuestions}
      eyebrow="Database theory questions"
      title="Database concept questions and answers"
      description="This page focuses on database theory, PostgreSQL fundamentals, distributed data concepts, and architecture trade-offs."
      accentClassName="border-green-400/20 bg-green-400/10 text-green-100"
      accentTextClassName="text-green-300"
      accentSoftClassName="border-emerald-400/30 bg-emerald-400/12 text-emerald-200"
      backButtonClassName="inline-flex items-center justify-center rounded-full border border-green-400/40 bg-green-400/10 px-4 py-2 text-sm font-semibold text-green-100 transition hover:bg-green-400/20"
      resetButtonClassName="rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-sm font-semibold text-green-100 transition hover:bg-green-400/20"
      sidebarSeenClassName="border-emerald-400/30 bg-emerald-400/12 text-emerald-100 hover:bg-emerald-400/18"
      enableSidebarSearch
      sidebarSearchPlaceholder="Search database theory questions or keywords..."
      sidebarShowPrompt
      combineAnswerExplanation
    />
  );
}
