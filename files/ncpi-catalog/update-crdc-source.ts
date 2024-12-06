import fetch from "node-fetch";
import { DbGapId } from "../../app/apis/catalog/ncpi-catalog/common/entities";
import { Platform } from "./constants";
import {
  getPlatformStudiesStudyIds,
  sourcePath,
  updatePlatformStudiesAndReportNewStudies,
} from "./utils";

const urlCRDC =
  "https://api.gdc.cancer.gov/projects?from=0&size=100&sort=project_id:asc&pretty=true";

type CRDCElement = {
  dbgap_accession_number: string;
  id: string;
  project_id: string;
};

type CRDCResponse = {
  data: {
    hits: CRDCElement[];
  };
};

export async function updateCRDCSource(sourcePath: string): Promise<void> {
  // Get existing platform studies and study ids from the NCPI source tsv.
  const [platformStudies, studyIds] = await getPlatformStudiesStudyIds(
    sourcePath,
    Platform.CRDC
  );

  // Get the studies from CRDC API.
  const data = await fetch(urlCRDC);
  const CRDCJson = (await data.json()) as CRDCResponse;
  // Get IDs not contained in the source
  const CRDCIds = studyParser(CRDCJson);

  // Update platform studies and report new studies for the specified platform.
  updatePlatformStudiesAndReportNewStudies(
    Platform.CRDC,
    platformStudies,
    CRDCIds,
    studyIds,
    sourcePath
  );
}

function studyParser(studyJson: CRDCResponse): DbGapId[] {
  const studies = studyJson.data.hits;
  return studies
    .map((study) => study.dbgap_accession_number)
    .filter((id) => id !== "" && id !== null && id !== undefined);
}

updateCRDCSource(sourcePath);
