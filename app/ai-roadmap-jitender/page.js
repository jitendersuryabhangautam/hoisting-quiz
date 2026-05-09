"use client";

import { useEffect, useMemo, useState } from "react";
import roadmapData from "@/lib/aiRoadmapJitender.json";

const STORAGE_KEY = "ai-roadmap-jitender-done-v1";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function itemName(item) {
  if (typeof item === "string") return item;
  if (item && typeof item === "object") return item.name || item.title || "";
  return "";
}

function itemUrl(item) {
  if (item && typeof item === "object" && typeof item.url === "string") return item.url;
  return "";
}

function topicKey(phaseId, section, name) {
  return `${String(phaseId)}::${String(section)}::${String(name)}`;
}

function ResourceLinks({ resources }) {
  const links = asArray(resources).filter((r) => r && typeof r === "object" && r.title && r.url);
  if (links.length === 0) return null;

  return (
    <ul className="mt-2 space-y-1 text-xs">
      {links.map((link, idx) => (
        <li key={`${link.title}_${idx}`}>
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sky-700 underline underline-offset-2 hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-200"
          >
            {link.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

function ToggleItems({ phaseId, title, items, doneMap, onToggle }) {
  const list = asArray(items).filter((entry) => !!itemName(entry));
  if (list.length === 0) return null;

  return (
    <section className="mt-4">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
        {list.map((entry, index) => {
          const name = itemName(entry);
          const url = itemUrl(entry);
          const doneId = topicKey(phaseId, title, name);
          const isDone = !!doneMap[doneId];

          return (
            <li
              key={`${title}_${name}_${index}`}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={
                    isDone
                      ? "text-emerald-700 line-through dark:text-emerald-300"
                      : "text-slate-700 dark:text-slate-200"
                  }
                >
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline decoration-slate-300 underline-offset-2 hover:text-sky-700 dark:hover:text-sky-300"
                    >
                      {name}
                    </a>
                  ) : (
                    name
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => onToggle(doneId)}
                  className={
                    isDone
                      ? "rounded-md bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                      : "rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-200 dark:hover:bg-emerald-900/60"
                  }
                >
                  {isDone ? "Undo" : "Mark Done"}
                </button>
              </div>

              {entry && typeof entry === "object" && entry.purpose ? (
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{entry.purpose}</p>
              ) : null}

              <ResourceLinks resources={entry?.resources} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Specializations({ phaseId, items, doneMap, onToggle }) {
  const list = asArray(items);
  if (list.length === 0) return null;

  return (
    <section className="mt-4">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Specializations</h3>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        {list.map((spec, idx) => {
          const name = spec?.name || `Specialization ${idx + 1}`;
          const doneId = topicKey(phaseId, "Specializations", name);
          const isDone = !!doneMap[doneId];

          return (
            <article
              key={`${name}_${idx}`}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex items-center justify-between gap-3">
                <h4
                  className={`text-sm font-semibold ${
                    isDone ? "text-emerald-700 line-through dark:text-emerald-300" : "text-slate-900 dark:text-slate-100"
                  }`}
                >
                  {name}
                </h4>
                <button
                  type="button"
                  onClick={() => onToggle(doneId)}
                  className={
                    isDone
                      ? "rounded-md bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                      : "rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                  }
                >
                  {isDone ? "Undo" : "Mark Done"}
                </button>
              </div>
              <ToggleItems
                phaseId={phaseId}
                title={`${name} Tools`}
                items={spec?.tools}
                doneMap={doneMap}
                onToggle={onToggle}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function AIRoadmapJitenderPage() {
  const phases = asArray(roadmapData?.phases);
  const [doneMap, setDoneMap] = useState(() => {
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
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(doneMap));
    } catch {}
  }, [doneMap]);

  const { total, done } = useMemo(() => {
    const phaseKeys = [
      "topics",
      "pythonTopics",
      "aiFundamentals",
      "openaiTopics",
      "projects",
      "servingTechnologies",
      "infrastructure",
      "observability",
      "portfolioRequirements",
      "interviewTopics",
      "vectorDatabases",
      "frameworks",
      "tools",
      "accounts",
      "libraries",
      "evaluation",
      "resources",
    ];

    let totalCount = 0;
    phases.forEach((phase) => {
      phaseKeys.forEach((key) => {
        totalCount += asArray(phase?.[key]).filter((entry) => !!itemName(entry)).length;
      });
      totalCount += asArray(phase?.specializations).length;
      asArray(phase?.specializations).forEach((spec) => {
        totalCount += asArray(spec?.tools).filter((entry) => !!itemName(entry)).length;
      });
    });

    return {
      total: totalCount,
      done: Object.values(doneMap).filter(Boolean).length,
    };
  }, [doneMap, phases]);

  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  function toggleDone(id) {
    setDoneMap((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ecfeff_0%,#eef2ff_35%,#f0fdf4_100%)] px-4 py-8 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-2xl border border-cyan-200/60 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">AI Roadmap for Jitender</h1>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{roadmapData?.title || "Structured AI learning plan"}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <div className="rounded-lg bg-cyan-50 px-3 py-2 text-sm text-cyan-900 dark:bg-cyan-900/30 dark:text-cyan-100">
              <span className="font-semibold">Version:</span> {roadmapData?.version || "-"}
            </div>
            <div className="rounded-lg bg-cyan-50 px-3 py-2 text-sm text-cyan-900 dark:bg-cyan-900/30 dark:text-cyan-100">
              <span className="font-semibold">Experience:</span> {roadmapData?.userBackground?.experience || "-"}
            </div>
            <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100">
              <span className="font-semibold">Target Roles:</span> {asArray(roadmapData?.targetRoles).join(", ") || "-"}
            </div>
            <div className="rounded-lg bg-indigo-50 px-3 py-2 text-sm text-indigo-900 dark:bg-indigo-900/30 dark:text-indigo-100">
              <span className="font-semibold">Progress:</span> {done}/{total} ({progress}%)
            </div>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div className="h-full rounded-full bg-linear-to-r from-cyan-500 to-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </header>

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Overall Timeline</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {asArray(roadmapData?.overallTimeline).map((item, idx) => (
              <li key={`timeline_${idx}`} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
                <span className="font-semibold text-slate-900 dark:text-slate-100">{item.phase}</span>
                <span className="mx-1 text-slate-500">|</span>
                <span className="text-cyan-700 dark:text-cyan-300">{item.duration}</span>
                <div className="mt-1 text-slate-700 dark:text-slate-300">{item.focus}</div>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-5">
          {phases.map((phase) => (
            <article key={`phase_${phase.id}`} className="rounded-2xl border border-cyan-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{phase.title}</h2>
                <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-200">{phase.duration}</span>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-slate-100">Goal: </span>
                {phase.goal}
              </p>

              <ToggleItems phaseId={phase.id} title="Topics" items={phase.topics} doneMap={doneMap} onToggle={toggleDone} />
              <ToggleItems phaseId={phase.id} title="Python Topics" items={phase.pythonTopics} doneMap={doneMap} onToggle={toggleDone} />
              <ToggleItems phaseId={phase.id} title="AI Fundamentals" items={phase.aiFundamentals} doneMap={doneMap} onToggle={toggleDone} />
              <ToggleItems phaseId={phase.id} title="OpenAI Topics" items={phase.openaiTopics} doneMap={doneMap} onToggle={toggleDone} />
              <ToggleItems phaseId={phase.id} title="Projects" items={phase.projects} doneMap={doneMap} onToggle={toggleDone} />
              <ToggleItems phaseId={phase.id} title="Serving Technologies" items={phase.servingTechnologies} doneMap={doneMap} onToggle={toggleDone} />
              <ToggleItems phaseId={phase.id} title="Infrastructure" items={phase.infrastructure} doneMap={doneMap} onToggle={toggleDone} />
              <ToggleItems phaseId={phase.id} title="Observability" items={phase.observability} doneMap={doneMap} onToggle={toggleDone} />
              <ToggleItems phaseId={phase.id} title="Portfolio Requirements" items={phase.portfolioRequirements} doneMap={doneMap} onToggle={toggleDone} />
              <ToggleItems phaseId={phase.id} title="Interview Topics" items={phase.interviewTopics} doneMap={doneMap} onToggle={toggleDone} />
              <ToggleItems phaseId={phase.id} title="Vector Databases" items={phase.vectorDatabases} doneMap={doneMap} onToggle={toggleDone} />
              <ToggleItems phaseId={phase.id} title="Frameworks" items={phase.frameworks} doneMap={doneMap} onToggle={toggleDone} />
              <ToggleItems phaseId={phase.id} title="Tools" items={phase.tools} doneMap={doneMap} onToggle={toggleDone} />
              <ToggleItems phaseId={phase.id} title="Accounts" items={phase.accounts} doneMap={doneMap} onToggle={toggleDone} />
              <ToggleItems phaseId={phase.id} title="Libraries" items={phase.libraries} doneMap={doneMap} onToggle={toggleDone} />
              <ToggleItems phaseId={phase.id} title="Evaluation" items={phase.evaluation} doneMap={doneMap} onToggle={toggleDone} />
              <ToggleItems phaseId={phase.id} title="Resources" items={phase.resources} doneMap={doneMap} onToggle={toggleDone} />
              <Specializations phaseId={phase.id} items={phase.specializations} doneMap={doneMap} onToggle={toggleDone} />
            </article>
          ))}
        </div>

        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Weekly Commitment</h2>
            <ul className="mt-2 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>Minimum: {roadmapData?.weeklyCommitment?.minimum || "-"}</li>
              <li>Recommended: {roadmapData?.weeklyCommitment?.recommended || "-"}</li>
              <li>Aggressive: {roadmapData?.weeklyCommitment?.aggressive || "-"}</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Best Projects</h2>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {asArray(roadmapData?.bestProjects).map((project, idx) => (
                <li key={`${project?.name || "project"}_${idx}`} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{project?.name || "-"}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">Difficulty: {project?.difficulty || "-"}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">Resume Value: {project?.resumeValue || "-"}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Final Profile</h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-slate-100">Title:</span> {roadmapData?.finalProfile?.title || "-"}
          </p>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-slate-100">Skills:</span> {asArray(roadmapData?.finalProfile?.skillsCombination).join(", ") || "-"}
          </p>
        </section>
      </div>
    </main>
  );
}
