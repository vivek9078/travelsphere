import type { TripPlanTierId } from "@/types";

// Raw template data only — no business logic here. `lib/trip-planner.ts`
// combines these templates with a user's TripPlanInput to produce the
// four TripPlan tiers. Keeping this separate means it can later be
// replaced by a real backend API response without touching the UI.

export type TripPlanHotelTemplate = {
  name: string;
  location: string;
  roomType: string;
  pricePerNight: number;
  amenities: string[];
};

export type TripPlanTransportTemplate = {
  mode: "Flight" | "Train" | "Bus" | "Train + Cab";
  provider: string;
  departure: string;
  arrival: string;
  duration: string;
  costPerPerson: number;
};

export type TripPlanDestinationTemplate = {
  name: string;
  location: string;
  duration: string;
  entryFee: number;
  distanceFromHotel: string;
};

export type TripPlanActivityTemplate = {
  name: string;
  duration: string;
  baseCost: number; // baseline per-person cost at the "standard" tier
};

export type TripPlanTemplate = {
  key: string;
  label: string;
  origin: string;
  aliases: string[];
  majorDestinations: string[];
  destinationsToVisit: TripPlanDestinationTemplate[];
  activitiesPool: TripPlanActivityTemplate[];
  hotelsByTier: Record<TripPlanTierId, TripPlanHotelTemplate>;
  transportByTier: Record<TripPlanTierId, TripPlanTransportTemplate>;
  foodDailyByTier: Record<TripPlanTierId, number>;
};

export const tripPlanTiers: { id: TripPlanTierId; name: string; tagline: string }[] = [
  { id: "budget", name: "Budget Friendly", tagline: "Affordable transport, hotel and activities." },
  { id: "standard", name: "Standard", tagline: "Balanced comfort and cost." },
  { id: "premium", name: "Premium", tagline: "Better hotels, transport and experiences." },
  { id: "luxury", name: "Luxury", tagline: "Premium/luxury travel experience." },
];

export const tripPlanTemplates: TripPlanTemplate[] = [
  {
    key: "goa",
    label: "Goa",
    origin: "Mumbai",
    aliases: ["goa", "north goa", "south goa", "panaji", "calangute", "baga"],
    majorDestinations: ["North Goa", "South Goa", "Old Goa", "Dudhsagar Falls"],
    destinationsToVisit: [
      { name: "Baga Beach", location: "North Goa", duration: "2-3 hrs", entryFee: 0, distanceFromHotel: "3 km" },
      { name: "Fort Aguada", location: "Candolim", duration: "1-2 hrs", entryFee: 25, distanceFromHotel: "5 km" },
      { name: "Basilica of Bom Jesus", location: "Old Goa", duration: "1 hr", entryFee: 0, distanceFromHotel: "12 km" },
      { name: "Dudhsagar Waterfalls", location: "Mollem", duration: "Half day", entryFee: 400, distanceFromHotel: "45 km" },
    ],
    activitiesPool: [
      { name: "Scuba diving session", duration: "2 hrs", baseCost: 2500 },
      { name: "Sunset river cruise", duration: "1.5 hrs", baseCost: 800 },
      { name: "Parasailing", duration: "20 min", baseCost: 1500 },
      { name: "Spice plantation tour", duration: "3 hrs", baseCost: 600 },
    ],
    hotelsByTier: {
      budget: { name: "Zostel Goa", location: "Anjuna", roomType: "Shared Dorm Room", pricePerNight: 900, amenities: ["Free WiFi", "Common Lounge", "Breakfast Included"] },
      standard: { name: "Ginger Goa", location: "Panaji", roomType: "Deluxe Room", pricePerNight: 3200, amenities: ["AC", "Free WiFi", "Pool", "Breakfast Included"] },
      premium: { name: "Novotel Goa Resort & Spa", location: "Candolim", roomType: "Premium Sea View Room", pricePerNight: 8500, amenities: ["AC", "Pool", "Spa", "Beach Access", "Breakfast & Dinner"] },
      luxury: { name: "Taj Exotica Resort & Spa", location: "Benaulim", roomType: "Luxury Villa", pricePerNight: 22000, amenities: ["Private Pool", "Butler Service", "Spa", "Fine Dining", "Beach Front"] },
    },
    transportByTier: {
      budget: { mode: "Bus", provider: "Sleeper Volvo (State Transport)", departure: "08:30 PM", arrival: "11:00 AM (+1 day)", duration: "14h 30m", costPerPerson: 1200 },
      standard: { mode: "Train", provider: "Konkan Kanya Express (3AC)", departure: "11:05 PM", arrival: "11:20 AM (+1 day)", duration: "12h 15m", costPerPerson: 1800 },
      premium: { mode: "Flight", provider: "IndiGo", departure: "07:15 AM", arrival: "08:55 AM", duration: "1h 40m", costPerPerson: 5200 },
      luxury: { mode: "Flight", provider: "Vistara (Business)", departure: "09:30 AM", arrival: "11:10 AM", duration: "1h 40m", costPerPerson: 14500 },
    },
    foodDailyByTier: { budget: 500, standard: 900, premium: 1600, luxury: 3000 },
  },
  {
    key: "jaipur",
    label: "Jaipur, Rajasthan",
    origin: "Delhi",
    aliases: ["jaipur", "rajasthan", "pink city"],
    majorDestinations: ["Jaipur", "Amer Fort", "City Palace", "Hawa Mahal"],
    destinationsToVisit: [
      { name: "Amer Fort", location: "Amer", duration: "3 hrs", entryFee: 200, distanceFromHotel: "11 km" },
      { name: "Hawa Mahal", location: "Jaipur City", duration: "1 hr", entryFee: 50, distanceFromHotel: "4 km" },
      { name: "City Palace", location: "Jaipur City", duration: "2 hrs", entryFee: 300, distanceFromHotel: "5 km" },
      { name: "Nahargarh Fort", location: "Jaipur Hills", duration: "2 hrs", entryFee: 100, distanceFromHotel: "9 km" },
    ],
    activitiesPool: [
      { name: "Elephant feeding experience", duration: "1 hr", baseCost: 1200 },
      { name: "Hot air balloon ride", duration: "1.5 hrs", baseCost: 9500 },
      { name: "Local bazaar shopping tour", duration: "2 hrs", baseCost: 300 },
      { name: "Rajasthani folk dinner & show", duration: "2 hrs", baseCost: 1500 },
    ],
    hotelsByTier: {
      budget: { name: "Zostel Jaipur", location: "Amer Road", roomType: "Shared Dorm Room", pricePerNight: 700, amenities: ["Free WiFi", "Rooftop Café", "Breakfast Included"] },
      standard: { name: "FabHotel Prime", location: "C-Scheme", roomType: "Deluxe Room", pricePerNight: 2600, amenities: ["AC", "Free WiFi", "Breakfast Included"] },
      premium: { name: "Trident Jaipur", location: "Amber Road", roomType: "Premium Room", pricePerNight: 7200, amenities: ["AC", "Pool", "Spa", "Breakfast & Dinner"] },
      luxury: { name: "Rambagh Palace", location: "Bhawani Singh Road", roomType: "Palace Luxury Room", pricePerNight: 35000, amenities: ["Palace Heritage Stay", "Butler Service", "Fine Dining", "Spa"] },
    },
    transportByTier: {
      budget: { mode: "Bus", provider: "RSRTC Volvo", departure: "10:00 PM", arrival: "03:30 AM (+1 day)", duration: "5h 30m", costPerPerson: 600 },
      standard: { mode: "Train", provider: "Ajmer Shatabdi (CC)", departure: "06:10 AM", arrival: "10:50 AM", duration: "4h 40m", costPerPerson: 900 },
      premium: { mode: "Flight", provider: "Air India", departure: "08:00 AM", arrival: "09:05 AM", duration: "1h 5m", costPerPerson: 4200 },
      luxury: { mode: "Flight", provider: "Vistara (Business)", departure: "10:15 AM", arrival: "11:20 AM", duration: "1h 5m", costPerPerson: 11500 },
    },
    foodDailyByTier: { budget: 450, standard: 800, premium: 1500, luxury: 2800 },
  },
  {
    key: "kerala",
    label: "Alleppey, Kerala",
    origin: "Chennai",
    aliases: ["kerala", "alleppey", "munnar", "kochi", "backwaters", "thekkady"],
    majorDestinations: ["Kochi", "Munnar", "Alleppey Backwaters", "Thekkady"],
    destinationsToVisit: [
      { name: "Alleppey Backwaters Houseboat Cruise", location: "Alleppey", duration: "Full day", entryFee: 0, distanceFromHotel: "2 km" },
      { name: "Munnar Tea Gardens", location: "Munnar", duration: "2 hrs", entryFee: 50, distanceFromHotel: "20 km" },
      { name: "Fort Kochi Heritage Walk", location: "Kochi", duration: "2 hrs", entryFee: 0, distanceFromHotel: "6 km" },
      { name: "Periyar Wildlife Sanctuary", location: "Thekkady", duration: "3 hrs", entryFee: 300, distanceFromHotel: "30 km" },
    ],
    activitiesPool: [
      { name: "Houseboat overnight stay", duration: "24 hrs", baseCost: 6000 },
      { name: "Ayurvedic spa massage", duration: "1 hr", baseCost: 1800 },
      { name: "Spice plantation tour", duration: "2 hrs", baseCost: 500 },
      { name: "Kathakali dance show", duration: "1.5 hrs", baseCost: 400 },
    ],
    hotelsByTier: {
      budget: { name: "Backpacker Panda Alleppey", location: "Alleppey Town", roomType: "Standard Room", pricePerNight: 1100, amenities: ["Free WiFi", "Fan/AC Room", "Breakfast Included"] },
      standard: { name: "Lake Shore Homestay", location: "Alleppey Backwaters", roomType: "Deluxe Room", pricePerNight: 3400, amenities: ["AC", "Lake View", "Breakfast Included"] },
      premium: { name: "Xandari Pearl Resort", location: "Alleppey", roomType: "Premium Villa", pricePerNight: 9000, amenities: ["Private Pool Access", "Backwater View", "Spa", "Breakfast & Dinner"] },
      luxury: { name: "Kumarakom Lake Resort", location: "Kumarakom", roomType: "Luxury Pool Villa", pricePerNight: 28000, amenities: ["Private Pool Villa", "Ayurveda Spa", "Fine Dining", "Backwater Frontage"] },
    },
    transportByTier: {
      budget: { mode: "Bus", provider: "KSRTC Multi-Axle", departure: "09:00 PM", arrival: "09:00 AM (+1 day)", duration: "12h 0m", costPerPerson: 1100 },
      standard: { mode: "Train", provider: "Alleppey Express (3AC)", departure: "08:40 PM", arrival: "08:00 AM (+1 day)", duration: "11h 20m", costPerPerson: 1700 },
      premium: { mode: "Flight", provider: "IndiGo (via Kochi)", departure: "06:45 AM", arrival: "08:25 AM", duration: "1h 40m", costPerPerson: 5800 },
      luxury: { mode: "Flight", provider: "Vistara Business (via Kochi)", departure: "09:00 AM", arrival: "10:40 AM", duration: "1h 40m", costPerPerson: 15500 },
    },
    foodDailyByTier: { budget: 500, standard: 950, premium: 1700, luxury: 3200 },
  },
  {
    key: "manali",
    label: "Manali, Himachal Pradesh",
    origin: "Delhi",
    aliases: ["manali", "himachal", "solang", "rohtang"],
    majorDestinations: ["Manali", "Solang Valley", "Old Manali", "Rohtang Pass"],
    destinationsToVisit: [
      { name: "Solang Valley", location: "Solang", duration: "Half day", entryFee: 0, distanceFromHotel: "14 km" },
      { name: "Hadimba Temple", location: "Old Manali", duration: "1 hr", entryFee: 0, distanceFromHotel: "3 km" },
      { name: "Rohtang Pass", location: "Rohtang", duration: "Full day", entryFee: 550, distanceFromHotel: "51 km" },
      { name: "Old Manali Café Walk", location: "Old Manali", duration: "2 hrs", entryFee: 0, distanceFromHotel: "4 km" },
    ],
    activitiesPool: [
      { name: "Paragliding at Solang", duration: "20 min", baseCost: 2500 },
      { name: "River rafting on Beas", duration: "1 hr", baseCost: 900 },
      { name: "Snow scooter ride", duration: "15 min", baseCost: 1200 },
      { name: "Local Himachali cuisine trail", duration: "2 hrs", baseCost: 700 },
    ],
    hotelsByTier: {
      budget: { name: "Zostel Manali", location: "Old Manali", roomType: "Shared Dorm Room", pricePerNight: 850, amenities: ["Free WiFi", "Bonfire Area", "Breakfast Included"] },
      standard: { name: "Snow Valley Resorts", location: "Manali", roomType: "Deluxe Mountain View Room", pricePerNight: 3000, amenities: ["Heater", "Free WiFi", "Breakfast Included"] },
      premium: { name: "Span Resort & Spa", location: "Kullu-Manali Highway", roomType: "Premium River View Room", pricePerNight: 8200, amenities: ["Riverside", "Spa", "Bonfire", "Breakfast & Dinner"] },
      luxury: { name: "The Himalayan", location: "Manali", roomType: "Luxury Suite", pricePerNight: 24000, amenities: ["Mountain View Suite", "Private Spa", "Fine Dining", "Butler Service"] },
    },
    transportByTier: {
      budget: { mode: "Bus", provider: "HRTC Volvo", departure: "06:00 PM", arrival: "07:00 AM (+1 day)", duration: "13h 0m", costPerPerson: 1000 },
      standard: { mode: "Train + Cab", provider: "Shatabdi to Chandigarh + Cab", departure: "07:40 AM", arrival: "05:10 PM", duration: "9h 30m", costPerPerson: 2000 },
      premium: { mode: "Flight", provider: "Air India (via Kullu)", departure: "09:20 AM", arrival: "10:35 AM", duration: "1h 15m", costPerPerson: 6500 },
      luxury: { mode: "Flight", provider: "Vistara Business (via Kullu)", departure: "11:00 AM", arrival: "12:15 PM", duration: "1h 15m", costPerPerson: 16500 },
    },
    foodDailyByTier: { budget: 450, standard: 850, premium: 1600, luxury: 3000 },
  },
  {
    key: "udaipur",
    label: "Udaipur, Rajasthan",
    origin: "Delhi",
    aliases: ["udaipur", "lake city", "pichola"],
    majorDestinations: ["Udaipur", "Lake Pichola", "City Palace", "Sajjangarh"],
    destinationsToVisit: [
      { name: "City Palace Udaipur", location: "Udaipur City", duration: "2-3 hrs", entryFee: 300, distanceFromHotel: "3 km" },
      { name: "Lake Pichola Boat Ride", location: "Udaipur", duration: "1 hr", entryFee: 400, distanceFromHotel: "2 km" },
      { name: "Sajjangarh Monsoon Palace", location: "Aravalli Hills", duration: "1.5 hrs", entryFee: 100, distanceFromHotel: "9 km" },
      { name: "Jagdish Temple", location: "Udaipur City", duration: "45 min", entryFee: 0, distanceFromHotel: "3 km" },
    ],
    activitiesPool: [
      { name: "Sunset boat cruise", duration: "1 hr", baseCost: 900 },
      { name: "Heritage walking tour", duration: "2 hrs", baseCost: 500 },
      { name: "Puppet show at Bagore Ki Haveli", duration: "1 hr", baseCost: 150 },
      { name: "Cooking class — Rajasthani thali", duration: "2 hrs", baseCost: 1200 },
    ],
    hotelsByTier: {
      budget: { name: "Backpacker Panda Udaipur", location: "Old City", roomType: "Standard Room", pricePerNight: 900, amenities: ["Free WiFi", "Rooftop Café", "Breakfast Included"] },
      standard: { name: "Hotel Lake Pichola", location: "Old City", roomType: "Lake View Deluxe Room", pricePerNight: 3500, amenities: ["AC", "Lake View", "Breakfast Included"] },
      premium: { name: "Radisson Blu Udaipur Palace Resort", location: "Fatehsagar Lake", roomType: "Premium Lake View Room", pricePerNight: 9500, amenities: ["Pool", "Spa", "Lake View", "Breakfast & Dinner"] },
      luxury: { name: "Taj Lake Palace", location: "Lake Pichola", roomType: "Luxury Palace Room", pricePerNight: 42000, amenities: ["Island Palace Stay", "Private Boat Transfer", "Fine Dining", "Butler Service"] },
    },
    transportByTier: {
      budget: { mode: "Bus", provider: "RSRTC Volvo", departure: "09:15 PM", arrival: "06:15 AM (+1 day)", duration: "9h 0m", costPerPerson: 900 },
      standard: { mode: "Train", provider: "Mewar Express (3AC)", departure: "07:50 PM", arrival: "07:30 AM (+1 day)", duration: "11h 40m", costPerPerson: 1400 },
      premium: { mode: "Flight", provider: "IndiGo", departure: "01:30 PM", arrival: "02:50 PM", duration: "1h 20m", costPerPerson: 4800 },
      luxury: { mode: "Flight", provider: "Vistara Business", departure: "04:00 PM", arrival: "05:20 PM", duration: "1h 20m", costPerPerson: 13000 },
    },
    foodDailyByTier: { budget: 450, standard: 850, premium: 1600, luxury: 3000 },
  },
  {
    key: "generic-india",
    label: "",
    origin: "Delhi",
    aliases: [],
    majorDestinations: [],
    destinationsToVisit: [
      { name: "City Center Walk", location: "City Center", duration: "2 hrs", entryFee: 0, distanceFromHotel: "2 km" },
      { name: "Old Town Heritage Site", location: "Old Town", duration: "1.5 hrs", entryFee: 100, distanceFromHotel: "5 km" },
      { name: "Local Viewpoint", location: "Hilltop", duration: "1 hr", entryFee: 50, distanceFromHotel: "8 km" },
      { name: "Regional Museum", location: "City Center", duration: "1.5 hrs", entryFee: 150, distanceFromHotel: "3 km" },
    ],
    activitiesPool: [
      { name: "Guided local sightseeing tour", duration: "3 hrs", baseCost: 800 },
      { name: "Local market shopping walk", duration: "2 hrs", baseCost: 300 },
      { name: "Regional cuisine tasting", duration: "1.5 hrs", baseCost: 600 },
      { name: "Cultural evening show", duration: "1.5 hrs", baseCost: 500 },
    ],
    hotelsByTier: {
      budget: { name: "City Backpackers Hostel", location: "City Center", roomType: "Shared Dorm Room", pricePerNight: 800, amenities: ["Free WiFi", "Common Lounge", "Breakfast Included"] },
      standard: { name: "Comfort Inn & Suites", location: "City Center", roomType: "Deluxe Room", pricePerNight: 2800, amenities: ["AC", "Free WiFi", "Breakfast Included"] },
      premium: { name: "The Grand Regency", location: "City Center", roomType: "Premium Room", pricePerNight: 7500, amenities: ["AC", "Pool", "Spa", "Breakfast & Dinner"] },
      luxury: { name: "The Imperial Suites", location: "City Center", roomType: "Luxury Suite", pricePerNight: 25000, amenities: ["Butler Service", "Spa", "Fine Dining", "Premium Suite"] },
    },
    transportByTier: {
      budget: { mode: "Bus", provider: "State Transport Volvo", departure: "09:00 PM", arrival: "08:00 AM (+1 day)", duration: "11h 0m", costPerPerson: 1000 },
      standard: { mode: "Train", provider: "Express Train (3AC)", departure: "10:00 PM", arrival: "09:00 AM (+1 day)", duration: "11h 0m", costPerPerson: 1600 },
      premium: { mode: "Flight", provider: "IndiGo", departure: "08:00 AM", arrival: "09:45 AM", duration: "1h 45m", costPerPerson: 5000 },
      luxury: { mode: "Flight", provider: "Vistara Business", departure: "10:30 AM", arrival: "12:15 PM", duration: "1h 45m", costPerPerson: 13500 },
    },
    foodDailyByTier: { budget: 450, standard: 850, premium: 1600, luxury: 3000 },
  },
];
