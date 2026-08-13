import type { Metadata } from "next";
import BookingsManager from "@/components/admin/BookingsManager";

export const metadata: Metadata = { title: "Admin — Bookings" };

export default function AdminBookingsPage() {
  return <BookingsManager />;
}
