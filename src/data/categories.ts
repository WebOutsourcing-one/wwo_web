export type Project = {
  name: string;
  link?: string;
  description?: string;
  images: string[];
};

export type Category = {
  slug: string;
  name: string;
  description?: string;
  projects: Project[];
};

export const PREVIEW_COUNT = 3;

export const categories: Category[] = [
  {
    slug: "product",
    name: "제품 소개",
    description: "서비스와 제품을 소개하는 랜딩 페이지",
    projects: [
      {
        name: "Noted — 노트 앱 랜딩",
        link: "https://example.com/noted",
        description: "Next.js · Tailwind · Framer Motion",
        images: [
          "https://picsum.photos/seed/product-noted-1/1600/1000",
          "https://picsum.photos/seed/product-noted-2/1600/1000",
        ],
      },
      {
        name: "Brewlog — 홈카페 트래커",
        link: "https://example.com/brewlog",
        description: "Next.js · Supabase",
        images: [
          "https://picsum.photos/seed/product-brewlog-1/1600/1000",
          "https://picsum.photos/seed/product-brewlog-2/1600/1000",
          "https://picsum.photos/seed/product-brewlog-3/1600/1000",
        ],
      },
      {
        name: "Quietly — 명상 앱 소개",
        link: "https://example.com/quietly",
        description: "Astro · MDX",
        images: [
          "https://picsum.photos/seed/product-quietly-1/1600/1000",
          "https://picsum.photos/seed/product-quietly-2/1600/1000",
        ],
      },
      {
        name: "Pacelane — 러닝 코칭",
        link: "https://example.com/pacelane",
        description: "Next.js · Stripe",
        images: [
          "https://picsum.photos/seed/product-pacelane-1/1600/1000",
          "https://picsum.photos/seed/product-pacelane-2/1600/1000",
        ],
      },
      {
        name: "Stackbox — SaaS 도구",
        link: "https://example.com/stackbox",
        description: "Next.js · Prisma",
        images: [
          "https://picsum.photos/seed/product-stackbox-1/1600/1000",
          "https://picsum.photos/seed/product-stackbox-2/1600/1000",
        ],
      },
    ],
  },
  {
    slug: "company",
    name: "회사 소개",
    description: "기업 브랜드와 가치를 전달하는 사이트",
    projects: [
      {
        name: "Studio Mono",
        link: "https://example.com/studio-mono",
        description: "Next.js · Sanity CMS",
        images: [
          "https://picsum.photos/seed/company-mono-1/1600/1000",
          "https://picsum.photos/seed/company-mono-2/1600/1000",
        ],
      },
      {
        name: "Atelier 92",
        link: "https://example.com/atelier-92",
        description: "Next.js · Contentful",
        images: [
          "https://picsum.photos/seed/company-atelier-1/1600/1000",
          "https://picsum.photos/seed/company-atelier-2/1600/1000",
        ],
      },
      {
        name: "Northpine Logistics",
        link: "https://example.com/northpine",
        description: "Next.js · Strapi",
        images: [
          "https://picsum.photos/seed/company-northpine-1/1600/1000",
          "https://picsum.photos/seed/company-northpine-2/1600/1000",
        ],
      },
      {
        name: "Goyo Architects",
        link: "https://example.com/goyo",
        description: "Astro · Cloudflare",
        images: [
          "https://picsum.photos/seed/company-goyo-1/1600/1000",
          "https://picsum.photos/seed/company-goyo-2/1600/1000",
        ],
      },
    ],
  },
  {
    slug: "contest",
    name: "공모전",
    description: "공모전·해커톤 출품 프로젝트",
    projects: [
      {
        name: "CityCarbon — 탄소 시각화",
        link: "https://example.com/citycarbon",
        description: "Next.js · D3",
        images: [
          "https://picsum.photos/seed/contest-citycarbon-1/1600/1000",
          "https://picsum.photos/seed/contest-citycarbon-2/1600/1000",
        ],
      },
      {
        name: "Lostpaws — 유기견 매칭",
        link: "https://example.com/lostpaws",
        description: "React Native · Firebase",
        images: [
          "https://picsum.photos/seed/contest-lostpaws-1/1600/1000",
          "https://picsum.photos/seed/contest-lostpaws-2/1600/1000",
        ],
      },
      {
        name: "MealBridge — 식품 나눔",
        link: "https://example.com/mealbridge",
        description: "Next.js · Maps API",
        images: [
          "https://picsum.photos/seed/contest-mealbridge-1/1600/1000",
          "https://picsum.photos/seed/contest-mealbridge-2/1600/1000",
        ],
      },
      {
        name: "BookRoom — 독서 SNS",
        link: "https://example.com/bookroom",
        description: "Next.js · tRPC",
        images: [
          "https://picsum.photos/seed/contest-bookroom-1/1600/1000",
          "https://picsum.photos/seed/contest-bookroom-2/1600/1000",
        ],
      },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
