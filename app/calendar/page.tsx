import calendarData from "@/content/calendar.json";

export const metadata = {
  title: "Calendar — Rebuilding a Broken Man",
  description: "Production calendar and recording schedule.",
};

type Status = "planned" | "recorded" | "edited" | "published";

const statusColors: Record<Status, string> = {
  planned: "border-[var(--color-border)] text-[var(--color-text-muted)]",
  recorded: "border-yellow-700 text-yellow-500",
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
  const { schedule, episodes } = calendarData;
  const today = new Date().toISOString().slice(0, 10);

  const nextUp = episodes.find(
    (ep) => ep.status !== "published" && ep.recordDate >= today
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-2">Production Calendar</h1>
      <p className="text-[var(--color-text-muted)] mb-10">
        Recording schedule, deadlines, and accountability tracker.
      </p>

      {/* Weekly Rhythm */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
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
        <div className="mb-12 p-6 rounded-xl border-2 border-[var(--color-accent)] bg-[var(--color-bg-card)]">
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
          const status = ep.status as Status;
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
                        recordSoon ? "text-[var(--color-accent-light)] font-bold" : ""
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

      {/* Accountability */}
      <div className="mt-16 p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
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
              <li>Listen through — flag any sections to re-record or cut</li>
              <li>Extract 1-2 clips for shorts</li>
              <li>Write show notes + update episode JSON</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--color-text)] mb-3 uppercase tracking-wide">
              Publish Day ({schedule.publishDay})
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Upload MP3 to podcast host / CDN</li>
              <li>Update episode JSON with audioUrl</li>
              <li>Push to GitHub (triggers site deploy)</li>
              <li>Verify RSS feed and episode page</li>
              <li>Generate + post cover art and social card</li>
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
              <li>Update calendar status to &quot;published&quot;</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
