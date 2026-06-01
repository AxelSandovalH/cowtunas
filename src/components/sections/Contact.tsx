"use client";

import { useState } from "react";
import type { Translations } from "@/lib/translations/types";
import type { Lang } from "@/lib/i18n";

type Props = { dict: Translations; lang: Lang };

export default function Contact({ dict, lang }: Props) {
  const t = dict.contact;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#d26e4b] font-semibold text-sm uppercase tracking-widest mb-3">
            {lang === "en" ? "Let's Go Fishing" : "Vamos a Pescar"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2b3c] mb-4">{t.title}</h2>
          <p className="text-gray-500 text-lg">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Info column */}
          <div className="lg:col-span-2 space-y-6">

            {/* WhatsApp CTA — most prominent */}
            <a
              href={`https://wa.me/19492946790?text=${encodeURIComponent(
                lang === "en"
                  ? "Hi! I'd like to book a fishing charter with CowTunas."
                  : "Hola! Me gustaría reservar un charter de pesca con CowTunas."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl px-6 py-5 transition-colors shadow-lg"
            >
              <svg className="w-8 h-8 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <div>
                <p className="font-bold text-lg leading-tight">
                  {lang === "en" ? "Book via WhatsApp" : "Reservar por WhatsApp"}
                </p>
                <p className="text-white/80 text-sm">{t.phone}</p>
              </div>
            </a>

            {/* Contact cards */}
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                ),
                label: lang === "en" ? "Call or Text" : "Llama o Escribe",
                value: t.phone,
                href: `tel:${t.phone}`,
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                ),
                label: lang === "en" ? "Reservations" : "Reservaciones",
                value: t.email_reservations,
                href: `mailto:${t.email_reservations}`,
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                ),
                label: lang === "en" ? "Location" : "Ubicación",
                value: t.location,
                href: "https://maps.google.com/?q=Puerto+Los+Cabos+Marina+La+Playita",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-start gap-4 bg-[#f7f3ed] hover:bg-[#446084]/5 rounded-2xl px-6 py-4 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#446084]/10 flex items-center justify-center text-[#446084] shrink-0 group-hover:bg-[#446084] group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                  <p className="text-[#1a2b3c] font-medium text-sm">{item.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Form column */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 bg-[#f7f3ed] rounded-2xl">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1a2b3c] mb-2">
                  {lang === "en" ? "Message Sent!" : "¡Mensaje enviado!"}
                </h3>
                <p className="text-gray-500">
                  {lang === "en"
                    ? "We'll get back to you as soon as possible."
                    : "Te responderemos lo antes posible."}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#f7f3ed] rounded-2xl p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                      {t.form.name}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#1a2b3c] text-sm focus:outline-none focus:border-[#446084] focus:ring-2 focus:ring-[#446084]/20 transition"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                      {t.form.phone}
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#1a2b3c] text-sm focus:outline-none focus:border-[#446084] focus:ring-2 focus:ring-[#446084]/20 transition"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                    {t.form.email}
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#1a2b3c] text-sm focus:outline-none focus:border-[#446084] focus:ring-2 focus:ring-[#446084]/20 transition"
                    placeholder="you@email.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                    {t.form.subject}
                  </label>
                  <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#1a2b3c] text-sm focus:outline-none focus:border-[#446084] focus:ring-2 focus:ring-[#446084]/20 transition">
                    <option>{lang === "en" ? "Book a Charter" : "Reservar un Charter"}</option>
                    <option>{lang === "en" ? "Pricing Info" : "Información de Precios"}</option>
                    <option>{lang === "en" ? "General Question" : "Pregunta General"}</option>
                    <option>{lang === "en" ? "Other" : "Otro"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                    {t.form.message}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#1a2b3c] text-sm focus:outline-none focus:border-[#446084] focus:ring-2 focus:ring-[#446084]/20 transition resize-none"
                    placeholder={lang === "en" ? "Preferred dates, number of anglers, any questions..." : "Fechas preferidas, número de pescadores, preguntas..."}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#d26e4b] hover:bg-[#bc5e3d] text-white font-bold py-4 rounded-xl transition-colors shadow-lg text-base"
                >
                  {t.form.submit}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map embed */}
        <div className="mt-14 rounded-2xl overflow-hidden shadow-lg h-72">
          <iframe
            title="CowTunas Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.5!2d-109.6613!3d23.0737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA0JzI1LjMiTiAxMDnCsDM5JzQwLjciVw!5e0!3m2!1sen!2smx!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </section>
  );
}
