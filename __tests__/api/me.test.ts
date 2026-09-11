/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";

jest.mock("@/lib/db", () => ({
  findUserById: jest.fn(),
  toPublicUser: jest.fn((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  })),
}));

import { GET } from "@/app/api/auth/me/route";
import { findUserById } from "@/lib/db";
import { signToken } from "@/lib/auth";

const mockFindUserById = findUserById as jest.Mock;

function getRequest(cookieHeader?: string) {
  return new NextRequest("http://localhost/api/auth/me", {
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GET /api/auth/me", () => {
  it("returns null when there is no cookie", async () => {
    const res = await GET(getRequest());
    expect(res.status).toBe(200);
    expect((await res.json()).user).toBeNull();
    expect(mockFindUserById).not.toHaveBeenCalled();
  });

  it("returns null for an invalid/tampered token", async () => {
    const res = await GET(getRequest("token=not-a-real-token"));
    expect((await res.json()).user).toBeNull();
  });

  it("returns the user for a valid token", async () => {
    const token = signToken({ sub: "user_123", email: "jane@example.com", role: "brand" });
    mockFindUserById.mockReturnValue({
      id: "user_123",
      name: "Jane Doe",
      email: "jane@example.com",
      role: "brand",
    });

    const res = await GET(getRequest(`token=${token}`));
    const body = await res.json();
    expect(body.user).toEqual({
      id: "user_123",
      name: "Jane Doe",
      email: "jane@example.com",
      role: "brand",
    });
  });

  it("returns null when the token is valid but the user no longer exists", async () => {
    const token = signToken({ sub: "deleted-user", email: "gone@example.com", role: "brand" });
    mockFindUserById.mockReturnValue(undefined);

    const res = await GET(getRequest(`token=${token}`));
    expect((await res.json()).user).toBeNull();
  });
});
