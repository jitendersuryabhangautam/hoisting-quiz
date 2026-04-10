"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

const STORAGE_KEY = "hoisting-quiz-font-size";
const FONT_SIZES = ["sm", "md", "lg"];

function applyFontSize(size) {
  document.documentElement.dataset.fontSize = size;
}

function getNextSize(size) {
  const index = FONT_SIZES.indexOf(size);
  return FONT_SIZES[(index + 1) % FONT_SIZES.length] ?? "md";
}

function getLabel(size) {
  if (size === "sm") return "A-";
  if (size === "lg") return "A+";
  return "A";
}

export default function FontSizeToggle() {
  const [size, setSize] = useState("md");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const next =
      stored === "sm" || stored === "md" || stored === "lg" ? stored : "md";
    setSize(next);
    applyFontSize(next);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(STORAGE_KEY, size);
    applyFontSize(size);
  }, [mounted, size]);

  const nextSize = getNextSize(size);

  return (
    <button
      type="button"
      aria-label={`Switch font size to ${nextSize}`}
      onClick={() => setSize(nextSize)}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border text-xs font-bold shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition hover:-translate-y-px hover:shadow-[0_14px_28px_rgba(15,23,42,0.16)]"
      style={{
        background: "var(--surface-strong)",
        borderColor: "var(--border)",
        color: "var(--foreground)",
      }}
      title={`Font size: ${mounted ? size.toUpperCase() : "MD"}`}
    >
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-semibold"
        style={{
          background: "color-mix(in srgb, #22c55e 14%, var(--surface-muted))",
          borderColor: "color-mix(in srgb, #22c55e 28%, var(--border))",
          color: "var(--foreground)",
        }}
      >
        {mounted ? getLabel(size) : "A"}
      </span>
    </button>
  );
}

