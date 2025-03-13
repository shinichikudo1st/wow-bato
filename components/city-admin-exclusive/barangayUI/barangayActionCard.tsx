const BarangayActionCard = ({
  setIsEditing,
  setShowDeleteModal,
}: {
  setIsEditing: (isEditing: boolean) => void;
  setShowDeleteModal: (showDeleteModal: boolean) => void;
}) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
      <div className="space-y-3">
        <button
          onClick={() => {
            setIsEditing(true);
          }}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Edit Barangay
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
        >
          Delete Barangay
        </button>
      </div>
    </div>
  );
};

export default BarangayActionCard;
