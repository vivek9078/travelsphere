"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import DestinationCard from "@/components/home/DestinationCard";
import HotelCard from "@/components/hotels/HotelCard";
import ActivityCard from "@/components/activities/ActivityCard";
import type { DestinationCard as DestinationCardType, Hotel, Activity } from "@/types";

type Tab = "destinations" | "hotels" | "activities";

export default function ExploreClient({
  destinations,
  hotels,
  activities,
  regions,
}: {
  destinations: DestinationCardType[];
  hotels: Hotel[];
  activities: Activity[];
  regions: string[];
}) {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<Tab>("destinations");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [region, setRegion] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sort, setSort] = useState<"relevance" | "price-asc" | "price-desc" | "rating">("relevance");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredDestinations = useMemo(() => {
    let list = destinations.filter((d) => {
      const matchesQuery = query
        ? d.name.toLowerCase().includes(query.toLowerCase()) || d.countryName.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesRegion = region === "All" || d.countryName === region;
      const matchesRating = (d.rating ?? 0) >= minRating;
      const matchesPrice = (d.priceFrom ?? 0) <= maxPrice;
      return matchesQuery && matchesRegion && matchesRating && matchesPrice;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => (a.priceFrom ?? 0) - (b.priceFrom ?? 0));
    if (sort === "price-desc") list = [...list].sort((a, b) => (b.priceFrom ?? 0) - (a.priceFrom ?? 0));
    if (sort === "rating") list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return list;
  }, [destinations, query, region, minRating, maxPrice, sort]);

  const filteredHotels = useMemo(() => {
    let list = hotels.filter((h) => {
      const matchesQuery = query
        ? h.name.toLowerCase().includes(query.toLowerCase()) || h.destinationName.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesRegion = region === "All" || h.countryName === region;
      const matchesRating = h.reviewScore / 2 >= minRating;
      const matchesPrice = h.pricePerNight <= maxPrice;
      return matchesQuery && matchesRegion && matchesRating && matchesPrice;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.pricePerNight - b.pricePerNight);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.pricePerNight - a.pricePerNight);
    if (sort === "rating") list = [...list].sort((a, b) => b.reviewScore - a.reviewScore);
    return list;
  }, [hotels, query, region, minRating, maxPrice, sort]);

  const filteredActivities = useMemo(() => {
    let list = activities.filter((a) => {
      const matchesQuery = query
        ? a.name.toLowerCase().includes(query.toLowerCase()) || a.destinationName.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesRating = a.rating >= minRating;
      const matchesPrice = a.price <= maxPrice;
      return matchesQuery && matchesRating && matchesPrice;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [activities, query, minRating, maxPrice, sort]);

  const counts = {
    destinations: filteredDestinations.length,
    hotels: filteredHotels.length,
    activities: filteredActivities.length,
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <p className="font-mono text-xs uppercase tracking-widest text-aqua">Search & filter</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Explore everything</h1>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destinations, hotels, or activities…"
          className="w-full rounded-full border border-line/60 bg-surface px-5 py-3 text-sm text-ink outline-none focus-visible:border-amber sm:max-w-md"
        />
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="flex items-center justify-center gap-2 rounded-full border border-line/60 px-4 py-3 font-mono text-xs uppercase tracking-widest text-ink hover:border-amber/60 sm:w-auto"
        >
          <SlidersHorizontal size={14} /> Filters
        </button>
        <div className="ml-auto flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-full border border-line/60 bg-surface px-3 py-3 text-xs text-ink outline-none"
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
          </select>
          <button
            aria-label="Grid view"
            onClick={() => setView("grid")}
            className={`rounded-full p-3 ${view === "grid" ? "bg-amber text-void" : "border border-line/60 text-mute"}`}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            aria-label="List view"
            onClick={() => setView("list")}
            className={`rounded-full p-3 ${view === "list" ? "bg-amber text-void" : "border border-line/60 text-mute"}`}
          >
            <List size={14} />
          </button>
        </div>
      </div>

      {filtersOpen && (
        <div className="mt-4 grid gap-6 rounded-2xl border border-line/60 bg-surface p-6 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Region</p>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="mt-2 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2 text-sm text-ink outline-none"
            >
              <option>All</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Min rating: {minRating.toFixed(1)}</p>
            <input
              type="range" min={0} max={5} step={0.5}
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="mt-3 w-full accent-amber"
            />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Max price: ₹{maxPrice.toLocaleString("en-IN")}</p>
            <input
              type="range" min={1000} max={100000} step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full accent-amber"
            />
          </div>
        </div>
      )}

      <div className="mt-8 flex gap-2 border-b border-line/60">
        {(["destinations", "hotels", "activities"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors ${
              tab === t ? "border-amber text-ink" : "border-transparent text-mute hover:text-ink"
            }`}
          >
            {t} ({counts[t]})
          </button>
        ))}
      </div>

      <div className={`mt-8 grid gap-6 ${view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
        {tab === "destinations" && filteredDestinations.map((d) => <DestinationCard key={d.slug} d={d} />)}
        {tab === "hotels" && filteredHotels.map((h) => <HotelCard key={h.slug} hotel={h} />)}
        {tab === "activities" && filteredActivities.map((a) => <ActivityCard key={a.slug} activity={a} />)}
      </div>

      {counts[tab] === 0 && (
        <div className="mt-16 text-center">
          <p className="font-display text-xl text-ink">No results match your filters</p>
          <p className="mt-2 text-sm text-mute">Try widening your price range or clearing the search.</p>
        </div>
      )}
    </div>
  );
}
