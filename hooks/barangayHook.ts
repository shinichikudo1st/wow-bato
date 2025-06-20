"use client";

import {
  UseBarangayListReturn,
  UseBarangayNamesReturn,
  UsePublicViewBarangayReturn,
} from "@/types/barangayTypes";
import {
  DisplayBarangaysPublic,
  getBarangayNames,
  getBarangays,
  viewBarangay,
} from "@/libs/barangay";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useBarangayList = (currentPage: number): UseBarangayListReturn => {
  const limit = 5;
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const {
    data: barangays,
    isLoading,
    error: queryError,
    isFetching,
    refetch: originalRefetch,
  } = useQuery({
    queryKey: ["barangays", currentPage, limit],
    queryFn: () => getBarangays(currentPage, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Custom refetch function with minimum duration
  const refetch = async () => {
    setIsManualRefreshing(true);
    
    // Execute original refetch
    const result = await originalRefetch();
    
    // Ensure spinner shows for at least 500ms
    setTimeout(() => {
      setIsManualRefreshing(false);
    }, 500);
    
    return result;
  };

  const error = queryError
    ? queryError instanceof Error
      ? queryError.message
      : "An unknown error occurred"
    : null;

  return {
    barangays,
    isLoading,
    isRefreshing: isManualRefreshing || isFetching,
    error,
    refetch,
  };
};

export const useViewBarangay = (barangayID: string) => {
  const {
    data,
    isLoading,
    error: queryError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["barangay", barangayID],
    queryFn: () => (barangayID ? viewBarangay(barangayID) : null),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!barangayID,
  });

  const error = queryError
    ? queryError instanceof Error
      ? queryError.message
      : "Unknown error occured"
    : null;

  return {
    barangay: data?.data,
    isLoading,
    isRefreshing: isFetching,
    error,
    refetch,
  };
};

export const useBarangayNames = (): UseBarangayNamesReturn[] => {
  const { data } = useQuery({
    queryKey: ["barangays"],
    queryFn: () => getBarangayNames(),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  // Return an empty array if data is undefined or still loading
  return data || [];
};

export const usePublicViewBarangay = (): UsePublicViewBarangayReturn => {
  const { data } = useQuery({
    queryKey: ["publicBarangays"],
    queryFn: () => DisplayBarangaysPublic(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const barangays = data;
  return barangays;
};
