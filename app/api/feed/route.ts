import { getPublishedEpisodes } from "@/lib/episodes";

const SITE_URL = process.env.SITE_URL || "https://rebuildingabrokenman.com";
const PODCAST_TITLE = "Rebuilding a Broken Man";
const PODCAST_DESCRIPTION =
  "Raw, honest conversations about what it actually takes to rebuild your life. Hosted by John Sobetsky.";
const AUTHOR = "John Sobetsky";
const EMAIL = "rebuildingabrokenman@gmail.com";
const LANGUAGE = "en-us";
const CATEGORY = "Society &amp; Culture";
const SUBCATEGORY = "Personal Journals";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function parseDuration(duration: string): number {
  const parts = duration.split(":").map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}

export async function GET() {
  const episodes = getPublishedEpisodes();

  const lastBuildDate = episodes.length > 0
    ? new Date(episodes[0].publishDate + "T12:00:00Z").toUTCString()
    : new Date().toUTCString();

  const items = episodes
    .map(
      (ep) => `
    <item>
      <title>${escapeXml(ep.title)}</title>
      <description><![CDATA[${ep.description}]]></description>
      <link>${SITE_URL}/episodes/${ep.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/episodes/${ep.slug}</guid>
      <pubDate>${new Date(ep.publishDate + "T12:00:00Z").toUTCString()}</pubDate>
      ${
        ep.audioUrl
          ? `<enclosure url="${escapeXml(ep.audioUrl)}" type="audio/mpeg" length="0" />`
          : ""
      }
      <itunes:title>${escapeXml(ep.title)}</itunes:title>
      <itunes:summary><![CDATA[${ep.description}]]></itunes:summary>
      <itunes:author>${AUTHOR}</itunes:author>
      <itunes:episode>${ep.number}</itunes:episode>
      <itunes:episodeType>full</itunes:episodeType>
      ${ep.duration ? `<itunes:duration>${parseDuration(ep.duration)}</itunes:duration>` : ""}
      <content:encoded><![CDATA[${ep.showNotes}]]></content:encoded>
    </item>`
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${PODCAST_TITLE}</title>
    <description><![CDATA[${PODCAST_DESCRIPTION}]]></description>
    <link>${SITE_URL}</link>
    <language>${LANGUAGE}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/api/feed" rel="self" type="application/rss+xml" />
    <itunes:author>${AUTHOR}</itunes:author>
    <itunes:owner>
      <itunes:name>${AUTHOR}</itunes:name>
      <itunes:email>${EMAIL}</itunes:email>
    </itunes:owner>
    <itunes:category text="${CATEGORY}">
      <itunes:category text="${SUBCATEGORY}" />
    </itunes:category>
    <itunes:explicit>false</itunes:explicit>
    <itunes:type>episodic</itunes:type>
    <itunes:summary><![CDATA[${PODCAST_DESCRIPTION}]]></itunes:summary>
    ${items}
  </channel>
</rss>`;

  return new Response(feed.trim(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
