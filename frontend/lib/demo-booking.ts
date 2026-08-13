import type { Booking } from "@/types";
import { seedBookings } from "@/lib/mock-data/bookings";
import { readStorage, writeStorage, STORAGE_KEYS } from "@/lib/storage";

export function getBookings(): Booking[] {
  return readStorage<Booking[]>(STORAGE_KEYS.bookings, seedBookings);
}

function generateBookingId(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 89999);
  return `TS-${year}-${rand}`;
}

export function createBooking(input: Omit<Booking, "id" | "createdAt" | "status">): Booking {
  const bookings = getBookings();
  const booking: Booking = {
    ...input,
    id: generateBookingId(),
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  };
  writeStorage(STORAGE_KEYS.bookings, [booking, ...bookings]);
  return booking;
}

export function cancelBooking(id: string): void {
  const bookings = getBookings().map((b) => (b.id === id ? { ...b, status: "Cancelled" as const } : b));
  writeStorage(STORAGE_KEYS.bookings, bookings);
}

export function getBookingById(id: string): Booking | undefined {
  return getBookings().find((b) => b.id === id);
}
