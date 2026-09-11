"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import NetworkScene from "./NetworkScene";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 11], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <NetworkScene triggerRef={containerRef} />
      </Canvas>
    </div>
  );
}
