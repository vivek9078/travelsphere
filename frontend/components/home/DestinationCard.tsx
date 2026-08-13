"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import type { DestinationCard as DestinationCardType } from "@/types";

export default function DestinationCard({ d }: { d: DestinationCardType }) {
  const { isWishlisted, toggle } = useWishlist();
  const wished = isWishlisted("destination", d.slug);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-line/60 bg-surface transition-shadow hover:shadow-xl hover:shadow-black/20">
      <Link href={`/destinations/${d.slug}`} className="block">
        <div className="relative h-56 w-full overflow-hidden">
          {d.heroImage ? (
            <Image
              src={d.heroImage}
              alt={d.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-surface2 to-surface" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-amber">{d.countryName}</p>
            <p className="font-display text-xl text-ink">{d.name}</p>
          </div>
        </div>
      </Link>

      <button
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={(e) => {
          e.preventDefault();
          toggle({ type: "destination", slug: d.slug, name: d.name, image: d.heroImage ?? "", subtitle: d.countryName });
        }}
        className="absolute right-3 top-3 rounded-full bg-void/60 p-2 backdrop-blur transition-colors hover:bg-void/80"
      >
        <Heart size={16} className={wished ? "fill-amber text-amber" : "text-ink"} />
      </button>

      <div className="p-4">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-mute">
          <span>{d.tripDuration ?? "Flexible"}</span>
          <span>{d.bestSeason ?? "Year-round"}</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-ink">
            <Star size={14} className="fill-amber text-amber" />
            <span className="font-tabular">{d.rating?.toFixed(1) ?? "—"}</span>
            <span className="text-xs text-mute">({d.reviewCount?.toLocaleString() ?? 0})</span>
          </div>
          {d.priceFrom && (
            <p className="text-sm text-ink">
              From <span className="font-tabular font-semibold text-amber">₹{d.priceFrom.toLocaleString("en-IN")}</span>
            </p>
          )}
        </div>

        <Link
          href={`/destinations/${d.slug}`}
          className="mt-4 block rounded-full border border-line/60 py-2 text-center font-mono text-[11px] uppercase tracking-widest text-ink transition-colors group-hover:border-amber/60 group-hover:text-amber"
        >
          View Destination
        </Link>
      </div>
    </div>
  );
}
