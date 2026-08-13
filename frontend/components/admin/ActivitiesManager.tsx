"use client";

import { useMemo, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useAdminCollection } from "@/hooks/useAdminCollection";
import { getAllActivities } from "@/lib/mock-data/activities";
import { STORAGE_KEYS } from "@/lib/storage";

type AdminActivity = {
  id: string;
  name: string;
  destinationName: string;
  category: string;
  heroImage: string;
  price: number;
  duration: string;
};

const seed: AdminActivity[] = getAllActivities().map((a) => ({
  id: a.slug,
  name: a.name,
  destinationName: a.destinationName,
  category: a.category,
  heroImage: a.heroImage,
  price: a.price,
  duration: a.duration,
}));

const emptyForm: Omit<AdminActivity, "id"> = {
  name: "",
  destinationName: "",
  category: "City Tours",
  heroImage: "",
  price: 0,
  duration: "",
};

export default function ActivitiesManager() {
  const { items, add, update, remove } = useAdminCollection<AdminActivity>(STORAGE_KEYS.adminActivities, seed);
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() => items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase())), [items, query]);

  function openAdd() { setForm(emptyForm); setEditingId(null); setFormOpen(true); }
  function openEdit(item: AdminActivity) { setForm(item); setEditingId(item.id); setFormOpen(true); }
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
          <h1 className="mt-2 font-display text-3xl text-ink">Activities</h1>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-full bg-amber px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-void hover:bg-amber-soft">
          <Plus size={14} /> Add activity
        </button>
      </div>

      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search activities…" className="mt-6 rounded-full border border-line/60 bg-surface px-4 py-2.5 text-sm text-ink outline-none focus-visible:border-amber" />

      <div className="mt-6 overflow-x-auto rounded-xl border border-line/60">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-mute">
            <tr>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest">Name</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest">Destination</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest">Category</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest">Price</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-t border-line/60 bg-surface/60">
                <td className="px-4 py-3 text-ink">{a.name}</td>
                <td className="px-4 py-3 text-mute">{a.destinationName}</td>
                <td className="px-4 py-3 text-mute">{a.category}</td>
                <td className="px-4 py-3 font-tabular text-ink">₹{a.price.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => openEdit(a)} className="rounded-lg p-2 text-mute hover:bg-surface2 hover:text-amber"><Pencil size={14} /></button>
                    <button onClick={() => remove(a.id)} className="rounded-lg p-2 text-mute hover:bg-surface2 hover:text-red-400"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-6 text-center text-sm text-mute">No activities found.</p>}
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-void/70 p-6 backdrop-blur-sm" onClick={() => setFormOpen(false)}>
          <form onSubmit={handleSave} onClick={(e) => e.stopPropagation()} className="w-full max-w-md space-y-4 rounded-2xl border border-line/60 bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl text-ink">{editingId ? "Edit activity" : "Add activity"}</h2>
              <button type="button" onClick={() => setFormOpen(false)}><X size={18} className="text-mute" /></button>
            </div>
            <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Activity name" className="w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none" />
            <input required value={form.destinationName} onChange={(e) => setForm((f) => ({ ...f, destinationName: e.target.value }))} placeholder="Destination" className="w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none" />
            <input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="Category" className="w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none" />
            <input value={form.heroImage} onChange={(e) => setForm((f) => ({ ...f, heroImage: e.target.value }))} placeholder="Image URL" className="w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none" />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))} placeholder="Price" className="w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none" />
              <input value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))} placeholder="Duration" className="w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none" />
            </div>
            <button type="submit" className="w-full rounded-full bg-amber py-2.5 font-mono text-xs uppercase tracking-widest text-void hover:bg-amber-soft">
              {editingId ? "Save changes" : "Add activity"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
