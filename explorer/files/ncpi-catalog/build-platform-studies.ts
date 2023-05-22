import { DbGapStudy } from "../../app/apis/catalog/common/entities";
import {
  NCPIStudy,
  PlatformStudy,
} from "../../app/apis/catalog/ncpi-catalog/common/entities";
import { generateConsentDescriptions } from "../common/consent-codes";
import { getStudy } from "../common/dbGaP";

/**
 * Build the catalog platform studies for NCPI.
 * @param platformStudies - a list of platform study values.
 * @returns NCPI catalog platform studies.
 */
export async function buildNCPIPlatformStudies(
  platformStudies: PlatformStudy[]
): Promise<NCPIStudy[]> {
  const ncpiStudies: NCPIStudy[] = [];
  const studiesById: Map<string, NCPIStudy> = new Map();

  // build workspaces
  for (const stub of platformStudies) {
    const study = await getStudy(stub.dbGapId);
    /* Continue when the study is incomplete. */

    if (!study || !isStudyFieldsComplete(study)) {
      continue;
    }

    // If a study with this ID has been seen already, add the platform to that existing object
    const existingPlatforms = studiesById.get(study.dbGapId)?.platforms;
    if (existingPlatforms) {
      if (!existingPlatforms.includes(stub.platform)) {
        existingPlatforms.push(stub.platform);
      }
      continue;
    }

    const consentLongNames: Record<string, string> = {};

    for (const code of study.consentCodes) {
      consentLongNames[code] = (
        await generateConsentDescriptions(code)
      ).consentLongName;
    }

    const ncpiStudy = {
      ...study,
      consentLongNames,
      platforms: [stub.platform],
    };

    studiesById.set(study.dbGapId, ncpiStudy);
    ncpiStudies.push(ncpiStudy);
    console.log(ncpiStudy.dbGapId, ncpiStudy.title);
  }
  return ncpiStudies;
}

/**
 * Returns true if the study has a valid study name and subjects total.
 * @param study - dbGaP study.
 * @returns true if the study is "complete" meaning it has at least a title and subjects.
 */
function isStudyFieldsComplete(study: DbGapStudy): boolean {
  return !!(study.title && study.participantCount);
}
