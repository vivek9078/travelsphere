import { Suspense } from "react";
import type { Metadata } from "next";
import HotelsClient from "@/components/hotels/HotelsClient";
import { getAllHotels } from "@/lib/mock-data/hotels";
import { getDestinationBySlug } from "@/lib/mock-data/destinations";

export const metadata: Metadata = {
  title: "Hotels",
  description: "Browse and book hotels across every TravelSphere AI destination.",
};

export default async function HotelsPage({ searchParams }: { searchParams: Promise<{ destination?: string }> }) {
  const sp = await searchParams;
  const hotels = getAllHotels();
  const initialDestination = sp.destination
    ? getDestinationBySlug(sp.destination)?.name
    : undefined;

  return (
    <Suspense>
      <HotelsClient hotels={hotels} initialDestination={initialDestination} />
    </Suspense>
  );
}
