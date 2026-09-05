"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import type { Lang } from "@/lib/i18n";

type Props = { lang: Lang; open: boolean; onClose: () => void };

type Step = 1 | 2 | 3;

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function Calendar({
  selected, onSelect
}: { selected: Date | null; onSelect: (d: Date) => void }) {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year  = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days  = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(first).fill(null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];

  const isSel  = (d: number) => selected?.getDate() === d && selected.getMonth() === month && selected.getFullYear() === year;
  const isPast = (d: number) => new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <div className="select-none">
      {/* Nav */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setCursor(new Date(year, month - 1, 1))}
          className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <span className="font-bold text-[#1a2b3c]">{MONTHS[month]} {year}</span>
        <button onClick={() => setCursor(new Date(year, month + 1, 1))}
          className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
        ))}
      </div>
      {/* Cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => (
          <div key={i}>
            {d ? (
              <button
                disabled={isPast(d)}
                onClick={() => onSelect(new Date(year, month, d))}
                className={`w-full aspect-square rounded-xl text-sm font-medium transition-all duration-150
                  ${isSel(d) ? "bg-[#14a3c7] text-white shadow-md scale-105" : ""}
                  ${!isSel(d) && !isPast(d) ? "hover:bg-[#446084]/10 hover:text-[#446084] text-[#1a2b3c]" : ""}
                  ${isPast(d) ? "text-gray-300 cursor-not-allowed" : ""}
                `}
              >
                {d}
              </button>
            ) : <div />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BookingModal({ lang, open, onClose }: Props) {
  const en = lang === "en";
  const [step, setStep] = useState<Step>(1);
  const [date, setDate]       = useState<Date | null>(null);
  const [anglers, setAnglers] = useState(2);
  const [trip, setTrip]       = useState<"half" | "full">("full");
  const [payLoading, setPayLoading] = useState(false);
  const [payError, setPayError]     = useState("");
  const [submitError, setSubmitError] = useState("");
  const [notes, setNotes]     = useState("");
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [phone, setPhone]     = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setTimeout(() => { setStep(1); setDate(null); setAnglers(2); setTrip("full"); setPayError(""); setNotes(""); setName(""); setEmail(""); setPhone(""); setDone(false); }, 400);
    }
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSubmit = async () => {
    if (!date || !name) return;
    setLoading(true);
    setSubmitError("");

    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), 12000)
    );

    try {
      await Promise.race([timeout, (async () => {
        const supabase = createClient();

        // Anonymous visitors can INSERT but never read back (RLS), so we
        // create the client record blind and carry contact info on the booking.
        const { error: clientError } = await supabase.from("clients").insert({
          full_name: name,
          email: email || null,
          phone: phone || null,
          country: null,
          notes: null,
        });
        if (clientError) throw clientError;

        const contact = [name, phone && `WhatsApp: ${phone}`, email]
          .filter(Boolean)
          .join(" · ");
        const { error: bookingError } = await supabase.from("bookings").insert({
          client_id:    null,
          trip_date:    date.toISOString().split("T")[0],
          anglers,
          status:       "pending",
          total_price:  trip === "half" ? 700 : 1200,
          deposit_paid: 0,
          expenses:     0,
          notes:        [contact, notes].filter(Boolean).join(" — "),
        });
        if (bookingError) throw bookingError;
      })()]);

      setDone(true);
    } catch (err) {
      console.error("booking failed:", err);
      setSubmitError(
        en
          ? "We couldn't save your booking. Please message us on WhatsApp and we'll lock in your date."
          : "No pudimos guardar tu reserva. Escríbenos por WhatsApp y apartamos tu fecha."
      );
    } finally {
      setLoading(false);
    }
  };

  const stepLabel = [
    en ? "Choose Date" : "Elige Fecha",
    en ? "Trip Details" : "Detalles del Viaje",
    en ? "Your Info" : "Tu Información",
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md pointer-events-auto overflow-hidden">

              {/* Header */}
              <div className="relative bg-[#1a2b3c] px-7 pt-7 pb-6">
                <button onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <p className="text-[#14a3c7] text-xs font-bold uppercase tracking-widest mb-1">CowTunas Charter</p>
                <h2 className="font-display text-3xl font-black text-white uppercase">
                  {done ? (en ? "You're Booked!" : "¡Reservado!") : en ? "Book Your Trip" : "Reserva Tu Viaje"}
                </h2>

                {/* Step indicators */}
                {!done && (
                  <div className="flex items-center gap-2 mt-5">
                    {([1, 2, 3] as Step[]).map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          step === s ? "bg-[#14a3c7] text-white" :
                          step > s  ? "bg-white/30 text-white" :
                          "bg-white/10 text-white/40"
                        }`}>
                          {step > s ? "✓" : s}
                        </div>
                        <span className={`text-xs hidden sm:block transition-colors ${step === s ? "text-white/80" : "text-white/30"}`}>
                          {stepLabel[s - 1]}
                        </span>
                        {s < 3 && <div className="w-6 h-px bg-white/20 mx-1" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="px-7 py-6">
                <AnimatePresence mode="wait">

                  {/* Done state */}
                  {done && (
                    <motion.div key="done"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="text-center py-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <p className="text-[#1a2b3c] font-bold text-lg mb-2">
                        {en ? `See you ${date?.toLocaleDateString("en-US", { month: "long", day: "numeric" })}!` : `¡Nos vemos el ${date?.toLocaleDateString("es-MX", { month: "long", day: "numeric" })}!`}
                      </p>
                      <p className="text-gray-400 text-sm mb-6">
                        {en ? "We'll confirm your booking via WhatsApp or email shortly." : "Confirmaremos tu reserva por WhatsApp o email pronto."}
                      </p>
                      <button
                        disabled={payLoading}
                        onClick={async () => {
                          setPayLoading(true);
                          setPayError("");
                          try {
                            const res = await fetch("/api/checkout", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                trip, lang, email,
                                tripDate: date?.toISOString().split("T")[0],
                                anglers,
                              }),
                            });
                            const data = await res.json();
                            if (res.ok && data.url) { window.location.href = data.url; return; }
                            setPayError(data.error || (en ? "Payment is unavailable right now." : "El pago no está disponible por ahora."));
                          } catch {
                            setPayError(en ? "Payment is unavailable right now." : "El pago no está disponible por ahora.");
                          }
                          setPayLoading(false);
                        }}
                        className="w-full btn-cow text-white font-black py-3.5 rounded-xl transition-colors uppercase tracking-wide disabled:opacity-50">
                        {payLoading ? "…" : en
                          ? `Secure your date — pay 30% deposit ($${trip === "half" ? 210 : 360})`
                          : `Asegura tu fecha — deposita 30% ($${trip === "half" ? 210 : 360})`}
                      </button>
                      {payError && <p className="text-red-500 text-xs mt-2">{payError}</p>}
                      <button onClick={onClose}
                        className="w-full mt-3 border border-gray-200 text-gray-500 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-colors">
                        {en ? "Pay at the dock instead" : "Prefiero pagar en el muelle"}
                      </button>
                    </motion.div>
                  )}

                  {/* Step 1 — Calendar */}
                  {!done && step === 1 && (
                    <motion.div key="step1"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <Calendar selected={date} onSelect={setDate} />
                      <button
                        disabled={!date}
                        onClick={() => setStep(2)}
                        className="mt-5 w-full btn-cow disabled:opacity-40 text-white font-bold py-4 rounded-2xl transition-colors uppercase tracking-wide">
                        {date
                          ? `${en ? "Continue" : "Continuar"} — ${date.toLocaleDateString(en ? "en-US" : "es-MX", { month: "short", day: "numeric" })}`
                          : en ? "Select a date" : "Selecciona una fecha"}
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2 — Details */}
                  {!done && step === 2 && (
                    <motion.div key="step2"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="space-y-5">
                      <div>
                        <p className="label">{en ? "Trip Type" : "Tipo de Viaje"}</p>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          {([
                            { id: "half" as const, label: en ? "Half Day" : "Medio Día", hours: "4 hrs", price: 700 },
                            { id: "full" as const, label: en ? "Full Day" : "Día Completo", hours: "8 hrs", price: 1200 },
                          ]).map(o => (
                            <button key={o.id} onClick={() => setTrip(o.id)}
                              className={`py-3 px-4 rounded-xl border-2 text-left transition-all ${
                                trip === o.id ? "border-[#14a3c7] bg-[#14a3c7]/5" : "border-gray-200 hover:border-gray-300"
                              }`}>
                              <span className={`block font-bold ${trip === o.id ? "text-[#14a3c7]" : "text-gray-500"}`}>{o.label}</span>
                              <span className="block text-xs text-gray-400">{o.hours} · ${o.price} USD</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="label">{en ? "Number of Anglers" : "Número de Pescadores"}</p>
                        <div className="flex items-center gap-4 mt-2">
                          {[1, 2, 3].map(n => (
                            <button key={n} onClick={() => setAnglers(n)}
                              className={`flex-1 py-3 rounded-xl border-2 font-bold text-lg transition-all ${
                                anglers === n ? "border-[#14a3c7] bg-[#14a3c7]/5 text-[#14a3c7]" : "border-gray-200 text-gray-400 hover:border-gray-300"
                              }`}>
                              {n}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-2">{en ? "Max 3 anglers per charter" : "Máx 3 pescadores por charter"}</p>
                      </div>
                      <div>
                        <p className="label">{en ? "Special Requests / Notes" : "Solicitudes Especiales"}</p>
                        <textarea rows={3} className="input resize-none" value={notes}
                          onChange={e => setNotes(e.target.value)}
                          placeholder={en ? "Target species, experience level, anything we should know…" : "Especie objetivo, nivel de experiencia…"} />
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setStep(1)}
                          className="px-5 py-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm transition-colors">
                          ← {en ? "Back" : "Atrás"}
                        </button>
                        <button onClick={() => setStep(3)}
                          className="flex-1 btn-cow text-white font-bold py-3 rounded-xl transition-colors uppercase tracking-wide">
                          {en ? "Continue" : "Continuar"} →
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 — Contact */}
                  {!done && step === 3 && (
                    <motion.div key="step3"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="space-y-4">
                      <div>
                        <p className="label">{en ? "Full Name" : "Nombre Completo"} *</p>
                        <input type="text" required className="input" value={name}
                          onChange={e => setName(e.target.value)} placeholder="John Smith" />
                      </div>
                      <div>
                        <p className="label">WhatsApp *</p>
                        <input type="tel" className="input" value={phone}
                          onChange={e => setPhone(e.target.value)} placeholder="+1 555 000 0000" />
                      </div>
                      <div>
                        <p className="label">Email</p>
                        <input type="email" className="input" value={email}
                          onChange={e => setEmail(e.target.value)} placeholder="you@email.com" />
                      </div>

                      {/* Summary */}
                      <div className="bg-[#f7f3ed] rounded-2xl p-4 text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-500">{en ? "Date" : "Fecha"}</span>
                          <span className="font-semibold">{date?.toLocaleDateString(en ? "en-US" : "es-MX", { weekday: "short", month: "short", day: "numeric" })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">{en ? "Anglers" : "Pescadores"}</span>
                          <span className="font-semibold">{anglers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">{en ? "Trip" : "Viaje"}</span>
                          <span className="font-semibold">{trip === "half" ? (en ? "Half Day — $700" : "Medio Día — $700") : (en ? "Full Day — $1,200" : "Día Completo — $1,200")}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button onClick={() => setStep(2)}
                          className="px-5 py-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm transition-colors">
                          ← {en ? "Back" : "Atrás"}
                        </button>
                        <button onClick={handleSubmit} disabled={!name || loading}
                          className="flex-1 bg-[#1a2b3c] hover:bg-[#446084] disabled:opacity-40 text-white font-bold py-3 rounded-xl transition-colors uppercase tracking-wide">
                          {loading ? "…" : en ? "Confirm Booking" : "Confirmar Reserva"}
                        </button>
                      </div>
                      {submitError && (
                        <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3">
                          {submitError}{" "}
                          <a
                            className="underline font-semibold"
                            href={`https://wa.me/526241616011?text=${encodeURIComponent(
                              `${en ? "Hi! I want to book" : "Hola! Quiero reservar"} ${date?.toLocaleDateString(en ? "en-US" : "es-MX", { month: "long", day: "numeric" })} · ${anglers} ${en ? "anglers" : "pescadores"} · ${trip === "half" ? (en ? "Half Day" : "Medio Día") : (en ? "Full Day" : "Día Completo")} — ${name}`
                            )}`}
                            target="_blank" rel="noopener noreferrer"
                          >
                            WhatsApp →
                          </a>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
