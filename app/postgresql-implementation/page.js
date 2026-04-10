"use client";

import { useMemo, useState } from "react";
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
  const [schemaOpenByQuestionId, setSchemaOpenByQuestionId] = useState({});
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
      renderQuestionTools={({ question }) => {
        const isOpen = Boolean(schemaOpenByQuestionId[question.id]);
        const schemaText = getRelevantSchemaForQuestion(question);

        return (
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/8 p-3 sm:p-4">
            <button
              type="button"
              onClick={() =>
                setSchemaOpenByQuestionId((prev) => ({
                  ...prev,
                  [question.id]: !isOpen,
                }))
              }
              className="rounded-full border border-emerald-400/30 bg-emerald-400/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100 transition hover:bg-emerald-400/20"
            >
              {isOpen ? "Hide related schema" : "Check related schema"}
            </button>

            {isOpen ? (
              <div className="mt-3 space-y-4">
                <pre className="max-h-[52vh] overflow-auto whitespace-pre rounded-2xl border border-white/10 bg-slate-950/75 p-3 font-mono text-xs leading-6 text-slate-200 sm:p-4 sm:text-sm">
                  {schemaText}
                </pre>

                <div className="rounded-2xl border border-white/10 bg-slate-950/65 p-3 sm:p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                    DB Diagram
                  </p>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <a
                      href="/assets/DBDiagram1.svg"
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-xl border border-white/10 bg-slate-900/60 p-2 transition hover:border-emerald-400/30"
                    >
                      <Image
                        src="/assets/DBDiagram1.svg"
                        alt="Database diagram (SVG)"
                        width={1400}
                        height={900}
                        className="h-auto w-full rounded-lg"
                      />
                      <p className="mt-2 text-xs text-slate-300">SVG diagram</p>
                    </a>
                    <a
                      href="/assets/DBDiagram.png"
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-xl border border-white/10 bg-slate-900/60 p-2 transition hover:border-emerald-400/30"
                    >
                      <Image
                        src="/assets/DBDiagram.png"
                        alt="Database diagram (PNG)"
                        width={1400}
                        height={900}
                        className="h-auto w-full rounded-lg"
                      />
                      <p className="mt-2 text-xs text-slate-300">PNG diagram</p>
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        );
      }}
    />
  );
}
