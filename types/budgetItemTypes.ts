export interface NewItemData {
  name: string;
  amount_allocated: number | 0;
  description: string;
  status: string;
}

export interface BudgetItemList {
  name: string;
  amount_allocated: number | 0;
  description: string;
  status: string;
  approval_date: string | null;
  projectID: number;
}

export interface BudgetItemReturn {
  budgetItems: BudgetItemList[] | null;
  isLoading: boolean;
  error: string | null;
}