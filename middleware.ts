import { NextRequest, NextResponse } from "next/server";

/**
 * Password protection middleware.
 * Set SITE_PASSWORD env var to enable. If not set, site is open.
 * Auth is stored in a cookie so you only log in once per browser session.
 */
export function middleware(request: NextRequest) {
  const password = process.env.SITE_PASSWORD;

  // No password configured → site is open
  if (!password) return NextResponse.next();

  // Skip the login page and API routes for auth
  if (
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get("site_auth");
  if (authCookie?.value === hashPassword(password)) {
    return NextResponse.next();
  }

  // Redirect to login
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

function hashPassword(pw: string): string {
  // Simple hash for cookie comparison — not for storing credentials
  let hash = 0;
  for (let i = 0; i < pw.length; i++) {
    const char = pw.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return "rabm_" + Math.abs(hash).toString(36);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files
     */
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
