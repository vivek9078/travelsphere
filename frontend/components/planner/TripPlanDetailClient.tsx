"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bus,
  Clock,
  MapPin,
  Plane,
  Ticket,
  Train,
  Users,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storage";
import { formatINR } from "@/lib/utils";
import type { TripPlanResult, TripPlanTierId } from "@/types";

function TransportIcon({ mode }: { mode: string }) {
  if (mode === "Flight") return <Plane size={16} />;
  if (mode === "Bus") return <Bus size={16} />;
  return <Train size={16} />;
}

export default function TripPlanDetailClient({ tier }: { tier: TripPlanTierId }) {
  const router = useRouter();
  const [result, , hydrated] = useLocalStorage<TripPlanResult | null>(STORAGE_KEYS.tripPlanResult, null);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="skeleton h-10 w-64 rounded-lg" />
        <div className="mt-6 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-24 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const plan = result?.plans.find((p) => p.tier === tier);

  if (!plan) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="font-display text-2xl text-ink">No plan found</p>
        <p className="mt-2 text-mute">Generate a trip plan first to view its details here.</p>
        <Link
          href="/trip-planner"
          className="mt-6 inline-block rounded-full bg-amber px-6 py-3 font-mono text-xs uppercase tracking-widest text-void transition-colors hover:bg-amber-soft"
        >
          Go to Trip Planner
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <button
        onClick={() => router.push("/trip-planner")}
        className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-mute transition-colors hover:text-ink"
      >
        <ArrowLeft size={14} /> Back to plans
      </button>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-b border-line/60 pb-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-aqua">{plan.name} plan</p>
          <h1 className="mt-1 font-display text-4xl text-ink">
            {plan.days} days in {plan.destination}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-mute">
            <Users size={14} /> {plan.people} {plan.people === 1 ? "traveler" : "travelers"} · {plan.nights} nights
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Total estimated cost</p>
          <p className="font-tabular text-3xl text-amber">{formatINR(plan.budgetSummary.total)}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full border border-line/60 px-3 py-1.5 text-xs text-mute">
          <MapPin size={13} /> {plan.majorDestinations.join(" · ")}
        </span>
      </div>

      {/* Transportation */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 font-display text-xl text-ink">
          <TransportIcon mode={plan.transport.mode} /> Transportation
        </h2>
        <div className="mt-3 rounded-2xl border border-line/60 bg-surface p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute">{plan.transport.mode} · {plan.transport.provider}</p>
              <p className="mt-1 font-display text-lg text-ink">
                {plan.transport.origin} → {plan.transport.destination}
              </p>
            </div>
            <p className="font-tabular text-xl text-amber">{formatINR(plan.transport.cost)}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 border-t border-line/60 pt-4 text-sm sm:grid-cols-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Departure</p>
              <p className="mt-1 text-ink">{plan.transport.departure}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Arrival</p>
              <p className="mt-1 text-ink">{plan.transport.arrival}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Duration</p>
              <p className="mt-1 flex items-center gap-1 text-ink">
                <Clock size={13} /> {plan.transport.duration}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Round trip, all travelers</p>
              <p className="mt-1 text-ink">{formatINR(plan.transport.cost)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink">Hotel</h2>
        <div className="mt-3 rounded-2xl border border-line/60 bg-surface p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-display text-lg text-ink">{plan.hotel.name}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-mute">
                <MapPin size={13} /> {plan.hotel.location}
              </p>
            </div>
            <p className="font-tabular text-xl text-amber">{formatINR(plan.hotel.totalPrice)}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 border-t border-line/60 pt-4 text-sm sm:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Room type</p>
              <p className="mt-1 text-ink">{plan.hotel.roomType}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Nights</p>
              <p className="mt-1 text-ink">{plan.hotel.nights}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Price / night</p>
              <p className="mt-1 text-ink">{formatINR(plan.hotel.pricePerNight)}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-line/60 pt-4">
            {plan.hotel.amenities.map((a) => (
              <span key={a} className="rounded-full bg-surface2 px-3 py-1 text-xs text-mute">
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink">Places to visit</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {plan.destinationsToVisit.map((d) => (
            <div key={d.name} className="rounded-xl border border-line/60 bg-surface p-4">
              <p className="font-display text-base text-ink">{d.name}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-mute">
                <MapPin size={12} /> {d.location}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-mute">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {d.duration}
                </span>
                <span>{d.distanceFromHotel} from hotel</span>
                <span>{d.entryFee === 0 ? "Free entry" : `Entry: ${formatINR(d.entryFee)}`}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Activities */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink">Activities</h2>
        <div className="mt-3 space-y-2.5">
          {plan.activities.map((a) => (
            <div key={a.name} className="flex items-center justify-between rounded-xl border border-line/60 bg-surface px-4 py-3">
              <div className="flex items-center gap-3">
                <Ticket size={16} className="text-amber" />
                <div>
                  <p className="text-sm text-ink">{a.name}</p>
                  <p className="flex items-center gap-1 text-xs text-mute">
                    <Clock size={11} /> {a.duration}
                  </p>
                </div>
              </div>
              <p className="font-tabular text-sm text-ink">{formatINR(a.cost)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Food */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 font-display text-xl text-ink">
          <UtensilsCrossed size={18} /> Food
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-4 rounded-2xl border border-line/60 bg-surface p-5 sm:w-80">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Per person / day</p>
            <p className="mt-1 font-tabular text-lg text-ink">{formatINR(plan.food.dailyCostPerPerson)}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Total estimate</p>
            <p className="mt-1 font-tabular text-lg text-amber">{formatINR(plan.food.totalEstimate)}</p>
          </div>
        </div>
      </section>

      {/* Budget Summary */}
      <section className="mt-10 mb-4">
        <h2 className="flex items-center gap-2 font-display text-xl text-ink">
          <Wallet size={18} /> Budget summary
        </h2>
        <div className="mt-3 rounded-2xl border border-line/60 bg-surface p-5 sm:max-w-md">
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-mute">Transportation</span>
              <span className="text-ink">{formatINR(plan.budgetSummary.transportation)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-mute">Hotel</span>
              <span className="text-ink">{formatINR(plan.budgetSummary.hotel)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-mute">Food</span>
              <span className="text-ink">{formatINR(plan.budgetSummary.food)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-mute">Activities</span>
              <span className="text-ink">{formatINR(plan.budgetSummary.activities)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-mute">Miscellaneous</span>
              <span className="text-ink">{formatINR(plan.budgetSummary.miscellaneous)}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-4">
            <span className="font-display text-base text-ink">Total Estimated Cost</span>
            <span className="font-tabular text-2xl text-amber">{formatINR(plan.budgetSummary.total)}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
