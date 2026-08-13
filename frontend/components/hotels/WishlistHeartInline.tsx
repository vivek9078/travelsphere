"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import type { Hotel } from "@/types";

export default function WishlistHeartInline({ hotel }: { hotel: Hotel }) {
  const { isWishlisted, toggle } = useWishlist();
  const wished = isWishlisted("hotel", hotel.slug);

  return (
    <button
      onClick={() => toggle({ type: "hotel", slug: hotel.slug, name: hotel.name, image: hotel.heroImage, subtitle: hotel.destinationName })}
      aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
      className="rounded-full border border-line/60 p-2.5 transition-colors hover:border-amber/60"
    >
      <Heart size={18} className={wished ? "fill-amber text-amber" : "text-ink"} />
    </button>
  );
}
