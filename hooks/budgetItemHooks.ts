import { GetBudgetItems } from "@/libs/budgetItem";
import { BudgetItemList, BudgetItemReturn } from "@/types/budgetItemTypes";
import { useEffect, useState } from "react";

export const useBudgetItems = (projectID: number | null, filter: string, page: number):BudgetItemReturn => {

    const [budgetItems, setBudgetItems] = useState<BudgetItemList[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const FetchBudgetItems = async () => {
        if (!projectID) return;

        setIsLoading(true);

        try {
            const response = await GetBudgetItems(projectID, filter, page);
            setBudgetItems(response.data);

            console.log(budgetItems) // debugging
            console.log(response.data) // doing debugging
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
        isLoading,
        error,
    }

}