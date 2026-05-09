"use client";

import { useEffect, useMemo, useState } from "react";
import roadmapData from "@/lib/aiRoadmapYamini.json";

const STORAGE_KEY = "ai-roadmap-yamini-done-topics-v2";

function titleCase(value) {
  return String(value)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function cleanText(value) {
  return String(value).replace(/–|â€“/g, "-");
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function topicId(phase, topic) {
  return `${String(phase)}::${String(topic)}`;
}

function ResourceGroups({ resources }) {
  if (!resources || typeof resources !== "object") return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Object.entries(resources).map(([group, entries]) => {
        if (!Array.isArray(entries) || entries.length === 0) return null;
        return (
          <section
            key={group}
            className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900/60"
          >
            <h4 className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300">
              {titleCase(group)}
            </h4>
            <ul className="mt-2 space-y-1.5 text-sm">
              {entries.map((entry, index) => (
                <li key={`${group}_${index}`}>
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sky-700 underline underline-offset-2 hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-200"
                  >
                    {entry.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

export default function AIRoadmapYaminiPage() {
  const phases = useMemo(() => asArray(roadmapData?.roadmap), []);
  const copilotPlan = useMemo(
    () => asArray(roadmapData?.ai_developer_copilot),
    []
  );

  const [doneTopics, setDoneTopics] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(doneTopics));
    } catch {}
  }, [doneTopics]);

  const { totalTopics, doneCount } = useMemo(() => {
    let total = 0;
    phases.forEach((phaseItem) => {
      total += asArray(phaseItem.topics_to_learn).length;
    });
    return {
      totalTopics: total,
      doneCount: Object.values(doneTopics).filter(Boolean).length,
    };
  }, [doneTopics, phases]);

  const completion =
    totalTopics > 0 ? Math.round((doneCount / totalTopics) * 100) : 0;

  function toggleTopicDone(id) {
    setDoneTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ecfeff_0%,#eef2ff_35%,#f0fdf4_100%)] px-4 py-8 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-2xl border border-cyan-200/60 bg-white/85 p-5 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            AI Roadmap for Yamini
          </h1>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            Phase-wise roadmap with topic tracking, resources, projects, and AI
            Developer Copilot milestones.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-cyan-50 px-3 py-2 text-sm text-cyan-900 dark:bg-cyan-900/30 dark:text-cyan-100">
              <span className="font-semibold">Phases:</span> {phases.length}
            </div>
            <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100">
              <span className="font-semibold">Copilot Milestones:</span>{" "}
              {copilotPlan.length}
            </div>
            <div className="rounded-lg bg-indigo-50 px-3 py-2 text-sm text-indigo-900 dark:bg-indigo-900/30 dark:text-indigo-100">
              <span className="font-semibold">Progress:</span> {doneCount}/
              {totalTopics} ({completion}%)
            </div>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-linear-to-r from-cyan-500 via-sky-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${completion}%` }}
            />
          </div>
        </header>

        <div className="space-y-5">
          {phases.map((phaseItem, index) => (
            <article
              key={`${phaseItem.phase}_${index}`}
              className="rounded-2xl border border-cyan-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {cleanText(phaseItem.phase)}
                </h2>
                <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-200">
                  {cleanText(phaseItem.duration)}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  Goal:{" "}
                </span>
                {phaseItem.goal}
              </p>

              {asArray(phaseItem.topics_to_learn).length > 0 ? (
                <section className="mt-4">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Topics To Learn
                  </h3>
                  <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                    {phaseItem.topics_to_learn.map((topic, topicIndex) => {
                      const id = topicId(phaseItem.phase, topic);
                      const isDone = !!doneTopics[id];

                      return (
                        <li
                          key={`${phaseItem.phase}_topic_${topicIndex}`}
                          className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
                        >
                          <span
                            className={
                              isDone
                                ? "text-emerald-700 line-through dark:text-emerald-300"
                                : "text-slate-700 dark:text-slate-200"
                            }
                          >
                            {topic}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleTopicDone(id)}
                            className={
                              isDone
                                ? "rounded-md bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                                : "rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-200 dark:hover:bg-emerald-900/60"
                            }
                          >
                            {isDone ? "Undo" : "Mark Done"}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ) : null}

              <section className="mt-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Best Learning Resources
                </h3>
                <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70">
                  <ResourceGroups
                    resources={phaseItem.best_learning_resources}
                  />
                </div>
              </section>

              {asArray(phaseItem.build_projects).length > 0 ? (
                <section className="mt-4">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Build Projects
                  </h3>
                  <ul className="mt-2 flex flex-wrap gap-2 text-sm">
                    {phaseItem.build_projects.map((project, projectIndex) => (
                      <li
                        key={`${phaseItem.phase}_project_${projectIndex}`}
                        className="rounded-full bg-sky-50 px-3 py-1 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200"
                      >
                        {project}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                <span className="font-semibold">Outcome: </span>
                {phaseItem.outcome}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-8 rounded-2xl border border-amber-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            AI Developer Copilot Build Track
          </h2>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
            Practical implementation milestones aligned with each roadmap phase.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {copilotPlan.map((item, idx) => (
              <article
                key={`${item.phase}_${idx}`}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"
              >
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {cleanText(item.phase)}
                </h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                  {asArray(item.build_projects).map((project, pIdx) => (
                    <li key={`${item.phase}_copilot_${pIdx}`}>{project}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
