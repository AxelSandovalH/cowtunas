"use client";

import { createContext, useContext, useState } from "react";
import BookingModal from "./BookingModal";
import type { Lang } from "@/lib/i18n";

const BookingContext = createContext<{ open: () => void }>({ open: () => {} });

export function useBooking() {
  return useContext(BookingContext);
}

export default function BookingProvider({ children, lang }: { children: React.ReactNode; lang: Lang }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BookingContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      <BookingModal lang={lang} open={isOpen} onClose={() => setIsOpen(false)} />
    </BookingContext.Provider>
  );
}
