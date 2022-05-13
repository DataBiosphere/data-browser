/**
 * Paginated response type. This should be used by other model's reponses
 */
interface PaginatedResponse {
  pagination: {
    count: number;
    total: number;
    size: number;
    next?: string;
    previous?: string;
    pages: number;
    sort: string;
    order: "asc" | "desc";
  };
}

// Project
export interface ProjectResponse {
  projects: {
    projectId: string;
    projectShortname: string;
    projectTitle: string;
  }[];
}

export interface ProjectListResponse extends PaginatedResponse {
  hits: ProjectResponse[];
}
