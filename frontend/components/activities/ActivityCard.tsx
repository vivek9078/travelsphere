import Image from "next/image";
import Link from "next/link";
import { Star, Clock } from "lucide-react";
import type { Activity } from "@/types";

export default function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <Link
      href={`/activities/${activity.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line/60 bg-surface transition-shadow hover:shadow-xl hover:shadow-black/20"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={activity.heroImage}
          alt={activity.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-void/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-amber backdrop-blur">
          {activity.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="font-display text-base leading-snug text-ink">{activity.name}</p>
        <p className="mt-1 text-xs text-mute">{activity.destinationName}</p>

        <div className="mt-3 flex items-center gap-3 text-xs text-mute">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {activity.duration}
          </span>
          <span className="flex items-center gap-1">
            <Star size={12} className="fill-amber text-amber" /> {activity.rating.toFixed(1)} ({activity.reviewCount})
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="font-tabular text-base font-semibold text-amber">
            {activity.currency}{activity.price.toLocaleString("en-IN")}
          </p>
          <span className="font-mono text-[10px] uppercase tracking-widest text-mute group-hover:text-amber">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
