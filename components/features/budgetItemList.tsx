"use client";

import { useBudgetItems } from "@/hooks/budgetItemHooks";
import {
  FiClock,
  FiCheck,
  FiX,
  FiCalendar,
  FiFileText,
  FiTag,
  FiDollarSign,
} from "react-icons/fi";
import DeleteButtonBudgetItem from "./budgetItemListUI/deleteButton";
import ActionButtonBudgetItem from "./budgetItemListUI/actionButton";
import ConfirmationBudgetItem from "./budgetItemListUI/confirmationOverlay";
import FilterSectionBudgetItem from "./budgetItemListUI/filterSection";
import ControlSectionBudgetItem from "./budgetItemListUI/controlSection";
import { useStatusBudgetItemStore } from "@/store/budgetItemStore";
import BudgetItem from "./budgetItemListUI/budgetItem";

const BudgetItemList = ({ projectID }: { projectID: number }) => {
  const { statusFilter, currentPage, confirmationState } =
    useStatusBudgetItemStore();

  const { budgetItems, totalPages, refetch, isLoading } = useBudgetItems(
    projectID,
    statusFilter,
    currentPage
  );

  return (
    <div className="bg-white p-8 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80 hover:shadow-xl transition-all duration-300">
      {/* Header Section */}
      <ControlSectionBudgetItem
        FetchBudgetItems={refetch}
        totalPages={totalPages}
        isLoading={isLoading}
      />

      {/* Filter Section */}
      <FilterSectionBudgetItem />

      {/* Items List */}
      <div className="space-y-4">
        {budgetItems?.map((item) => (
          <BudgetItem key={item.ID} item={item} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default BudgetItemList;
