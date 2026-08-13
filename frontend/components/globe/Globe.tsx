"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Stars, OrbitControls } from "@react-three/drei";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import type { GlobeCountry } from "@/types";

const RADIUS = 2.2;

function latLongToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function EarthCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.02;
    if (cloudRef.current) cloudRef.current.rotation.y += delta * 0.028;
  });

  return (
    <group>
      {/* Base sphere — deep navy with a faint amber fresnel-style rim via a second, larger transparent shell */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[RADIUS, 64, 64]} />
        <meshStandardMaterial
          color="#131B32"
          roughness={0.85}
          metalness={0.15}
          emissive="#0B1120"
        />
      </mesh>

      {/* Latitude/longitude wire grid — reads as "instrument", not decoration */}
      <mesh>
        <sphereGeometry args={[RADIUS + 0.004, 32, 32]} />
        <meshBasicMaterial color="#2A3552" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Cloud / atmosphere shell */}
      <mesh ref={cloudRef}>
        <sphereGeometry args={[RADIUS + 0.045, 48, 48]} />
        <meshStandardMaterial
          color="#8A93A6"
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </mesh>

      {/* Outer atmosphere glow */}
      <mesh>
        <sphereGeometry args={[RADIUS + 0.15, 48, 48]} />
        <meshBasicMaterial color="#E8934A" transparent opacity={0.045} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function CountryMarker({
  country,
  isHovered,
  onHover,
  onLeave,
  onSelect,
}: {
  country: GlobeCountry;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
}) {
  const position = useMemo(
    () => latLongToVector3(country.latitude, country.longitude, RADIUS + 0.02),
    [country.latitude, country.longitude]
  );

  return (
    <group position={position}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover();
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onLeave();
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <sphereGeometry args={[isHovered ? 0.045 : 0.03, 16, 16]} />
        <meshBasicMaterial color={isHovered ? "#F3B27A" : "#E8934A"} />
      </mesh>

      {isHovered && (
        <Html distanceFactor={6} occlude style={{ pointerEvents: "none" }}>
          <div className="w-56 -translate-x-1/2 -translate-y-full rounded-lg border border-amber/40 bg-surface/95 p-3 shadow-xl shadow-black/40 backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-widest text-amber">
              {country.isoCode} · {country.latitude.toFixed(1)}°, {country.longitude.toFixed(1)}°
            </p>
            <p className="mt-1 font-display text-base text-ink">{country.name}</p>
            <p className="mt-1 text-xs text-mute">
              {country.destinationCount} destination{country.destinationCount === 1 ? "" : "s"}
              {country.bestSeason ? ` · Best: ${country.bestSeason}` : ""}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-aqua">
              Click to explore →
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function Globe({ countries }: { countries: GlobeCountry[] }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="relative h-[420px] w-full sm:h-[520px] lg:h-[620px]">
      <Canvas camera={{ position: [0, 0, 5.4], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 3, 5]} intensity={1.2} color="#F3B27A" />
        <Stars radius={60} depth={30} count={2500} factor={2} fade speed={0.5} />
        <EarthCore />
        {countries.map((c) => (
          <CountryMarker
            key={c.slug}
            country={c}
            isHovered={hoveredSlug === c.slug}
            onHover={() => setHoveredSlug(c.slug)}
            onLeave={() => setHoveredSlug((cur) => (cur === c.slug ? null : cur))}
            onSelect={() => router.push(`/country/${c.slug}`)}
          />
        ))}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3.2}
          maxDistance={8}
          autoRotate={hoveredSlug === null}
          autoRotateSpeed={0.4}
        />
      </Canvas>
      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-mute">
        Drag to rotate · Scroll to zoom · Click a marker
      </p>
    </div>
  );
}
