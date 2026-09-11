import { NextRequest, NextResponse } from "next/server";
import { createUser, findUserByEmail, toPublicUser } from "@/lib/db";
import { hashPassword, signToken, AUTH_COOKIE_NAME, type Role } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, email, password, role } = body as {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
  };

  if (!name || !email || !password || !role) {
    return NextResponse.json(
      { error: "name, email, password and role are required" },
      { status: 400 }
    );
  }
  if (role !== "brand" && role !== "creator") {
    return NextResponse.json({ error: "role must be 'brand' or 'creator'" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 }
    );
  }

  if (await findUserByEmail(email)) {
    return NextResponse.json(
      { error: "An account with this email already exists" },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);
  const user = await createUser({ name, email, passwordHash, role: role as Role });
  const token = signToken({ sub: user.id, email: user.email, role: user.role });

  const response = NextResponse.json({ user: toPublicUser(user) }, { status: 201 });
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
