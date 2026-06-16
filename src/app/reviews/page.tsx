import type { Metadata } from "next";
import Link from "next/link";
import { KAKAO_OPEN_CHAT } from "@/data/service";

const REVIEWS_DESC =
  "Web Outsourcing One과 함께한 고객들의 후기. 진행해 주신 프로젝트의 솔직한 후기를 모아 소개합니다.";

export const metadata: Metadata = {
  title: "고객 후기",
  description: REVIEWS_DESC,
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "고객 후기 - WOO",
    description: REVIEWS_DESC,
    url: "/reviews",
  },
};

export default function ReviewsPage() {
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
          Reviews
        </p>
        <h1 className="rise rise-2 mt-4 text-[clamp(2.6rem,7.5vw,5.75rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
          고객 후기
        </h1>
        <p className="rise rise-3 mt-6 text-base sm:text-lg text-foreground/80 max-w-xl leading-[1.7]">
          프로젝트를 함께한 고객들의 솔직한 이야기를 모아 소개합니다.
        </p>
      </section>

      {/* 빈 상태 */}
      <section className="py-20 sm:py-28">
        <div className="grid place-items-center rounded-md border border-dashed border-border py-20 sm:py-28 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-5">
            No reviews yet
          </p>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.02em]">
            아직 후기가 없습니다
          </h2>
          <p className="mt-4 max-w-sm text-sm sm:text-base text-muted leading-[1.7]">
            첫 후기의 주인공이 되어 주세요. 프로젝트가 끝나면
            <br />
            이곳에 소중한 후기를 정성껏 담겠습니다.
          </p>
          <a
            href={KAKAO_OPEN_CHAT}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-accent text-white hover:bg-accent/90 rounded-md px-6 py-3.5 text-sm font-semibold transition-colors"
          >
            프로젝트 시작하기 →
          </a>
        </div>
      </section>
    </div>
  );
}
