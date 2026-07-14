"use client";

import Link from "next/link";
import { useState } from "react";

type EpisodeStatus = "Draft" | "Recorded" | "Edited" | "Scheduled" | "Published";

interface Episode {
  number: number;
  slug: string;
  title: string;
  status: EpisodeStatus;
  date: string;
  duration: string;
  spotifyUrl: string;
}

const statusColors: Record<EpisodeStatus, string> = {
  Draft: "border-[var(--color-border)] text-[var(--color-text-muted)] bg-[var(--color-bg)]",
  Recorded: "border-orange-700 text-orange-400 bg-orange-900/10",
  Edited: "border-blue-700 text-blue-400 bg-blue-900/10",
  Scheduled: "border-yellow-700 text-yellow-400 bg-yellow-900/10",
  Published: "border-green-700 text-green-400 bg-green-900/10",
};

const initialEpisodes: Episode[] = [
  {
    number: 1,
    slug: "the-beginning",
    title: "The Beginning",
    status: "Published",
    date: "2025-05-01",
    duration: "9:52",
    spotifyUrl:
      "https://open.spotify.com/show/033oaVWEUMuw9DQsPk1eFA",
  },
  {
    number: 2,
    slug: "mens-mental-health",
    title: "Men's Mental Health",
    status: "Scheduled",
    date: "2026-06-01",
    duration: "12:34",
    spotifyUrl: "",
  },
  {
    number: 3,
    slug: "rock-bottom-is-a-foundation",
    title: "Rock Bottom Is a Foundation",
    status: "Recorded",
    date: "2026-06-09",
    duration: "9:56",
    spotifyUrl: "",
  },
  {
    number: 4,
    slug: "move-different",
    title: "Move Different",
    status: "Recorded",
    date: "2026-06-19",
    duration: "9:10",
    spotifyUrl: "",
  },
  {
    number: 5,
    slug: "start-today",
    title: "Start Today",
    status: "Recorded",
    date: "2026-07-14",
    duration: "15:54",
    spotifyUrl: "",
  },
];

export default function EpisodesPage() {
  const [episodes] = useState<Episode[]>(initialEpisodes);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Episodes</h1>
          <p className="text-[var(--color-text-muted)]">
            Manage and track all episodes
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white font-medium rounded-lg transition-colors text-sm">
          + Add Episode
        </button>
      </div>

      {/* Status Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {(Object.keys(statusColors) as EpisodeStatus[]).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-medium ${statusColors[s]}`}
            >
              {s}
            </span>
          </div>
        ))}
      </div>

      {/* Episodes Table */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[60px_1fr_120px_120px_120px_100px] gap-4 px-6 py-3 border-b border-[var(--color-border)] text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
          <div>#</div>
          <div>Title</div>
          <div>Status</div>
          <div>Platform</div>
          <div>Date</div>
          <div>Actions</div>
        </div>

        {/* Table Rows */}
        {episodes.map((ep) => (
          <div
            key={ep.number}
            className="grid grid-cols-1 md:grid-cols-[60px_1fr_120px_120px_120px_100px] gap-2 md:gap-4 px-6 py-4 border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-bg-hover)] transition-colors items-center"
          >
            <div className="text-sm font-bold text-[var(--color-text-muted)]">
              {String(ep.number).padStart(2, "0")}
            </div>
            <div>
              <p className="font-medium text-sm">{ep.title}</p>
              {ep.duration && (
                <p className="text-xs text-[var(--color-text-muted)]">
                  {ep.duration}
                </p>
              )}
            </div>
            <div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${statusColors[ep.status]}`}
              >
                {ep.status}
              </span>
            </div>
            <div>
              {ep.spotifyUrl ? (
                <a
                  href={ep.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors"
                  title="View on Spotify"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  <span className="text-xs">Spotify</span>
                </a>
              ) : (
                <span className="text-xs text-[var(--color-text-muted)]">
                  --
                </span>
              )}
            </div>
            <div className="text-sm text-[var(--color-text-muted)]">
              {ep.date
                ? new Date(ep.date + "T12:00:00").toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "--"}
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/episodes/${ep.slug}`}
                className="text-xs text-[var(--color-accent-light)] hover:underline"
              >
                Edit
              </Link>
              <Link
                href={`/episodes/${ep.slug}`}
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
