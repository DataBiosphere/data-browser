// App dependencies
import { ProjectResponse } from "app/models/responses";

/**
 * Maps project description from API response.
 * @param project - Project response model return from API.
 * @returns string representation of project description
 */
export function getProjectDescription(
  project?: ProjectResponse
): string | undefined {
  return project?.projects[0].projectDescription;
}
