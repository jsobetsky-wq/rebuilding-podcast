# Show Notes Template

Use this template for every episode. Copy, fill in, and save as the episode JSON in `/content/episodes/`.

---

## Episode [NUMBER]: [TITLE]

**Published:** [DATE]
**Duration:** [MM:SS]

### Description
[2-3 sentence description for podcast directories. Hook the listener. Be specific, not vague.]

### In This Episode
[Bullet points of key topics discussed. 4-6 items.]

- Topic one
- Topic two
- Topic three
- Topic four

### Key Quote
> "[One memorable line from the episode that could stand alone as a social media clip]"

### Connect
- **LinkedIn:** [John Sobetsky](https://linkedin.com/in/johnsobetsky)
- **Website:** [rebuildingabrokenman.com](https://rebuildingabrokenman.com)
- **Email:** johns@mainlinesecure.com

### Tags
[3-5 relevant tags for discoverability]

---

## JSON Format

When ready to publish, create the episode JSON file:

```json
{
  "number": 0,
  "slug": "episode-slug-here",
  "title": "Episode Title",
  "description": "Short description for directories.",
  "duration": "10:00",
  "publishDate": "YYYY-MM-DD",
  "audioUrl": "https://your-cdn.com/episodes/000-slug.mp3",
  "tags": ["tag1", "tag2", "tag3"],
  "showNotes": "Full show notes in markdown format."
}
```
