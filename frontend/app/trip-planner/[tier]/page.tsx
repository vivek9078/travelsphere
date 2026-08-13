import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TripPlanDetailClient from "@/components/planner/TripPlanDetailClient";
import type { TripPlanTierId } from "@/types";

const validTiers: TripPlanTierId[] = ["budget", "standard", "premium", "luxury"];

export function generateStaticParams() {
  return validTiers.map((tier) => ({ tier }));
}

export const metadata: Metadata = {
  title: "Trip Plan Details",
  description: "Transportation, hotel, destinations, activities, food, and budget summary for your selected trip plan.",
};

export default async function TripPlanDetailPage({ params }: { params: Promise<{ tier: string }> }) {
  const { tier } = await params;
  if (!validTiers.includes(tier as TripPlanTierId)) notFound();

  return <TripPlanDetailClient tier={tier as TripPlanTierId} />;
}
