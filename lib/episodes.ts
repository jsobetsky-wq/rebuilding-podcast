import fs from "fs";
import path from "path";

export interface Episode {
  number: number;
  slug: string;
  title: string;
  description: string;
  duration: string;
  publishDate: string;
  audioUrl: string;
  tags: string[];
  showNotes: string;
}

const episodesDir = path.join(process.cwd(), "content", "episodes");

export function getAllEpisodes(): Episode[] {
  const files = fs.readdirSync(episodesDir).filter((f) => f.endsWith(".json"));
  const episodes = files.map((file) => {
    const raw = fs.readFileSync(path.join(episodesDir, file), "utf-8");
    return JSON.parse(raw) as Episode;
  });
  return episodes.sort((a, b) => b.number - a.number);
}

export function getEpisodeBySlug(slug: string): Episode | undefined {
  const episodes = getAllEpisodes();
  return episodes.find((ep) => ep.slug === slug);
}

export function getPublishedEpisodes(): Episode[] {
  const today = new Date().toISOString().slice(0, 10);
  return getAllEpisodes().filter(
    (ep) => ep.publishDate && ep.publishDate <= today
  );
}
