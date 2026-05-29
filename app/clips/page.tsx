"use client";

import { useState } from "react";

interface ClipData {
  file: string;
  title: string;
  episode: string;
  timestamp: string;
  duration: string;
  bestFor: string;
  transcript: string;
}

const clips: Record<string, ClipData[]> = {
  "Episode 2: Men's Mental Health": [
    {
      file: "/clips/ep2/ep2-hard-men-raised-by-hard-men.mp3",
      title: "Hard Men Raised by Hard Men",
      episode: "EP2",
      timestamp: "1:48 - 2:40",
      duration: "52s",
      bestFor: "LinkedIn",
      transcript:
        "Most of us are hard men who were raised by hard men and that generally doesn't begin anything positive when it comes to emotional stability, emotional health, mental health...",
    },
    {
      file: "/clips/ep2/ep2-bottling-it-up.mp3",
      title: "Bottling It Up",
      episode: "EP2",
      timestamp: "2:35 - 3:30",
      duration: "55s",
      bestFor: "YouTube Shorts",
      transcript:
        "Sometimes bottling that up came in the form of suicidal thoughts, suicidal tendencies, suicide attempts. Sometimes bottling it up came in the form of extreme anger...",
    },
    {
      file: "/clips/ep2/ep2-its-simple-not-easy.mp3",
      title: "It's Simple, Not Easy",
      episode: "EP2",
      timestamp: "5:31 - 6:29",
      duration: "58s",
      bestFor: "LinkedIn, Reels",
      transcript:
        "I promise you it is that simple it's just not that easy but you have to get uncomfortable and really take a self-evaluation checklist of what you got going on...",
    },
    {
      file: "/clips/ep2/ep2-strongest-men-i-know.mp3",
      title: "Strongest Men I Know",
      episode: "EP2",
      timestamp: "6:35 - 7:30",
      duration: "55s",
      bestFor: "LinkedIn",
      transcript:
        "The strongest men that I know are the ones that took that time, did that evaluation, did that self-reflection and have since been open about it and vulnerable about it...",
    },
    {
      file: "/clips/ep2/ep2-phoenix-from-ashes.mp3",
      title: "Phoenix From the Ashes",
      episode: "EP2",
      timestamp: "7:23 - 8:13",
      duration: "50s",
      bestFor: "TikTok, Shorts",
      transcript:
        "Like a phoenix rises out of the ashes it is a necessary part of this and it's better reaching rock bottom on your own than being forced there...",
    },
    {
      file: "/clips/ep2/ep2-broken-is-the-starting-point.mp3",
      title: "Broken Is the Starting Point",
      episode: "EP2",
      timestamp: "10:33 - 11:15",
      duration: "42s",
      bestFor: "All Platforms",
      transcript:
        "This month isn't about weakness. It's about courage. The courage to stop hiding, the courage to face what's broken, and the courage to rebuild. Broken is not the end. It is the starting point.",
    },
  ],
  "Episode 1: The Beginning": [
    {
      file: "/clips/ep1/ep1-im-broken-and-willing-to-admit-it.mp3",
      title: "I'm Broken and Willing to Admit It",
      episode: "EP1",
      timestamp: "0:00 - 0:55",
      duration: "55s",
      bestFor: "LinkedIn",
      transcript:
        "I'm not starting this because I have it all figured out. It's the opposite. I'm starting this because I'm rebuilding myself in real time... I'm broken and for maybe the first time ever, I've become willing to admit that.",
    },
    {
      file: "/clips/ep1/ep1-broken-doesnt-disqualify-you.mp3",
      title: "Broken Doesn't Disqualify You",
      episode: "EP1",
      timestamp: "4:00 - 4:50",
      duration: "50s",
      bestFor: "LinkedIn",
      transcript:
        "Being broken doesn't disqualify you. It doesn't disqualify you from anything. You can have all the things that you want to have. It's just a matter of taking those steps, taking it day by day, and moving forward.",
    },
    {
      file: "/clips/ep1/ep1-exposes-what-needs-work.mp3",
      title: "Exposes What Needs Work",
      episode: "EP1",
      timestamp: "4:40 - 5:30",
      duration: "50s",
      bestFor: "Reels",
      transcript:
        "If you're honest with yourself, it exposes you to yourself. It shows you what needs work. It shows you the areas that you're lacking. It shows you the things that you may need to cut out...",
    },
    {
      file: "/clips/ep1/ep1-phoenix-starting-from-nothing.mp3",
      title: "Phoenix — Starting From Nothing",
      episode: "EP1",
      timestamp: "6:53 - 7:43",
      duration: "50s",
      bestFor: "TikTok, Shorts",
      transcript:
        "I am starting from what I feel like is a damn newborn. I feel like I'm building back up, like a phoenix out of the ashes...",
    },
    {
      file: "/clips/ep1/ep1-raw-rough-around-the-edges.mp3",
      title: "Raw, Rough Around the Edges",
      episode: "EP1",
      timestamp: "7:40 - 8:35",
      duration: "55s",
      bestFor: "LinkedIn",
      transcript:
        "You're going to get somebody who's pretty raw, who's definitely extremely rough around the edges. I'm going to say things that you're not going to agree with and I'm not going to care...",
    },
  ],
};

function DownloadIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function ClipCard({ clip }: { clip: ClipData }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-bold text-sm">{clip.title}</h3>
          <p className="text-xs text-[var(--color-text-muted)]">
            {clip.episode} &middot; {clip.timestamp} &middot; {clip.duration}
          </p>
        </div>
        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium border border-[var(--color-border)] text-[var(--color-accent-light)] whitespace-nowrap">
          {clip.bestFor}
        </span>
      </div>

      {/* Audio Player */}
      <audio controls className="w-full h-8 mb-3" preload="none">
        <source src={clip.file} type="audio/mpeg" />
      </audio>

      {/* Transcript Preview */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-2"
      >
        {expanded ? "Hide transcript" : "Show transcript"} &darr;
      </button>
      {expanded && (
        <p className="text-xs text-[var(--color-text-muted)] italic leading-relaxed mb-3 p-2 rounded bg-[var(--color-bg)] border border-[var(--color-border)]">
          &ldquo;{clip.transcript}&rdquo;
        </p>
      )}

      {/* Download */}
      <a
        href={clip.file}
        download
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-all"
      >
        <DownloadIcon />
        Download MP3
      </a>
    </div>
  );
}

export default function ClipsPage() {
  const [filter, setFilter] = useState<string>("all");

  const allClips = Object.entries(clips);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Clips</h1>
          <p className="text-[var(--color-text-muted)]">
            Audio clips ready for social media. Play, preview, and download.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === "all"
                ? "bg-[var(--color-accent)] text-white"
                : "border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("ep1")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === "ep1"
                ? "bg-[var(--color-accent)] text-white"
                : "border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            EP1
          </button>
          <button
            onClick={() => setFilter("ep2")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === "ep2"
                ? "bg-[var(--color-accent)] text-white"
                : "border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            EP2
          </button>
        </div>
      </div>

      {allClips
        .filter(([title]) => {
          if (filter === "all") return true;
          if (filter === "ep1") return title.includes("Episode 1");
          if (filter === "ep2") return title.includes("Episode 2");
          return true;
        })
        .map(([episodeTitle, episodeClips]) => (
          <div key={episodeTitle} className="mb-10">
            <h2 className="text-lg font-bold mb-4 text-[var(--color-accent-light)]">
              {episodeTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {episodeClips.map((clip) => (
                <ClipCard key={clip.file} clip={clip} />
              ))}
            </div>
          </div>
        ))}

      {/* Quick Reference */}
      <div className="mt-8 p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--color-text-muted)] mb-4">
          Platform Specs
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
            <p className="text-sm font-medium mb-1">LinkedIn</p>
            <p className="text-xs text-[var(--color-text-muted)]">
              1:1 or 16:9 &middot; Up to 10 min &middot; 1080p
            </p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
            <p className="text-sm font-medium mb-1">YouTube Shorts</p>
            <p className="text-xs text-[var(--color-text-muted)]">
              9:16 &middot; Up to 60s &middot; 1080x1920
            </p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
            <p className="text-sm font-medium mb-1">Instagram Reels</p>
            <p className="text-xs text-[var(--color-text-muted)]">
              9:16 &middot; Up to 90s &middot; 1080x1920
            </p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
            <p className="text-sm font-medium mb-1">TikTok</p>
            <p className="text-xs text-[var(--color-text-muted)]">
              9:16 &middot; Up to 10 min &middot; 1080x1920
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
