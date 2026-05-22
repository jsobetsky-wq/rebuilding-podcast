#!/bin/bash
# ============================================================
# process-episode.sh — Full audio pipeline for one episode
# Usage: ./scripts/audio/process-episode.sh <raw-audio.wav> <episode-number>
# Requires: ffmpeg
# ============================================================

set -e

RAW_FILE="$1"
EP_NUM="$2"

if [ -z "$RAW_FILE" ] || [ -z "$EP_NUM" ]; then
  echo "Usage: ./scripts/audio/process-episode.sh <raw-audio-file> <episode-number>"
  echo "Example: ./scripts/audio/process-episode.sh ~/Downloads/riverside-ep1.wav 001"
  exit 1
fi

PADDED=$(printf "%03d" "$EP_NUM")
OUTPUT_DIR="./output/episodes"
TEMP_DIR="./output/temp"
INTRO="./assets/audio/intro.mp3"
OUTRO="./assets/audio/outro.mp3"

mkdir -p "$OUTPUT_DIR" "$TEMP_DIR"

echo "=== Processing Episode $PADDED ==="

# Step 1: Normalize audio to -16 LUFS (podcast standard)
echo "[1/5] Normalizing audio to -16 LUFS..."
ffmpeg -y -i "$RAW_FILE" \
  -af "loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json" \
  -ar 44100 -ac 1 \
  "$TEMP_DIR/${PADDED}-normalized.wav" 2>/dev/null

# Step 2: Noise reduction pass (high-pass filter to remove rumble + light compression)
echo "[2/5] Applying noise cleanup..."
ffmpeg -y -i "$TEMP_DIR/${PADDED}-normalized.wav" \
  -af "highpass=f=80,lowpass=f=12000,acompressor=threshold=-20dB:ratio=3:attack=5:release=50" \
  "$TEMP_DIR/${PADDED}-cleaned.wav" 2>/dev/null

# Step 3: Remove silence longer than 2 seconds (trim dead air)
echo "[3/5] Trimming dead air..."
ffmpeg -y -i "$TEMP_DIR/${PADDED}-cleaned.wav" \
  -af "silenceremove=stop_periods=-1:stop_duration=2:stop_threshold=-40dB" \
  "$TEMP_DIR/${PADDED}-trimmed.wav" 2>/dev/null

# Step 4: Add intro and outro (if they exist)
echo "[4/5] Adding intro/outro..."
if [ -f "$INTRO" ] && [ -f "$OUTRO" ]; then
  ffmpeg -y \
    -i "$INTRO" \
    -i "$TEMP_DIR/${PADDED}-trimmed.wav" \
    -i "$OUTRO" \
    -filter_complex "[0:a][1:a][2:a]concat=n=3:v=0:a=1[out]" \
    -map "[out]" \
    "$TEMP_DIR/${PADDED}-full.wav" 2>/dev/null
else
  echo "  (No intro/outro files found in ./assets/audio/ — skipping)"
  cp "$TEMP_DIR/${PADDED}-trimmed.wav" "$TEMP_DIR/${PADDED}-full.wav"
fi

# Step 5: Export final MP3 (192kbps, podcast-optimized)
echo "[5/5] Exporting final MP3..."
ffmpeg -y -i "$TEMP_DIR/${PADDED}-full.wav" \
  -codec:a libmp3lame -b:a 192k -ar 44100 -ac 1 \
  -metadata title="Rebuilding a Broken Man - Episode $PADDED" \
  -metadata artist="John Sobetsky" \
  -metadata album="Rebuilding a Broken Man" \
  -metadata genre="Podcast" \
  "$OUTPUT_DIR/${PADDED}-final.mp3" 2>/dev/null

# Get duration
DURATION=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUTPUT_DIR/${PADDED}-final.mp3" | cut -d. -f1)
MINS=$((DURATION / 60))
SECS=$((DURATION % 60))

echo ""
echo "=== Done! ==="
echo "Output: $OUTPUT_DIR/${PADDED}-final.mp3"
echo "Duration: ${MINS}:$(printf '%02d' $SECS)"
echo "File size: $(du -h "$OUTPUT_DIR/${PADDED}-final.mp3" | cut -f1)"

# Cleanup temp
rm -rf "$TEMP_DIR/${PADDED}-"*
echo "Temp files cleaned up."
