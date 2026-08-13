import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Deliberately NOT using next/font/google here: fetching fonts from Google
// at build time requires network access, which breaks `npm run build` on
// offline/air-gapped machines. System font stacks (defined as CSS variables
// in globals.css) give the same "display serif + clean sans + mono" feel
// with zero network dependency, at build time or runtime.

export const metadata: Metadata = {
  metadataBase: new URL("https://travelsphere.ai"),
  title: {
    default: "TravelSphere AI — Explore the World, Your Way",
    template: "%s | TravelSphere AI",
  },
  description:
    "Discover extraordinary destinations, unforgettable stays, and experiences designed around the way you travel. Explore on an interactive globe, plan with AI, and book in minutes.",
  openGraph: {
    title: "TravelSphere AI — Explore the World, Your Way",
    description:
      "Discover extraordinary destinations, unforgettable stays, and experiences designed around the way you travel.",
    siteName: "TravelSphere AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelSphere AI — Explore the World, Your Way",
    description:
      "Discover extraordinary destinations, unforgettable stays, and experiences designed around the way you travel.",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#0B1120",
};

// Runs before hydration so the correct theme class is present on first paint
// (no flash of the wrong theme), reading only from localStorage — no cookies,
// no server calls.
const themeInitScript = `
(function() {
  try {
    var stored = window.localStorage.getItem('ts_theme');
    var theme = stored ? JSON.parse(stored) : 'dark';
    document.documentElement.classList.add(theme === 'light' ? 'light' : 'dark');
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-body bg-void text-ink antialiased" suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
