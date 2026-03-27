"use client";

import { useState } from "react";

const tabs = [
  { id: "portfolio", label: "Portfolio" },
  { id: "introduction", label: "Introduction" },
  { id: "resume", label: "Resume" },
];

const highlights = [
  "2+ years of full-stack development experience",
  "Production work on India Post IT 2.0 customer-facing systems",
  "Frontend stack: React.js, Next.js, Tailwind CSS, ShadCN UI",
  "Backend stack: Node.js, Golang, PostgreSQL, Redis",
  "Practical experience with Docker and cloud deployment",
];

const stackGroups = [
  {
    title: "Frontend",
    items: "React.js, Next.js, Tailwind CSS, ShadCN UI",
  },
  {
    title: "Backend",
    items: "Node.js, Golang, PostgreSQL, Redis",
  },
  {
    title: "Delivery",
    items: "Docker, cloud deployment, performance optimization",
  },
];

export default function IntroductionTabs({
  introText,
  projectLinks,
  resumePath,
}) {
  const [activeTab, setActiveTab] = useState("portfolio");

  return (
    <main
      className="theme-page-introduction min-h-screen text-slate-100"
      style={{ background: "var(--introduction-background)" }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-4xl border border-white/10 bg-linear-to-br from-rose-500/14 via-white/6 to-sky-500/10 px-6 py-8 shadow-2xl backdrop-blur sm:px-8 sm:py-10">
          <p className="text-xs uppercase tracking-[0.35em] text-rose-200">
            Jitender
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-black tracking-tight text-white sm:text-5xl">
            Full-stack developer with production experience and live projects
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            Explore a portfolio-style overview, the full introduction, and the
            resume preview from one page.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className="rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
                  style={{
                    background: isActive
                      ? "color-mix(in srgb, #f43f5e 18%, var(--surface-muted))"
                      : "color-mix(in srgb, #ffffff 5%, var(--surface-muted))",
                    borderColor: isActive
                      ? "color-mix(in srgb, #f43f5e 36%, var(--border))"
                      : "var(--border)",
                    color: "var(--foreground)",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-6 rounded-4xl border border-white/10 bg-slate-950/45 p-5 shadow-xl sm:p-6">
          {activeTab === "portfolio" ? (
            <div className="space-y-6">
              <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-6 sm:p-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-rose-200">
                    Portfolio Overview
                  </p>
                  <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl">
                    Full-stack developer building production systems and polished web products
                  </h2>
                  <p className="mt-5 max-w-3xl text-sm leading-8 text-slate-200 sm:text-base">
                    I work across frontend, backend, and deployment with a
                    focus on practical product delivery. My current role
                    supports the India Post IT 2.0 Customer Self-Service module,
                    where the software is already live and used for booking,
                    tracking, contracts, and reporting at real scale.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={resumePath}
                      download
                      className="inline-flex items-center justify-center rounded-full border border-rose-300/30 bg-rose-500/15 px-5 py-3 text-sm font-semibold text-rose-100 transition hover:-translate-y-0.5 hover:bg-rose-500/20"
                    >
                      Download Resume
                    </a>
                    <button
                      type="button"
                      onClick={() => setActiveTab("introduction")}
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/20"
                    >
                      Read Full Introduction
                    </button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {highlights.map((item, index) => (
                    <div
                      key={item}
                      className="rounded-3xl border border-white/10 bg-white/5 p-5"
                    >
                      <p className="text-xs uppercase tracking-[0.25em] text-rose-300">
                        0{index + 1}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-100">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-4xl border border-white/10 bg-white/5 p-6 sm:p-7">
                  <p className="text-xs uppercase tracking-[0.3em] text-rose-300">
                    Current Role
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-white">
                    National Institute for Smart Government
                  </h3>
                  <p className="mt-2 text-sm text-rose-200">
                    Centre of Excellence in Postal Technologies
                  </p>
                  <p className="mt-5 text-sm leading-8 text-slate-300 sm:text-base">
                    I contribute to the Customer Self-Service module under the
                    India Post IT 2.0 initiative. The work includes customer
                    flows for booking articles, tracking consignments, creating
                    contracts, and generating reports, which has given me
                    strong exposure to real users, live systems, and production
                    reliability.
                  </p>
                </div>

                <div className="rounded-4xl border border-white/10 bg-white/5 p-6 sm:p-7">
                  <p className="text-xs uppercase tracking-[0.3em] text-rose-300">
                    Capabilities
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-white">
                    Stack and delivery focus
                  </h3>
                  <div className="mt-5 grid gap-4">
                    {stackGroups.map((group) => (
                      <div
                        key={group.title}
                        className="rounded-3xl border border-white/10 bg-white/5 p-4"
                      >
                        <p className="text-sm font-semibold text-white">
                          {group.title}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-slate-300">
                          {group.items}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-4xl border border-white/10 bg-white/5 p-6 sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-rose-300">
                      Selected Projects
                    </p>
                    <h3 className="mt-3 text-2xl font-bold text-white">
                      Live builds and portfolio links
                    </h3>
                  </div>
                  <p className="max-w-xl text-sm leading-7 text-slate-300">
                    Personal projects across UI implementation, product
                    interfaces, and interview preparation tools.
                  </p>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {projectLinks.map((project) => (
                    <a
                      key={project.href}
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/8 hover:shadow-xl"
                    >
                      <p className="text-xs uppercase tracking-[0.25em] text-rose-300">
                        Project
                      </p>
                      <p className="mt-3 text-lg font-semibold text-white">
                        {project.name}
                      </p>
                      <p className="mt-3 break-all text-sm leading-6 text-slate-300 transition group-hover:text-slate-200">
                        {project.href}
                      </p>
                      <p className="mt-5 text-sm font-semibold text-rose-200">
                        Visit project -&gt;
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === "introduction" ? (
            <div>
              <h2 className="text-2xl font-bold text-white">Full introduction</h2>
              <p className="mt-6 max-w-5xl text-sm leading-8 text-slate-200 sm:text-[1.02rem]">
                {introText}
              </p>
            </div>
          ) : null}

          {activeTab === "resume" ? (
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Resume</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                    Preview the resume directly here or download the PDF.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={resumePath}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/8 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/20"
                  >
                    Open Resume
                  </a>
                  <a
                    href={resumePath}
                    download
                    className="inline-flex items-center justify-center rounded-full border border-rose-300/30 bg-rose-500/15 px-5 py-3 text-sm font-semibold text-rose-100 transition hover:-translate-y-0.5 hover:bg-rose-500/20"
                  >
                    Download Resume
                  </a>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white">
                <object
                  data={resumePath}
                  type="application/pdf"
                  className="h-[70vh] w-full"
                >
                  <div className="flex h-[70vh] flex-col items-center justify-center gap-4 bg-slate-100 px-6 text-center">
                    <p className="max-w-xl text-sm leading-7 text-slate-700 sm:text-base">
                      Inline PDF preview is not available in this browser. Use
                      the buttons above to open or download the resume.
                    </p>
                    <a
                      href={resumePath}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-rose-300 bg-rose-50 px-5 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                    >
                      Open Resume PDF
                    </a>
                  </div>
                </object>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
