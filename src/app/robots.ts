import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/service";

// GEO: 생성형 AI 검색(ChatGPT, Claude, Perplexity, Gemini 등)이 사이트를 읽고 인용할 수 있도록
// 주요 AI 크롤러를 명시적으로 허용합니다. 학습용 수집을 막고 싶다면 해당 봇만 disallow로 바꾸세요.
// 비공개 요청서 경로는 여기에 적지 않습니다 (적으면 오히려 경로가 공개됩니다 - 페이지 자체가 noindex).
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
