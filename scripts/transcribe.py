import os
import sys
import json

# Fix Windows symlink issue with HuggingFace Hub
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"
os.environ["HF_HUB_ENABLE_HF_TRANSFER"] = "0"

from faster_whisper import WhisperModel
from huggingface_hub import constants
constants.HF_HUB_DISABLE_SYMLINKS = True

if len(sys.argv) < 3:
    print("Usage: python transcribe.py <audio_file> <output_json>")
    sys.exit(1)

audio_file = sys.argv[1]
output_file = sys.argv[2]

# Download model manually with no symlinks
from huggingface_hub import snapshot_download
model_dir = snapshot_download(
    "Systran/faster-whisper-base",
    local_dir=os.path.join(os.path.expanduser("~"), ".cache", "whisper-models", "base"),
    local_dir_use_symlinks=False,
)

print(f"Loading model from {model_dir}...")
model = WhisperModel(model_dir, device="cpu", compute_type="int8")

print(f"Transcribing: {audio_file}")
segments, info = model.transcribe(audio_file, beam_size=5)

print(f"Language: {info.language}, Probability: {info.language_probability:.2f}")
print(f"Duration: {info.duration:.1f}s")
print("---TRANSCRIPT---")

results = []
for seg in segments:
    entry = {
        "start": round(seg.start, 1),
        "end": round(seg.end, 1),
        "text": seg.text.strip()
    }
    results.append(entry)
    print(f"[{seg.start:.1f}-{seg.end:.1f}] {seg.text.strip()}")

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

# Also write plain text version
txt_file = output_file.replace(".json", ".txt")
with open(txt_file, "w", encoding="utf-8") as f:
    for r in results:
        mins = int(r["start"] // 60)
        secs = int(r["start"] % 60)
        f.write(f"[{mins:02d}:{secs:02d}] {r['text']}\n")

print(f"---DONE--- Saved to {output_file} and {txt_file}")
