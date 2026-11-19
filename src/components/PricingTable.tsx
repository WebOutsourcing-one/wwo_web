"use client";

import { useState } from "react";
import {
  packages,
  comparisonRows,
  paidServices,
  pricingNote,
  scopeGuide,
  scopeGuideIntro,
  scopeGuideRule,
  afterCareRows,
  afterCareNotes,
  KAKAO_OPEN_CHAT,
  type Package,
} from "@/data/service";

const tierLabel: Record<Package["tier"], string> = {
  WEBSITE: "Website",
  FULLSTACK: "Fullstack",
  MAINTENANCE: "Maintenance",
};

const defaultIndex = Math.max(
  0,
  packages.findIndex((p) => p.highlight)
);

const eyebrow =
  "font-mono text-[10px] uppercase tracking-[0.22em] text-muted";

/**
 * 선택형 패키지 가격표. 카드를 선택하면 아래 상세 패널이 갱신되고
 * 비교 표에서 해당 패키지 열이 강조됩니다.
 * 홈(/#pricing)과 /price 페이지에서 동일하게 사용합니다.
 */
export function PricingTable({
  showNote = true,
  showComparison = true,
}: {
  showNote?: boolean;
  showComparison?: boolean;
}) {
  const [active, setActive] = useState(defaultIndex);
  const selected = packages[active];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 선택형 카드 */}
      <div
        role="group"
        aria-label="패키지 선택"
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {packages.map((pkg, i) => {
          const isActive = i === active;
          return (
            <button
              key={pkg.tier}
              type="button"
              aria-pressed={isActive}
              aria-controls="package-detail"
              onClick={() => setActive(i)}
              className={`relative flex flex-col items-start text-left rounded-lg border p-6 sm:p-7 transition-all duration-200 ${
                isActive
                  ? "border-accent bg-accent/[0.05] shadow-[0_8px_30px_-16px_rgba(182,54,28,0.5)]"
                  : "border-border hover:border-muted/60 hover:-translate-y-0.5"
              }`}
            >
              {pkg.highlight && (
                <span className="absolute -top-2.5 left-6 px-2 py-0.5 rounded-full bg-accent text-white font-mono text-[9px] uppercase tracking-[0.18em]">
                  Popular
                </span>
              )}

              <span className="flex w-full items-center justify-between">
                <span className={eyebrow}>{tierLabel[pkg.tier]}</span>
                <span
                  aria-hidden
                  className={`grid place-items-center h-4 w-4 rounded-full border transition-colors ${
                    isActive
                      ? "border-accent bg-accent"
                      : "border-muted/50 bg-transparent"
                  }`}
                >
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </span>
              </span>

              <span className="mt-3 text-base font-medium tracking-tight">
                {pkg.tagline}
              </span>
              <span className="mt-1 text-[26px] sm:text-[30px] font-semibold tracking-tight tabular-nums">
                {pkg.priceLabel}
              </span>
              {pkg.priceUnit && (
                <span className="mt-1 text-xs text-muted">{pkg.priceUnit}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* 선택된 패키지 상세 패널 */}
      <div
        id="package-detail"
        aria-live="polite"
        className="rounded-lg border border-border bg-background/40 p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              {tierLabel[selected.tier]} · 상세
            </p>
            <h3 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
              {selected.tagline}
            </h3>
          </div>
          <div className="text-left sm:text-right">
            <span className="block text-3xl sm:text-4xl font-semibold tracking-tight tabular-nums text-accent">
              {selected.priceLabel}
            </span>
            {selected.priceUnit && (
              <span className="mt-1 block text-xs text-muted">
                {selected.priceUnit}
              </span>
            )}
          </div>
        </div>

        <p className="mt-5 text-sm sm:text-base text-foreground/80 leading-[1.7] max-w-3xl text-pretty">
          {selected.summary}
        </p>

        <dl className="mt-7 grid grid-cols-3 gap-3 border-y border-border py-5 max-w-lg">
          <Stat label="페이지" value={selected.pages} />
          <Stat label="기간" value={selected.duration} />
          <Stat label="수정" value={selected.revisions} />
        </dl>

        <ul className="mt-7 grid gap-3 sm:grid-cols-2 sm:gap-x-8">
          {selected.features.map((feature) => (
            <li
              key={feature}
              className="flex gap-3 text-sm sm:text-base text-foreground/85"
            >
              <span aria-hidden className="mt-0.5 text-accent shrink-0">
                ✓
              </span>
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={KAKAO_OPEN_CHAT}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-semibold text-white hover:bg-accent/90 transition-colors"
        >
          {selected.tagline.replace(/\s*\(.*\)$/, "")} 상담하기
          <span aria-hidden>→</span>
        </a>
      </div>

      {/* 전체 비교 표 - 선택된 열 강조 */}
      {showComparison && (
      <div>
        <p className={`${eyebrow} mb-5`}>전체 비교</p>
        <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className={`py-4 pr-4 font-normal ${eyebrow}`}>
                  항목
                </th>
                {packages.map((pkg, i) => (
                  <th
                    key={pkg.tier}
                    scope="col"
                    className={`py-4 px-4 text-sm font-medium tracking-tight transition-colors ${
                      i === active ? "bg-accent/[0.05]" : ""
                    }`}
                  >
                    <span className={`block ${i === active ? "text-accent" : ""}`}>
                      {pkg.tagline}
                    </span>
                    <span className="block mt-1 font-mono text-[11px] font-normal text-accent tabular-nums">
                      {pkg.priceLabel}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {comparisonRows.map((row) => (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className="py-3.5 pr-4 text-sm font-normal text-muted"
                  >
                    {row.label}
                  </th>
                  {row.values.map((value, i) => (
                    <td
                      key={i}
                      className={`py-3.5 px-4 text-sm tabular-nums text-foreground/90 transition-colors ${
                        i === active ? "bg-accent/[0.05]" : ""
                      }`}
                    >
                      <Cell value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* 납품 후 수정 · 기능 추가 기준 */}
      <div>
        <p className={`${eyebrow} mb-3`}>After delivery · 납품 후 요청</p>
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
          완성 후 수정이나 기능 추가는 이렇게 진행합니다
        </h3>
        <p className="mt-3 text-sm sm:text-base text-foreground/80 leading-[1.7] max-w-3xl text-pretty">
          요청을 세 가지로 나눠 비용을 미리 공개합니다. 유지보수는 선택
          사항이며, 가입하지 않으셔도 필요할 때마다 건별로 맡기실 수 있습니다.
        </p>

        <div className="mt-8 overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className={`py-4 pr-4 font-normal ${eyebrow}`}>
                  구분
                </th>
                <th scope="col" className={`py-4 px-4 font-normal ${eyebrow}`}>
                  예시
                </th>
                <th
                  scope="col"
                  className="py-4 px-4 text-sm font-medium tracking-tight bg-accent/[0.05] text-accent"
                >
                  유지보수 이용 시
                </th>
                <th scope="col" className="py-4 px-4 text-sm font-medium tracking-tight">
                  미이용 시
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {afterCareRows.map((row) => (
                <tr key={row.kind}>
                  <th
                    scope="row"
                    className="py-4 pr-4 text-sm font-medium tracking-tight whitespace-nowrap"
                  >
                    {row.kind}
                  </th>
                  <td className="py-4 px-4 text-sm text-foreground/70 leading-snug">
                    {row.examples}
                  </td>
                  <td className="py-4 px-4 text-sm tabular-nums bg-accent/[0.05]">
                    {row.member}
                  </td>
                  <td className="py-4 px-4 text-sm tabular-nums text-foreground/90">
                    {row.nonMember}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-6 space-y-2">
          {afterCareNotes.map((note) => (
            <li
              key={note}
              className="flex gap-3 text-sm text-foreground/70 leading-[1.7]"
            >
              <span aria-hidden className="text-muted shrink-0">
                ·
              </span>
              <span className="text-pretty">{note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 웹 제작 vs 풀스택 - 두 플랜의 가격 차이를 비개발자 기준으로 설명 */}
      <div>
        <p className={`${eyebrow} mb-3`}>Scope · 웹 제작과 풀스택, 뭐가 다른가요?</p>
        <p className="text-sm sm:text-base text-foreground/80 leading-[1.7] max-w-3xl text-pretty mb-8">
          {scopeGuideIntro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {scopeGuide.map((item) => (
            <div
              key={item.key}
              className="flex flex-col rounded-lg border border-border bg-background/40 p-6 sm:p-7"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                {item.badge}
              </p>
              <h4 className="mt-3 text-xl sm:text-2xl font-semibold tracking-tight text-pretty">
                {item.title}
              </h4>
              <p className="mt-3 text-sm sm:text-base text-foreground/80 leading-[1.7] text-pretty">
                {item.lead}
              </p>

              <ul className="mt-6 space-y-2.5">
                {item.examples.map((example) => (
                  <li
                    key={example}
                    className="flex gap-3 text-sm text-foreground/85"
                  >
                    <span aria-hidden className="mt-0.5 text-accent shrink-0">
                      ✓
                    </span>
                    <span className="leading-snug text-pretty">{example}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 pt-5 border-t border-border text-sm text-foreground/65 leading-[1.7] text-pretty">
                {item.note}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-5 rounded-lg border border-accent/30 bg-accent/[0.05] px-6 py-5 text-sm sm:text-base text-foreground/85 leading-[1.7] text-pretty">
          {scopeGuideRule}
        </p>
      </div>

      {/* 별도 비용 안내 - 패키지 가격 미포함 */}
      <div className="rounded-lg border border-border bg-background/40 p-6 sm:p-7">
        <p className={`${eyebrow} mb-2`}>Not included · 별도 비용</p>
        <p className="text-sm text-foreground/75 leading-[1.7] mb-6 max-w-3xl text-pretty">
          아래 항목은 제작 비용에 포함되지 않으며, 의뢰인 명의로 직접 결제하시는
          외부 서비스입니다. 명의가 의뢰인께 있어 업체를 바꾸셔도 사이트를 그대로
          가져가실 수 있습니다.
        </p>
        <ul className="divide-y divide-border">
          {paidServices.map((item) => (
            <li key={item.title} className="py-4 first:pt-0 last:pb-0">
              <h4 className="text-sm font-medium tracking-tight mb-1">
                {item.title}
              </h4>
              <p className="text-sm text-foreground/70 leading-[1.7] max-w-3xl text-pretty">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {showNote && (
        <p className="text-sm text-muted leading-relaxed max-w-3xl">
          {pricingNote}
        </p>
      )}
    </div>
  );
}

function Cell({ value }: { value: string }) {
  if (value === "O")
    return (
      <span className="text-accent">
        <span aria-hidden>✓</span>
        <span className="sr-only">포함</span>
      </span>
    );
  if (value === "-")
    return (
      <span className="text-muted/50">
        <span aria-hidden>-</span>
        <span className="sr-only">해당 없음</span>
      </span>
    );
  return <>{value}</>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium tabular-nums">{value}</dd>
    </div>
  );
}
