import { NextRequest, NextResponse } from "next/server";

function hashPassword(pw: string): string {
  let hash = 0;
  for (let i = 0; i < pw.length; i++) {
    const char = pw.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return "rabm_" + Math.abs(hash).toString(36);
}

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const correctPassword = process.env.SITE_PASSWORD;

  if (!correctPassword || password !== correctPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  // Set auth cookie — expires in 30 days
  response.cookies.set("site_auth", hashPassword(correctPassword), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  return response;
}
