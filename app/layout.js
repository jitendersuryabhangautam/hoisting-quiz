import { Geist, Geist_Mono } from "next/font/google";
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
          {`(function(){try{var themeKey='hoisting-quiz-theme';var themeStored=localStorage.getItem(themeKey);var theme=themeStored==='light'||themeStored==='dark'?themeStored:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;var fontKey='hoisting-quiz-font-size';var fontStored=localStorage.getItem(fontKey);var fontSize=fontStored==='sm'||fontStored==='md'||fontStored==='lg'?fontStored:'md';document.documentElement.dataset.fontSize=fontSize;}catch(e){document.documentElement.dataset.theme='dark';document.documentElement.style.colorScheme='dark';document.documentElement.dataset.fontSize='md';}})();`}
        </Script>
      </head>
      <body suppressHydrationWarning className="theme-app min-h-full flex flex-col">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
