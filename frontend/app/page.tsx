import Hero from "@/components/home/Hero";
import DestinationGrid from "@/components/home/DestinationGrid";
import TrendingRow from "@/components/home/TrendingRow";
import HowItWorks from "@/components/home/HowItWorks";
import HotelsSection from "@/components/home/HotelsSection";
import ActivitiesSection from "@/components/home/ActivitiesSection";
import PlannerCTA from "@/components/home/PlannerCTA";
import { getGlobeCountries } from "@/lib/mock-data/countries";
import { getDestinationCounts, getFeaturedDestinations, getTrendingDestinations, toDestinationCard } from "@/lib/mock-data/destinations";
import { getAllHotels } from "@/lib/mock-data/hotels";
import { getAllActivities } from "@/lib/mock-data/activities";
import { fetchDestinations } from "@/lib/api";
import type { Destination } from "@/types";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let allDestinations: Destination[] = [];
  try {
    allDestinations = await fetchDestinations();
  } catch (e) {
    // Fallback to local mock data if the API is down
    allDestinations = [];
  }

  // Derive the required lists from fetched data or fallback to mock functions
  const counts = allDestinations.length > 0
    ? allDestinations.reduce((acc: Record<string, number>, d) => {
        acc[d.countrySlug] = (acc[d.countrySlug] ?? 0) + 1;
        return acc;
      }, {})
    : getDestinationCounts();

  const countries = getGlobeCountries(counts);

  const featured = allDestinations.length > 0
    ? allDestinations.filter((d) => d.isFeatured).map(toDestinationCard).slice(0, 6)
    : getFeaturedDestinations().slice(0, 6);

  const trending = allDestinations.length > 0
    ? allDestinations.filter((d) => d.isTrending).map(toDestinationCard)
    : getTrendingDestinations();
  const hotels = getAllHotels().slice(0, 4);
  const activities = getAllActivities().slice(0, 4);

  return (
    <>
      <Hero countries={countries} />
      <DestinationGrid id="featured" eyebrow="Handpicked" title="Featured destinations" destinations={featured} />
      <HowItWorks />
      <TrendingRow eyebrow="Right now" title="Trending this season" destinations={trending} />
      <HotelsSection hotels={hotels} />
      <ActivitiesSection activities={activities} />
      <PlannerCTA />
    </>
  );
}
