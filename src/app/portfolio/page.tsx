import Link from "next/link";
import type { Metadata } from "next";
import { categories, PREVIEW_COUNT, type Project } from "@/data/categories";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { CategoryNav } from "@/components/CategoryNav";

const PORTFOLIO_DESC =
  "Web Outsourcing One이 제작한 제품 소개 · 회사 소개 · 공모전 웹 프로젝트 모음";

export const metadata: Metadata = {
  title: "포트폴리오",
  description: PORTFOLIO_DESC,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "포트폴리오 — WOO",
    description: PORTFOLIO_DESC,
    url: "/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-10">
      <CategoryNav
        items={categories.map((c) => ({ slug: c.slug, name: c.name }))}
      />

      <section className="relative pt-16 pb-14 sm:pt-24 sm:pb-20 border-b border-border">
        <Link
          href="/"
          className="rise rise-1 inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-10 group"
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

        <p className="rise rise-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
          Selected Works
        </p>

        <h1 className="rise rise-2 text-[clamp(2.6rem,7.5vw,5.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] max-w-[16ch]">
          직접 만든
          <br />웹 프로젝트들.
        </h1>

        <p className="rise rise-3 mt-8 max-w-xl text-base sm:text-lg text-foreground/75 leading-[1.7]">
          제품 소개 · 회사 소개 · 공모전 사이트 - 작은 규모의 웹 프로젝트를
          끝까지 책임지고 만들어 드립니다.
        </p>

        <div className="rise rise-4 mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          <span>Next.js · React · Tailwind</span>
          <span aria-hidden className="text-muted/50">
            ·
          </span>
          <span>2 — 7 days</span>
        </div>
      </section>

      <div className="divide-y divide-border">
        {categories.map((cat, catIdx) => {
          const preview = cat.projects.slice(0, PREVIEW_COUNT);
          const hasMore = cat.projects.length > PREVIEW_COUNT;
          return (
            <section
              key={cat.slug}
              id={cat.slug}
              className="py-14 sm:py-20 scroll-mt-20"
            >
              <header className="flex items-end justify-between mb-10 gap-6">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-3">
                    Section · {String(catIdx + 1).padStart(2, "0")} /{" "}
                    {String(categories.length).padStart(2, "0")}
                  </p>
                  <h2 className="text-3xl sm:text-5xl font-medium tracking-[-0.02em] leading-[1.05]">
                    {cat.name}
                  </h2>
                  {cat.description && (
                    <p className="mt-3 text-sm sm:text-base text-muted max-w-md">
                      {cat.description}
                    </p>
                  )}
                </div>
                {hasMore && (
                  <Link
                    href={`/portfolio/${cat.slug}`}
                    className="shrink-0 group inline-flex items-baseline gap-2 text-sm border-b border-border pb-1 hover:border-accent hover:text-accent transition-colors"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted group-hover:text-accent transition-colors">
                      {String(cat.projects.length - PREVIEW_COUNT).padStart(
                        2,
                        "0"
                      )}{" "}
                      more
                    </span>
                    <span aria-hidden>→</span>
                  </Link>
                )}
              </header>

              {preview.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12 sm:gap-y-14">
                  {preview.map((project, i) => (
                    <ProjectCard
                      key={project.name}
                      project={project}
                      index={i + 1}
                    />
                  ))}
                </div>
              ) : (
                <div className="aspect-[16/6] sm:aspect-[16/4] grid place-items-center rounded-md border border-dashed border-border">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                    Coming soon
                  </p>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div className="group">
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          {String(index).padStart(2, "0")}
        </span>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted opacity-0 group-hover:opacity-100 transition-opacity hover:text-accent"
          >
            Visit ↗
          </a>
        )}
      </div>
      <ProjectCarousel
        images={project.images}
        alt={project.name}
        link={project.link}
      />
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="text-base sm:text-lg font-medium tracking-tight">
          {project.name}
        </h3>
      </div>
      {project.description && (
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {project.description}
        </p>
      )}
    </div>
  );
}
