"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import PracticeMode from "@/components/PracticeMode";
import { postgresqlImplementationQuestions } from "@/lib/postgresqlImplementationQuestions";
import { getRelevantSchemaForQuestion } from "@/lib/postgresqlSchema";

function formatSql(sql) {
  if (!sql || typeof sql !== "string") return sql;

  const trimmed = sql.trim();
  if (!trimmed || trimmed.startsWith("--")) return sql;

  let out = trimmed
    .replace(/\s+/g, " ")
    .replace(/\bSELECT\b/gi, "\nSELECT")
    .replace(/\bFROM\b/gi, "\nFROM")
    .replace(/\bWHERE\b/gi, "\nWHERE")
    .replace(/\bGROUP BY\b/gi, "\nGROUP BY")
    .replace(/\bHAVING\b/gi, "\nHAVING")
    .replace(/\bORDER BY\b/gi, "\nORDER BY")
    .replace(/\bLIMIT\b/gi, "\nLIMIT")
    .replace(/\bOFFSET\b/gi, "\nOFFSET")
    .replace(/\bINSERT INTO\b/gi, "\nINSERT INTO")
    .replace(/\bVALUES\b/gi, "\nVALUES")
    .replace(/\bUPDATE\b/gi, "\nUPDATE")
    .replace(/\bSET\b/gi, "\nSET")
    .replace(/\bDELETE FROM\b/gi, "\nDELETE FROM")
    .replace(/\bJOIN\b/gi, "\nJOIN")
    .replace(/\bLEFT JOIN\b/gi, "\nLEFT JOIN")
    .replace(/\bRIGHT JOIN\b/gi, "\nRIGHT JOIN")
    .replace(/\bINNER JOIN\b/gi, "\nINNER JOIN")
    .replace(/\bON\b/gi, "\n  ON")
    .replace(/\bAND\b/gi, "\n  AND")
    .replace(/\bOR\b/gi, "\n  OR")
    .replace(/\s*,\s*/g, ",\n  ")
    .replace(/;\s*/g, ";\n");

  out = out
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line, index, arr) => !(line === "" && arr[index - 1] === ""))
    .join("\n")
    .trim();

  return out;
}

export default function PostgresqlImplementationPage() {
  const [schemaModal, setSchemaModal] = useState({
    open: false,
    questionId: null,
    showDiagram: false,
  });
  const [diagramZoom, setDiagramZoom] = useState(1);

  const closeSchemaModal = useCallback(() => {
    setSchemaModal({ open: false, questionId: null, showDiagram: false });
    setDiagramZoom(1);
  }, []);

  useEffect(() => {
    if (!schemaModal.open) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [schemaModal.open]);

  const formattedQuestions = useMemo(
    () =>
      postgresqlImplementationQuestions.map((question) => ({
        ...question,
        starter: formatSql(question.starter),
        referenceSolution: formatSql(question.referenceSolution),
      })),
    []
  );

  return (
    <PracticeMode
      eyebrow="PostgreSQL implementation questions"
      title="PostgreSQL coding practice"
      description="Practice PostgreSQL implementation tasks in serial order, and open schema snippets relevant to the current question."
      questions={formattedQuestions}
      storageKey="postgresql-implementation"
      collapsibleSidebar
      enableQuestionListSidebar
      enableOrderToggle
      defaultOrderMode="serial"
      onDisplayQuestionChange={closeSchemaModal}
      renderQuestionTools={({ question }) => {
        const isOpen =
          schemaModal.open && schemaModal.questionId === question.id;
        const schemaText = getRelevantSchemaForQuestion(question);

        return (
          <>
            <button
              type="button"
              onClick={() =>
                setSchemaModal({
                  open: true,
                  questionId: question.id,
                  showDiagram: false,
                })
              }
              className="rounded-full border border-emerald-400/30 bg-emerald-400/12 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-100 transition hover:bg-emerald-400/20"
            >
              Check related schema
            </button>

            {isOpen ? (
              <div className="fixed inset-0 z-50">
                <button
                  type="button"
                  onClick={closeSchemaModal}
                  aria-label="Close schema popup"
                  className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm"
                />

                <div className="relative z-10 h-full overflow-y-auto p-1.5 sm:p-6">
                  <div className="mx-auto flex min-h-full items-start justify-center sm:items-center">
                    <div className="flex w-full max-w-6xl max-h-[calc(100dvh-0.75rem)] sm:max-h-[calc(100dvh-3rem)] flex-col overflow-hidden rounded-2xl border border-emerald-400/25 bg-slate-950/95 p-2 shadow-2xl sm:rounded-3xl sm:p-5">
                      <div className="sticky top-0 z-10 -mx-2 -mt-2 border-b border-white/10 bg-slate-950/95 px-2 py-2 sm:static sm:m-0 sm:border-none sm:bg-transparent sm:p-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300 sm:text-xs sm:tracking-[0.22em]">
                          Related schema for current question
                          </p>
                          <div className="flex flex-wrap justify-end gap-1.5 sm:gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setSchemaModal((prev) => {
                                  const nextShowDiagram = !prev.showDiagram;
                                  if (nextShowDiagram) {
                                    setDiagramZoom(1);
                                  }
                                  return {
                                    ...prev,
                                    showDiagram: nextShowDiagram,
                                  };
                                })
                              }
                              className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1.5 text-[11px] font-semibold text-cyan-100 transition hover:bg-cyan-400/20 sm:px-3 sm:text-xs"
                            >
                              {schemaModal.showDiagram
                                ? "Show Schema"
                                : "Show Diagram"}
                            </button>
                            <button
                              type="button"
                              aria-label="Close schema popup"
                              onClick={closeSchemaModal}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/8 text-slate-100 transition hover:bg-white/12"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-4 w-4"
                                aria-hidden="true"
                              >
                                <path
                                  d="M6 6l12 12M18 6L6 18"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 min-h-0 flex-1 overflow-auto sm:mt-3">
                        {!schemaModal.showDiagram ? (
                          <pre className="h-full overflow-auto whitespace-pre rounded-2xl border border-white/10 bg-slate-900/80 p-2.5 font-mono text-[11px] leading-5 text-slate-200 sm:p-4 sm:text-sm sm:leading-6">
                            {schemaText}
                          </pre>
                        ) : null}

                        {schemaModal.showDiagram ? (
                          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-2.5 sm:p-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200 sm:text-xs sm:tracking-[0.2em]">
                                Database diagram
                              </p>
                              <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setDiagramZoom((prev) =>
                                      Math.max(0.5, +(prev - 0.1).toFixed(2))
                                    )
                                  }
                                  className="rounded-full border border-white/20 bg-white/8 px-2.5 py-1 text-[11px] font-semibold text-slate-100 transition hover:bg-white/12 sm:px-3 sm:text-xs"
                                >
                                  -
                                </button>
                                <span className="min-w-12 text-center text-[11px] font-semibold text-slate-200 sm:min-w-14 sm:text-xs">
                                  {Math.round(diagramZoom * 100)}%
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setDiagramZoom((prev) =>
                                      Math.min(3, +(prev + 0.1).toFixed(2))
                                    )
                                  }
                                  className="rounded-full border border-white/20 bg-white/8 px-2.5 py-1 text-[11px] font-semibold text-slate-100 transition hover:bg-white/12 sm:px-3 sm:text-xs"
                                >
                                  +
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDiagramZoom(1)}
                                  className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-100 transition hover:bg-cyan-400/20 sm:px-3 sm:text-xs"
                                >
                                  Reset
                                </button>
                              </div>
                            </div>
                            <div className="mt-3 overflow-auto rounded-xl border border-white/10 bg-slate-950/70 p-2">
                              <Image
                                src="/assets/DBDiagram1.svg"
                                alt="Database diagram"
                                width={1400}
                                height={900}
                                style={{
                                  width: `${Math.round(1400 * diagramZoom)}px`,
                                  height: "auto",
                                  maxWidth: "none",
                                }}
                                className="rounded-lg"
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        );
      }}
    />
  );
}
