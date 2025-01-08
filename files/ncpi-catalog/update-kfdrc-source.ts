import * as fs from "fs";
import { Platform } from "./constants";
import {
  getPlatformStudiesStudyIds,
  sourcePath,
  updatePlatformStudiesAndReportNewStudies,
} from "./utils";

const KFDRCDataPath = "ncpi-catalog/out/kfdrc-studies.json";

type KFDRCIdentifier = {
  value: string;
};

type KFDRCEntry = {
  resource: {
    id: number;
    identifier: KFDRCIdentifier[];
  };
};

type KFDRCFile = {
  entry: KFDRCEntry[];
  id: string;
};

async function updateKFDRCSource(sourcePath: string): Promise<void> {
  // Get existing platform studies and study ids from the NCPI source tsv.
  const [platformStudies, studyIds] = await getPlatformStudiesStudyIds(
    sourcePath,
    Platform.KFDRC
  );

  // Get ids from downloaded KFDRC dataset.
  let KFDRCJson: KFDRCFile;
  try {
    KFDRCJson = JSON.parse(fs.readFileSync(KFDRCDataPath, "utf-8"));
  } catch {
    console.error(
      "KFDRC data not found. Please download the KFDRC data to ncpi-catalog/out/kfdrc-studies.json"
    );
    return;
  }
  const KFDRCStudies = KFDRCJson.entry;
  const KFDRCIds = KFDRCStudies.map((study) => {
    const dbGapIdArray = study.resource.identifier
      .map((studyIdentifier) => studyIdentifier.value)
      .filter((idValue) => idValue.startsWith("phs"))
      .map((longDbGap) => longDbGap.split(".")[0]);
    return dbGapIdArray[0] ?? "";
  }).filter((dbGapId) => dbGapId !== "");

  // Update platform studies and report new studies for the specified platform.
  updatePlatformStudiesAndReportNewStudies(
    Platform.KFDRC,
    platformStudies,
    KFDRCIds,
    studyIds,
    sourcePath
  );
}

updateKFDRCSource(sourcePath);
