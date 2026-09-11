"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type Role = "brand" | "creator";

export default function RegisterForm({ next }: { next: string }) {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!role) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  }

  if (!role) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-6 py-16">
        <h1 className="text-3xl font-semibold text-[#17181c]">Create your account</h1>
        <p className="mt-2 text-sm text-[#3a3b40]">First, who are you here as?</p>

        <div className="mt-8 flex flex-col gap-4">
          <button
            type="button"
            onClick={() => setRole("creator")}
            className="rounded-2xl border border-black/10 p-5 text-left hover:border-[#17181c]"
          >
            <p className="font-semibold text-[#17181c]">I&apos;m a creator</p>
            <p className="mt-1 text-sm text-[#3a3b40]">
              Get paid to create LinkedIn content for B2B brands.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setRole("brand")}
            className="rounded-2xl border border-black/10 p-5 text-left hover:border-[#17181c]"
          >
            <p className="font-semibold text-[#17181c]">I&apos;m a brand</p>
            <p className="mt-1 text-sm text-[#3a3b40]">
              Find creators, launch campaigns, and trace pipeline back to each post.
            </p>
          </button>
        </div>

        <p className="mt-6 text-sm text-[#3a3b40]">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#17181c] underline">
            Sign in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <button
        type="button"
        onClick={() => setRole(null)}
        className="mb-6 self-start text-sm text-[#3a3b40] hover:text-[#17181c]"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-semibold text-[#17181c]">
        Sign up as a {role === "brand" ? "brand" : "creator"}
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-[#3a3b40]">
          Full name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-black/10 px-3.5 py-2.5 text-[#17181c] outline-none focus:border-[#17181c]"
            placeholder="Jane Doe"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-[#3a3b40]">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-black/10 px-3.5 py-2.5 text-[#17181c] outline-none focus:border-[#17181c]"
            placeholder="you@company.com"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-[#3a3b40]">
          Password
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-black/10 px-3.5 py-2.5 text-[#17181c] outline-none focus:border-[#17181c]"
            placeholder="At least 8 characters"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-[#17181c] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-sm text-[#3a3b40]">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[#17181c] underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
