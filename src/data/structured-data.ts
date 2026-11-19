// 검색엔진 리치 결과용 JSON-LD(구조화 데이터) 정의.
// schema.org 스펙 기준. Organization/WebSite는 전역(layout), Service는 가격 페이지에서 렌더링합니다.
// 도메인·연락처·패키지 값은 service.ts를 단일 출처로 재사용합니다.

import {
  SITE_URL,
  KAKAO_OPEN_CHAT,
  CONTACT_EMAIL,
  packages,
  SERVICE_TAGLINE,
} from "./service";
import { faqs } from "./faq";
import type { Category } from "./categories";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const ORG_NAME = "Web Outsourcing One";
const ORG_DESC =
  "템플릿이 아닌 맞춤 제작 홈페이지 외주. 기획 상담부터 배포까지 한 사람이 끝까지 책임지는 Next.js 기반 반응형·SEO 최적화 홈페이지 제작.";

/** 사이트 전역 그래프: 조직 + 웹사이트 (모든 페이지에 공통 렌더링) */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: ORG_NAME,
      alternateName: "WOO",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      image: `${SITE_URL}/opengraph-image`,
      description: ORG_DESC,
      slogan: SERVICE_TAGLINE,
      // GEO: AI 답변 엔진이 "무엇을 하는 곳인지" 분류할 수 있도록 전문 분야를 명시
      knowsAbout: [
        "홈페이지 제작",
        "랜딩페이지 제작",
        "반응형 웹 디자인",
        "Next.js",
        "풀스택 웹 개발",
        "웹사이트 유지보수",
        "검색엔진 최적화(SEO)",
      ],
      email: CONTACT_EMAIL,
      areaServed: "KR",
      sameAs: [KAKAO_OPEN_CHAT],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: CONTACT_EMAIL,
        url: KAKAO_OPEN_CHAT,
        availableLanguage: ["ko"],
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "WOO - Web Outsourcing One",
      description: ORG_DESC,
      inLanguage: "ko-KR",
      publisher: { "@id": ORG_ID },
    },
  ],
} as const;

/** 가격 페이지: 서비스 + 패키지 오퍼 카탈로그 (가격 정보 노출) */
export const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "홈페이지 외주 제작",
  serviceType: "홈페이지 제작",
  description: ORG_DESC,
  url: `${SITE_URL}/price`,
  areaServed: "KR",
  provider: { "@id": ORG_ID },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "홈페이지 제작 패키지",
    itemListElement: packages.map((p) => {
      const offer: Record<string, unknown> = {
        "@type": "Offer",
        name: p.tagline,
        description: p.summary,
        itemOffered: { "@type": "Service", name: p.tagline },
      };
      // FULLSTACK처럼 "별도 견적"(price 0)인 항목은 가격을 표기하지 않습니다.
      if (p.price > 0) {
        offer.price = String(p.price);
        offer.priceCurrency = "KRW";
        offer.availability = "https://schema.org/InStock";
        // 월 단위 결제 항목(유지보수)은 일시불로 오해되지 않도록 결제 주기를 명시합니다.
        if (p.billing === "MONTHLY") {
          offer.priceSpecification = {
            "@type": "UnitPriceSpecification",
            price: String(p.price),
            priceCurrency: "KRW",
            unitCode: "MON",
          };
        }
      }
      return offer;
    }),
  },
} as const;

/** 자주 묻는 질문 (AEO: 검색 답변 · AI 답변에 질문-답변 단위로 인용되도록) */
export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
} as const;

/** 페이지 경로 (검색 결과에 "WOO > 가격" 식으로 표시) */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  const trail = [{ name: "홈", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

/** 포트폴리오 작업물 목록 */
export function portfolioJsonLd(categories: Category[]) {
  const works = categories.flatMap((c) =>
    c.projects.map((p) => ({ ...p, category: c.name }))
  );
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "WOO 포트폴리오",
    itemListElement: works.map((w, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: w.name,
        genre: w.category,
        ...(w.description ? { description: w.description } : {}),
        ...(w.link ? { url: w.link } : {}),
        ...(w.images[0] ? { image: `${SITE_URL}${w.images[0]}` } : {}),
        creator: { "@id": ORG_ID },
      },
    })),
  };
}
