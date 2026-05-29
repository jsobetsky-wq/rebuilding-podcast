"use client";

import { useState } from "react";

type TemplateType = "Episode Promotion" | "Micro-Lesson" | "Behind the Scenes";

const templates: Record<TemplateType, string> = {
  "Episode Promotion": `New episode of Rebuilding a Broken Man is live.

Episode [#]: "[Title]"

[2-3 sentences about what this episode covers and why it matters]

The conversations men don't have but desperately need to.

Listen now on Spotify: [link]

#RebuildingABrokenMan #Podcast #PersonalGrowth #MentalHealth`,

  "Micro-Lesson": `Something I learned this week while rebuilding my life:

[Key insight or lesson — 2-3 sentences, specific and personal]

[Why this matters or how it changed your perspective]

This is what I talk about on Rebuilding a Broken Man — the real stuff, not the polished version.

#PersonalGrowth #Lessons #Vulnerability`,

  "Behind the Scenes": `Behind the scenes of recording Episode [#] of Rebuilding a Broken Man.

[What was different about this recording — what you struggled with, what surprised you]

[1-2 sentences about why you keep doing this]

New episode drops [day]. Link in comments.

#BehindTheScenes #Podcast #RebuildingABrokenMan`,
};

interface DraftPost {
  id: number;
  template: TemplateType;
  content: string;
  episodeRef: string;
  created: string;
}

const episodes = [
  { slug: "the-beginning", title: "Episode 1: The Beginning" },
  { slug: "the-mask-we-wear", title: "Episode 2: The Mask We Wear" },
  {
    slug: "rock-bottom-is-a-foundation",
    title: "Episode 3: Rock Bottom Is a Foundation",
  },
];

export default function LinkedInPage() {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateType>("Episode Promotion");
  const [content, setContent] = useState(templates["Episode Promotion"]);
  const [episodeRef, setEpisodeRef] = useState(episodes[0].slug);
  const [drafts, setDrafts] = useState<DraftPost[]>([]);

  const handleTemplateChange = (template: TemplateType) => {
    setSelectedTemplate(template);
    setContent(templates[template]);
  };

  const handleSaveDraft = () => {
    if (!content.trim()) return;
    const ep = episodes.find((e) => e.slug === episodeRef);
    const draft: DraftPost = {
      id: Date.now(),
      template: selectedTemplate,
      content,
      episodeRef: ep?.title || "",
      created: new Date().toLocaleDateString(),
    };
    setDrafts((prev) => [draft, ...prev]);
  };

  const charCount = content.length;
  const isOverLimit = charCount > 3000;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-1">LinkedIn Drafts</h1>
      <p className="text-[var(--color-text-muted)] mb-8">
        Draft and preview LinkedIn posts for episode promotion.
      </p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Template Selector */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(templates) as TemplateType[]).map((t) => (
              <button
                key={t}
                onClick={() => handleTemplateChange(t)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  selectedTemplate === t
                    ? "border-[var(--color-accent)] text-[var(--color-accent-light)] bg-[var(--color-accent)]/10"
                    : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Episode Reference */}
          <div>
            <label className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
              Related Episode
            </label>
            <select
              value={episodeRef}
              onChange={(e) => setEpisodeRef(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:border-[var(--color-accent)] focus:outline-none transition-colors"
            >
              {episodes.map((ep) => (
                <option key={ep.slug} value={ep.slug}>
                  {ep.title}
                </option>
              ))}
            </select>
          </div>

          {/* Post Editor */}
          <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Post Content</h2>
              <span
                className={`text-xs font-medium ${
                  isOverLimit ? "text-red-400" : "text-[var(--color-text-muted)]"
                }`}
              >
                {charCount} / 3000
              </span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-y font-mono"
            />
            {isOverLimit && (
              <p className="text-xs text-red-400 mt-1">
                Post exceeds LinkedIn's 3000 character limit.
              </p>
            )}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSaveDraft}
                className="px-4 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white font-medium rounded-lg transition-colors text-sm"
              >
                Save Draft
              </button>
              <button
                onClick={() => setContent("")}
                className="px-4 py-2.5 border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] rounded-lg transition-colors text-sm"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <h2 className="text-lg font-bold mb-4">Preview</h2>
            <div className="p-4 rounded-xl bg-white text-gray-900 max-w-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                  JS
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    John Sobetsky
                  </p>
                  <p className="text-xs text-gray-500">
                    Client Solutions Manager at Main Line Security Solutions
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                {content || (
                  <span className="text-gray-400 italic">
                    Start typing to see preview...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Draft History */}
        <div>
          <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <h2 className="text-lg font-bold mb-4">Saved Drafts</h2>
            {drafts.length === 0 ? (
              <p className="text-sm text-[var(--color-text-muted)] py-8 text-center">
                No drafts saved yet. Write a post and click Save Draft.
              </p>
            ) : (
              <div className="space-y-3">
                {drafts.map((draft) => (
                  <div
                    key={draft.id}
                    className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[var(--color-accent-light)]">
                        {draft.template}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {draft.created}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] mb-2">
                      {draft.episodeRef}
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)] line-clamp-3">
                      {draft.content}
                    </p>
                    <button
                      onClick={() => {
                        setContent(draft.content);
                        setSelectedTemplate(draft.template);
                      }}
                      className="text-xs text-[var(--color-accent-light)] hover:underline mt-2"
                    >
                      Load into editor
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Best Practices */}
          <div className="mt-6 p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--color-text-muted)] mb-3">
              LinkedIn Best Practices
            </h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>Lead with a hook in the first 2 lines</li>
              <li>Use line breaks for readability</li>
              <li>Keep posts under 1300 chars for full visibility</li>
              <li>Include 3-5 relevant hashtags at the end</li>
              <li>Post between 7-9 AM ET for best reach</li>
              <li>Add Spotify link in first comment, not in post</li>
              <li>Tag relevant people if applicable</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
