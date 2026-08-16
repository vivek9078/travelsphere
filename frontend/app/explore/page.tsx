import { Suspense } from "react";
import type { Metadata } from "next";
import ExploreClient from "@/components/explore/ExploreClient";
import { getAllDestinations, toDestinationCard } from "@/lib/mock-data/destinations";
import { getAllHotels } from "@/lib/mock-data/hotels";
import { getAllActivities } from "@/lib/mock-data/activities";
import { getAllCountries } from "@/lib/mock-data/countries";
import { fetchDestinations } from "@/lib/api";

export const metadata: Metadata = {
  title: "Explore",
  description: "Search and filter destinations, hotels, and activities across the world.",
};

export const dynamic = 'force-dynamic';

export default async function ExplorePage() {
  let destinations;
  try {
    const rawDestinations = await fetchDestinations();
    destinations = rawDestinations.map(toDestinationCard);
  } catch (error) {
    // Fallback to local mock data if the API is down
    destinations = getAllDestinations().map(toDestinationCard);
  }

  const hotels = getAllHotels();
  const activities = getAllActivities();
  const regions = getAllCountries().map((c) => c.name);

  return (
    <Suspense>
      <ExploreClient destinations={destinations} hotels={hotels} activities={activities} regions={regions} />
    </Suspense>
  );
}
