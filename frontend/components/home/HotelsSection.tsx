import Link from "next/link";
import HotelCard from "@/components/hotels/HotelCard";
import type { Hotel } from "@/types";

export default function HotelsSection({ hotels }: { hotels: Hotel[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-aqua">Stays</p>
          <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">Popular hotels</h2>
        </div>
        <Link href="/hotels" className="hidden font-mono text-xs uppercase tracking-widest text-mute hover:text-ink sm:block">
          View all →
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {hotels.map((h) => (
          <HotelCard key={h.slug} hotel={h} />
        ))}
      </div>
    </section>
  );
}
