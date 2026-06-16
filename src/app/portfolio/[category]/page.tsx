import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { ProjectCarousel } from "@/components/ProjectCarousel";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return { title: "찾을 수 없는 페이지" };
  return {
    title: cat.name,
    description: cat.description,
    alternates: { canonical: `/portfolio/${cat.slug}` },
    openGraph: {
      title: `${cat.name} - WOO`,
      description: cat.description,
      url: `/portfolio/${cat.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const catIdx = categories.findIndex((c) => c.slug === cat.slug);

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-10">
      <section className="relative pt-10 pb-10 sm:pt-14 sm:pb-12 border-b border-border">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-8 group"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-1">
            ←
          </span>{" "}
          <span className="font-mono text-[11px] uppercase tracking-[0.22em]">
            Portfolio
          </span>
        </Link>

        <div className="hidden lg:flex absolute top-10 right-0 flex-col items-end gap-1 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          <span>
            Section · {String(catIdx + 1).padStart(2, "0")} /{" "}
            {String(categories.length).padStart(2, "0")}
          </span>
        </div>

        <div className="rise rise-1 flex items-end justify-between gap-6 flex-wrap">
          <h1 className="text-5xl sm:text-7xl font-medium tracking-[-0.02em] leading-[0.98]">
            {cat.name}
          </h1>
          <p className="shrink-0 text-4xl sm:text-6xl font-bold tracking-tight tabular-nums text-accent leading-none">
            {String(cat.projects.length).padStart(2, "0")}
            <span className="ml-2 text-[10px] font-mono font-normal text-muted uppercase tracking-[0.22em] align-top">
              Projects
            </span>
          </p>
        </div>
        {cat.description && (
          <p className="rise rise-2 mt-6 text-base sm:text-lg text-foreground/80 max-w-xl leading-relaxed">
            {cat.description}
          </p>
        )}
      </section>

      <section className="py-12 sm:py-16 space-y-20">
        {cat.projects.length === 0 && (
          <div className="aspect-[16/6] grid place-items-center rounded-md border border-dashed border-border">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              Coming soon
            </p>
          </div>
        )}
        {cat.projects.map((project, idx) => (
          <article
            key={project.name}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
          >
            <header className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
                Project · {String(idx + 1).padStart(2, "0")} /{" "}
                {String(cat.projects.length).padStart(2, "0")}
              </p>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] leading-[1.05]">
                {project.name}
              </h2>
              {project.description && (
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  {project.description}
                </p>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-baseline gap-2 border-b border-border pb-1 text-sm hover:border-accent hover:text-accent transition-colors group"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted group-hover:text-accent transition-colors">
                    Visit site
                  </span>
                  <span aria-hidden>↗</span>
                </a>
              )}
            </header>

            <div className="lg:col-span-8">
              <ProjectCarousel
                images={project.images}
                alt={project.name}
                link={project.link}
                sizes="(min-width: 1024px) 60vw, 90vw"
                aspect="16/10"
              />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
