"use client";

import { useBarangayList } from "@/hooks/barangayHook";
import BarangayListError from "./barangayList/barangayListError";
import BarangayListControl from "./barangayList/barangayListControl";
import { useBarangayListStore } from "@/store/barangayStore";
import BarangayItemList from "./barangayList/barangayItem";
import BarangayLoading from "./barangayList/barangayLoading";

export default function BarangayList() {
  const { currentPage } = useBarangayListStore();
  const { isLoading, error, refetch } = useBarangayList(currentPage);

  if (error) {
    return <BarangayListError error={error} refetch={refetch} />;
  }

  return (
    <div className="bg-white p-6 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80 hover:shadow-xl transition-all duration-300">
      <BarangayListControl />

      {isLoading ? <BarangayLoading /> : <BarangayItemList />}
    </div>
  );
}
