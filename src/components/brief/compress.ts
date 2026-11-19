// 업로드 전 브라우저에서 이미지를 줄입니다.
// - 가능하면 WebP로 변환 (JPG보다 25~35% 작고 투명도 유지)
// - Safari와 iOS의 모든 브라우저는 캔버스 WebP 변환을 지원하지 않아 조용히 PNG를 돌려주므로,
//   결과 형식을 확인한 뒤 JPG로 대체합니다.
// 원본이 충분히 작으면 그대로 두고, PDF·GIF·SVG는 손대지 않습니다.

const KEEP_IF_UNDER = 500 * 1024;
const QUALITY = 0.82;
/** iOS Safari 캔버스 면적 한도(약 16.7M px)보다 여유 있게 */
const MAX_CANVAS_PIXELS = 16_000_000;

const toBlob = (canvas: HTMLCanvasElement, type: string) =>
  new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, QUALITY));

export async function prepareFile(file: File, maxWidth: number): Promise<File> {
  if (!file.type.startsWith("image/") || /gif|svg/.test(file.type)) return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file; // HEIC 등 브라우저가 못 읽는 형식은 원본 그대로
  }

  const { width, height } = bitmap;
  if (width <= maxWidth && file.size <= KEEP_IF_UNDER) {
    bitmap.close();
    return file;
  }

  let scale = Math.min(1, maxWidth / width);
  if (width * scale * height * scale > MAX_CANVAS_PIXELS) {
    scale = Math.sqrt(MAX_CANVAS_PIXELS / (width * height));
  }
  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return file;
  }
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  let blob = await toBlob(canvas, "image/webp");
  let ext = "webp";
  if (!blob || blob.type !== "image/webp") {
    // JPG는 투명도가 없어 흰 배경을 뒤에 깔아 둡니다 (투명 로고가 검게 변하지 않도록).
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    blob = await toBlob(canvas, "image/jpeg");
    ext = "jpg";
  }
  if (!blob || blob.size >= file.size) return file;

  const name = file.name.replace(/\.[^.]+$/, "") + "." + ext;
  return new File([blob], name, { type: blob.type, lastModified: Date.now() });
}
