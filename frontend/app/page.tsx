import Hero from "@/components/home/Hero";
import DestinationGrid from "@/components/home/DestinationGrid";
import TrendingRow from "@/components/home/TrendingRow";
import HowItWorks from "@/components/home/HowItWorks";
import HotelsSection from "@/components/home/HotelsSection";
import ActivitiesSection from "@/components/home/ActivitiesSection";
import PlannerCTA from "@/components/home/PlannerCTA";
import { getGlobeCountries } from "@/lib/mock-data/countries";
import { getDestinationCounts, getFeaturedDestinations, getTrendingDestinations } from "@/lib/mock-data/destinations";
import { getAllHotels } from "@/lib/mock-data/hotels";
import { getAllActivities } from "@/lib/mock-data/activities";

export default function HomePage() {
  const countries = getGlobeCountries(getDestinationCounts());
  const featured = getFeaturedDestinations().slice(0, 6);
  const trending = getTrendingDestinations();
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
