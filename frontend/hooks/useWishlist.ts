"use client";

import { useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storage";

export type WishlistItem = {
  type: "destination" | "hotel";
  slug: string;
  name: string;
  image: string;
  subtitle: string;
};

export function useWishlist() {
  const [items, setItems, hydrated] = useLocalStorage<WishlistItem[]>(STORAGE_KEYS.wishlist, []);

  const isWishlisted = useCallback(
    (type: WishlistItem["type"], slug: string) => items.some((i) => i.type === type && i.slug === slug),
    [items]
  );

  const toggle = useCallback(
    (item: WishlistItem) => {
      setItems((prev) => {
        const exists = prev.some((i) => i.type === item.type && i.slug === item.slug);
        if (exists) return prev.filter((i) => !(i.type === item.type && i.slug === item.slug));
        return [item, ...prev];
      });
    },
    [setItems]
  );

  const remove = useCallback(
    (type: WishlistItem["type"], slug: string) => {
      setItems((prev) => prev.filter((i) => !(i.type === type && i.slug === slug)));
    },
    [setItems]
  );

  return { items, isWishlisted, toggle, remove, hydrated };
}
