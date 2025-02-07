"use client";

import { useBudgetItems } from "@/hooks/budgetItemHooks";
import { UpdateItemStatus, DeleteBudgetItem } from "@/libs/budgetItem";
import { useState } from "react";
import { AiFillMoneyCollect } from "react-icons/ai";
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

const BudgetItemList = ({ projectID }: { projectID: number }) => {
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [confirmationState, setConfirmationState] = useState<{
    itemId: number | null;
    action: 'approve' | 'reject' | 'delete' | null;
  }>({ itemId: null, action: null });
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [deletingItem, setDeletingItem] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { budgetItems, totalPages, FetchBudgetItems, isLoading, error } = useBudgetItems(projectID, statusFilter, currentPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-50 text-green-700 border-green-100";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-100";
      default:
        return "bg-yellow-50 text-yellow-700 border-yellow-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <FiCheck className="w-4 h-4" />;
      case "rejected":
        return <FiX className="w-4 h-4" />;
      default:
        return <FiClock className="w-4 h-4" />;
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    FetchBudgetItems();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleUpdateStatus = async() => {
    setUpdatingStatus(true);
    try {
      const result = await UpdateItemStatus(confirmationState.itemId, confirmationState.action)

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

  const handleDelete = async(itemID: number | null) => {
    setDeletingItem(true);
    try {
      const result = await DeleteBudgetItem(itemID)

      setSuccessMessage(result.message)
    } catch (error) {
       setErrorMessage(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setDeletingItem(false);
      setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 3000);
    }
  }

  return (
    <div className="bg-white p-8 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80 hover:shadow-xl transition-all duration-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium text-blue-600">
              Budget Items
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
            <FiPackage className="mr-2 text-blue-600" />
            Project Budget Items
          </h2>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            <FiRefreshCw
              className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </button>
          <div className="flex items-center bg-gray-50 rounded-lg p-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all duration-200"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-4 text-sm font-medium text-gray-700">
              Page {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all duration-200"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <FiFilter className="w-4 h-4" />
          <span>Filter by status:</span>
        </div>
        <div className="flex space-x-2">
          {["All", "Pending", "Approved", "Rejected"].map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status as any);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                statusFilter === status
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {budgetItems?.map((item) => (
          <div
            key={item.ID}
            className={`relative p-6 border rounded-xl transition-all duration-200 bg-white
              ${item.Status === 'Approved' 
                ? 'border-green-100 hover:border-green-200 hover:bg-green-50/10'
                : item.Status === 'Rejected'
                ? 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/10'
                : 'border-gray-100 hover:border-blue-100 hover:bg-blue-50/10'
              }`}
          >
            {/* Confirmation Overlay */}
            {confirmationState.itemId === item.ID && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center space-y-4 z-10">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  {confirmationState.action === 'approve' ? (
                    <div className="bg-blue-100 p-3 rounded-full">
                      <FiCheck className="w-6 h-6 text-blue-600" />
                    </div>
                  ) : confirmationState.action === 'delete' ? (
                    <div className="bg-red-100 p-3 rounded-full">
                      <FiTrash2 className="w-6 h-6 text-red-600" />
                    </div>
                  ) : (
                    <div className="bg-gray-100 p-3 rounded-full">
                      <FiAlertCircle className="w-6 h-6 text-gray-600" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900">
                  {confirmationState.action === 'approve' 
                    ? 'Approve this budget item?' 
                    : confirmationState.action === 'delete'
                    ? 'Delete this budget item?'
                    : 'Reject this budget item?'}
                </h3>
                
                <p className="text-sm text-gray-500 text-center max-w-sm">
                  {confirmationState.action === 'approve'
                    ? 'This action will approve the budget item and notify relevant stakeholders.'
                    : confirmationState.action === 'delete'
                    ? 'This action cannot be undone. The budget item will be permanently removed.'
                    : 'This action will reject the budget item and notify relevant stakeholders.'}
                </p>

                <div className="flex items-center space-x-3 mt-4">
                  <button
                    onClick={() => handleUpdateStatus()}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium
                      ${confirmationState.action === 'approve'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                        : confirmationState.action === 'delete'
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                        : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700'
                      }
                      shadow-sm hover:shadow
                      rounded-lg transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        confirmationState.action === 'approve'
                          ? 'focus:ring-blue-500'
                          : confirmationState.action === 'delete'
                          ? 'focus:ring-red-500'
                          : 'focus:ring-gray-500'
                      }`}
                  >
                    <div className={`${
                      confirmationState.action === 'approve'
                        ? 'bg-blue-400/30'
                        : confirmationState.action === 'delete'
                        ? 'bg-red-400/30'
                        : 'bg-gray-400/30'
                    } rounded-md p-1 mr-2`}>
                      {confirmationState.action === 'approve' ? (
                        <FiCheck className="w-4 h-4" />
                      ) : confirmationState.action === 'delete' ? (
                        <FiTrash2 className="w-4 h-4" />
                      ) : (
                        <FiX className="w-4 h-4" />
                      )}
                    </div>
                    Confirm {
                      confirmationState.action === 'approve'
                        ? 'Approval'
                        : confirmationState.action === 'delete'
                        ? 'Delete'
                        : 'Rejection'
                    }
                  </button>
                  <button
                    onClick={() => setConfirmationState({ itemId: null, action: null })}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium
                      border-2 border-gray-200 bg-white text-gray-600
                      hover:bg-gray-50 hover:border-gray-300
                      shadow-sm hover:shadow
                      rounded-lg transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-900">{item.Name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <FiTag className="w-4 h-4" />
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full border flex items-center space-x-1 text-sm font-medium 
                  ${item.Status === 'Approved'
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : item.Status === 'Rejected'
                    ? 'bg-gray-50 border-gray-200 text-gray-700'
                    : 'bg-blue-50 border-blue-100 text-blue-700'
                  }`}
              >
                {item.Status === 'Approved' ? (
                  <FiCheck className="w-4 h-4" />
                ) : item.Status === 'Rejected' ? (
                  <FiX className="w-4 h-4" />
                ) : (
                  <FiClock className="w-4 h-4" />
                )}
                <span>{item.Status}</span>
              </div>
            </div>

            <div className={`flex items-center text-gray-600 mb-3 rounded-lg p-3
              ${item.Status === 'Approved'
                ? 'bg-green-50'
                : item.Status === 'Rejected'
                ? 'bg-gray-50'
                : 'bg-gray-50'
              }`}
            >
              <FiDollarSign className={`w-5 h-5 mr-2 
                ${item.Status === 'Approved'
                  ? 'text-green-500'
                  : item.Status === 'Rejected'
                  ? 'text-gray-500'
                  : 'text-blue-500'
                }`} 
              />
              <span className="font-medium text-lg">
                ₱{item.Amount_Allocated.toLocaleString('en-PH', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </div>

            <div className={`p-4 rounded-lg mb-4
              ${item.Status === 'Approved'
                ? 'bg-green-50'
                : item.Status === 'Rejected'
                ? 'bg-gray-50'
                : 'bg-gray-50'
              }`}
            >
              <div className="flex items-start">
                <FiFileText className={`w-4 h-4 mr-2 mt-1 flex-shrink-0
                  ${item.Status === 'Approved'
                    ? 'text-green-500'
                    : item.Status === 'Rejected'
                    ? 'text-gray-500'
                    : 'text-blue-500'
                  }`}
                />
                <p className="text-gray-600">{item.Description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className={`flex items-center text-sm text-gray-500 px-3 py-2 rounded-lg
                ${item.Status === 'Approved'
                  ? 'bg-green-50'
                  : item.Status === 'Rejected'
                  ? 'bg-gray-50'
                  : 'bg-gray-50'
                }`}
              >
                <FiCalendar className={`w-4 h-4 mr-2
                  ${item.Status === 'Approved'
                    ? 'text-green-500'
                    : item.Status === 'Rejected'
                    ? 'text-gray-500'
                    : 'text-blue-500'
                  }`}
                />
                {item.Approval_Date 
                  ? `Approved on ${new Date(item.Approval_Date).toLocaleDateString('en-PH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}`
                  : item.Status === 'Rejected'
                  ? 'Rejected'
                  : 'Pending Approval'}
              </div>

              <div className="flex items-center space-x-3">
                {/* Action Buttons - Only show for pending items */}
                {item.Status === 'Pending' && !confirmationState.itemId && (
                  <>
                    <button
                      onClick={() => setConfirmationState({ itemId: item.ID, action: 'approve' })}
                      className="inline-flex items-center h-10 px-4 text-sm font-medium
                        bg-gradient-to-r from-blue-500 to-blue-600 text-white
                        hover:from-blue-600 hover:to-blue-700
                        shadow-sm hover:shadow whitespace-nowrap
                        rounded-lg transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <div className="bg-blue-400/30 rounded-md p-1.5 mr-2">
                        <FiCheck className="w-4 h-4" />
                      </div>
                      Approve
                    </button>
                    <button
                      onClick={() => setConfirmationState({ itemId: item.ID, action: 'reject' })}
                      className="inline-flex items-center h-10 px-4 text-sm font-medium
                        border-2 border-gray-200 bg-white text-gray-600
                        hover:bg-gray-50 hover:border-gray-300
                        shadow-sm hover:shadow whitespace-nowrap
                        rounded-lg transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <div className="bg-gray-100 rounded-md p-1.5 mr-2">
                        <FiX className="w-4 h-4" />
                      </div>
                      Reject
                    </button>
                  </>
                )}
                
                {/* Delete Button - Always show unless confirmation is open */}
                {!confirmationState.itemId && (
                  <button
                    onClick={() => setConfirmationState({ itemId: item.ID, action: 'delete' })}
                    className="inline-flex items-center justify-center h-10 w-10 text-sm font-medium
                      text-red-600 hover:bg-red-50
                      rounded-lg transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    title="Delete Item"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
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
