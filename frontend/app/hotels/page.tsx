import { Suspense } from "react";
import type { Metadata } from "next";
import HotelsClient from "@/components/hotels/HotelsClient";
import { getAllHotels } from "@/lib/mock-data/hotels";
import { getDestinationBySlug } from "@/lib/mock-data/destinations";
import { fetchDestinations } from "@/lib/api";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Hotels",
  description: "Browse and book hotels across every TravelSphere AI destination.",
};

export default async function HotelsPage({ searchParams }: { searchParams: Promise<{ destination?: string }> }) {
  const sp = await searchParams;
  const hotels = getAllHotels();

  let initialDestination = undefined;
  if (sp.destination) {
    try {
      const allDestinations = await fetchDestinations();
      initialDestination = allDestinations.find(d => d.slug === sp.destination)?.name;
    } catch (e) {
      initialDestination = getDestinationBySlug(sp.destination)?.name;
    }
  }

  return (
    <Suspense>
      <HotelsClient hotels={hotels} initialDestination={initialDestination} />
    </Suspense>
  );
}
