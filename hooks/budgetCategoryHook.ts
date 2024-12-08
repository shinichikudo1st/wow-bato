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
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBudgetCategories = async () => {
      if (!barangayID) return;

      try {
        setIsLoading(true);
        const response = await getBarangayBudgetCategory(barangayID, 1);

        setBudgetCategories(response.data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Unknown error occured"
        );
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setError(null);
          setSuccess(null);
        }, 3000);
      }
    };

    fetchBudgetCategories();
  }, [barangayID]);

  return {
    budgetCategories,
    isLoading,
    error,
    success,
  };
};
