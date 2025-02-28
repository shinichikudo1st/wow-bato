import { getBarangayBudgetCategory } from "@/libs/budgetCategory";
import { BudgetCategoryViewReturn } from "@/types/budgetCategoryTypes";
import { useQuery } from "@tanstack/react-query";

export const useBudgetCategory = (
  barangayID: number | null,
  page: number
): BudgetCategoryViewReturn => {
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["budgetCategories", barangayID, page],
    queryFn: () =>
      barangayID ? getBarangayBudgetCategory(barangayID, page) : null,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!barangayID,
  });

  const error = queryError
    ? queryError instanceof Error
      ? queryError.message
      : "Unknown error occurred"
    : null;

  // Extract data from the query result
  const budgetCategories = data?.data || [];
  const categoryCount = data?.count || 0;

  return {
    budgetCategories,
    isLoading,
    error,
    categoryCount,
  };
};
