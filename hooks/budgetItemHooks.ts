import { GetBudgetItems } from "@/libs/budgetItem";
import { BudgetItemReturn } from "@/types/budgetItemTypes";
import { useQuery } from "@tanstack/react-query";

export const useBudgetItems = (
  projectID: number | null,
  filter: string,
  page: number
): BudgetItemReturn => {
  const {
    data,
    error: queryError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["budgetItems", filter, page],
    queryFn: () => (projectID ? GetBudgetItems(projectID, filter, page) : null),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!projectID,
  });

  const error = queryError
    ? queryError instanceof Error
      ? queryError.message
      : "Unknown error occured"
    : null;

  return {
    budgetItems: data?.data,
    itemCount: data?.count,
    totalPages: Math.ceil(data?.count / 5),
    refetch,
    isLoading: isFetching,
    error,
  };
};
