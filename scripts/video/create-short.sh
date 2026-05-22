#!/bin/bash
# ============================================================
# create-short.sh — Create a vertical short video (Reels/TikTok/Shorts)
# Takes an audio clip + optional background image, produces 9:16 video
# Usage: ./scripts/video/create-short.sh <audio-clip> <title> [subtitle-text] [bg-image]
# Requires: ffmpeg
# ============================================================

set -e

AUDIO="$1"
TITLE="$2"
SUBTITLE="${3:-}"
BG_IMAGE="${4:-}"

if [ -z "$AUDIO" ] || [ -z "$TITLE" ]; then
  echo "Usage: ./scripts/video/create-short.sh <audio.mp3> <title> [subtitle-text] [bg-image.jpg]"
  echo ""
  echo "Examples:"
  echo "  ./scripts/video/create-short.sh clip.mp3 'Rock Bottom'"
  echo "  ./scripts/video/create-short.sh clip.mp3 'Rock Bottom' 'Rock bottom is a foundation' bg.jpg"
  exit 1
fi

OUTPUT_DIR="./output/shorts"
mkdir -p "$OUTPUT_DIR"

BASENAME=$(basename "$AUDIO" .mp3)
DURATION=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$AUDIO")
WIDTH=1080
HEIGHT=1920

echo "Creating short: $TITLE (${DURATION}s)"

if [ -n "$BG_IMAGE" ] && [ -f "$BG_IMAGE" ]; then
  # Use background image with dark overlay
  BG_FILTER="[0:v]scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=increase,crop=${WIDTH}:${HEIGHT},setsar=1,colorchannelmixer=aa=0.3[bg]"
  INPUT_BG="-loop 1 -i $BG_IMAGE"
else
  # Solid dark background
  BG_FILTER="color=c=0x0a0a0a:s=${WIDTH}x${HEIGHT}:d=${DURATION}[bg]"
  INPUT_BG=""
fi

# Build subtitle filter if provided
SUBTITLE_FILTER=""
if [ -n "$SUBTITLE" ]; then
  SUBTITLE_FILTER=",drawtext=text='${SUBTITLE}':fontcolor=white:fontsize=42:x=(w-text_w)/2:y=1100:font='Arial':borderw=2:bordercolor=black"
fi

ffmpeg -y $INPUT_BG -i "$AUDIO" \
  -filter_complex "
    ${BG_FILTER};
    [bg]drawtext=text='REBUILDING A BROKEN MAN':fontcolor=0xc2410c:fontsize=24:x=(w-text_w)/2:y=300:font='Arial',
    drawtext=text='${TITLE}':fontcolor=white:fontsize=56:x=(w-text_w)/2:y=880:font='Arial':borderw=2:bordercolor=black,
    drawtext=text='@johnsobetsky':fontcolor=0x737373:fontsize=20:x=(w-text_w)/2:y=1600:font='Arial'
    ${SUBTITLE_FILTER}
    [v];
    [1:a]showwaves=s=${WIDTH}x120:mode=cline:colors=0xea580c:rate=30[waves];
    [v][waves]overlay=0:960[out]
  " \
  -map "[out]" -map 1:a \
  -c:v libx264 -preset medium -crf 23 \
  -c:a aac -b:a 192k \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -t "$DURATION" \
  "$OUTPUT_DIR/${BASENAME}-short.mp4" 2>/dev/null

echo ""
echo "Done! Short saved: $OUTPUT_DIR/${BASENAME}-short.mp4"
echo "Dimensions: ${WIDTH}x${HEIGHT}"
echo "Duration: $(printf '%.0f' $DURATION)s"
echo ""
echo "Upload to: Instagram Reels, TikTok, YouTube Shorts, LinkedIn"
