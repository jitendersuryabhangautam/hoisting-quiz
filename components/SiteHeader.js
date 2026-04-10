"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import FontSizeToggle from "@/components/FontSizeToggle";

const navGroups = [
  {
    id: "introduction",
    label: "Introduction",
    accent: "#f43f5e",
    items: [{ href: "/introduction", label: "Introduction" }],
  },
  {
    id: "javascript",
    label: "JavaScript",
    accent: "#06b6d4",
    items: [
      { href: "/output", label: "JS Output" },
      { href: "/implementation", label: "JS Implementation" },
      { href: "/theory", label: "JS Theory" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    accent: "#14b8a6",
    items: [
      { href: "/go-output", label: "Go Output" },
      { href: "/backend", label: "Backend Theory" },
      { href: "/backend-implementation", label: "Backend Implementation" },
    ],
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    accent: "#22c55e",
    items: [
      { href: "/db-theory", label: "DB Theory" },
      { href: "/postgresql-implementation", label: "PG Implementation" },
    ],
  },
];

const navButtonBase =
  "rounded-full border px-4 py-2 text-sm font-semibold transition hover:opacity-95";

function NavLink({ href, label, accent, mobile = false, onNavigate }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`${navButtonBase} ${mobile ? "w-full justify-center text-center" : ""}`}
      style={{
        display: "inline-flex",
        background: `color-mix(in srgb, ${accent} 12%, var(--surface-muted))`,
        borderColor: `color-mix(in srgb, ${accent} 30%, var(--border))`,
        color: "var(--foreground)",
      }}
    >
      {label}
    </Link>
  );
}

function HomeLink({ mobile = false, onNavigate }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={`${navButtonBase} ${mobile ? "w-full justify-center text-center" : ""}`}
      style={{
        display: "inline-flex",
        background: "color-mix(in srgb, #38bdf8 12%, var(--surface-muted))",
        borderColor: "color-mix(in srgb, #38bdf8 30%, var(--border))",
        color: "var(--foreground)",
      }}
    >
      Home
    </Link>
  );
}

function GroupNav({ group }) {
  if (group.items.length === 1) {
    return (
      <NavLink
        href={group.items[0].href}
        label={group.label}
        accent={group.accent}
      />
    );
  }

  return (
    <div className="group relative">
      <button
        type="button"
        className={navButtonBase}
        style={{
          display: "inline-flex",
          background: `color-mix(in srgb, ${group.accent} 12%, var(--surface-muted))`,
          borderColor: `color-mix(in srgb, ${group.accent} 30%, var(--border))`,
          color: "var(--foreground)",
        }}
      >
        {group.label}
      </button>

      <div className="invisible absolute right-0 top-[calc(100%+0.45rem)] z-50 min-w-[16rem] rounded-2xl border border-white/10 bg-slate-950/95 p-2 opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="flex flex-col gap-2">
          {group.items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              accent={group.accent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{
        background: "var(--surface-strong)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto flex w-full max-w-384 items-center gap-3 px-3 py-2.5 sm:px-4 lg:px-5">
        <Link
          href="/"
          className="text-sm font-black tracking-[0.25em] text-[color:var(--foreground)]"
          onClick={closeMenu}
        >
          JS LAB
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <nav className="hidden flex-wrap gap-2 text-sm font-semibold md:flex">
            <HomeLink />
            {navGroups.map((group) => (
              <GroupNav key={group.id} group={group} />
            ))}
          </nav>

          <ThemeToggle />
          <FontSizeToggle />

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border text-xs font-bold shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition hover:-translate-y-px hover:shadow-[0_14px_28px_rgba(15,23,42,0.16)] md:hidden"
            style={{
              background: "var(--surface-strong)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-[80] md:hidden">
          <button
            type="button"
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={closeMenu}
          />
          <div className="relative z-10 mx-auto mt-3 w-[min(96vw,28rem)] max-h-[calc(100dvh-1.5rem)] overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--surface-strong)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Menu
              </p>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10"
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
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto px-3 py-3">
              <div className="flex flex-col gap-3">
                <HomeLink mobile onNavigate={closeMenu} />

                {navGroups.map((group) => (
                  <div
                    key={group.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-2"
                  >
                    <p
                      className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.2em]"
                      style={{ color: group.accent }}
                    >
                      {group.label}
                    </p>
                    <div className="flex flex-col gap-2">
                      {group.items.map((item) => (
                        <NavLink
                          key={item.href}
                          href={item.href}
                          label={item.label}
                          accent={group.accent}
                          mobile
                          onNavigate={closeMenu}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
