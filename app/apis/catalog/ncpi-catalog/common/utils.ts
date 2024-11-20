import {
  sanitizeString,
  sanitizeStringArray,
} from "@databiosphere/findable-ui/lib/viewModelBuilders/common/utils";
import { NCPICatalogPlatform, NCPICatalogStudy, NCPIStudy } from "./entities";

export function NCPIStudyInputMapper(ncpiStudy: NCPIStudy): NCPICatalogStudy {
  const ncpiCatalogStudy: NCPICatalogStudy = {
    consentCode: sanitizeStringArray(ncpiStudy.consentCodes),
    consentLongName: ncpiStudy.consentLongNames,
    dataType: sanitizeStringArray(ncpiStudy.dataTypes),
    dbGapId: ncpiStudy.dbGapId,
    focus: sanitizeString(ncpiStudy.focus),
    participantCount: ncpiStudy.participantCount,
    platform: ncpiStudy.platforms,
    studyAccession: ncpiStudy.studyAccession,
    studyDescription: ncpiStudy.description,
    studyDesign: ncpiStudy.studyDesigns,
    title: sanitizeString(ncpiStudy.title),
  };
  return ncpiCatalogStudy;
}

export function NCPIPlatformInputMapper(
  ncpiPlatform: NCPICatalogPlatform
): NCPICatalogPlatform {
  const ncpiCatalogPlatform: NCPICatalogPlatform = {
    consentCode: sanitizeStringArray(ncpiPlatform.consentCode),
    consentLongName: ncpiPlatform.consentLongName,
    dataType: sanitizeStringArray(ncpiPlatform.dataType),
    dbGapId: sanitizeStringArray(ncpiPlatform.dbGapId),
    focus: sanitizeStringArray(ncpiPlatform.focus),
    participantCount: ncpiPlatform.participantCount,
    platform: ncpiPlatform.platform,
    studyAccession: ncpiPlatform.studyAccession,
    studyDesign: ncpiPlatform.studyDesign,
    title: sanitizeStringArray(ncpiPlatform.title),
  };
  return ncpiCatalogPlatform;
}

/**
 * Returns the platform ID
 * @param ncpiCatalogPlatform - NCPI catalog platform.
 * @returns String value of platform which is the platform name)
 */
export const getPlatformId = (
  ncpiCatalogPlatform: NCPICatalogPlatform
): string => ncpiCatalogPlatform.platform ?? "";

/**
 * Returns the study ID which is the dbGaPId.
 * @param ncpiCatalogStudy - NCPI catalog study.
 * @returns String value of dbGapId.
 */
//TODO dbGaP is is not unique if the study has no ID.
export const getStudyId = (ncpiCatalogStudy: NCPICatalogStudy): string =>
  ncpiCatalogStudy.dbGapId ?? "";

/**
 * Returns the study title from the given API response.
 * Facilitates setting within the `<Head>` element of the page.
 * @param ncpiCatalogStudy - Response model return from entity API.
 * @returns study title.
 */
export const getTitle = (
  ncpiCatalogStudy?: NCPICatalogStudy
): string | undefined => {
  if (!ncpiCatalogStudy) return;
  return ncpiCatalogStudy.title;
};
