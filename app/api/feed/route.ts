import { NextResponse } from "next/server";

// RSS feed removed — podcast is distributed via Spotify.
// This route redirects to the Spotify show page.
export async function GET() {
  return NextResponse.redirect(
    "https://open.spotify.com/show/033oaVWEUMuw9DQsPk1eFA"
  );
}
