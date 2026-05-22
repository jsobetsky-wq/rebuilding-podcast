#!/bin/bash
# ============================================================
# create-clip.sh — Extract an audio clip from an episode
# Usage: ./scripts/audio/create-clip.sh <episode-mp3> <start> <duration> <clip-name>
# Requires: ffmpeg
# ============================================================

set -e

INPUT="$1"
START="$2"
DURATION="$3"
CLIP_NAME="$4"

if [ -z "$INPUT" ] || [ -z "$START" ] || [ -z "$DURATION" ] || [ -z "$CLIP_NAME" ]; then
  echo "Usage: ./scripts/audio/create-clip.sh <episode.mp3> <start-time> <duration> <clip-name>"
  echo "Example: ./scripts/audio/create-clip.sh output/episodes/001-final.mp3 02:30 00:45 best-quote"
  echo ""
  echo "Times in MM:SS or HH:MM:SS format"
  exit 1
fi

OUTPUT_DIR="./output/clips"
mkdir -p "$OUTPUT_DIR"

echo "Extracting clip: $CLIP_NAME"
echo "  From: $INPUT"
echo "  Start: $START, Duration: $DURATION"

# Extract clip with fade in/out
ffmpeg -y -i "$INPUT" \
  -ss "$START" -t "$DURATION" \
  -af "afade=t=in:st=0:d=0.5,afade=t=out:st=$(echo "$DURATION" | awk -F: '{if(NF==2) print $1*60+$2-0.5; else print $1*3600+$2*60+$3-0.5}'):d=0.5" \
  -codec:a libmp3lame -b:a 192k \
  "$OUTPUT_DIR/${CLIP_NAME}.mp3" 2>/dev/null

CLIP_DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUTPUT_DIR/${CLIP_NAME}.mp3" | cut -d. -f1)

echo ""
echo "Done! Clip saved: $OUTPUT_DIR/${CLIP_NAME}.mp3"
echo "Clip duration: ${CLIP_DUR}s"
