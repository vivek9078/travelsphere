import { Star } from "lucide-react";
import type { Review } from "@/types";

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return <p className="mt-4 text-sm text-mute">No reviews yet.</p>;

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {reviews.map((r) => (
        <div key={r.id} className="rounded-xl border border-line/60 bg-surface p-4">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={r.avatar} alt="" className="h-9 w-9 rounded-full bg-surface2" />
            <div>
              <p className="text-sm font-medium text-ink">{r.author}</p>
              <p className="flex items-center gap-1 text-xs text-mute">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={11} className="fill-amber text-amber" />
                ))}
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-mute">{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
