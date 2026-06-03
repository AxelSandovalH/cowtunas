import ClientForm from "@/components/admin/ClientForm";

export default function NewClientPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a2b3c]">New Client</h1>
        <p className="text-gray-400 text-sm mt-1">Add a client to the database</p>
      </div>
      <ClientForm />
    </div>
  );
}
