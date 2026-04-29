"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

const STORAGE_KEY = "hoisting-quiz-theme";

function getSystemTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    const nextTheme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : getSystemTheme();

    setTheme(nextTheme);
    setMounted(true);
    applyTheme(nextTheme);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  }, [mounted, theme]);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextTheme} theme`}
      aria-pressed={mounted ? theme === "dark" : false}
      onClick={() => setTheme(nextTheme)}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition hover:-translate-y-px hover:shadow-[0_14px_28px_rgba(15,23,42,0.16)]"
      style={{
        background: "var(--surface-strong)",
        borderColor: "var(--border)",
        color: "var(--foreground)",
      }}
    >
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border text-base transition-transform duration-200"
        style={{
          background:
            theme === "dark"
              ? "color-mix(in srgb, #06b6d4 18%, var(--surface-muted))"
              : "color-mix(in srgb, #f59e0b 18%, var(--surface-muted))",
          borderColor:
            theme === "dark"
              ? "color-mix(in srgb, #06b6d4 28%, var(--border))"
              : "color-mix(in srgb, #f59e0b 28%, var(--border))",
          color: "var(--foreground)",
        }}
        aria-hidden="true"
      >
        {mounted ? (theme === "dark" ? "\u263E" : "\u2600") : "\u25D0"}
      </span>
    </button>
  );
}

