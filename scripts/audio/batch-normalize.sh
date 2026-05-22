#!/bin/bash
# ============================================================
# batch-normalize.sh — Normalize all audio files in a directory
# Usage: ./scripts/audio/batch-normalize.sh <input-dir> [output-dir]
# Requires: ffmpeg
# ============================================================

set -e

INPUT_DIR="$1"
OUTPUT_DIR="${2:-./output/normalized}"

if [ -z "$INPUT_DIR" ]; then
  echo "Usage: ./scripts/audio/batch-normalize.sh <input-directory> [output-directory]"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

count=0
for f in "$INPUT_DIR"/*.{wav,mp3,m4a,flac,aac} 2>/dev/null; do
  [ -f "$f" ] || continue
  basename=$(basename "$f")
  name="${basename%.*}"
  echo "Normalizing: $basename"
  ffmpeg -y -i "$f" \
    -af "loudnorm=I=-16:TP=-1.5:LRA=11" \
    -ar 44100 -ac 1 \
    -codec:a libmp3lame -b:a 192k \
    "$OUTPUT_DIR/${name}-normalized.mp3" 2>/dev/null
  count=$((count + 1))
done

echo ""
echo "Done! Normalized $count files to $OUTPUT_DIR/"
