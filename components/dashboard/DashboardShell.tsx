"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  LayoutGrid,
  IdCard,
  Store,
  Layers,
  LineChart,
  Users,
  Wallet,
  Percent,
  MessageCircle,
  Bell,
  Menu,
  X,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { DashboardUserContext, type DashboardUser } from "./DashboardUserContext";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid, exact: true },
  { href: "/dashboard/card", label: "My card", icon: IdCard },
  { href: "/dashboard/opportunities", label: "Opportunities", icon: Store },
  { href: "/dashboard/collaborations", label: "Collaborations", icon: Layers },
  { href: "/dashboard/analytics", label: "Analytics", icon: LineChart },
  { href: "/dashboard/community", label: "Community", icon: Users },
  { href: "/dashboard/earnings", label: "Earnings", icon: Wallet },
  { href: "/dashboard/affiliate", label: "Affiliate program", icon: Percent },
  { href: "/dashboard/messages", label: "Messages", icon: MessageCircle },
];

function NavList({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      {NAV_ITEMS.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={
              active
                ? "flex items-center gap-3 rounded-xl bg-[#eef6fc] px-3 py-2.5 text-sm font-semibold text-[#17181c]"
                : "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#3a3b40] hover:bg-black/5"
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export default function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [checked, setChecked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (!data.user) {
          router.replace(`/login?next=${encodeURIComponent(pathname)}`);
          return;
        }
        setUser(data.user);
        setChecked(true);
      })
      .catch(() => {
        if (!cancelled) router.replace("/login");
      });
    return () => {
      cancelled = true;
    };
    // Only re-check on mount; route changes within the dashboard don't need
    // another round trip.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  if (!checked || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-9 text-sm text-[#8a8b90]">
        Loading your workspace…
      </div>
    );
  }

  const initial = user.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <DashboardUserContext.Provider value={user}>
      <div className="mx-auto flex max-w-7xl pt-9">
        <aside className="hidden w-60 shrink-0 flex-col gap-1 border-r border-black/5 px-3 py-6 md:flex md:min-h-[calc(100vh-2.25rem)]">
          <NavList pathname={pathname} />
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3 border-b border-black/5 px-4 py-4 sm:px-6">
            <button
              type="button"
              aria-label="Toggle dashboard menu"
              onClick={() => setMobileNavOpen((v) => !v)}
              className="rounded-full border border-black/10 p-2 text-[#3a3b40] hover:bg-black/5 md:hidden"
            >
              {mobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>

            <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
              <span className="flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-[#3a3b40]">
                €0
              </span>
              <span className="hidden overflow-hidden rounded-full border border-black/10 text-xs font-semibold sm:flex">
                <span className="bg-[#17181c] px-2.5 py-1.5 text-white">EN</span>
                <span className="px-2.5 py-1.5 text-[#3a3b40]">FR</span>
              </span>
              <button
                type="button"
                aria-label="Notifications"
                className="rounded-full border border-black/10 p-2 text-[#3a3b40] hover:bg-black/5"
              >
                <Bell className="h-4 w-4" />
              </button>

              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  aria-label="Account menu"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((v) => !v)}
                  className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#17181c] text-sm font-semibold text-white"
                >
                  {initial}
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-black/5 bg-white p-2 shadow-lg">
                    <div className="px-3 py-2">
                      <p className="truncate text-sm font-semibold text-[#17181c]">{user.name}</p>
                      <p className="truncate text-xs text-[#8a8b90]">{user.email}</p>
                    </div>
                    <div className="my-1 border-t border-black/5" />
                    <Link
                      href="/"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#3a3b40] hover:bg-black/5"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to site
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#3a3b40] hover:bg-black/5"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {mobileNavOpen && (
            <nav className="flex flex-col gap-1 border-b border-black/5 px-3 py-3 md:hidden">
              <NavList pathname={pathname} onNavigate={() => setMobileNavOpen(false)} />
            </nav>
          )}

          <div className="px-4 py-8 sm:px-6">{children}</div>
        </div>
      </div>
    </DashboardUserContext.Provider>
  );
}
