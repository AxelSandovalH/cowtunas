import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import BookingForm from "@/components/admin/BookingForm";
import type { Database } from "@/lib/supabase/types";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];
type ClientOption = { id: string; full_name: string };

export default async function EditBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single() as { data: Booking | null; error: unknown };

  if (!booking) notFound();

  const { data: clients } = await supabase
    .from("clients")
    .select("id, full_name")
    .order("full_name") as { data: ClientOption[] | null; error: unknown };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a2b3c]">Edit Booking</h1>
        <p className="text-gray-400 text-sm mt-1">
          {new Date(booking.trip_date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>
      <BookingForm clients={clients ?? []} booking={booking} />
    </div>
  );
}
