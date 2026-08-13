import type { Metadata } from "next";
import DestinationsManager from "@/components/admin/DestinationsManager";

export const metadata: Metadata = { title: "Admin — Destinations" };

export default function AdminDestinationsPage() {
  return <DestinationsManager />;
}
