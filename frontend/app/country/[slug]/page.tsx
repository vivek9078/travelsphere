import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllCountries, getCountryBySlug } from "@/lib/mock-data/countries";
import { getDestinationsByCountry } from "@/lib/mock-data/destinations";

export function generateStaticParams() {
  return getAllCountries().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return {};
  return {
    title: `${country.name} Travel Guide`,
    description: country.description,
    openGraph: { title: `${country.name} Travel Guide`, images: [country.heroImage] },
  };
}

function Fact({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-mute">{label}</p>
      <p className="mt-1 text-sm text-ink">{value}</p>
    </div>
  );
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  const destinations = getDestinationsByCountry(country.slug);

  return (
    <>
      <section className="relative h-[46vh] min-h-[340px] w-full overflow-hidden">
        <Image src={country.heroImage} alt={country.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/10" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-6 pb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-amber">
            {country.isoCode} · {destinations.length} destination{destinations.length === 1 ? "" : "s"}
          </p>
          <h1 className="mt-2 font-display text-5xl text-ink">{country.name}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-ink/90">{country.description}</p>

            {destinations.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl text-ink">Destinations in {country.name}</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {destinations.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/destinations/${d.slug}`}
                      className="group overflow-hidden rounded-xl border border-line/60 bg-surface"
                    >
                      <div className="relative h-40 w-full">
                        <Image
                          src={d.heroImage}
                          alt={d.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="px-4 py-3">
                        <p className="font-display text-lg text-ink">{d.name}</p>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-mute">
                          {d.tripDuration} · {d.bestSeason}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-xl text-ink">Local foods to try</h3>
                <ul className="mt-3 space-y-1 text-sm text-mute">
                  {country.localFoods.map((f) => (
                    <li key={f}>— {f}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-xl text-ink">Festivals</h3>
                <ul className="mt-3 space-y-1 text-sm text-mute">
                  {country.festivals.map((f) => (
                    <li key={f}>— {f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="space-y-6 rounded-2xl border border-line/60 bg-surface p-6 lg:sticky lg:top-24 lg:h-fit">
            <p className="font-mono text-xs uppercase tracking-widest text-aqua">Trip facts</p>
            <div className="grid grid-cols-2 gap-4">
              <Fact label="Currency" value={country.currency} />
              <Fact label="Language" value={country.language} />
              <Fact label="Timezone" value={country.timezone} />
              <Fact label="Best season" value={country.bestSeason} />
              <Fact label="Avg. budget" value={country.avgBudget} />
              <Fact label="Climate" value={country.climate} />
            </div>

            <div className="border-t border-line/60 pt-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Visa</p>
              <p className="mt-1 text-sm text-ink">{country.visaInfo}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
