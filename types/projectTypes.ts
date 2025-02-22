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
  categoryInfo: DisplayCategory;
  projectList: ProjectListResponse[];
  error: string | null;
  loading: boolean;
  fetchProjectList: () => Promise<void>;
}

export interface DisplayCategory {
  name: string;
  description: string;
}

export interface ViewReturnSingleProject {
  project: ProjectListResponse | null;
  error: string;
  loading: boolean;
}
