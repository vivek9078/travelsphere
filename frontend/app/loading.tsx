export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="skeleton h-8 w-48 rounded-lg" />
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-line/60 bg-surface">
            <div className="skeleton h-56 w-full" />
            <div className="space-y-2 p-4">
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="skeleton h-4 w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
