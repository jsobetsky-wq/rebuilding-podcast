"use client";

import Link from "next/link";

const SPOTIFY_SHOW_URL =
  "https://open.spotify.com/show/033oaVWEUMuw9DQsPk1eFA";

const stats = [
  { label: "Total Episodes", value: "1", sub: "published" },
  { label: "Total Clips", value: "29", sub: "created" },
  { label: "Followers", value: "--", sub: "connect analytics" },
  { label: "Avg Length", value: "9:52", sub: "minutes" },
];

const recentActivity = [
  {
    date: "Jul 14, 2026",
    text: "Episode 5 LinkedIn post scheduled for 5:00 PM",
    type: "scheduled",
  },
  {
    date: "Jul 14, 2026",
    text: 'Episode 5 "Start Today" recorded, cleaned, 6 clips created',
    type: "clip",
  },
  {
    date: "Jun 19, 2026",
    text: 'Episode 4 "Move Different" recorded, cleaned, 6 clips created',
    type: "clip",
  },
  {
    date: "Jun 19, 2026",
    text: "Episode 4 LinkedIn post scheduled for 4:00 PM",
    type: "scheduled",
  },
  {
    date: "Jun 8, 2026",
    text: 'Episode 3 "Rock Bottom Is a Foundation" recorded, cleaned, 6 clips created',
    type: "clip",
  },
  {
    date: "Jun 9, 2026",
    text: 'Episode 3 LinkedIn post scheduled for 6:00 AM',
    type: "scheduled",
  },
  {
    date: "Jun 1, 2026",
    text: 'Episode 2 "Men\'s Mental Health" scheduled for Spotify',
    type: "scheduled",
  },
  {
    date: "May 2026",
    text: "29 audio clips created from EP1 through EP5",
    type: "clip",
  },
  {
    date: "May 2026",
    text: 'Episode 1 "The Beginning" published on Spotify',
    type: "publish",
  },
  {
    date: "May 2026",
    text: "Production dashboard launched",
    type: "system",
  },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-1">Production Dashboard</h1>
        <p className="text-[var(--color-text-muted)]">
          Rebuilding a Broken Man — podcast production hub
        </p>
      </div>

      {/* Show Status Card */}
      <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center">
              <span className="text-2xl font-bold text-[var(--color-accent)]">
                R
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold">Rebuilding a Broken Man</h2>
              <p className="text-sm text-[var(--color-text-muted)]">
                1 episode published on Spotify
              </p>
            </div>
          </div>
          <a
            href={SPOTIFY_SHOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-green-700 text-green-400 text-sm font-medium hover:bg-green-900/20 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            View on Spotify
          </a>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]"
          >
            <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Next Up */}
        <div className="p-6 rounded-xl border-2 border-[var(--color-accent)] bg-[var(--color-bg-card)]">
          <p className="text-xs text-[var(--color-accent-light)] uppercase tracking-wide font-bold mb-3">
            Next Up
          </p>
          <h3 className="text-lg font-bold mb-1">
            Episode 2: Men&apos;s Mental Health
          </h3>
          <p className="text-sm text-[var(--color-text-muted)] mb-3">
            Publish: Jun 1 at 6:00 AM &middot; LinkedIn post same day
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium border-yellow-700 text-yellow-400">
              Scheduled
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
          <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide font-bold mb-4">
            Quick Actions
          </p>
          <div className="grid grid-cols-1 gap-3">
            <Link
              href="/episodes"
              className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 bg-[var(--color-bg)] transition-all text-sm font-medium"
            >
              <span className="text-[var(--color-accent-light)]">+</span>
              New Episode
            </Link>
            <Link
              href="/clips"
              className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 bg-[var(--color-bg)] transition-all text-sm font-medium"
            >
              <span className="text-[var(--color-accent-light)]">&#9986;</span>
              Create Clip
            </Link>
            <Link
              href="/linkedin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 bg-[var(--color-bg)] transition-all text-sm font-medium"
            >
              <span className="text-[var(--color-accent-light)]">&#9998;</span>
              Draft LinkedIn Post
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--color-text-muted)] mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  item.type === "publish"
                    ? "bg-green-500"
                    : "bg-[var(--color-text-muted)]"
                }`}
              />
              <div>
                <p className="text-sm">{item.text}</p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
