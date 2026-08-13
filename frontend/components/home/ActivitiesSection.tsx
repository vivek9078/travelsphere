import Link from "next/link";
import ActivityCard from "@/components/activities/ActivityCard";
import type { Activity } from "@/types";

export default function ActivitiesSection({ activities }: { activities: Activity[] }) {
  return (
    <section className="border-y border-line/60 bg-surface/40 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-aqua">Experiences</p>
            <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">Unforgettable experiences</h2>
          </div>
          <Link href="/activities" className="hidden font-mono text-xs uppercase tracking-widest text-mute hover:text-ink sm:block">
            View all →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((a) => (
            <ActivityCard key={a.slug} activity={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
