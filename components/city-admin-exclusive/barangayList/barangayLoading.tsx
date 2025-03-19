const BarangayLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p className="text-sm text-gray-500">Loading barangays...</p>
    </div>
  );
};

export default BarangayLoading;
