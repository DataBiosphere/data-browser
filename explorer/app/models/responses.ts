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
    sort?: string;
    order?: "asc" | "desc";
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

//Samples
export interface SampleResponse {
  samples: {
    id: string;
  }[];
}

//Files
export interface FileResponse {
  files: {
    name: string;
    uuid: string;
  }[];
}

export interface ProjectListResponse extends PaginatedResponse {
  hits: ProjectResponse[];
}

export interface SampleListResponse extends PaginatedResponse {
  hits: SampleResponse[];
}

export interface FileListResponse extends PaginatedResponse {
  hits: FileResponse[];
}

export type DetailResponseType =
  | ProjectResponse
  | FileResponse
  | SampleResponse;

export type ListResponseType =
  | ProjectListResponse
  | SampleListResponse
  | FileListResponse;
