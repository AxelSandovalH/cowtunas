import MaintenanceForm from "@/components/admin/MaintenanceForm";

export default function NewMaintenancePage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a2b3c]">Log Service</h1>
        <p className="text-gray-400 text-sm mt-1">Record a maintenance event for the Kailani</p>
      </div>
      <MaintenanceForm />
    </div>
  );
}
