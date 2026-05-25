from __future__ import annotations

import json
from pathlib import Path

import numpy as np
from scipy import ndimage
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "assets" / "normalized"
MANIFEST = ROOT / "public" / "assets" / "normalized-manifest.json"
DEST = ROOT / "public" / "assets" / "wall"
WALL_BG = (255, 250, 243)


def harmonize(path: Path) -> None:
    image = Image.open(path).convert("RGB")
    array = np.asarray(image).copy()
    channel_min = array.min(axis=2)
    channel_max = array.max(axis=2)
    background = (channel_max >= 182) & ((channel_max - channel_min) <= 76)
    labels, _ = ndimage.label(background)
    border_labels = np.unique(
        np.concatenate([labels[0, :], labels[-1, :], labels[:, 0], labels[:, -1]])
    )
    border_labels = border_labels[border_labels != 0]
    if border_labels.size:
        array[np.isin(labels, border_labels)] = WALL_BG
    image = Image.fromarray(array, mode="RGB")

    DEST.mkdir(parents=True, exist_ok=True)
    image.save(DEST / path.name, "JPEG", quality=92, optimize=True, progressive=True)


def main() -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    keys = {item["key"] for item in manifest.get("items", [])}
    DEST.mkdir(parents=True, exist_ok=True)
    for stale in DEST.glob("*.jpg"):
        if stale.stem not in keys:
            stale.unlink()
    for key in sorted(keys):
        path = SOURCE / f"{key}.jpg"
        if not path.exists():
            raise FileNotFoundError(path)
        harmonize(path)


if __name__ == "__main__":
    main()
