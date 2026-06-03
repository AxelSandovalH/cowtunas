import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function ClientsPage() {
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("*, bookings(count)")
    .order("full_name");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2b3c]">Clients</h1>
          <p className="text-gray-400 text-sm mt-1">{clients?.length ?? 0} clients in database</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/clients/import"
            className="border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm">
            Import CSV
          </Link>
          <Link href="/admin/clients/new"
            className="bg-[#d26e4b] hover:bg-[#bc5e3d] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
            + New Client
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {!clients?.length ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">👥</p>
            <p className="font-medium">No clients yet</p>
            <Link href="/admin/clients/import" className="text-[#446084] text-sm mt-2 inline-block hover:underline">
              Import your list →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Name", "Email", "Phone", "Country", "Trips", ""].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs text-gray-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {clients.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-[#1a2b3c]">{c.full_name}</td>
                  <td className="px-5 py-4 text-gray-500">{c.email ?? <span className="text-gray-300">—</span>}</td>
                  <td className="px-5 py-4 text-gray-500">{c.phone ?? <span className="text-gray-300">—</span>}</td>
                  <td className="px-5 py-4 text-gray-500">{c.country ?? <span className="text-gray-300">—</span>}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex px-2 py-0.5 bg-[#446084]/10 text-[#446084] text-xs font-bold rounded-full">
                      {(c.bookings as { count: number }[])?.[0]?.count ?? 0}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/admin/clients/${c.id}`} className="text-[#446084] hover:underline text-xs font-medium">
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
