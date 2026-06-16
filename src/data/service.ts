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
      "초기 제작 및 운영 초기(사용자가 적은 경우)에는 무료 혹은 최소한의 비용으로 운영 가능한 최적의 인프라로 세팅해 드립니다. 다만 추후 사이트가 확장되거나 대량의 트래픽이 발생할 경우 호스팅 서버 비용이 청구될 수 있습니다.",
  },
];

/** 서비스 제공 절차 — 6단계 */
export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "사전 상담 및 견적 확인",
    description:
      "준비하신 레퍼런스, 기획안, 필요한 기능들을 공유해 주시면 작업 범위와 일정을 조율한 뒤 최종 견적을 안내해 드립니다.",
  },
  {
    step: 2,
    title: "견적 확정 및 결제",
    description:
      "협의된 견적이 확정되면 결제를 진행합니다. 결제가 확인된 후 본격적인 기획 및 개발 작업이 시작됩니다.",
  },
  {
    step: 3,
    title: "요구사항 구체화 및 개발 진행",
    description:
      "보내주신 자료를 바탕으로 화면의 전체 구조(와이어프레임)와 핵심 메뉴, 백엔드/데이터베이스 시스템 구축을 진행합니다. 중요한 진행 상황은 수시로 공유해 드립니다.",
  },
  {
    step: 4,
    title: "1차 결과물 피드백 및 수정",
    description:
      "개발이 완료된 웹사이트를 임시 링크로 전달해 드립니다. 직접 테스트해 보신 후 오타 수정, 레이아웃 미세 조정 등의 피드백을 주시면 신속하게 반영합니다.",
  },
  {
    step: 5,
    title: "서버 배포 및 도메인 연결",
    description:
      "최종 컨펌이 완료되면 준비된 서버(호스팅)에 웹사이트를 정식 배포하고, 커스텀 도메인을 연결하여 접속 가능한 상태로 만듭니다.",
  },
  {
    step: 6,
    title: "최종 납품 및 마무리",
    description:
      "최종 결과물을 전달드리고 구매를 확정해 주시면 프로젝트가 성공적으로 마무리됩니다.",
  },
];

/** 의뢰인 준비 사항 */
export type PrepItem = { title: string; description: string };

export const clientPrep: PrepItem[] = [
  {
    title: "기본 정보",
    description:
      "제작 목적, 필요 페이지 수, 원하는 디자인 & 무드, 필요한 기능을 간단히 정리해 주세요.",
  },
  {
    title: "참고용 레퍼런스 사이트 (필수)",
    description:
      '"이 사이트와 비슷하게 만들어 주세요"라고 하실 만한 타사 웹사이트 링크 1~2개를 보여주세요. 벤치마킹하고 싶은 디자인이나 기능이 있다면 구체적일수록 좋습니다.',
  },
  {
    title: "서비스 기획서 및 메뉴 구조도",
    description:
      "사이트에 들어갈 전체 메뉴(예: 홈, 회사 소개, 서비스 안내, 고객 문의)와 각 화면에 들어갈 텍스트/기능을 정리한 문서가 필요합니다. 메모장, 파워포인트, 피그마 등 어떤 형태든 괜찮습니다.",
  },
  {
    title: "사이트 내 텍스트 및 이미지 자료",
    description:
      "로고 파일, 회사 소개 글, 상품 설명, 대표 이미지 등 웹사이트에 직접 삽입될 실제 콘텐츠 자료를 준비해 주세요.",
  },
  {
    title: "도메인 및 호스팅 계정 (유료 서비스 신청 시)",
    description:
      "개별 커스텀 도메인이나 유료 서버를 사용하실 예정이라면, 해당 사이트(가비아, AWS 등)의 계정 정보를 공유해 주셔야 배포 및 연결 지원이 가능합니다.",
  },
];

export const clientPrepNote =
  "아직 구체적이지 않다면 편하게 말씀해 주세요. 상담을 통해 함께 채워 나갈 수 있습니다.";

/** 가격 / 패키지 */
export type Package = {
  tier: "STANDARD" | "DELUXE" | "PREMIUM" | "ENTERPRISE";
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
    tier: "DELUXE",
    price: 100000,
    priceLabel: "100,000원",
    priceUnit: "페이지 추가당 +30,000원",
    tagline: "간단한 소개형 웹 페이지",
    summary: "소규모 · 개인 브랜드를 위한 5섹션 이하 소개형 홈페이지",
    highlight: true,
    pages: "1페이지~",
    duration: "3일",
    revisions: "1회",
    features: [
      "5섹션 이하 소개형 페이지",
      "페이지 추가 시 페이지당 +30,000원",
      "문의 바로가기 링크",
      "소규모 · 개인 브랜드 추천",
    ],
  },
  {
    tier: "PREMIUM",
    price: 200000,
    priceLabel: "200,000원",
    tagline: "문의/예약/신청 기능 포함 웹사이트",
    summary: "각종 신청 폼, 이메일 알림, 지도/연락처/링크 연결이 포함된 6페이지 이하 사이트",
    pages: "5페이지",
    duration: "7일",
    revisions: "3회",
    features: [
      "각종 신청/예약/문의 폼",
      "이메일 알림 · 지도/연락처/링크 연결",
      "6페이지 이하 사이트",
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
  values: string[]; // packages 순서: STANDARD, DELUXE, PREMIUM, ENTERPRISE
};

export const comparisonRows: ComparisonRow[] = [
  { label: "페이지 수", values: ["0페이지", "1페이지~", "5페이지", "맞춤"] },
  { label: "작업일", values: ["2일", "3일", "7일", "협의"] },
  { label: "수정 횟수", values: ["범위당 +1,000원", "1회", "3회", "협의"] },
  { label: "반응형 웹", values: ["O", "O", "O", "O"] },
  { label: "소스 코드 제공", values: ["옵션", "옵션", "옵션", "O"] },
  { label: "맞춤 디자인 제공", values: ["-", "-", "O", "O"] },
  { label: "백엔드 · DB", values: ["-", "-", "-", "O"] },
];

export const pricingNote =
  "모든 패키지는 반응형 웹과 소스 코드 제공 옵션을 선택하실 수 있습니다. 정확한 견적은 작업 범위에 따라 상담 후 안내해 드립니다.";
