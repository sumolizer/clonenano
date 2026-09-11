import fs from "fs";
import path from "path";
import crypto from "crypto";
import type { Role } from "@/lib/auth";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  createdAt: string;
}

const DB_PATH = path.join(process.cwd(), "data", "users.json");

function ensureDb() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, "[]", "utf-8");
}

function readUsers(): User[] {
  ensureDb();
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8")) as User[];
  } catch {
    return [];
  }
}

function writeUsers(users: User[]) {
  ensureDb();
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), "utf-8");
}

export function findUserByEmail(email: string): User | undefined {
  const normalized = email.toLowerCase();
  return readUsers().find((u) => u.email.toLowerCase() === normalized);
}

export function findUserById(id: string): User | undefined {
  return readUsers().find((u) => u.id === id);
}

export function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
}): User {
  const users = readUsers();
  const user: User = {
    id: crypto.randomUUID(),
    name: input.name,
    email: input.email,
    passwordHash: input.passwordHash,
    role: input.role,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  return user;
}

export function toPublicUser(user: User) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}
