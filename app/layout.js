import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
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
  const themeInitScript = `(function(){try{var themeKey='hoisting-quiz-theme';var themeStored=localStorage.getItem(themeKey);var theme=themeStored==='light'||themeStored==='dark'?themeStored:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;var fontKey='hoisting-quiz-font-size';var fontStored=localStorage.getItem(fontKey);var fontSize=fontStored==='sm'||fontStored==='md'||fontStored==='lg'?fontStored:'md';document.documentElement.dataset.fontSize=fontSize;}catch(e){document.documentElement.dataset.theme='dark';document.documentElement.style.colorScheme='dark';document.documentElement.dataset.fontSize='md';}})();`;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head />
      <body
        suppressHydrationWarning
        className="theme-app min-h-full flex flex-col"
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <div
          aria-hidden="true"
          className="global-float-layer pointer-events-none"
        >
          <div className="floating-character floating-character-1">
            <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
              <circle cx="24" cy="24" r="22" fill="rgba(56,189,248,0.22)" />
              <circle cx="18" cy="20" r="2.2" fill="#f8fafc" />
              <circle cx="30" cy="20" r="2.2" fill="#f8fafc" />
              <path
                d="M16 30c2.4 2.2 5.1 3.2 8 3.2s5.6-1 8-3.2"
                stroke="#f8fafc"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="floating-character floating-character-2">
            <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
              <rect
                x="6"
                y="8"
                width="36"
                height="24"
                rx="8"
                fill="rgba(251,191,36,0.22)"
              />
              <circle cx="17" cy="20" r="2" fill="#f8fafc" />
              <circle cx="31" cy="20" r="2" fill="#f8fafc" />
              <path
                d="M16 27h16"
                stroke="#f8fafc"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="floating-character floating-character-3">
            <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none">
              <path
                d="M24 4l17 8v12c0 10-7.5 17-17 20C14.5 41 7 34 7 24V12l17-8z"
                fill="rgba(16,185,129,0.2)"
              />
              <circle cx="18" cy="21" r="2" fill="#f8fafc" />
              <circle cx="30" cy="21" r="2" fill="#f8fafc" />
              <path
                d="M17 29c2.2 2 4.5 3 7 3s4.8-1 7-3"
                stroke="#f8fafc"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <SiteHeader />
        <div className="relative z-0 pt-14 sm:pt-16">{children}</div>
      </body>
    </html>
  );
}
