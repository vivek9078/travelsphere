# TravelSphere AI — Frontend-Only Demo

A 100% frontend Next.js 15 build of TravelSphere AI. Every page runs on
local mock data and `localStorage` — there is **no database, backend API,
authentication server, or external service required**.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. No `.env` file, API keys, or database setup
needed.

## What's included

- **Mock data layer** (`lib/mock-data/`) — 16 destinations across 12
  countries, 15 hotels, 19 activities, reviews, users, notifications,
  transport options.
- **Interactive 3D globe** (`components/globe/Globe.tsx`), loaded via
  `next/dynamic` with `ssr:false` and wrapped in an error boundary that
  falls back to an SVG globe (`GlobeFallback.tsx`) if WebGL/Three.js is
  unavailable — the page never crashes because of the globe.
- **Explore / search** (`/explore`) with working filters (region, rating,
  price) and sorting across destinations, hotels, and activities.
- **Hotels** (`/hotels`, `/hotels/[slug]`) with room selection and a full
  booking flow.
- **Activities** (`/activities`, `/activities/[slug]`) with a booking flow.
- **AI Trip Planner** (`/plan`) — generates a day-by-day itinerary from
  local templates based on destination, days, budget, and interests. No
  external AI API call.
- **Booking flow** (`/booking/hotel/[slug]`, `/booking/activity/[slug]`) —
  Guest Details → Review → simulated Payment → Confirmation, with a
  generated booking ID saved to `localStorage`.
- **Auth** (`/login`, `/signup`) — mock session stored in `localStorage`.
  Demo accounts:
  - `suraj@example.com` / `travel123` (regular user)
  - `admin@travelsphere.ai` / `admin123` (admin)
- **Dashboard** (`/dashboard`) — profile, upcoming/past trips, notifications.
- **Wishlist** (`/wishlist`) — add/remove destinations & hotels, persisted
  locally.
- **Admin panel** (`/admin`, admin account only) — stats overview plus
  add/edit/delete for destinations, hotels, and activities, and booking
  status management. All changes persist to `localStorage`.
- **Dark/light theme**, keyboard-accessible focus states, `error.tsx` /
  `not-found.tsx` / `loading.tsx`, and SEO metadata (Open Graph, Twitter
  cards) on every page.

## Known limitations of this frontend-only pass

- No real payment processing, email delivery, or persistence across
  devices/browsers — everything lives in this browser's `localStorage`.
- New signups aren't persisted between full page reloads of the in-memory
  mock user list beyond the current session (the session itself does
  persist via `localStorage`).
- No true offline/service-worker caching (PWA) is wired up yet — this was
  flagged as optional in the spec and left out of this pass to keep the
  build simple and dependency-free.
- Mock data covers a representative set of destinations/hotels/activities
  rather than an exhaustive catalog.

Backend integration (a real database, auth provider, and payments) can be
layered in later without changing the component structure — every data
access goes through `lib/mock-data/*` and `lib/demo-*.ts`, which are the
only files that would need to be swapped for real API calls.
