import DestinationCard from "@/components/home/DestinationCard";
import type { DestinationCard as DestinationCardType } from "@/types";

export default function DestinationGrid({
  id,
  eyebrow,
  title,
  destinations,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  destinations: DestinationCardType[];
}) {
  if (destinations.length === 0) return null;

  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-aqua">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">{title}</h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d) => (
          <DestinationCard key={d.slug} d={d} />
        ))}
      </div>
    </section>
  );
}
