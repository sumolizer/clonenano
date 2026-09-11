/**
 * @jest-environment node
 */
const mockGet = jest.fn();

jest.mock("next/headers", () => ({
  cookies: jest.fn(async () => ({ get: mockGet })),
}));

import { hasSessionCookie } from "@/lib/session";

beforeEach(() => {
  mockGet.mockReset();
});

describe("hasSessionCookie", () => {
  it("returns true when the token cookie has a value", async () => {
    mockGet.mockReturnValue({ value: "some.jwt.value" });
    await expect(hasSessionCookie()).resolves.toBe(true);
  });

  it("returns false when the cookie is missing", async () => {
    mockGet.mockReturnValue(undefined);
    await expect(hasSessionCookie()).resolves.toBe(false);
  });

  it("returns false when the cookie value is empty", async () => {
    mockGet.mockReturnValue({ value: "" });
    await expect(hasSessionCookie()).resolves.toBe(false);
  });
});
