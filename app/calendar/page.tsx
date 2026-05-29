"use client";

import { useState } from "react";

type Status = "planned" | "recorded" | "edited" | "published";

interface CalendarEpisode {
  number: number;
  title: string;
  status: Status;
  recordDate: string;
  editDate: string;
  publishDate: string;
  socialDate: string;
  notes: string;
}

const schedule = {
  recordingDay: "Thursday",
  editingDay: "Friday",
  publishDay: "Monday",
  socialPostDay: "Monday",
  recordingTime: "7:00 AM",
  timezone: "America/New_York",
};

const initialEpisodes: CalendarEpisode[] = [
  {
    number: 1,
    title: "The Beginning",
    status: "published",
    recordDate: "2025-05-01",
    editDate: "2025-05-01",
    publishDate: "2025-05-01",
    socialDate: "2025-05-01",
    notes: "Live on Spotify",
  },
  {
    number: 2,
    title: "The Mask We Wear",
    status: "planned",
    recordDate: "2026-06-04",
    editDate: "2026-06-05",
    publishDate: "2026-06-08",
    socialDate: "2026-06-08",
    notes: "",
  },
  {
    number: 3,
    title: "Rock Bottom Is a Foundation",
    status: "planned",
    recordDate: "2026-06-11",
    editDate: "2026-06-12",
    publishDate: "2026-06-15",
    socialDate: "2026-06-15",
    notes: "",
  },
  {
    number: 4,
    title: "The 3 AM Conversations",
    status: "planned",
    recordDate: "2026-06-18",
    editDate: "2026-06-19",
    publishDate: "2026-06-22",
    socialDate: "2026-06-22",
    notes: "",
  },
  {
    number: 5,
    title: "Ownership Without Excuses",
    status: "planned",
    recordDate: "2026-06-25",
    editDate: "2026-06-26",
    publishDate: "2026-06-29",
    socialDate: "2026-06-29",
    notes: "",
  },
  {
    number: 6,
    title: "Building a Business While Broken",
    status: "planned",
    recordDate: "2026-07-02",
    editDate: "2026-07-03",
    publishDate: "2026-07-06",
    socialDate: "2026-07-06",
    notes: "",
  },
  {
    number: 7,
    title: "The People Who Stay",
    status: "planned",
    recordDate: "2026-07-09",
    editDate: "2026-07-10",
    publishDate: "2026-07-13",
    socialDate: "2026-07-13",
    notes: "",
  },
  {
    number: 8,
    title: "Fatherhood in the Wreckage",
    status: "planned",
    recordDate: "2026-07-16",
    editDate: "2026-07-17",
    publishDate: "2026-07-20",
    socialDate: "2026-07-20",
    notes: "",
  },
  {
    number: 9,
    title: "The Physical Rebuild",
    status: "planned",
    recordDate: "2026-07-23",
    editDate: "2026-07-24",
    publishDate: "2026-07-27",
    socialDate: "2026-07-27",
    notes: "",
  },
  {
    number: 10,
    title: "Letting Go of Who You Were",
    status: "planned",
    recordDate: "2026-07-30",
    editDate: "2026-07-31",
    publishDate: "2026-08-03",
    socialDate: "2026-08-03",
    notes: "",
  },
  {
    number: 11,
    title: "Asking for Help",
    status: "planned",
    recordDate: "2026-08-06",
    editDate: "2026-08-07",
    publishDate: "2026-08-10",
    socialDate: "2026-08-10",
    notes: "",
  },
  {
    number: 12,
    title: "The Daily Grind of Getting Better",
    status: "planned",
    recordDate: "2026-08-13",
    editDate: "2026-08-14",
    publishDate: "2026-08-17",
    socialDate: "2026-08-17",
    notes: "",
  },
  {
    number: 13,
    title: "Trust — Rebuilding What You Destroyed",
    status: "planned",
    recordDate: "2026-08-20",
    editDate: "2026-08-21",
    publishDate: "2026-08-24",
    socialDate: "2026-08-24",
    notes: "",
  },
  {
    number: 14,
    title: "Finding Purpose in the Pain",
    status: "planned",
    recordDate: "2026-08-27",
    editDate: "2026-08-28",
    publishDate: "2026-08-31",
    socialDate: "2026-08-31",
    notes: "",
  },
  {
    number: 15,
    title: "What Rebuilding Actually Looks Like",
    status: "planned",
    recordDate: "2026-09-03",
    editDate: "2026-09-04",
    publishDate: "2026-09-07",
    socialDate: "2026-09-07",
    notes: "Season 1 finale — check-in and honest accounting",
  },
];

const statusColors: Record<Status, string> = {
  planned: "border-[var(--color-border)] text-[var(--color-text-muted)]",
  recorded: "border-orange-700 text-orange-400",
  edited: "border-blue-700 text-blue-400",
  published: "border-green-700 text-green-400",
};

const statusLabels: Record<Status, string> = {
  planned: "Planned",
  recorded: "Recorded",
  edited: "Edited",
  published: "Published",
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function isUpcoming(dateStr: string): boolean {
  if (!dateStr) return false;
  const today = new Date().toISOString().slice(0, 10);
  const diff =
    (new Date(dateStr).getTime() - new Date(today).getTime()) /
    (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 7;
}

export default function CalendarPage() {
  const [episodes] = useState<CalendarEpisode[]>(initialEpisodes);

  const today = new Date().toISOString().slice(0, 10);
  const nextUp = episodes.find(
    (ep) => ep.status !== "published" && ep.recordDate >= today
  );

  const publishedCount = episodes.filter(
    (ep) => ep.status === "published"
  ).length;
  const totalCount = episodes.length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-1">Production Calendar</h1>
      <p className="text-[var(--color-text-muted)] mb-8">
        Recording schedule, deadlines, and episode status tracker.
      </p>

      {/* Progress bar */}
      <div className="mb-8 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[var(--color-text-muted)]">
            Season 1 Progress
          </span>
          <span className="text-sm font-bold">
            {publishedCount}/{totalCount} episodes
          </span>
        </div>
        <div className="w-full h-2 bg-[var(--color-bg)] rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 rounded-full transition-all"
            style={{
              width: `${(publishedCount / totalCount) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Weekly Rhythm */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
          <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
            Record
          </p>
          <p className="text-lg font-bold">{schedule.recordingDay}s</p>
          <p className="text-sm text-[var(--color-text-muted)]">
            {schedule.recordingTime} ET
          </p>
        </div>
        <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
          <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
            Edit
          </p>
          <p className="text-lg font-bold">{schedule.editingDay}s</p>
          <p className="text-sm text-[var(--color-text-muted)]">
            Process + review
          </p>
        </div>
        <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
          <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
            Publish
          </p>
          <p className="text-lg font-bold">{schedule.publishDay}s</p>
          <p className="text-sm text-[var(--color-text-muted)]">
            Upload + go live
          </p>
        </div>
        <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
          <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
            Promote
          </p>
          <p className="text-lg font-bold">{schedule.socialPostDay}s</p>
          <p className="text-sm text-[var(--color-text-muted)]">
            LinkedIn + shorts
          </p>
        </div>
      </div>

      {/* Next Up */}
      {nextUp && (
        <div className="mb-8 p-6 rounded-xl border-2 border-[var(--color-accent)] bg-[var(--color-bg-card)]">
          <p className="text-xs text-[var(--color-accent-light)] uppercase tracking-wide font-bold mb-2">
            Next Up
          </p>
          <h3 className="text-xl font-bold mb-1">
            Episode {nextUp.number}: {nextUp.title}
          </h3>
          <p className="text-[var(--color-text-muted)]">
            Record: {formatDate(nextUp.recordDate)} &middot; Edit:{" "}
            {formatDate(nextUp.editDate)} &middot; Publish:{" "}
            {formatDate(nextUp.publishDate)}
          </p>
          {nextUp.notes && (
            <p className="text-sm text-[var(--color-text-muted)] mt-2 italic">
              {nextUp.notes}
            </p>
          )}
          <div className="mt-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${statusColors[nextUp.status]}`}
            >
              {statusLabels[nextUp.status]}
            </span>
          </div>
        </div>
      )}

      {/* Status Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {(Object.keys(statusLabels) as Status[]).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full border-2 ${statusColors[s]}`}
            />
            <span className="text-xs text-[var(--color-text-muted)]">
              {statusLabels[s]}
            </span>
          </div>
        ))}
      </div>

      {/* Episode Timeline */}
      <div className="space-y-3">
        {episodes.map((ep) => {
          const status = ep.status;
          const recordSoon = isUpcoming(ep.recordDate);
          return (
            <div
              key={ep.number}
              className={`p-4 rounded-xl border bg-[var(--color-bg-card)] transition-all ${
                recordSoon
                  ? "border-[var(--color-accent)]/50 ring-1 ring-[var(--color-accent)]/20"
                  : "border-[var(--color-border)]"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                {/* Episode info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center">
                    <span className="text-xs font-bold text-[var(--color-text-muted)]">
                      {String(ep.number).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold truncate">{ep.title}</h3>
                    {ep.notes && (
                      <p className="text-xs text-[var(--color-text-muted)] truncate">
                        {ep.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] flex-shrink-0">
                  <div className="text-center w-16">
                    <p className="uppercase tracking-wide text-[10px] mb-0.5">
                      Record
                    </p>
                    <p
                      className={
                        recordSoon
                          ? "text-[var(--color-accent-light)] font-bold"
                          : ""
                      }
                    >
                      {formatDate(ep.recordDate)}
                    </p>
                  </div>
                  <div className="text-center w-16">
                    <p className="uppercase tracking-wide text-[10px] mb-0.5">
                      Edit
                    </p>
                    <p>{formatDate(ep.editDate)}</p>
                  </div>
                  <div className="text-center w-16">
                    <p className="uppercase tracking-wide text-[10px] mb-0.5">
                      Publish
                    </p>
                    <p>{formatDate(ep.publishDate)}</p>
                  </div>
                </div>

                {/* Status badge */}
                <div className="flex-shrink-0">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium ${statusColors[status]}`}
                  >
                    {statusLabels[status]}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Checklist */}
      <div className="mt-12 p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <h2 className="text-xl font-bold mb-4">Weekly Checklist</h2>
        <div className="grid md:grid-cols-2 gap-6 text-[var(--color-text-muted)]">
          <div>
            <h3 className="text-sm font-bold text-[var(--color-text)] mb-3 uppercase tracking-wide">
              Pre-Recording ({schedule.recordingDay})
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Review episode outline / talking points</li>
              <li>Check Riverside.fm setup (mic, levels, recording mode)</li>
              <li>Clear schedule — block 30 min for recording</li>
              <li>Water, quiet room, phone on silent</li>
              <li>Quick voice warmup (2 min)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--color-text)] mb-3 uppercase tracking-wide">
              Post-Recording ({schedule.editingDay})
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Download WAV from Riverside.fm</li>
              <li>
                Run audio processing script (
                <code className="text-xs bg-[var(--color-bg)] px-1 rounded">
                  scripts/audio/process-episode.sh
                </code>
                )
              </li>
              <li>Listen through — flag any sections to cut</li>
              <li>Extract 1-2 clips for shorts</li>
              <li>Write show notes</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--color-text)] mb-3 uppercase tracking-wide">
              Publish Day ({schedule.publishDay})
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Upload MP3 to Spotify via Spotify for Podcasters</li>
              <li>Set episode title, description, tags</li>
              <li>Push to GitHub (triggers site deploy)</li>
              <li>Verify episode appears on Spotify</li>
              <li>Generate cover art and social card</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--color-text)] mb-3 uppercase tracking-wide">
              Promote ({schedule.socialPostDay})
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Post episode promotion on LinkedIn</li>
              <li>Create audiogram or short video clip</li>
              <li>Upload short to YouTube Shorts / Instagram Reels</li>
              <li>Engage with comments throughout the day</li>
              <li>Update calendar status</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
