import GlobeLoader from "@/components/globe/GlobeLoader";
import TravelSearchBar from "@/components/home/TravelSearchBar";
import type { GlobeCountry } from "@/types";

export default function Hero({ countries }: { countries: GlobeCountry[] }) {
  return (
    <section className="relative overflow-hidden bg-void">
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />
      <div className="relative mx-auto max-w-7xl px-6 pt-16 lg:pt-20">
        <p className="font-mono text-xs uppercase tracking-widest text-aqua">
          {countries.reduce((sum, c) => sum + c.destinationCount, 0)}+ destinations · AI-planned itineraries
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-5xl leading-[1.05] text-ink sm:text-6xl">
          Explore the World.
          <br />
          <span className="italic text-amber">Your Way.</span>
        </h1>
        <p className="mt-6 max-w-md text-base text-mute">
          Discover extraordinary destinations, unforgettable stays, and experiences
          designed around the way you travel.
        </p>

        <div className="max-w-3xl">
          <TravelSearchBar />
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-7xl px-6 pb-4">
        <GlobeLoader countries={countries} />
      </div>
    </section>
  );
}
