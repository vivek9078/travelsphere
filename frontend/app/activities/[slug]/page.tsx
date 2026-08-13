import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { Star, Clock, MapPin, CheckCircle2, Gauge } from "lucide-react";
import { getAllActivities, getActivityBySlug } from "@/lib/mock-data/activities";
import { getReviewsFor } from "@/lib/mock-data/reviews";
import ReviewList from "@/components/destinations/ReviewList";
import ActivityBookingPanel from "@/components/activities/ActivityBookingPanel";

export function generateStaticParams() {
  return getAllActivities().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getActivityBySlug(slug);
  if (!a) return {};
  return { title: a.name, description: a.description, openGraph: { title: a.name, images: [a.heroImage] } };
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);
  if (!activity) notFound();

  const reviews = getReviewsFor("activity", activity.slug, 4);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="relative h-72 w-full overflow-hidden rounded-2xl sm:h-96">
        <Image src={activity.heroImage} alt={activity.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-void/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-amber backdrop-blur">
          {activity.category}
        </span>
      </div>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-amber">
            <MapPin size={12} /> {activity.destinationName}
          </p>
          <h1 className="mt-2 font-display text-4xl text-ink">{activity.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-mute">
            <span className="flex items-center gap-1"><Star size={14} className="fill-amber text-amber" /> {activity.rating.toFixed(1)} ({activity.reviewCount.toLocaleString()} reviews)</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {activity.duration}</span>
            <span className="flex items-center gap-1"><Gauge size={14} /> {activity.difficulty}</span>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/90">{activity.description}</p>

          <div className="mt-8">
            <h2 className="font-display text-xl text-ink">Highlights</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {activity.highlights.map((h) => (
                <span key={h} className="rounded-full border border-line/60 px-3 py-1.5 text-sm text-ink/90">{h}</span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl text-ink">What's included</h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {activity.included.map((i) => (
                <p key={i} className="flex items-center gap-2 text-sm text-ink/90">
                  <CheckCircle2 size={14} className="text-aqua" /> {i}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-xl text-ink">Traveler reviews</h2>
            <ReviewList reviews={reviews} />
          </div>
        </div>

        <ActivityBookingPanel activity={activity} />
      </div>
    </div>
  );
}
