#!/bin/bash
# ============================================================
# add-subtitles.sh — Burn subtitles/captions into a video
# Supports SRT subtitle files
# Usage: ./scripts/video/add-subtitles.sh <video> <subtitles.srt>
# Requires: ffmpeg
# ============================================================

set -e

VIDEO="$1"
SUBTITLES="$2"

if [ -z "$VIDEO" ] || [ -z "$SUBTITLES" ]; then
  echo "Usage: ./scripts/video/add-subtitles.sh <video.mp4> <subtitles.srt>"
  echo ""
  echo "Tip: Generate SRT from audio using Riverside.fm's built-in transcription,"
  echo "or use a service like Descript or otter.ai"
  exit 1
fi

OUTPUT_DIR="./output/videos"
mkdir -p "$OUTPUT_DIR"

BASENAME=$(basename "$VIDEO" .mp4)

echo "Burning subtitles into: $VIDEO"

ffmpeg -y -i "$VIDEO" \
  -vf "subtitles=$SUBTITLES:force_style='FontName=Arial,FontSize=22,PrimaryColour=&HFFFFFF&,OutlineColour=&H000000&,Outline=2,Shadow=1,Alignment=2,MarginV=80'" \
  -c:v libx264 -preset medium -crf 23 \
  -c:a copy \
  -movflags +faststart \
  "$OUTPUT_DIR/${BASENAME}-captioned.mp4" 2>/dev/null

echo "Done! Output: $OUTPUT_DIR/${BASENAME}-captioned.mp4"
