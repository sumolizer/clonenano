/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";

jest.mock("@/lib/db", () => ({
  createUser: jest.fn(),
  findUserByEmail: jest.fn(),
  findUserById: jest.fn(),
  toPublicUser: jest.fn((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  })),
}));

import { POST } from "@/app/api/auth/register/route";
import { createUser, findUserByEmail } from "@/lib/db";

const mockCreateUser = createUser as jest.Mock;
const mockFindUserByEmail = findUserByEmail as jest.Mock;

function postRequest(body: unknown) {
  return new NextRequest("http://localhost/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  mockFindUserByEmail.mockReturnValue(undefined);
  mockCreateUser.mockImplementation((input) => ({
    id: "user_123",
    createdAt: "2026-01-01T00:00:00.000Z",
    ...input,
  }));
});

describe("POST /api/auth/register", () => {
  it("creates a user, hashes the password, and sets an httpOnly JWT cookie", async () => {
    const res = await POST(
      postRequest({
        name: "Jane Doe",
        email: "jane@example.com",
        password: "correcthorsebattery",
        role: "brand",
      })
    );

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.user).toEqual({
      id: "user_123",
      name: "Jane Doe",
      email: "jane@example.com",
      role: "brand",
    });
    expect(body.user).not.toHaveProperty("passwordHash");

    expect(mockCreateUser).toHaveBeenCalledTimes(1);
    const createArg = mockCreateUser.mock.calls[0][0];
    expect(createArg.passwordHash).not.toBe("correcthorsebattery");

    const cookie = res.cookies.get("token");
    expect(cookie).toBeDefined();
    expect(cookie?.httpOnly).toBe(true);
    expect(cookie?.value).toBeTruthy();
  });

  it("rejects a duplicate email with 409 and does not create a user", async () => {
    mockFindUserByEmail.mockReturnValue({ id: "existing", email: "jane@example.com" });

    const res = await POST(
      postRequest({
        name: "Jane Doe",
        email: "jane@example.com",
        password: "correcthorsebattery",
        role: "brand",
      })
    );

    expect(res.status).toBe(409);
    expect(mockCreateUser).not.toHaveBeenCalled();
  });

  it.each([
    { case: "missing name", body: { email: "jane@example.com", password: "correcthorsebattery", role: "brand" } },
    { case: "missing email", body: { name: "Jane", password: "correcthorsebattery", role: "brand" } },
    { case: "missing password", body: { name: "Jane", email: "jane@example.com", role: "brand" } },
    { case: "missing role", body: { name: "Jane", email: "jane@example.com", password: "correcthorsebattery" } },
  ])("rejects $case with 400", async ({ body }) => {
    const res = await POST(postRequest(body));
    expect(res.status).toBe(400);
    expect(mockCreateUser).not.toHaveBeenCalled();
  });

  it("rejects an invalid role with 400", async () => {
    const res = await POST(
      postRequest({
        name: "Jane",
        email: "jane@example.com",
        password: "correcthorsebattery",
        role: "admin",
      })
    );
    expect(res.status).toBe(400);
  });

  it("rejects a password shorter than 8 characters with 400", async () => {
    const res = await POST(
      postRequest({
        name: "Jane",
        email: "jane@example.com",
        password: "short",
        role: "brand",
      })
    );
    expect(res.status).toBe(400);
    expect(mockCreateUser).not.toHaveBeenCalled();
  });

  it("rejects an invalid JSON body with 400", async () => {
    const req = new NextRequest("http://localhost/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
