import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-amber">404</p>
      <h1 className="mt-2 font-display text-3xl text-ink">This coordinate doesn't exist yet</h1>
      <p className="mt-3 text-sm text-mute">
        The country or destination you're looking for isn't in the database, or the slug has changed.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-amber px-6 py-3 font-mono text-xs uppercase tracking-widest text-void hover:bg-amber-soft"
      >
        Back to the globe
      </Link>
    </div>
  );
}
