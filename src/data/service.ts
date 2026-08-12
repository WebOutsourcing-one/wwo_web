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
      "홈페이지를 계속 켜 두려면 매달 서버(호스팅) 비용이 발생합니다. 유지보수 플랜(월 30,000원~)을 이용하시면 이 비용과 운영 관리가 함께 해결되며, 데이터베이스·백엔드 기능이 붙으면 서버 사양에 따라 금액이 올라갑니다. 트래픽과 요구사항에 맞춰 가장 합리적인 인프라로 세팅해 드립니다.",
  },
];

/** 제작 과정 — 상담부터 오픈·유지보수까지 4단계 (상세 페이지용) */
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
      "오픈 후 30일 동안 발생하는 오류는 무료로 수정해 드립니다.",
      "이후 운영은 유지보수 플랜(월 30,000원~)으로 이어서 맡아 드립니다.",
      "트래픽 관리, 서버 안정성, 보안까지 안심하고 맡기시고 본업에 집중하세요.",
    ],
  },
];

/** 가격 / 패키지 */
export type Package = {
  tier: "MAINTENANCE" | "FEATURE" | "WEBSITE" | "FULLSTACK";
  price: number;
  priceLabel: string;
  priceUnit?: string; // 가격 아래 보조 표기 (예: "페이지 추가당 +30,000원")
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
    tier: "MAINTENANCE",
    price: 30000,
    priceLabel: "월 30,000원~",
    priceUnit: "호스팅 연결 · 사이트 운영 관리",
    tagline: "유지보수 플랜",
    summary:
      "완성된 홈페이지를 계속 켜 두고 관리해 드립니다. 서버(호스팅) 연결과 도메인·보안 세팅을 맡아 사이트가 멈추지 않도록 상시 운영하며, 오류가 생기면 바로 대응합니다. 서버 사양과 트래픽에 따라 금액이 올라갑니다.",
    pages: "기존 사이트",
    duration: "상시 운영",
    revisions: "간단 수정 지원",
    features: [
      "웹 호스팅(서버) 연결 · 배포 관리",
      "도메인 · SSL 보안(HTTPS) 유지",
      "사이트 상시 운영 · 접속 오류 대응",
      "문구 · 이미지 등 간단 수정",
    ],
  },
  {
    tier: "FEATURE",
    price: 50000,
    priceLabel: "50,000원~",
    priceUnit: "기능 1건 기준 · 범위에 따라 산정",
    tagline: "기능 추가",
    summary:
      "이미 운영 중인 사이트에 필요한 기능만 골라서 붙입니다. 문의 폼, 페이지 추가, 팝업·배너, 지도·SNS 연동 등을 기존 디자인에 맞춰 자연스럽게 얹어 드립니다.",
    pages: "추가분",
    duration: "3일~",
    revisions: "2회",
    features: [
      "페이지 · 섹션 추가",
      "문의 · 예약 · 신청 폼 추가",
      "팝업 · 배너 · 슬라이드 등 화면 기능",
      "지도 · SNS · 외부 서비스 연동",
      "기존 디자인 톤에 맞춘 작업",
    ],
  },
  {
    tier: "WEBSITE",
    price: 200000,
    priceLabel: "200,000원~",
    priceUnit: "페이지 추가당 +30,000원",
    tagline: "웹 제작 플랜",
    summary:
      "손님에게 보여지는 화면을 처음부터 맞춤 제작합니다. 회사·매장·서비스를 소개하고 문의를 받는 데 필요한 모든 것이 들어갑니다. 회원가입이나 예약 내역 저장처럼 정보가 쌓여야 하는 기능은 아래 풀스택 개발로 안내해 드립니다.",
    highlight: true,
    pages: "6페이지 이하",
    duration: "7일~",
    revisions: "3회",
    features: [
      "맞춤 디자인 · 반응형 웹 제작",
      "6페이지 이하 소개형 홈페이지",
      "문의 · 예약 · 신청 폼 (접수 내용 이메일 알림)",
      "지도 · 연락처 · SNS 연결",
      "기본 SEO 설정 · 배포 · 소스 코드 제공",
    ],
  },
  {
    tier: "FULLSTACK",
    price: 0,
    priceLabel: "별도 견적",
    priceUnit: "기능 범위에 따라 상담 후 산정",
    tagline: "풀스택 개발",
    summary:
      "정보가 저장되고 움직이는 서비스를 만듭니다. 회원 관리, 예약·주문, 게시판, 관리자 페이지처럼 화면 뒤에서 데이터를 처리하는 서버와 저장소까지 함께 구축합니다.",
    pages: "맞춤",
    duration: "협의",
    revisions: "협의",
    features: [
      "서버(백엔드) · 데이터베이스 구축",
      "회원가입 · 로그인 · 권한 관리",
      "예약 · 주문 · 결제 등 거래 기능",
      "관리자 페이지에서 직접 콘텐츠 관리",
      "대용량 트래픽 · 확장 대비 설계",
    ],
  },
];

/** 패키지 비교 표의 행 정의 */
export type ComparisonRow = {
  label: string;
  values: string[]; // packages 순서: MAINTENANCE, FEATURE, WEBSITE, FULLSTACK
};

export const comparisonRows: ComparisonRow[] = [
  {
    label: "대상",
    values: ["운영 중인 사이트", "운영 중인 사이트", "새로 제작", "새로 제작"],
  },
  { label: "페이지 수", values: ["기존 유지", "추가분", "6페이지 이하", "맞춤"] },
  { label: "작업일", values: ["상시 운영", "3일~", "7일~", "협의"] },
  { label: "수정 횟수", values: ["플랜 내 지원", "2회", "3회", "협의"] },
  { label: "화면 개발 (프론트엔드)", values: ["-", "O", "O", "O"] },
  { label: "반응형 웹 (PC · 모바일)", values: ["기존 유지", "O", "O", "O"] },
  { label: "맞춤 디자인", values: ["-", "-", "O", "O"] },
  { label: "문의 · 예약 · 신청 폼", values: ["-", "옵션", "O", "O"] },
  { label: "서버 · 데이터베이스 (백엔드)", values: ["-", "-", "-", "O"] },
  { label: "로그인 · 회원 관리", values: ["-", "-", "-", "O"] },
  { label: "관리자 페이지", values: ["-", "-", "-", "O"] },
  { label: "호스팅(서버) 연결 · 운영", values: ["O", "-", "옵션", "옵션"] },
  { label: "소스 코드 제공", values: ["-", "O", "O", "O"] },
];

export const pricingNote =
  "표시된 금액은 시작 가격입니다. 페이지 수와 기능 범위에 따라 최종 금액이 달라지며, 상담 후 정확한 견적을 먼저 안내해 드린 뒤 진행합니다.";

/**
 * 웹 제작(프론트엔드)과 풀스택 개발의 차이를 비개발자 기준으로 설명하는 가이드.
 * 두 플랜의 가격 차이가 어디서 오는지 묻는 문의가 많아 가격표 하단에 상시 노출합니다.
 */
export type ScopeGuide = {
  key: "WEBSITE" | "FULLSTACK";
  badge: string;
  title: string;
  lead: string;
  examples: string[];
  note: string;
};

export const scopeGuideIntro =
  "가격 차이는 '화면만 만드느냐, 화면 뒤의 시스템까지 만드느냐'에서 갈립니다. 매장에 비유하면 웹 제작은 잘 꾸며진 매장이고, 풀스택은 그 매장에 창고와 계산대, 장부까지 함께 만드는 일입니다.";

export const scopeGuide: ScopeGuide[] = [
  {
    key: "WEBSITE",
    badge: "웹 제작 플랜 · 200,000원~",
    title: "보여주는 사이트",
    lead: "손님에게 보여지는 화면을 만듭니다. 정해진 내용을 보여주고, 문의를 받는 데까지입니다.",
    examples: [
      "회사 · 병원 · 학원 · 매장 소개 홈페이지",
      "제품 · 서비스 소개와 상세 페이지",
      "문의 · 예약 신청 폼 (접수 내용은 이메일로 전달)",
      "지도 · 전화 · 인스타그램 등 바로 연결",
    ],
    note: "들어온 내용이 사이트 안에 쌓이지는 않습니다. 문구나 사진을 바꾸는 일은 저희가 대신 처리해 드립니다.",
  },
  {
    key: "FULLSTACK",
    badge: "풀스택 개발 · 별도 견적",
    title: "정보가 쌓이고 움직이는 사이트",
    lead: "손님이 남긴 정보를 저장하고, 대표님이 직접 관리하는 시스템까지 만듭니다.",
    examples: [
      "회원가입 · 로그인 · 마이페이지",
      "예약 · 주문 · 결제와 실시간 현황 관리",
      "게시판 · 후기 · 채팅 등 손님이 글을 남기는 기능",
      "관리자 페이지에서 상품 · 글 · 회원 직접 관리",
    ],
    note: "정보를 담아 둘 창고(데이터베이스)와 그 정보를 처리할 서버가 함께 필요합니다. 만들 기능에 따라 규모가 달라져 견적으로 안내드립니다.",
  },
];

export const scopeGuideRule =
  "한 줄 구분법 — 사이트에 들어온 정보가 저장되어야 하거나, 대표님이 관리자 화면에서 직접 내용을 바꿔야 한다면 풀스택입니다. 정해진 내용을 보여주고 문의만 받으면 된다면 웹 제작 플랜으로 충분합니다.";
