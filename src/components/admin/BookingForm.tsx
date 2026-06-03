"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Client = { id: string; full_name: string };
type Booking = {
  id: string; client_id: string | null; trip_date: string;
  anglers: number; status: string; total_price: number;
  deposit_paid: number; expenses: number; notes: string | null;
};

type Props = { clients: Client[]; booking?: Booking };

const statusOptions = ["pending", "confirmed", "completed", "cancelled"];

export default function BookingForm({ clients, booking }: Props) {
  const router = useRouter();
  const isEdit = !!booking;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    client_id:    booking?.client_id ?? "",
    trip_date:    booking?.trip_date ?? "",
    anglers:      booking?.anglers ?? 1,
    status:       booking?.status ?? "pending",
    total_price:  booking?.total_price ?? 0,
    deposit_paid: booking?.deposit_paid ?? 0,
    expenses:     booking?.expenses ?? 0,
    notes:        booking?.notes ?? "",
  });

  const net = Number(form.total_price) - Number(form.expenses);
  const balance = Number(form.total_price) - Number(form.deposit_paid);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();

    const payload = {
      ...form,
      client_id: form.client_id || null,
      anglers: Number(form.anglers),
      total_price: Number(form.total_price),
      deposit_paid: Number(form.deposit_paid),
      expenses: Number(form.expenses),
    };

    const { error: err } = isEdit
      ? await supabase.from("bookings").update(payload).eq("id", booking.id)
      : await supabase.from("bookings").insert(payload);

    if (err) { setError(err.message); setLoading(false); return; }
    router.push("/admin/bookings");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this booking?")) return;
    const supabase = createClient();
    await supabase.from("bookings").delete().eq("id", booking!.id);
    router.push("/admin/bookings");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">

      {/* Client + Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Client</label>
          <select className="input" value={form.client_id} onChange={e => setForm({...form, client_id: e.target.value})}>
            <option value="">— Walk-in / No client —</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Trip Date *</label>
          <input type="date" required className="input" value={form.trip_date}
            onChange={e => setForm({...form, trip_date: e.target.value})} />
        </div>
      </div>

      {/* Anglers + Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Anglers</label>
          <input type="number" min={1} max={3} className="input" value={form.anglers}
            onChange={e => setForm({...form, anglers: Number(e.target.value)})} />
        </div>
        <div>
          <label className="label">Status</label>
          <select className="input" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
            {statusOptions.map(s => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>
      </div>

      {/* Financials */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label className="label">Total Price (USD)</label>
          <input type="number" min={0} step="0.01" className="input" value={form.total_price}
            onChange={e => setForm({...form, total_price: Number(e.target.value)})} />
        </div>
        <div>
          <label className="label">Deposit Paid (USD)</label>
          <input type="number" min={0} step="0.01" className="input" value={form.deposit_paid}
            onChange={e => setForm({...form, deposit_paid: Number(e.target.value)})} />
        </div>
        <div>
          <label className="label">Expenses (USD)</label>
          <input type="number" min={0} step="0.01" className="input" value={form.expenses}
            onChange={e => setForm({...form, expenses: Number(e.target.value)})} />
        </div>
      </div>

      {/* Live summary */}
      <div className="grid grid-cols-2 gap-4 bg-[#f7f3ed] rounded-xl p-4">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Balance Due</p>
          <p className="text-xl font-bold text-[#d26e4b]">${balance.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Net Profit</p>
          <p className={`text-xl font-bold ${net >= 0 ? "text-green-600" : "text-red-500"}`}>
            ${net.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="label">Notes</label>
        <textarea rows={3} className="input resize-none" value={form.notes}
          onChange={e => setForm({...form, notes: e.target.value})}
          placeholder="Species caught, weather conditions, special requests..." />
      </div>

      {error && <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-3">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={loading}
          className="flex-1 bg-[#446084] hover:bg-[#334862] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors">
          {loading ? "Saving…" : isEdit ? "Save Changes" : "Create Booking"}
        </button>
        <button type="button" onClick={() => router.back()}
          className="px-6 py-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors text-sm">
          Cancel
        </button>
        {isEdit && (
          <button type="button" onClick={handleDelete}
            className="px-4 py-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors text-sm">
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
