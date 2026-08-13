"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { GlobeCountry } from "@/types";

// Equirectangular projection: plots lat/long onto a flat map. Used whenever
// WebGL / React Three Fiber is unavailable or throws, so the globe section
// never blocks the page from rendering.
function project(lat: number, lon: number, width: number, height: number) {
  const x = ((lon + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
}

export default function GlobeFallback({ countries }: { countries: GlobeCountry[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const router = useRouter();
  const width = 800;
  const height = 420;

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-line/60 bg-surface sm:h-[520px] lg:h-[620px]">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-full w-full"
        role="img"
        aria-label="Interactive map of destinations"
      >
        <defs>
          <radialGradient id="oceanGlow" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor="#1C2740" />
            <stop offset="100%" stopColor="#0B1120" />
          </radialGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2A3552" strokeWidth="0.5" opacity="0.4" />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#oceanGlow)" />
        <rect width={width} height={height} fill="url(#grid)" />

        {/* Faint latitude rings for an "instrument panel" feel */}
        {[0.2, 0.4, 0.6, 0.8].map((f) => (
          <line key={f} x1={0} x2={width} y1={height * f} y2={height * f} stroke="#2A3552" strokeWidth="0.5" opacity="0.5" />
        ))}

        {countries.map((c) => {
          const { x, y } = project(c.latitude, c.longitude, width, height);
          const isHovered = hovered === c.slug;
          return (
            <g key={c.slug}>
              <circle
                cx={x}
                cy={y}
                r={isHovered ? 9 : 6}
                fill={isHovered ? "#F3B27A" : "#E8934A"}
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHovered(c.slug)}
                onMouseLeave={() => setHovered((cur) => (cur === c.slug ? null : cur))}
                onClick={() => router.push(`/country/${c.slug}`)}
              />
              <circle cx={x} cy={y} r={isHovered ? 16 : 10} fill="#E8934A" opacity={isHovered ? 0.15 : 0.08} />
              {isHovered && (
                <text x={x} y={y - 16} textAnchor="middle" fontSize="12" fill="#F5F3EE" fontFamily="var(--font-inter)">
                  {c.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-mute">
        Hover a marker · Click to explore
      </p>
    </div>
  );
}
