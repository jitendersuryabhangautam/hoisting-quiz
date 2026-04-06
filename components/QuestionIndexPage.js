"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { normalizeCodeBlock, shuffleQuestions } from "@/lib/javascriptContent";

function splitExplanation(text) {
  return (text ?? "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function isEditableTarget(target) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(
    target.isContentEditable ||
      target.closest("textarea, input, select, [contenteditable='true']")
  );
}

function loadSeenIds(storageKey, storageScope, validIds) {
  if (typeof window === "undefined") {
    return new Set();
  }

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return new Set();

    const parsed = JSON.parse(stored);

    if (Array.isArray(parsed)) {
      return new Set(parsed.filter((id) => validIds.has(id)));
    }

    if (
      parsed &&
      typeof parsed === "object" &&
      parsed.scope === storageScope &&
      Array.isArray(parsed.ids)
    ) {
      return new Set(parsed.ids.filter((id) => validIds.has(id)));
    }

    return new Set();
  } catch {
    return new Set();
  }
}

function buildDeck(questions, seenIds) {
  const unseen = questions.filter((question) => !seenIds.has(question.id));
  return shuffleQuestions(unseen);
}

export default function QuestionIndexPage({
  themeClassName,
  background,
  storageKey,
  storageScope,
  questions,
  eyebrow,
  title,
  description,
  accentClassName,
  accentTextClassName,
  accentSoftClassName,
  backButtonClassName,
  resetButtonClassName,
  sidebarSeenClassName,
  enableSidebarSearch = false,
  sidebarSearchPlaceholder = "Search questions or keywords...",
}) {
  const [copiedId, setCopiedId] = useState(null);
  const [seenIds, setSeenIds] = useState(() => new Set());
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const questionMap = useMemo(
    () => new Map(questions.map((question) => [question.id, question])),
    [questions]
  );
  const validIds = useMemo(
    () => new Set(questions.map((question) => question.id)),
    [questions]
  );
  const questionOrderMap = useMemo(
    () =>
      new Map(
        questions.map((question, index) => [question.id, index + 1])
      ),
    [questions]
  );

  useEffect(() => {
    const initialSeen = loadSeenIds(storageKey, storageScope, validIds);
    setSeenIds(initialSeen);
    setDeck(buildDeck(questions, initialSeen));
    setCurrentIndex(0);
    setSelectedQuestionId(null);
    setHydrated(true);
  }, [questions, storageKey, storageScope, validIds]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        scope: storageScope,
        ids: [...seenIds].filter((id) => validIds.has(id)),
      })
    );
  }, [hydrated, seenIds, storageKey, storageScope, validIds]);

  useEffect(() => {
    if (!copiedId) return undefined;

    const timer = setTimeout(() => setCopiedId(null), 1800);
    return () => clearTimeout(timer);
  }, [copiedId]);

  const markSeen = useCallback((id) => {
    setSeenIds((prev) => {
      if (prev.has(id)) return prev;

      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const copyCode = useCallback(async (code, id) => {
    try {
      await navigator.clipboard.writeText(normalizeCodeBlock(code));
      setCopiedId(id);
    } catch {
      setCopiedId(null);
    }
  }, []);

  const currentQuestion =
    selectedQuestionId && questionMap.has(selectedQuestionId)
      ? questionMap.get(selectedQuestionId)
      : deck[currentIndex] ?? null;
  const hasQuestions = hydrated && deck.length > 0;
  const progressLabel = selectedQuestionId
    ? "Selected from sidebar"
    : `${currentIndex + 1} / ${deck.length}`;
  const normalizedSidebarSearch = sidebarSearch.trim().toLowerCase();
  const filteredQuestions = useMemo(() => {
    if (!enableSidebarSearch || !normalizedSidebarSearch) {
      return questions;
    }

    return questions.filter((question) => {
      const searchableParts = [
        question.id,
        question.title,
        question.prompt,
        question.topic,
        ...(Array.isArray(question.keywords) ? question.keywords : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableParts.includes(normalizedSidebarSearch);
    });
  }, [enableSidebarSearch, normalizedSidebarSearch, questions]);

  const resetSeenQuestions = useCallback(() => {
    const empty = new Set();
    setSeenIds(empty);
    setDeck(buildDeck(questions, empty));
    setCurrentIndex(0);
    setSelectedQuestionId(null);
    setCopiedId(null);
    setSidebarOpen(false);
    window.localStorage.removeItem(storageKey);
  }, [questions, storageKey]);

  const selectQuestion = useCallback(
    (questionId) => {
      const deckIndex = deck.findIndex((question) => question.id === questionId);

      if (deckIndex >= 0) {
        setCurrentIndex(deckIndex);
        setSelectedQuestionId(null);
      } else {
        setSelectedQuestionId(questionId);
      }

      markSeen(questionId);
      setCopiedId(null);
      setSidebarOpen(false);
    },
    [deck, markSeen]
  );

  const goNext = useCallback(() => {
    if (!currentQuestion) return;

    if (selectedQuestionId && currentQuestion.id === selectedQuestionId) {
      setSelectedQuestionId(null);
      setCopiedId(null);
      return;
    }

    markSeen(currentQuestion.id);

    if (currentIndex + 1 < deck.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setDeck([]);
      setCurrentIndex(0);
    }

    setCopiedId(null);
  }, [currentIndex, currentQuestion, deck.length, markSeen, selectedQuestionId]);

  const goPrevious = useCallback(() => {
    if (selectedQuestionId) {
      setSelectedQuestionId(null);
      setCopiedId(null);
      return;
    }

    if (!hasQuestions) return;

    setCurrentIndex((currentIndex - 1 + deck.length) % deck.length);
    setCopiedId(null);
  }, [currentIndex, deck.length, hasQuestions, selectedQuestionId]);

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

      if (event.key === "Escape") {
        setSidebarOpen(false);
        return;
      }

      if (sidebarOpen || !hasQuestions) {
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
  }, [goNext, goPrevious, hasQuestions, sidebarOpen]);

  useEffect(() => {
    if (!sidebarOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [sidebarOpen]);

  const sidebar = (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur sm:rounded-[2rem] sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className={`text-xs uppercase tracking-[0.28em] ${accentTextClassName}`}>
            Question index
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Seen questions turn green.
          </p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${accentSoftClassName}`}>
          {filteredQuestions.length}
          {enableSidebarSearch && normalizedSidebarSearch ? ` / ${questions.length}` : ""} total
        </span>
      </div>

      {enableSidebarSearch ? (
        <div className="mt-4">
          <label htmlFor="sidebar-search" className="sr-only">
            Search questions
          </label>
          <input
            id="sidebar-search"
            type="search"
            value={sidebarSearch}
            onChange={(event) => setSidebarSearch(event.target.value)}
            placeholder={sidebarSearchPlaceholder}
            className="w-full rounded-xl border border-white/15 bg-slate-950/55 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-white/35 focus:ring-2 focus:ring-white/20"
          />
        </div>
      ) : null}

      <nav className="mt-4 max-h-[65vh] space-y-2 overflow-y-auto pr-1 smooth-scroll lg:max-h-[70vh]">
        {filteredQuestions.map((question) => {
          const isSeen = seenIds.has(question.id);
          const isActive = currentQuestion?.id === question.id;
          const displayIndex = questionOrderMap.get(question.id) ?? "-";

          return (
            <button
              key={question.id}
              type="button"
              onClick={() => selectQuestion(question.id)}
              className={[
                "block w-full rounded-xl border px-3 py-3 text-left transition sm:rounded-2xl",
                isSeen
                  ? sidebarSeenClassName
                  : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10",
                isActive ? "ring-2 ring-white/20" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                Question {displayIndex}
              </p>
              <p className="mt-2 text-sm font-semibold leading-5">
                {question.title}
              </p>
            </button>
          );
        })}
        {filteredQuestions.length === 0 ? (
          <p className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-300">
            No matching questions.
          </p>
        ) : null}
      </nav>
    </div>
  );

  return (
    <main
      className={`${themeClassName} min-h-screen w-full overflow-x-hidden text-slate-100`}
      style={{ background }}
    >
      <div className="mx-auto w-full max-w-[96rem] px-3 pb-24 pt-4 sm:px-4 sm:py-6 sm:pb-6 lg:px-5">
        <header className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4 shadow-2xl backdrop-blur sm:rounded-[2rem] sm:py-5 md:px-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className={`text-xs uppercase tracking-[0.35em] ${accentTextClassName}`}>
                {eyebrow}
              </p>
              <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                {title}
              </h1>
              <p className="mt-3 hidden max-w-3xl text-sm leading-6 text-slate-300 sm:block sm:text-base">
                {description}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:w-auto">
              <Link
                href="/"
                className={`${backButtonClassName} w-full justify-center sm:w-auto`}
              >
                Back to menu
              </Link>
            </div>
          </div>
        </header>

        <div className="mt-4 flex flex-col gap-2 text-sm text-slate-300 sm:mt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <span className={`rounded-full border px-3 py-1 font-semibold ${accentClassName}`}>
            {seenIds.size}/{questions.length} seen
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 sm:hidden">
            {progressLabel}
          </span>
          <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 sm:inline-flex">
            Shuffled once, no repeats until reset
          </span>
        </div>

        {sidebarOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              aria-label="Close questions menu"
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative z-10 h-full w-[min(24rem,88vw)] overflow-y-auto border-r border-white/10 bg-[#081122] p-3 shadow-2xl sm:p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className={`text-xs uppercase tracking-[0.28em] ${accentTextClassName}`}>
                  Questions
                </p>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className={resetButtonClassName}
                >
                  Close
                </button>
              </div>
              {sidebar}
            </div>
          </div>
        ) : null}

        <div className="mt-6 grid gap-6 lg:grid-cols-[22rem_minmax(0,1fr)]">
          <aside className="hidden lg:sticky lg:top-5 lg:block lg:self-start">
            {sidebar}
          </aside>

          <section className="min-w-0 overflow-x-hidden rounded-[1.5rem] border border-white/10 bg-white/6 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:rounded-[2rem] sm:p-5">
            {!hydrated ? (
              <p className="text-sm leading-6 text-slate-300">
                Loading questions...
              </p>
            ) : !hasQuestions && !selectedQuestionId ? (
              <div className="space-y-4">
                <p className="text-sm leading-6 text-slate-300">
                  You have seen every question in this page.
                </p>
                <button
                  type="button"
                  onClick={resetSeenQuestions}
                  className={resetButtonClassName}
                >
                  Reset seen questions
                </button>
              </div>
            ) : currentQuestion ? (
              <>
                <div className="relative flex min-w-0 flex-wrap items-start justify-between gap-3 pr-12 sm:pr-0">
                  <div className="min-w-0">
                    <p className={`text-xs uppercase tracking-[0.28em] ${accentTextClassName}`}>
                      {currentQuestion.topic}
                    </p>
                    <h2 className="mt-3 text-xl font-bold text-white break-words sm:text-2xl">
                      {currentQuestion.title}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open questions menu"
                    className={`${resetButtonClassName} absolute right-0 top-0 lg:hidden`}
                  >
                    <span className="inline-flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <p className="hidden text-sm text-slate-300 sm:block">{progressLabel}</p>
                </div>

                <p
                  className="mt-3 text-sm leading-6 text-slate-300 break-words"
                  style={{ overflowWrap: "anywhere" }}
                >
                  {currentQuestion.prompt}
                </p>
                <p
                  className="mt-4 text-sm leading-6 text-slate-300 break-words"
                  style={{ overflowWrap: "anywhere" }}
                >
                  <span className="font-semibold text-white">Answer: </span>
                  {currentQuestion.expected}
                </p>
                <div className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
                  {splitExplanation(currentQuestion.explanation).map((line, index) => (
                    <p
                      key={`${currentQuestion.id}-explanation-${index}`}
                      className="break-words"
                      style={{ overflowWrap: "anywhere" }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
                {currentQuestion.code ? (
                  <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/60 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                        Program
                      </p>
                      <button
                        type="button"
                        onClick={() => copyCode(currentQuestion.code, currentQuestion.id)}
                        className={resetButtonClassName}
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

                <div className="mt-6 hidden gap-3 sm:flex sm:flex-wrap">
                  <button
                    type="button"
                    onClick={goPrevious}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={resetSeenQuestions}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                  >
                    Reset seen questions
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className={resetButtonClassName}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : null}
          </section>
        </div>
      </div>
      {hydrated && (hasQuestions || selectedQuestionId) ? (
        <div
          className="fixed inset-x-0 bottom-0 z-30 border-t p-3 backdrop-blur lg:hidden"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--surface-strong) 92%, transparent)",
          }}
        >
          <div className="mx-auto grid w-full max-w-[96rem] grid-cols-3 gap-2">
            <button
              type="button"
              onClick={goPrevious}
              className="rounded-full border px-3 py-2 text-sm font-semibold transition"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface-muted)",
                color: "var(--foreground)",
              }}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={resetSeenQuestions}
              className={resetButtonClassName}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={goNext}
              className={resetButtonClassName}
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
