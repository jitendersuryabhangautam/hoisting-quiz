import Link from "next/link";

const sections = [
  {
    href: "/introduction",
    title: "Introduction",
    description:
      "A concise personal introduction covering your experience, current role, stack, and project impact.",
    accent: "from-rose-500/20 to-pink-500/10",
  },
  {
    href: "/output",
    title: "JavaScript Output Questions",
    description:
      "Practice hoisting, scope, closures, async timing, and this-binding by predicting console output.",
    accent: "from-cyan-500/20 to-sky-500/10",
  },
  {
    href: "/go-output",
    title: "Go Output Questions",
    description:
      "Practice Go scoping, defer order, goroutines, slices, maps, interfaces, and select behavior by predicting output.",
    accent: "from-green-500/20 to-emerald-500/10",
  },
  {
    href: "/implementation",
    title: "JavaScript Implementation",
    description:
      "Work through JavaScript coding tasks like array helpers, closures, debounce, grouping, and algorithmic patterns.",
    accent: "from-amber-500/20 to-orange-500/10",
  },
  {
    href: "/theory",
    title: "JavaScript Theory Questions",
    description:
      "Read concise JavaScript concept questions with direct answers and examples.",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    href: "/backend",
    title: "Backend Theory Questions",
    description:
      "Focus on Go and PostgreSQL concepts for backend interview prep.",
    accent: "from-lime-500/20 to-green-500/10",
  },
  {
    href: "/backend-implementation",
    title: "Backend Implementation Questions",
    description:
      "Practice 100 backend implementation tasks in serial order, with optional shuffle.",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
];

export default function Home() {
  return (
    <main
      className="theme-page-home min-h-screen text-slate-100"
      style={{ background: "var(--home-background)" }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[96rem] flex-col px-3 py-6 sm:px-4 lg:px-5">
        <header className="rounded-4xl border border-white/10 bg-white/5 px-5 py-8 shadow-2xl backdrop-blur">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
            JavaScript interview lab
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-5xl">
            Pick a practice mode
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
            The questions are separated now, so output prediction, theory
            review, backend prep, and implementation drills each live on their
            own page.
          </p>
        </header>

        <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
                Enter practice mode -&gt;
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
              Use output mode for execution order, theory mode for concepts,
              backend mode for Go and PostgreSQL, and implementation mode to
              practice writing code from scratch.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
