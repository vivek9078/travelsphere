"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPinned } from "lucide-react";
import TripPlanForm from "@/components/planner/TripPlanForm";
import TripPlanOptions from "@/components/planner/TripPlanOptions";
import { generateTripPlans } from "@/lib/trip-planner";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storage";
import type { TripPlan, TripPlanInput, TripPlanResult } from "@/types";

export default function TripPlannerFlowClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<TripPlan[] | null>(null);
  const [, setStoredResult] = useLocalStorage<TripPlanResult | null>(STORAGE_KEYS.tripPlanResult, null);

  function handleGenerate(input: TripPlanInput) {
    setLoading(true);
    setPlans(null);
    // Simulated processing delay — all data is generated locally from mock
    // templates, there is no external API call in this phase.
    setTimeout(() => {
      const generated = generateTripPlans(input);
      setPlans(generated);
      setStoredResult({ input, generatedAt: new Date().toISOString(), plans: generated });
      setLoading(false);
    }, 1200);
  }

  function handleChoose(plan: TripPlan) {
    router.push(`/trip-planner/${plan.tier}`);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <span className="inline-flex items-center gap-2 rounded-full border border-amber/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-amber">
        <MapPinned size={12} /> Trip Planner
      </span>
      <h1 className="mt-3 font-display text-4xl text-ink">Plan your trip budget</h1>
      <p className="mt-2 max-w-xl text-mute">
        Enter your destination, travel dates, and group size — we'll put together four trip plans at different budgets, from budget-friendly to luxury.
      </p>

      <TripPlanForm loading={loading} onGenerate={handleGenerate} />

      {loading && (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-72 w-full rounded-2xl" />
          ))}
        </div>
      )}

      {plans && !loading && <TripPlanOptions plans={plans} onChoose={handleChoose} />}
    </div>
  );
}
