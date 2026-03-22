"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import {
  isAnswerCorrect,
  normalizeCodeBlock,
  seededShuffleQuestions,
} from "@/lib/javascriptContent";

function createBlankState(length) {
  return new Array(length).fill("");
}

function createFlagState(length) {
  return new Array(length).fill(false);
}

function progressValue(done, total) {
  if (total === 0) return 0;
  return Math.round((done / total) * 100);
}

export default function PracticeMode({
  title,
  eyebrow,
  description,
  questions,
  feedbackMode = "inline",
  sidebarMode = "help",
  storageKey,
}) {
  const [storedAttempted, setStoredAttempted] = useState(() => new Set());
  const [attempted, setAttempted] = useState(() => new Set());
  const [attemptedHydrated, setAttemptedHydrated] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [sidebarTab, setSidebarTab] = useState(
    sidebarMode === "answers" ? "answers" : "help"
  );
  const [reviewQuestionId, setReviewQuestionId] = useState(null);

  const deck = useMemo(() => {
    const available = questions.filter((q) => !storedAttempted.has(q.id));
    return seededShuffleQuestions(available, shuffleSeed);
  }, [questions, storedAttempted, shuffleSeed]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState(() => createBlankState(questions.length));
  const [checked, setChecked] = useState(() => createFlagState(questions.length));
  const [revealed, setRevealed] = useState(() => createFlagState(questions.length));

  useEffect(() => {
    const stored = localStorage.getItem(`attempted-${storageKey}`);
    if (!stored) {
      setAttemptedHydrated(true);
      return;
    }

    try {
      const parsed = new Set(JSON.parse(stored));
      setStoredAttempted(parsed);
      setAttempted(parsed);
    } catch {
      setStoredAttempted(new Set());
      setAttempted(new Set());
    }

    setAttemptedHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    setShuffleSeed(Date.now());
  }, []);

  useEffect(() => {
    if (!attemptedHydrated) {
      return;
    }
    localStorage.setItem(`attempted-${storageKey}`, JSON.stringify([...attempted]));
  }, [attempted, storageKey, attemptedHydrated]);

  useEffect(() => {
    setAnswers(createBlankState(deck.length));
    setChecked(createFlagState(deck.length));
    setRevealed(createFlagState(deck.length));
    setCurrentIdx(0);
  }, [deck]);

  const currentQuestion = deck[currentIdx];
  const reviewQuestion = reviewQuestionId
    ? questions.find((question) => question.id === reviewQuestionId) ?? null
    : null;
  const displayQuestion = reviewQuestion ?? currentQuestion;
  const currentAnswer = answers[currentIdx];
  const isChecked = checked[currentIdx];
  const isRevealed = revealed[currentIdx];
  const reviewedCount =
    checked.filter(Boolean).length + revealed.filter(Boolean).length;
  const attemptedIds = new Set([
    ...storedAttempted,
    ...attempted,
  ]);
  const attemptedQuestions = questions.filter((question) =>
    attemptedIds.has(question.id)
  );
  const isReviewingAttempted = Boolean(reviewQuestion);
  const currentReviewIndex = reviewQuestion
    ? attemptedQuestions.findIndex((question) => question.id === reviewQuestion.id)
    : -1;

  const resetSession = () => {
    setShuffleSeed((prev) => prev + 1);
  };

  const resetAttempted = () => {
    const emptySet = new Set();
    setStoredAttempted(emptySet);
    setAttempted(new Set());
    localStorage.removeItem(`attempted-${storageKey}`);
    setShuffleSeed((prev) => prev + 1);
    setReviewQuestionId(null);
  };

  const goNextReviewedQuestion = () => {
    if (!attemptedQuestions.length) return;

    const nextIndex =
      currentReviewIndex >= 0
        ? (currentReviewIndex + 1) % attemptedQuestions.length
        : 0;
    setSidebarTab("attempted");
    setReviewQuestionId(attemptedQuestions[nextIndex].id);
  };

  const goPreviousReviewedQuestion = () => {
    if (!attemptedQuestions.length) return;

    const previousIndex =
      currentReviewIndex >= 0
        ? (currentReviewIndex - 1 + attemptedQuestions.length) %
          attemptedQuestions.length
        : attemptedQuestions.length - 1;
    setSidebarTab("attempted");
    setReviewQuestionId(attemptedQuestions[previousIndex].id);
  };

  const updateAnswer = (value) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIdx] = value;
      return next;
    });
  };

  const handleCodeEditorKeyDown = (event) => {
    if (currentQuestion?.type !== "implementation") return;

    const textarea = event.currentTarget;
    const { selectionStart, selectionEnd, value } = textarea;
    const pairs = {
      "(": ")",
      "{": "}",
      "[": "]",
      '"': '"',
      "'": "'",
    };

    if (event.key === "Tab") {
      event.preventDefault();
      const indent = "  ";
      const nextValue =
        value.slice(0, selectionStart) + indent + value.slice(selectionEnd);
      updateAnswer(nextValue);
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd =
          selectionStart + indent.length;
      });
      return;
    }

    if (Object.prototype.hasOwnProperty.call(pairs, event.key)) {
      event.preventDefault();
      const closer = pairs[event.key];
      const selectedText = value.slice(selectionStart, selectionEnd);
      const nextValue = selectedText
        ? value.slice(0, selectionStart) +
          event.key +
          selectedText +
          closer +
          value.slice(selectionEnd)
        : value.slice(0, selectionStart) +
          event.key +
          closer +
          value.slice(selectionEnd);
      updateAnswer(nextValue);
      requestAnimationFrame(() => {
        const cursorPos = selectedText
          ? selectionStart + selectedText.length + 1
          : selectionStart + 1;
        textarea.selectionStart = textarea.selectionEnd = cursorPos;
      });
      return;
    }

    if (event.key === "Backspace" && selectionStart === selectionEnd) {
      const prevChar = value[selectionStart - 1];
      const nextChar = value[selectionStart];
      if (
        prevChar &&
        nextChar &&
        ((prevChar === "(" && nextChar === ")") ||
          (prevChar === "{" && nextChar === "}") ||
          (prevChar === "[" && nextChar === "]") ||
          (prevChar === '"' && nextChar === '"') ||
          (prevChar === "'" && nextChar === "'"))
      ) {
        event.preventDefault();
        const nextValue =
          value.slice(0, selectionStart - 1) + value.slice(selectionStart + 1);
        updateAnswer(nextValue);
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = selectionStart - 1;
        });
      }
      return;
    }

    if (
      (event.key === ")" ||
        event.key === "}" ||
        event.key === "]" ||
        event.key === '"' ||
        event.key === "'") &&
      selectionStart === selectionEnd &&
      value[selectionStart] === event.key
    ) {
      event.preventDefault();
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
      });
    }

    if (event.key === "Enter") {
      const beforeCursor = value.slice(0, selectionStart);
      const currentLine = beforeCursor.split("\n").pop() ?? "";
      const indent = currentLine.match(/^\s*/)?.[0] ?? "";
      if (!indent) return;

      event.preventDefault();
      const insert = `\n${indent}`;
      const nextValue =
        value.slice(0, selectionStart) + insert + value.slice(selectionEnd);
      updateAnswer(nextValue);
      requestAnimationFrame(() => {
        const nextPos = selectionStart + insert.length;
        textarea.selectionStart = textarea.selectionEnd = nextPos;
      });
    }
  };

  const markChecked = () => {
    setChecked((prev) => {
      const next = [...prev];
      next[currentIdx] = true;
      return next;
    });
    setRevealed((prev) => {
      const next = [...prev];
      next[currentIdx] = false;
      return next;
    });
    setAttempted((prev) => {
      const next = new Set(prev);
      next.add(deck[currentIdx].id);
      return next;
    });
  };

  const markRevealed = () => {
    setRevealed((prev) => {
      const next = [...prev];
      next[currentIdx] = true;
      return next;
    });
    setChecked((prev) => {
      const next = [...prev];
      next[currentIdx] = false;
      return next;
    });
    setAttempted((prev) => {
      const next = new Set(prev);
      next.add(deck[currentIdx].id);
      return next;
    });
  };

  const goNext = () => {
    setCurrentIdx((idx) => {
      if (idx + 1 < deck.length) return idx + 1;
      alert(
        "You have reached the end of this shuffled deck. Shuffle again to get a new order."
      );
      return idx;
    });
  };

  const goPrev = () => {
    setCurrentIdx((idx) => {
      if (idx - 1 >= 0) return idx - 1;
      alert("This is the first question in the deck.");
      return idx;
    });
  };

  const resetCurrentAnswer = () => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIdx] = "";
      return next;
    });
    setChecked((prev) => {
      const next = [...prev];
      next[currentIdx] = false;
      return next;
    });
    setRevealed((prev) => {
      const next = [...prev];
      next[currentIdx] = false;
      return next;
    });
  };

  const questionIsCorrect =
    currentQuestion &&
    currentQuestion.type !== "implementation" &&
    isAnswerCorrect(currentQuestion, currentAnswer);

  const answerLabel =
    currentQuestion?.type === "implementation"
      ? "Your draft solution"
      : "Your answer";

  const placeholder =
    currentQuestion?.type === "implementation"
      ? "Write code, an algorithm outline, or your first pass here."
      : 'Example: "undefined", "ReferenceError", or "3\\n3\\n3"';

  const actionLabel =
    currentQuestion?.type === "implementation"
      ? "SHOW REFERENCE"
      : "CHECK ANSWER";

  const actionHandler =
    currentQuestion?.type === "implementation" ? markRevealed : markChecked;

  const secondaryActionLabel =
    currentQuestion?.type === "output" ? "REVEAL ANSWER" : null;

  const secondaryActionHandler =
    currentQuestion?.type === "output" ? markRevealed : null;

  const showFeedback = isChecked || isRevealed;
  const useOverlayFeedback = feedbackMode === "overlay";
  const useSidebarAnswers = sidebarMode === "answers";
  const verdictLabel =
    currentQuestion?.type === "implementation"
      ? "Reference solution"
      : isChecked
        ? questionIsCorrect
          ? "Correct"
          : "Wrong answer"
        : "Reveal mode";
  const sidebarTabs = useSidebarAnswers
    ? [
        { id: "answers", label: "Answer" },
        { id: "attempted", label: "Attempted" },
      ]
    : [
        { id: "help", label: "Help" },
        { id: "attempted", label: "Attempted" },
      ];

  useEffect(() => {
    setSidebarTab(sidebarMode === "answers" ? "answers" : "help");
  }, [sidebarMode]);

  useEffect(() => {
    if (reviewQuestion) {
      setSidebarTab("answers");
    }
  }, [reviewQuestion]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_30%),linear-gradient(180deg,#07111f_0%,#0b1324_45%,#050816_100%)] text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        {deck.length === 0 && !reviewQuestion ? (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="flex flex-col items-center justify-center min-h-[60vh] rounded-4xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
              <h1 className="text-3xl font-black text-white mb-4">
                All Questions Attempted
              </h1>
              <p className="text-slate-300 mb-8 max-w-md">
                You&apos;ve attempted all questions in this category. Click
                &quot;Reset attempted&quot; to start over with all questions.
              </p>
              <button
                onClick={resetAttempted}
                className="rounded-full bg-linear-r from-rose-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:brightness-110"
              >
                Reset Attempted Questions
              </button>
            </div>

            <aside className="rounded-4xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">
                Attempted questions
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {attemptedQuestions.length
                  ? `${attemptedQuestions.length} question${attemptedQuestions.length === 1 ? "" : "s"} saved in this browser.`
                  : "No attempted questions saved yet."}
              </p>

              <div className="mt-4 space-y-3">
                {attemptedQuestions.length ? (
                  attemptedQuestions.map((question) => (
                    <button
                      key={question.id}
                      onClick={() => setReviewQuestionId(question.id)}
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-left transition hover:border-cyan-400/30 hover:bg-slate-950/80"
                    >
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                        {question.topic}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {question.title}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        {question.prompt}
                      </p>
                      {question.code || question.starter ? (
                        <pre className="mt-3 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-xs leading-5 text-slate-200">
                          {normalizeCodeBlock(
                            question.code ?? question.starter ?? ""
                          )}
                        </pre>
                      ) : null}
                      <p className="mt-2 text-xs leading-5 text-slate-400">
                        {question.type === "output"
                          ? "Output question"
                          : question.type === "implementation"
                            ? "Implementation question"
                            : "Concept question"}
                      </p>
                    </button>
                  ))
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm leading-6 text-slate-300">
                    Questions you check or reveal will appear here for later
                    review.
                  </div>
                )}
              </div>
            </aside>
          </div>
        ) : (
          <>
            <header className="mb-8 rounded-4xl border border-white/10 bg-white/5 px-5 py-4 shadow-2xl backdrop-blur md:px-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
                    {eyebrow}
                  </p>
                  <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                    {title}
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                    {description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                  >
                    Back to menu
                  </Link>
                  <button
                    onClick={resetSession}
                    className="inline-flex items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-400/20"
                  >
                    Shuffle deck
                  </button>
                  <button
                    onClick={resetAttempted}
                    className="inline-flex items-center justify-center rounded-full border border-rose-400/40 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-400/20"
                  >
                    Reset attempted
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Focus
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {title}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Deck progress
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {reviewedCount} reviewed out of {deck.length}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Order
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {currentIdx + 1} / {deck.length} in this shuffle
                  </p>
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-900">
                <div
                  className="h-full rounded-full bg-linear-r from-cyan-400 via-sky-400 to-amber-300 transition-all duration-500"
                  style={{
                    width: `${progressValue(reviewedCount, deck.length)}%`,
                  }}
                />
              </div>
            </header>

            <section className="grid gap-6 lg:grid-cols-[1.45fr_0.85fr]">
              <article className="overflow-hidden rounded-4xl border border-white/10 bg-white/6 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                <div className="border-b border-white/10 bg-slate-950/50 px-5 py-4 sm:px-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
                        {displayQuestion.topic}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200">
                        {displayQuestion.type}
                      </span>
                    </div>
                    <span className="text-sm text-slate-400">
                      Question {currentIdx + 1} of {deck.length}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-white">
                    {displayQuestion.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {displayQuestion.prompt}
                  </p>
                </div>

                <div className="space-y-6 px-5 py-5 sm:px-6">
                  {displayQuestion.code ? (
                    <div>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                        Code
                      </p>
                      <pre className="overflow-x-auto rounded-3xl border border-white/10 bg-[#09111f] p-4 text-sm leading-6 text-slate-200">
                        {normalizeCodeBlock(displayQuestion.code)}
                      </pre>
                    </div>
                  ) : null}

                  {displayQuestion.starter ? (
                    <div>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                        Starter
                      </p>
                      <pre className="overflow-x-auto rounded-3xl border border-amber-400/15 bg-amber-400/5 p-4 text-sm leading-6 text-amber-50">
                        {normalizeCodeBlock(displayQuestion.starter)}
                      </pre>
                    </div>
                  ) : null}

                  {isReviewingAttempted ? (
                    <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                          Attempted review
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={goNextReviewedQuestion}
                            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                          >
                            Next attempted
                          </button>
                          <button
                            onClick={goPreviousReviewedQuestion}
                            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                          >
                            Previous attempted
                          </button>
                          <button
                            onClick={() => setReviewQuestionId(null)}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-100 transition hover:bg-white/10"
                          >
                            Back to practice
                          </button>
                        </div>
                      </div>
                      <p className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-400">
                        {reviewQuestion ? `${currentReviewIndex + 1} / ${attemptedQuestions.length}` : ""}
                      </p>
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-200">
                        {displayQuestion.expected}
                      </p>
                      <p className="mt-4 text-sm leading-6 text-slate-300">
                        {displayQuestion.explanation}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="mb-3 block text-sm font-semibold text-slate-100">
                          {answerLabel}
                        </label>
                        <textarea
                          value={currentAnswer}
                          onChange={(event) => updateAnswer(event.target.value)}
                          onKeyDown={handleCodeEditorKeyDown}
                          className="min-h-32 w-full rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-3 font-mono text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                          placeholder={placeholder}
                          spellCheck={false}
                          autoCapitalize="off"
                          autoComplete="off"
                          autoCorrect="off"
                        />
                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400">
                          {displayQuestion.type === "output" ? (
                            <span>
                              For multiline output, separate lines with Enter.
                            </span>
                          ) : null}
                          {displayQuestion.type === "implementation" ? (
                            <span>
                              Compare your approach with the reference
                              solution.
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={actionHandler}
                          className="rounded-full bg-linear-r from-cyan-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
                        >
                          {actionLabel}
                        </button>
                        {secondaryActionLabel ? (
                          <button
                            onClick={secondaryActionHandler}
                            className="rounded-full border border-amber-400/25 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-400/20"
                          >
                            {secondaryActionLabel}
                          </button>
                        ) : null}
                        <button
                          onClick={goNext}
                          className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                        >
                          Next question
                        </button>
                        <button
                          onClick={goPrev}
                          className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                        >
                          Previous
                        </button>
                        <button
                          onClick={resetCurrentAnswer}
                          className="rounded-full border border-rose-400/20 bg-rose-400/10 px-5 py-3 text-sm font-semibold text-rose-100 transition hover:bg-rose-400/20"
                        >
                          Clear current
                        </button>
                      </div>
                    </>
                  )}

                  {showFeedback && !useOverlayFeedback && !useSidebarAnswers ? (
                    <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
                      {currentQuestion.type === "implementation" ? (
                        <>
                          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                            Reference solution
                          </p>
                          <pre className="mt-3 overflow-x-auto rounded-2xl border border-amber-400/10 bg-amber-400/5 p-4 text-sm leading-6 text-amber-50">
                            {normalizeCodeBlock(
                              currentQuestion.referenceSolution
                            )}
                          </pre>
                          {currentQuestion.hint ? (
                            <p className="mt-4 text-sm text-slate-300">
                              <span className="font-semibold text-slate-100">
                                Hint:{" "}
                              </span>
                              {currentQuestion.hint}
                            </p>
                          ) : null}
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                            {isChecked
                              ? questionIsCorrect
                                ? "Correct"
                                : "Review this answer"
                              : "Reveal mode"}
                          </p>
                          <p className="mt-3 text-base font-semibold text-white">
                            Expected answer:
                          </p>
                          <p className="mt-1 whitespace-pre-wrap rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4 text-sm leading-6 text-cyan-50">
                            {currentQuestion.expected}
                          </p>
                          <p className="mt-4 text-sm leading-6 text-slate-300">
                            {currentQuestion.explanation}
                          </p>
                        </>
                      )}
                    </div>
                  ) : null}

                  {!useOverlayFeedback &&
                  !useSidebarAnswers &&
                  currentQuestion.type !== "implementation" &&
                  isChecked ? (
                    <div
                      className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                        questionIsCorrect
                          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
                          : "border-rose-400/20 bg-rose-400/10 text-rose-100"
                      }`}
                    >
                      {questionIsCorrect
                        ? "Correct. Your answer matches the expected result."
                        : "Not quite. Use the explanation below to understand the rule."}
                    </div>
                  ) : null}

                  {showFeedback && useOverlayFeedback && !useSidebarAnswers ? (
                    <div
                      className={`fixed bottom-4 left-1/2 z-50 w-[min(92vw,760px)] -translate-x-1/2 rounded-3xl border px-4 py-4 shadow-2xl backdrop-blur ${
                        currentQuestion.type === "implementation"
                          ? "border-amber-400/20 bg-slate-950/95"
                          : isChecked && questionIsCorrect
                            ? "border-emerald-400/20 bg-slate-950/95"
                            : isChecked
                              ? "border-rose-400/20 bg-slate-950/95"
                              : "border-cyan-400/20 bg-slate-950/95"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p
                            className={`text-xs font-semibold uppercase tracking-[0.28em] ${
                              currentQuestion.type === "implementation"
                                ? "text-amber-300"
                                : isChecked && questionIsCorrect
                                  ? "text-emerald-300"
                                  : isChecked
                                    ? "text-rose-300"
                                    : "text-cyan-300"
                            }`}
                          >
                            {verdictLabel}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-200">
                            {currentQuestion.type === "implementation"
                              ? "Scroll-free reference preview is shown here."
                              : isChecked
                                ? questionIsCorrect
                                  ? "Your answer matches the expected output."
                                  : "Your answer does not match the expected output."
                                : "Correct answer preview is shown here."}
                          </p>
                          {currentQuestion.type !== "implementation" ? (
                            <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                Actual answer
                              </p>
                              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-100">
                                {currentQuestion.expected}
                              </p>
                              <p className="mt-3 text-sm leading-6 text-slate-300">
                                {currentQuestion.explanation}
                              </p>
                            </div>
                          ) : null}
                        </div>
                        <button
                          onClick={() => {
                            setChecked((prev) => {
                              const next = [...prev];
                              next[currentIdx] = false;
                              return next;
                            });
                            setRevealed((prev) => {
                              const next = [...prev];
                              next[currentIdx] = false;
                              return next;
                            });
                          }}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-100 transition hover:bg-white/10"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {showFeedback && useOverlayFeedback && !useSidebarAnswers ? (
                    <div className="h-24 sm:h-20" aria-hidden="true" />
                  ) : null}
                </div>
              </article>

              <aside className="space-y-6">
                <section className="rounded-4xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <div className="flex flex-wrap gap-2">
                    {sidebarTabs.map((tab) => {
                      const active = sidebarTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setSidebarTab(tab.id)}
                          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition ${
                            active
                              ? "bg-cyan-400/15 text-cyan-100 border border-cyan-400/30"
                              : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {sidebarTab === "attempted" ? (
                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">
                        Attempted questions
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {attemptedQuestions.length
                          ? `${attemptedQuestions.length} question${attemptedQuestions.length === 1 ? "" : "s"} saved in this browser.`
                          : "No attempted questions saved yet."}
                      </p>

                      <div className="mt-4 space-y-3">
                        {attemptedQuestions.length ? (
                          attemptedQuestions.map((question) => (
                            <button
                              key={question.id}
                              onClick={() => setReviewQuestionId(question.id)}
                              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-left transition hover:border-cyan-400/30 hover:bg-slate-950/80"
                            >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                                  {question.topic}
                                </p>
                                  <p className="mt-1 text-sm font-semibold text-white">
                                    {question.title}
                                  </p>
                                </div>
                                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-100">
                                  Attempted
                                </span>
                              </div>
                              <p className="mt-3 text-sm leading-6 text-slate-300">
                                {question.prompt}
                              </p>
                              {question.code || question.starter ? (
                                <pre className="mt-3 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-xs leading-5 text-slate-200">
                                  {normalizeCodeBlock(
                                    question.code ?? question.starter ?? ""
                                  )}
                                </pre>
                              ) : null}
                              <p className="mt-3 text-xs leading-5 text-slate-400">
                                {question.type === "output"
                                  ? "Output question"
                                  : question.type === "implementation"
                                    ? "Implementation question"
                                    : "Concept question"}
                              </p>
                            </button>
                          ))
                        ) : (
                          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm leading-6 text-slate-300">
                            Questions you check or reveal will appear here for
                            later review.
                          </div>
                        )}
                      </div>
                    </div>
                  ) : sidebarTab === "answers" ? (
                    <>
                      <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">
                        {isReviewingAttempted ? "Review answer" : "Answer and explanation"}
                      </p>
                      {isReviewingAttempted ? (
                        <>
                          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                              Actual answer
                            </p>
                            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white">
                              {displayQuestion.expected}
                            </p>
                          </div>
                          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                              Explanation
                            </p>
                            <div className="mt-3 space-y-3 text-sm leading-6 text-slate-200">
                              {displayQuestion.explanation
                                .split("\n")
                                .map((line, index) =>
                                  line.trim() ? (
                                    <p
                                      key={`${displayQuestion.id}-review-explain-${index}`}
                                    >
                                      {line}
                                    </p>
                                  ) : null
                                )}
                            </div>
                          </div>
                        </>
                      ) : isRevealed ? (
                        <>
                          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                              Actual answer
                            </p>
                            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white">
                              {currentQuestion.expected}
                            </p>
                          </div>
                          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                              Explanation
                            </p>
                            <div className="mt-3 space-y-3 text-sm leading-6 text-slate-200">
                              {currentQuestion.explanation
                                .split("\n")
                                .map((line, index) =>
                                  line.trim() ? (
                                    <p
                                      key={`${currentQuestion.id}-explain-${index}`}
                                    >
                                      {line}
                                    </p>
                                  ) : null
                                )}
                            </div>
                          </div>
                        </>
                      ) : isChecked ? (
                        <div className="mt-4 space-y-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                          <div
                            className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                              questionIsCorrect
                                ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
                                : "border-rose-400/20 bg-rose-400/10 text-rose-100"
                            }`}
                          >
                            {questionIsCorrect
                              ? "Correct. Your answer matches the expected output."
                              : "Not quite. Your answer does not match the expected output."}
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                              Your answer
                            </p>
                            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white">
                              {currentAnswer || "No answer entered."}
                            </p>
                          </div>
                          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                              Explanation
                            </p>
                            <div className="mt-2 space-y-3 text-sm leading-6 text-slate-200">
                              {currentQuestion.explanation
                                .split("\n")
                                .map((line, index) =>
                                  line.trim() ? (
                                    <p
                                      key={`${currentQuestion.id}-checked-explain-${index}`}
                                    >
                                      {line}
                                    </p>
                                  ) : null
                                )}
                            </div>
                            <p className="mt-3 text-xs leading-5 text-slate-400">
                              Click `Reveal Answer` if you want the actual
                              output too.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm leading-6 text-slate-300">
                          Click `Check Answer` to compare your guess or `Reveal
                          Answer` to open the actual output and explanation
                          here.
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                        What this mode trains
                      </p>
                      <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                        <li>Question-specific skills for this page only.</li>
                        <li>
                          Randomized order every time you click Shuffle deck.
                        </li>
                        <li>
                          Answer review without mixing other question types.
                        </li>
                      </ul>

                      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                          How to use
                        </p>
                        <div className="mt-4 space-y-3 text-sm text-slate-200">
                          <p>
                            Use Previous and Next to move inside this category
                            only.
                          </p>
                          <p>
                            Use the reference solution for implementation
                            practice.
                          </p>
                          <p>
                            Use the explanation for output-style and
                            concept-style review.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </section>
              </aside>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
