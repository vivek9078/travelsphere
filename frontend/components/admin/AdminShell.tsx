"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MapPin, Building2, Compass, Receipt } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/destinations", label: "Destinations", icon: MapPin },
  { href: "/admin/hotels", label: "Hotels", icon: Building2 },
  { href: "/admin/activities", label: "Activities", icon: Compass },
  { href: "/admin/bookings", label: "Bookings", icon: Receipt },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-6 py-10">
      <aside className="hidden w-56 shrink-0 lg:block">
        <p className="font-mono text-xs uppercase tracking-widest text-aqua">Admin panel</p>
        <nav className="mt-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  active ? "bg-amber/10 text-amber" : "text-mute hover:bg-surface hover:text-ink"
                }`}
              >
                <Icon size={15} /> {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="scroll-row mb-2 flex gap-2 overflow-x-auto lg:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-widest ${
              pathname === item.href ? "border-amber text-amber" : "border-line/60 text-mute"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
