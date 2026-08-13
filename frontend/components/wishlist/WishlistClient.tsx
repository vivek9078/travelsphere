"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";

export default function WishlistClient() {
  const { items, remove, hydrated } = useWishlist();

  if (hydrated && items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-6 text-center">
        <Heart size={40} className="text-mute" />
        <h1 className="mt-4 font-display text-2xl text-ink">Your wishlist is empty</h1>
        <p className="mt-2 text-sm text-mute">Tap the heart icon on any destination or hotel to save it here.</p>
        <Link href="/explore" className="mt-6 rounded-full bg-amber px-6 py-3 font-mono text-xs uppercase tracking-widest text-void hover:bg-amber-soft">
          Start exploring
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <p className="font-mono text-xs uppercase tracking-widest text-aqua">Saved</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Your wishlist</h1>
      <p className="mt-2 text-sm text-mute">{items.length} saved item{items.length === 1 ? "" : "s"} · stored locally on this device</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={`${item.type}-${item.slug}`} className="flex items-center gap-4 rounded-2xl border border-line/60 bg-surface p-3">
            <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
              {item.image ? (
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              ) : (
                <div className="h-full w-full bg-surface2" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-lg text-ink">{item.name}</p>
              <p className="text-xs text-mute">{item.subtitle}</p>
              <Link
                href={item.type === "destination" ? `/destinations/${item.slug}` : `/hotels/${item.slug}`}
                className="mt-1 inline-block font-mono text-[10px] uppercase tracking-widest text-amber hover:underline"
              >
                View →
              </Link>
            </div>
            <button
              aria-label="Remove from wishlist"
              onClick={() => remove(item.type, item.slug)}
              className="shrink-0 rounded-full p-2 text-mute transition-colors hover:bg-surface2 hover:text-amber"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
