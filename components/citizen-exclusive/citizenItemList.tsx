import { useStatusBudgetItemStore } from "@/store/budgetItemStore";
import ControlSectionBudgetItem from "../features/budgetItemListUI/controlSection";
import FilterSectionBudgetItem from "../features/budgetItemListUI/filterSection";
import { useBudgetItems } from "@/hooks/budgetItemHooks";
import CitizenBudgetItem from "./citizenBudgetItem";

const CitizenItemList = ({ projectID }: { projectID: number }) => {
  const { statusFilter, currentPage } = useStatusBudgetItemStore();

  const { budgetItems, totalPages, refetch, isLoading } = useBudgetItems(
    projectID,
    statusFilter,
    currentPage
  );

  return (
    <div className="bg-white p-8 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80 hover:shadow-xl transition-all duration-300">
      <ControlSectionBudgetItem
        FetchBudgetItems={refetch}
        totalPages={totalPages}
        isLoading={isLoading}
      />
      <FilterSectionBudgetItem />

      <div className="space-y-4">
        {budgetItems?.map((item) => (
          <CitizenBudgetItem key={item.ID} item={item} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default CitizenItemList;
