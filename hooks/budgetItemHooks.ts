import { GetBudgetItems } from "@/libs/budgetItem";
import { BudgetItemList, BudgetItemReturn } from "@/types/budgetItemTypes";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// export const useBudgetItems = (
//   projectID: number | null,
//   filter: string,
//   page: number
// ): BudgetItemReturn => {
//   const [budgetItems, setBudgetItems] = useState<BudgetItemList[] | null>(null);
//   const [itemCount, setItemCount] = useState<number>(0);
//   const [totalPages, setTotalPages] = useState<number>(0);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const FetchBudgetItems = async () => {
//     if (!projectID) return;

//     setIsLoading(true);

//     try {
//       const response = await GetBudgetItems(projectID, filter, page);
//       setBudgetItems(response.data);
//       setItemCount(response.count);

//       const totalPages = Math.ceil(response.count / 5);
//       setTotalPages(totalPages);

//       console.log(response.data);
//       console.log(response.count);
//       console.log(totalPages);
//     } catch (error) {
//       setError(
//         error instanceof Error ? error.message : "Unknown error occured"
//       );
//     } finally {
//       setIsLoading(false);
//       setTimeout(() => {
//         setError(null);
//       }, 3000);
//     }
//   };

//   useEffect(() => {
//     FetchBudgetItems();
//   }, [filter, page]);

//   return {
//     budgetItems,
//     itemCount,
//     totalPages,
//     FetchBudgetItems,
//     isLoading,
//     error,
//   };
// };

export const useBudgetItems = (
  projectID: number | null,
  filter: string,
  page: number
): BudgetItemReturn => {
  const {
    data,
    error: queryError,
    isLoading,
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
    isLoading,
    error,
  };
};
