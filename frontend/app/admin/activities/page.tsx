import type { Metadata } from "next";
import ActivitiesManager from "@/components/admin/ActivitiesManager";

export const metadata: Metadata = { title: "Admin — Activities" };

export default function AdminActivitiesPage() {
  return <ActivitiesManager />;
}
