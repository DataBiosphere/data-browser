import {
  AnVILCatalogConsortium,
  AnVILCatalogEntity,
  AnVILCatalogStudy,
  AnVILCatalogWorkspace,
} from "./entities";

/**
 * Returns the consent code.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns String value of consent code.
 */
export const getConsentCode = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): string => anvilCatalogWorkspace.consentCode ?? "";

/**
 * Returns the consent codes.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Array of consent codes.
 */
export const getConsentCodes = (
  anvilCatalogEntity: Exclude<AnVILCatalogEntity, AnVILCatalogWorkspace>
): string[] => anvilCatalogEntity.consentCode ?? []; // consentCodes - a list of consent codes.

/**
 * Returns the consortium.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns String value of consortium.
 */
export const getConsortium = (anvilCatalogEntity: AnVILCatalogEntity): string =>
  anvilCatalogEntity.consortium ?? "";

/**
 * Returns the data types.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Array of data types.
 */
export const getDataTypes = (
  anvilCatalogEntity: AnVILCatalogEntity
): string[] => anvilCatalogEntity.dataTypes ?? [];

/**
 * Returns the dbGapId.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns String value of dbGapId.
 */
export const getDbGapId = (anvilCatalogEntity: AnVILCatalogEntity): string =>
  anvilCatalogEntity.dbGapId || "";

/**
 * Returns the dbGapIds.
 * @param anvilCatalogConsortium - AnVIL catalog consortium.
 * @returns Array of dbGapIds.
 */
export const getDbGapIds = (
  anvilCatalogConsortium: AnVILCatalogConsortium
): string[] => anvilCatalogConsortium.dbGapId || []; // dbGapIds - a list of study identifiers.

/**
 * Returns the diseases (indications).
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Array of diseases (indications).
 */
export const getDiseases = (anvilCatalogEntity: AnVILCatalogEntity): string[] =>
  anvilCatalogEntity.diseases ?? [];

/**
 * Returns the participant count.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns The number of participants in the entity.
 */
export const getParticipantCount = (
  anvilCatalogEntity: AnVILCatalogEntity
): number => anvilCatalogEntity.participantCount ?? 0;

/**
 * Returns the study designs.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Array of study designs.
 */
export const getStudyDesigns = (
  anvilCatalogEntity: AnVILCatalogEntity
): string[] => anvilCatalogEntity.studyDesigns ?? [];

/**
 * Returns the terra workspace count.
 * @param anvilCatalogStudy - AnVIL catalog study.
 * @returns The number of terra workspaces in the study.
 */
export const getTerraWorkspaceCount = (
  anvilCatalogStudy: AnVILCatalogStudy
): number => anvilCatalogStudy.workspaceCount ?? 0;

/**
 * Returns the terra workspace name.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns String value of terra workspace name.
 */
export const getTerraWorkspaceName = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): string => anvilCatalogWorkspace.workspaceName ?? "";

/**
 * Returns the terra workspace names.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Array of terra workspace names.
 */
export const getTerraWorkspaceNames = (
  anvilCatalogEntity: Exclude<AnVILCatalogEntity, AnVILCatalogWorkspace>
): string[] => anvilCatalogEntity.workspaceName ?? []; // workspaceNames - a list of workspace names.
