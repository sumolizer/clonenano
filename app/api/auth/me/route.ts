import { NextRequest, NextResponse } from "next/server";
import { verifyToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { findUserById, toPublicUser } from "@/lib/db";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ user: null });
  }

  try {
    const user = await findUserById(payload.sub);
    if (!user) {
      return NextResponse.json({ user: null });
    }
    return NextResponse.json({ user: toPublicUser(user) });
  } catch (err) {
    // This just backs the nav's "am I logged in" check — fail soft (looks
    // logged out) rather than breaking every page render, but still log so
    // a real storage outage shows up in the Vercel function logs.
    console.error("GET /api/auth/me failed:", err);
    return NextResponse.json({ user: null });
  }
}
