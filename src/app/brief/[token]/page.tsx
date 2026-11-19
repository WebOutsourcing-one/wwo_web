import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidBriefToken } from "@/lib/brief-token";
import { BriefForm } from "@/components/brief/BriefForm";

// 상담 후 개별로 전달하는 비공개 요청서 페이지.
// 토큰이 맞지 않으면 일반 404와 똑같이 보여 주소의 존재 자체를 드러내지 않습니다.
// 메뉴·사이트맵·robots.txt 어디에도 넣지 않습니다 (robots.txt에 적으면 오히려 경로가 공개됩니다).

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "제작 요청서",
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};

export default async function BriefPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  if (!isValidBriefToken(token)) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 sm:px-10">
      <section className="pt-12 pb-10 sm:pt-16 sm:pb-14 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted rise rise-1">
          Project Brief
        </p>
        <h1 className="rise rise-2 mt-4 text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-balance">
          웹 제작 요청서
        </h1>
        <p className="rise rise-3 mt-6 text-base sm:text-lg text-foreground/80 max-w-2xl leading-[1.7] text-pretty">
          상담 때 나눈 이야기를 바탕으로 정확하게 만들기 위한 질문입니다. 아시는
          만큼만 편하게 적어 주세요.
        </p>
        <div className="rise rise-4 mt-8 rounded-lg border border-accent/30 bg-accent/[0.05] px-5 py-4 sm:px-6 sm:py-5">
          <p className="text-sm sm:text-base font-medium tracking-tight">
            모든 항목은 선택입니다.
          </p>
          <p className="mt-1.5 text-sm text-foreground/75 leading-[1.7] text-pretty">
            비워 두신 부분은 업종과 상담 내용을 바탕으로 제가 알맞게 채워 시안으로
            먼저 보여 드립니다. 마음에 들지 않으면 그때 바꾸시면 됩니다.
          </p>
        </div>
      </section>

      <BriefForm token={token} />
    </div>
  );
}
