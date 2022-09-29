import { AnVILCatalogWorkspace } from "./entities";

/**
 * Returns the consent code.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns String value of consent code.
 */
export const getConsentCode = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): string => anvilCatalogWorkspace["library:dataUseRestriction"] ?? "";

/**
 * Returns the consortium.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns String value of consortium.
 */
export const getConsortium = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): string => anvilCatalogWorkspace.consortium ?? "";

/**
 * Returns the data types.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns Array of data types.
 */
export const getDataTypes = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): string[] => anvilCatalogWorkspace["library:datatype"] ?? [];

/**
 * Returns the dbGap Id.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns String value of dbGap Id.
 */
export const getDbGapId = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): string => anvilCatalogWorkspace.phsId || "";

/**
 * Returns the diseases (indications).
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns Array of diseases (indications).
 */
export const getDiseases = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): string[] => anvilCatalogWorkspace["library:indication"] ?? [];

/**
 * Returns the participant count.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns The number of participants in the study.
 */
export const getParticipantCount = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): number => anvilCatalogWorkspace.participantCount ?? 0;

/**
 * Returns the study designs.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns Array of study designs.
 */
export const getStudyDesigns = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): string[] => anvilCatalogWorkspace["library:studyDesign"] ?? [];

/**
 * Returns the terra workspace name.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns String value of terra workspace name.
 */
export const getTerraWorkspaceName = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): string => anvilCatalogWorkspace.name ?? "";
