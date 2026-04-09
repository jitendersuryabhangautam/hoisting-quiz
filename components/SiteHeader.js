"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  {
    href: "/introduction",
    label: "Introduction",
    accent: "#f43f5e",
  },
  {
    href: "/output",
    label: "Output",
    accent: "#06b6d4",
  },
  {
    href: "/go-output",
    label: "Go Output",
    accent: "#10b981",
  },
  {
    href: "/implementation",
    label: "Implementation",
    accent: "#f59e0b",
  },
  {
    href: "/theory",
    label: "Theory",
    accent: "#10b981",
  },
  {
    href: "/backend",
    label: "Backend",
    accent: "#84cc16",
  },
  {
    href: "/backend-implementation",
    label: "Backend Impl",
    accent: "#14b8a6",
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
        display: mobile ? "inline-flex" : "inline-flex",
        background: `color-mix(in srgb, ${accent} 12%, var(--surface-muted))`,
        borderColor: `color-mix(in srgb, ${accent} 30%, var(--border))`,
        color: "var(--foreground)",
      }}
    >
      {label}
    </Link>
  );
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{ background: "var(--surface-strong)", borderColor: "var(--border)" }}
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
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} accent={item.accent} />
            ))}
          </nav>

          <ThemeToggle />

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border text-[1.05rem] font-bold shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition hover:-translate-y-px hover:shadow-[0_14px_28px_rgba(15,23,42,0.16)] md:hidden"
            style={{
              background: "var(--surface-strong)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          >
            <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>

      </div>

      {menuOpen ? (
        <div className="border-t md:hidden" style={{ borderColor: "var(--border)" }}>
          <div className="mx-auto flex w-full max-w-384 flex-col gap-2 px-3 py-3 sm:px-4 lg:px-5">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                accent={item.accent}
                mobile
                onNavigate={closeMenu}
              />
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
