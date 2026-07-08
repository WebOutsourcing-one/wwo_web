import type { Metadata } from "next";
import Link from "next/link";
import { KAKAO_OPEN_CHAT, productionProcess } from "@/data/service";

const PROCESS_DESC =
  "상담부터 오픈·유지보수까지 4단계. 복잡한 준비 없이 뼈대 자료만 주시면 호스팅·도메인·유지보수까지 한 번에 해결하는 구독형 홈페이지 제작 과정을 안내합니다.";

export const metadata: Metadata = {
  title: "제작 과정",
  description: PROCESS_DESC,
  alternates: { canonical: "/process" },
  openGraph: {
    title: "제작 과정 - WOO",
    description: PROCESS_DESC,
    url: "/process",
  },
};

export default function ProcessPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-10">
      {/* 헤더 */}
      <section className="relative pt-10 pb-14 sm:pt-14 sm:pb-20 border-b border-border">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-8 group"
        >
          <span
            aria-hidden
            className="transition-transform group-hover:-translate-x-1"
          >
            ←
          </span>{" "}
          <span className="font-mono text-[11px] uppercase tracking-[0.22em]">
            Home
          </span>
        </Link>

        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted rise rise-1">
          Process
        </p>
        <h1 className="rise rise-2 mt-4 text-[clamp(2.6rem,7.5vw,5.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-balance">
          상담부터 오픈까지, {productionProcess.length}단계면 끝.
        </h1>
        <p className="rise rise-3 mt-6 text-base sm:text-lg text-foreground/80 max-w-xl leading-[1.7]">
          복잡한 준비 없이 뼈대 자료만 주시면
          호스팅·도메인·유지보수까지 저희가 한 번에 책임집니다.
        </p>
      </section>

      {/* 단계 목록 */}
      <section className="py-14 sm:py-20 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-12 sm:mb-16">
          Steps · 진행 단계
        </p>

        <ol className="divide-y divide-border">
          {productionProcess.map((step) => (
            <li
              key={step.step}
              className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 py-10 sm:py-12"
            >
              <div className="shrink-0 sm:w-24">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted block mb-1">
                  Step
                </span>
                <span className="font-mono text-4xl sm:text-5xl font-bold text-foreground/10 leading-none tabular-nums select-none">
                  {String(step.step).padStart(2, "0")}
                </span>
              </div>
              <div className="flex-1 pt-1">
                <h2 className="text-xl sm:text-2xl font-medium tracking-tight mb-2">
                  {step.title}
                </h2>
                <p className="text-base text-accent/90 font-medium leading-[1.6] mb-5">
                  {step.lead}
                </p>
                <ul className="space-y-3 max-w-5xl">
                  {step.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm sm:text-base text-foreground/80"
                    >
                      <span aria-hidden className="mt-0.5 text-accent shrink-0">
                        ✓
                      </span>
                      <span className="leading-[1.7]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 마무리 CTA */}
      <section className="py-14 sm:py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
          Get Started
        </p>
        <h2 className="text-3xl sm:text-5xl font-medium tracking-[-0.02em] mb-8 max-w-[20ch] leading-[1.1] text-balance">
          홈페이지는 맡기시고, 대표님은 본업에 집중하세요.
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <a
            href={KAKAO_OPEN_CHAT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent/90 rounded-md px-6 py-3.5 text-sm font-semibold tracking-tight transition-colors"
          >
            카카오톡으로 상담 시작하기
            <span aria-hidden>→</span>
          </a>
          <Link
            href="/price"
            className="inline-flex items-center gap-2 border border-border hover:border-accent hover:text-accent rounded-md px-6 py-3.5 text-sm font-medium tracking-tight transition-colors"
          >
            패키지·가격 보기
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
