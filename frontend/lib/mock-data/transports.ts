export type TransportOption = {
  id: string;
  type: "Flight" | "Train" | "Car Rental" | "Airport Transfer";
  provider: string;
  from: string;
  to: string;
  duration: string;
  price: number;
  currency: string;
  class: string;
};

export const transportOptions: TransportOption[] = [
  { id: "t1", type: "Flight", provider: "IndiGo", from: "Delhi (DEL)", to: "Jaipur (JAI)", duration: "1h 05m", price: 3499, currency: "₹", class: "Economy" },
  { id: "t2", type: "Flight", provider: "Singapore Airlines", from: "Mumbai (BOM)", to: "Singapore (SIN)", duration: "5h 40m", price: 24999, currency: "₹", class: "Economy" },
  { id: "t3", type: "Flight", provider: "Emirates", from: "Delhi (DEL)", to: "Dubai (DXB)", duration: "3h 20m", price: 18999, currency: "₹", class: "Economy" },
  { id: "t4", type: "Flight", provider: "Air France", from: "Delhi (DEL)", to: "Paris (CDG)", duration: "9h 15m", price: 52999, currency: "₹", class: "Economy" },
  { id: "t5", type: "Train", provider: "Swiss Rail (SBB)", from: "Geneva", to: "Zermatt", duration: "3h 30m", price: 8999, currency: "₹", class: "2nd Class" },
  { id: "t6", type: "Car Rental", provider: "Hertz", from: "Phuket Airport", to: "Patong", duration: "45 min", price: 1499, currency: "₹", class: "Compact SUV" },
  { id: "t7", type: "Airport Transfer", provider: "TravelSphere Transfers", from: "Male Airport", to: "Resort Jetty", duration: "35 min (seaplane)", price: 15999, currency: "₹", class: "Seaplane" },
  { id: "t8", type: "Flight", provider: "ANA", from: "Delhi (DEL)", to: "Tokyo (HND)", duration: "8h 10m", price: 47999, currency: "₹", class: "Economy" },
];

export function getTransportsBetween(from: string, to: string): TransportOption[] {
  return transportOptions.filter(
    (t) => t.from.toLowerCase().includes(from.toLowerCase()) || t.to.toLowerCase().includes(to.toLowerCase())
  );
}
