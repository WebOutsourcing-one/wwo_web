import type { Metadata } from "next";
import Link from "next/link";
import { PricingTable } from "@/components/PricingTable";
import { JsonLd } from "@/components/JsonLd";
import { KAKAO_OPEN_CHAT, pricingNote, packages } from "@/data/service";
import { breadcrumbJsonLd, serviceJsonLd } from "@/data/structured-data";
import { FaqList } from "@/components/FaqList";

const PRICE_DESC = `합리적인 가격, 명확한 범위. ${packages
  .map((p) => `${p.tagline} ${p.priceLabel}`)
  .join(" · ")}. 납품 후 수정·기능 추가 비용까지 미리 공개합니다.`;

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
      <JsonLd data={breadcrumbJsonLd([{ name: "가격", path: "/price" }])} />
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
        <h1 className="rise rise-2 mt-4 text-[clamp(2.6rem,7.5vw,5.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-balance">
          합리적인 가격, 명확한 범위
        </h1>
        <p className="rise rise-3 mt-6 text-base sm:text-lg text-foreground/80 max-w-xl leading-[1.7]">
          보여주는 사이트는 웹 제작, 정보가 쌓이는 서비스는 풀스택 개발로
          진행합니다. 완성 후 운영은 원하실 때만 유지보수로 맡기시면 됩니다.
        </p>
        <p className="rise rise-4 mt-4 text-sm text-muted max-w-xl leading-[1.7]">
          {pricingNote}
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
          FAQ · 자주 묻는 질문
        </p>

        <FaqList />
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
