import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch summary stats
  const [bookingsRes, clientsRes, maintenanceRes] = await Promise.all([
    supabase.from("bookings").select("status, total_price, expenses, trip_date"),
    supabase.from("clients").select("id", { count: "exact", head: true }),
    supabase.from("maintenance").select("cost").order("service_date", { ascending: false }).limit(1),
  ]);

  const bookings = bookingsRes.data ?? [];
  const totalClients = clientsRes.count ?? 0;
  const lastMaintenance = maintenanceRes.data?.[0];

  const completed = bookings.filter((b) => b.status === "completed");
  const upcoming = bookings.filter((b) =>
    b.status === "confirmed" && new Date(b.trip_date) >= new Date()
  );
  const totalRevenue = completed.reduce((s, b) => s + Number(b.total_price), 0);
  const totalExpenses = completed.reduce((s, b) => s + Number(b.expenses), 0);
  const netProfit = totalRevenue - totalExpenses;

  const stats = [
    { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, color: "text-green-600", bg: "bg-green-50" },
    { label: "Net Profit", value: `$${netProfit.toLocaleString()}`, color: "text-[#446084]", bg: "bg-blue-50" },
    { label: "Upcoming Trips", value: upcoming.length, color: "text-[#d26e4b]", bg: "bg-orange-50" },
    { label: "Total Clients", value: totalClients, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const recentBookings = bookings
    .sort((a, b) => new Date(b.trip_date).getTime() - new Date(a.trip_date).getTime())
    .slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a2b3c]">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-[#1a2b3c]">Recent Bookings</h2>
            <a href="/admin/bookings" className="text-[#446084] text-sm hover:underline">View all →</a>
          </div>
          {recentBookings.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-400 text-sm">No bookings yet</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs text-gray-400 uppercase tracking-widest">Date</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="text-right px-6 py-3 text-xs text-gray-400 uppercase tracking-widest">Revenue</th>
                  <th className="text-right px-6 py-3 text-xs text-gray-400 uppercase tracking-widest">Net</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentBookings.map((b, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 text-[#1a2b3c] font-medium">
                      {new Date(b.trip_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                        b.status === "completed" ? "bg-green-100 text-green-700" :
                        b.status === "confirmed" ? "bg-blue-100 text-blue-700" :
                        b.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right font-medium">${Number(b.total_price).toLocaleString()}</td>
                    <td className="px-6 py-3 text-right text-green-600 font-semibold">
                      ${(Number(b.total_price) - Number(b.expenses)).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-[#1a2b3c] mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { href: "/admin/bookings/new", label: "New Booking", color: "bg-[#d26e4b] text-white" },
                { href: "/admin/clients/new", label: "Add Client", color: "bg-[#446084] text-white" },
                { href: "/admin/maintenance/new", label: "Log Maintenance", color: "bg-gray-100 text-[#1a2b3c]" },
                { href: "/admin/campaigns/new", label: "New Campaign", color: "bg-gray-100 text-[#1a2b3c]" },
              ].map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  className={`block text-center py-2.5 px-4 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80 ${action.color}`}
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>

          {lastMaintenance && (
            <div className="bg-[#1a2b3c] rounded-2xl p-6 text-white">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Last Maintenance</p>
              <p className="font-bold text-lg">${Number(lastMaintenance.cost).toLocaleString()}</p>
              <a href="/admin/maintenance" className="text-[#d26e4b] text-xs mt-2 inline-block hover:underline">
                View log →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
