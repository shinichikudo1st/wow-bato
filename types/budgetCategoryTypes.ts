export interface AddBudgetCategoryFormData {
  name: string;
  description: string;
  barangay_ID: number;
}

export interface BudgetCategoryResponse {
  id: number;
  name: string;
  description: string;
  barangay_ID: number;
}

export interface BudgetCategoryViewReturn {
  budgetCategories: BudgetCategoryResponse[] | null;
  isLoading: boolean;
  error: string | null;
  categoryCount: number;
}

export interface CategoryOptions {
  id: number;
  name: string;
}
