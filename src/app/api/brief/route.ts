// 제작 요청서 제출 → 메일 발송. 서버에는 아무것도 저장하지 않습니다.
//
// Vercel 요청 한도(4.5MB) 때문에 첨부는 브라우저가 여러 묶음으로 나눠 보냅니다.
//   1번 묶음: 답변 + 전체 첨부 목록(manifest) + 첫 파일들 → 정리본(.md/.json)이 담긴 첫 메일
//   2번~   : 나머지 파일들 → 같은 제목의 메일로 이어서 발송 (Gmail에서 한 대화로 묶임)
// 메일 발송 설정은 src/lib/mailer.ts 참고.

import {
  allSlots,
  BATCH_BYTES,
  buildBriefMarkdown,
  sanitizeFilename,
  type BriefAnswers,
} from "@/lib/brief";
import { isValidBriefToken } from "@/lib/brief-token";
import { MailNotConfiguredError, sendMail, type MailAttachment } from "@/lib/mailer";

export const runtime = "nodejs";
// 4MB 가까운 첨부를 SMTP로 보내는 데 몇 초가 걸릴 수 있어, 기본 실행 시간보다 넉넉히 잡습니다.
export const maxDuration = 60;

/** 요청 본문 상한 (Vercel 4.5MB 한도 안쪽) */
const MAX_REQUEST_BYTES = 4.4 * 1024 * 1024;
const MAX_PARTS = 20;

const json = (status: number, body: Record<string, unknown>) =>
  Response.json(body, { status });

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const toHtml = (text: string) =>
  `<pre style="white-space:pre-wrap;font-family:-apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;font-size:14px;line-height:1.7">${escapeHtml(text)}</pre>`;

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function parseJsonObject<T>(raw: FormDataEntryValue | null): T | null {
  try {
    const parsed = JSON.parse(raw?.toString() ?? "");
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
      ? (parsed as T)
      : null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_REQUEST_BYTES) {
    return json(413, { error: "한 번에 보내는 용량이 너무 큽니다." });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json(400, { error: "요청을 읽지 못했습니다." });
  }

  if (!isValidBriefToken(form.get("token")?.toString())) {
    return json(403, { error: "유효하지 않은 링크입니다." });
  }

  // 봇 차단용 숨김 칸 - 사람에게는 보이지 않으므로 값이 있으면 조용히 성공 처리
  if (form.get("website")) return json(200, { ok: true });

  const submissionId = form.get("submissionId")?.toString() ?? "";
  const part = Number(form.get("part"));
  const parts = Number(form.get("parts"));
  if (
    !/^[a-z0-9-]{8,48}$/i.test(submissionId) ||
    !Number.isInteger(part) ||
    !Number.isInteger(parts) ||
    part < 1 ||
    parts < 1 ||
    part > parts ||
    parts > MAX_PARTS
  ) {
    return json(400, { error: "전송 정보가 올바르지 않습니다." });
  }

  const answers = parseJsonObject<BriefAnswers>(form.get("answers"));
  if (!answers) return json(400, { error: "답변 형식이 올바르지 않습니다." });

  // 이번 묶음의 파일
  const attachments: MailAttachment[] = [];
  let bytes = 0;
  for (const slot of allSlots) {
    for (const entry of form.getAll(`file:${slot.id}`)) {
      if (typeof entry === "string") continue;
      if (!entry.type.startsWith("image/") && entry.type !== "application/pdf") {
        return json(400, { error: `지원하지 않는 파일 형식입니다: ${entry.name}` });
      }
      bytes += entry.size;
      if (bytes > BATCH_BYTES * 1.1) {
        return json(413, { error: "한 번에 보내는 용량이 너무 큽니다." });
      }
      attachments.push({
        filename: sanitizeFilename(entry.name),
        content: Buffer.from(await entry.arrayBuffer()),
        contentType: entry.type,
      });
    }
  }

  const brand = text(answers.brand) || "상호 미입력";
  const name = text(answers.name);
  const subject = `[제작 요청서] ${brand}${name ? ` / ${name}` : ""}`;
  const email = text(answers.email);
  const replyTo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined;
  const now = new Date();

  let body: string;
  if (part === 1) {
    const rawManifest = parseJsonObject<Record<string, unknown>>(form.get("manifest")) ?? {};
    const manifest: Record<string, string[]> = {};
    for (const slot of allSlots) {
      const list = rawManifest[slot.id];
      if (Array.isArray(list)) {
        manifest[slot.id] = list.filter((f): f is string => typeof f === "string").map(sanitizeFilename);
      }
    }

    const markdown = buildBriefMarkdown(answers, manifest, now, parts);
    const stamp = now.toISOString().slice(0, 10);
    attachments.unshift(
      { filename: `brief-${stamp}.md`, content: Buffer.from(markdown), contentType: "text/markdown" },
      {
        filename: `brief-${stamp}.json`,
        content: Buffer.from(
          JSON.stringify({ submittedAt: now.toISOString(), answers, files: manifest }, null, 2)
        ),
        contentType: "application/json",
      }
    );
    body = parts > 1 ? `(메일 1/${parts} · 나머지 첨부는 이어지는 메일에 있습니다)\n\n${markdown}` : markdown;
  } else {
    body = [
      `${brand} 요청서의 첨부 파일입니다. (메일 ${part}/${parts})`,
      "",
      ...attachments.map((a) => `- ${a.filename}`),
      "",
      "정리본(.md)은 첫 번째 메일에 있습니다. 첨부를 모두 같은 폴더에 내려받으면 정리본 안에서 이미지가 보입니다.",
    ].join("\n");
  }

  try {
    const via = await sendMail({
      subject,
      text: body,
      html: toHtml(body),
      replyTo,
      attachments,
      threadId: submissionId,
      isFirst: part === 1,
    });
    return json(200, { ok: true, ...(via === "console" ? { dev: true } : {}) });
  } catch (err) {
    console.error(`[brief] 메일 발송 실패 (${part}/${parts})`, err);
    if (err instanceof MailNotConfiguredError) {
      return json(500, { error: "메일 설정이 완료되지 않았습니다. 카카오톡으로 알려 주세요." });
    }
    return json(502, { error: "메일 발송에 실패했습니다. 잠시 후 다시 시도해 주세요." });
  }
}
