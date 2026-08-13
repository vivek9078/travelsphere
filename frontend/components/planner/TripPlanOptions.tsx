"use client";

import { ArrowRight, Bus, MapPin, Plane, Train, Users } from "lucide-react";
import { formatINR } from "@/lib/utils";
import type { TripPlan } from "@/types";

const tierAccent: Record<TripPlan["tier"], string> = {
  budget: "border-line/60",
  standard: "border-aqua/40",
  premium: "border-amber/50",
  luxury: "border-amber",
};

const tierBadge: Record<TripPlan["tier"], string> = {
  budget: "bg-surface2 text-mute",
  standard: "bg-aqua/15 text-aqua",
  premium: "bg-amber/15 text-amber",
  luxury: "bg-amber text-void",
};

function TransportIcon({ mode }: { mode: TripPlan["transport"]["mode"] }) {
  if (mode === "Flight") return <Plane size={13} />;
  if (mode === "Bus") return <Bus size={13} />;
  return <Train size={13} />;
}

export default function TripPlanOptions({
  plans,
  onChoose,
}: {
  plans: TripPlan[];
  onChoose: (plan: TripPlan) => void;
}) {
  return (
    <div className="mt-12">
      <div className="border-b border-line/60 pb-6">
        <p className="font-mono text-xs uppercase tracking-widest text-aqua">Choose your plan</p>
        <h2 className="mt-1 font-display text-3xl text-ink">
          {plans[0].nights} nights in {plans[0].destination}
        </h2>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-mute">
          <Users size={14} /> {plans[0].people} {plans[0].people === 1 ? "traveler" : "travelers"} · {plans[0].days} days
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.tier}
            className={`flex flex-col rounded-2xl border bg-surface p-5 transition-shadow hover:shadow-xl hover:shadow-black/20 ${tierAccent[plan.tier]}`}
          >
            <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${tierBadge[plan.tier]}`}>
              {plan.name}
            </span>
            <p className="mt-3 text-xs text-mute">{plan.tagline}</p>

            <p className="mt-4 font-tabular text-3xl text-ink">{formatINR(plan.budgetSummary.total)}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Total estimated budget</p>

            <div className="mt-4 space-y-1.5 border-t border-line/60 pt-4 text-xs text-mute">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <TransportIcon mode={plan.transport.mode} /> Transport
                </span>
                <span className="text-ink">{formatINR(plan.budgetSummary.transportation)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Hotel ({plan.hotel.nights} nights)</span>
                <span className="text-ink">{formatINR(plan.budgetSummary.hotel)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Food</span>
                <span className="text-ink">{formatINR(plan.budgetSummary.food)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Activities</span>
                <span className="text-ink">{formatINR(plan.budgetSummary.activities)}</span>
              </div>
            </div>

            <div className="mt-4 border-t border-line/60 pt-4">
              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-mute">
                <MapPin size={12} /> Major destinations
              </p>
              <p className="mt-1.5 text-xs text-ink/90">{plan.majorDestinations.join(", ")}</p>
            </div>

            <button
              onClick={() => onChoose(plan)}
              className="mt-5 flex items-center justify-center gap-2 rounded-full border border-amber/60 py-2.5 font-mono text-xs uppercase tracking-widest text-amber transition-colors hover:bg-amber hover:text-void"
            >
              Choose Plan <ArrowRight size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
