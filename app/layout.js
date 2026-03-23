import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const navLinkClass =
  "rounded-full border px-4 py-2 text-sm font-semibold transition hover:opacity-95";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "JavaScript Interview Lab",
  description:
    "Randomized JavaScript practice with output, concept, and implementation questions.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var key='hoisting-quiz-theme';var stored=localStorage.getItem(key);var theme=stored==='light'||stored==='dark'?stored:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;}catch(e){document.documentElement.dataset.theme='dark';document.documentElement.style.colorScheme='dark';}})();`}
        </Script>
      </head>
      <body suppressHydrationWarning className="theme-app min-h-full flex flex-col">
        <header
          className="sticky top-0 z-50 border-b backdrop-blur"
          style={{ background: "var(--surface-strong)", borderColor: "var(--border)" }}
        >
          <div className="mx-auto flex w-full max-w-384 flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-4 lg:px-5">
            <Link
              href="/"
              className="text-sm font-black tracking-[0.25em] text-[color:var(--foreground)]"
            >
              JS LAB
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <ThemeToggle />
              <nav className="flex flex-wrap gap-2 text-sm font-semibold">
                <Link
                  href="/output"
                  className={navLinkClass}
                  style={{
                    background: "color-mix(in srgb, #06b6d4 12%, var(--surface-muted))",
                    borderColor: "color-mix(in srgb, #06b6d4 30%, var(--border))",
                    color: "var(--foreground)",
                  }}
                >
                  Output
                </Link>
                <Link
                  href="/implementation"
                  className={navLinkClass}
                  style={{
                    background: "color-mix(in srgb, #f59e0b 12%, var(--surface-muted))",
                    borderColor: "color-mix(in srgb, #f59e0b 30%, var(--border))",
                    color: "var(--foreground)",
                  }}
                >
                  Implementation
                </Link>
                <Link
                  href="/theory"
                  className={navLinkClass}
                  style={{
                    background: "color-mix(in srgb, #10b981 12%, var(--surface-muted))",
                    borderColor: "color-mix(in srgb, #10b981 30%, var(--border))",
                    color: "var(--foreground)",
                  }}
                >
                  Theory
                </Link>
                <Link
                  href="/backend"
                  className={navLinkClass}
                  style={{
                    background: "color-mix(in srgb, #84cc16 12%, var(--surface-muted))",
                    borderColor: "color-mix(in srgb, #84cc16 30%, var(--border))",
                    color: "var(--foreground)",
                  }}
                >
                  Backend
                </Link>
              </nav>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
