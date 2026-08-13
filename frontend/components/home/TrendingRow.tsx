import DestinationCard from "@/components/home/DestinationCard";
import type { DestinationCard as DestinationCardType } from "@/types";

export default function TrendingRow({
  eyebrow,
  title,
  destinations,
}: {
  eyebrow: string;
  title: string;
  destinations: DestinationCardType[];
}) {
  if (destinations.length === 0) return null;

  return (
    <section className="border-y border-line/60 bg-surface/40 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-aqua">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">{title}</h2>
      </div>

      <div className="scroll-row mt-10 flex gap-6 overflow-x-auto px-6 pb-2">
        {destinations.map((d) => (
          <div key={d.slug} className="w-[280px] shrink-0 sm:w-[320px]">
            <DestinationCard d={d} />
          </div>
        ))}
      </div>
    </section>
  );
}
