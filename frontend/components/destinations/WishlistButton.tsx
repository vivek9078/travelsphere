"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";

export default function WishlistButton({ slug, name, image, subtitle }: { slug: string; name: string; image: string; subtitle: string }) {
  const { isWishlisted, toggle } = useWishlist();
  const wished = isWishlisted("destination", slug);

  return (
    <button
      onClick={() => toggle({ type: "destination", slug, name, image, subtitle })}
      className="flex items-center gap-2 rounded-full border border-line/60 bg-void/60 px-4 py-2 text-sm text-ink backdrop-blur transition-colors hover:border-amber/60"
    >
      <Heart size={16} className={wished ? "fill-amber text-amber" : "text-ink"} />
      {wished ? "Saved" : "Save"}
    </button>
  );
}
