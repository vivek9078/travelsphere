"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle2, User, ClipboardList, CreditCard, PartyPopper } from "lucide-react";
import { createBooking } from "@/lib/demo-booking";
import { useAuth } from "@/hooks/useAuth";
import type { Booking } from "@/types";

type Step = "details" | "review" | "payment" | "confirmation";

export type BookingSummary = {
  type: Booking["type"];
  itemSlug: string;
  itemName: string;
  destinationName: string;
  image: string;
  checkIn: string;
  checkOut?: string;
  nights?: number;
  guests: number;
  totalPrice: number;
  currency: string;
};

const steps: { id: Step; label: string; icon: typeof User }[] = [
  { id: "details", label: "Guest Details", icon: User },
  { id: "review", label: "Review", icon: ClipboardList },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "confirmation", label: "Confirmed", icon: PartyPopper },
];

export default function BookingWizard({ summary }: { summary: BookingSummary }) {
  const router = useRouter();
  const { session } = useAuth();
  const [step, setStep] = useState<Step>("details");
  const [name, setName] = useState(session?.name ?? "");
  const [email, setEmail] = useState(session?.email ?? "");
  const [phone, setPhone] = useState("");
  const [processing, setProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", nameOnCard: "" });

  const stepIndex = steps.findIndex((s) => s.id === step);
  const detailsValid = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email) && phone.trim().length >= 7;
  const cardValid = card.number.replace(/\s/g, "").length >= 12 && card.expiry.length >= 4 && card.cvc.length >= 3 && card.nameOnCard.trim().length > 1;

  function handlePay() {
    setProcessing(true);
    // Simulated payment processing — no real payment gateway is involved.
    setTimeout(() => {
      const booking = createBooking({
        type: summary.type,
        itemSlug: summary.itemSlug,
        itemName: summary.itemName,
        destinationName: summary.destinationName,
        image: summary.image,
        checkIn: summary.checkIn,
        checkOut: summary.checkOut,
        nights: summary.nights,
        guests: summary.guests,
        totalPrice: summary.totalPrice,
        currency: summary.currency,
      });
      setConfirmedBooking(booking);
      setProcessing(false);
      setStep("confirmation");
    }, 1400);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-10 flex items-center justify-between">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const active = i <= stepIndex;
          return (
            <div key={s.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full border ${active ? "border-amber bg-amber/10 text-amber" : "border-line/60 text-mute"}`}>
                  <Icon size={16} />
                </div>
                <p className={`font-mono text-[10px] uppercase tracking-widest ${active ? "text-ink" : "text-mute"}`}>{s.label}</p>
              </div>
              {i < steps.length - 1 && <div className={`mx-2 h-px flex-1 ${i < stepIndex ? "bg-amber" : "bg-line/60"}`} />}
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-line/60 bg-surface p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-4 border-b border-line/60 pb-6">
          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
            <Image src={summary.image} alt={summary.itemName} fill className="object-cover" />
          </div>
          <div>
            <p className="font-display text-lg text-ink">{summary.itemName}</p>
            <p className="text-xs text-mute">{summary.destinationName}</p>
          </div>
        </div>

        {step === "details" && (
          <div className="space-y-4">
            <h2 className="font-display text-xl text-ink">Guest details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-mute">
                Full name
                <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2 text-ink outline-none focus-visible:border-amber" />
              </label>
              <label className="text-sm text-mute">
                Phone number
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2 text-ink outline-none focus-visible:border-amber" />
              </label>
              <label className="text-sm text-mute sm:col-span-2">
                Email address
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2 text-ink outline-none focus-visible:border-amber" />
              </label>
            </div>
            <button
              onClick={() => setStep("review")}
              disabled={!detailsValid}
              className="mt-4 w-full rounded-full bg-amber py-3 font-mono text-xs uppercase tracking-widest text-void transition-colors hover:bg-amber-soft disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue to review
            </button>
          </div>
        )}

        {step === "review" && (
          <div className="space-y-4">
            <h2 className="font-display text-xl text-ink">Review your booking</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-mute">Guest</dt><dd className="text-ink">{name}</dd></div>
              <div className="flex justify-between"><dt className="text-mute">Email</dt><dd className="text-ink">{email}</dd></div>
              <div className="flex justify-between"><dt className="text-mute">Phone</dt><dd className="text-ink">{phone}</dd></div>
              <div className="flex justify-between"><dt className="text-mute">{summary.type === "hotel" ? "Check-in" : "Date"}</dt><dd className="text-ink">{summary.checkIn}</dd></div>
              {summary.checkOut && <div className="flex justify-between"><dt className="text-mute">Check-out</dt><dd className="text-ink">{summary.checkOut}</dd></div>}
              <div className="flex justify-between"><dt className="text-mute">Guests</dt><dd className="text-ink">{summary.guests}</dd></div>
              <div className="flex justify-between border-t border-line/60 pt-2 font-semibold"><dt className="text-ink">Total</dt><dd className="font-tabular text-amber">{summary.currency}{summary.totalPrice.toLocaleString("en-IN")}</dd></div>
            </dl>
            <div className="flex gap-3">
              <button onClick={() => setStep("details")} className="w-full rounded-full border border-line/60 py-3 font-mono text-xs uppercase tracking-widest text-ink">Back</button>
              <button onClick={() => setStep("payment")} className="w-full rounded-full bg-amber py-3 font-mono text-xs uppercase tracking-widest text-void hover:bg-amber-soft">Continue to payment</button>
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="space-y-4">
            <h2 className="font-display text-xl text-ink">Payment</h2>
            <p className="text-xs text-mute">This is a simulated payment screen — no real card is charged.</p>
            <div className="grid gap-4">
              <label className="text-sm text-mute">
                Name on card
                <input value={card.nameOnCard} onChange={(e) => setCard((c) => ({ ...c, nameOnCard: e.target.value }))} className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2 text-ink outline-none focus-visible:border-amber" />
              </label>
              <label className="text-sm text-mute">
                Card number
                <input value={card.number} onChange={(e) => setCard((c) => ({ ...c, number: e.target.value }))} placeholder="4242 4242 4242 4242" className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2 text-ink outline-none focus-visible:border-amber" />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="text-sm text-mute">
                  Expiry
                  <input value={card.expiry} onChange={(e) => setCard((c) => ({ ...c, expiry: e.target.value }))} placeholder="MM/YY" className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2 text-ink outline-none focus-visible:border-amber" />
                </label>
                <label className="text-sm text-mute">
                  CVC
                  <input value={card.cvc} onChange={(e) => setCard((c) => ({ ...c, cvc: e.target.value }))} placeholder="123" className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2 text-ink outline-none focus-visible:border-amber" />
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep("review")} className="w-full rounded-full border border-line/60 py-3 font-mono text-xs uppercase tracking-widest text-ink">Back</button>
              <button
                onClick={handlePay}
                disabled={!cardValid || processing}
                className="w-full rounded-full bg-amber py-3 font-mono text-xs uppercase tracking-widest text-void hover:bg-amber-soft disabled:cursor-not-allowed disabled:opacity-40"
              >
                {processing ? "Processing…" : `Confirm Booking · ${summary.currency}${summary.totalPrice.toLocaleString("en-IN")}`}
              </button>
            </div>
          </div>
        )}

        {step === "confirmation" && confirmedBooking && (
          <div className="space-y-5 text-center">
            <CheckCircle2 size={48} className="mx-auto text-aqua" />
            <h2 className="font-display text-2xl text-ink">Booking Confirmed</h2>
            <p className="text-sm text-mute">A confirmation has been added to your dashboard.</p>
            <div className="mx-auto max-w-sm space-y-2 rounded-xl border border-line/60 bg-surface2 p-4 text-left text-sm">
              <div className="flex justify-between"><span className="text-mute">Booking ID</span><span className="font-mono text-ink">{confirmedBooking.id}</span></div>
              <div className="flex justify-between"><span className="text-mute">Destination</span><span className="text-ink">{confirmedBooking.destinationName}</span></div>
              <div className="flex justify-between"><span className="text-mute">{summary.type === "hotel" ? "Hotel" : "Activity"}</span><span className="text-ink">{confirmedBooking.itemName}</span></div>
              <div className="flex justify-between"><span className="text-mute">Dates</span><span className="text-ink">{confirmedBooking.checkIn}{confirmedBooking.checkOut ? ` → ${confirmedBooking.checkOut}` : ""}</span></div>
              <div className="flex justify-between"><span className="text-mute">Guests</span><span className="text-ink">{confirmedBooking.guests}</span></div>
              <div className="flex justify-between font-semibold"><span className="text-ink">Total paid</span><span className="font-tabular text-amber">{confirmedBooking.currency}{confirmedBooking.totalPrice.toLocaleString("en-IN")}</span></div>
            </div>
            <div className="flex justify-center gap-3">
              <Link href="/dashboard" className="rounded-full bg-amber px-6 py-3 font-mono text-xs uppercase tracking-widest text-void hover:bg-amber-soft">Go to dashboard</Link>
              <button onClick={() => router.push("/explore")} className="rounded-full border border-line/60 px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink">Keep exploring</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
