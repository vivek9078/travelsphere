"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, Search, Heart, Sun, Moon, User, LogOut, LayoutDashboard, ShieldCheck } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/useWishlist";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/#featured", label: "Destinations" },
  { href: "/hotels", label: "Hotels" },
  { href: "/activities", label: "Activities" },
  { href: "/plan", label: "AI Planner" },
  { href: "/trip-planner", label: "Trip Budget" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { session, logout } = useAuth();
  const { items } = useWishlist();
  const router = useRouter();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchOpen(false);
    setMobileOpen(false);
    router.push(`/explore${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-void/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="shrink-0 font-display text-xl tracking-tight text-ink">
          Travel<span className="italic text-amber">Sphere</span>
          <span className="ml-1 align-super font-mono text-[10px] text-aqua">AI</span>
        </Link>

        <nav className="hidden items-center gap-7 font-mono text-xs uppercase tracking-widest text-mute lg:flex">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-full p-2 text-mute transition-colors hover:bg-surface hover:text-ink"
          >
            <Search size={18} />
          </button>

          <button
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggle}
            className="rounded-full p-2 text-mute transition-colors hover:bg-surface hover:text-ink"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative rounded-full p-2 text-mute transition-colors hover:bg-surface hover:text-ink"
          >
            <Heart size={18} />
            {items.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber font-mono text-[9px] text-void">
                {items.length}
              </span>
            )}
          </Link>

          <div className="relative hidden sm:block">
            {session ? (
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-line/60 py-1 pl-1 pr-3 text-xs text-ink transition-colors hover:border-amber/50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={session.avatar} alt="" className="h-6 w-6 rounded-full bg-surface2" />
                <span className="max-w-[100px] truncate font-mono uppercase tracking-widest">{session.name.split(" ")[0]}</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="font-mono text-xs uppercase tracking-widest text-mute transition-colors hover:text-ink">
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-amber px-4 py-2 font-mono text-xs uppercase tracking-widest text-void transition-colors hover:bg-amber-soft"
                >
                  Get Started
                </Link>
              </div>
            )}

            {session && accountOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-line/60 bg-surface shadow-xl shadow-black/30"
                onMouseLeave={() => setAccountOpen(false)}
              >
                <Link href="/dashboard" onClick={() => setAccountOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-ink hover:bg-surface2">
                  <LayoutDashboard size={15} /> Dashboard
                </Link>
                <Link href="/wishlist" onClick={() => setAccountOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-ink hover:bg-surface2">
                  <Heart size={15} /> Wishlist
                </Link>
                {session.role === "Admin" && (
                  <Link href="/admin" onClick={() => setAccountOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-ink hover:bg-surface2">
                    <ShieldCheck size={15} /> Admin panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setAccountOpen(false);
                    router.push("/");
                  }}
                  className="flex w-full items-center gap-2 border-t border-line/60 px-4 py-3 text-left text-sm text-mute hover:bg-surface2 hover:text-ink"
                >
                  <LogOut size={15} /> Sign out
                </button>
              </div>
            )}
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full p-2 text-ink lg:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-line/60 bg-surface/95 px-6 py-4">
          <form onSubmit={submitSearch} className="mx-auto flex max-w-2xl items-center gap-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations, hotels, activities…"
              className="w-full rounded-full border border-line/60 bg-surface2 px-4 py-2 text-sm text-ink outline-none focus-visible:border-amber"
            />
            <button type="submit" className="rounded-full bg-amber px-4 py-2 font-mono text-xs uppercase tracking-widest text-void">
              Go
            </button>
          </form>
        </div>
      )}

      {mobileOpen && (
        <div className="border-t border-line/60 bg-surface px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-1 font-mono text-xs uppercase tracking-widest text-mute">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="rounded-lg px-2 py-3 hover:bg-surface2 hover:text-ink">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-line/60 pt-4">
            {session ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-ink hover:bg-surface2">
                  <User size={15} /> Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                    router.push("/");
                  }}
                  className="flex items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-mute hover:bg-surface2"
                >
                  <LogOut size={15} /> Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="rounded-full border border-line/60 px-4 py-2 text-center font-mono text-xs uppercase tracking-widest text-ink">
                  Sign in
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)} className="rounded-full bg-amber px-4 py-2 text-center font-mono text-xs uppercase tracking-widest text-void">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
