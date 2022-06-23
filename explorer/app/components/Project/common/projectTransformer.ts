// App dependencies
import { ProjectResponse } from "app/models/responses";
import { Contact } from "../components/Contacts/contacts";

/**
 * Maps project contacts from API response.
 * @param project - Project response model return from API.
 * @returns project contacts.
 */
export function getProjectContacts(project?: ProjectResponse): Contact[] {
  if (!project) {
    return [];
  }
  return project?.projects[0].contributors
    .filter((contributor) => contributor.correspondingContributor)
    .map(({ contactName, email, institution }) => {
      return { email, institution, name: contactName };
    });
}

/**
 * Maps project description from API response.
 * @param project - Project response model return from API.
 * @returns string representation of project description.
 */
export function getProjectDescription(
  project?: ProjectResponse
): string | undefined {
  return project?.projects[0].projectDescription;
}
