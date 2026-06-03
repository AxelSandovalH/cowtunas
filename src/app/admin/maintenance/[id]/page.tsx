import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import MaintenanceForm from "@/components/admin/MaintenanceForm";

export default async function EditMaintenancePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: log } = await supabase.from("maintenance").select("*").eq("id", id).single();
  if (!log) notFound();

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a2b3c]">Edit Service Log</h1>
        <p className="text-gray-400 text-sm mt-1">{log.description}</p>
      </div>
      <MaintenanceForm log={log} />
    </div>
  );
}
