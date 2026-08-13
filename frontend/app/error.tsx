"use client";

import { useEffect } from "react";
import Link from "next/link";

// Global error boundary for the App Router. Catches any uncaught rendering
// error in a route segment so the user always sees a friendly screen instead
// of a raw stack trace or a blank page.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Unhandled route error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-amber">Something went wrong</p>
      <h1 className="mt-2 font-display text-3xl text-ink">This page hit a snag</h1>
      <p className="mt-3 text-sm text-mute">
        Nothing is lost — this is a frontend demo, so no data or bookings were affected. Try again.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          onClick={reset}
          className="rounded-full bg-amber px-6 py-3 font-mono text-xs uppercase tracking-widest text-void hover:bg-amber-soft"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-line/60 px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink hover:border-amber/60"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
