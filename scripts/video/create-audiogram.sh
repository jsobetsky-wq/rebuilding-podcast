#!/bin/bash
# ============================================================
# create-audiogram.sh — Create an audiogram video from an audio clip
# Produces a square (1080x1080) or vertical (1080x1920) video
# with waveform visualization over a dark background
# Usage: ./scripts/video/create-audiogram.sh <audio-clip> <title> [format]
# Requires: ffmpeg
# ============================================================

set -e

AUDIO="$1"
TITLE="$2"
FORMAT="${3:-square}"  # square (1080x1080) or vertical (1080x1920)

if [ -z "$AUDIO" ] || [ -z "$TITLE" ]; then
  echo "Usage: ./scripts/video/create-audiogram.sh <audio-clip.mp3> <title> [square|vertical]"
  echo "Example: ./scripts/video/create-audiogram.sh output/clips/best-quote.mp3 'The Mask We Wear' vertical"
  exit 1
fi

OUTPUT_DIR="./output/videos"
mkdir -p "$OUTPUT_DIR"

BASENAME=$(basename "$AUDIO" .mp3)

if [ "$FORMAT" = "vertical" ]; then
  WIDTH=1080
  HEIGHT=1920
  WAVE_H=200
  TITLE_Y=400
  SUBTITLE_Y=500
  WAVE_Y=900
else
  WIDTH=1080
  HEIGHT=1080
  WAVE_H=150
  TITLE_Y=250
  SUBTITLE_Y=340
  WAVE_Y=550
fi

echo "Creating $FORMAT audiogram: $TITLE"

ffmpeg -y -i "$AUDIO" \
  -filter_complex "
    color=c=0x0a0a0a:s=${WIDTH}x${HEIGHT}:d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$AUDIO"),
    drawtext=text='$TITLE':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=$TITLE_Y:font='Arial',
    drawtext=text='Rebuilding a Broken Man':fontcolor=0xc2410c:fontsize=28:x=(w-text_w)/2:y=$SUBTITLE_Y:font='Arial',
    drawtext=text='John Sobetsky':fontcolor=0x737373:fontsize=22:x=(w-text_w)/2:y=$((SUBTITLE_Y + 50)):font='Arial'
    [bg];
    [0:a]showwaves=s=${WIDTH}x${WAVE_H}:mode=cline:colors=0xea580c|0xc2410c:rate=30[waves];
    [bg][waves]overlay=0:$WAVE_Y[v]
  " \
  -map "[v]" -map 0:a \
  -c:v libx264 -preset medium -crf 23 \
  -c:a aac -b:a 192k \
  -pix_fmt yuv420p \
  -movflags +faststart \
  "$OUTPUT_DIR/${BASENAME}-${FORMAT}.mp4" 2>/dev/null

echo ""
echo "Done! Video saved: $OUTPUT_DIR/${BASENAME}-${FORMAT}.mp4"
echo "Dimensions: ${WIDTH}x${HEIGHT}"
