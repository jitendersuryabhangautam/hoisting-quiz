"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_GROUPS = [
  {
    label: "JavaScript",
    icon: "JS",
    links: [
      { href: "/introduction", label: "Introduction", icon: "IN" },
      { href: "/output", label: "JS Output", icon: "JO" },
      { href: "/theory", label: "JS Theory", icon: "JT" },
      { href: "/implementation", label: "JS Implementation", icon: "JI" },
    ],
  },
  {
    label: "Backend",
    icon: "BE",
    links: [
      { href: "/backend", label: "Backend Theory", icon: "BT" },
      { href: "/nodejs-theory", label: "Node.js Theory", icon: "NT" },
      {
        href: "/backend-implementation",
        label: "Backend Implementation",
        icon: "BI",
      },
    ],
  },
  {
    label: "Database",
    icon: "DB",
    links: [
      { href: "/db-theory", label: "DB Theory", icon: "DT" },
      {
        href: "/postgresql-implementation",
        label: "PG Implementation",
        icon: "PG",
      },
    ],
  },
  {
    label: "Go",
    icon: "GO",
    links: [{ href: "/go-output", label: "Go Output", icon: "GO" }],
  },
  {
    label: "AI",
    icon: "AI",
    links: [
      { href: "/roadmap", label: "AI Roadmap", icon: "AR" },
      {
        href: "/ai-roadmap-yamini",
        label: "AI Roadmap for Yamini",
        icon: "AY",
      },
      {
        href: "/ai-roadmap-jitender",
        label: "AI Roadmap for Jitender",
        icon: "AJ",
      },
    ],
  },
];

const NAV_LINKS = [
  { href: "/", label: "Home", icon: "HM" },
  ...NAV_GROUPS.flatMap((group) => group.links),
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".nav-dropdown")) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openDropdown]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  return (
    <nav className="site-header fixed top-0 left-0 right-0 z-1000 overflow-visible border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
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

      <div className="relative z-1001 mx-auto flex h-14 max-w-7xl items-center justify-between overflow-visible px-3 sm:h-16 sm:px-6 lg:px-8">
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

        <div className="hidden items-center gap-0.5 overflow-visible lg:flex xl:gap-1">
          <Link
            href="/"
            className={`nav-link-motion inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-1.5 text-xs font-medium transition xl:px-2.5 xl:py-2 xl:text-sm ${
              pathname === "/"
                ? "bg-brand-gradient text-white shadow-md shadow-amber-500/20"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <span aria-hidden="true">HM</span>
            Home
          </Link>

          {NAV_GROUPS.map((group) => {
            const isActive = group.links.some((link) => pathname === link.href);
            const isOpen = openDropdown === group.label;

            return (
              <div key={group.label} className="relative nav-dropdown overflow-visible">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(isOpen ? null : group.label)}
                  className={`nav-link-motion inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-1.5 text-xs font-medium transition xl:px-2.5 xl:py-2 xl:text-sm ${
                    isActive
                      ? "bg-brand-gradient text-white shadow-md shadow-amber-500/20"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  <span aria-hidden="true">{group.icon}</span>
                  {group.label}
                  <svg
                    className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="nav-dropdown nav-dropdown-panel absolute left-0 top-full z-1200 mt-1 w-56 rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        data-active={pathname === link.href ? "true" : undefined}
                        className="nav-dropdown-link flex items-center gap-2 px-3 py-2 text-sm transition"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <span aria-hidden="true">{link.icon}</span>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {pathname !== "/" ? <ThemeToggle /> : null}
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
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={`nav-link-motion inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm mb-2 ${
              pathname === "/"
                ? "bg-brand-gradient font-semibold text-white"
                : "text-slate-700 dark:text-slate-300"
            }`}
          >
            <span aria-hidden="true">HM</span>
            Home
          </Link>

          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="mb-4">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <span aria-hidden="true">{group.icon}</span>
                {group.label}
              </h3>
              <div className="ml-6 space-y-1">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`nav-link-motion block rounded-lg px-3 py-2 text-sm ${
                      pathname === link.href
                        ? "bg-brand-gradient font-semibold text-white"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span aria-hidden="true">{link.icon}</span> {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
