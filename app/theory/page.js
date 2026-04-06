"use client";

import QuestionIndexPage from "@/components/QuestionIndexPage";
import { conceptQuestions } from "@/lib/conceptQuestions";

const STORAGE_KEY = "theory-seen-questions";

export default function TheoryPage() {
  return (
    <QuestionIndexPage
      themeClassName="theme-page-theory"
      background="var(--theory-background)"
      storageKey={STORAGE_KEY}
      storageScope="theory"
      questions={conceptQuestions}
      eyebrow="Theory questions"
      title="JavaScript concept questions and answers"
      description="This page shows all theory/concept questions separately from the practice decks."
      accentClassName="border-amber-400/20 bg-amber-400/10 text-amber-100"
      accentTextClassName="text-amber-300"
      accentSoftClassName="border-emerald-400/30 bg-emerald-400/12 text-emerald-200"
      backButtonClassName="inline-flex items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-400/20"
      resetButtonClassName="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-400/20"
      sidebarSeenClassName="border-emerald-400/30 bg-emerald-400/12 text-emerald-100 hover:bg-emerald-400/18"
      enableSidebarSearch
      sidebarSearchPlaceholder="Search full questions or keywords..."
    />
  );
}
