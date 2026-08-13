import { Suspense } from "react";
import type { Metadata } from "next";
import ExploreClient from "@/components/explore/ExploreClient";
import { getAllDestinations, toDestinationCard } from "@/lib/mock-data/destinations";
import { getAllHotels } from "@/lib/mock-data/hotels";
import { getAllActivities } from "@/lib/mock-data/activities";
import { getAllCountries } from "@/lib/mock-data/countries";

export const metadata: Metadata = {
  title: "Explore",
  description: "Search and filter destinations, hotels, and activities across the world.",
};

export default function ExplorePage() {
  const destinations = getAllDestinations().map(toDestinationCard);
  const hotels = getAllHotels();
  const activities = getAllActivities();
  const regions = getAllCountries().map((c) => c.name);

  return (
    <Suspense>
      <ExploreClient destinations={destinations} hotels={hotels} activities={activities} regions={regions} />
    </Suspense>
  );
}
