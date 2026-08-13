import { notFound } from "next/navigation";
import { getActivityBySlug } from "@/lib/mock-data/activities";
import BookingWizard, { type BookingSummary } from "@/components/booking/BookingWizard";

export default async function ActivityBookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ date?: string; guests?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const activity = getActivityBySlug(slug);
  if (!activity) notFound();

  const guests = Number(sp.guests ?? 1);

  const summary: BookingSummary = {
    type: "activity",
    itemSlug: activity.slug,
    itemName: activity.name,
    destinationName: activity.destinationName,
    image: activity.heroImage,
    checkIn: sp.date ?? "",
    guests,
    totalPrice: activity.price * guests,
    currency: activity.currency,
  };

  return <BookingWizard summary={summary} />;
}
