export type GlobeCountry = {
  slug: string;
  name: string;
  isoCode: string;
  latitude: number;
  longitude: number;
  destinationCount: number;
  bestSeason: string | null;
};

export type DestinationCard = {
  slug: string;
  name: string;
  heroImage: string | null;
  bestSeason: string | null;
  tripDuration: string | null;
  avgBudget: string | null;
  countryName: string;
  countrySlug: string;
  rating?: number;
  reviewCount?: number;
  priceFrom?: number;
  description?: string;
};

export type Country = {
  slug: string;
  name: string;
  isoCode: string;
  heroImage: string;
  description: string;
  currency: string;
  language: string;
  timezone: string;
  climate: string;
  bestSeason: string;
  avgBudget: string;
  visaInfo: string;
  localFoods: string[];
  festivals: string[];
  latitude: number;
  longitude: number;
};

export type Destination = {
  slug: string;
  name: string;
  countrySlug: string;
  countryName: string;
  heroImage: string;
  gallery: string[];
  overview: string;
  highlights: string[];
  topAttractions: string[];
  thingsToDo: string[];
  bestSeason: string;
  tripDuration: string;
  avgBudget: string;
  priceFrom: number;
  weather: { temperature: number; condition: string; humidity: number };
  travelTips: string[];
  safety: string;
  rating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
  isFeatured: boolean;
  isTrending: boolean;
  isPopular: boolean;
  faqs: { question: string; answer: string }[];
};

export type Hotel = {
  slug: string;
  name: string;
  destinationSlug: string;
  destinationName: string;
  countryName: string;
  heroImage: string;
  gallery: string[];
  starRating: number;
  reviewScore: number;
  reviewCount: number;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  description: string;
  address: string;
  rooms: {
    id: string;
    name: string;
    pricePerNight: number;
    capacity: number;
    beds: string;
    amenities: string[];
    image: string;
  }[];
  availability: "Available" | "Limited" | "Sold Out";
  latitude: number;
  longitude: number;
};

export type Activity = {
  slug: string;
  name: string;
  destinationSlug: string;
  destinationName: string;
  category: string;
  heroImage: string;
  duration: string;
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  description: string;
  highlights: string[];
  included: string[];
  difficulty: "Easy" | "Moderate" | "Challenging";
};

export type Review = {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  targetType: "destination" | "hotel" | "activity";
  targetSlug: string;
};

export type MockUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: "Travel Enthusiast" | "Admin";
  memberSince: string;
};

export type Booking = {
  id: string;
  type: "hotel" | "activity";
  itemSlug: string;
  itemName: string;
  destinationName: string;
  image: string;
  checkIn: string;
  checkOut?: string;
  guests: number;
  nights?: number;
  totalPrice: number;
  currency: string;
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
  createdAt: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export type ItineraryDay = {
  day: number;
  title: string;
  items: { time: string; activity: string }[];
};

export type GeneratedTrip = {
  destination: string;
  days: number;
  budget: string;
  travelStyle: string;
  estimatedCost: number;
  itinerary: ItineraryDay[];
};

// ---- Trip Planning Flow (Phase 2) ----
// Kept separate from the UI layer so this shape can later be swapped for a
// real backend API response without changing the components that render it.

export type TripPlanInput = {
  destination: string;
  startDate: string; // ISO date (yyyy-mm-dd)
  endDate: string; // ISO date (yyyy-mm-dd)
  people: number;
};

export type TripPlanTierId = "budget" | "standard" | "premium" | "luxury";

export type TripPlanTransport = {
  mode: "Flight" | "Train" | "Bus" | "Train + Cab";
  provider: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  duration: string;
  cost: number;
};

export type TripPlanHotel = {
  name: string;
  location: string;
  roomType: string;
  nights: number;
  pricePerNight: number;
  totalPrice: number;
  amenities: string[];
};

export type TripPlanDestinationStop = {
  name: string;
  location: string;
  duration: string;
  entryFee: number;
  distanceFromHotel: string;
};

export type TripPlanActivity = {
  name: string;
  duration: string;
  cost: number;
};

export type TripPlanFood = {
  dailyCostPerPerson: number;
  totalEstimate: number;
};

export type TripPlanBudgetSummary = {
  transportation: number;
  hotel: number;
  food: number;
  activities: number;
  miscellaneous: number;
  total: number;
};

export type TripPlan = {
  tier: TripPlanTierId;
  name: string;
  tagline: string;
  destination: string;
  days: number;
  nights: number;
  people: number;
  majorDestinations: string[];
  transport: TripPlanTransport;
  hotel: TripPlanHotel;
  destinationsToVisit: TripPlanDestinationStop[];
  activities: TripPlanActivity[];
  food: TripPlanFood;
  budgetSummary: TripPlanBudgetSummary;
};

export type TripPlanResult = {
  input: TripPlanInput;
  generatedAt: string;
  plans: TripPlan[];
};
