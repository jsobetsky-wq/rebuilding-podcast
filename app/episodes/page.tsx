import Link from "next/link";
import { getAllEpisodes } from "@/lib/episodes";

export const metadata = {
  title: "Episodes — Rebuilding a Broken Man",
  description: "All episodes of the Rebuilding a Broken Man podcast.",
};

export default function EpisodesPage() {
  const episodes = getAllEpisodes();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-2">Episodes</h1>
      <p className="text-[var(--color-text-muted)] mb-12">
        Every episode, from the beginning.
      </p>

      {episodes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[var(--color-text-muted)] text-lg">
            First episode coming soon.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {episodes.map((ep) => (
            <Link
              key={ep.slug}
              href={`/episodes/${ep.slug}`}
              className="block group"
            >
              <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-accent)]/50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center">
                    <span className="text-sm font-bold text-[var(--color-text-muted)]">
                      {String(ep.number).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-lg font-bold group-hover:text-[var(--color-accent-light)] transition-colors">
                        {ep.title}
                      </h2>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] mb-2">
                      {ep.publishDate && (
                        <span>
                          {new Date(ep.publishDate + "T12:00:00").toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      )}
                      {ep.duration && ep.publishDate && " · "}
                      {ep.duration && <span>{ep.duration}</span>}
                    </p>
                    <p className="text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
                      {ep.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
