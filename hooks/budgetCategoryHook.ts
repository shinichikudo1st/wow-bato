import {
  getBarangayBudgetCategory,
  getBudgetCategoryOptions,
} from "@/libs/budgetCategory";
import {
  BudgetCategoryResponse,
  BudgetCategoryViewReturn,
  CategoryOptions,
} from "@/types/budgetCategoryTypes";
import { useEffect, useState } from "react";

export const useBudgetCategory = (
  barangayID: number | null,
  page: number
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
      const response = await getBarangayBudgetCategory(barangayID, page);

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
  }, [barangayID, page]);

  return {
    budgetCategories,
    isLoading,
    error,
    categoryCount,
  };
};

export const useCategoryOptions = (
  barangayID: number | null
): CategoryOptions[] => {
  const [categoryOptions, setCategoryOptions] = useState<CategoryOptions[]>([]);

  const fetchCategoryOptions = async () => {
    if (!barangayID) return;

    try {
      const result = await getBudgetCategoryOptions(barangayID);

      setCategoryOptions(result.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCategoryOptions();
  }, [barangayID]);

  return categoryOptions;
};
