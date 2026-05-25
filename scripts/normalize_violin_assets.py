from __future__ import annotations

import json
import subprocess
import sys
import time
import urllib.error
import urllib.request
from io import BytesIO
from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
APP_JS = PUBLIC / "app.js"
CACHE_DIR = ROOT / "_verification" / "normalized-source-cache"
OUT_DIR = PUBLIC / "assets" / "normalized"
MANIFEST = PUBLIC / "assets" / "normalized-manifest.json"

CANVAS_W = 1200
CANVAS_H = 1700
CANVAS = np.array([255, 252, 246], dtype=np.float32)


def display_sources() -> list[dict[str, str]]:
    node_code = r"""
const fs = require("fs");
const vm = require("vm");
let code = fs.readFileSync("public/app.js", "utf8").replace(/\nrender\(\);\s*$/, "\n");
const sandbox = {
  document: {
    getElementById() { return null; },
    createElement() { return { className: "", href: "", target: "", rel: "", append() {}, set textContent(v) {}, set ariaLabel(v) {} }; },
    createDocumentFragment() { return { append() {} }; }
  },
  console
};
vm.runInNewContext(code + "\nresult = displaySources.map(({key, image, url, title}) => ({key, image, url, title}));", sandbox);
console.log(JSON.stringify(sandbox.result));
"""
    result = subprocess.run(
        ["node", "-e", node_code],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(result.stdout)


def fetch_image(source: dict[str, str]) -> Image.Image:
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cache_path = CACHE_DIR / f"{source['key']}.img"
    if not cache_path.exists():
        request = urllib.request.Request(
            source["image"],
            headers={
                "User-Agent": "Mozilla/5.0",
                "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
                "Referer": source.get("url") or "https://violin.aolabs.io/",
            },
        )
        last_error: Exception | None = None
        for _ in range(3):
            try:
                with urllib.request.urlopen(request, timeout=35) as response:
                    cache_path.write_bytes(response.read())
                break
            except (urllib.error.URLError, TimeoutError) as exc:
                last_error = exc
                time.sleep(0.7)
        else:
            raise RuntimeError(f"download failed for {source['key']}: {last_error}")
    image = Image.open(BytesIO(cache_path.read_bytes()))
    image = ImageOps.exif_transpose(image)
    if image.mode not in {"RGB", "RGBA"}:
        image = image.convert("RGB")
    return image.convert("RGB")


def background_sample(arr: np.ndarray) -> np.ndarray:
    h, w, _ = arr.shape
    edge = max(8, int(min(h, w) * 0.045))
    sample = np.concatenate(
        [
            arr[:edge, :, :].reshape(-1, 3),
            arr[-edge:, :, :].reshape(-1, 3),
            arr[:, :edge, :].reshape(-1, 3),
            arr[:, -edge:, :].reshape(-1, 3),
        ],
        axis=0,
    )
    return np.median(sample, axis=0)


def foreground_mask(arr: np.ndarray) -> np.ndarray:
    bg = background_sample(arr)
    dist = np.linalg.norm(arr.astype(np.float32) - bg.astype(np.float32), axis=2)
    h, w = dist.shape
    edge = max(8, int(min(h, w) * 0.045))
    border = np.concatenate(
        [
            dist[:edge, :].reshape(-1),
            dist[-edge:, :].reshape(-1),
            dist[:, :edge].reshape(-1),
            dist[:, -edge:].reshape(-1),
        ]
    )
    threshold = max(18.0, float(np.percentile(border, 92)) * 1.45)
    mask = dist > threshold

    # Keep dark outlines and varnish details even when the image background is warm.
    gray = np.mean(arr, axis=2)
    mask |= gray < max(105, np.percentile(gray, 16))

    mask_image = Image.fromarray((mask.astype(np.uint8) * 255), "L")
    mask_image = mask_image.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.MinFilter(5))
    return np.asarray(mask_image) > 0


def bounding_box(mask: np.ndarray, width: int, height: int) -> tuple[int, int, int, int]:
    ys, xs = np.where(mask)
    if xs.size < 50 or ys.size < 50:
        return 0, 0, width, height
    left, right = int(xs.min()), int(xs.max()) + 1
    top, bottom = int(ys.min()), int(ys.max()) + 1
    pad_x = int((right - left) * 0.025)
    pad_y = int((bottom - top) * 0.025)
    return (
        max(0, left - pad_x),
        max(0, top - pad_y),
        min(width, right + pad_x),
        min(height, bottom + pad_y),
    )


def body_box(mask: np.ndarray, width: int, height: int) -> tuple[int, int, int, int]:
    row_width = mask.sum(axis=1)
    max_width = int(row_width.max()) if row_width.size else 0
    if max_width < 40:
        return bounding_box(mask, width, height)

    rows = np.where((row_width > max_width * 0.24) & (row_width > 35))[0]
    if rows.size < 20:
        return bounding_box(mask, width, height)

    gaps = np.where(np.diff(rows) > 12)[0]
    starts = np.concatenate(([0], gaps + 1))
    ends = np.concatenate((gaps, [rows.size - 1]))
    segments = [(int(rows[s]), int(rows[e])) for s, e in zip(starts, ends)]
    segment = max(segments, key=lambda pair: (pair[1] - pair[0] + 1) * (pair[0] + pair[1] + height))
    top, bottom = segment[0], segment[1] + 1

    # If the source is already a clean body-only back, the body segment may span
    # almost the whole image. Otherwise this drops narrow neck and scroll rows.
    if (bottom - top) < height * 0.22:
        return bounding_box(mask, width, height)

    body_mask = mask[top:bottom, :]
    ys, xs = np.where(body_mask)
    if xs.size < 50:
        return bounding_box(mask, width, height)

    left, right = int(xs.min()), int(xs.max()) + 1
    pad_x = int((right - left) * 0.045)
    pad_y = int((bottom - top) * 0.045)
    return (
        max(0, left - pad_x),
        max(0, top - pad_y),
        min(width, right + pad_x),
        min(height, bottom + pad_y),
    )


def normalize(source: dict[str, str]) -> dict[str, object]:
    image = fetch_image(source)
    image.thumbnail((1900, 2600), Image.Resampling.LANCZOS)
    arr = np.asarray(image).astype(np.float32)
    mask = foreground_mask(arr.astype(np.uint8))
    box = body_box(mask, image.width, image.height)
    image = image.crop(box)
    mask_image = Image.fromarray((mask.astype(np.uint8) * 255), "L").crop(box)

    arr = np.asarray(image).astype(np.float32)
    alpha = np.asarray(mask_image.filter(ImageFilter.GaussianBlur(2))).astype(np.float32) / 255.0
    alpha = np.clip((alpha - 0.10) / 0.82, 0, 1)
    arr = (arr * alpha[..., None]) + (CANVAS * (1.0 - alpha[..., None]))
    image = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")

    image = ImageOps.autocontrast(image, cutoff=0.35)
    object_alpha = np.asarray(mask_image.resize(image.size).filter(ImageFilter.GaussianBlur(1))).astype(np.float32) / 255.0
    luminance = np.asarray(image.convert("L")).astype(np.float32)
    object_pixels = luminance[object_alpha > 0.28]
    if object_pixels.size:
        median_luma = max(1.0, float(np.median(object_pixels)))
        image = ImageEnhance.Brightness(image).enhance(float(np.clip(138.0 / median_luma, 0.88, 1.26)))
    image = ImageEnhance.Brightness(image).enhance(1.04)
    image = ImageEnhance.Contrast(image).enhance(1.035)
    image = ImageEnhance.Color(image).enhance(1.02)

    target_w = int(CANVAS_W * 0.90)
    target_h = int(CANVAS_H * 0.90)
    scale = min(target_w / image.width, target_h / image.height)
    new_size = (max(1, int(image.width * scale)), max(1, int(image.height * scale)))
    image = image.resize(new_size, Image.Resampling.LANCZOS)

    canvas = Image.new("RGB", (CANVAS_W, CANVAS_H), tuple(CANVAS.astype(np.uint8)))
    x = (CANVAS_W - image.width) // 2
    y = (CANVAS_H - image.height) // 2
    canvas.paste(image, (x, y))

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = OUT_DIR / f"{source['key']}.jpg"
    canvas.save(out_path, "JPEG", quality=88, optimize=True, progressive=True)
    return {
        "key": source["key"],
        "title": source["title"],
        "asset": f"/assets/normalized/{source['key']}.jpg",
        "sourcePage": source["url"],
        "sourceImage": source["image"],
        "cropBox": list(box),
        "scale": round(scale, 4),
        "size": [CANVAS_W, CANVAS_H],
    }


def main() -> int:
    sources = display_sources()
    manifest: list[dict[str, object]] = []
    failures: list[str] = []
    for index, source in enumerate(sources, start=1):
        try:
            record = normalize(source)
            manifest.append(record)
            print(f"{index:03d}/{len(sources)} {source['key']}")
        except Exception as exc:
            failures.append(f"{source['key']}: {exc}")
            print(f"FAILED {source['key']}: {exc}", file=sys.stderr)

    MANIFEST.write_text(json.dumps({"count": len(manifest), "items": manifest}, indent=2) + "\n", encoding="utf-8")
    if failures:
        (ROOT / "_verification" / "normalized-failures.txt").write_text("\n".join(failures) + "\n", encoding="utf-8")
        print(f"{len(failures)} failures", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
