import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllEpisodes, getEpisodeBySlug } from "@/lib/episodes";

export function generateStaticParams() {
  return getAllEpisodes().map((ep) => ({ slug: ep.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const episode = getEpisodeBySlug(slug);
    if (!episode) return { title: "Episode Not Found" };
    return {
      title: `${episode.title} — Rebuilding a Broken Man`,
      description: episode.description,
    };
  });
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) notFound();

  const showNotesHtml = episode.showNotes
    .split("\n")
    .map((line) => {
      if (line.startsWith("**") && line.endsWith("**"))
        return `<h3 class="text-lg font-bold mt-6 mb-2 text-[var(--color-text)]">${line.slice(2, -2)}</h3>`;
      if (line.startsWith("- "))
        return `<li class="ml-4 text-[var(--color-text-muted)]">${line.slice(2)}</li>`;
      if (line.trim() === "") return "<br/>";
      return `<p class="text-[var(--color-text-muted)] leading-relaxed mb-2">${line}</p>`;
    })
    .join("");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/episodes"
        className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-8 inline-block"
      >
        &larr; All episodes
      </Link>

      <div className="mb-4">
        <p className="text-sm text-[var(--color-accent-light)] font-medium">
          Episode {episode.number}
          {episode.duration && ` · ${episode.duration}`}
        </p>
      </div>
      <h1 className="text-4xl font-bold mb-4">{episode.title}</h1>
      <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-8">
        {episode.description}
      </p>

      {episode.publishDate && (
        <p className="text-sm text-[var(--color-text-muted)] mb-8">
          Published{" "}
          {new Date(episode.publishDate + "T12:00:00").toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}

      {episode.audioUrl && (
        <div className="mb-10 p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
          <audio controls className="w-full" preload="none">
            <source src={episode.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {!episode.audioUrl && (
        <div className="mb-10 p-6 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-center">
          <p className="text-[var(--color-text-muted)]">
            Audio coming soon. Subscribe to get notified.
          </p>
        </div>
      )}

      <div className="border-t border-[var(--color-border)] pt-8">
        <h2 className="text-xl font-bold mb-4">Show Notes</h2>
        <div dangerouslySetInnerHTML={{ __html: showNotesHtml }} />
      </div>

      {episode.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {episode.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
