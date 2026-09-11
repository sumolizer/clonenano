"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay (seconds) applied to direct children instead of the container. */
  stagger?: number;
  y?: number;
}

export default function RevealOnScroll({
  children,
  className,
  stagger,
  y = 28,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger ? gsap.utils.toArray(":scope > *", ref.current!) : ref.current;

        gsap.fromTo(
          targets,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: stagger ?? 0,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
