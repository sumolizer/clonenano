"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import SmoothScroll from "./SmoothScroll";

/**
 * Forces SmoothScroll to fully remount on every route change (key={pathname}).
 * It lives in the root layout and would otherwise persist across client-side
 * navigations, leaving ScrollSmoother's measured height and scroll position
 * locked to whichever page mounted it first.
 */
export default function ScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <SmoothScroll key={pathname}>{children}</SmoothScroll>;
}
