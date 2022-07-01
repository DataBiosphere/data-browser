// App dependencies
import {
  ContributorResponse,
  ProjectResponse,
  ProjectsResponse,
} from "app/models/responses";
import { Contact } from "../components/Contacts/contacts";
import {
  CONTRIBUTOR_ROLE,
  Contributor,
} from "../components/Contributors/contributors";

/**
 * Maps project contacts from API response.
 * @param projectsResponse - Response model return from projects API.
 * @returns project contacts.
 */
export function getProjectContacts(
  projectsResponse?: ProjectsResponse
): Contact[] | undefined {
  const projectResponse = getProjectResponse(projectsResponse);
  if (!projectResponse) {
    return;
  }

  const contacts = projectResponse.contributors
    .filter(
      (contributorResponse) => contributorResponse.correspondingContributor
    )
    .map(({ contactName, email, institution }) => {
      return { email, institution, name: formatName(contactName) };
    });

  if (contacts.length === 0) {
    return; // Caller is expecting undefined, not an empty array.
  }

  return contacts;
}

/**
 * Maps project contributors from API response.
 * @param projectsResponse - Response model return from projects API.
 * @returns project contributors with their corresponding [organization] citation number.
 */
export function getProjectContributors(
  projectsResponse?: ProjectsResponse
): Contributor[] | undefined {
  const project = getProjectResponse(projectsResponse);
  if (!project) {
    return;
  }

  // Filter for project contributors (contributors without the "data curator" role).
  const projectContributors = filterContributorsWithProjectContributors(
    project.contributors
  );

  if (projectContributors.length === 0) {
    return; // Caller is expecting undefined, not an empty array.
  }

  // Map the key-value pair contributor organizations and citation.
  const citationByContributorOrganizations =
    getCitationByCollaboratingOrganizations(projectContributors);

  return projectContributors.map((projectContributor) => {
    return {
      citation: citationByContributorOrganizations.get(
        projectContributor.institution
      ),
      name: formatName(projectContributor.contactName),
      role: formatTitleCase(projectContributor.projectRole),
    };
  });
}

/**
 * Maps project description from API response.
 * @param projectsResponse - Response model return from projects API.
 * @returns string representation of project description.
 */
export function getProjectDescription(
  projectsResponse?: ProjectsResponse
): string | undefined {
  const project = getProjectResponse(projectsResponse);
  if (!project) {
    return;
  }
  return project.projectDescription;
}

/**
 * Builds project path from projectId.
 * @param projectsResponse - Response model return from projects API.
 * @returns string representation of project path.
 */
export function getProjectPath(
  projectsResponse?: ProjectsResponse
): string | undefined {
  const project = getProjectResponse(projectsResponse);
  const projectPath = project?.projectId;
  if (!project || !projectPath) {
    return;
  }
  return `/${project.projectId}`;
}

/**
 * Maps project supplementary links from API response.
 * @param projectsResponse - Response model return from projects API.
 * @returns list of supplementary links.
 */
export function getProjectSupplementaryLinks(
  projectsResponse?: ProjectsResponse
): string[] | undefined {
  const project = getProjectResponse(projectsResponse);
  if (!project) {
    return;
  }

  // Filter valid links - API response can return [null]
  const supplementaryLinks = project.supplementaryLinks.filter((link) =>
    isValidUrl(link)
  );

  if (supplementaryLinks.length === 0) {
    return; // Caller is expecting undefined, not an empty array.
  }

  return supplementaryLinks;
}

/**
 * Returns the list of contributors for the project.
 * Will exclude any contributor with role "data curator".
 * @param contributors - Project contributor response model return from API.
 * @returns project contributors.
 */
function filterContributorsWithProjectContributors(
  contributors: ContributorResponse[]
): ContributorResponse[] {
  return contributors.filter(
    (contributor) => !isContributorDataCurator(contributor.projectRole)
  );
}

/**
 * Formats name from "firstName,middleName,lastName" to "firstName middleName lastName".
 * @param commaDelimitedName - Contributor's name tokens delimited by a comma.
 * @returns formatted name "firstName middleName lastName".
 */
function formatName(commaDelimitedName: string): string {
  return commaDelimitedName.split(/[ ,]+/).join(" ");
}

/**
 * Formats string to title case.
 * @param str - Value to format to title case.
 * @returns formatted string as title case.
 */
function formatTitleCase(str?: string): string | undefined {
  return str?.replace(/\b[a-z]/g, function (match) {
    return match.toUpperCase();
  });
}

/**
 * Map key-value pair of collaborating organizations and corresponding citation.
 * @param contributors - Project contributor response model return from API.
 * @returns collaborating organizations keyed by their citation.
 */
function getCitationByCollaboratingOrganizations(
  contributors: ContributorResponse[]
): Map<string, number> {
  const collaboratingOrganizationsSet = new Set(
    contributors.map((contributor) => contributor.institution)
  );
  return new Map(
    [...collaboratingOrganizationsSet].map((organization, i) => [
      organization,
      i + 1,
    ])
  );
}

/**
 * Returns the project value from the projects API response.
 * @param projectsResponse - Response returned from projects API response.
 */
function getProjectResponse(
  projectsResponse?: ProjectsResponse
): ProjectResponse | undefined {
  if (!projectsResponse) {
    return;
  }
  return projectsResponse.projects?.[0];
}

/**
 * Returns true if the contributor role is "data curator".
 * @param projectRole - Project contributor role.
 * @returns true if the contributor role is "data curator".
 */
function isContributorDataCurator(projectRole: string | undefined): boolean {
  return (
    Boolean(projectRole) &&
    projectRole?.toLowerCase() === CONTRIBUTOR_ROLE.DATA_CURATOR
  );
}

/**
 * Return true if url specified is valid.
 * @param testUrl - URL to check if valid.
 * @returns true when the url is valid.
 */
function isValidUrl(testUrl: string): boolean {
  try {
    return Boolean(new URL(testUrl));
  } catch (e) {
    return false;
  }
}
