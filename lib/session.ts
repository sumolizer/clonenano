import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

/**
 * Cookie-presence check only (no JWT verification) — cheap enough to call
 * from Server Components just to decide which link a CTA should point at.
 * Never use this to gate access to real data; that goes through
 * verifyToken()/lib/db instead (see /api/auth/me and proxy.ts).
 */
export async function hasSessionCookie(): Promise<boolean> {
  const store = await cookies();
  return Boolean(store.get(AUTH_COOKIE_NAME)?.value);
}
