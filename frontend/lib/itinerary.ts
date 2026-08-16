import type { GeneratedTrip, ItineraryDay } from "@/types";
import { getAllDestinations } from "@/lib/mock-data/destinations";
import { fetchDestinations } from "@/lib/api";

const styleActivityPool: Record<string, string[]> = {
  Adventure: [
    "Whitewater rafting session", "Guided trekking route", "Zip-lining canopy tour",
    "Rock climbing with certified instructor", "Mountain biking trail", "Cliff-jumping stop",
  ],
  Luxury: [
    "Private spa treatment", "Fine-dining tasting menu", "Chauffeured city tour",
    "Rooftop champagne sunset", "Private yacht cruise", "Butler-served breakfast in villa",
  ],
  Relaxation: [
    "Beachside hammock time", "Full-body massage at the spa", "Slow breakfast with ocean view",
    "Sunset yoga session", "Poolside afternoon", "Guided meditation walk",
  ],
  Culture: [
    "Guided heritage walking tour", "Local museum visit", "Traditional performance evening",
    "Artisan workshop visit", "Historic old-town exploration", "Temple/monument visit",
  ],
  Food: [
    "Street food crawl", "Hands-on cooking class", "Local market tour with tastings",
    "Wine or tea tasting session", "Rooftop dinner reservation", "Farm-to-table lunch",
  ],
  Nature: [
    "Waterfall hike", "Wildlife sanctuary visit", "Botanical garden walk",
    "Sunrise viewpoint hike", "Boat ride through nature reserve", "Bird-watching walk",
  ],
  Family: [
    "Family-friendly theme park visit", "Interactive science/discovery center", "Beach day with water sports",
    "Wildlife park visit", "Cultural village experience", "Easy nature trail walk",
  ],
  Romantic: [
    "Private sunset dinner", "Couples spa session", "Candlelit beach walk",
    "Scenic sunset cruise", "Rooftop cocktail evening", "Private photography session",
  ],
};

const fixedMorning = ["Hotel breakfast", "Check-in & orientation walk", "Free morning to explore nearby streets"];
const fixedTransition = ["Local market browsing", "Café stop & rest", "Return to hotel & freshen up"];

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

export async function generateItinerary(params: {
  destination: string;
  days: number;
  budget: string;
  travelStyle: string;
  companions: string;
  interests: string[];
}): Promise<GeneratedTrip> {
  const { destination, days, budget, travelStyle, interests } = params;

  let allDests = [];
  try {
    allDests = await fetchDestinations();
  } catch (e) {
    allDests = getAllDestinations();
  }

  const match = allDests.find(
    (d) => d.name.toLowerCase().includes(destination.toLowerCase()) || destination.toLowerCase().includes(d.name.toLowerCase().split(",")[0])
  );

  const relevantInterests = interests.length > 0 ? interests : [travelStyle || "Culture"];
  const pool = relevantInterests.flatMap((i) => styleActivityPool[i] ?? styleActivityPool.Culture);

  const itinerary: ItineraryDay[] = Array.from({ length: Math.max(1, Math.min(days, 14)) }).map((_, i) => {
    const dayNum = i + 1;
    const seed = dayNum * 7 + destination.length;
    const isFirst = dayNum === 1;
    const isLast = dayNum === days;

    const items: ItineraryDay["items"] = [];
    if (isFirst) {
      items.push({ time: "09:00", activity: match ? `Arrive & check in near ${match.name}` : "Arrival & hotel check-in" });
      items.push({ time: "11:00", activity: pick(fixedMorning, seed) });
      items.push({ time: "14:00", activity: pick(pool, seed + 1) });
      items.push({ time: "19:00", activity: "Welcome dinner at a local restaurant" });
    } else if (isLast) {
      items.push({ time: "08:00", activity: "Breakfast & pack" });
      items.push({ time: "10:00", activity: pick(pool, seed + 2) });
      items.push({ time: "13:00", activity: "Last-minute souvenir shopping" });
      items.push({ time: "16:00", activity: "Transfer to airport / departure" });
    } else {
      items.push({ time: "08:30", activity: "Breakfast at hotel" });
      items.push({ time: "10:00", activity: pick(pool, seed) });
      items.push({ time: "13:00", activity: pick(fixedTransition, seed) });
      items.push({ time: "15:30", activity: pick(pool, seed + 3) });
      items.push({ time: "19:30", activity: "Dinner — chef's recommendation" });
    }

    return {
      day: dayNum,
      title: isFirst ? "Arrival & First Impressions" : isLast ? "Farewell & Departure" : `${relevantInterests[i % relevantInterests.length]} Focus Day`,
      items,
    };
  });

  const budgetMultiplier: Record<string, number> = {
    Budget: 3500,
    "Mid-range": 7500,
    Luxury: 18000,
    Premium: 32000,
  };
  const perDay = budgetMultiplier[budget] ?? 7500;
  const estimatedCost = Math.round(perDay * itinerary.length);

  return {
    destination: match ? match.name : destination,
    days: itinerary.length,
    budget,
    travelStyle,
    estimatedCost,
    itinerary,
  };
}
