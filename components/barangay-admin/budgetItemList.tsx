"use client";

import { useBudgetItems } from "@/hooks/budgetItemHooks";
import { UpdateItemStatus, DeleteBudgetItem } from "@/libs/budgetItem";
import { useState } from "react";
import {
  FiPackage,
  FiFilter,
  FiClock,
  FiCheck,
  FiX,
  FiCalendar,
  FiFileText,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
  FiTag,
  FiAlertCircle,
  FiTrash2,
  FiDollarSign,
} from "react-icons/fi";
import DeleteButtonBudgetItem from "../budgetItem/deleteButton";
import ActionButtonBudgetItem from "../budgetItem/actionButton";
import ConfirmationBudgetItem from "../budgetItem/confirmationOverlay";
import FilterSectionBudgetItem from "../budgetItem/filterSection";
import ControlSectionBudgetItem from "../budgetItem/controlSection";

const BudgetItemList = ({ projectID }: { projectID: number }) => {
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [confirmationState, setConfirmationState] = useState<{
    itemId: number | null;
    action: "approve" | "reject" | "delete" | null;
  }>({ itemId: null, action: null });
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [deletingItem, setDeletingItem] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { budgetItems, totalPages, FetchBudgetItems, isLoading, error } =
    useBudgetItems(projectID, statusFilter, currentPage);

  const handleRefresh = () => {
    setIsRefreshing(true);
    FetchBudgetItems();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleUpdateStatus = async () => {
    setUpdatingStatus(true);

    if (confirmationState.action === "delete") {
      handleDelete(confirmationState.itemId);
      return;
    }

    try {
      const result = await UpdateItemStatus(
        confirmationState.itemId,
        confirmationState.action
      );

      setSuccessMessage(result.message);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setUpdatingStatus(false);
      setConfirmationState({ itemId: null, action: null });
      FetchBudgetItems();
      setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 3000);
    }
  };

  const handleDelete = async (itemID: number | null) => {
    setDeletingItem(true);
    try {
      const result = await DeleteBudgetItem(itemID);

      setSuccessMessage(result.message);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setDeletingItem(false);
      setConfirmationState({ itemId: null, action: null });
      FetchBudgetItems();
      setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 3000);
    }
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80 hover:shadow-xl transition-all duration-300">
      {/* Header Section */}
      <ControlSectionBudgetItem
        handleRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {/* Filter Section */}
      <FilterSectionBudgetItem
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setCurrentPage={setCurrentPage}
      />

      {/* Items List */}
      <div className="space-y-4">
        {budgetItems?.map((item) => (
          <div
            key={item.ID}
            className={`relative p-6 border rounded-xl transition-all duration-200 bg-white
              ${
                item.Status === "Approved"
                  ? "border-green-100 hover:border-green-200 hover:bg-green-50/10"
                  : item.Status === "Rejected"
                  ? "border-gray-100 hover:border-gray-200 hover:bg-gray-50/10"
                  : "border-gray-100 hover:border-blue-100 hover:bg-blue-50/10"
              }`}
          >
            {/* Confirmation Overlay */}
            {confirmationState.itemId === item.ID && (
              <ConfirmationBudgetItem
                confirmationState={confirmationState}
                setConfirmationState={setConfirmationState}
                handleUpdateStatus={handleUpdateStatus}
              />
            )}

            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.Name}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <FiTag className="w-4 h-4" />
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full border flex items-center space-x-1 text-sm font-medium 
                  ${
                    item.Status === "Approved"
                      ? "bg-green-50 border-green-200 text-green-700"
                      : item.Status === "Rejected"
                      ? "bg-gray-50 border-gray-200 text-gray-700"
                      : "bg-blue-50 border-blue-100 text-blue-700"
                  }`}
              >
                {item.Status === "Approved" ? (
                  <FiCheck className="w-4 h-4" />
                ) : item.Status === "Rejected" ? (
                  <FiX className="w-4 h-4" />
                ) : (
                  <FiClock className="w-4 h-4" />
                )}
                <span>{item.Status}</span>
              </div>
            </div>

            <div
              className={`flex items-center text-gray-600 mb-3 rounded-lg p-3
              ${
                item.Status === "Approved"
                  ? "bg-green-50"
                  : item.Status === "Rejected"
                  ? "bg-gray-50"
                  : "bg-gray-50"
              }`}
            >
              <FiDollarSign
                className={`w-5 h-5 mr-2 
                ${
                  item.Status === "Approved"
                    ? "text-green-500"
                    : item.Status === "Rejected"
                    ? "text-gray-500"
                    : "text-blue-500"
                }`}
              />
              <span className="font-medium text-lg">
                ₱
                {item.Amount_Allocated.toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div
              className={`p-4 rounded-lg mb-4
              ${
                item.Status === "Approved"
                  ? "bg-green-50"
                  : item.Status === "Rejected"
                  ? "bg-gray-50"
                  : "bg-gray-50"
              }`}
            >
              <div className="flex items-start">
                <FiFileText
                  className={`w-4 h-4 mr-2 mt-1 flex-shrink-0
                  ${
                    item.Status === "Approved"
                      ? "text-green-500"
                      : item.Status === "Rejected"
                      ? "text-gray-500"
                      : "text-blue-500"
                  }`}
                />
                <p className="text-gray-600">{item.Description}</p>
              </div>
            </div>

            {/* Budget Item Status */}
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center text-sm text-gray-500 px-3 py-2 rounded-lg
                ${
                  item.Status === "Approved"
                    ? "bg-green-50"
                    : item.Status === "Rejected"
                    ? "bg-gray-50"
                    : "bg-gray-50"
                }`}
              >
                <FiCalendar
                  className={`w-4 h-4 mr-2
                  ${
                    item.Status === "Approved"
                      ? "text-green-500"
                      : item.Status === "Rejected"
                      ? "text-gray-500"
                      : "text-blue-500"
                  }`}
                />
                {item.Approval_Date
                  ? `Approved on ${new Date(
                      item.Approval_Date
                    ).toLocaleDateString("en-PH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}`
                  : item.Status === "Rejected"
                  ? "Rejected"
                  : "Pending Approval"}
              </div>

              <div className="flex items-center space-x-3">
                {/* Action Buttons - Only show for pending items */}
                {item.Status === "Pending" && !confirmationState.itemId && (
                  <ActionButtonBudgetItem
                    setConfirmationState={setConfirmationState}
                    item_ID={item.ID}
                  />
                )}

                {/* Delete Button - Always show unless confirmation is open */}
                {!confirmationState.itemId && (
                  <DeleteButtonBudgetItem
                    setConfirmationState={setConfirmationState}
                    item_ID={item.ID}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetItemList;
