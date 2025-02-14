"use client";

import {
  BarangayListItem,
  BarangayListResponse,
  UseBarangayListReturn,
  UseBarangayNamesReturn,
  UsePublicViewBarangayReturn,
  UseViewBarangayReturn,
  ViewBarangayResponse,
} from "@/types/barangayTypes";
import { useState, useEffect, useCallback } from "react";
import { DisplayBarangaysPublic, getBarangayNames, getBarangays, viewBarangay } from "@/libs/barangay";

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

  return barangays
}