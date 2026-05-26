import type { Metadata } from "next";
import { Hahmlet, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const hahmlet = Hahmlet({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WOO — Web Outsourcing One",
  description: "Selected works by Web Outsourcing One (WOO)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${hahmlet.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground relative">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[1] opacity-[0.06] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='3'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-baseline gap-3 tracking-tight group"
            >
              <span className="text-lg font-bold">WOO</span>
              <span className="hidden sm:inline text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
                Web Outsourcing One
              </span>
            </Link>
            <nav className="flex items-center gap-8 text-sm">
              <Link
                href="/"
                className="text-muted hover:text-foreground transition-colors"
              >
                Works
              </Link>
              <a
                href="https://open.kakao.com/o/s46m1jvi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:opacity-70 transition-opacity"
              >
                Contact ↗
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1 relative z-[2]">{children}</main>
        <footer className="border-t border-border mt-16 relative z-[2]">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex flex-col gap-1">
              <span className="font-mono uppercase tracking-[0.18em] text-muted">
                © 2026 — Web Outsourcing One
              </span>
              <span className="text-muted/80">Built carefully in Seoul.</span>
            </div>
            <a
              href="https://open.kakao.com/o/s46m1jvi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted hover:text-foreground transition-colors"
            >
              Start a project →
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
