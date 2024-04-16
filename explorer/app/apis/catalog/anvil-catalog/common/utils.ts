import {
  sanitizeString,
  sanitizeStringArray,
} from "@databiosphere/findable-ui/lib/viewModelBuilders/common/utils";
import {
  AnVILCatalogConsortium,
  AnVILCatalogEntity,
  AnVILCatalogStudy,
  AnVILCatalogStudyAny,
  AnVILCatalogWorkspace,
} from "./entities";

/**
 * Returns the id of the study (the dbGaP id).
 * @param anvilCatalogStudy - AnVIL study.
 * @returns String value of dbGapId.
 */
export const getStudyId = (anvilCatalogStudy: AnVILCatalogStudy): string =>
  anvilCatalogStudy.dbGapId || "";

/**
 * Returns the study name from the given API response.
 * Facilitates setting title within the `<Head>` element of the page.
 * @param anvilCatalogStudy - Response model return from entity API.
 * @returns study name.
 */
export const getStudyTitle = (
  anvilCatalogStudy?: AnVILCatalogStudy
): string | undefined => {
  return anvilCatalogStudy?.studyName;
};

/**
 * Returns the terra workspace name.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns String value of terra workspace name.
 */
export const getWorkspaceId = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): string => anvilCatalogWorkspace.workspaceName ?? "";

/**
 * Returns the consortium.
 * @param anvilCatalogEntity - AnVIL consortium
 * @returns String value of consortium.
 */
export const getConsortiumId = (
  anvilCatalogEntity: AnVILCatalogEntity
): string => anvilCatalogEntity.consortium ?? "";

/**
 * Returns the consortium from the given API response.
 * Facilitates setting title within the `<Head>` element of the page.
 * @param anvilCatalogEntity - Response model return from entity API.
 * @returns consortium.
 */
export const getConsortiumTitle = (
  anvilCatalogEntity?: AnVILCatalogEntity
): string | undefined => {
  return anvilCatalogEntity?.consortium;
};

export const anvilCatalogStudyInputMapper = <
  StudyType extends AnVILCatalogStudyAny
>(
  input: StudyType
): StudyType => {
  return {
    ...input,
    studyName: sanitizeString(input.studyName),
  };
};

export const anvilCatalogWorkspaceInputMapper = (
  input: AnVILCatalogWorkspace
  // eslint-disable-next-line sonarjs/no-identical-functions -- //TODO remove this duplication
): AnVILCatalogWorkspace => {
  return {
    ...input,
    studyName: sanitizeString(input.studyName),
  };
};

export const anvilCatalogConsortiumInputMapper = (
  input: AnVILCatalogConsortium
): AnVILCatalogConsortium => {
  return {
    ...input,
    studies: input.studies.map(anvilCatalogStudyInputMapper),
    studyName: sanitizeStringArray(input.studyName),
    workspaces: input.workspaces.map(anvilCatalogWorkspaceInputMapper),
  };
};
