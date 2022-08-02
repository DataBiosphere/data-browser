import { NPCICatalogSourceItem } from "./entities";

/**
 * Return the value in the Platform column.
 * @param source - Study row in the NCPI catalog TSV.
 * @returns String value of Platform.
 */
export const getPlatform = (source: NPCICatalogSourceItem): string =>
  source.Platform;

/**
 * Return the value in the Study column.
 * @param source - Study row in the NCPI catalog TSV.
 * @returns String value of Study.
 */
export const getStudy = (source: NPCICatalogSourceItem): string => source.Study;

/**
 * Return the value in the Focus/Disease column.
 * @param source - Study row in the NCPI catalog TSV.
 * @returns String value of Focus/Disease.
 */
export const getFocusDisease = (source: NPCICatalogSourceItem): string =>
  source["Focus / Disease"];

/**
 * Return the value in the Data Type column.
 * @param source - Study row in the NCPI catalog TSV.
 * @returns String value of Data Type.
 */
export const getDataType = (source: NPCICatalogSourceItem): string =>
  source["Data Type"];

/**
 * Return the value in the dbGap Id column.
 * @param source - Study row in the NCPI catalog TSV.
 * @returns String value of dbGap Id.
 */
export const getDbGapId = (source: NPCICatalogSourceItem): string =>
  source["dbGap Id"];

/**
 * Return the value in the Study Design column.
 * @param source - Study row in the NCPI catalog TSV.
 * @returns String value of Study Design.
 */
export const getStudyDesign = (source: NPCICatalogSourceItem): string =>
  source["Study Design"];

/**
 * Return the value in the Participants column.
 * @param source - Study row in the NCPI catalog TSV.
 * @returns The number of participants in the study.
 */
export const getParticipants = (source: NPCICatalogSourceItem): number =>
  source.Participants;

/**
 * Return the value in the Consent Code column.
 * @param source - Study row in the NCPI catalog TSV.
 * @returns String value of Consent Code.
 */
export const getConsentCode = (source: NPCICatalogSourceItem): string =>
  source["Consent Code"];
