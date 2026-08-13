import type {
  TripPlan,
  TripPlanActivity,
  TripPlanInput,
  TripPlanTierId,
} from "@/types";
import { tripPlanTemplates, tripPlanTiers, type TripPlanTemplate } from "@/lib/mock-data/trip-plans";

// Per-tier scaling applied to the activity pool's baseline ("standard")
// cost, and how many activities from the pool each tier includes.
const activityMultiplier: Record<TripPlanTierId, number> = {
  budget: 0.6,
  standard: 1,
  premium: 1.6,
  luxury: 2.6,
};
const activityCount: Record<TripPlanTierId, number> = {
  budget: 2,
  standard: 3,
  premium: 4,
  luxury: 4,
};

const MISC_BUFFER_RATE = 0.06;

function titleCase(input: string): string {
  return input
    .trim()
    .split(/\s+/)
    .map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w))
    .join(" ");
}

function findTemplate(destinationInput: string): { template: TripPlanTemplate; label: string } {
  const normalized = destinationInput.trim().toLowerCase();
  const match = tripPlanTemplates.find(
    (t) => t.key !== "generic-india" && (t.aliases.some((a) => normalized.includes(a) || a.includes(normalized)) || normalized.includes(t.label.toLowerCase()))
  );
  if (match) return { template: match, label: match.label };

  const generic = tripPlanTemplates.find((t) => t.key === "generic-india")!;
  const label = titleCase(destinationInput) || "Your Destination";
  return { template: generic, label };
}

function daysBetween(startDate: string, endDate: string): { days: number; nights: number } {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end.getTime() - start.getTime();
  const nights = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));
  return { days: nights + 1, nights };
}

function roundToTen(value: number): number {
  return Math.round(value / 10) * 10;
}

function pick<T>(arr: T[], count: number, seed: number): T[] {
  if (arr.length === 0) return [];
  const out: T[] = [];
  for (let i = 0; i < count; i++) {
    out.push(arr[(seed + i) % arr.length]);
  }
  return out;
}

/**
 * Validates a TripPlanInput. Returns a list of human-readable errors;
 * an empty array means the input is valid.
 */
export function validateTripPlanInput(input: Partial<TripPlanInput>): string[] {
  const errors: string[] = [];

  if (!input.destination || !input.destination.trim()) {
    errors.push("Please enter a destination.");
  }
  if (!input.startDate) {
    errors.push("Please select a start date.");
  }
  if (!input.endDate) {
    errors.push("Please select an end date.");
  }
  if (input.startDate && input.endDate) {
    const start = new Date(input.startDate);
    const end = new Date(input.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      errors.push("Start date cannot be in the past.");
    }
    if (end <= start) {
      errors.push("End date must be after the start date.");
    }
  }
  if (!input.people || input.people < 1) {
    errors.push("Number of people must be at least 1.");
  } else if (input.people > 20) {
    errors.push("For groups larger than 20, please contact us directly.");
  }

  return errors;
}

/**
 * Generates the four trip-plan tiers (Budget Friendly, Standard, Premium,
 * Luxury) for the given input, using local mock data templates only.
 * This function's signature/shape is designed to be swappable for a real
 * backend API call in a later phase.
 */
export function generateTripPlans(input: TripPlanInput): TripPlan[] {
  const { template, label } = findTemplate(input.destination);
  const { days, nights } = daysBetween(input.startDate, input.endDate);
  const people = Math.max(1, Math.round(input.people));
  const rooms = Math.ceil(people / 2);
  const destinationSeed = input.destination.length + days;

  const majorDestinations = template.majorDestinations.length > 0 ? template.majorDestinations : [label, `${label} City Center`, `${label} Old Town`];

  return tripPlanTiers.map(({ id, name, tagline }) => {
    const hotelTemplate = template.hotelsByTier[id];
    const transportTemplate = template.transportByTier[id];
    const foodDaily = template.foodDailyByTier[id];

    const hotelTotal = hotelTemplate.pricePerNight * nights * rooms;
    const transportTotal = transportTemplate.costPerPerson * people * 2; // round trip
    const foodTotal = foodDaily * people * days;

    const selectedActivities = pick(template.activitiesPool, Math.min(activityCount[id], template.activitiesPool.length), destinationSeed);
    const activities: TripPlanActivity[] = selectedActivities.map((a) => ({
      name: a.name,
      duration: a.duration,
      cost: roundToTen(a.baseCost * activityMultiplier[id] * people),
    }));
    const activitiesTotal = activities.reduce((sum, a) => sum + a.cost, 0);

    const subtotal = transportTotal + hotelTotal + foodTotal + activitiesTotal;
    const miscellaneous = roundToTen(subtotal * MISC_BUFFER_RATE);
    const total = subtotal + miscellaneous;

    const plan: TripPlan = {
      tier: id,
      name,
      tagline,
      destination: label,
      days,
      nights,
      people,
      majorDestinations,
      transport: {
        mode: transportTemplate.mode,
        provider: transportTemplate.provider,
        origin: template.origin,
        destination: label,
        departure: transportTemplate.departure,
        arrival: transportTemplate.arrival,
        duration: transportTemplate.duration,
        cost: transportTotal,
      },
      hotel: {
        name: hotelTemplate.name,
        location: hotelTemplate.location,
        roomType: hotelTemplate.roomType,
        nights,
        pricePerNight: hotelTemplate.pricePerNight,
        totalPrice: hotelTotal,
        amenities: hotelTemplate.amenities,
      },
      destinationsToVisit: template.destinationsToVisit,
      activities,
      food: {
        dailyCostPerPerson: foodDaily,
        totalEstimate: foodTotal,
      },
      budgetSummary: {
        transportation: transportTotal,
        hotel: hotelTotal,
        food: foodTotal,
        activities: activitiesTotal,
        miscellaneous,
        total,
      },
    };

    return plan;
  });
}
