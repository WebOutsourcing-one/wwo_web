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
        name: "Workhard",
        link: "https://workhard-web.vercel.app/ko",
        description: "Next.js · Tailwind",
        images: [
          "/images/product/workhard/01.png",
          "/images/product/workhard/02.png",
          "/images/product/workhard/03.png",
        ],
      },
    ],
  },
  {
    slug: "company",
    name: "회사 소개",
    description: "기업 브랜드와 가치를 전달하는 사이트",
    projects: [
      /*
      {
        name: "Studio Mono",
        link: "https://example.com/studio-mono",
        description: "Next.js · Sanity CMS",
        images: [
          "/images/company/studio-mono/01.png",
          "/images/company/studio-mono/02.png",
        ],
      },
      */
    ],
  },
  {
    slug: "contest",
    name: "공모전",
    description: "공모전 출품작을 접수하고 관리하는 운영 사이트",
    projects: [
      /*
      {
        name: "CityCarbon — 탄소 시각화",
        link: "https://example.com/citycarbon",
        description: "Next.js · D3",
        images: [
          "/images/contest/citycarbon/01.png",
          "/images/contest/citycarbon/02.png",
        ],
      },
      */
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
