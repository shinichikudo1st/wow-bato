"use client";

import {
  UseBarangayListReturn,
  UseBarangayNamesReturn,
  UsePublicViewBarangayReturn,
} from "@/types/barangayTypes";
import { useState, useEffect } from "react";
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
