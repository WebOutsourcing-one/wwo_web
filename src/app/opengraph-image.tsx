import { ImageResponse } from "next/og";

// 카카오톡·SNS 공유 시 보이는 미리보기 썸네일 (1200×630).
// app 루트에 위치해 전 페이지에 og:image로 자동 적용됩니다.

export const alt = "WOO - 합리적인 홈페이지 외주 제작";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#f3ede2";
const FG = "#1a1410";
const MUTED = "#857669";
const ACCENT = "#b6361c";

async function loadGoogleFont(weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@${weight}&text=${encodeURIComponent(
    text
  )}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
  if (!src) throw new Error("OG font load failed");
  return (await fetch(src[1])).arrayBuffer();
}

export default async function Image() {
  const kicker = "WEB OUTSOURCING ONE";
  const title1 = "합리적인 가격으로";
  const title2 = "완성하는 홈페이지 제작";
  const brand = "WOO";
  const tags = "맞춤 제작 · 반응형 · 기획부터 배포까지";
  const subset = kicker + title1 + title2 + brand + tags;

  const [bold, regular] = await Promise.all([
    loadGoogleFont(700, subset),
    loadGoogleFont(400, subset),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: 84,
          fontFamily: "Noto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: ACCENT,
              marginRight: 18,
            }}
          />
          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              letterSpacing: 6,
              color: MUTED,
            }}
          >
            {kicker}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 80, fontWeight: 700, color: FG, lineHeight: 1.12 }}>
            {title1}
          </div>
          <div style={{ fontSize: 80, fontWeight: 700, color: FG, lineHeight: 1.12 }}>
            {title2}
          </div>
          <div style={{ width: 128, height: 6, background: ACCENT, marginTop: 38 }} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 700, color: FG, letterSpacing: 2 }}>
            {brand}
          </div>
          <div style={{ fontSize: 26, fontWeight: 400, color: MUTED }}>{tags}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Noto", data: bold, weight: 700, style: "normal" },
        { name: "Noto", data: regular, weight: 400, style: "normal" },
      ],
    }
  );
}
