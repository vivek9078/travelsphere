"use client";

import { useMemo, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useAdminCollection } from "@/hooks/useAdminCollection";
import { getAllDestinations } from "@/lib/mock-data/destinations";
import { fetchDestinations } from "@/lib/api";
import { useEffect, useState as useReactState } from "react";
import { STORAGE_KEYS } from "@/lib/storage";

type AdminDestination = {
  id: string;
  name: string;
  countryName: string;
  heroImage: string;
  bestSeason: string;
  tripDuration: string;
  priceFrom: number;
  rating: number;
};

const seed: AdminDestination[] = getAllDestinations().map((d) => ({
  id: d.slug,
  name: d.name,
  countryName: d.countryName,
  heroImage: d.heroImage,
  bestSeason: d.bestSeason,
  tripDuration: d.tripDuration,
  priceFrom: d.priceFrom,
  rating: d.rating,
}));

const emptyForm: Omit<AdminDestination, "id"> = {
  name: "",
  countryName: "",
  heroImage: "",
  bestSeason: "",
  tripDuration: "",
  priceFrom: 0,
  rating: 4.5,
};

export default function DestinationsManager() {
  const [localSeed, setLocalSeed] = useReactState<AdminDestination[]>(seed);

  useEffect(() => {
    fetchDestinations()
      .then((dests) => {
        setLocalSeed(dests.map((d) => ({
          id: d.slug,
          name: d.name,
          countryName: d.countryName,
          heroImage: d.heroImage,
          bestSeason: d.bestSeason,
          tripDuration: d.tripDuration,
          priceFrom: d.priceFrom,
          rating: d.rating,
        })));
      })
      .catch(() => {});
  }, []);

  const { items, add, update, remove } = useAdminCollection<AdminDestination>(STORAGE_KEYS.adminDestinations, localSeed);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const countries = useMemo(() => Array.from(new Set(items.map((i) => i.countryName))), [items]);
  const filtered = items.filter((i) => {
    const matchesQuery = i.name.toLowerCase().includes(query.toLowerCase());
    const matchesCountry = country === "All" || i.countryName === country;
    return matchesQuery && matchesCountry;
  });

  function openAdd() {
    setForm(emptyForm);
    setEditingId(null);
    setFormOpen(true);
  }

  function openEdit(item: AdminDestination) {
    setForm(item);
    setEditingId(item.id);
    setFormOpen(true);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) update(editingId, form);
    else add(form);
    setFormOpen(false);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-aqua">Manage</p>
          <h1 className="mt-2 font-display text-3xl text-ink">Destinations</h1>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-full bg-amber px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-void hover:bg-amber-soft">
          <Plus size={14} /> Add destination
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search destinations…" className="rounded-full border border-line/60 bg-surface px-4 py-2.5 text-sm text-ink outline-none focus-visible:border-amber" />
        <select value={country} onChange={(e) => setCountry(e.target.value)} className="rounded-full border border-line/60 bg-surface px-4 py-2.5 text-xs text-ink outline-none">
          <option>All</option>
          {countries.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-line/60">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-mute">
            <tr>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest">Name</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest">Country</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest">Price from</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest">Rating</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.id} className="border-t border-line/60 bg-surface/60">
                <td className="px-4 py-3 text-ink">{d.name}</td>
                <td className="px-4 py-3 text-mute">{d.countryName}</td>
                <td className="px-4 py-3 font-tabular text-ink">₹{d.priceFrom.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-ink">{d.rating.toFixed(1)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => openEdit(d)} className="rounded-lg p-2 text-mute hover:bg-surface2 hover:text-amber"><Pencil size={14} /></button>
                    <button onClick={() => remove(d.id)} className="rounded-lg p-2 text-mute hover:bg-surface2 hover:text-red-400"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-6 text-center text-sm text-mute">No destinations found.</p>}
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-void/70 p-6 backdrop-blur-sm" onClick={() => setFormOpen(false)}>
          <form onSubmit={handleSave} onClick={(e) => e.stopPropagation()} className="w-full max-w-md space-y-4 rounded-2xl border border-line/60 bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl text-ink">{editingId ? "Edit destination" : "Add destination"}</h2>
              <button type="button" onClick={() => setFormOpen(false)}><X size={18} className="text-mute" /></button>
            </div>
            <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Name" className="w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none" />
            <input required value={form.countryName} onChange={(e) => setForm((f) => ({ ...f, countryName: e.target.value }))} placeholder="Country" className="w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none" />
            <input value={form.heroImage} onChange={(e) => setForm((f) => ({ ...f, heroImage: e.target.value }))} placeholder="Hero image URL" className="w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none" />
            <div className="grid grid-cols-2 gap-3">
              <input value={form.bestSeason} onChange={(e) => setForm((f) => ({ ...f, bestSeason: e.target.value }))} placeholder="Best season" className="w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none" />
              <input value={form.tripDuration} onChange={(e) => setForm((f) => ({ ...f, tripDuration: e.target.value }))} placeholder="Trip duration" className="w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" value={form.priceFrom} onChange={(e) => setForm((f) => ({ ...f, priceFrom: Number(e.target.value) }))} placeholder="Price from" className="w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none" />
              <input type="number" step="0.1" min={0} max={5} value={form.rating} onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))} placeholder="Rating" className="w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none" />
            </div>
            <button type="submit" className="w-full rounded-full bg-amber py-2.5 font-mono text-xs uppercase tracking-widest text-void hover:bg-amber-soft">
              {editingId ? "Save changes" : "Add destination"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
