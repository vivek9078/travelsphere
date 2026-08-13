import { Suspense } from "react";
import type { Metadata } from "next";
import ActivitiesClient from "@/components/activities/ActivitiesClient";
import { getAllActivities } from "@/lib/mock-data/activities";
import { getDestinationBySlug } from "@/lib/mock-data/destinations";

export const metadata: Metadata = {
  title: "Activities",
  description: "Book unforgettable experiences — from scuba diving to desert safaris.",
};

export default async function ActivitiesPage({ searchParams }: { searchParams: Promise<{ destination?: string }> }) {
  const sp = await searchParams;
  const activities = getAllActivities();
  const initialDestination = sp.destination
    ? getDestinationBySlug(sp.destination)?.name
    : undefined;

  return (
    <Suspense>
      <ActivitiesClient activities={activities} initialDestination={initialDestination} />
    </Suspense>
  );
}
