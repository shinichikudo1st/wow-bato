import { getBarangayBudgetCategory } from "@/libs/budgetCategory";
import {
  BudgetCategoryResponse,
  BudgetCategoryViewReturn,
} from "@/types/budgetCategoryTypes";
import { useEffect, useState } from "react";

export const useBudgetCategory = (
  barangayID: number | null
): BudgetCategoryViewReturn => {
  const [budgetCategories, setBudgetCategories] = useState<
    BudgetCategoryResponse[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryCount, setCategoryCount] = useState(0);

  const fetchBudgetCategories = async () => {
    if (!barangayID) return;

    try {
      setIsLoading(true);
      const response = await getBarangayBudgetCategory(barangayID, 1);

      setBudgetCategories(response.data);
      setCategoryCount(response.count);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown error occured"
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  useEffect(() => {
    fetchBudgetCategories();
  }, [barangayID]);

  return {
    budgetCategories,
    isLoading,
    error,
    categoryCount,
    fetchBudgetCategories,
  };
};
