#!/usr/bin/env python3
"""Render deterministic 1200x630 WebP thumbnails from a CSV assignment table.

This is the per-article stage of the v2.4 thumbnail workflow. It never calls an
image API. Missing template backgrounds receive a deterministic branded
background, so a batch remains renderable before the optional background
library is expanded.
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


def load_config(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def color(value: list[int]) -> tuple[int, int, int]:
    return tuple(value)


def font(path: Path, size: int):
    try:
        return ImageFont.truetype(str(path), size)
    except OSError:
        return ImageFont.load_default()


def wrap_title(title: str, max_chars: int, max_lines: int) -> list[str]:
    lines: list[str] = []
    current = ""
    for word in title.split():
        candidate = f"{current} {word}".strip()
        if current and len(candidate) > max_chars:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    return lines[:max_lines] or [title[:max_chars]]


def fallback_background(cfg: dict, template: str) -> Image.Image:
    """Create a repeatable background when a reviewed template is not present."""
    width = cfg["dimensions"]["width"]
    height = cfg["dimensions"]["height"]
    image = Image.new("RGBA", (width, height), color(cfg["colors"]["bg"]) + (255,))
    draw = ImageDraw.Draw(image, "RGBA")
    seed = int(hashlib.sha256(template.encode()).hexdigest()[:8], 16)
    accent = color(cfg["colors"]["accent"])
    for i in range(7):
        x = width * 0.58 + ((seed >> (i * 3)) % 180) - 80
        y = ((seed >> (i * 5)) % height) - 80
        radius = 70 + ((seed >> (i * 4)) % 180)
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=accent + (28,))
    for i in range(5):
        x = width * 0.56 + i * 155
        draw.line((x, 0, x - 160, height), fill=accent + (38,), width=4)
    return image


def background(cfg: dict, template: str) -> Image.Image:
    path = Path(cfg["templates_dir"]) / f"{template}.png"
    if path.exists():
        return Image.open(path).convert("RGBA").resize(
            (cfg["dimensions"]["width"], cfg["dimensions"]["height"]), Image.Resampling.LANCZOS
        )
    return fallback_background(cfg, template)


def render(cfg: dict, row: dict) -> Image.Image:
    width, height = cfg["dimensions"]["width"], cfg["dimensions"]["height"]
    text = cfg["text"]
    image = background(cfg, row.get("template", cfg["default_template"]).strip())
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, text.get("darken_alpha", 100)))
    image = Image.alpha_composite(image, overlay)
    draw = ImageDraw.Draw(image)
    bold = font(Path(cfg["fonts"]["bold"]), text["title_size"])
    regular = font(Path(cfg["fonts"]["regular"]), text["subtitle_size"])
    category_font = font(Path(cfg["fonts"]["bold"]), text["category_size"])
    margin = text["margin_x"]
    white = color(cfg["colors"]["white"])
    light = color(cfg["colors"]["light_gray"])
    accent = color(cfg["colors"]["accent"])
    category = row.get("categoryLabel", "").strip().upper()
    if category:
        box = draw.textbbox((0, 0), category, font=category_font)
        pad = 10
        pill = Image.new("RGBA", (box[2] - box[0] + pad * 2, box[3] - box[1] + pad * 2), accent + (190,))
        image.paste(pill, (margin, text["category_y"] - pad), pill)
        draw = ImageDraw.Draw(image)
        draw.text((margin + pad, text["category_y"]), category, fill=white, font=category_font)
    lines = wrap_title(row["title"].strip(), text["title_max_chars"], text["title_max_lines"])
    for index, line in enumerate(lines):
        y = text["title_y"] + index * text["line_height"]
        draw.text((margin + 2, y + 2), line, fill=(0, 0, 0, 190), font=bold)
        draw.text((margin, y), line, fill=white, font=bold)
    subtitle = row.get("subtitle", "").strip()
    if subtitle:
        y = text["title_y"] + len(lines) * text["line_height"] + 20
        draw.text((margin + 2, y + 1), subtitle, fill=(0, 0, 0, 150), font=regular)
        draw.text((margin, y), subtitle, fill=light, font=regular)
    return image.convert("RGB")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", type=Path, required=True)
    parser.add_argument("--csv", type=Path, required=True)
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    cfg = load_config(args.config)
    rows = list(csv.DictReader(args.csv.open(encoding="utf-8")))
    if args.limit > 0:
        rows = rows[: args.limit]
    output = Path(cfg["output_dir"])
    output.mkdir(parents=True, exist_ok=True)
    for row in rows:
        target = output / f"{cfg.get('output_prefix', '')}{row['slug'].strip()}.webp"
        print(f"{row.get('template', cfg['default_template'])} {row['slug']}")
        if not args.dry_run:
            render(cfg, row).save(target, "WEBP", quality=88, method=6)
    print(f"validated_rows={len(rows)} output={output}")


if __name__ == "__main__":
    main()
