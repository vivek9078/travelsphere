import { Suspense } from "react";
import type { Metadata } from "next";
import TripPlannerClient from "@/components/planner/TripPlannerClient";

export const metadata: Metadata = {
  title: "AI Trip Planner",
  description: "Generate a personalized day-by-day itinerary in seconds.",
};

export default function PlanPage() {
  return (
    <Suspense>
      <TripPlannerClient />
    </Suspense>
  );
}
