"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MapPin, Calendar, Users, Search } from "lucide-react";

function todayISO(): string {
  const tzOffsetMs = new Date().getTimezoneOffset() * 60000;
  return new Date(Date.now() - tzOffsetMs).toISOString().slice(0, 10);
}

export default function TravelSearchBar() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("q", destination);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("guests", String(guests));
    router.push(`/explore?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-2xl border border-line/60 bg-surface/90 p-3 shadow-2xl shadow-black/30 backdrop-blur sm:p-4"
    >
      <p className="px-2 pb-2 font-mono text-[10px] uppercase tracking-widest text-aqua sm:hidden">
        Where do you want to go?
      </p>
      <div className="grid gap-2 sm:grid-cols-[1.4fr_1fr_1fr_0.8fr_auto] sm:items-center sm:gap-0 sm:divide-x sm:divide-line/60">
        <label className="flex items-center gap-2 rounded-xl px-3 py-2.5 sm:rounded-none">
          <MapPin size={16} className="shrink-0 text-amber" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where do you want to go?"
            className="w-full bg-transparent text-sm text-ink placeholder:text-mute outline-none"
            aria-label="Destination"
          />
        </label>
        <label className="flex items-center gap-2 rounded-xl px-3 py-2.5 sm:rounded-none">
          <Calendar size={16} className="shrink-0 text-mute" />
          <input
            type="date"
            value={checkIn}
            min={todayISO()}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-transparent text-sm text-ink outline-none [color-scheme:dark]"
            aria-label="Check-in date"
          />
        </label>
        <label className="flex items-center gap-2 rounded-xl px-3 py-2.5 sm:rounded-none">
          <Calendar size={16} className="shrink-0 text-mute" />
          <input
            type="date"
            value={checkOut}
            min={checkIn || todayISO()}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-transparent text-sm text-ink outline-none [color-scheme:dark]"
            aria-label="Check-out date"
          />
        </label>
        <label className="flex items-center gap-2 rounded-xl px-3 py-2.5 sm:rounded-none">
          <Users size={16} className="shrink-0 text-mute" />
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-transparent text-sm text-ink outline-none"
            aria-label="Guests"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n} className="bg-surface text-ink">
                {n} Guest{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-amber px-6 py-3 font-mono text-xs uppercase tracking-widest text-void transition-colors hover:bg-amber-soft sm:mt-0 sm:ml-3 sm:rounded-full"
        >
          <Search size={14} /> Explore
        </button>
      </div>
    </form>
  );
}
