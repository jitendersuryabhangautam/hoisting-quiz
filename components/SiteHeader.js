"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/introduction", label: "Introduction", icon: "👤" },
  { href: "/output", label: "JS Output", icon: "🟨" },
  { href: "/theory", label: "JS Theory", icon: "🧠" },
  { href: "/implementation", label: "JS Implementation", icon: "⚙️" },
  { href: "/go-output", label: "Go Output", icon: "🟦" },
  { href: "/backend", label: "Backend Theory", icon: "🏗️" },
  { href: "/backend-implementation", label: "Backend Implementation", icon: "🔧" },
  { href: "/db-theory", label: "DB Theory", icon: "🗃️" },
  { href: "/postgresql-implementation", label: "PG Implementation", icon: "🐘" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  return (
    <nav className="relative sticky top-0 z-50 overflow-hidden border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div aria-hidden="true" className="nav-cartoon-track pointer-events-none">
        <span className="nav-cartoon-runner">
          <svg viewBox="0 0 48 28" className="h-7 w-12" fill="none">
            <rect x="4" y="8" width="30" height="12" rx="6" fill="#38bdf8" />
            <circle cx="14" cy="22" r="4" fill="#0f172a" />
            <circle cx="29" cy="22" r="4" fill="#0f172a" />
            <circle cx="13" cy="14" r="2" fill="#f8fafc" />
            <circle cx="20" cy="14" r="2" fill="#f8fafc" />
            <path d="M37 16h7" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </span>
      </div>
      <div className="relative z-10 mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:h-16 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="nav-logo-badge nav-logo-mark flex h-10 w-10 items-center justify-center rounded-xl text-slate-900">
            <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none">
              <rect x="4" y="4" width="32" height="32" rx="10" fill="#f59e0b" />
              <path d="M13 24h14M15 18h10" stroke="#0f172a" strokeWidth="2.6" strokeLinecap="round" />
              <circle cx="14.5" cy="14.5" r="2.1" fill="#0f172a" />
              <circle cx="25.5" cy="14.5" r="2.1" fill="#0f172a" />
            </svg>
          </span>
          <span className="nav-brand-text hidden text-sm font-semibold uppercase tracking-wide text-slate-900 sm:inline dark:text-slate-100">
            Interview Practice
          </span>
          <span className="nav-brand-text text-xs font-semibold uppercase tracking-wide text-slate-900 sm:hidden dark:text-slate-100">
            Practice
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link-motion inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-1.5 text-xs font-medium transition xl:px-2.5 xl:py-2 xl:text-sm ${
                pathname === link.href
                  ? "bg-brand-gradient text-white shadow-md shadow-amber-500/20"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              <span aria-hidden="true">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="rounded-lg border border-slate-300 px-2.5 py-2 text-sm font-medium lg:hidden dark:border-slate-700"
          >
            Menu
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-slate-200 bg-white px-3 py-3 sm:max-h-[calc(100dvh-4rem)] dark:border-slate-800 dark:bg-slate-950 lg:hidden">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`nav-link-motion inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                  pathname === link.href
                    ? "bg-brand-gradient font-semibold text-white"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                <span aria-hidden="true">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
