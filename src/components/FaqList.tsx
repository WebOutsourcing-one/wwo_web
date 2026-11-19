import { faqs } from "@/data/faq";

/**
 * 자주 묻는 질문 목록. 답변은 접혀 있어도 HTML에 그대로 들어가
 * 검색엔진과 AI 크롤러가 읽을 수 있습니다 (<details> 사용, 자바스크립트 불필요).
 */
export function FaqList({ defaultOpen = 0 }: { defaultOpen?: number }) {
  return (
    <div className="divide-y divide-border border-y border-border max-w-4xl">
      {faqs.map((item, i) => (
        <details key={item.q} className="group py-1" open={i < defaultOpen}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-4 text-base sm:text-lg font-medium tracking-tight hover:text-accent transition-colors [&::-webkit-details-marker]:hidden">
            <h3 className="text-pretty">{item.q}</h3>
            <span
              aria-hidden
              className="mt-1 shrink-0 font-mono text-sm text-muted transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pb-5 pr-8 text-sm sm:text-base text-foreground/75 leading-[1.75] text-pretty">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
