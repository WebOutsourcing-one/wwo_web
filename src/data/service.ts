// 외주 서비스 소개 / 가격 / 절차 등 사이트 전반에서 공유하는 콘텐츠 데이터.
// 카피는 의뢰인 제공 원문을 기준으로 정리했습니다.

/** 배포된 사이트의 정식 URL (OG/canonical/sitemap 등 절대경로 기준). 도메인 변경 시 이 값만 수정하세요. */
export const SITE_URL = "https://woo.it.kr";

export const KAKAO_OPEN_CHAT = "https://open.kakao.com/o/s46m1jvi";

export const CONTACT_EMAIL = "jjong015189c@gmail.com";

export const PORTFOLIO_URL = "https://woo.it.kr/";

/** 홈/상세 상단에서 반복되는 핵심 한 줄 */
export const SERVICE_TAGLINE = "합리적인 가격으로 완성하는 홈페이지 제작";

/** 서비스 개요 — 상세 페이지 도입부 */
export const serviceOverview = {
  tagline: SERVICE_TAGLINE,
  lead: "단순히 템플릿에 텍스트만 바꾸는 홈페이지가 아닙니다.",
  paragraphs: [
    "의뢰인의 소중한 아이디어를 직관적이고 완성도 높은 맞춤형 웹사이트로 구현해 드립니다. 추후 비즈니스가 성장했을 때 언제든 유연하게 대처할 수 있도록 유지보수와 기능 확장에 유리한 구조로 탄탄하게 설계합니다.",
    "기획안이 구체적이지 않아도 괜찮습니다. 친절한 상담을 통해 비즈니스 방향성을 함께 잡아 가며, 일정 준수와 꼼꼼한 마감을 최우선으로 작업해 드리겠습니다.",
    "단순히 템플릿에 붙여넣는 홈페이지가 아니라 커스터마이징 가능하고, 유지보수 및 확장에 유리한 구조로 홈페이지를 구현해 드립니다.",
  ],
} as const;

/** 기본 서비스 — 추가 비용 없이 포함되는 작업 범위 */
export type ServiceItem = { title: string; description: string };

export const basicServices: ServiceItem[] = [
  {
    title: "홈페이지 기획 상담",
    description: "머릿속 아이디어를 구체적인 웹 구조와 메뉴로 구체화해 드립니다.",
  },
  {
    title: "반응형 웹 제작",
    description: "PC, 태블릿, 모바일 등 모든 기기 화면에 최적화된 레이아웃으로 제작합니다.",
  },
  {
    title: "기본 SEO 설정",
    description: "구글, 네이버 등 검색엔진에 사이트가 잘 노출되도록 메타태그를 세팅합니다.",
  },
  {
    title: "배포 지원 & 커스텀 도메인 연결",
    description: "제작 완료 후 전 세계 어디서나 접속 가능하도록 서버 배포 및 도메인을 연동합니다.",
  },
  {
    title: "원본 소스코드 제공",
    description: "작업 완료 후 작업한 모든 소스코드(Repository)를 인도해 드립니다.",
  },
  {
    title: "SSL 보안(HTTPS) 적용",
    description:
      "주소창 자물쇠 표시와 함께 모든 통신을 암호화해 안전하게 연결합니다. (배포 시 기본 제공)",
  },
  {
    title: "납품 후 7일 무료 수정",
    description:
      "납품 후 7일까지 작업 범위 내 문구 변경, 이미지 교체 등 간단한 수정은 무료로 진행해 드립니다.",
  },
  {
    title: "30일 무료 오류 대응",
    description:
      "납품 후 30일까지 오류나 버그가 발견되면 무료로 대응해 드립니다.",
  },
];

/** 사용 기술 스택 — 비개발자도 이해할 수 있는 설명 */
export type TechItem = {
  name: string;
  role: string;
  description: string;
};

export const techStack: TechItem[] = [
  {
    name: "Next.js",
    role: "프론트엔드 · 눈에 보이는 화면",
    description:
      "예쁜 화면을 넘어 네이버·구글에 내 사이트가 잘 검색되도록 하는 최고 수준의 기술(SEO)을 적용합니다. 화면 로딩 속도도 압도적으로 빠릅니다.",
  },
  {
    name: "Nest.js",
    role: "백엔드 · 서버 및 기능 구현",
    description:
      "대기업 시스템처럼 구조가 탄탄하여, 추후 새로운 기능을 추가하거나 사이트를 확장할 때 오류 없이 안정적으로 작동합니다.",
  },
  {
    name: "PostgreSQL",
    role: "데이터베이스 · 데이터 저장소",
    description:
      "회원 정보나 게시글 등 소중한 데이터를 안전하고 무결하게 저장하는 신뢰성 높은 저장소입니다.",
  },
  {
    name: "Redis",
    role: "성능 최적화 · 속도 향상",
    description:
      "자주 찾는 데이터나 복잡한 처리를 임시로 기억해 두어, 사이트 속도를 몇 배 더 빠르게 만들어 줍니다.",
  },
  {
    name: "Nginx",
    role: "웹 서버 · 인프라",
    description:
      "사용자가 사이트에 접속할 때 안전하고 빠르게 연결되도록 문지기 역할을 해주는 검증된 웹 서버 프로그램입니다.",
  },
];

export const techStackNote =
  '"컴퓨터를 잘 몰라서 어떤 기술이 필요한지 모르겠어요" 하셔도 괜찮습니다. 만들고 싶으신 기능에 맞춰, 비용은 가장 아끼면서 성능은 최대치로 낼 수 있는 최적의 조합을 직접 구성해 드립니다.';

/** 유료 서비스 — 선택 사항 (의뢰인 직접 결제 원칙) */
export const paidServices: ServiceItem[] = [
  {
    title: "커스텀 도메인 구매 비용",
    description:
      "개별 도메인 주소(예: mysite.com)가 필요하신 경우 별도의 도메인 구매 및 연간 유지 비용이 발생합니다. 별도 도메인을 연결하지 않으실 경우, 기본 배포 주소(예: your-site.vercel.app, github.io 등)로 무료 생성 및 양도해 드립니다.",
  },
  {
    title: "웹 호스팅(서버) 이용료",
    description:
      "홈페이지를 계속 운영하려면 월 서버(호스팅) 비용이 발생합니다. 정적 홈페이지 기준 월 30,000원부터 시작하며, 데이터베이스·백엔드 기능이 포함되면 서버 사양에 따라 비용이 올라갑니다. 트래픽과 요구사항에 맞춰 가장 합리적인 인프라로 세팅해 드립니다.",
  },
];

/** 구독형 제작 과정 — 상담부터 오픈·유지보수까지 4단계 (상세 페이지용) */
export type ProductionStep = {
  step: number;
  title: string;
  lead: string;
  points: string[];
};

export const productionProcess: ProductionStep[] = [
  {
    step: 1,
    title: "1:1 맞춤 상담",
    lead: "무엇을 만들지 아직 막연하셔도 괜찮습니다. 대화부터 시작합니다.",
    points: [
      "전문 용어는 몰라도 됩니다. 원하시는 느낌이나 참고하고 싶은 사이트를 편하게 말씀해 주세요.",
      "업종과 목적에 맞는 디자인 방향과 필요한 기능을 저희가 먼저 정리해 제안해 드립니다.",
      "기획 단계부터 한 명의 담당자가 끝까지 함께합니다.",
    ],
  },
  {
    step: 2,
    title: "기본 자료 전달",
    lead: "홈페이지에 담을 내용만 주시면, 나머지는 저희가 준비합니다.",
    points: [
      "로고, 업체 소개, 인사말 등 기본 자료를 편하신 방식으로 보내주세요.",
      "보유하신 현장 사진이나 제품 이미지가 있다면 함께 전달해 주시면 됩니다.",
      "이미지가 부족해도 괜찮습니다. 업종에 어울리는 전문 이미지를 무상으로 지원해 드립니다.",
      "이메일이나 메신저 등 편하신 경로로 간편하게 전달하실 수 있습니다.",
    ],
  },
  {
    step: 3,
    title: "맞춤 제작",
    lead: "PC와 모바일 어디서 봐도 깔끔한 사이트를 직접 코딩으로 만듭니다.",
    points: [
      "전달해 주신 자료를 바탕으로 담당 개발자가 직접 제작합니다.",
      "정해진 템플릿을 그대로 쓰지 않고, 브랜드에 맞는 색상과 서체를 적용합니다.",
      "휴대폰에서도 깨짐 없이 보이는 반응형으로 제작됩니다.",
      "제작 중간에 시안을 공유하고, 주신 의견을 반영해 다듬습니다.",
    ],
  },
  {
    step: 4,
    title: "오픈 및 유지보수",
    lead: "완성 이후의 운영과 관리까지 저희가 맡습니다.",
    points: [
      "최종 점검 후 네이버·구글 검색 노출 설정까지 마치고 사이트를 오픈합니다.",
      "오픈 이후 발생하는 오류는 1년 동안 무료로 수정해 드립니다.",
      "트래픽 관리, 서버 안정성, 보안까지 안심하고 맡기실 수 있습니다.",
      "운영은 저희에게 맡기시고, 대표님은 본업에 집중하세요.",
    ],
  },
];

/** 가격 / 패키지 */
export type Package = {
  tier: "SUBSCRIPTION" | "STANDARD" | "LITE" | "DELUXE" | "ENTERPRISE";
  price: number;
  priceLabel: string;
  priceUnit?: string; // 가격 아래 보조 표기 (예: "수정 범위당 +1,000원")
  tagline: string;
  summary: string;
  highlight?: boolean;
  pages: string;
  duration: string;
  revisions: string;
  features: string[];
};

export const packages: Package[] = [
  {
    tier: "SUBSCRIPTION",
    price: 30000,
    priceLabel: "월 30,000원~",
    priceUnit: "제작비 0원 · DB 추가 시 상향",
    tagline: "구독형 홈페이지",
    summary:
      "수백만 원의 초기 제작비 부담을 완전히 없앴습니다. 월 30,000원부터 호스팅, 도메인, 유지보수까지 한 번에 해결되며, 데이터베이스 등 기능이 추가되면 사양에 따라 비용이 올라갑니다.",
    highlight: true,
    pages: "협의",
    duration: "협의",
    revisions: "구독 기간 내 지원",
    features: [
      "초기 제작비 0원",
      "월 30,000원부터 정기 구독",
      "호스팅 · 도메인 · 유지보수 포함",
      "반응형 웹 제작",
    ],
  },
  {
    tier: "STANDARD",
    price: 20000,
    priceLabel: "20,000원",
    priceUnit: "수정 범위당 +1,000원",
    tagline: "홈페이지 수정",
    summary:
      "텍스트 변경, 위치 조정 등 기존 태그 구조를 유지한 단순 수정. 기본 20,000원에 수정 범위당 1,000원씩 합산됩니다.",
    pages: "0페이지",
    duration: "2일",
    revisions: "범위당 +1,000원",
    features: [
      "기존 태그 구조 유지 단순 수정",
      "텍스트 변경 · 위치 조정",
      "기본 20,000원 + 수정 범위당 1,000원",
    ],
  },
  {
    tier: "LITE",
    price: 50000,
    priceLabel: "50,000원",
    tagline: "텍스트 중심 정적 페이지",
    summary:
      "반응형 없이 텍스트로만 구성하는 1페이지 정적 웹 페이지입니다. 빠르게 정보를 올려야 하는 분께 적합합니다.",
    pages: "1페이지",
    duration: "2일",
    revisions: "1회",
    features: [
      "텍스트로만 구성된 1페이지",
      "정적 웹 페이지 (반응형 미적용)",
      "작업일 2일 · 수정 1회",
    ],
  },
  {
    tier: "DELUXE",
    price: 100000,
    priceLabel: "100,000원",
    priceUnit: "페이지 추가당 +30,000원",
    tagline: "문의/예약/신청 기능 포함 웹사이트",
    summary:
      "소개형 홈페이지에 각종 신청 폼, 이메일 알림, 지도/연락처/링크 연결까지 포함한 6페이지 이하 맞춤 사이트입니다.",
    highlight: true,
    pages: "6페이지 이하",
    duration: "7일",
    revisions: "3회",
    features: [
      "5섹션 이하 소개형 페이지",
      "각종 신청/예약/문의 폼",
      "이메일 알림 · 지도/연락처/링크 연결",
      "6페이지 이하 사이트",
      "페이지 추가 시 페이지당 +30,000원",
    ],
  },
  {
    tier: "ENTERPRISE",
    price: 0,
    priceLabel: "별도 견적",
    tagline: "맞춤 웹 서비스 (풀스택)",
    summary:
      "백엔드·데이터베이스·관리자 페이지까지 포함한 풀스택 맞춤 개발. 규모와 요구사항에 따라 상담 후 견적을 안내해 드립니다.",
    pages: "맞춤",
    duration: "협의",
    revisions: "협의",
    features: [
      "백엔드 · DB 구축 (Nest.js · PostgreSQL)",
      "관리자 페이지 · 회원/데이터 관리",
      "Redis · Nginx 성능·인프라 최적화",
      "대규모 트래픽 · 확장 대응 설계",
    ],
  },
];

/** 패키지 비교 표의 행 정의 */
export type ComparisonRow = {
  label: string;
  values: string[]; // packages 순서: SUBSCRIPTION, STANDARD, LITE, DELUXE, ENTERPRISE
};

export const comparisonRows: ComparisonRow[] = [
  { label: "페이지 수", values: ["협의", "0페이지", "1페이지", "6페이지 이하", "맞춤"] },
  { label: "작업일", values: ["협의", "2일", "2일", "7일", "협의"] },
  { label: "수정 횟수", values: ["구독 내 지원", "범위당 +1,000원", "1회", "3회", "협의"] },
  { label: "반응형 웹", values: ["O", "O", "-", "O", "O"] },
  { label: "소스 코드 제공", values: ["-", "옵션", "옵션", "옵션", "O"] },
  { label: "맞춤 디자인 제공", values: ["-", "-", "-", "O", "O"] },
  { label: "문의/예약/신청 폼", values: ["옵션", "-", "-", "O", "O"] },
  { label: "이메일 알림 · 외부 연동", values: ["옵션", "-", "-", "O", "O"] },
  { label: "백엔드 · DB", values: ["-", "-", "-", "-", "O"] },
  { label: "월 정기 구독", values: ["O", "-", "-", "-", "-"] },
  { label: "커스텀 도메인 비용", values: ["포함", "별도", "별도", "별도", "별도"] },
  { label: "웹 호스팅(서버) 비용", values: ["포함", "별도", "별도", "별도", "별도"] },
];

export const pricingNote =
  "모든 패키지는 반응형 웹과 소스 코드 제공 옵션을 선택하실 수 있습니다. 정확한 견적은 작업 범위에 따라 상담 후 안내해 드립니다.";
