# Rebuilding a Broken Man — Podcast Platform

A complete podcast production platform. Website, audio processing, video shorts, graphics, and accountability calendar. Hosted by John Sobetsky.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Hosting:** Railway
- **Episode Data:** JSON files in `/content/episodes/`
- **Audio/Video:** ffmpeg scripts
- **Graphics:** HTML templates (screenshot to generate)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### First-Time Setup

See `planning/tools-setup.md` for the full setup checklist. Quick version:

```bash
# Install ffmpeg (required for audio/video scripts)
winget install Gyan.FFmpeg

# Create asset directories
mkdir -p assets/raw assets/audio assets/subtitles assets/graphics
mkdir -p output/episodes output/clips output/shorts output/videos
```

## Adding a New Episode

1. Create a new JSON file in `content/episodes/`:
   ```
   content/episodes/004-episode-slug.json
   ```

2. Use this structure:
   ```json
   {
     "number": 4,
     "slug": "episode-slug",
     "title": "Episode Title",
     "description": "Short description for podcast directories.",
     "duration": "10:30",
     "publishDate": "2026-06-22",
     "audioUrl": "https://your-cdn.com/episodes/004-episode-slug.mp3",
     "tags": ["tag1", "tag2"],
     "showNotes": "Full show notes in markdown-ish format."
   }
   ```

3. Episodes with a `publishDate` in the future won't appear on the site or RSS feed until that date.

4. Push to `main` — Railway will auto-deploy.

## Production Scripts

### Audio
```bash
# Full episode pipeline (normalize → clean → trim → intro/outro → export MP3)
./scripts/audio/process-episode.sh <raw-recording.wav> <episode-number>

# Extract a clip for shorts (with fade in/out)
./scripts/audio/create-clip.sh <episode.mp3> <start-time> <duration> <clip-name>

# Batch normalize a folder of audio files
./scripts/audio/batch-normalize.sh <input-directory> [output-directory]
```

### Video
```bash
# Create audiogram video (square or vertical)
./scripts/video/create-audiogram.sh <audio-clip.mp3> <title> [square|vertical]

# Create vertical short for Reels/TikTok/Shorts
./scripts/video/create-short.sh <audio.mp3> <title> [subtitle-text] [bg-image.jpg]

# Burn subtitles into video
./scripts/video/add-subtitles.sh <video.mp4> <subtitles.srt>
```

### Graphics
Open these HTML files in Chrome, edit the text, and screenshot:

- `scripts/graphics/generate-podcast-cover.html` — Main podcast cover art (3000x3000)
- `scripts/graphics/generate-episode-cover.html` — Per-episode cover art (3000x3000)
- `scripts/graphics/generate-social-card.html` — LinkedIn/Twitter cards (1200x630)
- `scripts/graphics/generate-youtube-thumbnail.html` — YouTube thumbnails (1280x720)

## RSS Feed

The podcast RSS feed is available at `/api/feed`. Submit this URL to Apple Podcasts, Spotify, and other directories.

## Project Structure

```
app/                          # Next.js App Router pages
  api/feed/                   # RSS feed endpoint
  episodes/                   # Episodes list + individual pages
  calendar/                   # Production calendar + accountability
  about/                      # About page
  components/                 # Shared components (Nav, Footer)

content/
  episodes/                   # Episode data (JSON files)
  calendar.json               # Production schedule data

planning/
  episode-topics.md           # 15 episode ideas with descriptions
  episode-1-outline.md        # Full EP1 script outline
  show-notes-template.md      # Template for episode show notes
  intro-outro-scripts.md      # Intro (30s) and outro (15s) scripts
  linkedin-strategy.md        # LinkedIn content strategy
  production-workflow.md       # Full production workflow (record → publish)
  tools-setup.md              # Tool installation + setup guide

scripts/
  audio/                      # Audio processing (ffmpeg)
    process-episode.sh        # Full episode pipeline
    create-clip.sh            # Extract clips for shorts
    batch-normalize.sh        # Batch normalize audio files
  video/                      # Video production (ffmpeg)
    create-audiogram.sh       # Audiogram videos (square/vertical)
    create-short.sh           # Vertical shorts (Reels/TikTok)
    add-subtitles.sh          # Burn captions into video
  graphics/                   # Graphics templates (HTML → screenshot)
    generate-podcast-cover.html
    generate-episode-cover.html
    generate-social-card.html
    generate-youtube-thumbnail.html

assets/                       # Production assets (partially git-ignored)
  raw/                        # Raw recordings (git-ignored)
  audio/                      # Intro/outro music (committed)
  subtitles/                  # SRT caption files (git-ignored)
  graphics/                   # Generated images (git-ignored)

output/                       # Script output (git-ignored)
  episodes/                   # Final MP3s
  clips/                      # Audio clips
  shorts/                     # Short videos
  videos/                     # Audiograms

lib/                          # Shared utilities
```

## Deployment

Deployed on Railway. Pushes to `main` trigger automatic deployments.

## Planning Docs

See the `/planning/` directory for:
- **Episode topics** — 15 episode ideas for Season 1
- **Episode 1 outline** — Full script with section-by-section guidance
- **Show notes template** — Copy-paste template for each episode
- **Intro/outro scripts** — 30-second intro, 15-second outro
- **LinkedIn strategy** — Content pillars, posting schedule, examples
- **Production workflow** — Complete step-by-step from recording to promotion
- **Tools setup** — What to install, recommended software, first-time checklist
