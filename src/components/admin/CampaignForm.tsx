"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Client = { id: string; full_name: string; email: string | null; phone: string | null; country: string | null };

const TEMPLATES = [
  {
    label: "🎣 Peak Season",
    message: "Hi {name}! Peak tuna season is here in Cabo — October through February. Captain Nestor is ready to take you out! Book your charter at cowtunas.com or reply here. 🐟",
  },
  {
    label: "⭐ Review Request",
    message: "Hi {name}! Hope your trip with CowTunas was unforgettable. We'd love it if you left us a review — it helps other anglers find us! Thank you 🙏",
  },
  {
    label: "🔁 Return Promo",
    message: "Hi {name}! It's been a while since your last trip. Come back and fish with Captain Nestor — we'd love to see you again. Special rates for returning guests! 🐠",
  },
  {
    label: "🎄 Holiday Special",
    message: "Happy Holidays {name}! Give the gift of an unforgettable fishing charter in Cabo this season. Book now at cowtunas.com 🎁🎣",
  },
];

export default function CampaignForm({ clients }: { clients: Client[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState("");
  const [channel, setChannel] = useState<"whatsapp" | "email" | "both">("whatsapp");
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filterCountry, setFilterCountry] = useState("");

  const countries = [...new Set(clients.map(c => c.country).filter(Boolean))].sort();

  const filtered = clients.filter(c => {
    if (filterCountry && c.country !== filterCountry) return false;
    if (channel === "whatsapp" && !c.phone) return false;
    if (channel === "email" && !c.email) return false;
    return true;
  });

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(c => c.id)));
  };

  const preview = (clientName: string) =>
    message.replace(/{name}/g, clientName.split(" ")[0]);

  const generateWhatsAppLinks = () => {
    return clients
      .filter(c => selected.has(c.id) && c.phone)
      .map(c => ({
        name: c.full_name,
        url: `https://wa.me/${c.phone?.replace(/\D/g, "")}?text=${encodeURIComponent(preview(c.full_name))}`,
      }));
  };

  const handleSave = async (send = false) => {
    if (!name || !message) { setError("Name and message are required."); return; }
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { error: err } = await supabase.from("campaigns").insert({
      name,
      channel,
      message,
      recipients_count: selected.size,
      sent_at: send ? new Date().toISOString() : null,
      created_by: user!.id,
    });

    if (err) { setError(err.message); setLoading(false); return; }
    setSaved(true);
    setLoading(false);
    if (!send) { router.push("/admin/campaigns"); router.refresh(); }
  };

  const waLinks = channel !== "email" ? generateWhatsAppLinks() : [];

  if (saved && channel !== "email") return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
      <div className="text-center pb-4 border-b border-gray-100">
        <p className="text-2xl mb-2">📱</p>
        <h2 className="text-xl font-bold text-[#1a2b3c]">Campaign saved — {waLinks.length} WhatsApp links ready</h2>
        <p className="text-gray-400 text-sm mt-1">Click each link to open WhatsApp with the message pre-filled</p>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {waLinks.map((l, i) => (
          <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
            <svg className="w-5 h-5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="text-green-800 font-medium text-sm">{l.name}</span>
            <span className="ml-auto text-green-500 text-xs">Open →</span>
          </a>
        ))}
      </div>
      <button onClick={() => { router.push("/admin/campaigns"); router.refresh(); }}
        className="w-full border border-gray-200 text-gray-500 py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors">
        Back to Campaigns
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Campaign details */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="label">Campaign Name *</label>
            <input type="text" className="input" value={name} onChange={e => setName(e.target.value)}
              placeholder="Peak Season 2025" />
          </div>
          <div>
            <label className="label">Channel</label>
            <select className="input" value={channel} onChange={e => setChannel(e.target.value as "whatsapp" | "email" | "both")}>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
              <option value="both">Both</option>
            </select>
          </div>
        </div>

        <div>
          <label className="label">Message *</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {TEMPLATES.map(t => (
              <button key={t.label} type="button" onClick={() => setMessage(t.message)}
                className="text-xs px-3 py-1.5 rounded-full bg-gray-100 hover:bg-[#446084] hover:text-white text-gray-600 transition-colors">
                {t.label}
              </button>
            ))}
          </div>
          <textarea rows={5} className="input resize-none" value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Write your message… use {name} to personalize" />
          {message && (
            <div className="mt-2 bg-[#f7f3ed] rounded-xl p-4">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Preview for "John Smith"</p>
              <p className="text-sm text-gray-700">{preview("John Smith")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Recipients */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-[#1a2b3c]">Select Recipients</h2>
            <p className="text-xs text-gray-400 mt-0.5">{selected.size} selected of {filtered.length} eligible</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-500"
              value={filterCountry} onChange={e => setFilterCountry(e.target.value)}>
              <option value="">All countries</option>
              {countries.map(c => <option key={c!} value={c!}>{c}</option>)}
            </select>
            <button type="button" onClick={toggleAll}
              className="text-xs text-[#446084] hover:underline font-medium">
              {selected.size === filtered.length ? "Deselect all" : "Select all"}
            </button>
          </div>
        </div>
        <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
          {filtered.length === 0 ? (
            <p className="text-center py-8 text-gray-400 text-sm">No clients match the current channel and filter</p>
          ) : filtered.map(c => (
            <label key={c.id} className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" className="accent-[#446084]"
                checked={selected.has(c.id)}
                onChange={() => {
                  const s = new Set(selected);
                  s.has(c.id) ? s.delete(c.id) : s.add(c.id);
                  setSelected(s);
                }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1a2b3c]">{c.full_name}</p>
                <p className="text-xs text-gray-400 truncate">{c.email ?? c.phone ?? "—"}</p>
              </div>
              {c.country && <span className="text-xs text-gray-400">{c.country}</span>}
            </label>
          ))}
        </div>
      </div>

      {error && <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-3">{error}</p>}

      <div className="flex gap-3">
        <button type="button" onClick={() => handleSave(false)} disabled={loading || selected.size === 0}
          className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-colors disabled:opacity-40">
          Save as Draft
        </button>
        <button type="button" onClick={() => handleSave(true)} disabled={loading || selected.size === 0}
          className="flex-1 bg-[#d26e4b] hover:bg-[#bc5e3d] text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-40">
          {loading ? "Saving…" : channel === "email" ? `Send to ${selected.size} emails` : `Generate ${selected.size} WhatsApp links`}
        </button>
      </div>
    </div>
  );
}
