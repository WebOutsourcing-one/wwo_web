// 상담 후 고객에게 전달하는 "제작 요청서(브리프)" 양식 정의.
// 질문을 추가·수정할 때는 briefSections 배열만 고치면 화면과 메일 정리본에 함께 반영됩니다.
// 클라이언트(양식 화면)와 서버(메일 발송) 양쪽에서 같이 사용하므로 브라우저/Node 전용 API를 쓰지 않습니다.

export type BriefField = {
  id: string;
  label: string;
  type: "text" | "textarea" | "email" | "tel" | "date" | "radio" | "checks";
  placeholder?: string;
  hint?: string;
  options?: string[];
  /** 보기 외에 직접 입력 칸을 둘지 여부 (radio/checks) */
  allowOther?: boolean;
  /** 보기를 선택하면 추가로 받을 정보 (예: "전화 걸기" → 전화번호) */
  details?: Record<string, BriefDetail>;
};

export type BriefDetail = {
  label: string;
  placeholder?: string;
  /** 여러 줄 입력 (글 붙여넣기 등) */
  multiline?: boolean;
};

export type BriefSection = {
  id: string;
  title: string;
  description?: string;
  fields: BriefField[];
};

/** 첨부 파일 묶음. 시안은 화면 크기별로 따로 받아 반응형 기준이 섞이지 않게 합니다. */
export type FileSlot = {
  id: string;
  label: string;
  range: string;
  guide: string;
  /** 브라우저에서 압축할 때 이미지 최대 가로 폭(px) */
  maxWidth: number;
};

export const designSlots: FileSlot[] = [
  {
    id: "desktop",
    label: "데스크톱",
    range: "1440px 이상",
    guide: "큰 모니터 기준 화면",
    maxWidth: 1920,
  },
  {
    id: "laptop",
    label: "노트북",
    range: "1024 ~ 1439px",
    guide: "13~15인치 노트북 기준 화면",
    maxWidth: 1600,
  },
  {
    id: "mobile",
    label: "모바일",
    range: "360 ~ 430px",
    guide: "스마트폰 세로 화면",
    maxWidth: 1000,
  },
];

export const assetSlot: FileSlot = {
  id: "assets",
  label: "보유 자료",
  range: "로고 · 사진 · 문서",
  guide: "로고, 매장·제품 사진, 소개 문서 등",
  maxWidth: 2400,
};

export const allSlots: FileSlot[] = [...designSlots, assetSlot];

/**
 * Vercel 함수는 요청 하나에 4.5MB까지만 받습니다. 첨부는 이 한도 안의 묶음으로 나눠
 * 여러 번 보내고, 묶음마다 메일 한 통씩 발송합니다 (서버에는 저장하지 않음).
 */
export const BATCH_BYTES = 3.8 * 1024 * 1024;
/** 요청서 하나당 첨부 총량 · 개수 상한 (메일 약 6통 분량) */
export const MAX_TOTAL_BYTES = 22 * 1024 * 1024;
export const MAX_FILES = 60;
export const ACCEPTED_FILE_TYPES = "image/*,application/pdf";

export const briefSections: BriefSection[] = [
  {
    id: "basic",
    title: "기본 정보",
    fields: [
      { id: "brand", label: "상호 · 브랜드명", type: "text", placeholder: "예: WOO (Web Outsourcing One)" },
      { id: "name", label: "담당자 성함", type: "text" },
      { id: "phone", label: "연락처", type: "tel", placeholder: "010-0000-0000" },
      { id: "email", label: "이메일", type: "email" },
      {
        id: "industry",
        label: "업종",
        type: "text",
        placeholder: "예: 홈페이지 외주 제작",
      },
      {
        id: "current",
        label: "현재 운영 중인 사이트 · SNS",
        type: "textarea",
        placeholder: "기존 홈페이지, 인스타그램, 블로그, 스마트스토어 주소 등",
      },
    ],
  },
  {
    id: "goal",
    title: "목적과 고객",
    description: "사이트가 무엇을 해 주길 바라는지 알면 구성과 문구 방향을 정하기 쉽습니다.",
    fields: [
      {
        id: "purpose",
        label: "사이트를 만드는 목적",
        type: "checks",
        options: [
          "회사 · 브랜드 소개",
          "제품 · 서비스 홍보",
          "문의 · 예약 받기",
          "포트폴리오 · 작업물 소개",
          "이벤트 · 프로모션",
          "채용",
        ],
        details: {
          "제품 · 서비스 홍보": {
            label: "홍보할 제품 · 서비스",
            placeholder: "예: 랜딩페이지 제작, 유지보수",
          },
          "이벤트 · 프로모션": {
            label: "이벤트 내용 · 기간",
            placeholder: "예: 12월 한 달간 첫 제작 10% 할인",
          },
          "채용": {
            label: "채용 분야 · 공고 링크",
            placeholder: "예: 프론트엔드 개발자, 채용 공고 링크",
          },
        },
        allowOther: true,
      },
      {
        id: "target",
        label: "주요 고객층",
        type: "textarea",
        placeholder: "예: 홈페이지가 필요한 소상공인, 1인 사업자",
      },
      {
        id: "action",
        label: "사이트에 들어갔으면 하는 행동",
        type: "checks",
        hint: "선택하시면 연결할 번호나 주소를 적는 칸이 나타납니다. 모르시면 비워 두셔도 됩니다.",
        options: [
          "전화 걸기",
          "문자 보내기",
          "카카오톡 문의",
          "문의 폼 작성",
          "예약하기",
          "매장 방문 (지도 · 길찾기)",
          "온라인 구매",
          "SNS 팔로우",
          "블로그 · 유튜브 보기",
        ],
        details: {
          "전화 걸기": { label: "전화번호", placeholder: "예: 02-000-0000" },
          "문자 보내기": { label: "문자 받을 번호", placeholder: "예: 010-0000-0000" },
          "카카오톡 문의": {
            label: "카카오톡 채널 · 오픈채팅 링크",
            placeholder: "예: https://open.kakao.com/o/...",
          },
          "문의 폼 작성": { label: "문의를 받을 이메일", placeholder: "예: contact@woo.it.kr" },
          "예약하기": {
            label: "예약 페이지 링크",
            placeholder: "네이버 예약, 캐치테이블 등 (없으면 비워 두세요)",
          },
          "매장 방문 (지도 · 길찾기)": {
            label: "매장 주소",
            placeholder: "예: 서울 ○○구 ○○로 00, 2층",
          },
          "온라인 구매": {
            label: "구매 페이지 링크",
            placeholder: "스마트스토어, 쿠팡, 자사몰 등",
          },
          "SNS 팔로우": {
            label: "SNS 주소",
            placeholder: "인스타그램, 페이스북 등 (여러 개면 쉼표로)",
          },
          "블로그 · 유튜브 보기": {
            label: "블로그 · 유튜브 주소",
            placeholder: "여러 개면 쉼표로",
          },
        },
        allowOther: true,
      },
      {
        id: "strength",
        label: "다른 곳과 다른 우리만의 강점",
        type: "textarea",
        placeholder: "예: 템플릿이 아닌 맞춤 제작, 소스 코드 전부 제공",
      },
    ],
  },
  {
    id: "structure",
    title: "페이지 구성",
    fields: [
      {
        id: "layout",
        label: "사이트 형태",
        type: "radio",
        options: ["한 페이지 (스크롤형 랜딩)", "여러 페이지 (메뉴 이동형)", "잘 모르겠어요"],
      },
      {
        id: "sections",
        label: "필요한 페이지 · 섹션",
        type: "checks",
        options: [
          "메인 소개",
          "회사 · 브랜드 소개",
          "서비스 · 메뉴",
          "가격표",
          "포트폴리오 · 갤러리",
          "고객 후기",
          "자주 묻는 질문",
          "오시는 길",
          "문의하기",
        ],
        details: {
          "회사 · 브랜드 소개": {
            label: "소개 내용",
            placeholder: "설립 연도, 대표 인사말, 연혁 등",
            multiline: true,
          },
          "서비스 · 메뉴": {
            label: "서비스 · 메뉴 항목",
            placeholder: "예: 웹 제작, 풀스택 개발, 유지보수",
            multiline: true,
          },
          "가격표": {
            label: "가격 정보",
            placeholder: "예: 웹 제작 300,000원~, 유지보수 월 30,000원~",
            multiline: true,
          },
          "포트폴리오 · 갤러리": {
            label: "넣을 작업물 · 사진",
            placeholder: "작업물 이름이나 링크 (사진은 아래 '보유 자료'에 올려 주세요)",
            multiline: true,
          },
          "고객 후기": {
            label: "후기 내용 · 출처",
            placeholder: "후기 문구, 또는 네이버 리뷰 · 블로그 링크",
            multiline: true,
          },
          "자주 묻는 질문": {
            label: "질문과 답변",
            placeholder: "Q. 제작 기간은 얼마나 걸리나요?\nA. 보통 7일 정도 걸립니다.",
            multiline: true,
          },
          "오시는 길": {
            label: "주소 · 교통 안내",
            placeholder: "예: 서울 ○○구 ○○로 00, ○○역 2번 출구 도보 5분",
          },
        },
        allowOther: true,
      },
      {
        id: "features",
        label: "필요한 기능",
        type: "checks",
        hint: "전화 · 카톡 · 지도 · 문의 폼 같은 연결 기능은 위 '목적과 고객'에서 고르시면 됩니다. (풀스택) 표시는 정보가 저장되는 기능이라 별도 견적입니다.",
        options: [
          "팝업 · 공지 배너",
          "사진 갤러리 · 슬라이드",
          "영상 넣기",
          "다국어 (영문 등)",
          "회원가입 · 로그인 (풀스택)",
          "예약 · 결제 내역 저장 (풀스택)",
          "게시판 · 공지 직접 작성 (풀스택)",
        ],
        details: {
          "팝업 · 공지 배너": { label: "팝업 · 공지 내용", placeholder: "예: 연말 휴무 안내" },
          "사진 갤러리 · 슬라이드": {
            label: "넣을 사진 설명",
            placeholder: "예: 작업 사례 10장 (사진은 아래 '보유 자료'에 올려 주세요)",
          },
          "영상 넣기": { label: "영상 링크", placeholder: "유튜브 링크 등" },
          "다국어 (영문 등)": { label: "필요한 언어", placeholder: "예: 영어, 일본어" },
        },
        allowOther: true,
      },
    ],
  },
  {
    id: "design",
    title: "디자인",
    fields: [
      {
        id: "mood",
        label: "원하는 분위기",
        type: "checks",
        options: [
          "깔끔한",
          "고급스러운",
          "따뜻한",
          "신뢰감 있는",
          "트렌디한",
          "귀엽고 발랄한",
          "미니멀한",
          "화려한",
        ],
        allowOther: true,
      },
      {
        id: "colors",
        label: "원하는 색상",
        type: "text",
        placeholder: "예: 베이지 바탕에 붉은 주황 포인트, #B6361C",
      },
      {
        id: "references",
        label: "참고 사이트와 마음에 드는 점",
        type: "textarea",
        placeholder: "https://... - 사진을 크게 쓰는 점이 좋아요",
      },
      {
        id: "avoid",
        label: "피하고 싶은 스타일",
        type: "textarea",
        placeholder: "예: 너무 어두운 화면, 글씨가 작은 디자인",
      },
      {
        id: "logo",
        label: "로고",
        type: "radio",
        options: ["있음", "있지만 다듬고 싶음", "없음"],
        details: {
          "있음": {
            label: "로고 파일 링크",
            placeholder: "파일은 아래 '보유 자료'에 올리셔도 됩니다",
          },
          "있지만 다듬고 싶음": {
            label: "다듬고 싶은 점",
            placeholder: "예: 글씨를 더 굵게, 색만 바꾸고 싶어요",
          },
          "없음": {
            label: "원하는 로고 느낌",
            placeholder: "예: 글자만 있는 심플한 로고 (제작 여부는 상담 때 안내)",
          },
        },
      },
    ],
  },
  {
    id: "content",
    title: "자료 준비",
    description: "아래 '보유 자료' 칸에서 로고와 사진을 바로 올리실 수 있습니다.",
    fields: [
      {
        id: "copy",
        label: "사이트에 들어갈 글 (소개 문구 등)",
        type: "radio",
        options: ["준비되어 있음", "일부만 있음", "없음 (작성 도움 필요)"],
        details: {
          "준비되어 있음": {
            label: "글 내용 · 문서 링크",
            placeholder:
              "소개 문구를 그대로 붙여넣거나 구글 문서 · 노션 링크를 적어 주세요.\n파일은 아래 '보유 자료'에 올리셔도 됩니다.",
            multiline: true,
          },
          "일부만 있음": {
            label: "있는 글과 도움이 필요한 부분",
            placeholder: "있는 글을 붙여넣고, 도움이 필요한 부분을 적어 주세요.\n예: 인사말은 있고, 서비스 설명은 작성 도움 필요",
            multiline: true,
          },
          "없음 (작성 도움 필요)": {
            label: "글에 꼭 담고 싶은 내용",
            placeholder: "키워드만 적어 주셔도 됩니다. 예: 빠른 작업, 합리적인 가격, 꼼꼼한 마감",
            multiline: true,
          },
        },
      },
      {
        id: "photos",
        label: "사진",
        type: "radio",
        options: ["직접 촬영한 사진 있음", "일부만 있음", "없음 (어울리는 무료 이미지 사용)"],
        details: {
          "직접 촬영한 사진 있음": {
            label: "사진 공유 링크",
            placeholder: "구글 드라이브 등 링크 (파일은 아래 '보유 자료'에 올리셔도 됩니다)",
          },
          "일부만 있음": {
            label: "있는 사진과 필요한 사진",
            placeholder: "예: 작업 사례 사진은 있고, 대표 프로필 사진이 필요해요",
          },
          "없음 (어울리는 무료 이미지 사용)": {
            label: "원하는 이미지 느낌",
            placeholder: "예: 밝고 깔끔한 사무실 분위기",
          },
        },
      },
      {
        id: "mustHave",
        label: "꼭 들어가야 하는 정보",
        type: "textarea",
        placeholder: "주소, 영업시간, 사업자 정보, 꼭 넣고 싶은 문구 등",
      },
    ],
  },
  {
    id: "operate",
    title: "도메인 · 운영",
    fields: [
      {
        id: "domain",
        label: "도메인 (사이트 주소)",
        type: "radio",
        options: ["이미 보유 중", "새로 구매 필요", "잘 모르겠어요"],
        details: {
          "이미 보유 중": {
            label: "도메인 주소 · 구매처",
            placeholder: "예: woo.it.kr (가비아)",
          },
        },
        // 원하는 주소를 미리 받지 않음: 주소에 따라 가격이 크게 달라져 상담 때 비용과 함께 정합니다.
        hint: "새로 구매하시는 경우, 주소에 따라 가격이 달라 상담 때 비용과 함께 골라 드립니다.",
      },
      {
        id: "maintenance",
        label: "완성 후 관리",
        type: "radio",
        options: ["유지보수로 맡기고 싶어요 (월 30,000원~)", "직접 관리할게요", "상담 후 결정"],
      },
    ],
  },
  {
    id: "schedule",
    title: "일정 · 예산",
    fields: [
      { id: "deadline", label: "희망 오픈일", type: "date" },
      {
        id: "deadlineReason",
        label: "일정이 정해진 이유",
        type: "text",
        placeholder: "예: 매장 오픈, 행사 일정",
      },
      {
        id: "budget",
        label: "예산",
        type: "radio",
        options: ["30만원 내외", "30 ~ 50만원", "50 ~ 100만원", "100만원 이상", "상담 후 결정"],
      },
      {
        id: "extra",
        label: "그 밖에 하고 싶은 말씀",
        type: "textarea",
      },
    ],
  },
];

/** 답변 값. 체크박스는 배열, 나머지는 문자열. "직접 입력"은 `${id}__other` 키에 저장합니다. */
export type BriefAnswers = Record<string, string | string[]>;

export const otherKey = (fieldId: string) => `${fieldId}__other`;
export const detailKey = (fieldId: string, option: string) => `${fieldId}.detail.${option}`;
export const slotUrlKey = (slotId: string) => `slot.${slotId}.url`;
export const slotNoteKey = (slotId: string) => `slot.${slotId}.note`;

const str = (v: string | string[] | undefined) =>
  typeof v === "string" ? v.trim() : "";

function readFieldValues(answers: BriefAnswers, field: BriefField): string[] {
  const raw = answers[field.id];
  const values = (Array.isArray(raw) ? raw : raw ? [raw] : [])
    .filter(Boolean)
    .map((option) => {
      if (!field.details?.[option]) return option;
      const detail = str(answers[detailKey(field.id, option)]);
      if (!detail) return option;
      // 여러 줄 글은 하위 목록 아래 인용문으로 들여 써서 Markdown 구조가 깨지지 않게 합니다.
      if (detail.includes("\n")) {
        return `${option}\n${detail
          .split("\n")
          .map((line) => `    > ${line}`)
          .join("\n")}`;
      }
      return `${option} (${detail})`;
    });
  const other = answers[otherKey(field.id)];
  if (typeof other === "string" && other.trim()) values.push(`기타: ${other.trim()}`);
  return values.map((v) => v.trim()).filter(Boolean);
}

/** 첨부 파일명 정리: 경로·제어 문자 제거, 길이 제한 */
export const sanitizeFilename = (name: string) =>
  name
    .replace(/[\\/:*?"<>|\u0000-\u001f]/g, "_")
    .replace(/\s+/g, "_")
    .slice(-90);

/** 같은 폴더에 내려받은 첨부를 .md 안에서 바로 보이게 하는 링크 */
const fileLink = (name: string) => {
  const target = `<${name}>`; // 공백·괄호가 있어도 깨지지 않는 CommonMark 표기
  return /\.pdf$/i.test(name) ? `[${name}](${target})` : `![${name}](${target})`;
};

const pushFiles = (lines: string[], files: string[]) => {
  if (!files.length) return;
  lines.push("- 첨부:", "");
  for (const f of files) lines.push(`  ${fileLink(f)}`, "");
};

/** 메일 본문과 brief.md 첨부에 쓰는 정리본 */
export function buildBriefMarkdown(
  answers: BriefAnswers,
  filesBySlot: Record<string, string[]>,
  submittedAt: Date,
  parts = 1
): string {
  const lines: string[] = [];
  const brand = str(answers.brand) || "(상호 미입력)";
  lines.push(`# 웹 제작 요청서 - ${brand}`, "");
  lines.push(
    `제출 시각: ${submittedAt.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`,
    ""
  );
  if (parts > 1) {
    lines.push(
      `> 첨부 파일이 메일 ${parts}통에 나뉘어 있습니다. 모두 같은 폴더에 내려받으면 이 문서 안에서 이미지가 보입니다.`,
      ""
    );
  }

  const empty: string[] = [];

  for (const section of briefSections) {
    lines.push(`## ${section.title}`, "");
    for (const field of section.fields) {
      const values = readFieldValues(answers, field);
      const value = values.join(", ");
      if (!value) empty.push(`${section.title} > ${field.label}`);
      const shown = value
        ? field.details
          ? `\n${values.map((v) => `  - ${v}`).join("\n")}`
          : field.type === "textarea"
          ? `\n\n${value
              .split("\n")
              .map((l) => `> ${l}`)
              .join("\n")}\n`
          : value
        : "_미입력 (임의 진행)_";
      lines.push(`- **${field.label}**: ${shown}`);
    }
    lines.push("");
  }

  lines.push("## 화면별 시안", "");
  for (const slot of designSlots) {
    const url = str(answers[slotUrlKey(slot.id)]);
    const note = str(answers[slotNoteKey(slot.id)]);
    const files = filesBySlot[slot.id] ?? [];
    lines.push(`### ${slot.label} (${slot.range})`, "");
    if (!url && !note && files.length === 0) {
      lines.push("_없음 - 다른 화면 기준으로 맞춰 제작_", "");
      continue;
    }
    if (url) lines.push(`- 링크: ${url}`);
    if (note) lines.push(`- 메모: ${note}`);
    pushFiles(lines, files);
    lines.push("");
  }

  const assetFiles = filesBySlot[assetSlot.id] ?? [];
  const assetUrl = str(answers[slotUrlKey(assetSlot.id)]);
  const assetNote = str(answers[slotNoteKey(assetSlot.id)]);
  lines.push(`## ${assetSlot.label}`, "");
  if (assetUrl) lines.push(`- 링크: ${assetUrl}`);
  if (assetNote) lines.push(`- 메모: ${assetNote}`);
  pushFiles(lines, assetFiles);
  if (!assetUrl && !assetFiles.length && !assetNote) lines.push("_없음_");
  lines.push("");

  if (empty.length) {
    lines.push(`## 미입력 항목 (${empty.length}개 · 임의 진행 가능)`, "");
    for (const e of empty) lines.push(`- ${e}`);
    lines.push("");
  }

  return lines.join("\n");
}
