export const metadata = {
  title: "Resources — Rebuilding a Broken Man",
  description: "Tools, scripts, and resources for podcast production.",
};

const audioScripts = [
  {
    file: "scripts/audio/process-episode.sh",
    description:
      "Main episode processor — normalizes audio, applies compression, removes silence, outputs final MP3.",
  },
  {
    file: "scripts/audio/create-clip.sh",
    description:
      "Extract a clip from an episode by start/end time. Outputs clip with fade in/out.",
  },
  {
    file: "scripts/audio/batch-normalize.sh",
    description:
      "Batch normalize multiple audio files to consistent loudness levels.",
  },
];

const videoScripts = [
  {
    file: "scripts/video/create-short.sh",
    description:
      "Create a vertical short (9:16) from an audio clip with waveform visualization.",
  },
  {
    file: "scripts/video/create-audiogram.sh",
    description:
      "Generate an audiogram video with waveform animation for social media.",
  },
  {
    file: "scripts/video/add-subtitles.sh",
    description:
      "Burn subtitles into a video from an SRT file.",
  },
];

const graphicsTemplates = [
  {
    file: "scripts/graphics/generate-episode-cover.html",
    description:
      "HTML template for generating per-episode cover art. Open in browser, screenshot at 3000x3000.",
  },
  {
    file: "scripts/graphics/generate-podcast-cover.html",
    description:
      "Main podcast cover art template for Spotify/Apple.",
  },
  {
    file: "scripts/graphics/generate-social-card.html",
    description:
      "Social card template for LinkedIn/Twitter sharing.",
  },
  {
    file: "scripts/graphics/generate-youtube-thumbnail.html",
    description:
      "YouTube thumbnail template (1280x720).",
  },
];

const planningDocs = [
  {
    file: "planning/episode-topics.md",
    description: "Master list of episode topics for Season 1.",
  },
  {
    file: "planning/episode-1-outline.md",
    description: "Detailed outline for the first episode.",
  },
  {
    file: "planning/production-workflow.md",
    description: "End-to-end production workflow documentation.",
  },
  {
    file: "planning/linkedin-strategy.md",
    description: "LinkedIn content strategy and posting cadence.",
  },
  {
    file: "planning/intro-outro-scripts.md",
    description: "Standard intro and outro scripts.",
  },
  {
    file: "planning/show-notes-template.md",
    description: "Template for writing episode show notes.",
  },
  {
    file: "planning/tools-setup.md",
    description: "Software tools setup guide (Riverside, ffmpeg, etc.).",
  },
];

const quickReference = [
  {
    label: "Spotify Audio Specs",
    details: "MP3, 128-320kbps, 44.1kHz, stereo or mono. Loudness: -14 LUFS.",
  },
  {
    label: "Episode Cover Art",
    details: "3000x3000 px, JPEG or PNG, under 512KB, RGB color.",
  },
  {
    label: "LinkedIn Post Limits",
    details:
      "3000 characters max. Images: 1200x627 px. Video: up to 10 min, under 5GB.",
  },
  {
    label: "YouTube Shorts",
    details: "Vertical 9:16, up to 60 seconds, 1080x1920 px.",
  },
  {
    label: "Instagram Reels",
    details: "Vertical 9:16, up to 90 seconds, 1080x1920 px.",
  },
  {
    label: "Recommended Export",
    details:
      "Audio: WAV 48kHz for recording, MP3 320kbps for distribution. Video: H.264, AAC audio.",
  },
];

function FileList({
  items,
}: {
  items: { file: string; description: string }[];
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.file}
          className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]"
        >
          <code className="text-xs text-[var(--color-accent-light)] block mb-1">
            {item.file}
          </code>
          <p className="text-sm text-[var(--color-text-muted)]">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-1">Resources</h1>
      <p className="text-[var(--color-text-muted)] mb-10">
        Scripts, templates, planning docs, and quick reference for production.
      </p>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Audio Scripts */}
        <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
          <h2 className="text-lg font-bold mb-4">Audio Scripts</h2>
          <FileList items={audioScripts} />
        </div>

        {/* Video Scripts */}
        <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
          <h2 className="text-lg font-bold mb-4">Video Scripts</h2>
          <FileList items={videoScripts} />
        </div>

        {/* Graphics Templates */}
        <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
          <h2 className="text-lg font-bold mb-4">Graphics Templates</h2>
          <FileList items={graphicsTemplates} />
        </div>

        {/* Planning Docs */}
        <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
          <h2 className="text-lg font-bold mb-4">Planning Docs</h2>
          <FileList items={planningDocs} />
        </div>
      </div>

      {/* Quick Reference */}
      <div className="mt-8 p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <h2 className="text-lg font-bold mb-4">Quick Reference</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {quickReference.map((ref) => (
            <div
              key={ref.label}
              className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]"
            >
              <p className="text-sm font-medium mb-1">{ref.label}</p>
              <p className="text-xs text-[var(--color-text-muted)]">
                {ref.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
