import { notFound } from "next/navigation";
import { getHotelBySlug } from "@/lib/mock-data/hotels";
import BookingWizard, { type BookingSummary } from "@/components/booking/BookingWizard";

function nightsBetween(a?: string, b?: string) {
  if (!a || !b) return 1;
  const start = new Date(a).getTime();
  const end = new Date(b).getTime();
  if (isNaN(start) || isNaN(end) || end <= start) return 1;
  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

export default async function HotelBookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ room?: string; checkIn?: string; checkOut?: string; guests?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const hotel = getHotelBySlug(slug);
  if (!hotel) notFound();

  const room = hotel.rooms.find((r) => r.id === sp.room) ?? hotel.rooms[0];
  const nights = nightsBetween(sp.checkIn, sp.checkOut);
  const guests = Number(sp.guests ?? 2);

  const summary: BookingSummary = {
    type: "hotel",
    itemSlug: hotel.slug,
    itemName: `${hotel.name} — ${room.name}`,
    destinationName: `${hotel.destinationName}, ${hotel.countryName}`,
    image: hotel.heroImage,
    checkIn: sp.checkIn ?? "",
    checkOut: sp.checkOut ?? "",
    nights,
    guests,
    totalPrice: room.pricePerNight * nights,
    currency: hotel.currency,
  };

  return <BookingWizard summary={summary} />;
}
