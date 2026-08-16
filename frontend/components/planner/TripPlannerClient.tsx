"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles, Loader2, Clock } from "lucide-react";
import { generateItinerary } from "@/lib/itinerary";
import type { GeneratedTrip } from "@/types";

const styles = ["Adventure", "Luxury", "Relaxation", "Culture", "Food", "Nature", "Family", "Romantic"];
const companionsOptions = ["Solo", "Couple", "Family", "Friends group"];
const budgets = ["Budget", "Mid-range", "Luxury", "Premium"];

export default function TripPlannerClient() {
  const searchParams = useSearchParams();
  const [destination, setDestination] = useState(searchParams.get("destination") ?? "");
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState("Mid-range");
  const [companions, setCompanions] = useState("Couple");
  const [interests, setInterests] = useState<string[]>(["Culture"]);
  const [loading, setLoading] = useState(false);
  const [trip, setTrip] = useState<GeneratedTrip | null>(null);

  function toggleInterest(s: string) {
    setInterests((prev) => (prev.includes(s) ? prev.filter((i) => i !== s) : [...prev, s]));
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!destination.trim()) return;
    setLoading(true);
    setTrip(null);
    // Simulated AI processing — everything is generated locally from
    // templates, there is no external AI API call.
    try {
      const result = await generateItinerary({ destination, days, budget, travelStyle: interests[0] ?? "Culture", companions, interests });

      // Artificial delay to simulate thinking
      setTimeout(() => {
        setTrip(result);
        setLoading(false);
      }, 1600);
    } catch (e) {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <span className="inline-flex items-center gap-2 rounded-full border border-amber/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-amber">
        <Sparkles size={12} /> AI Trip Planner
      </span>
      <h1 className="mt-3 font-display text-4xl text-ink">Plan your perfect trip</h1>
      <p className="mt-2 max-w-xl text-mute">Tell us where, how long, and how you like to travel — we'll build a day-by-day itinerary instantly.</p>

      <form onSubmit={handleGenerate} className="mt-8 grid gap-6 rounded-2xl border border-line/60 bg-surface p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="text-sm text-mute">
            Destination
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Bali, Paris, Jaipur…"
              required
              className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none focus-visible:border-amber"
            />
          </label>
          <label className="text-sm text-mute">
            Number of days: <span className="text-ink">{days}</span>
            <input
              type="range" min={1} max={14} value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="mt-3 w-full accent-amber"
            />
          </label>
          <label className="text-sm text-mute">
            Budget
            <select value={budget} onChange={(e) => setBudget(e.target.value)} className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none">
              {budgets.map((b) => <option key={b}>{b}</option>)}
            </select>
          </label>
          <label className="text-sm text-mute">
            Travel companions
            <select value={companions} onChange={(e) => setCompanions(e.target.value)} className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none">
              {companionsOptions.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
        </div>

        <div>
          <p className="text-sm text-mute">Interests & travel style</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {styles.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => toggleInterest(s)}
                className={`rounded-full border px-4 py-2 text-xs font-mono uppercase tracking-widest transition-colors ${
                  interests.includes(s) ? "border-amber bg-amber/10 text-amber" : "border-line/60 text-mute hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !destination.trim()}
          className="flex items-center justify-center gap-2 rounded-full bg-amber py-3.5 font-mono text-xs uppercase tracking-widest text-void transition-colors hover:bg-amber-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? <><Loader2 size={14} className="animate-spin" /> Generating your itinerary…</> : "Generate My Trip"}
        </button>
      </form>

      {loading && (
        <div className="mt-10 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-20 w-full rounded-xl" />
          ))}
        </div>
      )}

      {trip && !loading && (
        <div className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line/60 pb-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-aqua">Your itinerary</p>
              <h2 className="mt-1 font-display text-3xl text-ink">{trip.days} days in {trip.destination}</h2>
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Estimated cost</p>
              <p className="font-tabular text-2xl text-amber">₹{trip.estimatedCost.toLocaleString("en-IN")}</p>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            {trip.itinerary.map((day) => (
              <div key={day.day} className="relative pl-8">
                <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber font-mono text-[10px] text-void">
                  {day.day}
                </div>
                <div className="absolute left-[11px] top-7 h-[calc(100%-4px)] w-px bg-line/60 last:hidden" />
                <p className="font-display text-lg text-ink">Day {day.day} — {day.title}</p>
                <div className="mt-3 space-y-2">
                  {day.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg border border-line/60 bg-surface px-4 py-2.5 text-sm">
                      <span className="flex shrink-0 items-center gap-1 font-mono text-xs text-amber"><Clock size={12} /> {item.time}</span>
                      <span className="text-ink/90">{item.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
