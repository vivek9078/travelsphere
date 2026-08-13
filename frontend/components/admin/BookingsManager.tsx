"use client";

import { useEffect, useState } from "react";
import { getBookings } from "@/lib/demo-booking";
import { writeStorage, STORAGE_KEYS } from "@/lib/storage";
import type { Booking } from "@/types";

const statuses: Booking["status"][] = ["Confirmed", "Pending", "Cancelled", "Completed"];

const statusStyles: Record<Booking["status"], string> = {
  Confirmed: "bg-aqua/15 text-aqua",
  Pending: "bg-amber/15 text-amber",
  Cancelled: "bg-line/40 text-mute",
  Completed: "bg-surface2 text-ink",
};

export default function BookingsManager() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState<"All" | Booking["status"]>("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  function updateStatus(id: string, status: Booking["status"]) {
    const next = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(next);
    writeStorage(STORAGE_KEYS.bookings, next);
  }

  const filtered = bookings.filter((b) => {
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    const matchesQuery = query
      ? b.id.toLowerCase().includes(query.toLowerCase()) || b.itemName.toLowerCase().includes(query.toLowerCase())
      : true;
    return matchesStatus && matchesQuery;
  });

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-aqua">Manage</p>
      <h1 className="mt-2 font-display text-3xl text-ink">Bookings</h1>

      <div className="mt-6 flex flex-wrap gap-3">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search booking ID or item…" className="rounded-full border border-line/60 bg-surface px-4 py-2.5 text-sm text-ink outline-none focus-visible:border-amber" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)} className="rounded-full border border-line/60 bg-surface px-4 py-2.5 text-xs text-ink outline-none">
          <option>All</option>
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-line/60">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-mute">
            <tr>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest">Booking ID</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest">Item</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest">Destination</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest">Amount</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="border-t border-line/60 bg-surface/60">
                <td className="px-4 py-3 font-mono text-xs text-ink">{b.id}</td>
                <td className="px-4 py-3 text-ink">{b.itemName}</td>
                <td className="px-4 py-3 text-mute">{b.destinationName}</td>
                <td className="px-4 py-3 font-tabular text-ink">{b.currency}{b.totalPrice.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3">
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b.id, e.target.value as Booking["status"])}
                    className={`rounded-full border-0 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest outline-none ${statusStyles[b.status]}`}
                  >
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-6 text-center text-sm text-mute">No bookings found.</p>}
      </div>
    </div>
  );
}
