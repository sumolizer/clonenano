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

describe("createUser / findUserByEmail / findUserById (file store — no Upstash env vars)", () => {
  it("creates a user and finds it by email and id", async () => {
    const created = await createUser({
      name: "Jane Doe",
      email: "jane@example.com",
      passwordHash: "hashed",
      role: "brand",
    });

    expect(created.id).toBeTruthy();
    expect(created.createdAt).toBeTruthy();

    const byEmail = await findUserByEmail("jane@example.com");
    expect(byEmail).toEqual(created);

    const byId = await findUserById(created.id);
    expect(byId).toEqual(created);
  });

  it("looks up emails case-insensitively", async () => {
    await createUser({
      name: "Jane Doe",
      email: "Jane@Example.com",
      passwordHash: "hashed",
      role: "creator",
    });

    expect(await findUserByEmail("jane@example.com")).toBeDefined();
    expect(await findUserByEmail("JANE@EXAMPLE.COM")).toBeDefined();
  });

  it("returns undefined for an email or id that doesn't exist", async () => {
    expect(await findUserByEmail("nobody@example.com")).toBeUndefined();
    expect(await findUserById("nonexistent-id")).toBeUndefined();
  });

  it("persists multiple users independently", async () => {
    const a = await createUser({ name: "A", email: "a@example.com", passwordHash: "h1", role: "brand" });
    const b = await createUser({ name: "B", email: "b@example.com", passwordHash: "h2", role: "creator" });

    expect((await findUserByEmail("a@example.com"))?.id).toBe(a.id);
    expect((await findUserByEmail("b@example.com"))?.id).toBe(b.id);
    expect(a.id).not.toBe(b.id);
  });
});

describe("toPublicUser", () => {
  it("strips the password hash", async () => {
    const user = await createUser({
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

describe("createUser / findUserByEmail / findUserById (Upstash Redis — env vars present)", () => {
  const store = new Map<string, unknown>();

  beforeAll(() => {
    process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
  });

  afterAll(() => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  beforeEach(() => {
    store.clear();
    jest.resetModules();
  });

  function mockRedis() {
    jest.doMock("@upstash/redis", () => ({
      Redis: {
        fromEnv: () => ({
          get: jest.fn(async (key: string) => store.get(key) ?? null),
          set: jest.fn(async (key: string, value: unknown) => {
            store.set(key, value);
            return "OK";
          }),
        }),
      },
    }));
  }

  it("stores and retrieves a user through the Redis-shaped client instead of the filesystem", async () => {
    mockRedis();
    const db = await import("@/lib/db");

    const created = await db.createUser({
      name: "Redis User",
      email: "redis@example.com",
      passwordHash: "hashed",
      role: "creator",
    });

    expect(await db.findUserByEmail("redis@example.com")).toEqual(created);
    expect(await db.findUserById(created.id)).toEqual(created);
    // The mocked Redis client is the only place data could have come from —
    // confirms this path never touches the filesystem at all.
    expect(store.size).toBeGreaterThan(0);
  });

  it("looks up emails case-insensitively through Redis too", async () => {
    mockRedis();
    const db = await import("@/lib/db");

    await db.createUser({
      name: "Redis User",
      email: "Redis@Example.com",
      passwordHash: "hashed",
      role: "creator",
    });

    expect(await db.findUserByEmail("redis@example.com")).toBeDefined();
  });
});

describe("createUser (KV_REST_API_URL/TOKEN — Vercel Marketplace's actual injected names)", () => {
  // Vercel's Upstash Marketplace integration injects KV_REST_API_URL/TOKEN
  // (legacy "Vercel KV" naming), not UPSTASH_REDIS_REST_URL/TOKEN — this is
  // the exact case that silently fell through to the file store (and broke
  // in production with EROFS) until useRedis checked for both.
  const store = new Map<string, unknown>();

  beforeAll(() => {
    process.env.KV_REST_API_URL = "https://example.upstash.io";
    process.env.KV_REST_API_TOKEN = "test-token";
  });

  afterAll(() => {
    delete process.env.KV_REST_API_URL;
    delete process.env.KV_REST_API_TOKEN;
  });

  beforeEach(() => {
    store.clear();
    jest.resetModules();
    jest.doMock("@upstash/redis", () => ({
      Redis: {
        fromEnv: () => ({
          get: jest.fn(async (key: string) => store.get(key) ?? null),
          set: jest.fn(async (key: string, value: unknown) => {
            store.set(key, value);
            return "OK";
          }),
        }),
      },
    }));
  });

  it("still uses the Redis path, not the file store", async () => {
    const db = await import("@/lib/db");

    const created = await db.createUser({
      name: "KV Named User",
      email: "kv-named@example.com",
      passwordHash: "hashed",
      role: "brand",
    });

    expect(await db.findUserByEmail("kv-named@example.com")).toEqual(created);
    expect(store.size).toBeGreaterThan(0);
  });
});
