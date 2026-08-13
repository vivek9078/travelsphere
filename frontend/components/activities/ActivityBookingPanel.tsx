"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import type { Activity } from "@/types";

export default function ActivityBookingPanel({ activity }: { activity: Activity }) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const { isWishlisted, toggle } = useWishlist();
  const wished = isWishlisted("hotel", activity.slug); // reuse generic wishlist bucket via type field below

  const total = activity.price * guests;

  function handleBook() {
    const params = new URLSearchParams({ date, guests: String(guests) });
    router.push(`/booking/activity/${activity.slug}?${params.toString()}`);
  }

  return (
    <aside className="space-y-5 rounded-2xl border border-line/60 bg-surface p-6 lg:sticky lg:top-24 lg:h-fit">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-aqua">Book this experience</p>
        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() =>
            toggle({ type: "hotel", slug: activity.slug, name: activity.name, image: activity.heroImage, subtitle: activity.destinationName })
          }
          className="rounded-full border border-line/60 p-2 transition-colors hover:border-amber/60"
        >
          <Heart size={15} className={wished ? "fill-amber text-amber" : "text-ink"} />
        </button>
      </div>

      <p className="font-tabular text-3xl text-ink">
        {activity.currency}{activity.price.toLocaleString("en-IN")}
        <span className="text-sm text-mute"> / person</span>
      </p>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Date</p>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2 text-sm text-ink outline-none [color-scheme:dark]"
        />
      </div>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Guests</p>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2 text-sm text-ink outline-none"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <option key={i} value={i + 1}>{i + 1} Guest{i > 0 ? "s" : ""}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-between border-t border-line/60 pt-4 text-sm font-semibold text-ink">
        <span>Total</span>
        <span className="font-tabular">{activity.currency}{total.toLocaleString("en-IN")}</span>
      </div>

      <button
        onClick={handleBook}
        disabled={!date}
        className="w-full rounded-full bg-amber py-3 font-mono text-xs uppercase tracking-widest text-void transition-colors hover:bg-amber-soft disabled:cursor-not-allowed disabled:opacity-40"
      >
        Reserve Now
      </button>
      {!date && <p className="text-center text-xs text-mute">Select a date to continue.</p>}
    </aside>
  );
}
