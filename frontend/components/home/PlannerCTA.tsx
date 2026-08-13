import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function PlannerCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl border border-line/60 bg-gradient-to-br from-surface via-surface to-surface2 p-10 sm:p-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-aqua/10 blur-3xl" />
        <div className="relative max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-amber">
            <Sparkles size={12} /> AI Trip Planner
          </span>
          <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">Plan your perfect trip in under a minute</h2>
          <p className="mt-4 text-mute">
            Tell us where you want to go, your budget, and your travel style —
            we'll generate a day-by-day itinerary instantly.
          </p>
          <Link
            href="/plan"
            className="mt-8 inline-block rounded-full bg-amber px-7 py-3 font-mono text-xs uppercase tracking-widest text-void transition-colors hover:bg-amber-soft"
          >
            Generate My Trip
          </Link>
        </div>
      </div>
    </section>
  );
}
