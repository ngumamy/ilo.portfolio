"""Clean curly-hair halo on the Parcours portrait cutout."""

from pathlib import Path

import cv2
import numpy as np
from PIL import Image
from rembg import new_session, remove

ROOT = Path(r"e:\Workspace\ilo.portfolio\public")
SRC = ROOT / "me.JPG"
RAW = Path(r"e:\Workspace\ilo.portfolio\scripts") / "_portrait-raw.png"
OUT = ROOT / "portrait.png"


def sample_background(rgb: np.ndarray) -> np.ndarray:
    h, w, _ = rgb.shape
    patches = np.concatenate(
        [
            rgb[:24, :24].reshape(-1, 3),
            rgb[:24, -24:].reshape(-1, 3),
            rgb[-24:, :24].reshape(-1, 3),
            rgb[-24:, -24:].reshape(-1, 3),
            rgb[:18, w // 2 - 12 : w // 2 + 12].reshape(-1, 3),
        ],
        axis=0,
    )
    return np.median(patches, axis=0).astype(np.float32)


def unmix(rgb: np.ndarray, alpha: np.ndarray, bg: np.ndarray) -> np.ndarray:
    a = np.clip(alpha[..., None], 1e-4, 1.0)
    fg = (rgb - (1.0 - a) * bg) / a
    return np.clip(fg, 0, 255)


def luminance(rgb: np.ndarray) -> np.ndarray:
    return 0.299 * rgb[..., 0] + 0.587 * rgb[..., 1] + 0.114 * rgb[..., 2]


def chroma(rgb: np.ndarray) -> np.ndarray:
    return rgb.max(axis=2) - rgb.min(axis=2)


def main() -> None:
    original = Image.open(SRC).convert("RGB")
    src = np.array(original, dtype=np.float32)
    bg = sample_background(src)
    print("background", bg.tolist())

    if RAW.exists():
        cut = Image.open(RAW).convert("RGBA")
        print("using cached rembg")
    else:
        session = new_session("u2net_human_seg")
        cut = remove(
            original,
            session=session,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=15,
            alpha_matting_erode_size=12,
            post_process_mask=True,
        )
        cut.save(RAW)

    cut_arr = np.array(cut).astype(np.float32)
    alpha = cut_arr[..., 3] / 255.0
    fg = unmix(src, alpha, bg)

    ys, xs = np.where(alpha > 0.25)
    y0, y1 = int(ys.min()), int(ys.max())
    x0, x1 = int(xs.min()), int(xs.max())
    height = y1 - y0 + 1
    width = x1 - x0 + 1

    hair_band = np.zeros(alpha.shape, dtype=bool)
    hair_band[y0 : y0 + int(0.40 * height), x0:x1] = True
    face = np.zeros(alpha.shape, dtype=bool)
    face[
        y0 + int(0.07 * height) : y0 + int(0.56 * height),
        x0 + int(0.24 * width) : x0 + int(0.76 * width),
    ] = True

    solid = (alpha > 0.18).astype(np.uint8) * 255
    dist = cv2.distanceTransform(solid, cv2.DIST_L2, 5)
    ring = (dist > 0) & (dist < 36)

    lum = luminance(fg)
    src_lum = luminance(src)
    src_cool = src[..., 2] + 4 >= src[..., 0]
    skin = (
        (src[..., 0] + 8 >= src[..., 2])
        & (src_lum > 48)
        & (src_lum < 210)
        & (chroma(src) > 16)
    )
    bg_dist = np.linalg.norm(src - bg, axis=2)

    # Hair is dark; leftover wall and mixed fringe are cool and lighter.
    light_fringe = hair_band & ring & ~face & ~skin & (alpha > 0.01) & src_cool & (
        (src_lum > 92) | (bg_dist < 58) | ((lum > 110) & (chroma(fg) < 50))
    )
    alpha[light_fringe] = 0

    # Despill remaining hair-edge pixels (blue-gray wall in the curls).
    hair_edge = hair_band & ring & ~face & (alpha > 0.05)
    spill = np.clip(fg[..., 2] - np.maximum(fg[..., 0], fg[..., 1]), 0, 255)
    spill_n = np.clip(spill / 28.0, 0, 1)
    fg[..., 2] = np.where(hair_edge, np.clip(fg[..., 2] - spill, 0, 255), fg[..., 2])
    fg[..., 1] = np.where(hair_edge, np.clip(fg[..., 1] - spill * 0.35, 0, 255), fg[..., 1])
    alpha[hair_edge] *= 1.0 - 0.65 * spill_n[hair_edge]
    too_light = hair_edge & (luminance(fg) > 118)
    alpha[too_light] = 0

    dark_hair = (src_lum < 78) & (chroma(src) < 48)
    hair_core = (alpha > 0.4) & hair_band
    if hair_core.any():
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (17, 17))
        near = cv2.dilate((hair_core.astype(np.uint8) * 255), kernel) > 0
        add = near & dark_hair & ~face & ~light_fringe
        alpha[add] = np.maximum(alpha[add], 0.88)
        fg[add] = src[add]

    # Unmix brightens leftover wall into a white halo — keep original hair color.
    hair_keep = hair_band & (alpha > 0.01)
    fg[hair_keep] = src[hair_keep]

    drop_light = hair_band & ~face & ~skin & (alpha > 0.01) & (dist < 22) & (src_lum > 86) & src_cool
    alpha[drop_light] = 0

    hair_mask = ((alpha > 0.22) & hair_band & ~face & ~skin).astype(np.uint8) * 255
    if hair_mask.any():
        choke = cv2.erode(hair_mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9)))
        lost = (hair_mask > 0) & (choke == 0) & (dist < 16)
        alpha[lost] = 0
        restored = cv2.dilate(choke, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9))) > 0
        add = restored & dark_hair & hair_band & ~face & (dist < 20)
        alpha[add] = np.maximum(alpha[add], 0.9)
        fg[add] = src[add]

    jacket_fringe = ring & ~hair_band & ~face & ~skin & (alpha > 0.02) & (alpha < 0.55) & (
        (bg_dist < 46) | ((lum > 115) & src_cool)
    )
    alpha[jacket_fringe] = 0

    out = np.zeros((*src.shape[:2], 4), dtype=np.uint8)
    out[..., :3] = np.clip(fg, 0, 255).astype(np.uint8)
    out[..., 3] = np.clip(alpha * 255.0, 0, 255).astype(np.uint8)
    out[out[..., 3] < 10] = 0
    # Remaining gray fringe is almost always semi-transparent — drop it on the hair edge.
    a = out[..., 3].astype(np.float32) / 255.0
    lum_out = luminance(out[..., :3].astype(np.float32))
    # Recompute a simple top-of-head band in cropped? Keep full-frame arrays.
    fringe_left = hair_band & ~face & (a > 0.04) & (a < 0.97) & (dist < 18) & (lum_out > 78)
    out[fringe_left, 3] = 0
    out[out[..., 3] < 10] = 0

    ys, xs = np.where(out[..., 3] > 10)
    pad = 14
    crop = out[
        max(0, int(ys.min()) - pad) : int(ys.max()) + pad + 1,
        max(0, int(xs.min()) - pad) : int(xs.max()) + pad + 1,
    ]
    Image.fromarray(crop).save(OUT, "PNG")
    print("saved", crop.shape, "light_fringe", int(light_fringe.sum()))


if __name__ == "__main__":
    main()
