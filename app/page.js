import Link from "next/link";

const sections = [
  {
    href: "/output",
    title: "Output Questions",
    description:
      "Practice hoisting, scope, closures, async timing, and this-binding by predicting console output.",
    accent: "from-cyan-500/20 to-sky-500/10",
  },
  {
    href: "/implementation",
    title: "Implementation Questions",
    description:
      "Work through array helpers, closures, debounce, grouping, and other code-writing tasks.",
    accent: "from-amber-500/20 to-orange-500/10",
  },
  {
    href: "/theory",
    title: "Theory Questions",
    description:
      "Read concise JavaScript concept questions with direct answers and examples.",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_28%),linear-gradient(180deg,#07111f_0%,#050816_100%)] text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-4xl border border-white/10 bg-white/5 px-6 py-8 shadow-2xl backdrop-blur">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
            JavaScript interview lab
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-5xl">
            Pick a practice mode
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
            The questions are separated now, so output prediction, theory
            review, and implementation drills each live on their own page.
          </p>
        </header>

        <section className="mt-6 grid gap-5 md:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className={`group rounded-4xl border border-white/10 bg-linear-to-br ${section.accent} p-5 transition hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl`}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                Mode
              </p>
              <h2 className="mt-4 text-2xl font-bold text-white">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {section.description}
              </p>
              <p className="mt-6 text-sm font-semibold text-cyan-100">
                Enter practice mode →
              </p>
            </Link>
          ))}
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-4xl border border-white/10 bg-slate-950/50 p-5">
            <h2 className="text-xl font-bold text-white">Why it is split</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Mixing theory, output, and implementation in one stream makes the
              practice feel noisy. Separate modes keep the mental model clean.
            </p>
          </div>
          <div className="rounded-4xl border border-white/10 bg-slate-950/50 p-5">
            <h2 className="text-xl font-bold text-white">How to use it</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Use output mode for execution order, theory mode for concepts, and
              implementation mode to practice writing code from scratch.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
