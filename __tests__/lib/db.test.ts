jest.mock("fs", () => {
  const files = new Map<string, string>();

  const impl = {
    existsSync: jest.fn((p: string) => files.has(String(p))),
    mkdirSync: jest.fn(),
    writeFileSync: jest.fn((p: string, content: string) => {
      files.set(String(p), content);
    }),
    readFileSync: jest.fn((p: string) => {
      const content = files.get(String(p));
      if (content === undefined) throw new Error("ENOENT: no such file");
      return content;
    }),
    __reset: () => files.clear(),
  };

  return { __esModule: true, ...impl, default: impl };
});

import fsMock from "fs";
import { createUser, findUserByEmail, findUserById, toPublicUser } from "@/lib/db";

function reset() {
  (fsMock as unknown as { __reset: () => void }).__reset();
}

beforeEach(() => {
  reset();
});

describe("createUser / findUserByEmail / findUserById", () => {
  it("creates a user and finds it by email and id", () => {
    const created = createUser({
      name: "Jane Doe",
      email: "jane@example.com",
      passwordHash: "hashed",
      role: "brand",
    });

    expect(created.id).toBeTruthy();
    expect(created.createdAt).toBeTruthy();

    const byEmail = findUserByEmail("jane@example.com");
    expect(byEmail).toEqual(created);

    const byId = findUserById(created.id);
    expect(byId).toEqual(created);
  });

  it("looks up emails case-insensitively", () => {
    createUser({
      name: "Jane Doe",
      email: "Jane@Example.com",
      passwordHash: "hashed",
      role: "creator",
    });

    expect(findUserByEmail("jane@example.com")).toBeDefined();
    expect(findUserByEmail("JANE@EXAMPLE.COM")).toBeDefined();
  });

  it("returns undefined for an email or id that doesn't exist", () => {
    expect(findUserByEmail("nobody@example.com")).toBeUndefined();
    expect(findUserById("nonexistent-id")).toBeUndefined();
  });

  it("persists multiple users independently", () => {
    const a = createUser({ name: "A", email: "a@example.com", passwordHash: "h1", role: "brand" });
    const b = createUser({ name: "B", email: "b@example.com", passwordHash: "h2", role: "creator" });

    expect(findUserByEmail("a@example.com")?.id).toBe(a.id);
    expect(findUserByEmail("b@example.com")?.id).toBe(b.id);
    expect(a.id).not.toBe(b.id);
  });
});

describe("toPublicUser", () => {
  it("strips the password hash", () => {
    const user = createUser({
      name: "Jane Doe",
      email: "jane@example.com",
      passwordHash: "super-secret-hash",
      role: "brand",
    });

    const pub = toPublicUser(user);
    expect(pub).toEqual({ id: user.id, name: user.name, email: user.email, role: user.role });
    expect(pub).not.toHaveProperty("passwordHash");
  });
});
