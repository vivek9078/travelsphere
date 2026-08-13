"use client";

import { useMemo, useState } from "react";
import HotelCard from "@/components/hotels/HotelCard";
import type { Hotel } from "@/types";

export default function HotelsClient({ hotels, initialDestination }: { hotels: Hotel[]; initialDestination?: string }) {
  const [query, setQuery] = useState("");
  const [destination, setDestination] = useState(initialDestination ?? "All");
  const [sort, setSort] = useState<"relevance" | "price-asc" | "price-desc" | "rating">("relevance");

  const destinations = useMemo(() => Array.from(new Set(hotels.map((h) => h.destinationName))), [hotels]);

  const filtered = useMemo(() => {
    let list = hotels.filter((h) => {
      const matchesQuery = query ? h.name.toLowerCase().includes(query.toLowerCase()) : true;
      const matchesDestination = destination === "All" || h.destinationName === destination;
      return matchesQuery && matchesDestination;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.pricePerNight - b.pricePerNight);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.pricePerNight - a.pricePerNight);
    if (sort === "rating") list = [...list].sort((a, b) => b.reviewScore - a.reviewScore);
    return list;
  }, [hotels, query, destination, sort]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <p className="font-mono text-xs uppercase tracking-widest text-aqua">Stays</p>
      <h1 className="mt-2 font-display text-4xl text-ink">All hotels</h1>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search hotels…"
          className="w-full rounded-full border border-line/60 bg-surface px-5 py-3 text-sm text-ink outline-none focus-visible:border-amber sm:max-w-sm"
        />
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="rounded-full border border-line/60 bg-surface px-4 py-3 text-xs text-ink outline-none"
        >
          <option>All</option>
          {destinations.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="rounded-full border border-line/60 bg-surface px-4 py-3 text-xs text-ink outline-none sm:ml-auto"
        >
          <option value="relevance">Sort: Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating: High to Low</option>
        </select>
      </div>

      <p className="mt-4 text-xs text-mute">{filtered.length} hotels found</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((h) => <HotelCard key={h.slug} hotel={h} />)}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center">
          <p className="font-display text-xl text-ink">No hotels match your search</p>
        </div>
      )}
    </div>
  );
}
