import type { Metadata } from "next";
import Link from "next/link";
import { PricingTable } from "@/components/PricingTable";
import { JsonLd } from "@/components/JsonLd";
import { KAKAO_OPEN_CHAT, pricingNote } from "@/data/service";
import { serviceJsonLd } from "@/data/structured-data";

const PRICE_DESC =
  "합리적인 가격, 명확한 범위. STANDARD · DELUXE · PREMIUM · ENTERPRISE 패키지를 비교하고 나에게 맞는 옵션을 선택하세요.";

export const metadata: Metadata = {
  title: "패키지 안내",
  description: PRICE_DESC,
  alternates: { canonical: "/price" },
  openGraph: {
    title: "패키지 안내 - WOO",
    description: PRICE_DESC,
    url: "/price",
  },
};

export default function PricePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-10">
      <JsonLd data={serviceJsonLd} />
      {/* 헤더 */}
      <section className="relative pt-10 pb-14 sm:pt-14 sm:pb-20 border-b border-border">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-8 group"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-1">
            ←
          </span>{" "}
          <span className="font-mono text-[11px] uppercase tracking-[0.22em]">
            Home
          </span>
        </Link>

        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted rise rise-1">
          Pricing
        </p>
        <h1 className="rise rise-2 mt-4 text-[clamp(2.6rem,7.5vw,5.75rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
          합리적인 가격,
          <br />
          명확한 범위
        </h1>
        <p className="rise rise-3 mt-6 text-base sm:text-lg text-foreground/80 max-w-xl leading-[1.7]">
          세 가지 패키지 중 작업 범위에 맞는 옵션을 선택하시면 됩니다.
          정확한 견적은 상담 후 안내해 드리니, 먼저 아래 비교표를 참고해 보세요.
        </p>
      </section>

      {/* 공통 안내 */}
      <section className="py-14 sm:py-20 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-8">
          Package · Overview
        </p>

        <p className="text-base text-foreground/80 leading-[1.7] max-w-2xl">
          {pricingNote}
        </p>

        <p className="mt-4 text-sm text-muted leading-[1.7] max-w-2xl">
          아래에서 패키지를 선택하시면 상세 구성과 비교 내용을 확인하실 수 있습니다.
        </p>
      </section>

      {/* 가격표 */}
      <section className="py-14 sm:py-20 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-10">
          Pricing · Table
        </p>
        <PricingTable showNote={false} />
      </section>

      {/* 안내 / FAQ */}
      <section className="py-14 sm:py-20 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-8">
          안내 사항
        </p>

        <dl className="divide-y divide-border max-w-2xl">
          <div className="py-5">
            <dt className="text-sm font-medium tracking-tight mb-1.5">
              견적은 상담 후 확정됩니다
            </dt>
            <dd className="text-sm text-foreground/75 leading-[1.7]">
              위 패키지는 기준 가이드이며, 실제 작업 범위와 요구사항에 따라
              최종 견적이 달라질 수 있습니다. 레퍼런스나 기획안을 가볍게 공유해
              주시면 빠르게 안내해 드립니다.
            </dd>
          </div>
          <div className="py-5">
            <dt className="text-sm font-medium tracking-tight mb-1.5">
              기획안이 없어도 괜찮습니다
            </dt>
            <dd className="text-sm text-foreground/75 leading-[1.7]">
              아이디어 단계여도 괜찮습니다. 편하게 말씀해 주시면 방향성을
              함께 잡아 나가며 진행합니다.
            </dd>
          </div>
        </dl>
      </section>

      {/* 마무리 CTA */}
      <section className="py-14 sm:py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
          Get Started
        </p>
        <h2 className="text-3xl sm:text-5xl font-medium tracking-[-0.02em] mb-8 max-w-lg leading-[1.1]">
          지금 바로 무료 상담을 시작해 보세요
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <a
            href={KAKAO_OPEN_CHAT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent/90 rounded-md px-6 py-3.5 text-sm font-semibold tracking-tight transition-colors"
          >
            카카오톡으로 문의하기
            <span aria-hidden>→</span>
          </a>
          <Link
            href="/#service"
            className="inline-flex items-center gap-2 border border-border hover:border-accent hover:text-accent rounded-md px-6 py-3.5 text-sm font-medium tracking-tight transition-colors"
          >
            서비스 소개 보기
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
