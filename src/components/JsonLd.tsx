// 구조화 데이터(JSON-LD)를 <script type="application/ld+json">로 렌더링합니다.
// XSS 방지를 위해 "<"를 유니코드(<)로 치환합니다 (Next.js 공식 권장 방식).

type JsonLdProps = {
  data: object;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
