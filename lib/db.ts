import fs from "fs";
import path from "path";
import crypto from "crypto";
import type { Redis } from "@upstash/redis";
import type { Role } from "@/lib/auth";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  createdAt: string;
}

// Serverless hosts (Vercel, etc.) run on a read-only filesystem outside /tmp,
// and /tmp isn't shared across function instances — the file-based store
// below only works for local development. In production, point
// UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN at a real Redis database
// (e.g. via the Vercel Marketplace) and this switches over automatically.
const useRedis = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

// Imported dynamically (rather than at module top-level) so the file-store
// path — local dev, and any environment without Upstash configured — never
// has to load the package at all.
let redisClient: Redis | null = null;
async function getRedis(): Promise<Redis> {
  if (!redisClient) {
    const { Redis } = await import("@upstash/redis");
    redisClient = Redis.fromEnv();
  }
  return redisClient;
}

function emailKey(email: string) {
  return `user:email:${email.toLowerCase()}`;
}

function idKey(id: string) {
  return `user:id:${id}`;
}

// ---- File-backed store (local dev only) ----

const DB_PATH = path.join(process.cwd(), "data", "users.json");

function ensureDb() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, "[]", "utf-8");
}

function readUsersFile(): User[] {
  ensureDb();
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8")) as User[];
  } catch {
    return [];
  }
}

function writeUsersFile(users: User[]) {
  ensureDb();
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), "utf-8");
}

// ---- Public API ----

export async function findUserByEmail(email: string): Promise<User | undefined> {
  if (useRedis) {
    const client = await getRedis();
    const id = await client.get<string>(emailKey(email));
    if (!id) return undefined;
    const user = await client.get<User>(idKey(id));
    return user ?? undefined;
  }
  const normalized = email.toLowerCase();
  return readUsersFile().find((u) => u.email.toLowerCase() === normalized);
}

export async function findUserById(id: string): Promise<User | undefined> {
  if (useRedis) {
    const client = await getRedis();
    const user = await client.get<User>(idKey(id));
    return user ?? undefined;
  }
  return readUsersFile().find((u) => u.id === id);
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
}): Promise<User> {
  const user: User = {
    id: crypto.randomUUID(),
    name: input.name,
    email: input.email,
    passwordHash: input.passwordHash,
    role: input.role,
    createdAt: new Date().toISOString(),
  };

  if (useRedis) {
    const client = await getRedis();
    await client.set(idKey(user.id), user);
    await client.set(emailKey(user.email), user.id);
    return user;
  }

  const users = readUsersFile();
  users.push(user);
  writeUsersFile(users);
  return user;
}

export function toPublicUser(user: User) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}
