"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { TUNA_PRICE_PER_KG_MXN, TUNA_MIN_KG, TUNA_MAX_KG } from "@/lib/tuna";
import type { Lang } from "@/lib/i18n";

type Step = "kg" | "info" | "done";

export default function TunaOrder({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const [step, setStep] = useState<Step>("kg");
  const [kg, setKg] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);

  const total = kg * TUNA_PRICE_PER_KG_MXN;
  const clamp = (v: number) => Math.min(TUNA_MAX_KG, Math.max(TUNA_MIN_KG, v));

  const whatsappHref = `https://wa.me/523141222146?text=${encodeURIComponent(
    en
      ? `Hi! I just placed an order: ${kg} kg of vacuum-packed tuna ($${total.toLocaleString()} MXN) — ${name}.`
      : `Hola! Acabo de hacer un pedido: ${kg} kg de atún empacado al vacío ($${total.toLocaleString()} MXN) — ${name}.`
  )}`;

  const submitOrder = async () => {
    if (!name || !phone || !address) return;
    setSaving(true);
    setError("");
    const id = crypto.randomUUID();
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), 12000)
    );
    try {
      await Promise.race([timeout, (async () => {
        const supabase = createClient();
        const { error: insertError } = await supabase.from("orders").insert({
          id,
          customer_name: name,
          phone,
          email: null,
          address,
          kg,
          total_mxn: total,
          status: "pending",
          notes: null,
        });
        if (insertError) throw insertError;
      })()]);
      setOrderId(id);
      setStep("done");
    } catch (err) {
      console.error("order failed:", err);
      setError(
        en
          ? "We couldn't save your order. Message us on WhatsApp and we'll take it from there."
          : "No pudimos guardar tu pedido. Escríbenos por WhatsApp y lo levantamos directo."
      );
    } finally {
      setSaving(false);
    }
  };

  const payOnline = async () => {
    setPaying(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "tuna", kg, lang, orderId, name, phone }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error || (en ? "Payment is unavailable right now." : "El pago no está disponible por ahora."));
    } catch {
      setError(en ? "Payment is unavailable right now." : "El pago no está disponible por ahora.");
    }
    setPaying(false);
  };

  const stepIndex = step === "kg" ? 0 : step === "info" ? 1 : 2;
  const stepLabels = en ? ["Kilos", "Delivery", "Done"] : ["Kilos", "Entrega", "Listo"];

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Wizard header — same language as the booking engine */}
      <div className="bg-[#16283a] px-7 pt-6 pb-5">
        <p className="text-[#14a3c7] font-bold text-xs uppercase tracking-widest mb-1">
          {en ? "CowTunas Market" : "Mercado CowTunas"}
        </p>
        <h3 className="font-display text-2xl font-black text-white uppercase mb-4">
          {en ? "Order Fresh Tuna" : "Pide Atún Fresco"}
        </h3>
        <div className="flex items-center gap-2">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  i < stepIndex
                    ? "bg-white/20 text-white"
                    : i === stepIndex
                    ? "bg-[#14a3c7] text-white"
                    : "bg-white/10 text-white/40"
                }`}
              >
                {i < stepIndex ? "✓" : i + 1}
              </span>
              <span className={`text-xs font-semibold ${i === stepIndex ? "text-white" : "text-white/40"}`}>
                {label}
              </span>
              {i < 2 && <span className="w-5 h-px bg-white/20" />}
            </div>
          ))}
        </div>
      </div>

      <div className="px-7 py-6">
        <AnimatePresence mode="wait">
          {/* Step 1 — kilos */}
          {step === "kg" && (
            <motion.div key="kg"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-baseline gap-2 mb-5">
                <span className="font-display text-5xl font-black text-[#1a2b3c]">${TUNA_PRICE_PER_KG_MXN}</span>
                <span className="text-gray-400 font-semibold">MXN / kg</span>
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                {en ? "How many kilos?" : "¿Cuántos kilos?"}
              </p>
              <div className="flex items-center gap-3 mb-2">
                <button onClick={() => setKg((v) => clamp(v - 1))} aria-label={en ? "One kilo less" : "Un kilo menos"}
                  className="w-12 h-12 rounded-xl border-2 border-gray-200 text-2xl font-bold text-[#1a2b3c] hover:border-[#14a3c7] hover:text-[#14a3c7] transition-colors">
                  −
                </button>
                <div className="flex-1 text-center">
                  <span className="font-display text-4xl font-black text-[#1a2b3c] tabular-nums">{kg}</span>
                  <span className="text-gray-400 font-semibold ml-1">kg</span>
                </div>
                <button onClick={() => setKg((v) => clamp(v + 1))} aria-label={en ? "One kilo more" : "Un kilo más"}
                  className="w-12 h-12 rounded-xl border-2 border-gray-200 text-2xl font-bold text-[#1a2b3c] hover:border-[#14a3c7] hover:text-[#14a3c7] transition-colors">
                  +
                </button>
              </div>
              <input type="range" min={TUNA_MIN_KG} max={TUNA_MAX_KG} value={kg}
                onChange={(e) => setKg(Number(e.target.value))} aria-label="Kilos"
                className="w-full accent-[#14a3c7] mb-5" />
              <div className="flex justify-between items-center bg-[#f7f3ed] rounded-xl px-5 py-4 mb-5">
                <span className="text-gray-500 font-semibold">Total</span>
                <span className="font-display text-3xl font-black text-[#1a2b3c] tabular-nums">
                  ${total.toLocaleString()} <span className="text-sm text-gray-400 font-bold">MXN</span>
                </span>
              </div>
              <button onClick={() => setStep("info")}
                className="w-full btn-cow text-white font-black py-4 rounded-xl uppercase tracking-wider text-sm transition-colors shadow-lg">
                {en ? "Continue" : "Continuar"} →
              </button>
              <p className="text-gray-400 text-xs mt-4 leading-relaxed">
                {en
                  ? "Free home delivery in Los Cabos. Availability depends on the day's catch."
                  : "Envío a domicilio incluido en Los Cabos. La disponibilidad depende de la pesca del día."}
              </p>
            </motion.div>
          )}

          {/* Step 2 — delivery info */}
          {step === "info" && (
            <motion.div key="info"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-4">
              <div>
                <p className="label">{en ? "Full Name" : "Nombre Completo"} *</p>
                <input type="text" required className="input" value={name}
                  onChange={(e) => setName(e.target.value)} placeholder="John Smith" />
              </div>
              <div>
                <p className="label">WhatsApp *</p>
                <input type="tel" required className="input" value={phone}
                  onChange={(e) => setPhone(e.target.value)} placeholder="+52 624 000 0000" />
              </div>
              <div>
                <p className="label">{en ? "Delivery Address" : "Dirección de Entrega"} *</p>
                <textarea rows={2} required className="input resize-none" value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={en ? "Street, number, neighborhood, city" : "Calle, número, colonia, ciudad"} />
              </div>
              <div className="bg-[#f7f3ed] rounded-xl px-5 py-3 text-sm flex justify-between">
                <span className="text-gray-500">{kg} kg</span>
                <span className="font-bold text-[#1a2b3c]">${total.toLocaleString()} MXN</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep("kg")}
                  className="px-5 py-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm transition-colors">
                  ← {en ? "Back" : "Atrás"}
                </button>
                <button onClick={submitOrder} disabled={!name || !phone || !address || saving}
                  className="flex-1 bg-[#1a2b3c] hover:bg-[#446084] disabled:opacity-40 text-white font-bold py-3 rounded-xl transition-colors uppercase tracking-wide">
                  {saving ? "…" : en ? "Place Order" : "Confirmar Pedido"}
                </button>
              </div>
              {error && (
                <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3">
                  {error}{" "}
                  <a className="underline font-semibold" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    WhatsApp →
                  </a>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3 — done */}
          {step === "done" && (
            <motion.div key="done"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-center py-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <p className="text-[#1a2b3c] font-bold text-lg mb-1">
                {en ? "Order received!" : "¡Pedido recibido!"}
              </p>
              <p className="text-gray-400 text-sm mb-6">
                {en
                  ? `${kg} kg · $${total.toLocaleString()} MXN — we'll confirm delivery by WhatsApp.`
                  : `${kg} kg · $${total.toLocaleString()} MXN — confirmamos la entrega por WhatsApp.`}
              </p>
              <button onClick={payOnline} disabled={paying}
                className="w-full btn-cow text-white font-black py-3.5 rounded-xl uppercase tracking-wide text-sm transition-colors disabled:opacity-50">
                {paying ? "…" : en ? `Pay now — $${total.toLocaleString()} MXN` : `Pagar ahora — $${total.toLocaleString()} MXN`}
              </button>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer"
                className="block w-full mt-3 border border-gray-200 text-gray-500 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-colors text-sm">
                {en ? "Pay on delivery — confirm on WhatsApp" : "Pagar al recibir — confirmar por WhatsApp"}
              </a>
              {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
