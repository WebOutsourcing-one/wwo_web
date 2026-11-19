"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ACCEPTED_FILE_TYPES,
  allSlots,
  assetSlot,
  BATCH_BYTES,
  briefSections,
  designSlots,
  detailKey,
  MAX_FILES,
  MAX_TOTAL_BYTES,
  otherKey,
  sanitizeFilename,
  slotNoteKey,
  slotUrlKey,
  type BriefAnswers,
  type BriefField,
  type FileSlot,
} from "@/lib/brief";
import { KAKAO_OPEN_CHAT } from "@/data/service";
import { prepareFile } from "./compress";

const DRAFT_KEY = "woo-brief-draft";

type Status =
  | { kind: "idle" }
  | { kind: "sending"; part: number; parts: number }
  | { kind: "done" }
  | { kind: "error"; message: string };

type NamedFile = { slotId: string; name: string; file: File };

/** 실패 후 다시 보낼 때 이미 보낸 묶음은 건너뛰기 위한 기록 */
type Progress = { submissionId: string; signature: string; sent: number };

/** 파일마다 화면 구분과 순번이 붙은 최종 이름을 정합니다. 예: desktop-01-main.webp */
function nameFiles(files: Record<string, File[]>): NamedFile[] {
  return allSlots.flatMap((slot) =>
    (files[slot.id] ?? []).map((file, i) => ({
      slotId: slot.id,
      file,
      name: sanitizeFilename(`${slot.id}-${String(i + 1).padStart(2, "0")}-${file.name}`),
    }))
  );
}

/** 요청 한도 안에 들어가도록 파일을 순서대로 묶습니다. 파일이 없어도 묶음 1개(답변 전송용)는 만듭니다. */
function makeBatches(named: NamedFile[]): NamedFile[][] {
  const batches: NamedFile[][] = [[]];
  let size = 0;
  for (const item of named) {
    const current = batches[batches.length - 1];
    if (current.length > 0 && size + item.file.size > BATCH_BYTES) {
      batches.push([item]);
      size = item.file.size;
    } else {
      current.push(item);
      size += item.file.size;
    }
  }
  return batches;
}

const newSubmissionId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;

async function postWithRetry(body: FormData, tries = 3): Promise<void> {
  let lastError: unknown;
  for (let attempt = 0; attempt < tries; attempt++) {
    try {
      const res = await fetch("/api/brief", { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok) return;
      lastError = new Error(data.error || "전송에 실패했습니다.");
      // 형식 오류 등 다시 보내도 같은 결과인 요청은 재시도하지 않습니다.
      if (res.status >= 400 && res.status < 500) break;
    } catch (err) {
      lastError = err;
    }
    await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
  }
  throw lastError instanceof Error ? lastError : new Error("전송에 실패했습니다.");
}

const inputClass =
  "w-full rounded-md border border-border bg-background/60 px-3.5 py-2.5 text-sm sm:text-base placeholder:text-muted/70 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-colors";

const formatKB = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)}MB`
    : `${Math.max(1, Math.round(bytes / 1024))}KB`;

export function BriefForm({ token }: { token: string }) {
  const [answers, setAnswers] = useState<BriefAnswers>({});
  const [files, setFiles] = useState<Record<string, File[]>>({});
  const [busySlots, setBusySlots] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const restored = useRef(false);
  const progress = useRef<Progress | null>(null);

  // 작성 중인 답변을 이 브라우저에만 임시 보관 (파일은 제외). 실수로 창을 닫아도 이어서 쓸 수 있습니다.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- 마운트 시 1회 복원
      if (saved) setAnswers(JSON.parse(saved));
    } catch {}
    restored.current = true;
  }, []);

  useEffect(() => {
    if (!restored.current) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(answers));
    } catch {}
  }, [answers]);

  const totalBytes = useMemo(
    () => Object.values(files).flat().reduce((sum, f) => sum + f.size, 0),
    [files]
  );
  const fileCount = useMemo(() => Object.values(files).flat().length, [files]);

  const setValue = (key: string, value: string | string[]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const toggleCheck = (key: string, option: string) =>
    setAnswers((prev) => {
      const current = Array.isArray(prev[key]) ? (prev[key] as string[]) : [];
      return {
        ...prev,
        [key]: current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option],
      };
    });

  const addFiles = async (slot: FileSlot, list: FileList | null) => {
    if (!list?.length) return;
    setStatus({ kind: "idle" });
    setBusySlots((b) => ({ ...b, [slot.id]: true }));
    try {
      const prepared = await Promise.all(
        Array.from(list).map((f) => prepareFile(f, slot.maxWidth))
      );
      const supported = prepared.filter(
        (f) => f.type.startsWith("image/") || f.type === "application/pdf"
      );
      // 한 묶음(약 3.8MB)보다 큰 파일은 나눠 보낼 수 없어 링크로 안내합니다.
      const accepted = supported.filter((f) => f.size <= BATCH_BYTES);
      setFiles((prev) => ({
        ...prev,
        [slot.id]: [...(prev[slot.id] ?? []), ...accepted],
      }));
      const problems: string[] = [];
      if (supported.length < prepared.length) {
        problems.push("이미지와 PDF만 올릴 수 있습니다.");
      }
      if (accepted.length < supported.length) {
        const big = supported.filter((f) => f.size > BATCH_BYTES).map((f) => f.name);
        problems.push(`${formatKB(BATCH_BYTES)}가 넘는 파일은 올릴 수 없습니다 (${big.join(", ")}).`);
      }
      if (problems.length) {
        setStatus({
          kind: "error",
          message: `${problems.join(" ")} 해당 파일은 위 링크 칸에 구글 드라이브 등 공유 링크로 보내 주세요.`,
        });
      }
    } finally {
      setBusySlots((b) => ({ ...b, [slot.id]: false }));
    }
  };

  const removeFile = (slotId: string, index: number) =>
    setFiles((prev) => ({
      ...prev,
      [slotId]: (prev[slotId] ?? []).filter((_, i) => i !== index),
    }));

  const overLimit = totalBytes > MAX_TOTAL_BYTES || fileCount > MAX_FILES;
  const busy = Object.values(busySlots).some(Boolean);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (overLimit || busy || status.kind === "sending") return;

    const honeypot =
      (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    const named = nameFiles(files);
    const batches = makeBatches(named);
    const parts = batches.length;
    const manifest: Record<string, string[]> = {};
    for (const item of named) (manifest[item.slotId] ??= []).push(item.name);

    // 실패했던 전송을 같은 파일로 다시 보내면, 이미 도착한 묶음은 건너뜁니다.
    const signature = named.map((n) => `${n.name}:${n.file.size}`).join("|");
    if (!progress.current || progress.current.signature !== signature) {
      progress.current = { submissionId: newSubmissionId(), signature, sent: 0 };
    }
    const run = progress.current;

    try {
      for (let i = run.sent; i < parts; i++) {
        setStatus({ kind: "sending", part: i + 1, parts });
        const body = new FormData();
        body.set("token", token);
        body.set("website", honeypot);
        body.set("submissionId", run.submissionId);
        body.set("part", String(i + 1));
        body.set("parts", String(parts));
        body.set("answers", JSON.stringify(answers));
        if (i === 0) body.set("manifest", JSON.stringify(manifest));
        for (const item of batches[i]) {
          body.append(`file:${item.slotId}`, item.file, item.name);
        }
        await postWithRetry(body);
        run.sent = i + 1;
      }
      progress.current = null;
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {}
      setStatus({ kind: "done" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "전송에 실패했습니다.";
      setStatus({
        kind: "error",
        message:
          run.sent > 0
            ? `${message} 메일 ${parts}통 중 ${run.sent}통은 이미 전달됐습니다. 다시 보내기를 누르시면 나머지만 이어서 보냅니다.`
            : message,
      });
    }
  };

  if (status.kind === "done") {
    return (
      <section className="py-20 sm:py-28 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent mb-5">
          Received
        </p>
        <h2 className="text-2xl sm:text-4xl font-semibold tracking-[-0.02em]">
          요청서가 잘 전달되었습니다
        </h2>
        <p className="mt-5 mx-auto max-w-md text-sm sm:text-base text-foreground/75 leading-[1.7] text-pretty">
          꼼꼼히 확인한 뒤 카카오톡으로 견적과 진행 일정을 안내해 드리겠습니다.
          추가로 전달하실 내용이 있으면 언제든 말씀해 주세요.
        </p>
        <a
          href={KAKAO_OPEN_CHAT}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 bg-accent text-white hover:bg-accent/90 rounded-md px-6 py-3.5 text-sm font-semibold transition-colors"
        >
          카카오톡으로 돌아가기 →
        </a>
      </section>
    );
  }

  let sectionNo = 0;
  const nextNo = () => String(++sectionNo).padStart(2, "0");

  return (
    <form
      onSubmit={submit}
      // 한 줄 입력칸에서 엔터를 누르면 브라우저가 폼을 바로 제출하므로 막습니다.
      // 여러 줄 입력칸(textarea)의 줄바꿈과 버튼의 엔터는 그대로 둡니다.
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
          e.preventDefault();
        }
      }}
      className="pb-20"
      noValidate
    >
      {/* 봇 차단용 숨김 칸 */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          웹사이트
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {briefSections.map((section) => (
        <Section key={section.id} no={nextNo()} title={section.title} description={section.description}>
          <div className="space-y-7">
            {section.fields.map((field) => (
              <Field
                key={field.id}
                field={field}
                answers={answers}
                setValue={setValue}
                toggleCheck={toggleCheck}
              />
            ))}
          </div>
        </Section>
      ))}

      {/* 화면 크기별 시안 */}
      <Section
        no={nextNo()}
        title="화면별 기획 · 디자인 시안"
        description="AI나 다른 도구로 만든 시안이 있다면 화면 크기별로 나눠 주세요. 한 장에 여러 화면이 섞여 있으면 어느 기준인지 알기 어려워 결과물이 달라질 수 있습니다. 없는 화면은 비워 두시면 다른 화면을 기준으로 자연스럽게 맞춰 드립니다."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {designSlots.map((slot) => (
            <SlotCard
              key={slot.id}
              slot={slot}
              files={files[slot.id] ?? []}
              busy={!!busySlots[slot.id]}
              answers={answers}
              setValue={setValue}
              onAdd={(list) => addFiles(slot, list)}
              onRemove={(i) => removeFile(slot.id, i)}
            />
          ))}
        </div>
      </Section>

      {/* 보유 자료 */}
      <Section
        no={nextNo()}
        title="보유 자료 보내기"
        description="로고, 매장·제품 사진, 소개 문서가 있다면 올려 주세요. 용량이 큰 원본은 구글 드라이브 등 공유 링크가 편합니다."
      >
        <SlotCard
          slot={assetSlot}
          files={files[assetSlot.id] ?? []}
          busy={!!busySlots[assetSlot.id]}
          answers={answers}
          setValue={setValue}
          onAdd={(list) => addFiles(assetSlot, list)}
          onRemove={(i) => removeFile(assetSlot.id, i)}
        />
      </Section>

      {/* 제출 */}
      <div className="mt-12 rounded-lg border border-border bg-background/40 p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm font-medium tracking-tight">첨부 용량</p>
          <p className={`font-mono text-xs tabular-nums ${overLimit ? "text-accent" : "text-muted"}`}>
            {formatKB(totalBytes)} / {formatKB(MAX_TOTAL_BYTES)} · {fileCount}개
          </p>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-border overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${overLimit ? "bg-accent" : "bg-foreground/60"}`}
            style={{ width: `${Math.min(100, (totalBytes / MAX_TOTAL_BYTES) * 100)}%` }}
          />
        </div>
        <p className="mt-3 text-xs text-muted leading-[1.7] text-pretty">
          사진은 자동으로 줄여서 올리며, 용량이 크면 메일 여러 통으로 나눠 보냅니다.
          한도를 넘으면 일부 파일을 빼고 링크 칸을 이용해 주세요. 보내 주신 파일은
          메일로만 전달되며 서버에 저장되지 않습니다.
        </p>

        {status.kind === "error" && (
          <p role="alert" className="mt-5 rounded-md border border-accent/40 bg-accent/[0.06] px-4 py-3 text-sm text-accent">
            {status.message}
          </p>
        )}

        <button
          type="submit"
          disabled={overLimit || busy || status.kind === "sending"}
          className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-accent px-8 py-4 text-sm font-semibold text-white hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status.kind === "sending"
            ? status.parts > 1
              ? `보내는 중... (${status.part}/${status.parts})`
              : "보내는 중..."
            : busy
              ? "사진 준비 중..."
              : "요청서 보내기 →"}
        </button>
        <p className="mt-3 text-xs text-muted">
          작성 중인 내용은 이 브라우저에 임시 저장되어, 창을 닫았다가 다시 열어도
          이어서 쓰실 수 있습니다. (첨부 파일 제외)
        </p>
      </div>
    </form>
  );
}

function Section({
  no,
  title,
  description,
  children,
}: {
  no: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="py-10 sm:py-14 border-b border-border min-w-0">
      <legend className="sr-only">{title}</legend>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-3">
        {no}
      </p>
      <h2 aria-hidden className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-foreground/70 leading-[1.7] text-pretty">
          {description}
        </p>
      )}
      <div className="mt-8">{children}</div>
    </fieldset>
  );
}

function Field({
  field,
  answers,
  setValue,
  toggleCheck,
}: {
  field: BriefField;
  answers: BriefAnswers;
  setValue: (key: string, value: string | string[]) => void;
  toggleCheck: (key: string, option: string) => void;
}) {
  const id = `f-${field.id}`;
  const value = answers[field.id];
  const text = typeof value === "string" ? value : "";

  const label = (
    <span className="block text-sm sm:text-base font-medium tracking-tight">
      {field.label}
    </span>
  );
  const hintText =
    field.hint ?? (field.details ? "선택하시면 자세히 적는 칸이 나타납니다." : undefined);
  const hint = hintText && (
    <span className="mt-1 block text-xs text-muted">{hintText}</span>
  );

  if (field.type === "radio" || field.type === "checks") {
    const isCheck = field.type === "checks";
    const selected = isCheck ? (Array.isArray(value) ? value : []) : text ? [text] : [];
    const other = answers[otherKey(field.id)];
    return (
      <div role="group" aria-labelledby={`${id}-label`}>
        <div id={`${id}-label`}>
          {label}
          {hint}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {field.options?.map((option) => {
            const on = selected.includes(option);
            return (
              <label
                key={option}
                className={`cursor-pointer select-none rounded-full border px-3.5 py-2 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/30 ${
                  on
                    ? "border-accent bg-accent/[0.08] text-accent"
                    : "border-border text-foreground/80 hover:border-muted/60"
                }`}
              >
                <input
                  type={isCheck ? "checkbox" : "radio"}
                  name={field.id}
                  className="sr-only"
                  checked={on}
                  onChange={() =>
                    isCheck
                      ? toggleCheck(field.id, option)
                      : setValue(field.id, on ? "" : option)
                  }
                  onClick={() => {
                    // 라디오도 다시 누르면 선택 해제 (모든 항목이 선택 사항이므로)
                    if (!isCheck && on) setValue(field.id, "");
                  }}
                />
                {on && <span aria-hidden className="mr-1">✓</span>}
                {option}
              </label>
            );
          })}
        </div>
        {/* 선택한 보기 중 추가 정보가 필요한 것은 입력 칸을 펼쳐 보여 줍니다 (선택 순서대로) */}
        {field.details && selected.some((o) => field.details?.[o]) && (
          <div className="mt-4 grid gap-3 rounded-lg border border-border bg-background/40 p-4 sm:grid-cols-2 sm:p-5">
            {selected
              .filter((o) => field.details?.[o])
              .map((option) => {
                const detail = field.details![option];
                const key = detailKey(field.id, option);
                const v = answers[key];
                const shared = {
                  placeholder: detail.placeholder,
                  value: typeof v === "string" ? v : "",
                  onChange: (
                    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => setValue(key, e.target.value),
                };
                return (
                  <label
                    key={option}
                    className={`block min-w-0 ${detail.multiline ? "sm:col-span-2" : ""}`}
                  >
                    <span className="text-xs font-medium text-foreground/80">
                      <span className="text-accent">{option}</span> · {detail.label}
                    </span>
                    {detail.multiline ? (
                      <textarea
                        rows={4}
                        className={`${inputClass} mt-1.5 text-sm resize-y`}
                        {...shared}
                      />
                    ) : (
                      <input
                        type="text"
                        className={`${inputClass} mt-1.5 text-sm`}
                        {...shared}
                      />
                    )}
                  </label>
                );
              })}
          </div>
        )}
        {field.allowOther && (
          <input
            type="text"
            aria-label={`${field.label} - 직접 입력`}
            placeholder="직접 입력"
            className={`${inputClass} mt-3 max-w-md`}
            value={typeof other === "string" ? other : ""}
            onChange={(e) => setValue(otherKey(field.id), e.target.value)}
          />
        )}
      </div>
    );
  }

  return (
    <label htmlFor={id} className="block">
      {label}
      {hint}
      {field.type === "textarea" ? (
        <textarea
          id={id}
          rows={3}
          placeholder={field.placeholder}
          className={`${inputClass} mt-2.5 resize-y`}
          value={text}
          onChange={(e) => setValue(field.id, e.target.value)}
        />
      ) : (
        <input
          id={id}
          type={field.type}
          placeholder={field.placeholder}
          autoComplete={
            field.type === "email" ? "email" : field.type === "tel" ? "tel" : field.id === "name" ? "name" : "off"
          }
          className={`${inputClass} mt-2.5 ${field.type === "date" ? "max-w-xs" : ""}`}
          value={text}
          onChange={(e) => setValue(field.id, e.target.value)}
        />
      )}
    </label>
  );
}

function SlotCard({
  slot,
  files,
  busy,
  answers,
  setValue,
  onAdd,
  onRemove,
}: {
  slot: FileSlot;
  files: File[];
  busy: boolean;
  answers: BriefAnswers;
  setValue: (key: string, value: string) => void;
  onAdd: (list: FileList | null) => void;
  onRemove: (index: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const url = answers[slotUrlKey(slot.id)];
  const note = answers[slotNoteKey(slot.id)];

  return (
    <div className="flex flex-col rounded-lg border border-border bg-background/40 p-5 sm:p-6 min-w-0">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight">{slot.label}</h3>
        <span className="font-mono text-[11px] text-accent tabular-nums">{slot.range}</span>
      </div>
      <p className="mt-1 text-xs text-muted">{slot.guide}</p>

      <label className="mt-5 block">
        <span className="text-xs font-medium text-foreground/80">링크</span>
        <input
          type="url"
          inputMode="url"
          placeholder="Figma · 드라이브 링크"
          className={`${inputClass} mt-1.5 text-sm`}
          value={typeof url === "string" ? url : ""}
          onChange={(e) => setValue(slotUrlKey(slot.id), e.target.value)}
        />
      </label>

      <div className="mt-4">
        <span className="text-xs font-medium text-foreground/80">파일</span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onAdd(e.dataTransfer.files);
          }}
          disabled={busy}
          className="mt-1.5 w-full rounded-md border border-dashed border-border px-4 py-5 text-sm text-muted hover:border-accent hover:text-accent transition-colors disabled:opacity-60"
        >
          {busy ? "사진 줄이는 중..." : "이미지 · PDF 선택 또는 끌어 놓기"}
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_FILE_TYPES}
          className="sr-only"
          tabIndex={-1}
          aria-label={`${slot.label} 파일 선택`}
          onChange={(e) => {
            onAdd(e.target.files);
            e.target.value = "";
          }}
        />
        {files.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {files.map((file, i) => (
              <li
                key={`${file.name}-${i}`}
                className="flex items-center justify-between gap-3 rounded-md bg-border/40 px-3 py-2 text-xs"
              >
                <span className="truncate">{file.name}</span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="font-mono text-muted tabular-nums">{formatKB(file.size)}</span>
                  <button
                    type="button"
                    onClick={() => onRemove(i)}
                    aria-label={`${file.name} 삭제`}
                    className="text-muted hover:text-accent"
                  >
                    ✕
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <label className="mt-4 block">
        <span className="text-xs font-medium text-foreground/80">메모</span>
        <textarea
          rows={2}
          placeholder="이 화면에서 꼭 지켜야 할 점"
          className={`${inputClass} mt-1.5 text-sm resize-y`}
          value={typeof note === "string" ? note : ""}
          onChange={(e) => setValue(slotNoteKey(slot.id), e.target.value)}
        />
      </label>
    </div>
  );
}
