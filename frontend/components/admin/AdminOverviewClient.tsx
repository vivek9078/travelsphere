"use client";

import { useEffect, useState } from "react";
import { MapPin, Building2, Compass, Receipt, Users, IndianRupee } from "lucide-react";
import { getAllDestinations } from "@/lib/mock-data/destinations";
import { getAllHotels } from "@/lib/mock-data/hotels";
import { getAllActivities } from "@/lib/mock-data/activities";
import { getBookings } from "@/lib/demo-booking";
import { demoUsers } from "@/lib/mock-data/users";
import type { Booking } from "@/types";

function StatCard({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-line/60 bg-surface p-5">
      <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-mute"><Icon size={13} /> {label}</p>
      <p className="mt-2 font-display text-3xl text-ink">{value}</p>
    </div>
  );
}

export default function AdminOverviewClient() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const revenue = bookings.filter((b) => b.status !== "Cancelled").reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-aqua">Overview</p>
      <h1 className="mt-2 font-display text-3xl text-ink">Admin dashboard</h1>
      <p className="mt-2 text-sm text-mute">All figures below are computed from local mock and simulated booking data.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={Receipt} label="Total bookings" value={bookings.length} />
        <StatCard icon={IndianRupee} label="Revenue" value={`₹${revenue.toLocaleString("en-IN")}`} />
        <StatCard icon={Users} label="Users" value={demoUsers.length} />
        <StatCard icon={MapPin} label="Destinations" value={getAllDestinations().length} />
        <StatCard icon={Building2} label="Hotels" value={getAllHotels().length} />
        <StatCard icon={Compass} label="Activities" value={getAllActivities().length} />
      </div>

      <div className="mt-10 rounded-xl border border-line/60 bg-surface p-5">
        <p className="font-mono text-xs uppercase tracking-widest text-mute">Recent bookings</p>
        <div className="mt-4 space-y-2">
          {bookings.slice(0, 5).map((b) => (
            <div key={b.id} className="flex items-center justify-between border-b border-line/60 pb-2 text-sm last:border-0">
              <span className="font-mono text-xs text-mute">{b.id}</span>
              <span className="text-ink">{b.itemName}</span>
              <span className="font-tabular text-amber">{b.currency}{b.totalPrice.toLocaleString("en-IN")}</span>
            </div>
          ))}
          {bookings.length === 0 && <p className="text-sm text-mute">No bookings yet.</p>}
        </div>
      </div>
    </div>
  );
}
