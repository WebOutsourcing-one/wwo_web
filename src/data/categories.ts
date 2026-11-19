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
      {
        name: "설유화",
        link: "https://sullyuwha.co.kr/",
        description: "한복 예복 브랜드 · Next.js",
        images: [
          "/images/company/sullyuwha/01.png",
          "/images/company/sullyuwha/02.png",
        ],
      },
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

/**
 * 작업물이 1개 이상 있는 카테고리만. 빈 카테고리는 목록·사이트맵·상세 페이지에서
 * 숨겨 "Coming soon"만 있는 미완성 화면이 노출되지 않게 합니다.
 * 프로젝트를 추가하면 자동으로 다시 나타납니다.
 */
export const visibleCategories = categories.filter((c) => c.projects.length > 0);

export function getCategory(slug: string): Category | undefined {
  return visibleCategories.find((c) => c.slug === slug);
}
