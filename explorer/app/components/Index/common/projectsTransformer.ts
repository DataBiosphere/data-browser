import { ProjectsResponse } from "../../../models/responses";
import { MetadataValue } from "./entities";

/**
 * Maps project species from API response.
 * @param projectsResponse - Response model return from projects API.
 * @returns project species.
 */
export function getProjectMetadataSpecies(
  projectsResponse?: ProjectsResponse
): MetadataValue[] {
  const donorOrganisms = projectsResponse?.donorOrganisms?.flatMap(
    (donorOrganism) => donorOrganism.genusSpecies
  );

  if (!donorOrganisms || donorOrganisms?.length === 0) {
    return ["Unspecified"]; // Caller is expecting "Unspecified", not an empty array.
  }

  return donorOrganisms;
}
