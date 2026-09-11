"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollSmoother } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Only smooth the scroll for users who haven't asked for reduced motion —
      // native scroll is the accessible default otherwise.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // A stale scroll position from whichever page mounted this before (this
        // component is remounted per-route by ScrollProvider's key) would
        // otherwise get reinterpreted against the new content's height.
        window.scrollTo(0, 0);

        const smoother = ScrollSmoother.create({
          wrapper: wrapperRef.current!,
          content: "#smooth-content",
          smooth: 1.2,
          smoothTouch: false,
          effects: false,
        });
        return () => smoother.kill();
      });

      return () => mm.revert();
    },
    { scope: wrapperRef }
  );

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}
