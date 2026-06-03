import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ClientForm from "@/components/admin/ClientForm";

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: client } = await supabase.from("clients").select("*").eq("id", id).single();
  if (!client) notFound();

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a2b3c]">{client.full_name}</h1>
        <p className="text-gray-400 text-sm mt-1">Edit client information</p>
      </div>
      <ClientForm client={client} />
    </div>
  );
}
