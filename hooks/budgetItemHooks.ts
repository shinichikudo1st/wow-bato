import { GetBudgetItems } from "@/libs/budgetItem";
import { BudgetItemList, BudgetItemReturn } from "@/types/budgetItemTypes";
import { useEffect, useState } from "react";

export const useBudgetItems = (projectID: number | null, filter: string, page: number):BudgetItemReturn => {

    const [budgetItems, setBudgetItems] = useState<BudgetItemList[] | null>(null);
    const [itemCount, setItemCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const FetchBudgetItems = async () => {
        if (!projectID) return;

        setIsLoading(true);

        try {
            const response = await GetBudgetItems(projectID, filter, page);
            setBudgetItems(response.data);
            setItemCount(response.count)

            const totalPages = Math.ceil(response.count / 5);
            setTotalPages(totalPages);

            console.log(response.data);
            console.log(response.count);
            console.log(totalPages);
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
    }

    useEffect(() => {
        FetchBudgetItems();
    }, [filter,page]);


    return {
        budgetItems,
        itemCount,
        totalPages,
        FetchBudgetItems,
        isLoading,
        error,
    }

}