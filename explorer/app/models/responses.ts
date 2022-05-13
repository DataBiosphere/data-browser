// Project
export interface ProjectResponse {
  projects: {
    projectId: string;
    projectShortname: string;
    projectTitle: string;
  }[];
}

export interface ProjectListResponse {
  hits: ProjectResponse[];
}
