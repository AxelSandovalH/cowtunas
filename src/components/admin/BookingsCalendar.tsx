"use client";

import { useState } from "react";
import Link from "next/link";

type CalBooking = {
  id: string;
  trip_date: string;
  status: string;
  anglers: number;
  total_price: number;
  notes: string | null;
};

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-600 text-white border-amber-700",
  confirmed: "bg-[#0f89a8] text-white border-[#0c6f88]",
  completed: "bg-emerald-600 text-white border-emerald-700",
  cancelled: "bg-red-600/80 text-white border-red-700 line-through",
};

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

export default function BookingsCalendar({ bookings }: { bookings: CalBooking[] }) {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const byDay = new Map<number, CalBooking[]>();
  for (const b of bookings) {
    const d = new Date(b.trip_date + "T12:00:00");
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      byDay.set(day, [...(byDay.get(day) ?? []), b]);
    }
  }

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-[#1a2b3c]">
          {MONTHS[month]} {year}
        </h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"
            aria-label="Previous month"
          >
            ‹
          </button>
          <button
            onClick={() => setCursor(new Date(today.getFullYear(), today.getMonth(), 1))}
            className="px-3 h-8 rounded-lg hover:bg-gray-100 text-xs font-semibold text-gray-500"
          >
            Today
          </button>
          <button
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"
            aria-label="Next month"
          >
            ›
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 border-b border-gray-100">
        {DAYS.map((d) => (
          <div key={d} className="py-2 text-center text-[11px] font-bold uppercase tracking-widest text-gray-400">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, i) => (
          <div
            key={i}
            className={`min-h-[92px] border-b border-r border-gray-50 p-1.5 ${
              day && isToday(day) ? "bg-[#14a3c7]/5" : ""
            }`}
          >
            {day && (
              <>
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-full ${
                    isToday(day) ? "bg-[#14a3c7] text-white" : "text-gray-500"
                  }`}
                >
                  {day}
                </span>
                <div className="mt-1 space-y-1">
                  {(byDay.get(day) ?? []).map((b) => (
                    <Link
                      key={b.id}
                      href={`/admin/bookings/${b.id}`}
                      className={`block text-[11px] leading-tight font-bold border-l-2 rounded-md px-1.5 py-1 truncate shadow-sm hover:opacity-85 ${
                        STATUS_STYLES[b.status] ?? "bg-gray-100 text-gray-600 border-gray-200"
                      }`}
                      title={`${b.anglers} anglers · $${Number(b.total_price).toLocaleString()}${b.notes ? ` · ${b.notes}` : ""}`}
                    >
                      {b.anglers}p · ${Number(b.total_price).toLocaleString()}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
