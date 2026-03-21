import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

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
  description: "Randomized JavaScript practice with output, concept, and implementation questions.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="text-sm font-black tracking-[0.25em] text-white">
              JS LAB
            </Link>
            <nav className="flex flex-wrap gap-2 text-sm font-semibold">
              <Link
                href="/output"
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-cyan-100 transition hover:bg-cyan-400/20"
              >
                Output
              </Link>
              <Link
                href="/implementation"
                className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-amber-100 transition hover:bg-amber-400/20"
              >
                Implementation
              </Link>
              <Link
                href="/theory"
                className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-emerald-100 transition hover:bg-emerald-400/20"
              >
                Theory
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
