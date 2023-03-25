import { ProjectsResponse } from "./responses";

/**
 * Returns the project identifier for the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns project identifier.
 */
export const getProjectId = (projectsResponse: ProjectsResponse): string =>
  projectsResponse.projects[0].projectId;
