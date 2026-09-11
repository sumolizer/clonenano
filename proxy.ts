import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

// Coarse gate: just checks the cookie exists, so it can run without Node-only
// crypto. Actual JWT verification happens server-side wherever the user is
// used (e.g. /api/auth/me) — an invalid/expired cookie ends up looking
// "logged out" there and DashboardShell redirects to /login client-side.
export function proxy(request: NextRequest) {
  const hasToken = Boolean(request.cookies.get(AUTH_COOKIE_NAME)?.value);

  if (!hasToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
