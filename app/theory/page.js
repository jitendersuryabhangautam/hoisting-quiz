import Link from "next/link";
import { theorySections } from "@/lib/javascriptContent";

export default function TheoryPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.14),_transparent_28%),linear-gradient(180deg,_#140f08_0%,_#0e1220_55%,_#050816_100%)] text-slate-100">
      <div className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-4 lg:px-5">
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
                This page is separate from the practice decks. Use it for quick
                revision of interview concepts and their model answers.
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

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          {theorySections.map((section) => (
            <article
              key={section.title}
              className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-amber-300">
                {section.title}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">
                {section.question}
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {section.answer}
              </p>
              <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Example
                </p>
                <pre className="mt-3 overflow-x-auto text-sm leading-6 text-slate-200">
                  {section.example}
                </pre>
              </div>
              <p className="mt-4 text-sm leading-6 text-amber-100">
                <span className="font-semibold text-white">Takeaway: </span>
                {section.takeaway}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
