"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  alt: string;
  link?: string;
  sizes?: string;
  aspect?: "4/3" | "16/10" | "16/9";
};

const aspectClass = {
  "4/3": "aspect-[4/3]",
  "16/10": "aspect-[16/10]",
  "16/9": "aspect-[16/9]",
} as const;

export function ProjectCarousel({
  images,
  alt,
  link,
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw",
  aspect = "4/3",
}: Props) {
  const [idx, setIdx] = useState(0);
  const total = images.length;
  const hasMany = total > 1;

  const go = (delta: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((i) => (i + delta + total) % total);
  };

  const Media = (
    <Image
      key={images[idx]}
      src={images[idx]}
      alt={`${alt} ${idx + 1}`}
      fill
      sizes={sizes}
      className="object-cover transition-opacity duration-300"
    />
  );

  return (
    <div
      className={`relative ${aspectClass[aspect]} overflow-hidden bg-border rounded-md group/carousel`}
    >
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${alt} 사이트 방문`}
          className="block w-full h-full"
        >
          {Media}
        </a>
      ) : (
        <div className="w-full h-full">{Media}</div>
      )}

      {hasMany && (
        <>
          <button
            type="button"
            onClick={go(-1)}
            aria-label="이전 이미지"
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 grid place-items-center w-9 h-9 rounded-full bg-background/85 backdrop-blur text-foreground shadow-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-background"
          >
            <svg
              aria-hidden
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </button>
          <button
            type="button"
            onClick={go(1)}
            aria-label="다음 이미지"
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 grid place-items-center w-9 h-9 rounded-full bg-background/85 backdrop-blur text-foreground shadow-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-background"
          >
            <svg
              aria-hidden
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
            {images.map((_, i) => (
              <span
                key={i}
                className={`block h-1.5 rounded-full transition-all ${
                  i === idx ? "w-4 bg-background" : "w-1.5 bg-background/60"
                }`}
              />
            ))}
          </div>

          <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full bg-background/85 backdrop-blur text-[10px] font-mono text-muted opacity-0 group-hover/carousel:opacity-100 transition-opacity">
            {idx + 1} / {total}
          </div>
        </>
      )}
    </div>
  );
}
