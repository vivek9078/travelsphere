"use client";

import { useCallback, useEffect, useState } from "react";
import { readStorage, writeStorage } from "@/lib/storage";

type WithId = { id: string } & Record<string, unknown>;

/**
 * Generic CRUD-over-localStorage hook used by the admin panel. Seeds from
 * `seed` the first time it runs, then persists every add/update/delete to
 * localStorage under `key` — no backend or database involved.
 */
export function useAdminCollection<T extends WithId>(key: string, seed: T[]) {
  const [items, setItems] = useState<T[]>(seed);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStorage<T[]>(key, seed));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const persist = useCallback(
    (next: T[]) => {
      setItems(next);
      writeStorage(key, next);
    },
    [key]
  );

  const add = useCallback(
    (item: Omit<T, "id">) => {
      const withId = { ...item, id: `${key}-${Date.now()}` } as T;
      persist([withId, ...items]);
      return withId;
    },
    [items, key, persist]
  );

  const update = useCallback(
    (id: string, patch: Partial<T>) => {
      persist(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    },
    [items, persist]
  );

  const remove = useCallback(
    (id: string) => {
      persist(items.filter((i) => i.id !== id));
    },
    [items, persist]
  );

  const reset = useCallback(() => {
    persist(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persist]);

  return { items, add, update, remove, reset, hydrated };
}
