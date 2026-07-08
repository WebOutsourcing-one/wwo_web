"use client";

import { useState } from "react";
import { techStack } from "@/data/service";

/**
 * 각 기술 카드는 역할(위) + 기술명(아래)을 보여주고,
 * 호버(또는 탭/포커스)하면 아래 패널에 쉬운 설명이 나타납니다.
 * 데스크톱에서는 한 줄(5열)로 나열됩니다.
 */
export function TechStack() {
  const [active, setActive] = useState(0);
  const selected = techStack[active];

  return (
    <div>
      {/* 기술 카드: 역할(위) + 이름(아래) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {techStack.map((tech, i) => {
          const isActive = i === active;
          return (
            <button
              key={tech.name}
              type="button"
              aria-pressed={isActive}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`flex flex-col items-start text-left rounded-lg border px-4 py-3.5 transition-colors ${
                isActive
                  ? "border-accent bg-accent/[0.06]"
                  : "border-border hover:border-muted/60"
              }`}
            >
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.18em] leading-snug ${
                  isActive ? "text-accent" : "text-muted"
                }`}
              >
                {tech.role}
              </span>
              <span className="mt-1.5 font-mono text-base sm:text-lg font-semibold tracking-tight">
                {tech.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* 선택된 기술의 쉬운 설명 */}
      <div className="mt-8 rounded-lg border border-border bg-background/40 p-6 sm:p-8 min-h-[8.5rem] sm:min-h-[7.5rem]">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent mb-3">
          {selected.name}
        </p>
        <p className="text-base text-foreground/80 leading-[1.7] max-w-5xl">
          {selected.description}
        </p>
      </div>
    </div>
  );
}
