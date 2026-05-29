"use client";

import { useState } from "react";

type Platform = "LinkedIn" | "YouTube Shorts" | "Instagram Reels" | "TikTok";

interface Clip {
  id: number;
  episodeTitle: string;
  clipTitle: string;
  startTime: string;
  endTime: string;
  platform: Platform;
  created: string;
}

const platformSpecs: Record<
  Platform,
  { ratio: string; maxLength: string; resolution: string }
> = {
  LinkedIn: {
    ratio: "1:1 or 16:9",
    maxLength: "10 min",
    resolution: "1080x1080 or 1920x1080",
  },
  "YouTube Shorts": {
    ratio: "9:16",
    maxLength: "60 sec",
    resolution: "1080x1920",
  },
  "Instagram Reels": {
    ratio: "9:16",
    maxLength: "90 sec",
    resolution: "1080x1920",
  },
  TikTok: {
    ratio: "9:16",
    maxLength: "10 min",
    resolution: "1080x1920",
  },
};

const episodes = [
  { slug: "the-beginning", title: "Episode 1: The Beginning" },
  { slug: "the-mask-we-wear", title: "Episode 2: The Mask We Wear" },
  {
    slug: "rock-bottom-is-a-foundation",
    title: "Episode 3: Rock Bottom Is a Foundation",
  },
];

const initialClips: Clip[] = [];

export default function ClipsPage() {
  const [clips, setClips] = useState<Clip[]>(initialClips);
  const [sourceEpisode, setSourceEpisode] = useState(episodes[0].slug);
  const [clipTitle, setClipTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [platform, setPlatform] = useState<Platform>("LinkedIn");

  const selectedSpec = platformSpecs[platform];

  const handleCreate = () => {
    if (!clipTitle || !startTime || !endTime) return;
    const ep = episodes.find((e) => e.slug === sourceEpisode);
    const newClip: Clip = {
      id: Date.now(),
      episodeTitle: ep?.title || "",
      clipTitle,
      startTime,
      endTime,
      platform,
      created: new Date().toLocaleDateString(),
    };
    setClips((prev) => [newClip, ...prev]);
    setClipTitle("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-1">Clip Creator</h1>
      <p className="text-[var(--color-text-muted)] mb-8">
        Create clips from episodes for social media platforms.
      </p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Clip Form */}
        <div className="lg:col-span-2">
          <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <h2 className="text-lg font-bold mb-4">New Clip</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
                  Source Episode
                </label>
                <select
                  value={sourceEpisode}
                  onChange={(e) => setSourceEpisode(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                >
                  {episodes.map((ep) => (
                    <option key={ep.slug} value={ep.slug}>
                      {ep.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
                  Clip Title
                </label>
                <input
                  type="text"
                  value={clipTitle}
                  onChange={(e) => setClipTitle(e.target.value)}
                  placeholder="e.g. Why I started this podcast"
                  className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="mm:ss (e.g. 01:23)"
                    className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
                    End Time
                  </label>
                  <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="mm:ss (e.g. 02:15)"
                    className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
                  Target Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                >
                  {Object.keys(platformSpecs).map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Platform Specs */}
              <div className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-2">
                  {platform} Specs
                </p>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Aspect Ratio
                    </p>
                    <p className="font-medium">{selectedSpec.ratio}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Max Length
                    </p>
                    <p className="font-medium">{selectedSpec.maxLength}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Resolution
                    </p>
                    <p className="font-medium">{selectedSpec.resolution}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCreate}
                disabled={!clipTitle || !startTime || !endTime}
                className="w-full px-4 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors text-sm"
              >
                Create Clip
              </button>
            </div>
          </div>

          {/* FFmpeg Command Reference */}
          <div className="mt-6 p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <h2 className="text-lg font-bold mb-3">FFmpeg Command</h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-3">
              Run this script to create the clip from the source audio:
            </p>
            <div className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] font-mono text-xs text-[var(--color-text-muted)] overflow-x-auto">
              <code>
                bash scripts/audio/create-clip.sh \ <br />
                &nbsp;&nbsp;--input output/episodes/ep-001-final.mp3 \ <br />
                &nbsp;&nbsp;--start {startTime || "01:23"} \ <br />
                &nbsp;&nbsp;--end {endTime || "02:15"} \ <br />
                &nbsp;&nbsp;--output output/clips/
                {clipTitle
                  ? clipTitle.toLowerCase().replace(/\s+/g, "-")
                  : "clip-name"}
                .mp3
              </code>
            </div>
          </div>
        </div>

        {/* Clips List */}
        <div>
          <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <h2 className="text-lg font-bold mb-4">Created Clips</h2>
            {clips.length === 0 ? (
              <p className="text-sm text-[var(--color-text-muted)] py-8 text-center">
                No clips created yet. Fill out the form to create your first
                clip.
              </p>
            ) : (
              <div className="space-y-3">
                {clips.map((clip) => (
                  <div
                    key={clip.id}
                    className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]"
                  >
                    <p className="text-sm font-medium mb-1">
                      {clip.clipTitle}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {clip.episodeTitle}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {clip.startTime} - {clip.endTime} / {clip.platform}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">
                      Created: {clip.created}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
