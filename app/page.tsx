import Link from "next/link";
import { getPublishedEpisodes } from "@/lib/episodes";

function SubscribeButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-5 py-2.5 border border-[var(--color-border)] rounded-lg text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-all"
    >
      {label}
    </a>
  );
}

export default function Home() {
  const episodes = getPublishedEpisodes();
  const latestEpisode = episodes[0];

  return (
    <div>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16">
        <p className="text-[var(--color-accent-light)] text-sm font-medium tracking-widest uppercase mb-4">
          A Podcast
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          Rebuilding
          <br />
          <span className="text-[var(--color-text-muted)]">a Broken Man</span>
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl leading-relaxed mb-10">
          Raw, honest conversations about what it actually takes to put yourself
          back together. No filters, no quick fixes — just the truth about
          rebuilding your life when everything falls apart.
        </p>
        <div className="flex flex-wrap gap-3">
          <SubscribeButton href="#" label="Apple Podcasts" />
          <SubscribeButton href="#" label="Spotify" />
          <SubscribeButton href="#" label="YouTube" />
          <SubscribeButton href="/api/feed" label="RSS" />
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-[var(--color-border)]" />
      </div>

      {/* About Preview */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">About the Show</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              I&apos;m John Sobetsky. I own an electronic security company called
              Main Line Security Solutions. I protect buildings, businesses, and
              people for a living. But I couldn&apos;t protect my own life from
              falling apart.
            </p>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
              This podcast is about what comes after. The rebuilding. The daily
              grind of getting better. The conversations men don&apos;t have but
              desperately need to.
            </p>
            <Link
              href="/about"
              className="text-[var(--color-accent-light)] text-sm font-medium hover:underline"
            >
              Read more &rarr;
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-64 h-64 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-[var(--color-accent)]">R</div>
                <div className="text-sm text-[var(--color-text-muted)] mt-2 tracking-widest">
                  PODCAST
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Episode */}
      {latestEpisode && (
        <>
          <div className="max-w-4xl mx-auto px-6">
            <div className="border-t border-[var(--color-border)]" />
          </div>
          <section className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-sm font-medium text-[var(--color-accent-light)] tracking-widest uppercase mb-6">
              Latest Episode
            </h2>
            <Link
              href={`/episodes/${latestEpisode.slug}`}
              className="block group"
            >
              <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-accent)]/50 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[var(--color-text-muted)] text-sm mb-1">
                      Episode {latestEpisode.number}
                      {latestEpisode.duration && ` · ${latestEpisode.duration}`}
                    </p>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-accent-light)] transition-colors">
                      {latestEpisode.title}
                    </h3>
                    <p className="text-[var(--color-text-muted)] leading-relaxed">
                      {latestEpisode.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="text-center py-16 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
          <h2 className="text-2xl font-bold mb-3">New episodes weekly</h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            Subscribe wherever you listen to podcasts.
          </p>
          <Link
            href="/episodes"
            className="inline-flex items-center px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white font-medium rounded-lg transition-colors"
          >
            All Episodes
          </Link>
        </div>
      </section>
    </div>
  );
}
