"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Client = {
  id: string; full_name: string; email: string | null;
  phone: string | null; country: string | null; notes: string | null;
};

type Props = { client?: Client };

export default function ClientForm({ client }: Props) {
  const router = useRouter();
  const isEdit = !!client;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    full_name: client?.full_name ?? "",
    email:     client?.email ?? "",
    phone:     client?.phone ?? "",
    country:   client?.country ?? "",
    notes:     client?.notes ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();

    const payload = {
      full_name: form.full_name,
      email:   form.email   || null,
      phone:   form.phone   || null,
      country: form.country || null,
      notes:   form.notes   || null,
    };

    const { error: err } = isEdit
      ? await supabase.from("clients").update(payload).eq("id", client.id)
      : await supabase.from("clients").insert(payload);

    if (err) { setError(err.message); setLoading(false); return; }
    router.push("/admin/clients");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm(`Delete ${client!.full_name}? This cannot be undone.`)) return;
    const supabase = createClient();
    await supabase.from("clients").delete().eq("id", client!.id);
    router.push("/admin/clients");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
      <div>
        <label className="label">Full Name *</label>
        <input type="text" required className="input" value={form.full_name}
          onChange={e => setForm({...form, full_name: e.target.value})}
          placeholder="John Smith" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Email</label>
          <input type="email" className="input" value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            placeholder="john@email.com" />
        </div>
        <div>
          <label className="label">WhatsApp / Phone</label>
          <input type="tel" className="input" value={form.phone}
            onChange={e => setForm({...form, phone: e.target.value})}
            placeholder="+1 555 000 0000" />
        </div>
      </div>

      <div>
        <label className="label">Country</label>
        <input type="text" className="input" value={form.country}
          onChange={e => setForm({...form, country: e.target.value})}
          placeholder="USA, Canada, Mexico…" />
      </div>

      <div>
        <label className="label">Notes</label>
        <textarea rows={3} className="input resize-none" value={form.notes}
          onChange={e => setForm({...form, notes: e.target.value})}
          placeholder="Preferred species, return customer, special notes…" />
      </div>

      {error && <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-3">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={loading}
          className="flex-1 bg-[#446084] hover:bg-[#334862] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors">
          {loading ? "Saving…" : isEdit ? "Save Changes" : "Add Client"}
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
