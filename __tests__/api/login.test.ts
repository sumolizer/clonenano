/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";

jest.mock("@/lib/db", () => ({
  findUserByEmail: jest.fn(),
  toPublicUser: jest.fn((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  })),
}));

import { POST } from "@/app/api/auth/login/route";
import { findUserByEmail } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

const mockFindUserByEmail = findUserByEmail as jest.Mock;

function postRequest(body: unknown) {
  return new NextRequest("http://localhost/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("POST /api/auth/login", () => {
  it("logs in with correct credentials and sets a JWT cookie", async () => {
    const passwordHash = await hashPassword("correcthorsebattery");
    mockFindUserByEmail.mockReturnValue({
      id: "user_123",
      name: "Jane Doe",
      email: "jane@example.com",
      passwordHash,
      role: "brand",
    });

    const res = await POST(postRequest({ email: "jane@example.com", password: "correcthorsebattery" }));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.user).toEqual({
      id: "user_123",
      name: "Jane Doe",
      email: "jane@example.com",
      role: "brand",
    });

    const cookie = res.cookies.get("token");
    expect(cookie).toBeDefined();
    expect(cookie?.httpOnly).toBe(true);
  });

  it("rejects a wrong password with 401 and no cookie", async () => {
    const passwordHash = await hashPassword("correcthorsebattery");
    mockFindUserByEmail.mockReturnValue({
      id: "user_123",
      name: "Jane Doe",
      email: "jane@example.com",
      passwordHash,
      role: "brand",
    });

    const res = await POST(postRequest({ email: "jane@example.com", password: "wrongpassword" }));

    expect(res.status).toBe(401);
    expect(res.cookies.get("token")).toBeUndefined();
  });

  it("rejects a nonexistent email with 401", async () => {
    mockFindUserByEmail.mockReturnValue(undefined);

    const res = await POST(postRequest({ email: "nobody@example.com", password: "whatever123" }));

    expect(res.status).toBe(401);
  });

  it("rejects a missing email or password with 400", async () => {
    const res1 = await POST(postRequest({ password: "whatever123" }));
    expect(res1.status).toBe(400);

    const res2 = await POST(postRequest({ email: "jane@example.com" }));
    expect(res2.status).toBe(400);
  });

  it("does not leak whether the failure was a bad email or bad password", async () => {
    mockFindUserByEmail.mockReturnValue(undefined);
    const resNoUser = await POST(postRequest({ email: "nobody@example.com", password: "whatever123" }));
    const bodyNoUser = await resNoUser.json();

    const passwordHash = await hashPassword("correcthorsebattery");
    mockFindUserByEmail.mockReturnValue({
      id: "user_123",
      email: "jane@example.com",
      passwordHash,
      role: "brand",
    });
    const resBadPassword = await POST(postRequest({ email: "jane@example.com", password: "wrongpassword" }));
    const bodyBadPassword = await resBadPassword.json();

    expect(resNoUser.status).toBe(resBadPassword.status);
    expect(bodyNoUser.error).toBe(bodyBadPassword.error);
  });

  it("returns a real JSON error (not a bare crash) when storage throws", async () => {
    mockFindUserByEmail.mockImplementation(() => {
      throw new Error("Upstash Redis request failed");
    });

    const res = await POST(postRequest({ email: "jane@example.com", password: "whatever123" }));

    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toContain("Upstash Redis request failed");
  });
});
