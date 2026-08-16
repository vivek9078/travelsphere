import type { MetadataRoute } from "next";
import { getAllDestinations } from "@/lib/mock-data/destinations";
import { getAllCountries } from "@/lib/mock-data/countries";
import { getAllHotels } from "@/lib/mock-data/hotels";
import { getAllActivities } from "@/lib/mock-data/activities";
import { fetchDestinations } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://travelsphere.ai";
  const staticRoutes = ["", "/explore", "/hotels", "/activities", "/plan", "/login", "/signup"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));

  let allDestinations = [];
  try {
    allDestinations = await fetchDestinations();
  } catch (error) {
    allDestinations = getAllDestinations();
  }

  const destinationRoutes = allDestinations.map((d) => ({ url: `${base}/destinations/${d.slug}`, lastModified: new Date() }));
  const countryRoutes = getAllCountries().map((c) => ({ url: `${base}/country/${c.slug}`, lastModified: new Date() }));
  const hotelRoutes = getAllHotels().map((h) => ({ url: `${base}/hotels/${h.slug}`, lastModified: new Date() }));
  const activityRoutes = getAllActivities().map((a) => ({ url: `${base}/activities/${a.slug}`, lastModified: new Date() }));

  return [...staticRoutes, ...destinationRoutes, ...countryRoutes, ...hotelRoutes, ...activityRoutes];
}
