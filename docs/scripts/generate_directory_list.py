#!/usr/bin/env python3

from __future__ import annotations

import argparse
from datetime import datetime, timezone
from pathlib import Path


def should_skip(path: Path) -> bool:
    return any(part.startswith(".") for part in path.parts)


def collect_entries(root: Path, output: Path) -> tuple[list[Path], list[Path]]:
    directories: list[Path] = []
    files: list[Path] = []
    output_relative = output.relative_to(root)

    for path in sorted(root.rglob("*")):
        relative_path = path.relative_to(root)
        if should_skip(relative_path):
            continue
        if relative_path == output_relative:
            continue
        if path.is_dir():
            directories.append(relative_path)
            continue
        files.append(relative_path)

    return directories, files


def render_markdown(root: Path, directories: list[Path], files: list[Path]) -> str:
    entries = sorted(directories + files)
    lines = [
        "# Directory and File List",
        "",
        f"Generated from `{root}` on {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S %Z')}.",
        "",
        "- `.`",
    ]

    for entry in entries:
        depth = len(entry.parts)
        indent = "  " * depth
        suffix = "/" if entry in directories else ""
        lines.append(f"{indent}- `{entry.as_posix()}{suffix}`")

    lines.append("")
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate a Markdown list of all directories under a docs root."
    )
    parser.add_argument(
        "--root",
        default=".",
        help="Root directory to scan. Defaults to the current working directory.",
    )
    parser.add_argument(
        "--output",
        default="directory-list.md",
        help="Output Markdown file path. Defaults to directory-list.md in the root.",
    )
    args = parser.parse_args()

    root = Path(args.root).resolve()
    output = Path(args.output)
    if not output.is_absolute():
        output = root / output

    directories, files = collect_entries(root, output)
    output.write_text(render_markdown(root, directories, files), encoding="utf-8")
    print(
        f"Wrote {len(directories) + 1} directories and {len(files)} files to {output}"
    )


if __name__ == "__main__":
    main()
