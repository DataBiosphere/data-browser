
// Project
export interface ProjectResponse {
    projects: {
        projectId: string
        projectShortname: string
    }[]
}

export interface ProjectListResponse {
    hits: ProjectResponse[]
}