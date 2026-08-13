"use client";

import { useCallback, useEffect, useState } from "react";
import { readStorage, writeStorage, STORAGE_KEYS } from "@/lib/storage";

export type Theme = "dark" | "light";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStorage<Theme>(STORAGE_KEYS.theme, "dark");
    setThemeState(stored);
    document.documentElement.classList.toggle("light", stored === "light");
    document.documentElement.classList.toggle("dark", stored === "dark");
    setHydrated(true);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    writeStorage(STORAGE_KEYS.theme, next);
    document.documentElement.classList.toggle("light", next === "light");
    document.documentElement.classList.toggle("dark", next === "dark");
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return { theme, setTheme, toggle, hydrated };
}
