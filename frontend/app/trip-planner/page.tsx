import { Suspense } from "react";
import type { Metadata } from "next";
import TripPlannerFlowClient from "@/components/planner/TripPlannerFlowClient";

export const metadata: Metadata = {
  title: "Trip Planner",
  description: "Generate budget, standard, premium, and luxury trip plans for your next trip.",
};

export default function TripPlannerPage() {
  return (
    <Suspense>
      <TripPlannerFlowClient />
    </Suspense>
  );
}
