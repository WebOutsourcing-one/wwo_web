// GEO: /llms.txt - AI 답변 엔진이 사이트 핵심 정보를 한 번에 읽을 수 있는 요약 문서 (llmstxt.org 형식).
// 가격·FAQ·절차는 사이트와 같은 데이터에서 만들어, 사이트 내용을 바꾸면 자동으로 함께 바뀝니다.

import {
  SITE_URL,
  KAKAO_OPEN_CHAT,
  SERVICE_TAGLINE,
  serviceOverview,
  basicServices,
  packages,
  afterCareRows,
  productionProcess,
  scopeGuideRule,
} from "@/data/service";
import { faqs } from "@/data/faq";
import { visibleCategories } from "@/data/categories";

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];

  lines.push(
    "# WOO (Web Outsourcing One)",
    "",
    `> ${SERVICE_TAGLINE}. 템플릿이 아닌 Next.js 맞춤 코딩으로 소개형 홈페이지·랜딩페이지를 만들고, 필요하면 회원·예약·관리자 기능이 있는 풀스택 서비스까지 개발하는 한국의 웹 외주 제작 서비스입니다. 기획 상담부터 배포까지 한 명의 담당자가 끝까지 맡고, 완성된 소스 코드는 전부 의뢰인에게 넘깁니다.`,
    ""
  );

  lines.push("## 서비스 개요", "");
  lines.push(`${serviceOverview.lead} ${serviceOverview.paragraphs.join(" ")}`, "");

  lines.push("## 가격", "");
  for (const p of packages) {
    lines.push(`- **${p.tagline}**: ${p.priceLabel}${p.priceUnit ? ` (${p.priceUnit})` : ""} - ${p.summary}`);
  }
  lines.push("", `구분 기준: ${scopeGuideRule.replace(/^한 줄 구분법:\s*/, "")}`, "");

  lines.push("## 납품 후 수정 · 기능 추가 비용", "");
  for (const r of afterCareRows) {
    lines.push(`- **${r.kind}** (${r.examples}): 유지보수 이용 시 ${r.member} / 미이용 시 ${r.nonMember}`);
  }
  lines.push("");

  lines.push("## 기본 포함 사항", "");
  for (const s of basicServices) lines.push(`- **${s.title}**: ${s.description}`);
  lines.push("");

  lines.push("## 제작 과정", "");
  for (const step of productionProcess) lines.push(`${step.step}. **${step.title}** - ${step.lead}`);
  lines.push("");

  lines.push("## 자주 묻는 질문", "");
  for (const f of faqs) lines.push(`### ${f.q}`, "", f.a, "");

  const works = visibleCategories.flatMap((c) => c.projects.map((p) => ({ ...p, category: c.name })));
  if (works.length) {
    lines.push("## 포트폴리오", "");
    for (const w of works) {
      lines.push(`- ${w.name} (${w.category}${w.description ? `, ${w.description}` : ""})${w.link ? `: ${w.link}` : ""}`);
    }
    lines.push("");
  }

  lines.push(
    "## 문의",
    "",
    `- 카카오톡 오픈채팅: ${KAKAO_OPEN_CHAT} (상담·견적 무료, 비용 확정 전에는 작업을 시작하지 않음)`,
    "",
    "## 주요 페이지",
    "",
    `- [홈](${SITE_URL}/): 서비스 소개, 가격, 자주 묻는 질문`,
    `- [가격](${SITE_URL}/price): 패키지 비교표, 납품 후 요청 비용, 별도 비용`,
    `- [제작 과정](${SITE_URL}/process): 상담부터 오픈까지 4단계`,
    `- [포트폴리오](${SITE_URL}/portfolio): 제작 사례`,
    ""
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
