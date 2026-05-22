# Production Workflow — Rebuilding a Broken Man

Complete step-by-step process from idea to published episode.

---

## Phase 1: Pre-Production (Before Recording Day)

### Outline the Episode
1. Pick topic from `planning/episode-topics.md`
2. Write a rough outline with 3-4 key sections (see `planning/episode-1-outline.md` for format)
3. Identify 2-3 key lines you want to hit (these become social clips)
4. Don't over-script — bullet points, not paragraphs

### Prep Checklist
- [ ] Outline written and reviewed
- [ ] Riverside.fm project created for this episode
- [ ] Recording time blocked on calendar (Thursday 7:00 AM)
- [ ] Equipment check: mic, headphones, Riverside settings

---

## Phase 2: Recording (Thursday)

### Setup
1. Open **Riverside.fm** → create new session
2. Set recording quality to **WAV (lossless)**
3. Verify mic input (Blue Yeti / whatever you're using)
4. Close all other apps, phone on silent, door closed
5. Water nearby

### Recording Tips
- **One take is the goal.** Authenticity over perfection.
- If you stumble, pause 3 seconds, then re-say the line. Easy to cut in editing.
- Don't worry about "ums" — a few are natural. Only cut if excessive.
- Target 10-12 minutes of content (will become ~10 after editing)
- Speak at conversation volume. Don't project or perform.

### After Recording
1. Download the WAV file from Riverside.fm
2. Also download the transcript (Riverside offers this) — useful for show notes and subtitles
3. Save raw file to: `assets/raw/EP[XXX]-raw.wav`

---

## Phase 3: Post-Production (Friday)

### Audio Processing
Run the automated pipeline:
```bash
./scripts/audio/process-episode.sh assets/raw/EP001-raw.wav 001
```

This automatically:
- Normalizes to -16 LUFS (podcast standard)
- Applies noise cleanup (high-pass filter + compression)
- Trims dead air (silence > 2 seconds)
- Adds intro/outro music (if files exist in `assets/audio/`)
- Exports final MP3 at 192kbps

### Manual Edit (if needed)
If specific cuts are needed beyond the automated pipeline:
- Use **Riverside.fm's editor** (basic cuts) or **Audacity** (free, advanced) or **Descript** (AI-powered, paid)
- Cut at natural pause points, not mid-sentence
- Keep pauses — they add weight. Only cut dead air > 3 seconds.

### Extract Clips for Shorts
Identify 1-2 powerful moments (30-60 seconds each):
```bash
./scripts/audio/create-clip.sh output/episodes/001-final.mp3 03:15 00:45 ep1-real-quote
```

### Quality Check
- [ ] Listen to the full episode end-to-end
- [ ] Intro/outro sound clean
- [ ] No technical issues (pops, clicks, volume drops)
- [ ] Duration is 8-12 minutes
- [ ] File size is reasonable (< 20MB for ~10 min)

---

## Phase 4: Assets & Content (Friday-Saturday)

### Show Notes
1. Write show notes using `planning/show-notes-template.md`
2. Create/update episode JSON in `content/episodes/`
3. Include a key quote for social media

### Graphics
Generate these assets for each episode:

1. **Episode Cover Art** (3000x3000)
   - Open `scripts/graphics/generate-episode-cover.html` in Chrome
   - Edit the episode number and title
   - Screenshot at full resolution
   - Save as `assets/graphics/ep[XXX]-cover.png`

2. **Social Card** (1200x630) for LinkedIn
   - Open `scripts/graphics/generate-social-card.html`
   - Edit the quote and episode info
   - Screenshot
   - Save as `assets/graphics/ep[XXX]-social.png`

3. **YouTube Thumbnail** (1280x720)
   - Open `scripts/graphics/generate-youtube-thumbnail.html`
   - Edit the text
   - Screenshot
   - Save as `assets/graphics/ep[XXX]-youtube.png`

### Video Shorts
Create audiogram/short from the best clip:
```bash
# Square audiogram for LinkedIn/Twitter
./scripts/video/create-audiogram.sh output/clips/ep1-real-quote.mp3 "Why I'm Here" square

# Vertical short for Reels/TikTok/Shorts
./scripts/video/create-short.sh output/clips/ep1-real-quote.mp3 "Why I'm Here" "The quote text here"
```

If you have the Riverside transcript as SRT, add captions:
```bash
./scripts/video/add-subtitles.sh output/shorts/ep1-real-quote-short.mp4 assets/subtitles/ep1-clip.srt
```

---

## Phase 5: Publish (Monday)

### Upload Audio
1. Upload final MP3 to your podcast hosting provider (Buzzsprout, Podbean, Anchor, etc.)
2. Copy the hosted audio URL
3. Update `content/episodes/[XXX]-slug.json` with the `audioUrl`

### Deploy Website
```bash
git add -A
git commit -m "Publish Episode [XXX]: [Title]"
git push
```
Railway auto-deploys on push.

### Verify
- [ ] Episode page loads correctly on the live site
- [ ] Audio player works (if audioUrl is set)
- [ ] RSS feed at `/api/feed` includes the new episode
- [ ] Show notes render correctly

### Submit RSS (First Episode Only)
Submit your RSS feed URL to:
- **Apple Podcasts**: https://podcastsconnect.apple.com
- **Spotify**: https://podcasters.spotify.com
- **Google Podcasts**: Automatic via RSS
- **YouTube Music**: https://music.youtube.com/podcasts (requires linked YouTube channel)
- **Amazon Music**: https://podcasters.amazon.com

---

## Phase 6: Promote (Monday)

### LinkedIn
1. Write episode promotion post (see `planning/linkedin-strategy.md`)
2. Post with social card image
3. Engage with comments throughout the day

### Short-Form Video
Upload your short video clip to:
- YouTube Shorts
- Instagram Reels
- TikTok (if applicable)
- LinkedIn (native video)

### Cross-Promote
- Share in relevant LinkedIn groups
- Send to close contacts who might resonate
- Mention in any business networking conversations

### Update Calendar
Update `content/calendar.json` — change episode status to `"published"`

---

## Recurring Tasks

### Weekly
- Record, edit, publish one episode (see above)
- 2-3 LinkedIn posts (1 promo + 1-2 micro-lessons)
- 1 short-form video clip
- Engage with comments and DMs

### Monthly
- Review analytics (downloads, LinkedIn engagement)
- Plan next 4 episode topics
- Write outlines for upcoming episodes
- Assess what's working, what isn't

### Quarterly
- Record a "check-in" episode reflecting on progress
- Update podcast cover art if needed
- Review and refresh LinkedIn strategy
- Consider adding guest episodes or format changes

---

## Tools Reference

| Tool | Purpose | Cost |
|------|---------|------|
| Riverside.fm | Recording | $15-24/mo |
| Audacity | Advanced audio editing | Free |
| Descript | AI-powered editing, transcription | $24/mo |
| ffmpeg | Audio/video processing (scripts) | Free |
| Canva | Quick graphics (alternative to HTML templates) | Free/$13/mo |
| Buzzsprout | Podcast hosting + distribution | $12-24/mo |
| Headliner | Audiogram videos (alternative to scripts) | Free/$15/mo |
| CapCut | Short-form video editing | Free |
| LinkedIn | Primary promotion platform | Free |
