"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Log = {
  id: string; service_date: string; description: string;
  cost: number; next_service_date: string | null; notes: string | null;
};

export default function MaintenanceForm({ log }: { log?: Log }) {
  const router = useRouter();
  const isEdit = !!log;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    service_date:      log?.service_date ?? new Date().toISOString().split("T")[0],
    description:       log?.description ?? "",
    cost:              log?.cost ?? 0,
    next_service_date: log?.next_service_date ?? "",
    notes:             log?.notes ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const payload = {
      ...form,
      cost: Number(form.cost),
      next_service_date: form.next_service_date || null,
      notes: form.notes || null,
    };

    const { error: err } = isEdit
      ? await supabase.from("maintenance").update(payload).eq("id", log.id)
      : await supabase.from("maintenance").insert(payload);

    if (err) { setError(err.message); setLoading(false); return; }
    router.push("/admin/maintenance");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this maintenance log?")) return;
    const supabase = createClient();
    await supabase.from("maintenance").delete().eq("id", log!.id);
    router.push("/admin/maintenance");
    router.refresh();
  };

  const commonServices = ["Oil Change", "Engine Tune-Up", "Hull Cleaning", "Prop Inspection", "Bilge Pump Service", "Electrical Check", "Fuel System Service", "Upholstery Repair"];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Service Date *</label>
          <input type="date" required className="input" value={form.service_date}
            onChange={e => setForm({...form, service_date: e.target.value})} />
        </div>
        <div>
          <label className="label">Cost (USD) *</label>
          <input type="number" min={0} step="0.01" required className="input" value={form.cost}
            onChange={e => setForm({...form, cost: Number(e.target.value)})} />
        </div>
      </div>

      <div>
        <label className="label">Description *</label>
        <input type="text" required className="input" value={form.description}
          onChange={e => setForm({...form, description: e.target.value})}
          placeholder="e.g. Oil change + filter replacement" />
        <div className="flex flex-wrap gap-2 mt-2">
          {commonServices.map(s => (
            <button key={s} type="button"
              onClick={() => setForm({...form, description: s})}
              className="text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-[#446084] hover:text-white text-gray-500 transition-colors">
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label">Next Service Date</label>
        <input type="date" className="input" value={form.next_service_date}
          onChange={e => setForm({...form, next_service_date: e.target.value})} />
      </div>

      <div>
        <label className="label">Notes</label>
        <textarea rows={3} className="input resize-none" value={form.notes}
          onChange={e => setForm({...form, notes: e.target.value})}
          placeholder="Parts replaced, mechanic name, observations…" />
      </div>

      {error && <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-3">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={loading}
          className="flex-1 bg-[#446084] hover:bg-[#334862] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors">
          {loading ? "Saving…" : isEdit ? "Save Changes" : "Log Service"}
        </button>
        <button type="button" onClick={() => router.back()}
          className="px-6 py-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm transition-colors">
          Cancel
        </button>
        {isEdit && (
          <button type="button" onClick={handleDelete}
            className="px-4 py-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 text-sm transition-colors">
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
