import {
  Key,
  KeyValues,
  Value,
} from "@clevercanary/data-explorer-ui/lib/components/common/KeyValuePairs/keyValuePairs";
import {
  CollaboratingOrganization,
  Contact,
  Contributor,
  DataCurator,
  Publication,
  SupplementaryLink,
} from "@clevercanary/data-explorer-ui/lib/components/Project/common/entities";
import {
  ContributorResponse,
  ProjectResponse,
  PublicationResponse,
} from "../../../../../apis/azul/hca-dcp/common/entities";
import { ENTRIES } from "../../../../../project-edits";
import { CONTRIBUTOR_ROLE } from "./constants";

/**
 * Maps project collaborating organizations from the given projects response.
 * @param projectResponse - Response model return from projects API.
 * @returns project contributor's list of organizations with their corresponding citation number.
 */
export function mapProjectCollaboratingOrganizations(
  projectResponse?: ProjectResponse
): CollaboratingOrganization[] | undefined {
  if (!projectResponse) {
    return;
  }
  // Filter for project contributors (contributors without the "data curator" role).
  const projectContributors = filterContributorsWithProjectContributors(
    projectResponse.contributors
  );
  if (projectContributors.length === 0) {
    return; // Caller is expecting undefined, not an empty array.
  }
  // Map the key-value pair contributor organizations and citation.
  const citationByContributorOrganizations =
    getCitationByCollaboratingOrganizations(projectContributors);
  // Return the list of collaborating organizations.
  return [...citationByContributorOrganizations].map(([name, citation]) => {
    return {
      citation,
      name,
    };
  });
}

/**
 * Maps project contacts from the given projects response.
 * @param projectResponse - Response model return from projects API.
 * @returns project contacts.
 */
export function mapProjectContacts(
  projectResponse?: ProjectResponse
): Contact[] | undefined {
  if (!projectResponse) {
    return;
  }
  const contacts: Contact[] = projectResponse.contributors
    .filter(
      (contributorResponse) => contributorResponse.correspondingContributor
    )
    .map(({ contactName, email, institution }) => {
      return {
        email: email ? email : undefined,
        institution,
        name: formatName(contactName),
      };
    });
  if (contacts.length === 0) {
    return; // Caller is expecting undefined, not an empty array.
  }
  return contacts;
}

/**
 * Maps project contributors from the given projects response.
 * @param projectResponse - Response model return from projects API.
 * @returns project contributors with their corresponding [organization] citation number.
 */
export function mapProjectContributors(
  projectResponse?: ProjectResponse
): Contributor[] | undefined {
  if (!projectResponse) {
    return;
  }
  // Filter for project contributors (contributors without the "data curator" role).
  const projectContributors = filterContributorsWithProjectContributors(
    projectResponse.contributors
  );
  if (projectContributors.length === 0) {
    return; // Caller is expecting undefined, not an empty array.
  }
  // Map the key-value pair contributor organizations and citation.
  const citationByContributorOrganizations =
    getCitationByCollaboratingOrganizations(projectContributors);
  // Return project contributors with their corresponding [organization] citation number.
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
 * Maps project data curators from the given projects response.
 * @param projectResponse - Response model return from projects API.
 * @returns formatted list of "data curator" contributors.
 */
export function mapProjectDataCurators(
  projectResponse?: ProjectResponse
): DataCurator[] | undefined {
  if (!projectResponse) {
    return;
  }
  // Filter for project contributors with the "data curator" role.
  const dataCurators = projectResponse.contributors
    .filter((contributor) => isContributorDataCurator(contributor.projectRole))
    .map((contributor) => contributor.contactName)
    .map((name) => formatName(name));
  if (dataCurators.length === 0) {
    return; // Caller is expecting undefined, not an empty array.
  }
  return dataCurators;
}

/**
 * Maps project data summary related information, included formatted display text from the given projects response.
 * TODO - resolve with the completion of mapping project detail.
 * @param projectResponse - Response model return from projects API.
 * @returns data summaries key-value pairs of data summary label and corresponding value.
 */
export function mapProjectDetails(
  projectResponse?: ProjectResponse
): KeyValues | undefined {
  if (!projectResponse) {
    return;
  }
  const details = new Map<Key, Value>();
  details.set("Project Label", projectResponse.projectShortname);
  return details;
}

/**
 * Maps project publications from the given projects response, or from corresponding updated project (if listed).
 * @param projectResponse - Response model return from projects API.
 * @returns project publications.
 */
export function mapProjectPublications(
  projectResponse?: ProjectResponse
): Publication[] | undefined {
  if (!projectResponse) {
    return;
  }
  // If publications are listed in the updated project (loaded from the projects edits JSON), use the updated
  // project's publications. That is, replace the entire publications array returned from the server with the
  // publications array specified in the project edits JSON.
  // Otherwise, use the publication data returned from the server.
  const publications = mapPublications(
    projectResponse.publications,
    projectResponse.projectId
  );
  if (publications.length === 0) {
    return; // Caller is expecting undefined, not an empty array.
  }
  return publications;
}

/**
 * Maps project supplementary links from the given projects response.
 * @param projectResponse - Response model return from projects API.
 * @returns list of supplementary links.
 */
export function mapProjectSupplementaryLinks(
  projectResponse?: ProjectResponse
): SupplementaryLink[] | undefined {
  if (!projectResponse) {
    return;
  }
  // Filter valid links - API response can return [null]
  const supplementaryLinks: SupplementaryLink[] =
    projectResponse.supplementaryLinks
      .filter(notNull)
      .filter((link) => isValidUrl(link));
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
function formatTitleCase(str?: string | null): string | undefined {
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
 * Returns true if the contributor role is "data curator".
 * @param projectRole - Project contributor role.
 * @returns true if the contributor role is "data curator".
 */
function isContributorDataCurator(
  projectRole: string | null | undefined
): boolean {
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
      publicationUrl: publicationResponse.publicationUrl ?? "",
    };
  });
}

/**
 * Determine if the given value is not null.
 * @param value - Value.
 * @returns true if the given value is not null.
 */
function notNull<T>(value: T | null): value is T {
  return value !== null;
}
