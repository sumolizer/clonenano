"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type CurrentUser = { id: string; name: string; email: string; role: string };

const NAV_LINKS = [
  { href: "/", label: "For companies" },
  { href: "/creators", label: "For creators" },
  { href: "/agencies", label: "For agencies" },
];

const RESOURCE_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/free-tools", label: "Free tools" },
  { href: "/case-studies/blogseo", label: "Case study: BlogSEO" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  // Re-checks on every route change (not just mount) so the nav updates right after
  // login/register/logout redirect back to "/", since this component never unmounts.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setUser(data.user ?? null);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setCheckedAuth(true);
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="fixed inset-x-0 top-9 z-50 border-b border-black/5 bg-[#fcfcfb]/80 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <span className="inline-block h-6 w-6 rounded-full bg-[#17181c]" />
          naano
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#3a3b40] md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#17181c]">
              {link.label}
            </Link>
          ))}
          <Link href="/#how-it-works" className="hover:text-[#17181c]">
            How it works
          </Link>

          <div className="relative" ref={resourcesRef}>
            <button
              type="button"
              onClick={() => setResourcesOpen((v) => !v)}
              className="flex items-center gap-1 hover:text-[#17181c]"
              aria-expanded={resourcesOpen}
            >
              Resources
              <span className="text-xs">▾</span>
            </button>
            {resourcesOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-black/5 bg-white p-2 shadow-lg">
                {RESOURCE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg px-3 py-2 text-sm text-[#3a3b40] hover:bg-black/5"
                    onClick={() => setResourcesOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {checkedAuth && user ? (
            <>
              <span className="text-sm text-[#3a3b40]">Hi, {user.name.split(" ")[0]}</span>
              <Link
                href="/dashboard"
                className="rounded-full bg-[#17181c] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold hover:bg-black/5"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-semibold hover:bg-black/5"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[#17181c] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-6 bg-[#17181c] mb-1.5" />
          <span className="block h-0.5 w-6 bg-[#17181c] mb-1.5" />
          <span className="block h-0.5 w-6 bg-[#17181c]" />
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-black/5 bg-[#fcfcfb] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-[#3a3b40]">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            {RESOURCE_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-3">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="rounded-full bg-[#17181c] px-4 py-2 text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button onClick={handleSignOut} className="rounded-full border px-4 py-2">
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="rounded-full border px-4 py-2">
                    Sign in
                  </Link>
                  <Link href="/register" className="rounded-full bg-[#17181c] px-4 py-2 text-white">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
