import {
  accumulateValue,
  accumulateValues,
  sumValues,
} from "../../app/apis/catalog/common/utils";
import {
  NCPICatalogPlatform,
  NCPIStudy,
} from "../../app/apis/catalog/ncpi-catalog/common/entities";

/**
 * Build the catalog Platforms for NCPI
 * @returns NCPI catalog platforms.
 * @param ncpiPlatformStudies - array of studies
 */
export function buildNCPICatalogPlatforms(
  ncpiPlatformStudies: NCPIStudy[]
): NCPICatalogPlatform[] {
  const ncpiCatalogPlatformsByPlatform = new Map();

  // Build the catalog platforms for the platform.
  for (const study of ncpiPlatformStudies) {
    const { platforms } = study;
    for (const platform of platforms) {
      const ncpiCatalogPlatform =
        ncpiCatalogPlatformsByPlatform.get(platform) || {};
      ncpiCatalogPlatformsByPlatform.set(
        platform,
        buildNCPICatalogPlatform(platform, study, ncpiCatalogPlatform)
      );
    }
  }

  return [...ncpiCatalogPlatformsByPlatform.values()];
}

/**
 * Returns NCPI catalog platform.
 * @param platform - The platform for the given NCPI catalog platform.
 * @param ncpiStudy - an ncpiStudy.
 * @param ncpiCatalogPlatform - NCPI catalog platform.
 * @returns NCPI catalog platform.
 */
function buildNCPICatalogPlatform(
  platform: string,
  ncpiStudy: NCPIStudy,
  ncpiCatalogPlatform: NCPICatalogPlatform
): NCPICatalogPlatform {
  const consentCode = accumulateValues(
    ncpiCatalogPlatform.consentCode,
    ncpiStudy.consentCodes
  );
  const consentLongName = Object.assign(
    {},
    ncpiCatalogPlatform.consentLongName,
    ncpiStudy.consentLongNames
  );
  const dataType = accumulateValues(
    ncpiCatalogPlatform.dataType,
    ncpiStudy.dataTypes
  );
  const dbGapId = accumulateValue(
    ncpiCatalogPlatform.dbGapId,
    ncpiStudy.dbGapId
  ); // dbGapIds - a list of study ids.
  const focus = accumulateValue(ncpiCatalogPlatform.focus, ncpiStudy.focus); // focusDiseases - a list of focuses / diseases.
  const participantCount = sumValues([
    ncpiCatalogPlatform.participantCount,
    ncpiStudy.participantCount,
  ]);
  const title = accumulateValue(ncpiCatalogPlatform.title, ncpiStudy.title); // studyNames - a list of study names.
  const studyAccession = accumulateValue(
    ncpiCatalogPlatform.studyAccession,
    ncpiStudy.studyAccession
  ); // studyAccessions - a list of study accessions.
  const studyDesign = accumulateValues(
    ncpiCatalogPlatform.studyDesign,
    ncpiStudy.studyDesigns
  );
  return {
    consentCode,
    consentLongName,
    dataType,
    dbGapId,
    focus,
    participantCount,
    platform,
    studyAccession,
    studyDesign,
    title,
  };
}
