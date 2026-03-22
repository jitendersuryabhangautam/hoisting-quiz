"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { conceptQuestions } from "@/lib/conceptQuestions";
import { normalizeCodeBlock } from "@/lib/javascriptContent";

function isEditableTarget(target) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(
    target.isContentEditable ||
      target.closest("textarea, input, select, [contenteditable='true']")
  );
}

export default function TheoryPage() {
  const [copiedId, setCopiedId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!copiedId) return undefined;

    const timer = setTimeout(() => setCopiedId(null), 1800);
    return () => clearTimeout(timer);
  }, [copiedId]);

  const copyCode = async (code, id) => {
    try {
      await navigator.clipboard.writeText(normalizeCodeBlock(code));
      setCopiedId(id);
    } catch {
      setCopiedId(null);
    }
  };

  const currentQuestion = conceptQuestions[currentIndex] ?? conceptQuestions[0];

  const goNext = () => {
    setCurrentIndex((index) => (index + 1) % conceptQuestions.length);
    setCopiedId(null);
  };

  const goPrevious = () => {
    setCurrentIndex((index) =>
      (index - 1 + conceptQuestions.length) % conceptQuestions.length
    );
    setCopiedId(null);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        isEditableTarget(event.target)
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrevious]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.14),_transparent_28%),linear-gradient(180deg,_#140f08_0%,_#0e1220_55%,_#050816_100%)] text-slate-100">
      <div className="mx-auto w-full max-w-[96rem] px-3 py-6 sm:px-4 lg:px-5">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 px-4 py-5 shadow-2xl backdrop-blur md:px-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-300">
                Theory questions
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                JavaScript concept questions and answers
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                This page shows all theory/concept questions separately from the
                practice decks.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-400/20"
            >
              Back to menu
            </Link>
          </div>
        </header>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 font-semibold text-amber-100">
            {conceptQuestions.length} theory questions
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            Separate from output and implementation practice
          </span>
        </div>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-amber-300">
                {currentQuestion.topic}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">
                {currentQuestion.title}
              </h2>
            </div>

            <p className="text-sm text-slate-300">
              {currentIndex + 1} / {conceptQuestions.length}
            </p>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            {currentQuestion.prompt}
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            <span className="font-semibold text-white">Answer: </span>
            {currentQuestion.expected}
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            {currentQuestion.explanation}
          </p>
          {currentQuestion.code ? (
            <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Program
                </p>
                <button
                  type="button"
                  onClick={() => copyCode(currentQuestion.code, currentQuestion.id)}
                  className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-100 transition hover:bg-amber-400/20"
                >
                  {copiedId === currentQuestion.id ? "Copied" : "Copy code"}
                </button>
              </div>
              <pre className="mt-3 overflow-x-auto whitespace-pre font-mono text-sm leading-6 text-slate-200">
                {normalizeCodeBlock(currentQuestion.code)}
              </pre>
            </div>
          ) : null}
          {currentQuestion.keywords?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {currentQuestion.keywords.map((keyword) => (
                <span
                  key={`${currentQuestion.id}-${keyword}`}
                  className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200"
                >
                  {keyword}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={goPrevious}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={goNext}
              className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-400/20"
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
