import { Destination } from "@/types";

export async function fetchDestinations(): Promise<Destination[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    const res = await fetch(`${apiUrl}/api/destinations`, {
      // Revalidate every hour, or adjust as needed.
      // Using next: { revalidate: 3600 } is good for standard data.
      // But we will fetch per request to match "connect to API" requirement better.
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch destinations: ${res.status}`);
    }

    const data = await res.json();
    return data as Destination[];
  } catch (error) {
    console.error("Error fetching destinations from API, falling back to empty array:", error);
    // Let the caller handle the fallback so we know it failed
    throw error;
  }
}
