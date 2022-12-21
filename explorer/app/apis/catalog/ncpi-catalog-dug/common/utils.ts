import { DugStudy } from "../../../../../files/ncpi-catalog-dug/build-studies";
import {
  sanitizeString,
  sanitizeStringArray,
} from "../../../../viewModelBuilders/common/utils";
import { DugCatalogStudy } from "./entities";

/**
 * Returns Dug catalog study with related studies.
 * @param dugStudy - Dug catalog study.
 * @returns Dug catalog study with related studies.
 */
export function DugStudyInputMapper(dugStudy: DugStudy): DugCatalogStudy {
  const { relatedStudies } = dugStudy;
  const sanitizedStudy = sanitizeStudy(dugStudy);
  const sanitizedRelatedStudies = relatedStudies?.map((relatedStudy) =>
    sanitizeStudy(relatedStudy)
  );
  return { ...sanitizedStudy, relatedStudies: sanitizedRelatedStudies };
}

/**
 * Returns the Dug catalog study sanitized.
 * @param dugStudy - Study for sanitization.
 * @returns sanitized Dug catalog study.
 */
function sanitizeStudy(dugStudy: DugStudy): DugCatalogStudy {
  return {
    consentCode: sanitizeStringArray(dugStudy.consentCodes),
    dataType: sanitizeStringArray(dugStudy.dataTypes),
    dbGapId: dugStudy.dbGapId,
    focus: sanitizeString(dugStudy.focus),
    participantCount: dugStudy.participantCount,
    platform: dugStudy.platforms,
    studyAccession: dugStudy.studyAccession,
    studyDescription: dugStudy.description,
    studyDesign: dugStudy.studyDesigns,
    title: sanitizeString(dugStudy.title),
  };
}
