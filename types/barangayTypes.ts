export interface AddBarangayFormData {
  name: string;
  city: string;
  region: string;
}

export interface BarangayListItem {
  id: number;
  name: string;
  city: string;
  region: string;
}

export interface BarangayListResponse {
  data: BarangayListItem[];
  message: string;
}

export interface ViewBarangayResponse {
  data: BarangayListItem;
  message: string;
}

export interface UseBarangayListReturn {
  barangays: BarangayListResponse | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  fetchBarangays: (showRefresh?: boolean) => Promise<void>;
}