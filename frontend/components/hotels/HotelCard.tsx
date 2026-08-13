"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, MapPin } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import type { Hotel } from "@/types";

const availabilityStyles: Record<Hotel["availability"], string> = {
  Available: "bg-aqua/15 text-aqua",
  Limited: "bg-amber/15 text-amber",
  "Sold Out": "bg-line/40 text-mute",
};

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  const { isWishlisted, toggle } = useWishlist();
  const wished = isWishlisted("hotel", hotel.slug);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-line/60 bg-surface transition-shadow hover:shadow-xl hover:shadow-black/20">
      <Link href={`/hotels/${hotel.slug}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={hotel.heroImage}
            alt={hotel.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${availabilityStyles[hotel.availability]}`}>
            {hotel.availability}
          </span>
        </div>
      </Link>

      <button
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={(e) => {
          e.preventDefault();
          toggle({ type: "hotel", slug: hotel.slug, name: hotel.name, image: hotel.heroImage, subtitle: hotel.destinationName });
        }}
        className="absolute right-3 top-3 rounded-full bg-void/60 p-2 backdrop-blur transition-colors hover:bg-void/80"
      >
        <Heart size={16} className={wished ? "fill-amber text-amber" : "text-ink"} />
      </button>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-display text-lg leading-tight text-ink">{hotel.name}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-mute">
              <MapPin size={12} /> {hotel.destinationName}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-lg bg-surface2 px-2 py-1 text-xs font-semibold text-ink">
            <Star size={12} className="fill-amber text-amber" /> {hotel.reviewScore.toFixed(1)}
          </div>
        </div>

        <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-amber">
          {"★".repeat(hotel.starRating)} <span className="text-mute">Star Hotel</span>
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {hotel.amenities.slice(0, 3).map((a) => (
            <span key={a} className="rounded-full bg-surface2 px-2 py-0.5 text-[10px] text-mute">{a}</span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="text-sm text-ink">
            <span className="font-tabular text-lg font-semibold text-amber">{hotel.currency}{hotel.pricePerNight.toLocaleString("en-IN")}</span>
            <span className="text-xs text-mute"> /night</span>
          </p>
          <Link
            href={`/hotels/${hotel.slug}`}
            className="rounded-full border border-line/60 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-ink transition-colors hover:border-amber/60 hover:text-amber"
          >
            View Hotel
          </Link>
        </div>
      </div>
    </div>
  );
}
