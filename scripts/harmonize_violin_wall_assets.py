from __future__ import annotations

from pathlib import Path

import numpy as np
from scipy import ndimage
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "assets" / "normalized"
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
    for path in sorted(SOURCE.glob("*.jpg")):
        harmonize(path)


if __name__ == "__main__":
    main()
