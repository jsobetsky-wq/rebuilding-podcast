import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-20">
      <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} Rebuilding a Broken Man. All rights
          reserved.
        </p>
        <div className="flex gap-6 text-sm text-[var(--color-text-muted)]">
          <Link
            href="https://linkedin.com/in/johnsobetsky"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-text)] transition-colors"
          >
            LinkedIn
          </Link>
          <Link
            href="/api/feed"
            className="hover:text-[var(--color-text)] transition-colors"
          >
            RSS Feed
          </Link>
        </div>
      </div>
    </footer>
  );
}
