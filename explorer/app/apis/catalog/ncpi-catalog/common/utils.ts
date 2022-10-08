import {
  accumulateValue,
  accumulateValues,
  sumValues,
} from "../../common/utils";
import { NCPICatalog, NCPICatalogPlatform, NCPICatalogStudy } from "./entities";

/**
 * Returns NCPI catalog platforms.
 * @param ncpiCatalogs - NCPI catalogs.
 * @returns NCPI catalog platforms.
 */
export function buildNCPICatalogPlatforms(ncpiCatalogs: unknown[]): unknown[] {
  const ncpiCatalogPlatformsByPlatform = new Map();
  const studies = buildNCPICatalogStudies(ncpiCatalogs) as NCPICatalogStudy[];

  // Build the catalog platforms for the platform.
  for (const study of studies) {
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
 * Returns NCPI catalog studies.
 * @param ncpiCatalogs - NCPI catalogs.
 * @returns NCPI catalog studies.
 */
export function buildNCPICatalogStudies(ncpiCatalogs: unknown[]): unknown[] {
  return (ncpiCatalogs as NCPICatalog[]).map((ncpiCatalog) => {
    const study: NCPICatalogStudy = {
      consentCodes: ncpiCatalog.consentCodes,
      dataTypes: ncpiCatalog.dataTypes,
      dbGapId: ncpiCatalog.dbGapId,
      focusDisease: ncpiCatalog.focusDisease,
      participantCount: ncpiCatalog.participantCount,
      platforms: ncpiCatalog.platforms,
      studyAccession: ncpiCatalog.studyAccession,
      studyDesigns: ncpiCatalog.studyDesigns,
      studyName: ncpiCatalog.study,
    };
    return study;
  });
}

/**
 * Returns NCPI catalog platform.
 * @param platform - The platform for the given NCPI catalog platform.
 * @param ncpiCatalogStudy - NCPI catalog study.
 * @param ncpiCatalogPlatform - NCPI catalog platform.
 * @returns NCPI catalog platform.
 */
function buildNCPICatalogPlatform(
  platform: string,
  ncpiCatalogStudy: NCPICatalogStudy,
  ncpiCatalogPlatform: NCPICatalogPlatform
): NCPICatalogPlatform {
  const consentCodes = accumulateValues(
    ncpiCatalogPlatform.consentCodes,
    ncpiCatalogStudy.consentCodes
  );
  const dataTypes = accumulateValues(
    ncpiCatalogPlatform.dataTypes,
    ncpiCatalogStudy.dataTypes
  );
  const dbGapIds = accumulateValue(
    ncpiCatalogPlatform.dbGapId,
    ncpiCatalogStudy.dbGapId
  ); // dbGapIds - a list of study ids.
  const focusDiseases = accumulateValue(
    ncpiCatalogPlatform.focusDisease,
    ncpiCatalogStudy.focusDisease
  ); // focusDiseases - a list of focuses / diseases.
  const participantCount = sumValues([
    ncpiCatalogPlatform.participantCount,
    ncpiCatalogStudy.participantCount,
  ]);
  const studyNames = accumulateValue(
    ncpiCatalogPlatform.studyName,
    ncpiCatalogStudy.studyName
  ); // studyNames - a list of study names.
  const studyAccessions = accumulateValue(
    ncpiCatalogPlatform.studyAccession,
    ncpiCatalogStudy.studyAccession
  ); // studyAccessions - a list of study accessions.
  const studyDesigns = accumulateValues(
    ncpiCatalogPlatform.studyDesigns,
    ncpiCatalogStudy.studyDesigns
  );
  return {
    consentCodes,
    dataTypes,
    dbGapId: dbGapIds,
    focusDisease: focusDiseases,
    participantCount,
    platforms: platform,
    studyAccession: studyAccessions,
    studyDesigns,
    studyName: studyNames,
  };
}
