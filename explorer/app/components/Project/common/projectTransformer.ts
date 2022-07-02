// App dependencies
import {
  ContributorResponse,
  ProjectResponse,
  ProjectsResponse,
  PublicationResponse,
} from "app/models/responses";
import { CONTRIBUTOR_ROLE } from "./constants";
import {
  CollaboratingOrganization,
  Contact,
  Contributor,
  DataCurator,
  Description,
  ProjectPath,
  Publication,
  SupplementaryLink,
} from "./entities";
import { ENTRIES } from "../../../project-edits";

/**
 * Maps project collaborating organizations from API response.
 * @param projectsResponse - Response model return from projects API.
 * @returns project contributor's list of organizations with their corresponding citation number.
 */
export function getProjectCollaboratingOrganizations(
  projectsResponse?: ProjectsResponse
): CollaboratingOrganization[] | undefined {
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

  return [...citationByContributorOrganizations].map(([name, citation]) => {
    return {
      citation,
      name,
    };
  });
}

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
 * Maps project data curators from API response.
 * @param projectsResponse - Response model return from projects API.
 * @returns formatted list of "data curator" contributors.
 */
export function getProjectDataCurators(
  projectsResponse?: ProjectsResponse
): DataCurator[] | undefined {
  const project = getProjectResponse(projectsResponse);
  if (!project) {
    return;
  }

  // Filter for project contributors with the "data curator" role.
  const dataCurators = project.contributors
    .filter((contributor) => isContributorDataCurator(contributor.projectRole))
    .map((contributor) => contributor.contactName)
    .map((name) => formatName(name));

  if (dataCurators.length === 0) {
    return; // Caller is expecting undefined, not an empty array.
  }

  return dataCurators;
}

/**
 * Maps project description from API response.
 * @param projectsResponse - Response model return from projects API.
 * @returns string representation of project description.
 */
export function getProjectDescription(
  projectsResponse?: ProjectsResponse
): Description | undefined {
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
): ProjectPath | undefined {
  const project = getProjectResponse(projectsResponse);
  const projectPath = project?.projectId;
  if (!project || !projectPath) {
    return;
  }
  return `/${project.projectId}`;
}

/**
 * Maps project publications from API response, or from corresponding updated project (if listed).
 * @param projectsResponse - Project response model return from API.
 * @returns project publications.
 */
export function getProjectPublications(
  projectsResponse?: ProjectsResponse
): Publication[] | undefined {
  const project = getProjectResponse(projectsResponse);
  if (!project) {
    return;
  }
  // If publications are listed in the updated project (loaded from the projects edits JSON), use the updated
  // project's publications. That is, replace the entire publications array returned from the server with the
  // publications array specified in the project edits JSON.
  // Otherwise, use the publication data returned from the server.
  const publications = mapPublications(project.publications, project.projectId);

  if (publications.length === 0) {
    return; // Caller is expecting undefined, not an empty array.
  }

  return publications;
}

/**
 * Maps project supplementary links from API response.
 * @param projectsResponse - Response model return from projects API.
 * @returns list of supplementary links.
 */
export function getProjectSupplementaryLinks(
  projectsResponse?: ProjectsResponse
): SupplementaryLink[] | undefined {
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

/**
 * Determine the set of publications for the project being mapped. If there are project edits for this project, we
 * must overwrite publication data as specified in the project edits. For publication edits, we overwrite the entire
 * set of publications, using only the publications set in the JSON.
 * @param publicationsResponse - Project publications response model return from API.
 * @param projectId - Project id.
 * @returns project publications from project edits or from project publications from API.
 */
function mapPublications(
  publicationsResponse: PublicationResponse[],
  projectId: string
): Publication[] {
  const updatedProject = ENTRIES.find((entry) => entry.entryId === projectId);
  if (
    updatedProject &&
    updatedProject.publications &&
    updatedProject.publications.length > 0
  ) {
    return updatedProject.publications;
  }
  return publicationsResponse.map((publicationResponse) => {
    return {
      ...publicationResponse,
      doi: publicationResponse.doi ?? "", // Maps any null value to string.
      officialHcaPublication:
        publicationResponse.officialHcaPublication ?? false, // Maps any null value to "false".
    };
  });
}
