export interface ProjectFormData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface ProjectListResponse {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface ViewReturnProjectList {
  projectList: ProjectListResponse[];
  error: string | null;
  loading: boolean;
}
