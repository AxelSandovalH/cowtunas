"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const STATUSES = ["pending", "paid", "delivered", "cancelled"] as const;

export default function OrderStatusSelect({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);

  const onChange = async (next: string) => {
    const prev = value;
    setValue(next);
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("orders").update({ status: next }).eq("id", id);
    setSaving(false);
    if (error) {
      setValue(prev);
      alert("Could not update the order status. Try again.");
      return;
    }
    router.refresh();
  };

  return (
    <select
      value={value}
      disabled={saving}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Order status"
      className={`chip chip-${value} border-0 cursor-pointer pr-6 appearance-none disabled:opacity-60`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath d='M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 6px center",
        backgroundSize: "12px",
      }}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s} className="text-[#1a2b3c] bg-white">
          {s}
        </option>
      ))}
    </select>
  );
}
