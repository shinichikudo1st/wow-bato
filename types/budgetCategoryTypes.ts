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
  project_count: number;
}

export interface BudgetCategoryViewReturn {
  budgetCategories: BudgetCategoryResponse[] | null;
  isLoading: boolean;
  error: string | null;
  categoryCount: number;
}
