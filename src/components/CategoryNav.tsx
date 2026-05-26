"use client";

import { useEffect, useState } from "react";

type Item = { slug: string; name: string };

export function CategoryNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string>(items[0]?.slug ?? "");

  useEffect(() => {
    const elements = items
      .map((i) => document.getElementById(i.slug))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (slug: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(slug);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(slug);
    history.replaceState(null, "", `#${slug}`);
  };

  return (
    <nav
      aria-label="카테고리 내비게이션"
      className="hidden md:block fixed right-3 lg:right-4 top-1/2 -translate-y-1/2 z-50"
    >
      <div className="pointer-events-auto rounded-xl border border-border bg-background/55 backdrop-blur-xl backdrop-saturate-150 shadow-[0_8px_30px_-12px_rgba(50,30,10,0.18)] px-5 py-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          Index
        </p>
        <ul className="flex flex-col gap-3">
          {items.map((item, i) => {
            const isActive = active === item.slug;
            return (
              <li key={item.slug}>
                <a
                  href={`#${item.slug}`}
                  onClick={handleClick(item.slug)}
                  className={`flex items-baseline gap-2 text-sm tracking-tight transition-all duration-300 ${
                    isActive
                      ? "font-semibold text-accent"
                      : "font-normal text-muted hover:text-foreground"
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
