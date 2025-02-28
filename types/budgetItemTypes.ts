export interface NewItemData {
  name: string;
  amount_allocated: number | 0;
  description: string;
  status: string;
}

export interface BudgetItemList {
  ID: number;
  Name: string;
  Amount_Allocated: number | 0;
  Description: string;
  Status: string;
  Approval_Date: string | null;
  ProjectID: number;
}

export interface BudgetItemReturn {
  budgetItems: BudgetItemList[] | null;
  itemCount: number;
  totalPages: number;
  refetch: () => void;
  isLoading: boolean;
  error: string | null;
}
