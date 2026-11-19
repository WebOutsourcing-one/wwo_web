// 서버 전용: 요청서 메일 발송. 환경변수에 따라 Gmail 또는 Resend를 자동으로 고릅니다.
//
//   Gmail  : GMAIL_USER + GMAIL_APP_PASSWORD (Google 계정 → 보안 → 2단계 인증 → 앱 비밀번호)
//   Resend : RESEND_API_KEY (+ 선택 BRIEF_FROM)
//   받는 주소: BRIEF_TO_EMAIL (비우면 GMAIL_USER)
//
// 둘 다 없으면 개발 환경에서는 터미널에 출력하고, 운영 환경에서는 에러를 냅니다.
import nodemailer from "nodemailer";

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export type MailInput = {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  attachments: MailAttachment[];
  /** 같은 요청서의 메일을 한 대화로 묶기 위한 스레드 ID */
  threadId: string;
  /** 첫 메일이면 true. 나머지는 첫 메일에 대한 답장 형태로 이어 붙입니다. */
  isFirst: boolean;
};

export class MailNotConfiguredError extends Error {}

const domain = "brief.woo.it.kr";
const rootMessageId = (threadId: string) => `<${threadId}@${domain}>`;
const partMessageId = (threadId: string) =>
  `<${threadId}.${Date.now()}.${Math.random().toString(36).slice(2, 8)}@${domain}>`;

export async function sendMail(input: MailInput): Promise<"gmail" | "resend" | "console"> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const resendKey = process.env.RESEND_API_KEY;
  const to = (process.env.BRIEF_TO_EMAIL || gmailUser || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const root = rootMessageId(input.threadId);
  const messageId = input.isFirst ? root : partMessageId(input.threadId);
  const threadHeaders = input.isFirst ? {} : { "In-Reply-To": root, References: root };

  if (gmailUser && gmailPass && to.length) {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass.replace(/\s+/g, "") },
    });
    await transport.sendMail({
      from: `WOO 요청서 <${gmailUser}>`,
      to,
      replyTo: input.replyTo,
      subject: input.subject,
      text: input.text,
      html: input.html,
      messageId,
      headers: threadHeaders,
      attachments: input.attachments,
    });
    return "gmail";
  }

  if (resendKey && to.length) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.BRIEF_FROM || "WOO 요청서 <onboarding@resend.dev>",
        to,
        reply_to: input.replyTo,
        subject: input.subject,
        text: input.text,
        html: input.html,
        headers: { "Message-ID": messageId, ...threadHeaders },
        attachments: input.attachments.map((a) => ({
          filename: a.filename,
          content: a.content.toString("base64"),
        })),
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    return "resend";
  }

  if (process.env.NODE_ENV !== "production") {
    console.log(`\n[brief] 메일 설정 없음 - 메일 대신 출력합니다.\n제목: ${input.subject}`);
    console.log(input.text);
    console.log(
      `[brief] 첨부 ${input.attachments.length}개: ${input.attachments
        .map((a) => `${a.filename} (${Math.round(a.content.length / 1024)}KB)`)
        .join(", ")}\n`
    );
    return "console";
  }

  throw new MailNotConfiguredError("메일 발송 설정(GMAIL_* 또는 RESEND_API_KEY)이 없습니다.");
}
