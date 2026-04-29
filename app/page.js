"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const TRACKS = [
  {
    name: "Introduction",
    icon: "In",
    color: "from-rose-400 to-pink-500",
    desc: "Personal profile, role context, and stack overview.",
    href: "/introduction",
  },
  {
    name: "JS Output",
    icon: "JO",
    color: "from-yellow-400 to-amber-500",
    desc: "Predict output for hoisting, closures, async, and scope.",
    href: "/output",
  },
  {
    name: "JS Theory",
    icon: "JT",
    color: "from-cyan-400 to-sky-500",
    desc: "Concept-focused JavaScript interview questions and answers.",
    href: "/theory",
  },
  {
    name: "JS Implementation",
    icon: "JI",
    color: "from-slate-700 to-slate-900 dark:from-slate-300 dark:to-slate-100",
    darkText: true,
    desc: "Write solutions for core JavaScript coding tasks.",
    href: "/implementation",
  },
  {
    name: "Go Output",
    icon: "GO",
    color: "from-sky-400 to-blue-500",
    desc: "Practice Go output behavior and execution ordering.",
    href: "/go-output",
  },
  {
    name: "Backend Theory",
    icon: "BT",
    color: "from-indigo-400 to-violet-500",
    desc: "Backend system concepts across APIs, architecture, and design.",
    href: "/backend",
  },
  {
    name: "Backend Implementation",
    icon: "BI",
    color: "from-sky-300 to-cyan-500",
    desc: "Hands-on backend implementation question set.",
    href: "/backend-implementation",
  },
  {
    name: "DB Theory",
    icon: "DB",
    color: "from-blue-400 to-blue-600",
    desc: "Core database theory concepts and interview preparation.",
    href: "/db-theory",
  },
  {
    name: "PG Implementation",
    icon: "PG",
    color: "from-emerald-400 to-green-600",
    desc: "PostgreSQL schema and implementation-oriented practice.",
    href: "/postgresql-implementation",
  },
];

const FEATURES = [
  {
    title: "Deep Concept Cards",
    desc: "Each topic is broken into focused cards with interview-oriented explanation and examples.",
    icon: "📘",
  },
  {
    title: "Interview Q&A Format",
    desc: "Questions are structured the way interviewers ask them so recall is faster.",
    icon: "💬",
  },
  {
    title: "Interactive Practice",
    desc: "Switch between output, theory, and implementation without context switching.",
    icon: "🧩",
  },
  {
    title: "Backend + DB Focus",
    desc: "Go, backend theory, and PostgreSQL tracks are separated for cleaner preparation.",
    icon: "🛠️",
  },
  {
    title: "Revision Friendly",
    desc: "Designed for short high-value revision sessions before interviews.",
    icon: "⚡",
  },
  {
    title: "Practical Coverage",
    desc: "Covers common patterns and edge cases that are repeatedly asked.",
    icon: "🎯",
  },
];

const ROADMAP = [
  {
    title: "Coding Playground",
    desc: "Inline code runner with instant feedback.",
  },
  { title: "Spaced Repetition", desc: "Adaptive review for weak topics." },
  {
    title: "Mock Interviews",
    desc: "Timed mixed-question interview simulation.",
  },
  {
    title: "Personal Study Plans",
    desc: "Track-based study sequence with progress.",
  },
  { title: "Performance Analytics", desc: "Heatmap by topic and difficulty." },
  { title: "Profile Export", desc: "Shareable preparation profile." },
];

const TERMINAL_LINES = [
  { prompt: true, text: "Q: What is closure?" },
  { prompt: false, text: "A function retaining lexical scope." },
  { prompt: true, text: "Q: useEffect cleanup runs when?" },
  { prompt: false, text: "Before unmount and before rerun." },
  { prompt: true, text: "Q: How does defer execute in Go?" },
  { prompt: false, text: "LIFO order before function return." },
];

const HOME_MCQ = [
  {
    question: "What is the output of: console.log(typeof null)?",
    options: ["null", "object", "undefined", "number"],
    correctAnswer: 1,
    explanation:
      "JavaScript has a long-standing bug where `typeof null` returns `object`.",
  },
  {
    question: "Which hook runs after render and supports cleanup?",
    options: ["useMemo", "useRef", "useEffect", "useState"],
    correctAnswer: 2,
    explanation:
      "`useEffect` runs after render, and it may return a cleanup function.",
  },
  {
    question: "In Go, deferred calls execute in which order?",
    options: ["FIFO", "LIFO", "Random", "By goroutine priority"],
    correctAnswer: 1,
    explanation:
      "Deferred function calls are executed in Last-In-First-Out order.",
  },
  {
    question: "Which SQL clause filters groups after aggregation?",
    options: ["WHERE", "ORDER BY", "HAVING", "LIMIT"],
    correctAnswer: 2,
    explanation:
      "`HAVING` is used to filter grouped rows after aggregate functions.",
  },
  {
    question: "React list rendering requires unique ____ for each item.",
    options: ["refs", "keys", "hooks", "props"],
    correctAnswer: 1,
    explanation:
      "Keys help React identify list items and reconcile updates correctly.",
  },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

export default function Home() {
  const [termIdx, setTermIdx] = useState(0);
  const [tracksRef, tracksVis] = useReveal();
  const [featRef, featVis] = useReveal();
  const [roadRef, roadVis] = useReveal();

  useEffect(() => {
    const id = setInterval(() => {
      setTermIdx((idx) => (idx + 1 >= TERMINAL_LINES.length ? 0 : idx + 1));
    }, 900);
    return () => clearInterval(id);
  }, []);

  const visibleLines = TERMINAL_LINES.slice(0, termIdx + 1).slice(-8);

  return (
    <div className="theme-page-home min-h-screen">
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl dark:bg-amber-500/10" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-500/10" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:pt-28">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-700 dark:border-amber-700/50 dark:bg-amber-500/10 dark:text-amber-400">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
                Free and Open Source
              </div>
              <h1 className="tech-hero-title text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
                Crack Interviews with
                <span className="bg-brand-gradient bg-clip-text text-transparent">
                  {" "}
                  Structured Practice
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0 dark:text-slate-400">
                Output, theory, backend, and implementation tracks in one place
                so you can revise fast and answer with confidence.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center">
                <Link
                  href="/output"
                  className="flex items-center gap-2 rounded-2xl bg-brand-gradient px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30 dark:shadow-amber-600/20"
                >
                  Start Learning
                </Link>
                <a
                  href="#features"
                  className="flex items-center gap-1.5 rounded-2xl border-2 border-amber-400/60 bg-white px-6 py-3.5 text-sm font-semibold text-amber-700 transition hover:border-amber-500 hover:bg-amber-50 dark:border-amber-600/40 dark:bg-transparent dark:text-amber-400 dark:hover:border-amber-500 dark:hover:bg-amber-500/10"
                >
                  See what is inside
                </a>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-900 shadow-2xl shadow-slate-900/30 dark:border-slate-700/80 dark:shadow-black/40">
                <div className="flex items-center gap-2 border-b border-slate-700/60 bg-slate-800/80 px-4 py-2.5">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-[11px] font-medium text-slate-400">
                    interview-prep - bash
                  </span>
                </div>
                <div className="h-56 overflow-hidden px-4 py-3 font-mono text-[13px] leading-relaxed">
                  {visibleLines.map((line, i) => (
                    <div key={`term-${i}-${line.text}`} className="flex">
                      {line.prompt ? (
                        <>
                          <span className="mr-2 select-none text-emerald-400">
                            $
                          </span>
                          <span className="font-semibold text-amber-300">
                            {line.text}
                          </span>
                        </>
                      ) : (
                        <span className="text-slate-300">{line.text}</span>
                      )}
                    </div>
                  ))}
                  <span className="inline-block h-4 w-2 animate-pulse rounded-sm bg-amber-400/80" />
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-lg grid-cols-3 gap-6 sm:mt-20 sm:max-w-xl">
            {[
              { value: "8", label: "Tracks" },
              { value: "300+", label: "Questions" },
              { value: "100%", label: "Practice Focus" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={tracksRef}
        className={`border-t border-slate-200/70 bg-white/70 py-16 sm:py-24 dark:border-slate-800 dark:bg-slate-900/50 transition-all duration-700 ${tracksVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Interview Tracks
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
              Interview pages by purpose.
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TRACKS.map((t) => (
              <Link
                key={t.name}
                href={t.href}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-100/70 dark:border-slate-700/80 dark:bg-slate-900"
              >
                <div
                  className="pointer-events-none absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-linear-to-br from-slate-100/80 to-slate-200/40 transition-transform duration-300 group-hover:scale-125 dark:from-slate-800/60 dark:to-slate-700/30"
                  aria-hidden="true"
                />
                <div
                  className={`relative mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${t.color} text-xs font-extrabold ${t.darkText ? "text-white dark:text-slate-900" : "text-white"} shadow-sm transition-transform duration-300 group-hover:scale-110`}
                >
                  {t.icon}
                </div>
                <h3 className="relative text-sm font-bold text-slate-900 dark:text-white">
                  {t.name}
                </h3>
                <p className="relative mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {t.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="features"
        ref={featRef}
        className={`bg-white/55 py-16 sm:py-24 transition-all duration-700 dark:bg-transparent ${featVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              What You Get
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
              Everything you need to ace interviews
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-100/70 dark:border-slate-700/80 dark:bg-slate-900"
              >
                <div
                  className="pointer-events-none absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-amber-100/50 dark:bg-amber-500/10"
                  aria-hidden="true"
                />
                <div className="relative mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-xl dark:bg-amber-500/10">
                  <span aria-hidden="true">{f.icon}</span>
                </div>
                <h3 className="relative text-sm font-bold text-slate-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="relative mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={roadRef}
        className={`border-t border-violet-200/70 bg-linear-to-b from-violet-50/65 via-white/80 to-sky-50/55 py-16 sm:py-24 dark:border-violet-900/30 dark:from-violet-950/20 dark:via-slate-900/50 dark:to-slate-900/50 transition-all duration-700 ${roadVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
              What is coming next
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ROADMAP.map((r) => (
              <div
                key={r.title}
                className="group relative overflow-hidden rounded-2xl border border-dashed border-violet-300/70 bg-white/90 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-violet-400/80 dark:border-violet-700/50 dark:bg-slate-900/70 dark:hover:border-violet-600/70"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {r.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
