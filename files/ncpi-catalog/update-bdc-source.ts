import fetch from "node-fetch";
import { Platform } from "./constants";
import {
  getPlatformStudiesStudyIds,
  sourcePath,
  updatePlatformStudiesAndReportNewStudies,
} from "./utils";

const urlBDC =
  "https://gen3.biodatacatalyst.nhlbi.nih.gov/mds/metadata?_guid_type=discovery_metadata&data=false&limit=500";

type BDCElement = string;
type BDCResponse = BDCElement[];

export async function updateBDCSource(sourcePath: string): Promise<void> {
  // Get existing platform studies and study ids from the NCPI source tsv.
  const [platformStudies, studyIds] = await getPlatformStudiesStudyIds(
    sourcePath,
    Platform.BDC
  );

  // Get studies from BDC api
  const data = await fetch(urlBDC);
  const BDCJson = (await data.json()) as BDCResponse;
  const BDCIds = [
    ...new Set(
      BDCJson.map((studyId) => studyId?.split(".")[0]).filter((studyId) =>
        studyId?.startsWith("phs")
      )
    ),
  ];

  // Update platform studies and report new studies for the specified platform.
  updatePlatformStudiesAndReportNewStudies(
    Platform.BDC,
    platformStudies,
    BDCIds,
    studyIds,
    sourcePath
  );
}

updateBDCSource(sourcePath);
