"use client";

import dynamic from "next/dynamic";
import type { GlobeCountry } from "@/types";
import GlobeFallback from "@/components/globe/GlobeFallback";
import GlobeErrorBoundary from "@/components/globe/GlobeErrorBoundary";

// The 3D globe imports @react-three/fiber, which touches browser-only APIs.
// Loading it with next/dynamic + ssr:false keeps it completely out of the
// server-rendered bundle, which is what avoids the
// "Cannot read properties of undefined (reading 'ReactCurrentOwner')" crash.
const Globe3D = dynamic(() => import("@/components/globe/Globe"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] w-full animate-pulse rounded-2xl border border-line/60 bg-surface sm:h-[520px] lg:h-[620px]" />
  ),
});

export default function GlobeLoader({ countries }: { countries: GlobeCountry[] }) {
  return (
    <GlobeErrorBoundary fallback={<GlobeFallback countries={countries} />}>
      <Globe3D countries={countries} />
    </GlobeErrorBoundary>
  );
}
