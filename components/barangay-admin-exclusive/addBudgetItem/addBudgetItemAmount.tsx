import { useAddBudgetItemStore } from "@/store/budgetItemStore";

const AddBudgetItemAmount = () => {
  const { formData, setFormData } = useAddBudgetItemStore();
  return (
    <div>
      <label
        htmlFor="amount"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Amount Allocated (₱)
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 group-hover:text-blue-500 transition-colors">
            ₱
          </span>
        </div>
        <input
          type="text"
          id="amount"
          name="amount"
          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                hover:border-blue-300 transition-all duration-200
                bg-white hover:bg-blue-50/30"
          placeholder="0.00"
          value={
            formData.amount_allocated === 0
              ? ""
              : formData.amount_allocated.toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
          }
          onChange={(e) => {
            // Remove all non-numeric characters except decimal point
            const rawValue = e.target.value.replace(/[^0-9.]/g, "");

            // Ensure only one decimal point
            const parts = rawValue.split(".");
            const cleanValue =
              parts[0] + (parts.length > 1 ? "." + parts[1] : "");

            // Convert to number if valid
            if (cleanValue === "" || cleanValue === ".") {
              setFormData({
                ...formData,
                amount_allocated: 0,
              });
            } else {
              const amount = parseFloat(cleanValue);
              if (!isNaN(amount)) {
                setFormData({
                  ...formData,
                  amount_allocated: amount,
                });
              }
            }
          }}
          onBlur={(e) => {
            // Format to 2 decimal places on blur
            const amount =
              parseFloat(e.target.value.replace(/[^0-9.]/g, "")) || 0;
            setFormData({
              ...formData,
              amount_allocated: Number(amount.toFixed(2)),
            });
          }}
        />
      </div>
      <p className="mt-1 text-sm text-gray-500">
        Enter amount in Philippine Peso (₱)
      </p>
    </div>
  );
};

export default AddBudgetItemAmount;
