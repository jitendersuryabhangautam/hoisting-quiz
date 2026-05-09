"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import * as roadmapChunks from "../../lib/roadmapTopics";

function getChunkOrder(item, fallback) {
  const value = item?.chunk_id;
  if (typeof value !== "string") return fallback;
  const match = value.match(/chunk_(\d+)/i);
  return match ? Number(match[1]) : fallback;
}

function getChunkNumber(item, fallback) {
  const value = item?.chunk_id;
  if (typeof value !== "string") return fallback;
  const match = value.match(/chunk_(\d+)/i);
  return match ? Number(match[1]) : fallback;
}

function formatKey(key) {
  return String(key)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function depthStyles(depth) {
  const palette = [
    {
      rail: "border-cyan-500 dark:border-cyan-400",
      label: "text-cyan-800 dark:text-cyan-200",
      panel: "border-cyan-400 bg-cyan-50 dark:border-cyan-500 dark:bg-cyan-950/40 shadow-md",
    },
    {
      rail: "border-emerald-500 dark:border-emerald-400",
      label: "text-emerald-800 dark:text-emerald-200",
      panel: "border-emerald-400 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/40 shadow-md",
    },
    {
      rail: "border-amber-500 dark:border-amber-400",
      label: "text-amber-800 dark:text-amber-200",
      panel: "border-amber-400 bg-amber-50 dark:border-amber-500 dark:bg-amber-950/40 shadow-md",
    },
    {
      rail: "border-rose-500 dark:border-rose-400",
      label: "text-rose-800 dark:text-rose-200",
      panel: "border-rose-400 bg-rose-50 dark:border-rose-500 dark:bg-rose-950/40 shadow-md",
    },
  ];
  return palette[depth % palette.length];
}

function PrimitiveValue({ value }) {
  if (typeof value === "string") {
    const markdownLinkMatch = value.match(
      /^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/i
    );
    if (markdownLinkMatch) {
      const [, text, href] = markdownLinkMatch;
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="break-words text-sky-700 underline underline-offset-2 hover:text-sky-800"
        >
          {text}
        </a>
      );
    }

    if (/^https?:\/\/\S+$/i.test(value)) {
      return (
        <a
          href={value}
          target="_blank"
          rel="noreferrer noopener"
          className="break-all text-sky-700 underline underline-offset-2 hover:text-sky-800"
        >
          {value}
        </a>
      );
    }

    return <span className="break-words">{value}</span>;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return <span>{String(value)}</span>;
  }
  if (value === null) {
    return <span className="text-slate-500">null</span>;
  }
  return <span className="text-slate-500">-</span>;
}

function isTrackableLabel(label) {
  const normalized = String(label).toLowerCase();
  return (
    normalized.includes("practice question") ||
    normalized.includes("interview question") ||
    normalized.includes("revision checklist")
  );
}

function DataNode({
  label,
  value,
  depth = 0,
  path = "",
  completedMap,
  onToggleDone,
}) {
  const style = depthStyles(depth);
  const [expanded, setExpanded] = useState(true);
  const isDeep = depth >= 3;
  const blockClass = isDeep
    ? "space-y-2"
    : `rounded-xl border bg-white dark:bg-slate-900 p-2.5 sm:p-3 shadow-sm ${
        depth <= 2 ? style.panel : "border-slate-200 dark:border-slate-700"
      }`;

  if (
    value === null ||
    ["string", "number", "boolean"].includes(typeof value)
  ) {
    return (
      <div className={blockClass}>
        <p
          className={`text-xs font-semibold uppercase tracking-[0.14em] ${style.label}`}
        >
          {label}
        </p>
        <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
          <PrimitiveValue value={value} />
        </p>
      </div>
    );
  }

  if (Array.isArray(value)) {
    const allPrimitive = value.every(
      (item) =>
        item === null || ["string", "number", "boolean"].includes(typeof item)
    );

    if (allPrimitive) {
      const isTrackable = isTrackableLabel(label);
      return (
        <div className={blockClass}>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.14em] ${style.label}`}
          >
            {label} ({value.length})
          </p>
          <ul className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-200">
            {value.map((item, index) => (
              <li
                key={`${label}_${index}`}
                className="flex items-start justify-between gap-2 sm:gap-3"
              >
                <span
                  className={
                    isTrackable && completedMap?.get(`${path}__${index}`)
                      ? "min-w-0 flex-1 break-words line-through text-slate-400"
                      : "min-w-0 flex-1 break-words"
                  }
                >
                  <span className="mr-2">{index + 1}.</span>
                  <PrimitiveValue value={item} />
                </span>
                {isTrackable ? (
                  <button
                    type="button"
                    onClick={() => onToggleDone(`${path}__${index}`)}
                    className={`shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold sm:px-2.5 ${
                      completedMap?.get(`${path}__${index}`)
                        ? "border border-slate-300 text-slate-600 hover:bg-slate-100"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }`}
                  >
                    {completedMap?.get(`${path}__${index}`) ? "Undo" : "Done"}
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <section className={blockClass}>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className={`inline-flex items-center gap-2 text-left text-xs font-semibold uppercase tracking-[0.14em] ${style.label}`}
        >
          <span>{expanded ? "-" : "+"}</span>
          <span>
            {label} ({value.length})
          </span>
        </button>
        {expanded ? (
          <div className={`mt-3 space-y-2.5 ${isDeep ? "" : ""}`}>
            {value.map((item, index) => {
              const itemTitle =
                item && typeof item === "object"
                  ? item.title ||
                    item.name ||
                    item.id ||
                    `${label} ${index + 1}`
                  : `${label} ${index + 1}`;

              return (
                <div key={`${label}_${index}`} className={isDeep ? "" : "pl-2"}>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {index + 1}. {String(itemTitle)}
                  </p>
                  <div className="mt-2 space-y-2">
                    <DataNode
                      label={formatKey(itemTitle)}
                      value={item}
                      depth={depth + 1}
                      path={`${path}__${index}`}
                      completedMap={completedMap}
                      onToggleDone={onToggleDone}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </section>
    );
  }

  if (typeof value === "object") {
    const isRootNode = label === "Roadmap Data";
    const entries = Object.entries(value).filter(([key]) => {
      if (key === "id" || key === "chunk_id") return false;
      if (key === "title") return false;
      if (isRootNode && (key === "version" || key === "description")) {
        return false;
      }
      return true;
    });
    return (
      <section className={`${blockClass} space-y-2.5`}>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className={`inline-flex items-center gap-2 text-left text-xs font-semibold uppercase tracking-[0.14em] ${style.label}`}
        >
          <span>{expanded ? "-" : "+"}</span>
          <span>{label}</span>
        </button>
        {expanded
          ? entries.map(([key, nestedValue]) => (
              <DataNode
                key={`${label}_${key}`}
                label={formatKey(key)}
                value={nestedValue}
                depth={depth + 1}
                path={`${path}__${key}`}
                completedMap={completedMap}
                onToggleDone={onToggleDone}
              />
            ))
          : null}
      </section>
    );
  }

  return null;
}

export default function RoadmapTrackerPage() {
  const chunks = useMemo(() => {
    return Object.entries(roadmapChunks)
      .map(([exportName, data], index) => ({
        exportName,
        data,
        index,
      }))
      .filter(({ data }) => data && typeof data === "object")
      .sort(
        (a, b) =>
          getChunkOrder(a.data, a.index) - getChunkOrder(b.data, b.index)
      );
  }, []);

  const [selectedExportName, setSelectedExportName] = useState("");
  const [completedMap, setCompletedMap] = useState(() => new Map());

  const loadDoneMap = (exportName) => {
    if (!exportName || typeof window === "undefined") return new Map();
    try {
      const raw = localStorage.getItem(`roadmap_done_${exportName}`);
      if (!raw) return new Map();
      return new Map(Object.entries(JSON.parse(raw)));
    } catch {
      return new Map();
    }
  };

  const selectedChunk = useMemo(
    () =>
      chunks.find((chunk) => chunk.exportName === selectedExportName) || null,
    [chunks, selectedExportName]
  );

  useEffect(() => {
    if (!selectedExportName) return;
    localStorage.setItem(
      `roadmap_done_${selectedExportName}`,
      JSON.stringify(Object.fromEntries(completedMap))
    );
  }, [completedMap, selectedExportName]);

  const toggleDone = (id) => {
    setCompletedMap((prev) => {
      const next = new Map(prev);
      next.set(id, !prev.get(id));
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-0 py-6 sm:py-12">
      <div className="w-full">
        {!selectedChunk ? (
          <>
            <div className="mb-6 text-center sm:mb-8">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-3xl">
                AI Engineer Roadmap
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Select a roadmap card to view complete details.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {chunks.map((chunk, index) => (
                <button
                  key={chunk.exportName}
                  type="button"
                  onClick={() => {
                    setSelectedExportName(chunk.exportName);
                    setCompletedMap(loadDoneMap(chunk.exportName));
                  }}
                  className="rounded-2xl border-2 border-cyan-400 dark:border-cyan-500 bg-white dark:bg-slate-900 p-3.5 text-left shadow-md transition hover:-translate-y-0.5 hover:bg-cyan-50 dark:hover:bg-slate-800 hover:shadow-lg sm:p-4"
                >
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {chunk.data?.title || `Roadmap Card ${index + 1}`}
                  </p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedExportName("");
                  setCompletedMap(new Map());
                }}
                className="inline-flex w-full items-center justify-center rounded-lg border border-cyan-300 dark:border-cyan-500 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-cyan-50 dark:hover:bg-slate-800 sm:w-auto"
              >
                Back to Cards
              </button>
              <Link
                href="/"
                className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-100 px-4 py-2 text-sm font-semibold text-white dark:text-slate-900 sm:w-auto"
              >
                Back to Home
              </Link>
            </div>

            <section className="rounded-2xl border-2 border-cyan-400 dark:border-cyan-500 bg-white dark:bg-slate-900 p-3.5 shadow-md sm:p-5">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 sm:text-2xl">
                {selectedChunk.data?.title || "Roadmap Details"}
              </h2>
              {selectedChunk.data?.description ? (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {selectedChunk.data.description}
                </p>
              ) : null}

              <div className="mt-5 space-y-4">
                <DataNode
                  label="Roadmap Data"
                  value={selectedChunk.data}
                  path={selectedChunk.exportName}
                  completedMap={completedMap}
                  onToggleDone={toggleDone}
                />
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
