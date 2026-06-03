import CSVImport from "@/components/admin/CSVImport";

export default function ImportClientsPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a2b3c]">Import Clients</h1>
        <p className="text-gray-400 text-sm mt-1">
          Upload a CSV file with your existing client list
        </p>
      </div>
      <CSVImport />
    </div>
  );
}
