// 서버 전용: 요청서 링크(/brief/<토큰>)의 비밀 토큰 검사.
import { timingSafeEqual } from "node:crypto";

/**
 * 요청서 주소의 비밀 토큰 (임시로 코드에 둠).
 * 주의: 저장소가 공개라 GitHub에서 이 값이 보입니다. 운영 시에는 환경변수
 * BRIEF_TOKEN을 설정하세요 - 설정하면 코드 수정 없이 그 값이 우선 적용됩니다.
 * 링크가 새어 나가면 이 값을 바꾸면 기존 링크가 즉시 무효가 됩니다.
 */
export const BRIEF_TOKEN = "vUZL_bXipK_P2nv0DaY5jUWC";

export function isValidBriefToken(token: string | null | undefined): boolean {
  const expected = process.env.BRIEF_TOKEN || BRIEF_TOKEN;
  if (!expected || !token) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
