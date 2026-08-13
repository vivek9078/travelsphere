import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Star, Cloud, Wallet, CalendarDays, ShieldCheck } from "lucide-react";
import { getAllDestinations, getDestinationBySlug, getAllDestinations as getAll } from "@/lib/mock-data/destinations";
import { getHotelsByDestination } from "@/lib/mock-data/hotels";
import { getActivitiesByDestination } from "@/lib/mock-data/activities";
import { getReviewsFor } from "@/lib/mock-data/reviews";
import HotelCard from "@/components/hotels/HotelCard";
import ActivityCard from "@/components/activities/ActivityCard";
import DestinationCard from "@/components/home/DestinationCard";
import WishlistButton from "@/components/destinations/WishlistButton";
import ReviewList from "@/components/destinations/ReviewList";
import { toDestinationCard } from "@/lib/mock-data/destinations";

export function generateStaticParams() {
  return getAllDestinations().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestinationBySlug(slug);
  if (!d) return {};
  return {
    title: `${d.name} Travel Guide — Things to Do, Hotels & Best Season`,
    description: d.overview,
    openGraph: { title: d.name, images: [d.heroImage] },
  };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDestinationBySlug(slug);
  if (!d) notFound();

  const hotels = getHotelsByDestination(d.slug);
  const activities = getActivitiesByDestination(d.slug);
  const reviews = getReviewsFor("destination", d.slug, 4);
  const nearby = getAll()
    .filter((n) => n.slug !== d.slug && n.countrySlug === d.countrySlug)
    .slice(0, 3)
    .map(toDestinationCard);
  const nearbyFallback = nearby.length > 0
    ? nearby
    : getAll().filter((n) => n.slug !== d.slug).slice(0, 3).map(toDestinationCard);

  return (
    <>
      <section className="relative h-[52vh] min-h-[380px] w-full overflow-hidden">
        <Image src={d.heroImage} alt={d.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/10" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto flex max-w-7xl items-end justify-between px-6 pb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-amber">
              <Link href={`/country/${d.countrySlug}`} className="hover:underline">{d.countryName}</Link>
            </p>
            <h1 className="mt-2 font-display text-5xl text-ink">{d.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-ink/90">
              <Star size={15} className="fill-amber text-amber" />
              {d.rating.toFixed(1)} · {d.reviewCount.toLocaleString()} reviews
            </div>
          </div>
          <WishlistButton slug={d.slug} name={d.name} image={d.heroImage} subtitle={d.countryName} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-ink/90">{d.overview}</p>

            <div className="mt-10">
              <h2 className="font-display text-2xl text-ink">Highlights</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {d.highlights.map((h) => (
                  <span key={h} className="rounded-full border border-line/60 px-4 py-2 text-sm text-ink/90">{h}</span>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-xl text-ink">Top attractions</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-mute">
                  {d.topAttractions.map((a) => <li key={a}>— {a}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-xl text-ink">Things to do</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-mute">
                  {d.thingsToDo.map((a) => <li key={a}>— {a}</li>)}
                </ul>
              </div>
            </div>

            {hotels.length > 0 && (
              <div className="mt-14">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl text-ink">Where to stay</h2>
                  <Link href={`/hotels?destination=${d.slug}`} className="font-mono text-xs uppercase tracking-widest text-mute hover:text-ink">
                    All hotels →
                  </Link>
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {hotels.map((h) => <HotelCard key={h.slug} hotel={h} />)}
                </div>
              </div>
            )}

            {activities.length > 0 && (
              <div className="mt-14">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl text-ink">Things to do & book</h2>
                  <Link href={`/activities?destination=${d.slug}`} className="font-mono text-xs uppercase tracking-widest text-mute hover:text-ink">
                    All activities →
                  </Link>
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {activities.map((a) => <ActivityCard key={a.slug} activity={a} />)}
                </div>
              </div>
            )}

            <div className="mt-14">
              <h2 className="font-display text-2xl text-ink">Traveler reviews</h2>
              <ReviewList reviews={reviews} />
            </div>

            {nearbyFallback.length > 0 && (
              <div className="mt-14">
                <h2 className="font-display text-2xl text-ink">Nearby destinations</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-3">
                  {nearbyFallback.map((n) => <DestinationCard key={n.slug} d={n} />)}
                </div>
              </div>
            )}

            <div className="mt-14 rounded-2xl border border-line/60 bg-surface p-6">
              <h2 className="font-display text-xl text-ink">Frequently asked questions</h2>
              <div className="mt-4 divide-y divide-line/60">
                {d.faqs.map((f) => (
                  <details key={f.question} className="group py-4">
                    <summary className="cursor-pointer list-none font-medium text-ink marker:content-none">
                      {f.question}
                    </summary>
                    <p className="mt-2 text-sm text-mute">{f.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6 rounded-2xl border border-line/60 bg-surface p-6 lg:sticky lg:top-24 lg:h-fit">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-aqua">Weather now (simulated)</p>
              <div className="mt-2 flex items-center gap-3">
                <Cloud size={28} className="text-aqua" />
                <div>
                  <p className="font-display text-2xl text-ink">{d.weather.temperature}°C</p>
                  <p className="text-xs text-mute">{d.weather.condition} · {d.weather.humidity}% humidity</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-line/60 pt-4">
              <div>
                <p className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-mute"><CalendarDays size={12}/> Best season</p>
                <p className="mt-1 text-sm text-ink">{d.bestSeason}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Trip duration</p>
                <p className="mt-1 text-sm text-ink">{d.tripDuration}</p>
              </div>
              <div>
                <p className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-mute"><Wallet size={12}/> Avg. budget</p>
                <p className="mt-1 text-sm text-ink">{d.avgBudget}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Est. trip cost</p>
                <p className="mt-1 text-sm text-ink">From ₹{d.priceFrom.toLocaleString("en-IN")}</p>
              </div>
            </div>

            <div className="border-t border-line/60 pt-4">
              <p className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-mute"><ShieldCheck size={12}/> Safety</p>
              <p className="mt-1 text-sm text-ink">{d.safety}</p>
            </div>

            <div className="border-t border-line/60 pt-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Travel tips</p>
              <ul className="mt-2 space-y-1 text-sm text-ink/90">
                {d.travelTips.map((t) => <li key={t}>— {t}</li>)}
              </ul>
            </div>

            <Link
              href={`/plan?destination=${encodeURIComponent(d.name)}`}
              className="block rounded-full bg-amber py-3 text-center font-mono text-xs uppercase tracking-widest text-void transition-colors hover:bg-amber-soft"
            >
              Plan a trip here with AI
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
