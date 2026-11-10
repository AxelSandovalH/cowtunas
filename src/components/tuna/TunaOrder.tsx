"use client";

import { useState } from "react";
import { TUNA_PRICE_PER_KG_USD, TUNA_MIN_KG, TUNA_MAX_KG } from "@/lib/tuna";
import type { Lang } from "@/lib/i18n";

export default function TunaOrder({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const [kg, setKg] = useState(2);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");

  const total = kg * TUNA_PRICE_PER_KG_USD;
  const clamp = (v: number) => Math.min(TUNA_MAX_KG, Math.max(TUNA_MIN_KG, v));

  const whatsappHref = `https://wa.me/523141222146?text=${encodeURIComponent(
    en
      ? `Hi! I'd like to order ${kg} kg of vacuum-packed yellowfin tuna ($${total} USD).`
      : `Hola! Quiero pedir ${kg} kg de atún aleta amarilla empacado al vacío ($${total} USD).`
  )}`;

  const payOnline = async () => {
    setPaying(true);
    setPayError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "tuna", kg, lang }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setPayError(data.error || (en ? "Payment is unavailable right now." : "El pago no está disponible por ahora."));
    } catch {
      setPayError(en ? "Payment is unavailable right now." : "El pago no está disponible por ahora.");
    }
    setPaying(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <p className="text-[#14a3c7] font-bold text-xs uppercase tracking-widest mb-1">
        {en ? "Yellowfin · Vacuum-Packed" : "Aleta Amarilla · Empacado al Vacío"}
      </p>
      <div className="flex items-baseline gap-2 mb-6">
        <span className="font-display text-5xl font-black text-[#1a2b3c]">${TUNA_PRICE_PER_KG_USD}</span>
        <span className="text-gray-400 font-semibold">USD / kg</span>
      </div>

      {/* Kg selector */}
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
        {en ? "How many kilos?" : "¿Cuántos kilos?"}
      </p>
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => setKg((v) => clamp(v - 1))}
          aria-label={en ? "One kilo less" : "Un kilo menos"}
          className="w-12 h-12 rounded-xl border-2 border-gray-200 text-2xl font-bold text-[#1a2b3c] hover:border-[#14a3c7] hover:text-[#14a3c7] transition-colors"
        >
          −
        </button>
        <div className="flex-1 text-center">
          <span className="font-display text-4xl font-black text-[#1a2b3c] tabular-nums">{kg}</span>
          <span className="text-gray-400 font-semibold ml-1">kg</span>
        </div>
        <button
          onClick={() => setKg((v) => clamp(v + 1))}
          aria-label={en ? "One kilo more" : "Un kilo más"}
          className="w-12 h-12 rounded-xl border-2 border-gray-200 text-2xl font-bold text-[#1a2b3c] hover:border-[#14a3c7] hover:text-[#14a3c7] transition-colors"
        >
          +
        </button>
      </div>
      <input
        type="range"
        min={TUNA_MIN_KG}
        max={TUNA_MAX_KG}
        value={kg}
        onChange={(e) => setKg(Number(e.target.value))}
        aria-label={en ? "Kilos" : "Kilos"}
        className="w-full accent-[#14a3c7] mb-6"
      />

      {/* Total */}
      <div className="flex justify-between items-center bg-[#f7f3ed] rounded-xl px-5 py-4 mb-6">
        <span className="text-gray-500 font-semibold">{en ? "Total" : "Total"}</span>
        <span className="font-display text-3xl font-black text-[#1a2b3c] tabular-nums">
          ${total.toLocaleString()} <span className="text-sm text-gray-400 font-bold">USD</span>
        </span>
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-xl uppercase tracking-wider text-sm transition-colors shadow-lg mb-3"
      >
        {en ? "Order via WhatsApp" : "Pedir por WhatsApp"}
      </a>
      <button
        onClick={payOnline}
        disabled={paying}
        className="w-full btn-cow text-white font-black py-4 rounded-xl uppercase tracking-wider text-sm transition-colors shadow-lg disabled:opacity-50"
      >
        {paying ? "…" : en ? "Pay Online" : "Pagar en Línea"}
      </button>
      {payError && <p className="text-red-500 text-xs mt-3">{payError}</p>}

      <p className="text-gray-400 text-xs mt-5 leading-relaxed">
        {en
          ? "Pickup at the Cabo San Lucas Marina. Availability depends on the day's catch — we'll confirm by WhatsApp."
          : "Recolección en la Marina de Cabo San Lucas. La disponibilidad depende de la pesca del día — confirmamos por WhatsApp."}
      </p>
    </div>
  );
}
