import { NCPICatalogDataset } from "./entities";

/**
 * Returns the consent codes.
 * @param ncpiCatalogDataset - NCPI catalog dataset.
 * @returns Array of consent codes.
 */
export const getConsentCodes = (
  ncpiCatalogDataset: NCPICatalogDataset
): string[] => ncpiCatalogDataset.consentCodes ?? [];

/**
 * Returns the data types.
 * @param ncpiCatalogDataset - NCPI catalog dataset.
 * @returns Array of data types.
 */
export const getDataTypes = (
  ncpiCatalogDataset: NCPICatalogDataset
): string[] => ncpiCatalogDataset.dataTypes ?? [];

/**
 * Returns the study identifier.
 * @param ncpiCatalogDataset - NCPI catalog dataset.
 * @returns String value of dbGapId.
 */
export const getDbGapId = (ncpiCatalogDataset: NCPICatalogDataset): string =>
  ncpiCatalogDataset.dbGapId;

/**
 * Returns the focus/disease.
 * @param ncpiCatalogDataset - NCPI catalog dataset.
 * @returns String value of focus/disease.
 */
export const getFocusDisease = (
  ncpiCatalogDataset: NCPICatalogDataset
): string => ncpiCatalogDataset.focusDisease;

/**
 * Returns the participant count.
 * @param ncpiCatalogDataset - NCPI catalog dataset.
 * @returns The number of participants in the study.
 */
export const getParticipantCount = (
  ncpiCatalogDataset: NCPICatalogDataset
): number => ncpiCatalogDataset.participantCount;

/**
 * Returns the platforms.
 * @param ncpiCatalogDataset - NCPI catalog dataset.
 * @returns Array of platforms.
 */
export const getPlatforms = (
  ncpiCatalogDataset: NCPICatalogDataset
): string[] => ncpiCatalogDataset.platforms ?? [];

/**
 * Returns the study.
 * @param ncpiCatalogDataset - NCPI catalog dataset.
 * @returns String value of Study.
 */
export const getStudy = (ncpiCatalogDataset: NCPICatalogDataset): string =>
  ncpiCatalogDataset.study;

/**
 * Returns the study designs.
 * @param ncpiCatalogDataset - NCPI catalog dataset.
 * @returns Array of study designs.
 */
export const getStudyDesigns = (
  ncpiCatalogDataset: NCPICatalogDataset
): string[] => ncpiCatalogDataset.studyDesigns ?? [];
