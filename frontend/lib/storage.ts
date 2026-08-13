// Thin, SSR-safe wrapper around localStorage. Every read/write is guarded so
// nothing ever throws during server rendering or in environments where
// localStorage is unavailable (private browsing, embedded webviews, etc).

export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    // Notify listeners in the same tab (the native "storage" event only fires
    // for other tabs), so hooks subscribed to this key can update instantly.
    window.dispatchEvent(new CustomEvent("ts-storage", { detail: { key } }));
  } catch {
    // Storage full or unavailable — fail silently, UI keeps working in-memory.
  }
}

export function removeStorage(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
    window.dispatchEvent(new CustomEvent("ts-storage", { detail: { key } }));
  } catch {
    // ignore
  }
}

export const STORAGE_KEYS = {
  session: "ts_session",
  wishlist: "ts_wishlist",
  bookings: "ts_bookings",
  notifications: "ts_notifications",
  theme: "ts_theme",
  adminDestinations: "ts_admin_destinations",
  adminHotels: "ts_admin_hotels",
  adminActivities: "ts_admin_activities",
  adminBookings: "ts_admin_bookings",
  tripPlanResult: "ts_trip_plan_result",
} as const;
