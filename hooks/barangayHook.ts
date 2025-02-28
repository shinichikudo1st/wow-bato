"use client";

import {
  BarangayListItem,
  UseBarangayListReturn,
  UseBarangayNamesReturn,
  UsePublicViewBarangayReturn,
  UseViewBarangayReturn,
} from "@/types/barangayTypes";
import { useState, useEffect, useCallback } from "react";
import {
  DisplayBarangaysPublic,
  getBarangayNames,
  getBarangays,
  viewBarangay,
} from "@/libs/barangay";
import { useQuery } from "@tanstack/react-query";

export const useBarangayList = (currentPage: number): UseBarangayListReturn => {
  const limit = 5;

  const {
    data: barangays,
    isLoading,
    error: queryError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["barangays", currentPage, limit],
    queryFn: () => getBarangays(currentPage, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const error = queryError
    ? queryError instanceof Error
      ? queryError.message
      : "An unknown error occurred"
    : null;

  return {
    barangays,
    isLoading,
    isRefreshing: isFetching,
    error,
    refetch,
  };
};

export const useViewBarangay = (barangayID: string): UseViewBarangayReturn => {
  const [barangay, setBarangay] = useState<BarangayListItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBarangay = useCallback(
    async (showRefresh = false) => {
      try {
        showRefresh ? setIsRefreshing(true) : setIsLoading(true);
        setError(null);
        const data = await viewBarangay(barangayID);
        setBarangay(data.data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [barangayID]
  );

  useEffect(() => {
    fetchBarangay();
  }, [fetchBarangay]);

  return {
    barangay,
    isLoading,
    isRefreshing,
    error,
    fetchBarangay,
  };
};

export const useBarangayNames = (): UseBarangayNamesReturn[] => {
  const [barangays, setBarangays] = useState<UseBarangayNamesReturn[]>([]);

  useEffect(() => {
    const fetchBarangayNames = async () => {
      try {
        const data = await getBarangayNames();
        setBarangays(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBarangayNames();
  }, []);

  return barangays;
};

export const usePublicViewBarangay = (): UsePublicViewBarangayReturn[] => {
  const [barangays, setBarangays] = useState<UsePublicViewBarangayReturn[]>([]);

  useEffect(() => {
    const fetchBarangayNames = async () => {
      try {
        const data = await DisplayBarangaysPublic();
        setBarangays(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBarangayNames();
  }, []);

  return barangays;
};
