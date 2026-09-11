import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Redis } from "@upstash/redis";
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
// below only works for local development. In production, connect a Redis
// database (e.g. Vercel Marketplace → Storage → Upstash) and this switches
// over automatically.
//
// Redis.fromEnv() itself already falls back from UPSTASH_REDIS_REST_URL/
// TOKEN to KV_REST_API_URL/TOKEN — the names Vercel's own Marketplace
// integration actually injects (legacy "Vercel KV" naming, kept for
// compatibility). This check has to look for the same two names, or it can
// end up disagreeing with fromEnv() about whether Redis is configured at all.
const useRedis = Boolean(
  (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) &&
    (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN)
);

let redisClient: Redis | null = null;
function getRedis(): Redis {
  if (!redisClient) redisClient = Redis.fromEnv();
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
    const client = getRedis();
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
    const client = getRedis();
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
    const client = getRedis();
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
