import { Suspense } from "react";
import type { Metadata } from "next";
import ActivitiesClient from "@/components/activities/ActivitiesClient";
import { getAllActivities } from "@/lib/mock-data/activities";
import { getDestinationBySlug } from "@/lib/mock-data/destinations";
import { fetchDestinations } from "@/lib/api";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Activities",
  description: "Book unforgettable experiences — from scuba diving to desert safaris.",
};

export default async function ActivitiesPage({ searchParams }: { searchParams: Promise<{ destination?: string }> }) {
  const sp = await searchParams;
  const activities = getAllActivities();

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
      <ActivitiesClient activities={activities} initialDestination={initialDestination} />
    </Suspense>
  );
}
