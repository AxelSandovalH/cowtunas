"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import type { Lang } from "@/lib/i18n";

type Props = { lang: Lang };

export default function NewsletterFish({ lang }: Props) {
  const en = lang === "en";
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem("ct-newsletter");
      // Subscribers never see it again; a dismissal only lasts 3 days.
      if (v === "subscribed") return;
      const dismissedAt = Number(v);
      if (dismissedAt && Date.now() - dismissedAt < 3 * 24 * 60 * 60 * 1000) return;
    } catch {}
    const t = setTimeout(() => setHidden(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const supabase = createClient();
    await supabase.from("clients").insert({
      full_name: email.split("@")[0],
      email,
      phone: null,
      country: null,
      notes: "Newsletter signup — 10% discount (COWTUNAS10)",
    });
    setLoading(false);
    setDone(true);
    try { localStorage.setItem("ct-newsletter", "subscribed"); } catch {}
  };

  const dismiss = () => {
    setHidden(true);
    try { localStorage.setItem("ct-newsletter", String(Date.now())); } catch {}
  };

  if (hidden) return null;

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
      <AnimatePresence>
        {!open ? (
          /* Collapsed: the cow-tuna swims in and bobs, with a -10% tag */
          <motion.button
            key="fish"
            onClick={() => setOpen(true)}
            initial={{ x: "-110%" }}
            animate={{ x: 0 }}
            exit={{ x: "-110%" }}
            transition={{ type: "spring", damping: 18, stiffness: 120 }}
            className="relative block focus:outline-none"
            aria-label={en ? "Get 10% off — join the newsletter" : "Obtén 10% de descuento — únete al newsletter"}
          >
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 2, 0, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-40 lg:w-48 drop-shadow-2xl"
            >
              <Image
                src="/cowtuna-fish.png"
                alt=""
                width={400}
                height={218}
                className="w-full h-auto"
              />
              <span className="absolute -top-3 -right-3 bg-[#14a3c7] text-white font-black text-sm rounded-full px-3 py-1.5 shadow-lg rotate-6">
                -10%
              </span>
              <span className="absolute bottom-1.5 left-2 right-2 text-white/90 text-[10px] font-bold uppercase tracking-wider text-center bg-black/40 rounded-md py-0.5">
                {en ? "Click me!" : "¡Haz clic!"}
              </span>
            </motion.div>
          </motion.button>
        ) : (
          /* Expanded card */
          <motion.div
            key="card"
            initial={{ x: "-110%" }}
            animate={{ x: 0 }}
            exit={{ x: "-110%" }}
            transition={{ type: "spring", damping: 22, stiffness: 160 }}
            className="w-80 bg-[#0e1621] text-white rounded-r-2xl shadow-2xl border border-white/10 border-l-0 overflow-hidden"
          >
            <div className="relative bg-gradient-to-b from-[#14a3c7]/20 to-transparent pt-4 px-6">
              <Image src="/cowtuna-fish.png" alt="" width={640} height={349} className="w-full h-28 object-contain" />
              <button
                onClick={dismiss}
                aria-label="Close"
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/70 text-white/80 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="p-5">
              {done ? (
                <>
                  <p className="font-display font-black text-2xl uppercase mb-2">
                    {en ? "You're in! 🎣" : "¡Dentro! 🎣"}
                  </p>
                  <p className="text-white/70 text-sm mb-3">
                    {en
                      ? "Use this code when booking your charter:"
                      : "Usa este código al reservar tu charter:"}
                  </p>
                  <p className="text-center font-black text-xl tracking-widest bg-white/10 rounded-lg py-2 select-all">
                    COWTUNAS10
                  </p>
                </>
              ) : (
                <>
                  <p className="font-display font-black text-2xl uppercase leading-tight mb-1">
                    {en ? "Hook 10% Off" : "Pesca un 10%"}
                  </p>
                  <p className="text-white/70 text-sm mb-4">
                    {en
                      ? "Join our newsletter and get 10% off your first charter."
                      : "Únete a nuestro newsletter y llévate 10% de descuento en tu primer charter."}
                  </p>
                  <form onSubmit={submit} className="flex flex-col gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={en ? "Your email" : "Tu correo"}
                      className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2.5 text-sm placeholder:text-white/40 focus:outline-none focus:border-[#14a3c7]"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-cow font-bold py-2.5 rounded-lg text-sm uppercase tracking-wider disabled:opacity-50"
                    >
                      {loading ? "…" : en ? "Claim 10% Off" : "Quiero mi 10%"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
