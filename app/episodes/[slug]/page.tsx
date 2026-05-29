"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

type EpisodeStatus = "Draft" | "Recorded" | "Edited" | "Published";

interface EpisodeData {
  number: number;
  slug: string;
  title: string;
  description: string;
  status: EpisodeStatus;
  duration: string;
  tags: string;
  showNotes: string;
  spotifyUrl: string;
  clips: { title: string; start: string; end: string; platform: string }[];
  linkedinDraft: string;
  tweetDraft: string;
  checklist: Record<string, boolean>;
}

const episodesData: Record<string, EpisodeData> = {
  "the-beginning": {
    number: 1,
    slug: "the-beginning",
    title: "The Beginning",
    description:
      "The first episode. Why this podcast exists, what happened, and what comes next.",
    status: "Published",
    duration: "9:52",
    tags: "personal growth, vulnerability, starting over",
    showNotes:
      "In this episode I talk about why I decided to start this podcast. What brought me here, what fell apart, and why I think talking about it matters.\n\nThis is raw, unpolished, and real. No script, no guests — just me and a microphone figuring out how to say the things men don't usually say out loud.",
    spotifyUrl: "https://open.spotify.com/show/033oaVWEUMuw9DQsPk1eFA",
    clips: [],
    linkedinDraft: "",
    tweetDraft: "",
    checklist: {
      record: true,
      edit: true,
      uploadSpotify: true,
      writeDescription: true,
      createClips: false,
      postLinkedIn: false,
      postShorts: false,
    },
  },
  "the-mask-we-wear": {
    number: 2,
    slug: "the-mask-we-wear",
    title: "The Mask We Wear",
    description: "",
    status: "Draft",
    duration: "",
    tags: "",
    showNotes: "",
    spotifyUrl: "",
    clips: [],
    linkedinDraft: "",
    tweetDraft: "",
    checklist: {
      record: false,
      edit: false,
      uploadSpotify: false,
      writeDescription: false,
      createClips: false,
      postLinkedIn: false,
      postShorts: false,
    },
  },
  "rock-bottom-is-a-foundation": {
    number: 3,
    slug: "rock-bottom-is-a-foundation",
    title: "Rock Bottom Is a Foundation",
    description: "",
    status: "Draft",
    duration: "",
    tags: "",
    showNotes: "",
    spotifyUrl: "",
    clips: [],
    linkedinDraft: "",
    tweetDraft: "",
    checklist: {
      record: false,
      edit: false,
      uploadSpotify: false,
      writeDescription: false,
      createClips: false,
      postLinkedIn: false,
      postShorts: false,
    },
  },
};

const checklistLabels: Record<string, string> = {
  record: "Record",
  edit: "Edit",
  uploadSpotify: "Upload to Spotify",
  writeDescription: "Write Description",
  createClips: "Create Clips",
  postLinkedIn: "Post to LinkedIn",
  postShorts: "Post Shorts",
};

const statusOptions: EpisodeStatus[] = [
  "Draft",
  "Recorded",
  "Edited",
  "Published",
];

const statusColors: Record<EpisodeStatus, string> = {
  Draft: "border-[var(--color-border)] text-[var(--color-text-muted)]",
  Recorded: "border-orange-700 text-orange-400",
  Edited: "border-blue-700 text-blue-400",
  Published: "border-green-700 text-green-400",
};

export default function EpisodeWorkspace() {
  const params = useParams();
  const slug = params.slug as string;
  const initial = episodesData[slug];

  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [status, setStatus] = useState<EpisodeStatus>(
    initial?.status || "Draft"
  );
  const [tags, setTags] = useState(initial?.tags || "");
  const [showNotes, setShowNotes] = useState(initial?.showNotes || "");
  const [linkedinDraft, setLinkedinDraft] = useState(
    initial?.linkedinDraft || ""
  );
  const [tweetDraft, setTweetDraft] = useState(initial?.tweetDraft || "");
  const [checklist, setChecklist] = useState<Record<string, boolean>>(
    initial?.checklist || {}
  );

  if (!initial) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Episode not found</h1>
        <Link
          href="/episodes"
          className="text-[var(--color-accent-light)] hover:underline"
        >
          Back to Episodes
        </Link>
      </div>
    );
  }

  const toggleCheck = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const totalCount = Object.keys(checklist).length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/episodes"
          className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          &larr; Episodes
        </Link>
        <span className="text-[var(--color-text-muted)]">/</span>
        <span className="text-sm text-[var(--color-text-muted)]">
          Episode {initial.number}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content - Left 2 cols */}
        <div className="lg:col-span-2 space-y-8">
          {/* Metadata Form */}
          <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <h2 className="text-lg font-bold mb-4">Episode Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-y"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as EpisodeStatus)
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="comma separated"
                    className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Show Notes */}
          <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <h2 className="text-lg font-bold mb-4">Show Notes</h2>
            <textarea
              value={showNotes}
              onChange={(e) => setShowNotes(e.target.value)}
              rows={8}
              placeholder="Write show notes for this episode..."
              className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-y font-mono"
            />
          </div>

          {/* Clip Manager */}
          <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Clips</h2>
              <Link
                href="/clips"
                className="text-xs text-[var(--color-accent-light)] hover:underline"
              >
                Go to Clip Creator
              </Link>
            </div>
            {initial.clips.length === 0 ? (
              <p className="text-sm text-[var(--color-text-muted)] py-4 text-center">
                No clips created yet. Use the Clip Creator to make clips from
                this episode.
              </p>
            ) : (
              <div className="space-y-2">
                {initial.clips.map((clip, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]"
                  >
                    <div>
                      <p className="text-sm font-medium">{clip.title}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {clip.start} - {clip.end} / {clip.platform}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Social Posts */}
          <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <h2 className="text-lg font-bold mb-4">Social Posts</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
                  LinkedIn Post Draft
                </label>
                <textarea
                  value={linkedinDraft}
                  onChange={(e) => setLinkedinDraft(e.target.value)}
                  rows={4}
                  placeholder="Draft your LinkedIn post for this episode..."
                  className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-y"
                />
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  {linkedinDraft.length} / 3000 characters
                </p>
              </div>
              <div>
                <label className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
                  Tweet Draft
                </label>
                <textarea
                  value={tweetDraft}
                  onChange={(e) => setTweetDraft(e.target.value)}
                  rows={3}
                  placeholder="Draft a tweet for this episode..."
                  className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-y"
                />
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  {tweetDraft.length} / 280 characters
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Right col */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
                Status
              </h3>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${statusColors[status]}`}
              >
                {status}
              </span>
            </div>
            {initial.duration && (
              <p className="text-sm text-[var(--color-text-muted)]">
                Duration: {initial.duration}
              </p>
            )}
            {initial.spotifyUrl && (
              <a
                href={initial.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                View on Spotify
              </a>
            )}
          </div>

          {/* Production Checklist */}
          <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
                Checklist
              </h3>
              <span className="text-xs text-[var(--color-text-muted)]">
                {completedCount}/{totalCount}
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[var(--color-bg)] rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-[var(--color-accent)] rounded-full transition-all"
                style={{
                  width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
                }}
              />
            </div>
            <div className="space-y-2">
              {Object.entries(checklistLabels).map(([key, label]) => (
                <label
                  key={key}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={checklist[key] || false}
                    onChange={() => toggleCheck(key)}
                    className="w-4 h-4 rounded border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-accent)] focus:ring-[var(--color-accent)] focus:ring-offset-0"
                  />
                  <span
                    className={`text-sm transition-colors ${
                      checklist[key]
                        ? "text-[var(--color-text-muted)] line-through"
                        : "text-[var(--color-text)] group-hover:text-[var(--color-accent-light)]"
                    }`}
                  >
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
