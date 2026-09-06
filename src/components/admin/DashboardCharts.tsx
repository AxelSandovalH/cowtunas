"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie, Legend,
} from "recharts";

const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  confirmed: "#14a3c7",
  completed: "#10b981",
  cancelled: "#ef4444",
};

export function RevenueByMonthChart({
  data,
}: {
  data: { month: string; revenue: number; expenses: number }[];
}) {
  if (data.every((d) => d.revenue === 0 && d.expenses === 0)) {
    return <p className="text-xs text-gray-400 italic text-center py-10">No revenue recorded yet</p>;
  }
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fontSize: 10, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: number) => `$${v >= 1000 ? `${v / 1000}k` : v}`}
        />
        <Tooltip
          cursor={{ fill: "rgba(20, 163, 199, 0.08)" }}
          contentStyle={{
            fontSize: 12,
            borderRadius: 10,
            border: "none",
            background: "#16283a",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            color: "#ffffff",
          }}
          labelStyle={{ fontWeight: 700, color: "#ffffff" }}
          itemStyle={{ color: "#9fd8e8" }}
          formatter={(v, name) => [`$${Number(v).toLocaleString()}`, name === "revenue" ? "Revenue" : "Expenses"]}
        />
        <Bar dataKey="revenue" radius={[4, 4, 0, 0]} maxBarSize={28} fill="#14a3c7" />
        <Bar dataKey="expenses" radius={[4, 4, 0, 0]} maxBarSize={28} fill="#e2e8f0" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function BookingStatusChart({
  data,
}: {
  data: { status: string; count: number }[];
}) {
  const filtered = data.filter((d) => d.count > 0);
  if (!filtered.length) {
    return <p className="text-xs text-gray-400 italic text-center py-10">No bookings yet</p>;
  }
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={filtered}
          dataKey="count"
          nameKey="status"
          innerRadius={50}
          outerRadius={78}
          paddingAngle={3}
          strokeWidth={0}
        >
          {filtered.map((d) => (
            <Cell key={d.status} fill={STATUS_COLORS[d.status] ?? "#94a3b8"} />
          ))}
        </Pie>
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(v: string) => (
            <span style={{ fontSize: 12, color: "#475569", textTransform: "capitalize" }}>{v}</span>
          )}
        />
        <Tooltip
          contentStyle={{
            fontSize: 12,
            borderRadius: 10,
            border: "none",
            background: "#16283a",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            color: "#ffffff",
            textTransform: "capitalize",
          }}
          itemStyle={{ color: "#9fd8e8" }}
          formatter={(v, name) => [Number(v), String(name)]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
