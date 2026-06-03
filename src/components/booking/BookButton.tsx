"use client";

import { useBooking } from "./BookingProvider";

type Props = {
  label?: string;
  className?: string;
};

export default function BookButton({ label = "Book Your Charter", className = "" }: Props) {
  const { open } = useBooking();
  return (
    <button onClick={open} className={className}>
      {label}
    </button>
  );
}
