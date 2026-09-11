"use client";

import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const NODE_COUNT = 14;
const RADIUS = 3.6;
const LINK_DISTANCE = 2.6;

function useNodePositions(): [number, number, number][] {
  return useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      // Fibonacci sphere distribution — even spacing without a physics sim.
      const phi = Math.acos(-1 + (2 * i) / NODE_COUNT);
      const theta = Math.sqrt(NODE_COUNT * Math.PI) * phi;
      positions.push([
        RADIUS * Math.cos(theta) * Math.sin(phi),
        RADIUS * Math.sin(theta) * Math.sin(phi),
        RADIUS * Math.cos(phi),
      ]);
    }
    return positions;
  }, []);
}

export default function NetworkScene({
  triggerRef,
}: {
  triggerRef: RefObject<HTMLDivElement | null>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const positions = useNodePositions();

  const edgePositions = useMemo(() => {
    const points: number[] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const [x1, y1, z1] = positions[i];
        const [x2, y2, z2] = positions[j];
        if (Math.hypot(x1 - x2, y1 - y2, z1 - z2) < LINK_DISTANCE) {
          points.push(x1, y1, z1, x2, y2, z2);
        }
      }
    }
    return new Float32Array(points);
  }, [positions]);

  // Ties the cluster's rotation to how far the hero has scrolled past, instead of
  // just idling — this is the "scroll-driven rendering" part.
  useGSAP(() => {
    if (!groupRef.current || !triggerRef.current) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(groupRef.current!.rotation, {
        y: Math.PI * 0.85,
        x: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
    return () => mm.revert();
  }, []);

  // Slow idle spin so the scene isn't inert before the user scrolls.
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.z += delta * 0.03;
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[4, 4, 5]} intensity={1.4} color="#eaf7ff" />
      <group ref={groupRef}>
        {positions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <icosahedronGeometry args={[0.08, 0]} />
            <meshStandardMaterial
              color="#17181c"
              roughness={0.35}
              metalness={0.15}
              transparent
              opacity={0.55}
            />
          </mesh>
        ))}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#5fb8de" transparent opacity={0.35} />
        </lineSegments>
      </group>
    </>
  );
}
