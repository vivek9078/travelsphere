"use client";

import { useCallback, useEffect, useState } from "react";
import { readStorage, writeStorage } from "@/lib/storage";

/**
 * React state synced to localStorage under `key`. Also listens for the
 * `ts-storage` custom event so multiple components/hooks watching the same
 * key stay in sync within a single tab.
 */
export function useLocalStorage<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setValue(readStorage<T>(key, fallback));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    function handler(e: Event) {
      const custom = e as CustomEvent<{ key: string }>;
      if (custom.detail?.key === key || (e as StorageEvent).key === key) {
        setValue(readStorage<T>(key, fallback));
      }
    }
    window.addEventListener("ts-storage", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("ts-storage", handler);
      window.removeEventListener("storage", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (prev: T) => T)(prev) : next;
        writeStorage(key, resolved);
        return resolved;
      });
    },
    [key]
  );

  return [value, update, hydrated] as const;
}
