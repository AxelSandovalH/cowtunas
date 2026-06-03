import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const statusColor: Record<string, string> = {
  pending:   "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default async function BookingsPage() {
  const supabase = await createClient();
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, clients(full_name)")
    .order("trip_date", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2b3c]">Bookings</h1>
          <p className="text-gray-400 text-sm mt-1">{bookings?.length ?? 0} total reservations</p>
        </div>
        <Link
          href="/admin/bookings/new"
          className="bg-[#d26e4b] hover:bg-[#bc5e3d] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          + New Booking
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {!bookings?.length ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">📅</p>
            <p className="font-medium">No bookings yet</p>
            <Link href="/admin/bookings/new" className="text-[#446084] text-sm mt-2 inline-block hover:underline">
              Create the first one →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Date", "Client", "Anglers", "Status", "Total", "Expenses", "Net", ""].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs text-gray-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-medium text-[#1a2b3c] whitespace-nowrap">
                    {new Date(b.trip_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {(b.clients as { full_name: string } | null)?.full_name ?? <span className="text-gray-300 italic">No client</span>}
                  </td>
                  <td className="px-5 py-4 text-gray-600">{b.anglers}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${statusColor[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold">${Number(b.total_price).toLocaleString()}</td>
                  <td className="px-5 py-4 text-red-500">{b.expenses > 0 ? `-$${Number(b.expenses).toLocaleString()}` : "—"}</td>
                  <td className="px-5 py-4 font-bold text-green-600">
                    ${(Number(b.total_price) - Number(b.expenses)).toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/admin/bookings/${b.id}`} className="text-[#446084] hover:underline text-xs font-medium">
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
