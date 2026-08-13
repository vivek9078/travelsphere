import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line/60 bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <p className="font-display text-lg text-ink">
              Travel<span className="italic text-amber">Sphere</span>{" "}
              <span className="font-mono text-xs text-aqua align-super">AI</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-mute">
              Explore the world on an interactive globe, plan trips with AI, and book hotels
              and experiences — all in one place.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-mute">Explore</p>
            <ul className="mt-4 space-y-2 text-sm text-ink/80">
              <li><Link href="/explore" className="hover:text-amber">Explore all</Link></li>
              <li><Link href="/hotels" className="hover:text-amber">Hotels</Link></li>
              <li><Link href="/activities" className="hover:text-amber">Activities</Link></li>
              <li><Link href="/plan" className="hover:text-amber">AI Trip Planner</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-mute">Account</p>
            <ul className="mt-4 space-y-2 text-sm text-ink/80">
              <li><Link href="/dashboard" className="hover:text-amber">Dashboard</Link></li>
              <li><Link href="/wishlist" className="hover:text-amber">Wishlist</Link></li>
              <li><Link href="/login" className="hover:text-amber">Sign in</Link></li>
              <li><Link href="/signup" className="hover:text-amber">Create account</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-mute">Legal</p>
            <ul className="mt-4 space-y-2 text-sm text-ink/80">
              <li><Link href="/privacy" className="hover:text-amber">Privacy policy</Link></li>
              <li><Link href="/terms" className="hover:text-amber">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line/60 pt-8 text-xs text-mute md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} TravelSphere AI. All coordinates approximate.</p>
          <p className="font-mono">Frontend demo — bookings and payments are simulated.</p>
        </div>
      </div>
    </footer>
  );
}
