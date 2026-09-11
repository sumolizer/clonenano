import { hashPassword, verifyPassword, signToken, verifyToken } from "@/lib/auth";

describe("password hashing", () => {
  it("hashes a password and verifies the original matches", async () => {
    const hash = await hashPassword("correcthorsebattery");
    expect(hash).not.toBe("correcthorsebattery");
    await expect(verifyPassword("correcthorsebattery", hash)).resolves.toBe(true);
  });

  it("rejects an incorrect password against a hash", async () => {
    const hash = await hashPassword("correcthorsebattery");
    await expect(verifyPassword("wrongpassword", hash)).resolves.toBe(false);
  });

  it("produces a different hash for the same password each time (salted)", async () => {
    const [a, b] = await Promise.all([
      hashPassword("correcthorsebattery"),
      hashPassword("correcthorsebattery"),
    ]);
    expect(a).not.toBe(b);
  });
});

describe("JWT sign / verify", () => {
  const payload = { sub: "user_1", email: "test@example.com", role: "brand" as const };

  it("round-trips a payload through signToken/verifyToken", () => {
    const token = signToken(payload);
    const decoded = verifyToken(token);
    expect(decoded).toMatchObject(payload);
  });

  it("returns null for a garbage token", () => {
    expect(verifyToken("not-a-real-token")).toBeNull();
  });

  it("returns null for a tampered token", () => {
    const token = signToken(payload);
    const tampered = token.slice(0, -2) + "xx";
    expect(verifyToken(tampered)).toBeNull();
  });

  it("returns null for an empty string", () => {
    expect(verifyToken("")).toBeNull();
  });
});
