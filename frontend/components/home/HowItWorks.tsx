const steps = [
  {
    label: "01 — Explore",
    title: "Spin the globe",
    copy: "Browse by country, region, or destination — filter by budget, season, or travel style.",
  },
  {
    label: "02 — Plan",
    title: "Let AI build your itinerary",
    copy: "Tell us your dates, budget, and interests — get a full day-by-day plan in seconds.",
  },
  {
    label: "03 — Book",
    title: "Reserve hotels & experiences",
    copy: "Compare stays and activities side by side, then book directly in the app.",
  },
  {
    label: "04 — Travel",
    title: "Everything in one dashboard",
    copy: "Manage bookings, save favorites, and track upcoming trips in your account.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-line/60 bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="font-mono text-xs uppercase tracking-widest text-aqua">How it works</p>
        <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
          From inspiration to itinerary, in one place.
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.label}>
              <p className="font-mono text-xs uppercase tracking-widest text-amber">{s.label}</p>
              <p className="mt-2 font-display text-xl text-ink">{s.title}</p>
              <p className="mt-2 text-sm text-mute">{s.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
