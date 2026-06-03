import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const channelBadge: Record<string, string> = {
  email:     "bg-blue-100 text-blue-700",
  whatsapp:  "bg-green-100 text-green-700",
  both:      "bg-purple-100 text-purple-700",
};

export default async function CampaignsPage() {
  const supabase = await createClient();
  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2b3c]">Campaigns</h1>
          <p className="text-gray-400 text-sm mt-1">WhatsApp, Email & Follow-ups</p>
        </div>
        <Link href="/admin/campaigns/new"
          className="bg-[#d26e4b] hover:bg-[#bc5e3d] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
          + New Campaign
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Sent", value: campaigns?.filter(c => c.sent_at).length ?? 0, color: "text-[#446084]" },
          { label: "Total Recipients", value: campaigns?.reduce((s, c) => s + (c.recipients_count ?? 0), 0) ?? 0, color: "text-green-600" },
          { label: "Drafts", value: campaigns?.filter(c => !c.sent_at).length ?? 0, color: "text-[#d26e4b]" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {!campaigns?.length ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">📣</p>
            <p className="font-medium">No campaigns yet</p>
            <Link href="/admin/campaigns/new" className="text-[#446084] text-sm mt-2 inline-block hover:underline">
              Create your first campaign →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Campaign", "Channel", "Recipients", "Status", "Date", ""].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs text-gray-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-[#1a2b3c]">{c.name}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${channelBadge[c.channel]}`}>
                      {c.channel}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{c.recipients_count ?? 0}</td>
                  <td className="px-5 py-4">
                    {c.sent_at
                      ? <span className="inline-flex px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold">Sent</span>
                      : <span className="inline-flex px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full font-semibold">Draft</span>}
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-xs">
                    {c.sent_at
                      ? new Date(c.sent_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                      : new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/admin/campaigns/${c.id}`} className="text-[#446084] hover:underline text-xs font-medium">
                      {c.sent_at ? "View" : "Edit"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
