"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { roadmapData as roadmapSource } from "../../lib/roadmapTopics";

const roadmapData = Object.entries(roadmapSource?.tracks || {}).reduce(
  (acc, [duration, track]) => {
    if (!track || !Array.isArray(track.phases)) return acc;

    acc[duration] = {
      title: track.title || `${duration}-Month Plan`,
      phases: track.phases.map((phase) => ({
        id: phase.id,
        name: phase.title || phase.name || "Untitled Phase",
        weeks: phase.weeks || "",
        topics: (phase.topics || []).map((topic) => ({
          id: `${phase.id}_${(topic.name || topic.title || "topic").replace(/\s+/g, "_")}`,
          title: topic.name || topic.title || "Untitled Topic",
          questions: (topic.concepts || []).flatMap((concept) =>
            Array.isArray(concept.questions) ? concept.questions : []
          ),
        })),
      })),
    };

    return acc;
  },
  {}
);

function loadProgress(duration) {
  if (typeof window === "undefined") return new Map();
  try {
    const raw = localStorage.getItem(`roadmap_progress_${duration}`);
    if (!raw) return new Map();
    return new Map(Object.entries(JSON.parse(raw)));
  } catch {
    return new Map();
  }
}

function questionId(phaseId, topicId, idx) {
  return `${phaseId}_${topicId}_${idx}`;
}

function TopicCard({ phaseId, topic, completedMap, onToggle, onMarkAll }) {
  const [open, setOpen] = useState(false);
  const total = topic.questions.length;
  const done = topic.questions.reduce(
    (count, _q, idx) => count + (completedMap.get(questionId(phaseId, topic.id, idx)) ? 1 : 0),
    0
  );
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{topic.title}</h4>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{done}/{total} completed</p>
        </div>
        <span className="rounded-md bg-sky-100 px-2 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
          {percent}%
        </span>
      </div>

      <div className="mt-3 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
        <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${percent}%` }} />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          {open ? "Hide" : "View"} tasks
        </button>
        <button
          onClick={() => onMarkAll(phaseId, topic.id, topic.questions)}
          className="rounded-md border border-emerald-300 px-2.5 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
        >
          Mark all done
        </button>
      </div>

      {open ? (
        <ul className="mt-3 space-y-2">
          {topic.questions.map((q, idx) => {
            const id = questionId(phaseId, topic.id, idx);
            const checked = Boolean(completedMap.get(id));
            return (
              <li key={id} className="flex items-start justify-between gap-3 text-xs">
                <span className={checked ? "line-through text-slate-400" : "text-slate-600 dark:text-slate-300"}>{q}</span>
                <button
                  onClick={() => onToggle(id)}
                  className={`shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold ${
                    checked
                      ? "border border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
                      : "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-900"
                  }`}
                >
                  {checked ? "Undo" : "Done"}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </article>
  );
}

export default function RoadmapTrackerPage() {
  const [selectedDuration, setSelectedDuration] = useState("6");
  const [completedMap, setCompletedMap] = useState(() => loadProgress("6"));

  useEffect(() => {
    const key = `roadmap_progress_${selectedDuration}`;
    localStorage.setItem(key, JSON.stringify(Object.fromEntries(completedMap)));
  }, [completedMap, selectedDuration]);

  const currentData = roadmapData[selectedDuration];
  const phases = currentData?.phases || [];

  const summary = useMemo(() => {
    let total = 0;
    let done = 0;
    phases.forEach((phase) => {
      phase.topics.forEach((topic) => {
        topic.questions.forEach((_q, idx) => {
          total += 1;
          if (completedMap.get(questionId(phase.id, topic.id, idx))) done += 1;
        });
      });
    });
    return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
  }, [phases, completedMap]);

  const changeDuration = (dur) => {
    setSelectedDuration(dur);
    setCompletedMap(loadProgress(dur));
  };

  const toggleQuestion = (id) => {
    setCompletedMap((prev) => {
      const next = new Map(prev);
      next.set(id, !prev.get(id));
      return next;
    });
  };

  const markAllInTopic = (phaseId, topicId, questions) => {
    setCompletedMap((prev) => {
      const next = new Map(prev);
      questions.forEach((_q, idx) => next.set(questionId(phaseId, topicId, idx), true));
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Fullstack to AI Engineer Roadmap</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Card-based roadmap with individual technology progress.</p>
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {Object.keys(roadmapData).map((dur) => (
            <button
              key={dur}
              onClick={() => changeDuration(dur)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${selectedDuration === dur ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"}`}
            >
              {dur}-Month Plan
            </button>
          ))}
        </div>

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900/70">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{currentData?.title}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{summary.done}/{summary.total} done ({summary.percent}%)</p>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${summary.percent}%` }} />
          </div>
        </div>

        <div className="space-y-6">
          {phases.map((phase) => (
            <section key={phase.id} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900/70">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{phase.name}</h2>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{phase.weeks}</span>
              </div>
              <div className="grid gap-3 grid-cols-1">
                {phase.topics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    phaseId={phase.id}
                    topic={topic}
                    completedMap={completedMap}
                    onToggle={toggleQuestion}
                    onMarkAll={markAllInTopic}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
