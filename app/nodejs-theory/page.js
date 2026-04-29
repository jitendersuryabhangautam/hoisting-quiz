"use client";

import QuestionIndexPage from "@/components/QuestionIndexPage";
import { nodejsTheoryQuestions } from "@/lib/nodejsTheoryQuestions";

const STORAGE_KEY = "nodejs-theory-seen-questions";

export default function NodejsTheoryPage() {
  return (
    <QuestionIndexPage
      themeClassName="theme-page-backend"
      background="var(--backend-background)"
      storageKey={STORAGE_KEY}
      storageScope="nodejs-theory"
      questions={nodejsTheoryQuestions}
      eyebrow="Node.js theory questions"
      title="Node.js theory interview questions"
      description="This page is for Node.js theory questions and answers."
      accentClassName="border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
      accentTextClassName="text-emerald-300"
      accentSoftClassName="border-emerald-400/30 bg-emerald-400/12 text-emerald-200"
      backButtonClassName="inline-flex items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/20"
      resetButtonClassName="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/20"
      sidebarSeenClassName="border-emerald-400/30 bg-emerald-400/12 text-emerald-100 hover:bg-emerald-400/18"
      enableSidebarSearch
      sidebarSearchPlaceholder="Search full questions or keywords..."
      sidebarShowPrompt
      enableDifficultyFilter
      enableOrderToggle
      combineAnswerExplanation
    />
  );
}
