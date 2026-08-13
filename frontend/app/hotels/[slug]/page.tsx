import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { Star, MapPin, CheckCircle2 } from "lucide-react";
import { getAllHotels, getHotelBySlug } from "@/lib/mock-data/hotels";
import { getReviewsFor } from "@/lib/mock-data/reviews";
import ReviewList from "@/components/destinations/ReviewList";
import RoomBookingPanel from "@/components/hotels/RoomBookingPanel";
import WishlistHeartInline from "@/components/hotels/WishlistHeartInline";

export function generateStaticParams() {
  return getAllHotels().map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const h = getHotelBySlug(slug);
  if (!h) return {};
  return { title: h.name, description: h.description, openGraph: { title: h.name, images: [h.heroImage] } };
}

export default async function HotelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hotel = getHotelBySlug(slug);
  if (!hotel) notFound();

  const reviews = getReviewsFor("hotel", hotel.slug, 4);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-2xl sm:grid-cols-4 sm:grid-rows-2">
        <div className="relative col-span-2 row-span-2 h-64 sm:h-full">
          <Image src={hotel.heroImage} alt={hotel.name} fill className="object-cover" priority />
        </div>
        {hotel.gallery.slice(0, 2).map((g, i) => (
          <div key={i} className="relative hidden h-full min-h-[120px] sm:block">
            <Image src={g} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-amber">
                <MapPin size={12} /> {hotel.destinationName}, {hotel.countryName}
              </p>
              <h1 className="mt-2 font-display text-4xl text-ink">{hotel.name}</h1>
              <p className="mt-2 text-amber">{"★".repeat(hotel.starRating)}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-lg bg-surface2 px-3 py-2 text-sm font-semibold text-ink">
                <Star size={14} className="fill-amber text-amber" /> {hotel.reviewScore.toFixed(1)}
              </div>
              <WishlistHeartInline hotel={hotel} />
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/90">{hotel.description}</p>
          <p className="mt-2 text-sm text-mute">{hotel.address}</p>

          <div className="mt-8">
            <h2 className="font-display text-xl text-ink">Amenities</h2>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {hotel.amenities.map((a) => (
                <p key={a} className="flex items-center gap-2 text-sm text-ink/90">
                  <CheckCircle2 size={14} className="text-aqua" /> {a}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-xl text-ink">Traveler reviews</h2>
            <ReviewList reviews={reviews} />
          </div>
        </div>

        <RoomBookingPanel hotel={hotel} />
      </div>
    </div>
  );
}
