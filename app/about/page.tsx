export const metadata = {
  title: "About — Rebuilding a Broken Man",
  description:
    "About John Sobetsky and the Rebuilding a Broken Man podcast.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">About</h1>

      <div className="space-y-6 text-[var(--color-text-muted)] leading-relaxed">
        <p className="text-lg text-[var(--color-text)]">
          I&apos;m John Sobetsky. I own Main Line Security Solutions — an electronic
          security company that provides alarm systems, cameras, access control,
          and monitoring to businesses and homes across the country.
        </p>

        <p>
          On paper, I&apos;m the guy who&apos;s got it figured out. Business owner.
          Problem solver. The person people call when they need something
          protected. But the truth is, I spent years protecting everyone and
          everything except myself.
        </p>

        <p>
          Life fell apart in ways I didn&apos;t see coming — or maybe ways I refused
          to see coming. Personal failures, broken relationships, and a growing
          gap between who I pretended to be and who I actually was. I hit a point
          where I had to either keep pretending or start over.
        </p>

        <p>I chose to start over.</p>

        <div className="border-t border-[var(--color-border)] my-10" />

        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
          Why This Podcast
        </h2>

        <p>
          Men don&apos;t talk about this stuff. Not honestly. We talk about business
          wins and workouts and surface-level goals. We don&apos;t talk about the
          nights where nothing makes sense, or the fear that we&apos;ve broken
          something beyond repair, or the shame of admitting we need help.
        </p>

        <p>
          I started recording because I realized the conversations that helped me
          most were the ones nobody was having publicly. The raw, uncomfortable
          ones. The ones where you admit you don&apos;t have it figured out.
        </p>

        <p>
          This podcast isn&apos;t a comeback story. I&apos;m not on the other side
          of anything. I&apos;m in it. And maybe that&apos;s the value — hearing
          from someone who&apos;s actively rebuilding, not someone who already has
          it polished and packaged.
        </p>

        <div className="border-t border-[var(--color-border)] my-10" />

        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
          What to Expect
        </h2>

        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-[var(--color-accent-light)] font-bold">~10 min</span>
            <span>episodes — enough to say something real without wasting your time</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--color-accent-light)] font-bold">Solo</span>
            <span>format — just me and a microphone. No guests, no interviews (for now)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--color-accent-light)] font-bold">Weekly</span>
            <span>releases — new episode every Monday</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--color-accent-light)] font-bold">Honest</span>
            <span>— no motivational platitudes. Specific, personal, real.</span>
          </li>
        </ul>

        <div className="border-t border-[var(--color-border)] my-10" />

        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
          Connect
        </h2>

        <p>
          Find me on{" "}
          <a
            href="https://linkedin.com/in/johnsobetsky"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent-light)] hover:underline"
          >
            LinkedIn
          </a>
          . If something I said on the show resonated, I&apos;d genuinely love to
          hear about it. Send me a message. I read every one.
        </p>

        <p className="text-sm">
          Business inquiries:{" "}
          <a
            href="mailto:johns@mainlinesecure.com"
            className="text-[var(--color-accent-light)] hover:underline"
          >
            johns@mainlinesecure.com
          </a>
        </p>
      </div>
    </div>
  );
}
