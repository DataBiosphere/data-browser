import { NCPIStudy } from "../ncpi-catalog/entities";
import { fetchRelatedStudies } from "./dug";

export interface DugStudy extends NCPIStudy {
  relatedStudies?: NCPIStudy[];
}

/**
 * Build the NCPI Dug studies.
 * @param ncpiStudies - NCPI studies.
 * @returns NCPI Dug catalog studies.
 */
export async function buildNCPIDugCatalogStudies(
  ncpiStudies: NCPIStudy[]
): Promise<DugStudy[]> {
  // Map dbGapId with study.
  const studyByDbGapId = new Map<string, NCPIStudy>();
  for (const study of ncpiStudies) {
    const { dbGapId } = study;
    if (studyByDbGapId.has(dbGapId)) {
      continue;
    } else {
      studyByDbGapId.set(dbGapId, study);
    }
  }

  // Map focus with set of related dbGapId.
  const setOfFocuses = new Set<string>(ncpiStudies.map(({ focus }) => focus));
  const setOfRelatedDbGapIdsByFocus = new Map<string, Set<string>>();
  for (const focus of [...setOfFocuses]) {
    const setOfRelatedDbGapIds = await fetchRelatedStudies(focus);
    setOfRelatedDbGapIdsByFocus.set(focus, setOfRelatedDbGapIds);
  }

  // Build Dug studies.
  const dugStudies: DugStudy[] = [];
  for (const study of ncpiStudies) {
    const { dbGapId, focus } = study;
    // Build related studies.
    const relatedStudies: NCPIStudy[] = [];
    const setOfRelatedDbGapIds = setOfRelatedDbGapIdsByFocus.get(focus);
    if (setOfRelatedDbGapIds) {
      // Remove the study of interest from the related studies.
      setOfRelatedDbGapIds.delete(dbGapId);
      for (const relatedDbGapId of [...setOfRelatedDbGapIds]) {
        const relatedStudy = studyByDbGapId.get(relatedDbGapId);
        if (relatedStudy) {
          relatedStudies.push(relatedStudy);
        }
      }
    }
    dugStudies.push({
      ...study,
      relatedStudies,
    });
  }

  return dugStudies;
}
