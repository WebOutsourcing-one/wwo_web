"use client";

import { useState } from "react";
import {
  packages,
  comparisonRows,
  pricingNote,
  KAKAO_OPEN_CHAT,
  type Package,
} from "@/data/service";

const tierLabel: Record<Package["tier"], string> = {
  STANDARD: "01 / Standard",
  DELUXE: "02 / Deluxe",
  PREMIUM: "03 / Premium",
  ENTERPRISE: "04 / Enterprise",
};

const defaultIndex = Math.max(
  0,
  packages.findIndex((p) => p.highlight)
);

/**
 * 선택형 패키지 가격표. 카드를 선택하면 아래 상세 패널이 갱신되고
 * 비교 표에서 해당 패키지 열이 강조됩니다.
 * /price 페이지와 /service 하단에서 동일하게 사용합니다.
 */
export function PricingTable({ showNote = true }: { showNote?: boolean }) {
  const [active, setActive] = useState(defaultIndex);
  const selected = packages[active];

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* 선택형 카드 */}
      <div
        role="tablist"
        aria-label="패키지 선택"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {packages.map((pkg, i) => {
          const isActive = i === active;
          return (
            <button
              key={pkg.tier}
              type="button"
              role="tab"
              aria-selected={isActive}
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
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  {tierLabel[pkg.tier]}
                </span>
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

              <span className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight tabular-nums">
                {pkg.priceLabel}
              </span>
              {pkg.priceUnit && (
                <span className="mt-1 font-mono text-[11px] text-muted">
                  {pkg.priceUnit}
                </span>
              )}
              <span className="mt-3 text-base font-medium tracking-tight">
                {pkg.tagline}
              </span>
            </button>
          );
        })}
      </div>

      {/* 선택된 패키지 상세 패널 */}
      <div className="rounded-lg border border-border bg-background/40 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
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
              <span className="mt-1 block font-mono text-[11px] text-muted">
                {selected.priceUnit}
              </span>
            )}
          </div>
        </div>

        <p className="mt-4 text-sm sm:text-base text-foreground/80 leading-[1.7] max-w-2xl">
          {selected.summary}
        </p>

        <dl className="mt-7 grid grid-cols-3 gap-3 border-y border-border py-5 max-w-md">
          <Stat label="페이지" value={selected.pages} />
          <Stat label="작업일" value={selected.duration} />
          <Stat label="수정" value={selected.revisions} />
        </dl>

        <ul className="mt-7 space-y-3">
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
          {selected.tier} 패키지로 상담하기
          <span aria-hidden>→</span>
        </a>
      </div>

      {/* 전체 비교 표 — 선택된 열 강조 */}
      <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-5">
          전체 비교
        </p>
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="py-4 pr-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted font-normal">
                항목
              </th>
              {packages.map((pkg, i) => (
                <th
                  key={pkg.tier}
                  className={`py-4 px-4 text-sm font-medium tracking-tight transition-colors ${
                    i === active ? "bg-accent/[0.05]" : ""
                  }`}
                >
                  <span
                    className={`block ${i === active ? "text-accent" : ""}`}
                  >
                    {pkg.tier}
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
                <td className="py-3.5 pr-4 text-sm text-muted">{row.label}</td>
                {row.values.map((value, i) => (
                  <td
                    key={i}
                    className={`py-3.5 px-4 text-sm tabular-nums text-foreground/90 transition-colors ${
                      i === active ? "bg-accent/[0.05]" : ""
                    }`}
                  >
                    {value === "O" ? (
                      <span className="text-accent">✓</span>
                    ) : value === "-" ? (
                      <span className="text-muted/50">-</span>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showNote && (
        <p className="text-sm text-muted leading-relaxed max-w-2xl">
          {pricingNote}
        </p>
      )}
    </div>
  );
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
