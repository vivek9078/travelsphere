"use client";

import { useMemo, useState } from "react";
import ActivityCard from "@/components/activities/ActivityCard";
import type { Activity } from "@/types";

export default function ActivitiesClient({ activities, initialDestination }: { activities: Activity[]; initialDestination?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [destination, setDestination] = useState(initialDestination ?? "All");
  const [sort, setSort] = useState<"relevance" | "price-asc" | "price-desc" | "rating">("relevance");

  const categories = useMemo(() => Array.from(new Set(activities.map((a) => a.category))), [activities]);
  const destinations = useMemo(() => Array.from(new Set(activities.map((a) => a.destinationName))), [activities]);

  const filtered = useMemo(() => {
    let list = activities.filter((a) => {
      const matchesQuery = query ? a.name.toLowerCase().includes(query.toLowerCase()) : true;
      const matchesCategory = category === "All" || a.category === category;
      const matchesDestination = destination === "All" || a.destinationName === destination;
      return matchesQuery && matchesCategory && matchesDestination;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [activities, query, category, destination, sort]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <p className="font-mono text-xs uppercase tracking-widest text-aqua">Experiences</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Unforgettable experiences</h1>

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search activities…"
          className="w-full rounded-full border border-line/60 bg-surface px-5 py-3 text-sm text-ink outline-none focus-visible:border-amber sm:max-w-sm"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-full border border-line/60 bg-surface px-4 py-3 text-xs text-ink outline-none">
          <option>All</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={destination} onChange={(e) => setDestination(e.target.value)} className="rounded-full border border-line/60 bg-surface px-4 py-3 text-xs text-ink outline-none">
          <option>All</option>
          {destinations.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="ml-auto rounded-full border border-line/60 bg-surface px-4 py-3 text-xs text-ink outline-none">
          <option value="relevance">Sort: Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating: High to Low</option>
        </select>
      </div>

      <p className="mt-4 text-xs text-mute">{filtered.length} experiences found</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((a) => <ActivityCard key={a.slug} activity={a} />)}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center">
          <p className="font-display text-xl text-ink">No activities match your search</p>
        </div>
      )}
    </div>
  );
}
