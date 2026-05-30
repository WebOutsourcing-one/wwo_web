import Link from "next/link";
import { TechStack } from "@/components/TechStack";
import { PricingTable } from "@/components/PricingTable";
import {
  SERVICE_TAGLINE,
  KAKAO_OPEN_CHAT,
  serviceOverview,
  basicServices,
  techStackNote,
  paidServices,
  processSteps,
  clientPrep,
  clientPrepNote,
} from "@/data/service";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-10">
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section className="relative pt-16 pb-14 sm:pt-24 sm:pb-20 border-b border-border">
        <div className="rise rise-1 flex items-center gap-3 mb-10">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <p className="text-[11px] font-mono tracking-[0.22em] text-muted uppercase">
            Available for projects
          </p>
        </div>

        <h1 className="rise rise-2 text-[clamp(2.6rem,7.5vw,5.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] max-w-[18ch]">
          {SERVICE_TAGLINE}
        </h1>

        <div className="rise rise-3 mt-10 flex flex-wrap items-center gap-3">
          <a
            href={KAKAO_OPEN_CHAT}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-white hover:bg-accent/90 rounded-md px-6 py-3.5 text-sm font-semibold transition-colors"
          >
            무료 상담 시작하기 →
          </a>
          <Link
            href="/portfolio"
            className="border border-border hover:border-accent hover:text-accent rounded-md px-6 py-3.5 text-sm font-medium transition-colors"
          >
            포트폴리오 보기
          </Link>
        </div>
      </section>

      {/* ── 2. 서비스 개요 ──────────────────────────────────── */}
      <section
        id="service"
        className="py-14 sm:py-20 border-b border-border scroll-mt-20"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
          Service · 서비스 소개
        </p>
        <h2 className="text-3xl sm:text-5xl font-medium tracking-[-0.02em] leading-[1.05] mb-8 max-w-[18ch]">
          단순히 텍스트만 바꾸는
          <br />
          홈페이지가 아닙니다.
        </h2>
        <div className="space-y-4 max-w-2xl">
          {serviceOverview.paragraphs.map((para, i) => (
            <p key={i} className="text-base text-foreground/75 leading-[1.7]">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* ── 3. 기본 포함 사항 ───────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
          Included · 기본 포함 사항
        </p>
        <h2 className="text-3xl sm:text-5xl font-medium tracking-[-0.02em] leading-[1.05] mb-12">
          추가 비용 없이 포함됩니다.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {basicServices.map((item, i) => (
            <div key={item.title}>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-base font-medium tracking-tight mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-foreground/75 leading-[1.7]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. 기술 스택 ────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
          Tech Stack · 사용 기술
        </p>
        <h2 className="text-3xl sm:text-5xl font-medium tracking-[-0.02em] leading-[1.05] mb-6">
          검증된 기술로 튼튼하게.
        </h2>
        <p className="text-base text-foreground/75 leading-[1.7] max-w-2xl mb-12 sm:mb-14">
          {techStackNote}
        </p>

        <TechStack />
      </section>

      {/* ── 5. 진행 절차 ────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
          Process · 진행 절차
        </p>
        <h2 className="text-3xl sm:text-5xl font-medium tracking-[-0.02em] leading-[1.05] mb-12 sm:mb-16">
          투명하고 체계적인 {processSteps.length}단계.
        </h2>

        <div className="divide-y divide-border">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 py-8"
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
                <h3 className="text-lg font-medium tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-foreground/75 leading-[1.7] max-w-2xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. 준비사항 ─────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
          Checklist · 준비사항
        </p>
        <h2 className="text-3xl sm:text-5xl font-medium tracking-[-0.02em] leading-[1.05] mb-5">
          미리 준비해 주시면 좋아요.
        </h2>
        <p className="text-base text-foreground/75 leading-[1.7] max-w-2xl mb-12 sm:mb-14">
          {clientPrepNote}
        </p>

        <ol className="divide-y divide-border">
          {clientPrep.map((item, idx) => (
            <li
              key={item.title}
              className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 py-8"
            >
              <div className="shrink-0 sm:w-24">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted block mb-1">
                  Item
                </span>
                <span className="font-mono text-4xl sm:text-5xl font-bold text-foreground/10 leading-none tabular-nums select-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-medium tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/75 leading-[1.7] max-w-2xl">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── 7. 유료 옵션 ────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
          Optional · 유료 서비스
        </p>
        <h2 className="text-3xl sm:text-5xl font-medium tracking-[-0.02em] leading-[1.05] mb-3 sm:mb-4">
          선택적으로 추가할 수 있어요.
        </h2>
        <p className="text-sm text-muted leading-relaxed mb-12 sm:mb-14 max-w-xl">
          아래 항목은 의뢰인께서 직접 결제하시는 외부 서비스입니다. 필요 여부는
          상담 시 함께 결정합니다.
        </p>

        <div className="divide-y divide-border">
          {paidServices.map((item, idx) => (
            <div
              key={item.title}
              className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 py-8"
            >
              <div className="shrink-0 sm:w-24">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted block mb-1">
                  Option
                </span>
                <span className="font-mono text-4xl sm:text-5xl font-bold text-foreground/10 leading-none tabular-nums select-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-medium tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/75 leading-[1.7] max-w-2xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. 가격 ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
          Pricing · 패키지
        </p>
        <h2 className="text-3xl sm:text-5xl font-medium tracking-[-0.02em] leading-[1.05] mb-4">
          명확한 가격.
          <br />
          숨겨진 비용 없음.
        </h2>
        <p className="text-base text-foreground/75 leading-[1.7] max-w-xl mb-12">
          패키지를 선택하시면 상세 구성과 비교 내용을 확인하실 수 있습니다.
        </p>

        <PricingTable />
      </section>

      {/* ── 9. 포트폴리오 티저 ──────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
          Portfolio · 작업물
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <h2 className="text-3xl sm:text-5xl font-medium tracking-[-0.02em] leading-[1.05] max-w-[20ch]">
            직접 만든 웹 프로젝트들을 확인해 보세요.
          </h2>
          <Link
            href="/portfolio"
            className="shrink-0 bg-accent text-white hover:bg-accent/90 rounded-md px-6 py-3.5 text-sm font-semibold transition-colors self-start"
          >
            포트폴리오 보기 →
          </Link>
        </div>
      </section>

      {/* ── 10. 마무리 CTA ──────────────────────────────────── */}
      <section className="py-14 sm:py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
          Contact · 문의
        </p>
        <h2 className="text-3xl sm:text-5xl font-medium tracking-[-0.02em] leading-[1.05] mb-8 max-w-[22ch]">
          기획이 없어도 괜찮습니다.
          <br />
          함께 만들어 드립니다.
        </h2>
        <p className="mb-10 max-w-lg text-base text-foreground/75 leading-[1.7]">
          {serviceOverview.paragraphs[1]}
        </p>
        <a
          href={KAKAO_OPEN_CHAT}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent/90 rounded-md px-8 py-4 text-sm font-semibold transition-colors"
        >
          카카오톡으로 문의하기 →
        </a>
      </section>
    </div>
  );
}
