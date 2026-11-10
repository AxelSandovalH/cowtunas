import { createClient } from "@/lib/supabase/server";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  const open = (orders ?? []).filter((o) => o.status === "pending" || o.status === "paid");
  const kgOpen = open.reduce((s, o) => s + Number(o.kg), 0);

  return (
    <div>
      <div className="mb-8">
        <h1>Tuna Orders</h1>
        <p className="text-gray-400 text-sm mt-1">
          {orders?.length ?? 0} total · {open.length} open ({kgOpen} kg to deliver)
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {!orders?.length ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">📦</p>
            <p className="font-medium">No orders yet</p>
            <p className="text-sm mt-1">Orders from the Fresh Tuna page land here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Date", "Customer", "WhatsApp", "Address", "Kg", "Total", "Status"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-gray-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50 transition-colors align-top">
                    <td className="px-5 py-4 font-medium text-[#1a2b3c] whitespace-nowrap">
                      {new Date(o.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </td>
                    <td className="px-5 py-4 text-gray-700 font-medium">{o.customer_name}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {o.phone ? (
                        <a
                          href={`https://wa.me/${String(o.phone).replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0f89a8] hover:underline"
                        >
                          {o.phone}
                        </a>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-gray-500 max-w-[220px]">{o.address ?? "—"}</td>
                    <td className="px-5 py-4 font-semibold tabular-nums">{o.kg}</td>
                    <td className="px-5 py-4 font-bold text-green-700 tabular-nums whitespace-nowrap">
                      ${Number(o.total_mxn).toLocaleString()} <span className="text-gray-400 font-medium text-xs">MXN</span>
                    </td>
                    <td className="px-5 py-4">
                      <OrderStatusSelect id={o.id} status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
