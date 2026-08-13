"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Bell, Heart, LogOut, MapPin, Package, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/useWishlist";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getBookings, cancelBooking } from "@/lib/demo-booking";
import { defaultNotifications } from "@/lib/mock-data/notifications";
import { STORAGE_KEYS } from "@/lib/storage";
import type { Booking, NotificationItem } from "@/types";

const statusStyles: Record<Booking["status"], string> = {
  Confirmed: "bg-aqua/15 text-aqua",
  Pending: "bg-amber/15 text-amber",
  Cancelled: "bg-line/40 text-mute",
  Completed: "bg-surface2 text-ink",
};

export default function DashboardClient() {
  const router = useRouter();
  const { session, hydrated, logout } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const [notifications, setNotifications] = useLocalStorage<NotificationItem[]>(STORAGE_KEYS.notifications, defaultNotifications);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tab, setTab] = useState<"trips" | "notifications">("trips");

  useEffect(() => {
    if (hydrated && !session) router.replace("/login");
  }, [hydrated, session, router]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  if (!hydrated || !session) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="skeleton h-32 w-full rounded-2xl" />
      </div>
    );
  }

  const now = Date.now();
  const upcoming = bookings.filter((b) => b.status !== "Cancelled" && new Date(b.checkIn).getTime() >= now);
  const past = bookings.filter((b) => b.status === "Completed" || new Date(b.checkIn).getTime() < now);
  const unreadCount = notifications.filter((n) => !n.read).length;

  function handleCancel(id: string) {
    cancelBooking(id);
    setBookings(getBookings());
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex flex-col items-start gap-6 rounded-2xl border border-line/60 bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={session.avatar} alt="" className="h-16 w-16 rounded-full bg-surface2" />
          <div>
            <p className="font-display text-2xl text-ink">{session.name}</p>
            <p className="text-sm text-mute">{session.role}</p>
            <p className="text-xs text-mute">{session.email}</p>
          </div>
        </div>
        <button
          onClick={() => { logout(); router.push("/"); }}
          className="flex items-center gap-2 rounded-full border border-line/60 px-4 py-2 font-mono text-xs uppercase tracking-widest text-mute hover:border-amber/60 hover:text-ink"
        >
          <LogOut size={14} /> Sign out
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-line/60 bg-surface p-4">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-mute"><Package size={12} /> Bookings</p>
          <p className="mt-1 font-display text-2xl text-ink">{bookings.length}</p>
        </div>
        <div className="rounded-xl border border-line/60 bg-surface p-4">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-mute"><Heart size={12} /> Wishlist</p>
          <p className="mt-1 font-display text-2xl text-ink">{wishlistItems.length}</p>
        </div>
        <div className="rounded-xl border border-line/60 bg-surface p-4">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-mute"><Bell size={12} /> Notifications</p>
          <p className="mt-1 font-display text-2xl text-ink">{unreadCount} unread</p>
        </div>
      </div>

      <div className="mt-8 flex gap-2 border-b border-line/60">
        <button onClick={() => setTab("trips")} className={`border-b-2 px-4 py-3 font-mono text-xs uppercase tracking-widest ${tab === "trips" ? "border-amber text-ink" : "border-transparent text-mute"}`}>My Trips</button>
        <button onClick={() => setTab("notifications")} className={`border-b-2 px-4 py-3 font-mono text-xs uppercase tracking-widest ${tab === "notifications" ? "border-amber text-ink" : "border-transparent text-mute"}`}>Notifications</button>
      </div>

      {tab === "trips" && (
        <div className="mt-6 space-y-10">
          <div>
            <h2 className="font-display text-xl text-ink">Upcoming</h2>
            {upcoming.length === 0 ? (
              <p className="mt-3 text-sm text-mute">No upcoming trips. <Link href="/explore" className="text-amber hover:underline">Explore destinations →</Link></p>
            ) : (
              <div className="mt-4 space-y-3">
                {upcoming.map((b) => <BookingRow key={b.id} booking={b} onCancel={handleCancel} />)}
              </div>
            )}
          </div>
          <div>
            <h2 className="font-display text-xl text-ink">Past trips</h2>
            {past.length === 0 ? (
              <p className="mt-3 text-sm text-mute">No past trips yet.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {past.map((b) => <BookingRow key={b.id} booking={b} onCancel={handleCancel} readOnly />)}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "notifications" && (
        <div className="mt-6">
          <div className="flex justify-end">
            <button onClick={markAllRead} className="font-mono text-[10px] uppercase tracking-widest text-mute hover:text-ink">Mark all as read</button>
          </div>
          <div className="mt-3 space-y-2">
            {notifications.map((n) => (
              <div key={n.id} className={`rounded-xl border p-4 ${n.read ? "border-line/60 bg-surface" : "border-amber/40 bg-amber/5"}`}>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-ink">{n.title}</p>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-amber" />}
                </div>
                <p className="mt-1 text-sm text-mute">{n.message}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-mute">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BookingRow({ booking, onCancel, readOnly }: { booking: Booking; onCancel: (id: string) => void; readOnly?: boolean }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-line/60 bg-surface p-3">
      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
        <Image src={booking.image} alt={booking.itemName} fill className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-ink">{booking.itemName}</p>
        <p className="flex items-center gap-1 text-xs text-mute"><MapPin size={11} /> {booking.destinationName}</p>
        <p className="text-xs text-mute">{booking.checkIn}{booking.checkOut ? ` → ${booking.checkOut}` : ""} · {booking.guests} guest{booking.guests > 1 ? "s" : ""}</p>
      </div>
      <div className="shrink-0 text-right">
        <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${statusStyles[booking.status]}`}>{booking.status}</span>
        <p className="mt-1 font-tabular text-sm text-ink">{booking.currency}{booking.totalPrice.toLocaleString("en-IN")}</p>
      </div>
      {!readOnly && booking.status === "Confirmed" && (
        <button aria-label="Cancel booking" onClick={() => onCancel(booking.id)} className="shrink-0 rounded-full p-2 text-mute hover:bg-surface2 hover:text-amber">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
