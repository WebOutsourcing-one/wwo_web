"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { KAKAO_OPEN_CHAT } from "@/data/service";

const navLinks = [
  { href: "/portfolio", label: "포트폴리오" },
  { href: "/process", label: "제작 과정" },
  { href: "/price", label: "가격" },
  { href: "/reviews", label: "후기" },
];

/**
 * 사이트 공통 헤더.
 * 데스크톱(sm+)은 링크를 한 줄로 노출하고,
 * 모바일은 로고 + 햄버거 버튼만 두어 탭 시 메뉴가 펼쳐집니다.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // 메뉴가 열린 상태에서 ESC 키로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 h-16 flex items-center justify-between">
        <Link
          href="/"
          onClick={close}
          className="flex items-baseline gap-3 tracking-tight group"
        >
          <span className="text-lg font-bold">WOO</span>
          <span className="hidden sm:inline text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
            Web Outsourcing One
          </span>
        </Link>

        {/* 데스크톱 내비게이션 */}
        <nav className="hidden sm:flex items-center gap-5 sm:gap-7 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={KAKAO_OPEN_CHAT}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:opacity-70 transition-opacity"
          >
            Contact ↗
          </a>
        </nav>

        {/* 모바일 햄버거 버튼 */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="sm:hidden -mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 hover:text-foreground transition-colors"
        >
          <span aria-hidden className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ${
                open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </div>

      {/* 모바일 메뉴 패널 */}
      <div
        id="mobile-nav"
        className={`sm:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-6xl px-6 pb-3 pt-1 flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="py-3.5 text-base text-foreground/80 hover:text-foreground border-t border-border/60 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={KAKAO_OPEN_CHAT}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="py-3.5 text-base text-accent hover:opacity-70 border-t border-border/60 transition-opacity"
          >
            Contact ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
