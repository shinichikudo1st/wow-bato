import { UpdateBarangay } from "@/libs/barangay";
import { useUpdateBarangayStore } from "@/store/barangayStore";
import { AddBarangayFormData, BarangayListItem } from "@/types/barangayTypes";
import { useMutation } from "@tanstack/react-query";

const BarangayUpdateForm = ({
  barangayID,
  barangay,
  setIsEditing,
  refetch,
}: {
  barangayID: string;
  barangay: BarangayListItem | null;
  setIsEditing: (isEditing: boolean) => void;
  refetch: () => void;
}) => {
  const { updateBarangay, setUpdateBarangay } = useUpdateBarangayStore();

  const barangayMutation = useMutation({
    mutationFn: async (data: AddBarangayFormData) => {
      await UpdateBarangay(data, barangayID);
    },
    onSuccess: () => {
      setUpdateBarangay({
        name: "",
        city: "",
        region: "",
      });
      setIsEditing(false);
      refetch();
    },
  });

  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Barangay Name
        </label>
        <input
          type="text"
          id="name"
          value={updateBarangay.name}
          onChange={(e) =>
            setUpdateBarangay({
              ...updateBarangay,
              name: e.target.value,
            })
          }
          placeholder={barangay?.name}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          City
        </label>
        <input
          type="text"
          id="city"
          value={updateBarangay.city}
          onChange={(e) =>
            setUpdateBarangay({
              ...updateBarangay,
              city: e.target.value,
            })
          }
          placeholder={barangay?.city}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="region"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Region
        </label>
        <input
          type="text"
          id="region"
          value={updateBarangay.region}
          onChange={(e) =>
            setUpdateBarangay({
              ...updateBarangay,
              region: e.target.value,
            })
          }
          placeholder={barangay?.region}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex space-x-4 pt-4">
        <button
          onClick={() => barangayMutation.mutate(updateBarangay)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Save Changes
        </button>
        <button
          onClick={() => {
            setIsEditing(false);
            setUpdateBarangay({
              name: "",
              city: "",
              region: "",
            });
          }}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BarangayUpdateForm;
