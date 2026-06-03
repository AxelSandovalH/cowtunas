import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function MaintenancePage() {
  const supabase = await createClient();
  const { data: logs } = await supabase
    .from("maintenance")
    .select("*")
    .order("service_date", { ascending: false });

  const totalCost = logs?.reduce((s, l) => s + Number(l.cost), 0) ?? 0;

  const upcoming = logs?.find(l => l.next_service_date &&
    new Date(l.next_service_date) > new Date());

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2b3c]">Maintenance — Kailani</h1>
          <p className="text-gray-400 text-sm mt-1">Total spent: ${totalCost.toLocaleString()}</p>
        </div>
        <Link href="/admin/maintenance/new"
          className="bg-[#d26e4b] hover:bg-[#bc5e3d] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
          + Log Service
        </Link>
      </div>

      {/* Next service alert */}
      {upcoming && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-2xl px-6 py-4 flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-semibold text-yellow-800 text-sm">Upcoming Service</p>
            <p className="text-yellow-700 text-sm">
              {upcoming.description} — scheduled for{" "}
              <strong>{new Date(upcoming.next_service_date!).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</strong>
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {!logs?.length ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">🔧</p>
            <p className="font-medium">No maintenance logs yet</p>
            <Link href="/admin/maintenance/new" className="text-[#446084] text-sm mt-2 inline-block hover:underline">
              Log the first service →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Date", "Description", "Cost", "Next Service", ""].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs text-gray-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-medium text-[#1a2b3c] whitespace-nowrap">
                    {new Date(l.service_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-5 py-4 text-gray-600">{l.description}</td>
                  <td className="px-5 py-4 font-semibold text-red-500">-${Number(l.cost).toLocaleString()}</td>
                  <td className="px-5 py-4 text-gray-400 text-xs">
                    {l.next_service_date
                      ? new Date(l.next_service_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                      : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/admin/maintenance/${l.id}`} className="text-[#446084] hover:underline text-xs font-medium">
                      Edit
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
