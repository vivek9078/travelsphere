"use client";

import { useState } from "react";
import { Compass, Loader2, MapPin, Users } from "lucide-react";
import { validateTripPlanInput } from "@/lib/trip-planner";
import type { TripPlanInput } from "@/types";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function TripPlanForm({
  loading,
  onGenerate,
}: {
  loading: boolean;
  onGenerate: (input: TripPlanInput) => void;
}) {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [people, setPeople] = useState(2);
  const [errors, setErrors] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input: Partial<TripPlanInput> = { destination, startDate, endDate, people };
    const validationErrors = validateTripPlanInput(input);
    setErrors(validationErrors);
    if (validationErrors.length > 0) return;
    onGenerate(input as TripPlanInput);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-6 rounded-2xl border border-line/60 bg-surface p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="text-sm text-mute sm:col-span-2">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} /> Destination
          </span>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Goa, Jaipur, Manali…"
            className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none focus-visible:border-amber"
          />
        </label>

        <label className="text-sm text-mute">
          Start date
          <input
            type="date"
            value={startDate}
            min={todayISO()}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none focus-visible:border-amber [color-scheme:dark]"
          />
        </label>

        <label className="text-sm text-mute">
          End date
          <input
            type="date"
            value={endDate}
            min={startDate || todayISO()}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none focus-visible:border-amber [color-scheme:dark]"
          />
        </label>

        <label className="text-sm text-mute sm:col-span-2">
          <span className="flex items-center gap-1.5">
            <Users size={14} /> Number of people: <span className="text-ink">{people}</span>
          </span>
          <input
            type="range"
            min={1}
            max={20}
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
            className="mt-3 w-full accent-amber"
          />
        </label>
      </div>

      {errors.length > 0 && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <ul className="list-inside list-disc space-y-1">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-full bg-amber py-3.5 font-mono text-xs uppercase tracking-widest text-void transition-colors hover:bg-amber-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 size={14} className="animate-spin" /> Generating your plans…
          </>
        ) : (
          <>
            <Compass size={14} /> Plan My Trip
          </>
        )}
      </button>
    </form>
  );
}
