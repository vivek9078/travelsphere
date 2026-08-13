import type { Metadata } from "next";
import HotelsManager from "@/components/admin/HotelsManager";

export const metadata: Metadata = { title: "Admin — Hotels" };

export default function AdminHotelsPage() {
  return <HotelsManager />;
}
