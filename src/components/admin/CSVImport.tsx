"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Row = { full_name: string; email: string; phone: string; country: string; notes: string };

export default function CSVImport() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ imported: number; skipped: number } | null>(null);
  const [error, setError] = useState("");

  const parseCSV = (text: string) => {
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/\s/g, "_"));
    return lines.slice(1).map(line => {
      const vals = line.split(",").map(v => v.trim().replace(/^"|"$/g, ""));
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => { obj[h] = vals[i] ?? ""; });
      return {
        full_name: obj.full_name || obj.nombre || obj.name || "",
        email:     obj.email || obj.correo || "",
        phone:     obj.telefono || obj.phone || obj.whatsapp || "",
        country:   obj.country || obj.pais || obj.país || "",
        notes:     obj.notes || obj.notas || "",
      } as Row;
    }).filter(r => r.full_name);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = parseCSV(ev.target?.result as string);
        setRows(parsed);
        setError("");
      } catch {
        setError("Could not parse the CSV. Check the format.");
      }
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    setLoading(true);
    const supabase = createClient();
    const payload = rows.map(r => ({
      full_name: r.full_name,
      email:   r.email   || null,
      phone:   r.phone   || null,
      country: r.country || null,
      notes:   r.notes   || null,
    }));

    const { data, error: err } = await supabase
      .from("clients")
      .upsert(payload, { onConflict: "email", ignoreDuplicates: true })
      .select();

    if (err) { setError(err.message); setLoading(false); return; }
    setResult({ imported: data?.length ?? 0, skipped: rows.length - (data?.length ?? 0) });
    setLoading(false);
  };

  if (result) return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-[#1a2b3c] mb-2">Import Complete</h2>
      <p className="text-gray-500 mb-1"><span className="font-bold text-green-600">{result.imported}</span> clients imported</p>
      <p className="text-gray-400 text-sm mb-6">{result.skipped} skipped (duplicates)</p>
      <button onClick={() => { router.push("/admin/clients"); router.refresh(); }}
        className="bg-[#446084] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#334862] transition-colors">
        View Clients →
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Format reminder */}
      <div className="bg-[#f7f3ed] rounded-2xl p-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Required CSV format</p>
        <code className="text-xs text-[#446084] block">
          nombre, email, telefono, pais, notas<br/>
          John Smith, john@email.com, +1 555 0000, USA, Return customer
        </code>
        <p className="text-xs text-gray-400 mt-2">Columns can be in English or Spanish. Only <strong>nombre/name</strong> is required.</p>
      </div>

      {/* Upload */}
      <div
        className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#446084] transition-colors p-10 text-center cursor-pointer"
        onClick={() => fileRef.current?.click()}
      >
        <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFile} />
        <p className="text-4xl mb-3">📂</p>
        <p className="font-semibold text-[#1a2b3c]">Click to select CSV file</p>
        <p className="text-gray-400 text-sm mt-1">or drag and drop</p>
      </div>

      {error && <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-3">{error}</p>}

      {/* Preview */}
      {rows.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm font-semibold text-[#1a2b3c]">Preview — {rows.length} clients found</p>
          </div>
          <div className="overflow-x-auto max-h-64">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Name", "Email", "Phone", "Country"].map(h => (
                    <th key={h} className="text-left px-4 py-2 text-gray-400 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rows.slice(0, 20).map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-[#1a2b3c]">{r.full_name}</td>
                    <td className="px-4 py-2 text-gray-500">{r.email || "—"}</td>
                    <td className="px-4 py-2 text-gray-500">{r.phone || "—"}</td>
                    <td className="px-4 py-2 text-gray-500">{r.country || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length > 20 && <p className="px-5 py-2 text-xs text-gray-400">...and {rows.length - 20} more</p>}
          <div className="px-5 py-4 border-t border-gray-100">
            <button onClick={handleImport} disabled={loading}
              className="w-full bg-[#d26e4b] hover:bg-[#bc5e3d] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors">
              {loading ? "Importing…" : `Import ${rows.length} Clients`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
