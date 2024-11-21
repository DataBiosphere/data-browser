import {
  CollaboratingOrganization,
  Contact,
  Contributor,
  DataCurator,
  Publication,
  SupplementaryLink,
} from "@databiosphere/findable-ui/lib/components/Project/common/entities";
import {
  ContributorResponse,
  ProjectResponse,
  PublicationResponse,
} from "../../../../../apis/azul/hca-dcp/common/entities";
import { Atlas } from "../../../../../components/Detail/components/Section/components/AtlasSection/types";
import { isNetworkKey } from "../../../../../components/Index/common/utils";
import { CONTRIBUTOR_ROLE } from "./constants";
import { AnalysisPortal, ProjectEdit } from "./projectEdits/entities";
import { projectEdits } from "./projectEdits/projectEdits";

/**
 * Maps project analysis portals from the project edits and given projects response.
 * @param projectResponse - Response model return from projects API.
 * @returns project analysis portals.
 */
export function mapProjectAnalysisPortals(
  projectResponse?: ProjectResponse
): AnalysisPortal[] | undefined {
  if (!projectResponse) {
    return;
  }
  const { analysisPortals } = getProjectEdit(projectResponse.projectId) || {};
  return analysisPortals;
}

/**
 * Maps project tissue atlases from the project response to network key and corresponding atlas name.
 * @param projectResponse - Response model return from project API.
 * @returns list of atlas with network key and atlas name.
 */
export function mapProjectAtlas(projectResponse?: ProjectResponse): Atlas[] {
  if (!projectResponse) return [];
  return projectResponse.tissueAtlas.reduce((acc, { atlas, version }, i) => {
    if (!atlas) return acc;
    const networkKey = projectResponse.bionetworkName[i];
    if (isNetworkKey(networkKey)) {
      acc.push({ atlasName: `${atlas} ${version}`, networkKey });
    }
    return acc;
  }, [] as Atlas[]);
}

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
    .filter(({ correspondingContributor }) => correspondingContributor)
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
  // If there are contributors listed in the updated project (loaded from the project edits JSON), use it to
  // update the project's contributors. Otherwise, use the contributor data return from server.
  const contributors = mapContributors(
    projectResponse.contributors,
    projectResponse.projectId
  );
  // Filter for project contributors (contributors without the "data curator" role).
  const projectContributors =
    filterContributorsWithProjectContributors(contributors);
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
 * Returns the project edits for the project.
 * @param projectId - Project identifier.
 * @returns project edit for the project.
 */
function getProjectEdit(projectId: string): ProjectEdit | undefined {
  return projectEdits.find((projectEdit) => projectEdit.entryId === projectId);
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
 * Determine the set of contributors for the project being mapped. If there are project edits for this project, we
 * must overwrite contributor data as specified in the project edits. For contributor edits, we only overwrite the
 * values of the contributors that are specified in the project edits JSON (and not the entire contributor list).
 * @param contributorsResponse - Project contributor response model return from API.
 * @param projectId - Project id.
 * @returns project contributors from project edits or from project contributors from API.
 */
function mapContributors(
  contributorsResponse: ContributorResponse[],
  projectId: string
): ContributorResponse[] {
  const updatedProject = getProjectEdit(projectId);
  if (
    updatedProject &&
    updatedProject.contributors &&
    updatedProject.contributors.length > 0
  ) {
    // Updates have been specified for this project's contributors list; update according to the project edits.
    const updatedContributorsByName = updatedProject.contributors.reduce(
      (accum, contributor) => {
        if (contributor.contactName) {
          accum.set(contributor.contactName, contributor);
        }
        return accum;
      },
      new Map<string, Partial<ContributorResponse>>()
    );
    // Return the contributors with the updated project contributors.
    return contributorsResponse.reduce((accum, contributor) => {
      const updatedContributor =
        updatedContributorsByName.get(contributor.contactName) || {};
      accum.push(Object.assign({}, contributor, updatedContributor));
      return accum;
    }, [] as ContributorResponse[]);
  }
  return contributorsResponse;
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
  const updatedProject = getProjectEdit(projectId);
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
