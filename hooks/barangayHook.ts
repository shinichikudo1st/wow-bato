import {
  BarangayListResponse,
  ViewBarangayResponse,
} from "@/types/barangayTypes";
import { useState, useEffect, useCallback } from "react";
import { getBarangays, viewBarangay } from "@/libs/barangay";

interface UseBarangayListReturn {
  barangays: BarangayListResponse | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  fetchBarangays: (showRefresh?: boolean) => Promise<void>;
}

interface UseViewBarangayReturn {
  barangay: ViewBarangayResponse | null;
  isLoading: boolean;
  error: string | null;
  fetchBarangay: () => Promise<void>;
}

export const useBarangayList = (currentPage: number): UseBarangayListReturn => {
  const [barangays, setBarangays] = useState<BarangayListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const limit = 5;

  const fetchBarangays = useCallback(
    async (showRefresh = false) => {
      try {
        showRefresh ? setIsRefreshing(true) : setIsLoading(true);
        setError(null);
        const data = await getBarangays(currentPage, limit);
        setBarangays(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    },
    [currentPage]
  );

  useEffect(() => {
    fetchBarangays();
  }, [currentPage, fetchBarangays]);

  return {
    barangays,
    isLoading,
    isRefreshing,
    error,
    fetchBarangays,
  };
};

export const useViewBarangay = (id: string): UseViewBarangayReturn => {
  const [barangay, setBarangay] = useState<ViewBarangayResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBarangay = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await viewBarangay(id);
      setBarangay(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  return {
    barangay,
    isLoading,
    error,
    fetchBarangay,
  };
};
