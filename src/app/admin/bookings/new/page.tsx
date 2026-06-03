import { createClient } from "@/lib/supabase/server";
import BookingForm from "@/components/admin/BookingForm";

export default async function NewBookingPage() {
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, full_name")
    .order("full_name");

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a2b3c]">New Booking</h1>
        <p className="text-gray-400 text-sm mt-1">Create a new charter reservation</p>
      </div>
      <BookingForm clients={clients ?? []} />
    </div>
  );
}
