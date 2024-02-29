import { processEntityValue } from "../../common/utils";
import { ProjectsResponse } from "./responses";

/**
 * Returns the project identifier for the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns project identifier.
 */
export const getProjectId = (projectsResponse: ProjectsResponse): string =>
  projectsResponse.projects[0].projectId;

/**
 * Returns the project title from the given API response.
 * Facilitates setting title within the `<Head>` element of the page.
 * @param projectsResponse - Response model return from entity API.
 * @returns project title.
 */
export const getTitle = (
  projectsResponse?: ProjectsResponse
): string | undefined => {
  if (!projectsResponse) return;
  return processEntityValue(projectsResponse.projects, "projectTitle");
};
