import type { NotificationItem } from "@/types";

export const defaultNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Booking confirmed",
    message: "Your stay at Ubud Jungle Villas is confirmed for your selected dates.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "n2",
    title: "Price drop alert",
    message: "Flights to Bali from your wishlist just dropped by 12%.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  },
  {
    id: "n3",
    title: "Trip reminder",
    message: "Your Jaipur trip starts in 5 days — check the weather before you pack.",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
  {
    id: "n4",
    title: "Welcome to TravelSphere AI",
    message: "Complete your profile to get personalized destination recommendations.",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
];
