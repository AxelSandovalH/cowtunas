import { createClient } from "@/lib/supabase/server";
import CampaignForm from "@/components/admin/CampaignForm";

export default async function NewCampaignPage() {
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, full_name, email, phone, country")
    .order("full_name");

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a2b3c]">New Campaign</h1>
        <p className="text-gray-400 text-sm mt-1">Create a WhatsApp or Email campaign for your clients</p>
      </div>
      <CampaignForm clients={clients ?? []} />
    </div>
  );
}
