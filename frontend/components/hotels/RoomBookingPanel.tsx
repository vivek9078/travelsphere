"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Hotel } from "@/types";

function nightsBetween(a: string, b: string) {
  const start = new Date(a).getTime();
  const end = new Date(b).getTime();
  if (isNaN(start) || isNaN(end) || end <= start) return 0;
  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

export default function RoomBookingPanel({ hotel }: { hotel: Hotel }) {
  const router = useRouter();
  const [roomId, setRoomId] = useState(hotel.rooms[0]?.id ?? "");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const room = hotel.rooms.find((r) => r.id === roomId) ?? hotel.rooms[0];
  const nights = nightsBetween(checkIn, checkOut);
  const total = room ? room.pricePerNight * Math.max(nights, 1) : 0;

  function handleBook() {
    const params = new URLSearchParams({
      room: roomId,
      checkIn,
      checkOut,
      guests: String(guests),
    });
    router.push(`/booking/hotel/${hotel.slug}?${params.toString()}`);
  }

  return (
    <aside className="space-y-5 rounded-2xl border border-line/60 bg-surface p-6 lg:sticky lg:top-24 lg:h-fit">
      <p className="font-mono text-xs uppercase tracking-widest text-aqua">Book your stay</p>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Room type</p>
        <div className="mt-2 space-y-2">
          {hotel.rooms.map((r) => (
            <label
              key={r.id}
              className={`flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                roomId === r.id ? "border-amber bg-amber/5" : "border-line/60"
              }`}
            >
              <span>
                <input
                  type="radio"
                  name="room"
                  className="mr-2 accent-amber"
                  checked={roomId === r.id}
                  onChange={() => setRoomId(r.id)}
                />
                {r.name} · {r.beds}
              </span>
              <span className="font-tabular text-ink">{hotel.currency}{r.pricePerNight.toLocaleString("en-IN")}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Check-in</p>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2 text-sm text-ink outline-none [color-scheme:dark]"
          />
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Check-out</p>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2 text-sm text-ink outline-none [color-scheme:dark]"
          />
        </div>
      </div>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Guests</p>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2 text-sm text-ink outline-none"
        >
          {Array.from({ length: room?.capacity ?? 4 }).map((_, i) => (
            <option key={i} value={i + 1}>{i + 1} Guest{i > 0 ? "s" : ""}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1 border-t border-line/60 pt-4 text-sm">
        <div className="flex justify-between text-mute">
          <span>{hotel.currency}{room?.pricePerNight.toLocaleString("en-IN")} × {Math.max(nights, 1)} night{nights === 1 ? "" : "s"}</span>
          <span className="font-tabular text-ink">{hotel.currency}{total.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between font-semibold text-ink">
          <span>Total</span>
          <span className="font-tabular">{hotel.currency}{total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <button
        onClick={handleBook}
        disabled={!checkIn || !checkOut || nights <= 0}
        className="w-full rounded-full bg-amber py-3 font-mono text-xs uppercase tracking-widest text-void transition-colors hover:bg-amber-soft disabled:cursor-not-allowed disabled:opacity-40"
      >
        Reserve This Room
      </button>
      {(!checkIn || !checkOut) && <p className="text-center text-xs text-mute">Select check-in and check-out dates to continue.</p>}
      {checkIn && checkOut && nights <= 0 && <p className="text-center text-xs text-amber">Check-out must be after check-in.</p>}
    </aside>
  );
}
