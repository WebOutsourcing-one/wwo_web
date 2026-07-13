import type { Metadata } from "next";
import { Hahmlet, JetBrains_Mono } from "next/font/google";
import { SITE_URL } from "@/data/service";
import { siteJsonLd } from "@/data/structured-data";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
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

const SITE_DESC =
  "템플릿이 아닌 맞춤 제작 홈페이지. 기획 상담부터 배포까지 한 사람이 끝까지 책임집니다. Next.js 기반 반응형·SEO 최적화 홈페이지 외주 제작.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "WOO - 합리적인 홈페이지 외주 제작",
    template: "%s - WOO",
  },
  description: SITE_DESC,
  keywords: [
    "홈페이지 제작",
    "홈페이지 외주",
    "웹 외주",
    "반응형 웹 제작",
    "랜딩페이지 제작",
    "Next.js 개발",
    "소개형 홈페이지",
    "기업 홈페이지 제작",
  ],
  authors: [{ name: "Web Outsourcing One" }],
  creator: "Web Outsourcing One",
  alternates: { canonical: "/" },
  verification: {
    google: "GeiP0qQIZ-uRqlzCbr_OzPFUrV6cTeSMYVjsxLcHYWQ",
    other: {
      "naver-site-verification": "adb2397197f332db604545d8f074409dde6c8966",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "WOO - Web Outsourcing One",
    title: "WOO - 합리적인 홈페이지 외주 제작",
    description: SITE_DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: "WOO - 합리적인 홈페이지 외주 제작",
    description: SITE_DESC,
  },
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
        <JsonLd data={siteJsonLd} />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[1] opacity-[0.06] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='3'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        <SiteHeader />
        <main className="flex-1 relative z-[2]">{children}</main>
        <footer className="border-t border-border mt-16 relative z-[2]">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex flex-col gap-1">
              <span className="font-mono uppercase tracking-[0.18em] text-muted">
                © 2026 - Web Outsourcing One
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
