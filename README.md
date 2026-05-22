# Rebuilding a Broken Man — Podcast Website

A podcast about personal growth, rebuilding, and lessons learned. Hosted by John Sobetsky.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Hosting:** Railway
- **Episode Data:** JSON files in `/content/episodes/`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a New Episode

1. Create a new JSON file in `content/episodes/` following the naming convention:
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

## RSS Feed

The podcast RSS feed is available at `/api/feed`. Submit this URL to Apple Podcasts, Spotify, and other directories.

## Project Structure

```
app/                    # Next.js App Router pages
  api/feed/             # RSS feed endpoint
  episodes/             # Episodes list and individual episode pages
  about/                # About page
  components/           # Shared components
content/episodes/       # Episode data (JSON files)
planning/               # Episode outlines, templates, strategy docs
lib/                    # Shared utilities (episode loader)
```

## Deployment

Deployed on Railway. Pushes to `main` trigger automatic deployments.

## Planning Docs

See the `/planning/` directory for:
- Episode topic ideas
- Episode 1 full outline
- Show notes template
- Intro/outro scripts
- LinkedIn content strategy
